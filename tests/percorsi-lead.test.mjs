import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { randomUUID } from 'node:crypto';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const code = ts.transpileModule(readFileSync(new URL('../src/app/api/percorsi-lead/route.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
function setup({ enabled = true, provider = async () => Response.json({ messageId: 'test-id' }, { status: 201 }), config = {} } = {}) {
  const calls = [];
  const routeModule = { exports: {} };
  vm.runInNewContext(code, {
    module: routeModule, exports: routeModule.exports, require, Response, URL, Buffer, AbortSignal,
    process: { env: { PERCORSI_LEADS_ENABLED: String(enabled), BREVO_API_KEY: 'test-only', BREVO_SENDER_EMAIL: 'sender@example.com', PERCORSI_NOTIFICATION_TO: 'owner@example.com', ...config } },
    console: { error() {} },
    fetch: async (url, options) => { calls.push({ url, ...options, body: JSON.parse(options.body) }); return provider(); },
  });
  return { post: routeModule.exports.POST, calls };
}
function request(changes = {}, headers = {}) {
  return new Request('https://morenofunari.it/api/percorsi-lead', {
    method: 'POST', headers: { origin: 'https://morenofunari.it', 'content-type': 'application/json', 'x-real-ip': '192.0.2.1', ...headers },
    body: JSON.stringify({ name: 'Test <b>name</b>', email: 'test@example.com', phone: '', note: 'Situazione di test <script>invalid</script>', privacyConsent: true, website: '', startedAt: Date.now() - 2_000, requestId: randomUUID(), tipo_richiesta: 'percorso_pagamento', origine: '/percorsi', ...changes }),
  });
}
test('notification only, fixed recipient and reply-to, optional phone, escaped HTML; no contact/list/Pilot calls', async () => {
  const s = setup(); assert.equal((await s.post(request())).status, 200); assert.equal(s.calls.length, 1);
  const call = s.calls[0]; assert.equal(call.url, 'https://api.brevo.com/v3/smtp/email');
  assert.deepEqual(call.body.to, [{ email: 'owner@example.com' }]);
  assert.equal(call.body.replyTo.email, 'test@example.com'); assert.equal(call.body.subject, 'Percorso a pagamento — /percorsi');
  assert.ok(call.body.htmlContent.includes('&lt;script&gt;')); assert.ok(call.body.htmlContent.includes('&lt;b&gt;'));
  for (const word of ['listIds', 'templateId', 'PILOT_TAG', 'PILOT_SOURCE']) assert.ok(!JSON.stringify(call.body).includes(word));
});
for (const [name, changes] of [
  ['missing name', { name: '' }], ['invalid email', { email: 'bad' }], ['missing situation', { note: '' }],
  ['missing consent', { privacyConsent: false }], ['string consent', { privacyConsent: 'true' }],
  ['invalid optional phone', { phone: 'abc' }], ['honeypot', { website: 'bot' }],
  ['fast completion', { startedAt: Date.now() }], ['missing clock', { startedAt: null }],
  ['future clock', { startedAt: Date.now() + 10_000 }], ['expired form', { startedAt: Date.now() - 86_500_000 }],
  ['oversized note', { note: 'a'.repeat(3_001) }], ['oversized name', { name: 'a'.repeat(201) }],
  ['header injection', { name: 'Test\r\nInjected' }], ['wrong flow', { tipo_richiesta: 'pilot' }],
  ['wrong source', { origine: '/confronto' }], ['missing request id', { requestId: '' }],
]) test(`rejects ${name} without provider calls`, async () => { const s = setup(); assert.equal((await s.post(request(changes))).status, 400); assert.equal(s.calls.length, 0); });
test('fails closed when disabled or missing provider configuration', async () => {
  for (const options of [{ enabled: false }, { config: { BREVO_API_KEY: '' } }, { config: { BREVO_SENDER_EMAIL: '' } }]) {
    const s = setup(options); assert.equal((await s.post(request())).status, 503); assert.equal(s.calls.length, 0);
  }
});
test('rejects cross-origin, non-JSON and oversized payloads', async () => {
  for (const [headers, status] of [[{ origin: 'https://other.example' }, 403], [{ 'content-type': 'text/plain' }, 415], [{ 'content-length': '999999' }, 413]]) {
    const s = setup(); assert.equal((await s.post(request({}, headers))).status, status); assert.equal(s.calls.length, 0);
  }
  const s = setup(); assert.equal((await s.post(request({ note: 'x'.repeat(20_000) }))).status, 413); assert.equal(s.calls.length, 0);
});
test('rejects malformed JSON and non-object JSON', async () => {
  const s = setup();
  for (const body of ['{', 'null', '[]']) assert.equal((await s.post(new Request('https://morenofunari.it/api/percorsi-lead', { method: 'POST', headers: { origin: 'https://morenofunari.it', 'content-type': 'application/json' }, body }))).status, 400);
  assert.equal(s.calls.length, 0);
});
test('reports upstream failure and allows retry with same id', async () => {
  let attempts = 0;
  const s = setup({ provider: async () => ++attempts === 1 ? new Response('', { status: 500 }) : Response.json({ messageId: 'ok' }) });
  const requestId = randomUUID(); assert.equal((await s.post(request({ requestId }))).status, 502); assert.equal((await s.post(request({ requestId }))).status, 200);
});
test('provider timeout/error or missing message id never returns success', async () => {
  for (const provider of [async () => { throw new Error('timeout'); }, async () => Response.json({})]) {
    const s = setup({ provider }); assert.equal((await s.post(request())).status, 502);
  }
});
test('idempotent successful replay does not send another notification', async () => {
  const s = setup(); const requestId = randomUUID();
  assert.equal((await s.post(request({ requestId }))).status, 200); assert.equal((await s.post(request({ requestId }))).status, 200); assert.equal(s.calls.length, 1);
});
test('rate limits valid repeated requests without calling provider again', async () => {
  const s = setup(); for (let i = 0; i < 5; i++) assert.equal((await s.post(request())).status, 200);
  const response = await s.post(request()); assert.equal(response.status, 429); assert.equal(response.headers.get('Retry-After'), '600'); assert.equal(s.calls.length, 5);
});
