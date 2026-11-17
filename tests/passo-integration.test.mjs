import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {readFileSync} from 'node:fs';
import test from 'node:test';
const base=process.env.TRACKING_TEST_BASE_URL,log=process.env.PERCORSI_TEST_BREVO_LOG;
test('built PASSO: new and existing contact, separate optional marketing, one guide and thank-you', {skip:!base||!log},async()=>{
 assert.equal(new URL(base).hostname,'localhost');
 const rows=()=>readFileSync(log,'utf8').split('\n').filter(Boolean).map(JSON.parse);
 const before=rows().length;
 const submit=async(marketing)=>{
  const f=new FormData();f.set('EMAIL','privacy-local@example.com');f.set('NOME','QA');f.set('CONSENSO','1');if(marketing)f.set('MARKETING_CONSENT','1');f.set('requestId',randomUUID());f.set('requestedAt',String(Date.now()));
  const options={method:'POST',body:f};
  assert.equal((await fetch(base+'/api/passo-lead',options)).status,200);
  assert.equal((await fetch(base+'/api/passo-lead',options)).status,200);
 };
 await submit(false);await submit(true);await submit(false);
 const sent=rows().slice(before),writes=sent.filter(x=>!x.url.endsWith('/smtp/email'));
 assert.equal(writes.length,3);assert.deepEqual(writes[0].body.listIds,[4]);assert.equal(writes[0].body.attributes.MARKETING_CONSENT,false);
 assert.deepEqual(writes[1].body.listIds,[4,3]);assert.equal(writes[1].body.attributes.MARKETING_CONSENT,true);
 assert.deepEqual(writes[2].body.listIds,[4]);assert(!('MARKETING_CONSENT' in writes[2].body.attributes));
 assert.equal(sent.filter(x=>x.url.endsWith('/smtp/email')).length,3);
 const thanks=await fetch(base+'/grazie-passo');assert.equal(thanks.status,200);assert.equal(rows().length,before+6);
});
