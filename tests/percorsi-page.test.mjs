import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

function data(file) {
  const result = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { module: result, exports: result.exports });
  return result.exports;
}
const { percorsiContent: copy, percorsiFaqs: faqs } = data('../src/config/percorsi-content.ts');
const approved = readFileSync(new URL('./fixtures/percorsi-approved-copy.txt', import.meta.url), 'utf8');
const html = readFileSync(new URL('../.next/server/app/percorsi.html', import.meta.url), 'utf8');
const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
const decode = text => text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
const plain = decode(main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ''));
const strings = value => typeof value === 'string' ? [value] : Object.values(value).flatMap(strings);

test('every approved content string and FAQ is verbatim in the signed-off source and rendered HTML', () => {
  for (const text of [...strings(copy), ...strings(faqs)]) {
    assert.ok(approved.includes(text), `Copy rewritten or invented: ${text}`);
    if (text !== copy.request.placeholder) assert.ok(plain.includes(text), `Copy missing from rendered page: ${text}`);
  }
  assert.ok(plain.includes('Il percorso è lo stesso a entrambi i prezzi: il prezzo di lancio non corrisponde a un servizio ridotto.'));
  assert.ok(plain.includes('Il colloquio serve a capire se il percorso è adatto alla situazione che vuoi affrontare. Non comporta alcun obbligo di iniziare.'));
});
test('one H1, exactly ten H2s in approved order; method H3s, semantic inclusions and FAQs', () => {
  assert.equal((main.match(/<h1\b/g) || []).length, 1);
  const headings = [...main.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/g)].map(m => decode(m[1]));
  assert.deepEqual(headings, [copy.situations.title, copy.definition.title, copy.includes.title, copy.method.title, copy.boundaries.title, 'Quanto costa il percorso', copy.author.title, copy.request.title, 'Domande frequenti', copy.closing.title]);
  assert.equal((main.match(/<summary\b/g) || []).length, 10);
  assert.equal((main.match(/<dt\b/g) || []).length, 6);
  for (const step of copy.method.steps) assert.ok(main.includes(`<h3>${step.title}</h3>`));
  for (const id of ['come-lavoriamo', 'prezzo', 'richiesta']) assert.ok(main.includes(`id="${id}"`));
});
test('approved absolute SEO title, canonical, descriptions, robots and social metadata', () => {
  assert.ok(html.includes('<title>Percorso di mental coaching individuale | Moreno Funari</title>'));
  const description = 'Un Passo Possibile: 6 incontri individuali online di Mental Coaching per fare chiarezza su una situazione concreta. Cosa comprende, prezzi e come iniziare.';
  for (const attribute of ['name="description"', 'property="og:description"', 'name="twitter:description"']) assert.ok(html.includes(`${attribute} content="${description}"`));
  assert.ok(html.includes('rel="canonical" href="https://morenofunari.it/percorsi"'));
  assert.ok(html.includes('name="robots" content="index, follow"'));
  assert.ok(html.includes('property="og:title" content="Percorso di mental coaching individuale"'));
  assert.ok(html.includes('name="twitter:title" content="Percorso di mental coaching individuale"'));
  assert.ok(html.includes('property="og:url" content="https://morenofunari.it/percorsi"'));
  assert.ok(html.includes('property="og:type" content="website"'));
  assert.ok(html.includes('https://morenofunari.it/opengraph-image'));
});
test('Service and BreadcrumbList valid; no Offer/reviews invented', () => {
  const schema = JSON.parse(main.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
  assert.deepEqual(schema['@graph'].map(x => x['@type']), ['Service', 'BreadcrumbList']);
  const service = schema['@graph'][0]; assert.equal(service.name, 'Un Passo Possibile'); assert.equal(service.provider.name, 'Moreno Funari');
  assert.equal(service.availableChannel.serviceUrl, 'https://morenofunari.it/percorsi#richiesta');
  assert.equal(service.offers, undefined); assert.doesNotMatch(JSON.stringify(schema), /AggregateRating|LocalBusiness|Review|Product/);
});
test('only approved commercial links inside main; Pilot chrome unchanged outside main', () => {
  const allowed = new Set(['#richiesta', '#come-lavoriamo', '/chi-sono', '/privacy-policy']);
  for (const match of main.matchAll(/<a\b[^>]*href="([^"]+)"/g)) assert.ok(allowed.has(match[1]), match[1]);
  assert.equal((main.match(/href="#richiesta"/g) || []).length, 3);
  assert.doesNotMatch(main, /href="\/confronto|wa\.me|Scrivimi CONFRONTO|Scrivi PASSO|\[DA|CONFERMARE|TODO|\+ IVA/);
});
test('commercial form approved labels, required fields and markers', () => {
  for (const label of ['Come ti chiami?', 'La tua email', 'Raccontami brevemente la situazione che vorresti affrontare', 'Ho letto l’', 'Invia la richiesta']) assert.ok(main.includes(label));
  assert.ok(main.includes('placeholder="Bastano poche righe. Non serve che sia già tutto chiaro."'));
  assert.match(main, /name="tipo_richiesta" value="percorso_pagamento"/);
  assert.match(main, /name="origine" value="\/percorsi"/);
  for (const name of ['name', 'email', 'note', 'privacyConsent']) {
    const tag = main.match(new RegExp(`<[^>]+name="${name}"[^>]*>`))?.[0];
    assert.ok(tag?.includes('required=""'), `${name} must be required`);
  }
  const phone = main.match(/<input\b[^>]*name="phone"[^>]*>/)[0]; assert.ok(!phone.includes('required'));
});
test('footer has Percorsi immediately after Coaching, while main navigation stays unchanged', () => {
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)[0];
  assert.match(footer, /href="\/coaching">Coaching<\/a><\/li><li><a[^>]*href="\/percorsi">Percorsi/);
  const header = html.match(/<header\b[\s\S]*?<\/header>/)[0]; assert.ok(!header.includes('href="/percorsi"'));
});
test('coaching FAQ changes are exact and no unrelated answers changed', () => {
  const coaching = decode(readFileSync(new URL('../.next/server/app/coaching.html', import.meta.url), 'utf8').replace(/<[^>]+>/g, ''));
  for (const text of [
    'Il percorso individuale Un Passo Possibile prevede 6 incontri online di circa 60 minuti, uno a settimana. Prima di iniziare verifichiamo insieme se è adatto alla situazione che vuoi affrontare.',
    'Durata, modalità e prezzi del percorso individuale sono indicati nella pagina Un Passo Possibile. Il percorso pilota gratuito ha condizioni e accesso separati.',
    'Sì. Un primo confronto può servire a fare chiarezza e a capire se desideri proseguire. Non comporta l’obbligo di iniziare un percorso.',
  ]) assert.ok(coaching.includes(text), text);
});
