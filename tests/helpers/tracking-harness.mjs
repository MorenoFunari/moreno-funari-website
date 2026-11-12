import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require = createRequire(import.meta.url);
export function loadSource(path, mocks = {}, globals = {}) {
  const sourceModule = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL('../../' + path, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(code, { module: sourceModule, exports: sourceModule.exports, require: name => {
    if (name.endsWith('.css')) return { default: {} };
    if (name in mocks) return mocks[name];
    if (name.startsWith('node:')) return require(name);
    throw new Error('Unexpected dependency: ' + name);
  }, console: { error() {}, warn() {} }, ...globals });
  return sourceModule.exports;
}
export function hooks() {
  const slots = [], pending = [];
  let cursor = 0;
  const react = {
    useId: () => 'test-form',
    useRef: value => { const i = cursor++; slots[i] ??= { current: value }; return slots[i]; },
    useState: value => { const i = cursor++; if (!(i in slots)) slots[i] = value; return [slots[i], next => { slots[i] = typeof next === 'function' ? next(slots[i]) : next; }]; },
    useCallback: fn => fn,
    useEffect: (fn, deps) => { const i = cursor++; const prev = slots[i]; if (!prev || deps.some((x, n) => x !== prev.deps[n])) { prev?.cleanup?.(); slots[i] = { fn, deps }; pending.push(slots[i]); } },
  };
  return { react, jsx: { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }), Fragment: 'fragment' },
    render(fn, props) { cursor = 0; const tree = fn(props); while (pending.length) { const item = pending.shift(); item.cleanup = item.fn(); } return tree; },
    replayEffects() { for (const item of slots) if (item?.fn) { item.cleanup?.(); item.cleanup = item.fn(); } },
  };
}
export function find(tree, predicate) {
  if (!tree || typeof tree !== 'object') return;
  if (Array.isArray(tree)) { for (const child of tree) { const hit = find(child, predicate); if (hit) return hit; } return; }
  if (predicate(tree)) return tree;
  return find(tree.props?.children, predicate);
}
export class TestFormData {
  constructor(form) { this.values = form.values; }
  get(name) { return this.values[name] ?? null; }
}
export function event(form) { return { preventDefault() {}, currentTarget: form }; }
export function deferred() { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; }
export function assertNoPersonalData(events) {
  for (const command of events) if (command[0] === 'event') {
    const params = JSON.stringify(command[2]);
    assert(!/test@example|Private note|Private name|39333/.test(params));
    for (const key of ['email', 'name', 'phone', 'note', 'requestId']) assert(!(key in command[2]));
  }
}
