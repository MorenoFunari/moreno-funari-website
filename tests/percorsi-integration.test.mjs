import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const base = process.env.PERCORSI_TEST_BASE_URL;
const log = process.env.PERCORSI_TEST_BREVO_LOG;
test('local built app: HTTP page, sitemap, dedicated endpoint and notification contract', { skip: !base || !log }, async () => {
  assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'Local test server only');
  const html = await fetch(base + '/percorsi'); assert.equal(html.status, 200);
  assert.ok((await html.text()).includes('Quando hai troppe cose in testa, da dove cominci?'));
  assert.ok((await (await fetch(base + '/sitemap.xml')).text()).includes('https://morenofunari.it/percorsi'));
  const before = readFileSync(log, 'utf8').trim().split('\n').filter(Boolean).length;
  const data = { name: 'Collaudo locale', email: 'test@example.com', phone: '', note: 'Dati sintetici per il test del percorso commerciale.', privacyConsent: true, website: '', startedAt: Date.now() - 2_000, requestId: randomUUID(), tipo_richiesta: 'percorso_pagamento', origine: '/percorsi' };
  const post = (payload, origin = base) => fetch(base + '/api/percorsi-lead', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  assert.equal((await post({ ...data, privacyConsent: false })).status, 400);
  assert.equal((await post(data, 'https://other.example')).status, 403);
  const result = await post(data); assert.equal(result.status, 200); assert.equal((await result.json()).ok, true);
  assert.equal((await post(data)).status, 200);
  const records = readFileSync(log, 'utf8').trim().split('\n').filter(Boolean).map(x => JSON.parse(x));
  assert.equal(records.length, before + 1, 'Exactly one notification, including a successful replay');
  const notification = records.at(-1);
  assert.equal(notification.url, 'https://api.brevo.com/v3/smtp/email');
  assert.equal(notification.body.subject, 'Percorso a pagamento — /percorsi');
  assert.equal(notification.body.replyTo.email, 'test@example.com');
  assert.ok(notification.body.textContent.includes('percorso_pagamento'));
  assert.ok(notification.body.textContent.includes('Origine: /percorsi'));
  assert.ok(!JSON.stringify(notification.body).match(/listIds|PILOT_TAG|PILOT_SOURCE|templateId/));
});
