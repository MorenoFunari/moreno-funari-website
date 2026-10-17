import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const base = process.env.ATHLETE_TEST_BASE_URL;
const log = process.env.PERCORSI_TEST_BREVO_LOG;
test('built local endpoint accepts all three roles and never creates contacts', { skip: !base || !log }, async () => {
  assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
  const records = () => { try { return readFileSync(log, 'utf8').split('\n').filter(Boolean).map(x => JSON.parse(x)); } catch { return []; } };
  const before = records().length;
  const payload = { name: 'TEST LOCALE', email: 'test@example.com', phone: '', role: 'Genitore', age: '7–10', sport: 'Pallavolo', mode: '', note: 'Prova tecnica con dati fittizi.', guardianConfirmed: true, privacyConsent: true, website: '', startedAt: Date.now() - 2500, requestId: randomUUID(), tipo_richiesta: 'giovani_atleti', origine: '/coaching/mental-coach-giovani-atleti' };
  const post = p => fetch(base + '/api/giovani-atleti-lead', { method: 'POST', headers: { origin: base, 'content-type': 'application/json' }, body: JSON.stringify(p) });
  for (const changes of [{ privacyConsent: false }, { guardianConfirmed: false }, { role: 'Atleta maggiorenne', age: '14–17' }]) assert.equal((await post({ ...payload, ...changes })).status, 400);
  assert.equal(records().length, before);
  for (const role of ['Genitore', 'Tutore', 'Atleta maggiorenne']) {
    const p = { ...payload, role, age: role === 'Atleta maggiorenne' ? '18+' : '11–13', requestId: randomUUID(), guardianConfirmed: role !== 'Atleta maggiorenne' };
    const r = await post(p); assert.equal(r.status, 200); assert.equal((await r.json()).ok, true);
    assert.equal((await post(p)).status, 200);
  }
  const sent = records().slice(before);
  assert.equal(sent.length, 3, 'No duplicate notification on replay');
  for (const r of sent) { assert.equal(r.url, 'https://api.brevo.com/v3/smtp/email'); assert.equal(r.body.subject, 'Giovani atleti — richiesta informazioni'); assert.doesNotMatch(JSON.stringify(r.body), /listIds|templateId|PILOT_TAG|PILOT_SOURCE/); }
});
