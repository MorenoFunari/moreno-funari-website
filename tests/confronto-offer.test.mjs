import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import test from 'node:test';

const root = new URL('../.next/server/app/', import.meta.url).pathname;
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  });
}
const visible = html => html.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

test('all built commercial pages and metadata exclude the retired Pilot offer', () => {
  const files = htmlFiles(root);
  assert.ok(files.length > 30, 'Scan the full built site');
  for (const path of files) {
    // Legal disclosures are retained; they are not commercial offers.
    if (relative(root, path) === 'privacy-policy.html') continue;
    const html = readFileSync(path, 'utf8');
    assert.doesNotMatch(visible(html), /\bpilot\b|pilota|(?:6|sei) incontri|massimo (?:3|tre) (?:posti|persone|partecipanti)/i, relative(root, path));
    for (const meta of html.matchAll(/<meta\b[^>]*content="([^"]*)"[^>]*>/g)) {
      assert.doesNotMatch(meta[1], /\bpilot\b|pilota|(?:6|sei) incontri/i, relative(root, path));
    }
  }
});

test('every primary CONFRONTO entry presents the complete offer before form submission', () => {
  for (const page of ['index', 'confronto', 'ads/confronto', 'coaching', 'contatti', 'percorsi', 'grazie-confronto']) {
    const main = readFileSync(join(root, page + '.html'), 'utf8').match(/<main\b[\s\S]*?<\/main>/)?.[0];
    assert.ok(main, page);
    const text = visible(main);
    for (const term of ['gratuito', '30 minuti', 'online', 'in presenza', 'da concordare', 'senza obbligo di proseguire']) {
      assert.ok(text.toLowerCase().includes(term), `${page}: ${term}`);
    }
  }
});

test('existing CONFRONTO and PASSO redirect destinations remain compatible', () => {
  const redirects = JSON.parse(readFileSync(new URL('../.next/routes-manifest.json', import.meta.url), 'utf8')).redirects;
  assert.equal(redirects.find(x => x.source === '/percorso-pilota').destination, '/confronto');
  assert.equal(redirects.find(x => x.source === '/guida-dire-sempre-si').destination, '/passo');
  const wa = redirects.find(x => x.source === '/wa');
  assert.equal(wa.statusCode, 307);
  assert.equal(new URL(wa.destination).searchParams.get('text'), 'Ciao Moreno, vorrei un CONFRONTO');
});
