// Explicitly preload into a local QA server only. Never import in application code.
import { appendFileSync, existsSync } from 'node:fs';
if (process.env.TRACKING_TEST_MODE !== 'true' || !process.env.PERCORSI_TEST_BREVO_LOG) throw Error('Explicit local tracking test mode/log required');
const original = globalThis.fetch;
globalThis.fetch = async (input, options) => {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
  if (url.hostname !== 'api.brevo.com') return original(input, options);
  if (!['/v3/contacts','/v3/smtp/email'].includes(url.pathname)) throw Error('Unexpected provider path');
  if (process.env.TRACKING_TEST_FAIL_FILE && existsSync(process.env.TRACKING_TEST_FAIL_FILE)) return new Response('', { status: 503 });
  appendFileSync(process.env.PERCORSI_TEST_BREVO_LOG, JSON.stringify({ url: url.toString(), body: JSON.parse(options.body) }) + '\n');
  return Response.json({ messageId: 'local-mock-not-delivered' }, { status: 201 });
};
