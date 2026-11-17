// Local QA only. Never import in application code.
import { appendFileSync, existsSync } from 'node:fs';
if (process.env.TRACKING_TEST_MODE !== 'true' || !process.env.PERCORSI_TEST_BREVO_LOG) throw Error('Explicit local QA required');
const original = globalThis.fetch;
const contacts = new Map();
globalThis.fetch = async (input, options = {}) => {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
  if (url.hostname !== 'api.brevo.com') return original(input, options);
  if (process.env.TRACKING_TEST_FAIL_FILE && existsSync(process.env.TRACKING_TEST_FAIL_FILE)) return new Response('', { status: 503 });
  const method = options.method ?? 'GET';
  const body = options.body ? JSON.parse(options.body) : null;
  if (method === 'GET' && url.pathname.startsWith('/v3/contacts/')) {
    const email = decodeURIComponent(url.pathname.split('/').at(-1));
    return contacts.has(email) ? Response.json(contacts.get(email)) : new Response(null,{status:404});
  }
  appendFileSync(process.env.PERCORSI_TEST_BREVO_LOG, JSON.stringify({url:url.toString(),method,body})+'\n');
  if (url.pathname === '/v3/contacts' && body?.email) contacts.set(body.email,body);
  else if (method === 'PUT' && url.pathname.startsWith('/v3/contacts/')) {
    const email=decodeURIComponent(url.pathname.split('/').at(-1));
    const previous=contacts.get(email)??{};
    contacts.set(email,{...previous,attributes:{...previous.attributes,...body.attributes},listIds:[...new Set([...(previous.listIds??[]),...body.listIds])]});
  } else if (url.pathname !== '/v3/smtp/email') throw Error('Unexpected provider path');
  return Response.json({messageId:'local-mock-not-delivered'},{status:201});
};
