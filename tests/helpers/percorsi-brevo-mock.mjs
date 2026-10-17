// Preload only into a LOCAL test server. Never import from application code.
import { appendFileSync, existsSync } from 'node:fs';
if (process.env.PERCORSI_TEST_MODE !== 'true' || !process.env.PERCORSI_TEST_BREVO_LOG) throw new Error('Explicit local test mode and log path required');
const originalFetch = globalThis.fetch;
globalThis.fetch = async function(input, options) {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
  if (url.hostname === 'api.brevo.com') {
    const record = { url: url.toString(), body: JSON.parse(options.body) };
    appendFileSync(process.env.PERCORSI_TEST_BREVO_LOG, JSON.stringify(record) + '\n');
    if (url.pathname !== '/v3/smtp/email') throw new Error('Unexpected contact/list/Pilot call');
    if (process.env.PERCORSI_TEST_FAIL_FILE && existsSync(process.env.PERCORSI_TEST_FAIL_FILE)) return new Response('', { status: 503 });
    return Response.json({ messageId: 'local-mock-notification' }, { status: 201 });
  }
  return originalFetch(input, options);
};
