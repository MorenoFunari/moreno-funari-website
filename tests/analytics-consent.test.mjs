import assert from 'node:assert/strict';
import test from 'node:test';
import { hooks, loadSource, find } from './helpers/tracking-harness.mjs';
test('saved consent load, accept and revoke keep advertising denied and never create leads', () => {
  for (const initial of [null, { status: 'denied' }, { status: 'granted' }]) {
    const h = hooks(), commands = [], saved = [], deleted = []; let cookie = '_ga=existing; _ga_TEST=existing; essential=yes';
    const document = { get cookie() { return cookie; }, set cookie(v) { deleted.push(v); }, activeElement: null };
    const window = { location: { hostname: 'morenofunari.it' }, gtag: (...args) => commands.push(args), addEventListener() {}, removeEventListener() {} };
    const Banner = () => null;
    const mod = loadSource('src/components/analytics/analytics-consent-manager.tsx', {
      react: h.react, 'react/jsx-runtime': h.jsx, 'next/navigation': { usePathname: () => '/ads/confronto' },
      '@/config/analytics': { analyticsConfig: { isConfigured: true, metaPixel: { isConfigured: false } } },
      '@/lib/analytics/consent': { analyticsPreferencesEventName: 'preferences', readAnalyticsConsent: () => initial, saveAnalyticsConsent: s => saved.push(s) },
      './analytics-consent-banner': { AnalyticsConsentBanner: Banner }, './meta-pixel-loader': { MetaPixelLoader() {} },
    }, { window, document, queueMicrotask: fn => fn(), HTMLElement: class {} });
    const render = () => h.render(mod.AnalyticsConsentManager);
    render(); let tree = render();
    if (initial) assert.equal(commands[0][2].analytics_storage, initial.status);
    // Open preferences through the same banner callbacks; undecided is directly visible.
    if (!initial) {
      const banner = find(tree, x => x.type === Banner); assert(banner); assert.equal(banner.props.compact, true);
      banner.props.onAccept(); assert.deepEqual(saved, ['granted']); banner.props.onReject(); assert.deepEqual(saved, ['granted','denied']);
      assert(deleted.some(x => x.startsWith('_ga='))); assert(deleted.some(x => x.startsWith('_ga_TEST='))); assert(!deleted.some(x => x.startsWith('essential=')));
    }
    for (const c of commands) { assert.equal(c[0], 'consent'); assert.equal(c[1], 'update'); for (const key of ['ad_storage','ad_user_data','ad_personalization']) assert.equal(c[2][key], 'denied'); }
  }
});
