import assert from 'node:assert/strict';
import test from 'node:test';
import { randomUUID } from 'node:crypto';
import { loadSource, deferred } from './helpers/tracking-harness.mjs';
const endpoint = 'https://morenofunari.it/api/passo-lead';
const data = () => ({ EMAIL: 'test@example.com', NOME: 'Test', CONSENSO: '1', requestId: randomUUID(), requestedAt: String(Date.now()) });
function request(values) { const f = new FormData(); for (const [k,v] of Object.entries(values)) f.set(k,v); return new Request(endpoint, { method: 'POST', body: f }); }
function setup(provider, env = {}) {
  const calls=[];
  const route=loadSource('src/app/api/passo-lead/route.ts', { 'next/server': { NextResponse: Response } }, {
    Response, Request, FormData,
    process: { env: { BREVO_API_KEY:'test', BREVO_LIST_ID_PASSO_GUIDE:'77', BREVO_TEMPLATE_ID_PASSO:'88', ...env } },
    fetch: async (url, opts) => {
      const call={url,method:opts.method ?? 'GET',body:opts.body ? JSON.parse(opts.body) : null}; calls.push(call);
      return provider ? provider(call) : call.method === 'GET' ? new Response(null,{status:404}) : call.url.endsWith('/smtp/email') ? Response.json({messageId:'accepted'},{status:201}) : new Response(null,{status:201});
    },
  });
  return { calls, post: values => route.POST(request(values)) };
}
const accepted = () => new Response(null,{status:204});
test('new contact saves all consent evidence, configured list and template, name', async () => {
  const s=setup(); const r=await s.post(data()); assert.equal(r.status,200); assert.equal((await r.json()).guideEmailSent,true);
  assert.equal(s.calls[1].method,'POST'); assert.deepEqual(s.calls[1].body.listIds,[77]); assert(!('CONSENSO' in s.calls[1].body.attributes)); assert.equal(s.calls[1].body.attributes.MARKETING_CONSENT,false); assert.equal(JSON.parse(s.calls[1].body.attributes.PASSO_REQUEST).marketingSelected,false); assert.equal(s.calls[2].body.templateId,88); assert.equal(s.calls[2].body.params.NOME,'Test');
});
for (const listIds of [[77],[9]]) test('existing contact in lists '+JSON.stringify(listIds)+' is updated, consent preserved',async()=>{
  const s=setup(c=>c.method==='GET'?Response.json({attributes:{NOME:'Previous',CONSENSO:true,PASSO_REQUESTED_AT:'2020-01-01',PASSO_CONSENT_TEXT:'original',OTHER:'keep'},listIds}):accepted());
  const p=data();p.NOME=''; assert.equal((await s.post(p)).status,200);
  assert.equal(s.calls[1].method,'PUT'); assert.deepEqual(s.calls[1].body.listIds,[77]);
  for(const key of ['NOME','CONSENSO','PASSO_REQUESTED_AT','PASSO_CONSENT_TEXT','OTHER']) assert(!(key in s.calls[1].body.attributes));
  assert.equal(s.calls[2].body.params.NOME,'Previous'); assert(!('unlinkListIds' in s.calls[1].body));
});
test('duplicate creation race updates confirmed contact rather than dropping attributes',async()=>{
  let reads=0;const s=setup(c=>c.method==='GET'?(++reads===1?new Response(null,{status:404}):Response.json({attributes:{CONSENSO:true}})):c.method==='POST'&&c.url.endsWith('/contacts')?Response.json({code:'duplicate_parameter'},{status:400}):accepted());
  assert.equal((await s.post(data())).status,200); assert.deepEqual(s.calls.map(c=>c.method),['GET','POST','GET','PUT','POST']);
});
test('attribute rejection is not mistaken for duplicate; no fallback dropping consent or email',async()=>{
  const s=setup(c=>c.method==='GET'?new Response(null,{status:404}):Response.json({code:'invalid_parameter'},{status:400}));
  assert.equal((await s.post(data())).status,502);assert.equal(s.calls.length,2);
});
test('lookup/configuration failure cannot create a contact or send an email',async()=>{
  const s=setup(()=>Response.json({code:'unauthorized'},{status:401})); assert.equal((await s.post(data())).status,502);assert.equal(s.calls.length,1);
});
test('email failed: error, retry reuses same provider idempotency key',async()=>{
  let fail=true; const s=setup(c=>c.method==='GET'?Response.json({attributes:{}}):c.url.endsWith('/smtp/email')&&fail?new Response(null,{status:503}):accepted()); const p=data();
  assert.equal((await s.post(p)).status,502); fail=false;assert.equal((await s.post(p)).status,200);
  const sends=s.calls.filter(c=>c.url.endsWith('/smtp/email'));assert.equal(sends.length,2);assert.equal(sends[0].body.headers.idempotencyKey,sends[1].body.headers.idempotencyKey);
});
test('two simultaneous requests and replay cause only one email operation',async()=>{
  const gate=deferred();const s=setup(async c=>{if(c.method==='GET'){await gate.promise;return Response.json({attributes:{}});}return accepted();});const p=data();
  const a=s.post(p),b=s.post(p);await new Promise(r=>setImmediate(r)); gate.resolve();
  assert.equal((await a).status,200);assert.equal((await b).status,200);assert.equal((await s.post(p)).status,200);assert.equal(s.calls.filter(c=>c.url.endsWith('/smtp/email')).length,1);
});
test('different server instances reuse provider key for same request',async()=>{
  const keys=new Set();let delivered=0;
  const provider=c=>{if(c.method==='GET')return Response.json({attributes:{}});if(!c.url.endsWith('/smtp/email'))return accepted();const key=c.body.headers.idempotencyKey;if(keys.has(key))return Response.json({code:'duplicate_parameter',message:'idempotencyKey already used'},{status:400});keys.add(key);delivered++;return accepted();};
  const p=data();assert.equal((await setup(provider).post(p)).status,200);assert.equal((await setup(provider).post(p)).status,200);assert.equal(delivered,1);
});
test('unrelated duplicate email parameter is not reported as success',async()=>{
  const s=setup(c=>c.method==='GET'?Response.json({attributes:{}}):c.url.endsWith('/smtp/email')?Response.json({code:'duplicate_parameter',message:'Other parameter conflict'},{status:400}):accepted());assert.equal((await s.post(data())).status,502);
});
test('explicit new request for same email is allowed and gets a new provider key',async()=>{
  const s=setup();assert.equal((await s.post(data())).status,200);assert.equal((await s.post(data())).status,200);const sends=s.calls.filter(c=>c.url.endsWith('/smtp/email'));assert.equal(sends.length,2);assert.notEqual(sends[0].body.headers.idempotencyKey,sends[1].body.headers.idempotencyKey);
});
for(const change of [{CONSENSO:'0'},{EMAIL:'invalid'},{email_address_check:'bot'},{requestId:'bad'},{requestedAt:String(Date.now()-31*60000)}])test('invalid request cannot call Brevo '+JSON.stringify(change),async()=>{const s=setup();assert.equal((await s.post({...data(),...change})).status,400);assert.equal(s.calls.length,0);});
test('request id cannot be reused with different data in the same instance',async()=>{const s=setup();const p=data();await s.post(p);assert.equal((await s.post({...p,NOME:'Another'})).status,409);});

