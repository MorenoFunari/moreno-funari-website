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
    for (const term of ['gratuito', '30 minuti', 'online', 'senza obbligo di proseguire']) {
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

test('approved CONFRONTO copy and Home CTA destinations are rendered exactly', () => {
  const html = readFileSync(join(root, 'confronto.html'), 'utf8');
  const text = visible(html).replace(/&#x27;/g, "'");
  for (const expected of [
    'CONFRONTO: un primo incontro per capire da dove partire',
    '30 minuti, gratuito, online. Senza obbligo di proseguire.',
    'Sei sotto pressione da settimane e non riesci a staccare.',
    "Rimandi una decisione e ogni giorno pesa un po' di più.",
    'Sai cosa dovresti fare, ma non riesci a partire.',
    'Non è una sessione di coaching. Non è terapia e non è una diagnosi. Non ti prometto di risolvere tutto in un incontro.',
    'Descrivi in poche righe la situazione che vuoi portare',
    'Non serve inserire informazioni sulla salute.',
    'Richiedi il primo incontro',
  ]) assert.ok(text.includes(expected), expected);
  assert.ok(html.includes('<title>CONFRONTO, primo incontro conoscitivo gratuito | Moreno Funari Mental Coach</title>'));
  assert.ok(html.includes('name="description" content="30 minuti, online, per capire meglio la situazione che stai vivendo. Gratuito e senza obbligo di proseguire."'));
  const phone = html.match(/<input[^>]*name="phone"[^>]*>/)[0];
  assert.ok(!phone.includes('required'));
  const home = readFileSync(join(root, 'index.html'), 'utf8');
  const block = home.match(/<section[^>]*aria-labelledby="home-pilot-spot-title"[\s\S]*?<\/section>/)[0];
  const links = [...block.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  assert.equal(links.length, 2);
  for (const link of links) assert.equal(link[1], '/confronto');
  assert.ok(visible(block).includes('Richiedi il primo incontro'));
  assert.ok(visible(block).includes('Scrivimi CONFRONTO'));
});
