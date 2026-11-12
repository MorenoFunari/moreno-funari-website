import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { loadSource, hooks, find, TestFormData, event, deferred, assertNoPersonalData } from './helpers/tracking-harness.mjs';
const config = { isConfigured: true, measurementId: 'G-TEST' };
function formSetup({ status = 'granted', provider, brokenTracker = false, callback = true } = {}) {
  const h = hooks(), events = [], requests = [], navigation = [], meta = [];
  const window = { crypto: webcrypto, setTimeout, clearTimeout, gtag: (...x) => { if (brokenTracker) throw Error('tracker'); events.push(x); if (callback) x[2]?.event_callback?.(); } };
  const state = { status };
  const form = { values: { name: 'Private name', email: 'test@example.com', note: 'Private note', phone: '', privacyConsent: 'on', website: '' }, resets: 0, reset() { this.resets++; } };
  const source = loadSource('src/components/forms/confronto-lead-form.tsx', {
    react: h.react, 'react/jsx-runtime': h.jsx, 'next/navigation': { useRouter: () => ({ push: x => navigation.push(x) }) },
    '@/config/analytics': { analyticsConfig: config }, '@/components/analytics/tracked-whatsapp-button': { TrackedWhatsAppButton() {} },
    '@/config/pilot': { pilotWhatsAppUrl: 'https://wa.me/393793408630?text=CONFRONTO' },
    '@/lib/analytics/consent': { readAnalyticsConsent: () => state },
    '@/lib/analytics/meta-pixel': { trackLeadConfrontoSubmitted: x => { if (brokenTracker) throw Error('pixel'); meta.push(x); } },
    './confronto-lead-form.module.css': {},
  }, { window, FormData: TestFormData, fetch: async (url, options) => { requests.push({ url, ...options, payload: JSON.parse(options.body) }); return provider ? provider() : Response.json({ ok: true, leadCreated: true, notificationSent: true }); } });
  const render = () => find(h.render(source.ConfrontoLeadForm, { page: '/confronto', source: 'confronto_landing', noteRequired: true, phoneRequired: false }), x => x.type === 'form');
  let tree = render();
  return { events, requests, navigation, meta, form, state, window, render, h,
    submit: () => tree.props.onSubmit(event(form)),
    change: name => tree.props.onChangeCapture({ target: { getAttribute: () => name } }),
  };
}
test('opening the form emits nothing; first actual edit sends one diagnostic, without values', () => {
  const s = formSetup(); assert.equal(s.events.length, 0); s.change('website'); assert.equal(s.events.length, 0);
  s.change('name'); s.change('email'); assert.equal(s.events.length, 1); assert.equal(s.events[0][1], 'confronto_form_start'); assertNoPersonalData(s.events);
});
test('denied form interaction and successful capture work without analytics or retroactive conversion', async () => {
  const s = formSetup({ status: 'denied' }); s.change('name'); await s.submit(); assert.equal(s.events.length, 0); assert.deepEqual(s.navigation, ['/grazie-confronto']);
  s.state.status = 'granted'; s.h.replayEffects(); assert.equal(s.events.length, 0);
});
test('client validation failure never fetches or emits a commercial event', async () => {
  const s = formSetup(); s.form.values.name = ''; await s.submit(); assert.equal(s.requests.length, 0); assert.equal(s.navigation.length, 0);
  assert.deepEqual(s.events.map(x => x[1]), ['confronto_form_submit_attempt']); assert.equal(s.events[0][2].validation_passed, false);
});
for (const [label, response] of [
  ['backend error', () => Response.json({ ok: false, leadCreated: true }, { status: 502 })],
  ['missing success', () => Response.json({ leadCreated: true })],
  ['truthy string', () => Response.json({ ok: true, leadCreated: 'true' })],
  ['invalid JSON', () => new Response('bad')],
  ['network rejection', () => { throw Error('offline'); }],
]) test(label + ': no lead, no redirect, retry remains possible', async () => {
  const s = formSetup({ provider: response }); await s.submit(); await s.submit(); assert.equal(s.requests.length, 2); assert.equal(s.navigation.length, 0); assert(!s.events.some(x => x[1] === 'generate_lead' || x[1] === 'confronto_lead_created')); assert.equal(s.requests[0].payload.requestId, s.requests[1].payload.requestId);
});
test('success after backend confirmation sends existing canonical lead once and preserves redirect; no PII', async () => {
  const gate = deferred(); const s = formSetup({ provider: () => gate.promise }); const first = s.submit(); await s.submit(); assert.equal(s.requests.length, 1); assert(!s.events.some(x => x[1] === 'confronto_lead_created'));
  gate.resolve(Response.json({ ok: true, leadCreated: true, notificationSent: true })); await first; await s.submit();
  assert.equal(s.events.filter(x => x[1] === 'confronto_lead_created').length, 1); assert.equal(s.events.filter(x => x[1] === 'generate_lead').length, 1); assert.equal(s.requests.length, 1); assert.deepEqual(s.navigation, ['/grazie-confronto']); assert.equal(s.form.resets, 1); assertNoPersonalData(s.events);
});
test('notification failure is distinct from contact acceptance, never called email delivered', async () => {
  const s = formSetup({ provider: () => Response.json({ ok: true, leadCreated: true, notificationSent: false }) }); await s.submit();
  assert(s.events.some(x => x[1] === 'confronto_notification_failed')); assert(s.events.some(x => x[1] === 'confronto_lead_created')); assert.deepEqual(s.navigation, ['/grazie-confronto']);
});
test('broken GA/Meta cannot block a successfully captured request', async () => { const s = formSetup({ brokenTracker: true }); await s.submit(); assert.deepEqual(s.navigation, ['/grazie-confronto']); });
test('missing gtag callback uses bounded timeout then redirects', async () => { const s = formSetup({ callback: false }); await s.submit(); assert.deepEqual(s.navigation, ['/grazie-confronto']); });
test('editing after a failed request generates a new logical request id', async () => { const s = formSetup({ provider: () => Response.json({}, { status: 502 }) }); await s.submit(); s.form.values.note += ' changed'; await s.submit(); assert.notEqual(s.requests[0].payload.requestId, s.requests[1].payload.requestId); });

