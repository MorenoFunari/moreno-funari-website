import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const root = '../.next/server/app/coaching/mental-coach-giovani-atleti';
const html = readFileSync(new URL(root + '.html', import.meta.url), 'utf8');
const main = html.match(/<main\b[\s\S]*?<\/main>/)[0];
const plain = main.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, '').replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/&#x([0-9a-f]+);/gi, (_, x) => String.fromCodePoint(parseInt(x, 16)));
const out = { exports: {} };
vm.runInNewContext(ts.transpileModule(readFileSync(new URL('../src/config/giovani-atleti-content.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: out.exports, module: out });
const { athleteSections: sections, athleteFaqs: faqs } = out.exports;
const fixture = readFileSync(new URL('./fixtures/giovani-atleti-approved-copy.txt', import.meta.url), 'utf8');
test('all approved copy and twelve FAQs are present verbatim in initial HTML', () => {
  for (const section of sections) for (const text of [section.title, ...section.blocks.flatMap(b => b.items || [b.text])]) { assert.ok(fixture.includes(text), text); assert.ok(plain.includes(text), text); }
  for (const f of faqs) for (const text of [f.question, f.answer]) { assert.ok(fixture.includes(text)); assert.ok(plain.includes(text), text); }
  assert.equal((main.match(/<h1\b/g) || []).length, 1);
  assert.equal((main.match(/<h2\b/g) || []).length, 10);
  assert.equal((main.match(/<summary\b/g) || []).length, 12);
});
test('absolute metadata, canonical, dedicated OG and publication lock', () => {
  assert.ok(html.includes('<title>Mental coach per giovani atleti | Frascati e online | Moreno Funari</title>'));
  assert.ok(html.includes('name="description" content="Per genitori di giovani sportivi: errore, pressione e fiducia nello sport. Mental coaching online o a Frascati e nei Castelli Romani. Richiedi informazioni."'));
  assert.ok(html.includes('rel="canonical" href="https://morenofunari.it/coaching/mental-coach-giovani-atleti"'));
  assert.ok(html.includes('name="robots" content="noindex, follow"'));
  assert.ok(html.includes('property="og:image" content="https://morenofunari.it/coaching/mental-coach-giovani-atleti/opengraph-image"'));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
});
test('schema matches visible FAQs and contains no invented offers, credentials or reviews', () => {
  const schema = JSON.parse(main.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
  assert.deepEqual(schema['@graph'].map(x => x['@type']), ['Person', 'Service', 'FAQPage', 'BreadcrumbList']);
  for (let i = 0; i < 12; i++) { assert.equal(schema['@graph'][2].mainEntity[i].name, faqs[i].question); assert.equal(schema['@graph'][2].mainEntity[i].acceptedAnswer.text, faqs[i].answer); }
  assert.doesNotMatch(JSON.stringify(schema), /"Offer"|"Review"|"AggregateRating"|"LocalBusiness"|"hasCredential"|"address"/);
});
test('dedicated form: no minor identifiers or funnel destinations, privacy required and optional phone', () => {
  for (const name of ['role', 'name', 'email', 'age', 'sport', 'note', 'privacyConsent']) assert.ok(main.match(new RegExp(`<(?:input|select|textarea)[^>]*name="${name}"[^>]*>`))?.[0].includes('required=""'), name);
  assert.doesNotMatch(main.match(/<input[^>]*name="phone"[^>]*>/)[0], /required/);
  assert.doesNotMatch(main.match(/<input[^>]*name="privacyConsent"[^>]*>/)[0], /checked/);
  assert.doesNotMatch(main, /name="(?:childName|birthDate|school|team)"|href="\/(?:confronto|percorsi|passo)"/);
  assert.match(main, /href="\/chi-sono"/); assert.match(main, /href="\/privacy-policy"/);
  assert.equal((main.match(/href="#richiesta"/g) || []).length, 3);
  assert.ok(main.includes('Bastano poche righe. Non serve inserire informazioni sanitarie.'));
});
test('sitemap publication switch includes the route only when approved, without changing global crawler policy', async () => {
  const source = readFileSync(new URL('../src/app/sitemap.ts', import.meta.url), 'utf8');
  for (const ready of [false, true]) {
    const sitemapModule = { exports: {} };
    vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
      module: sitemapModule, exports: sitemapModule.exports,
      require: id => {
        if (id === '@/config/giovani-atleti') return { athletePublicationReady: ready, athletePath: '/coaching/mental-coach-giovani-atleti' };
        if (id === '@/config/seo') return { toAbsoluteUrl: p => 'https://morenofunari.it' + p };
        if (id === '@/lib/blog/blog-content') return { getPublishedBlogPosts: async () => [] };
        if (id === '@/lib/blog/blog-date') return { editorialDateToIso: x => x };
        throw new Error(id);
      },
    });
    const urls = (await sitemapModule.exports.default()).map(x => x.url);
    assert.equal(urls.includes('https://morenofunari.it/coaching/mental-coach-giovani-atleti'), ready);
    assert.ok(urls.includes('https://morenofunari.it/percorsi'));
  }
  const robots = readFileSync(new URL('../src/app/robots.ts', import.meta.url), 'utf8');
  assert.match(robots, /userAgent: "\*"/); assert.match(robots, /allow: "\/"/);
});
