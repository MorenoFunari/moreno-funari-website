import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import test from 'node:test';
const base = process.env.TRACKING_TEST_BASE_URL;
const log = process.env.PERCORSI_TEST_BREVO_LOG;
const failFile = process.env.TRACKING_TEST_FAIL_FILE;
test('built CONFRONTO API: invalid form, successful capture, concurrent duplicate, replay and safe provider error', { skip: !base || !log || !failFile }, async () => {
  assert.equal(new URL(base).hostname, 'localhost');
  const rows = () => readFileSync(log,'utf8').split('\n').filter(Boolean).map(x => JSON.parse(x));
  const p = { name:'TEST LOCAL',email:'test@example.com',note:'Dati fittizi per collaudo isolato',phone:'',privacyConsent:true,source:'ads_confronto_form',website:'',startedAt:Date.now()-2500,requestId:randomUUID() };
  const post = data => fetch(base+'/api/confronto-lead',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});
  const before = rows().length; assert.equal((await post({...p,privacyConsent:false})).status,400); assert.equal(rows().length,before);
  const pair=await Promise.all([post(p),post(p)]); for(const r of pair){assert.equal(r.status,200);assert.equal((await r.json()).leadCreated,true)}
  assert.equal((await post(p)).status,200); const sent=rows().slice(before);assert.equal(sent.length,2);assert(sent[0].url.endsWith('/contacts'));assert(sent[1].url.endsWith('/smtp/email')); assert.equal(sent[0].body.attributes.PILOT_SOURCE,'ads_confronto_form');
  try { writeFileSync(failFile,'local QA'); const bad=await post({...p,requestId:randomUUID()});assert.equal(bad.status,502);assert.equal(rows().length,before+2); } finally { try { unlinkSync(failFile) } catch {} }
  const thanks=await fetch(base+'/grazie-confronto');assert.equal(thanks.status,200);assert.equal(rows().length,before+2);
  const ads=await(await fetch(base+'/ads/confronto')).text();assert(/<main\b[\s\S]*?<form\b/.test(ads)); assert(ads.includes('id="richiesta-confronto"')); assert(ads.includes('Invia la richiesta CONFRONTO')); assert.equal((ads.match(/id="mf-ga4-script"/g)||[]).length,0,'QA build must not contact Google');
});