function googleSetup(path) {
  const calls = []; const window = { location: { pathname: path, href: 'https://morenofunari.it' + path + '?utm_campaign=confronto_search&gclid=LOCAL_ONLY' }, gtag: (...args) => calls.push(args) };
  const source = loadSource('src/lib/analytics/google-tag.ts', { '@/config/analytics': { analyticsConfig: config } }, { window });
  return { calls, window, source, boot: () => vm.runInNewContext(source.googleTagBootstrap(), { window, Date }) };
}
for (const consent of ['denied', 'granted']) test('landing initial ' + consent + ': immediate opening, no interaction, Strict Mode safe, refresh is new document', () => {
  const s = googleSetup('/ads/confronto'); s.boot(); s.boot(); s.source.trackAdsConfrontoOpen(); s.source.trackAdsConfrontoOpen();
  assert.equal(s.calls[0][0], 'consent'); assert.equal(s.calls[0][1], 'default'); for (const k of ['analytics_storage','ad_storage','ad_user_data','ad_personalization']) assert.equal(s.calls[0][2][k], 'denied');
  if (consent === 'granted') s.window.gtag('consent','update',{ analytics_storage:'granted', ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied' });
  assert.equal(s.calls.filter(x => x[0] === 'config').length, 1); const opens = s.calls.filter(x => x[1] === 'ads_conversion_apertura_confronto_ads_1'); assert.equal(opens.length, 1); assert.equal(opens[0][2].page_location, s.window.location.href);
  const refresh = googleSetup('/ads/confronto'); refresh.boot(); refresh.source.trackAdsConfrontoOpen(); assert.equal(refresh.calls.filter(x => x[1] === 'ads_conversion_apertura_confronto_ads_1').length, 1);
});
test('client navigation away and back re-arms opening, but rerender or same-route query does not duplicate', () => {
  const s = googleSetup('/ads/confronto'); s.boot(); s.source.trackAdsConfrontoOpen('/ads/confronto'); s.source.trackAdsConfrontoOpen('/coaching');
  s.window.location = { pathname: '/ads/confronto', href: 'https://morenofunari.it/ads/confronto?utm_campaign=back' };
  s.source.trackAdsConfrontoOpen('/ads/confronto'); s.source.trackAdsConfrontoOpen('/ads/confronto'); assert.equal(s.calls.filter(x => x[1] === 'ads_conversion_apertura_confronto_ads_1').length, 2);
  const other = googleSetup('/passo'); other.boot(); other.source.trackAdsConfrontoOpen('/passo'); assert(!other.calls.some(x => x[0] === 'event'));
});
for (const status of ['denied','granted']) test('one WhatsApp click is a diagnostic, never a lead ('+status+')', () => {
  const h = hooks(), events = []; const source = loadSource('src/components/analytics/tracked-whatsapp-button.tsx', {
    'react/jsx-runtime': h.jsx, '@/config/analytics': { analyticsConfig: config }, '@/components/ui/button-link': { ButtonLink() {} }, '@/lib/analytics/consent': { readAnalyticsConsent: () => ({ status }) }, '@/lib/analytics/meta-pixel': { trackClickWhatsApp() {}, trackPilotWhatsappClick() {} },
  }, { window: { location: { pathname: '/ads/confronto' }, gtag: (...x) => events.push(x) } });
  const link = source.TrackedWhatsAppButton({ href: 'https://wa.me/393793408630?text=CONFRONTO', location: 'ads_confronto', page: '/ads/confronto', children: 'CTA' }); link.props.onClick(); assert.deepEqual(events.map(x => x[1]), ['whatsapp_click_confronto']); assertNoPersonalData(events);
});

test('PASSO thank-you direct visits, remounts and grants never create commercial events', () => {
  for (const initial of ['denied','granted']) {
    const h = hooks(), events = [], listeners = new Map(), status = { status: initial };
    const source = loadSource('src/components/analytics/passo-thank-you-analytics.tsx', { react: h.react, '@/lib/analytics/consent': { analyticsConsentChangedEventName: 'consent', readAnalyticsConsent: () => status } }, { window: { gtag: (...x) => events.push(x), addEventListener: (n,f) => listeners.set(n,f), removeEventListener: n => listeners.delete(n) } });
    h.render(source.PassoThankYouAnalytics); h.replayEffects(); status.status = 'granted'; listeners.get('consent')?.(); assert.deepEqual(events.map(x => x[1]), ['passo_thank_you_view']);
  }
});
for (const status of ['denied','granted']) test('PASSO success is isolated from CONFRONTO ('+status+')', async () => {
  const h = hooks(), events = [], nav = []; const gate = deferred(); let requests = 0;
  const source = loadSource('src/app/passo/passo-form.tsx', { react: h.react, 'react/jsx-runtime': h.jsx, 'next/link': { default() {} }, 'next/navigation': { useRouter: () => ({ push: x => nav.push(x) }) }, '@/config/analytics': { analyticsConfig: config }, '@/lib/analytics/consent': { readAnalyticsConsent: () => ({ status }) }, './page.module.css': {} }, { window: { gtag: (...x) => events.push(x) }, FormData: TestFormData, fetch: () => { requests++; return gate.promise; } });
  const tree = h.render(source.PassoForm); const form = { values: {}, reset() {} }; const first = tree.props.onSubmit(event(form)); await tree.props.onSubmit(event(form)); assert.equal(requests, 1); gate.resolve(Response.json({ success: true, guideEmailSent: true })); await first;
  assert.deepEqual(events.map(x => x[1]), status === 'granted' ? ['passo_lead_created'] : []); assert.deepEqual(nav, ['/grazie-passo']);
});
test('CONFRONTO thank-you has no success tracker or form, and Ads landing still has no form', () => {
  const thanks = readFileSync(new URL('../src/app/grazie-confronto/page.tsx', import.meta.url), 'utf8'); assert(!/gtag|Analytics|generate_lead|confronto_lead_created/.test(thanks));
  const ads = readFileSync(new URL('../src/app/ads/confronto/page.tsx', import.meta.url), 'utf8'); assert(!/<form|LeadForm/.test(ads));
});