test('network failure never returns success',async()=>{const s=setup(()=>{throw Error('offline');});assert.equal((await s.post(data())).status,502);});

test('contact error exposes only stage and allowlisted code, never provider message',async()=>{
  const s=setup(()=>Response.json({code:'unauthorized',message:'Sensitive contact test@example.com'},{status:401}));
  assert.deepEqual(await (await s.post(data())).json(),{success:false,error:'contact',code:'unauthorized'});
});
test('rejected attribute code survives the create failure without exposing its message',async()=>{
  const s=setup(c=>c.method==='GET'?new Response(null,{status:404}):Response.json({code:'invalid_parameter',message:'Sensitive attribute value'},{status:400}));
  assert.deepEqual(await (await s.post(data())).json(),{success:false,error:'contact',code:'invalid_parameter'});
});
test('email error is distinct from contact failure and arbitrary provider codes are hidden',async()=>{
  const s=setup(c=>c.method==='GET'?Response.json({attributes:{}}):c.url.endsWith('/smtp/email')?Response.json({code:'sensitive_unknown_value',message:'test@example.com'},{status:400}):accepted());
  assert.deepEqual(await (await s.post(data())).json(),{success:false,error:'email',code:'provider_error'});
});

for (const marketing of [false,true]) test('new contact guide delivery independent of optional marketing '+marketing,async()=>{
 const s=setup();assert.equal((await s.post({...data(),...(marketing?{MARKETING_CONSENT:'1'}:{})})).status,200);
 const contact=s.calls[1].body;assert.deepEqual(contact.listIds,marketing?[77,3]:[77]);
 assert.equal(contact.attributes.MARKETING_CONSENT,marketing);
 assert.equal(JSON.parse(contact.attributes.PASSO_REQUEST).marketingSelected,marketing);
 assert.equal('MARKETING_EVIDENCE' in contact.attributes,marketing);
 assert.equal(s.calls.filter(c=>c.url.endsWith('/smtp/email')).length,1);
});
for(const previous of [true,false]) test('unchecked preserves established marketing preference '+previous,async()=>{
 const s=setup(c=>c.method==='GET'?Response.json({attributes:{MARKETING_CONSENT:previous,MARKETING_EVIDENCE:'original',CONSENSO:true}}):accepted());
 await s.post(data());const a=s.calls[1].body.attributes;
 assert(!('MARKETING_CONSENT' in a));assert(!('MARKETING_EVIDENCE' in a));assert(!('CONSENSO' in a));
 assert.deepEqual(s.calls[1].body.listIds,[77]);
});
test('explicit new opt-in records evidence separately and adds marketing list',async()=>{
 const s=setup(c=>c.method==='GET'?Response.json({attributes:{MARKETING_CONSENT:false}}):accepted());
 await s.post({...data(),MARKETING_CONSENT:'1'});const a=s.calls[1].body.attributes;
 assert.equal(a.MARKETING_CONSENT,true);assert.match(JSON.parse(a.MARKETING_EVIDENCE).text,/Desidero ricevere/);
 assert.deepEqual(s.calls[1].body.listIds,[77,3]);
});
test('explicit opt-in never unblocks a previously unsubscribed contact',async()=>{
 const s=setup(c=>c.method==='GET'?Response.json({attributes:{MARKETING_CONSENT:false},emailBlacklisted:true}):accepted());
 await s.post({...data(),MARKETING_CONSENT:'1'});assert.deepEqual(s.calls[1].body.listIds,[77]);assert(!('emailBlacklisted' in s.calls[1].body));
});
test('same id with altered marketing is rejected',async()=>{
 const s=setup();const p=data();await s.post(p);assert.equal((await s.post({...p,MARKETING_CONSENT:'1'})).status,409);
});
test('guide and marketing cannot use same list',async()=>{
 const s=setup(null,{BREVO_LIST_ID_MARKETING:'77'});assert.equal((await s.post(data())).status,503);assert.equal(s.calls.length,0);
});
