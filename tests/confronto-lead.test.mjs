import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import test from 'node:test';
import { loadSource, deferred } from './helpers/tracking-harness.mjs';
function setup(provider) {
  const calls = [];
  const route = loadSource('src/app/api/confronto-lead/route.ts', { 'next/server': { NextResponse: Response } }, {
    Response, Request, URL, Buffer, AbortSignal,
    process: { env: { BREVO_API_KEY: 'test-only', BREVO_LIST_ID_PILOT: '99', BREVO_SENDER_EMAIL: 'sender@example.com', LEAD_NOTIFICATION_TO: 'owner@example.com' } },
    fetch: async (url, options) => { calls.push({ url, body: JSON.parse(options.body) }); return provider ? provider(url, options) : Response.json({}, { status: 201 }); },
  });
  return { calls, post: route.POST };
}
const data = () => ({ name: 'TEST LOCAL', email: 'test@example.com', note: 'Situation fictive', phone: '', privacyConsent: true, source: 'confronto_landing', website: '', startedAt: Date.now() - 2500, requestId: randomUUID() });
const request = payload => new Request('https://morenofunari.it/api/confronto-lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
test('accepted contact and notification are separate booleans; destination/list/source unchanged', async () => {
  const s = setup(); const r = await s.post(request(data())); assert.equal(r.status, 200); assert.deepEqual(await r.json(), { ok: true, leadCreated: true, notificationSent: true });
  assert.equal(s.calls.length, 2); assert.equal(s.calls[0].url, 'https://api.brevo.com/v3/contacts'); assert.deepEqual(s.calls[0].body.listIds, [99]); assert.equal(s.calls[0].body.attributes.PILOT_SOURCE, 'confronto_landing'); assert.equal(s.calls[1].url, 'https://api.brevo.com/v3/smtp/email'); assert.deepEqual(s.calls[1].body.to, [{ email: 'owner@example.com' }]);
});
test('concurrent double request and replay produce one contact operation and one notification', async () => {
  const gate = deferred(); const s = setup(async url => { if (url.endsWith('/contacts')) await gate.promise; return Response.json({}, { status: 201 }); }); const p = data();
  const a = s.post(request(p)), b = s.post(request(p)); await new Promise(r => setImmediate(r)); assert.equal(s.calls.length, 1); gate.resolve(); const results = await Promise.all([a,b]);
  for (const r of results) assert.equal((await r.json()).leadCreated, true); assert.equal(s.calls.length, 2);
  assert.equal((await s.post(request(p))).status, 200); assert.equal(s.calls.length, 2);
});
test('same id with a different valid payload is refused without another provider call', async () => {
  const s = setup(); const p = data(); await s.post(request(p)); assert.equal((await s.post(request({ ...p, note: 'Different' }))).status, 409); assert.equal(s.calls.length, 2);
});
test('failed provider operations allow retry, never return a commercial success', async () => {
  let fail = true; const s = setup(() => fail ? new Response('', { status: 503 }) : Response.json({}, { status: 201 })); const p = data(); const bad = await s.post(request(p)); assert.equal(bad.status, 502); assert.equal((await bad.json()).leadCreated, undefined);
  fail = false; assert.equal((await s.post(request(p))).status, 200); assert.equal(s.calls.length, 5);
});
test('network failure is a handled 502 and can be retried', async () => { const s = setup(() => { throw Error('offline'); }); assert.equal((await s.post(request(data()))).status, 502); });
test('notification rejection does not pretend delivery and replay does not resend', async () => {
  const s = setup(url => new Response('', { status: url.endsWith('/smtp/email') ? 503 : 201 })); const p = data(); assert.deepEqual(await (await s.post(request(p))).json(), { ok: true, leadCreated: true, notificationSent: false }); await s.post(request(p)); assert.equal(s.calls.length, 2);
});
test('existing contact fallbacks are preserved; only one notification after acceptance', async () => {
  let contacts = 0; const s = setup(url => new Response('', { status: url.endsWith('/contacts') && ++contacts < 3 ? 400 : 201 })); const r = await s.post(request(data())); assert.equal(r.status, 200); assert.equal(s.calls.length, 4); assert.equal(contacts, 3);
});
for (const [label, change] of [ ['privacy', { privacyConsent: false }], ['note', { note: '' }], ['email', { email: 'bad' }], ['honeypot', { website: 'bot' }], ['clock', { startedAt: Date.now() + 5000 }], ['id', { requestId: 'not-a-uuid' }] ]) test('invalid '+label+' cannot call Brevo', async () => { const s = setup(); assert.equal((await s.post(request({ ...data(), ...change }))).status, 400); assert.equal(s.calls.length, 0); });
test('null/array/malformed payloads fail validation without provider calls', async () => {
  const s = setup(); for (const body of ['null','[]','{']) { const r = await s.post(new Request('https://morenofunari.it/api/confronto-lead', { method: 'POST', body })); assert.equal(r.status, 400); } assert.equal(s.calls.length, 0);
});
test('cached older clients without requestId still work', async () => { const s = setup(); const p = data(); delete p.requestId; assert.equal((await s.post(request(p))).status, 200); });
for (const change of [{}, {note:''}, {privacyConsent:false}]) test('Ads source preserves optional phone, required note and privacy: '+JSON.stringify(change), async () => {
  const s=setup(); const r=await s.post(request({...data(),source:'ads_confronto_form',...change}));
  const valid=Object.keys(change).length===0; assert.equal(r.status,valid?200:400);
  if(valid){assert.equal(s.calls[0].body.attributes.PILOT_SOURCE,'ads_confronto_form');assert.deepEqual(s.calls[0].body.listIds,[99]);assert.equal(s.calls.length,2)} else assert.equal(s.calls.length,0);
});
