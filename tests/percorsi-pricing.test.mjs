import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
function load(file, imports = {}) {
  const code = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022 } }).outputText;
  const result = { exports: {} };
  vm.runInNewContext(code, { module: result, exports: result.exports, Intl, require: id => Object.hasOwn(imports, id) ? imports[id] : require(id) });
  return result.exports;
}
const config = load('../src/config/percorsi.ts');
const { PercorsiPricingSection } = load('../src/components/sections/percorsi/percorsi-pricing-section.tsx', {
  '@/config/percorsi': config,
  '@/components/ui/button-link': { ButtonLink: ({ href, children }) => React.createElement('a', { href }, children) },
  '@/components/ui/container': { Container: ({ children, as, className, ...props }) => React.createElement(as, { ...props, className }, children) },
  '@/components/ui/section-heading': { SectionHeading: ({ id, title }) => React.createElement('h2', { id }, title) },
  '../coaching/expectations-section.module.css': {},
});
const render = pricing => renderToStaticMarkup(React.createElement(PercorsiPricingSection, { pricing }));
test('five launch places: final 700 EUR, ordinary 1100 EUR, approved VAT wording without tax additions', () => {
  assert.equal(config.percorsiConfig.launchPlacesAvailable, 5);
  assert.equal(config.getPercorsiPrice(), 700);
  const html = render();
  assert.match(html, /700\s*€/); assert.match(html, /1\.100\s*€/);
  assert.ok(html.includes('Importi finali, senza maggiorazioni.'));
  assert.ok(html.includes('Il prezzo di lancio è riservato ai primi cinque partecipanti.'));
  assert.doesNotMatch(html, /\+\s*IVA|IVA esclusa|franchigia|Offer/);
  assert.equal(config.percorsiConfig.fiscalWording, "IVA inclusa");
  assert.ok(html.includes("IVA inclusa"));
  assert.equal(config.percorsiConfig.showOfferSchema, false);
  assert.equal(config.percorsiConfig.privacyConfirmed, false);
  assert.ok(html.includes('id="prezzo"')); assert.ok(html.includes('href="#richiesta"'));
});
for (const [label, changes] of [['exhausted launch', { launchPlacesAvailable: 0 }], ['disabled launch', { launchEnabled: false }]]) {
  test(`${label}: only ordinary final price, no launch claim`, () => {
    const pricing = { ...config.percorsiConfig, ...changes };
    assert.equal(config.getPercorsiPrice(pricing), 1100);
    const html = render(pricing);
    assert.match(html, /1\.100\s*€/); assert.doesNotMatch(html, /700|Prezzo di lancio|cinque partecipanti/);
    assert.ok(html.includes('Importi finali, senza maggiorazioni.'));
    assert.ok(html.includes('IVA inclusa'));
  });
}
test('remaining availability retains the launch price; price updates are read from the same configuration', () => {
  assert.equal(config.getPercorsiPrice({ ...config.percorsiConfig, launchPlacesAvailable: 1 }), 700);
  const pricing = { ...config.percorsiConfig, launchPrice: 750, ordinaryPrice: 1200 };
  assert.equal(config.getPercorsiPrice(pricing), 750);
  assert.match(render(pricing), /750\s*€/); assert.match(render(pricing), /1\.200\s*€/);
});
