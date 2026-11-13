// Bundles the Netlify Function with esbuild (proving ../../js imports resolve) and unit-tests it with stubs.
import { build } from 'esbuild';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const out = '/tmp/ask.bundle.mjs';
await build({ entryPoints: ['netlify/functions/ask.mts'], bundle: true, platform: 'node', format: 'esm', outfile: out, logLevel: 'error' });
const mod = await import(pathToFileURL(out).href + '?t=' + Date.now());
const post = (b) => new Request('http://x/api/ask', { method: 'POST', body: JSON.stringify(b), headers: { 'content-type': 'application/json' } });
delete process.env.ANTHROPIC_API_KEY;
let r = await mod.handle(post({ question: 'How do I change the needle?', machine: 'b59' }));
assert.equal(r.status, 200); assert.equal((await r.json()).configured, false);
r = await mod.handle(new Request('http://x/api/ask', { method: 'GET' })); assert.equal(r.status, 405);
r = await mod.handle(post({ question: '' })); assert.equal(r.status, 400);
r = await mod.handle(post({ question: 'x'.repeat(1200) })); assert.equal(r.status, 400);
r = await mod.handle(post({ question: 'hi', image: { mime: 'image/gif', data: 'AAAA' } }), {}); assert.equal(r.status, 400);
let seen = null;
const stub = (impl) => ({ messages: { create: async (a) => { seen = a; return impl(a); } } });
r = await mod.handle(post({ question: 'How do I thread the needle? What about a photo?', machine: 'b59', image: { mime: 'image/jpeg', data: 'AAAA' }, history: [{ role: 'user', text: 'hello' }, { role: 'assistant', text: 'hi' }] }),
  { client: stub(() => ({ content: [{ type: 'text', text: 'Do this [[g:threading#6]] and [[g:fake#1]] then [[a:n-twin]].' }] })) });
let j = await r.json();
assert.equal(r.status, 200); assert.equal(j.configured, true); assert.deepEqual(j.refs, ['g:threading#6']); assert.ok(!j.answer.includes('fake') && !j.answer.includes('n-twin'));
assert.equal(seen.messages.at(-1).content[0].type, 'image'); assert.ok(seen.system.includes('[[g:threading#6]]'));
assert.equal(seen.messages[0].role, 'user');
// model fallback
let n = 0;
r = await mod.handle(post({ question: 'zipper foot?', machine: 'brother' }), { client: stub((a) => { n++; if (n === 1) { const e = new Error('nf'); e.status = 404; throw e; } return { content: [{ type: 'text', text: 'ok' }] }; }) });
assert.equal((await r.json()).answer, 'ok'); assert.equal(n, 2);
// auth failure → not configured
r = await mod.handle(post({ question: 'zipper foot?' }), { client: stub(() => { const e = new Error('no'); e.status = 401; throw e; }) });
assert.equal((await r.json()).configured, false);
r = await mod.handle(post({ question: 'zipper foot?' }), { client: stub(() => { const e = new Error('rl'); e.status = 429; throw e; }) });
assert.equal(r.status, 429);
// per-model machine ids are accepted and get model-specific context; junk ids fall back to the b59
const ok = () => ({ content: [{ type: 'text', text: 'ok' }], model: 'stub' });
r = await mod.handle(post({ question: 'How do I thread the loopers with air?', machine: 'bernette-b64-airlock' }), { client: stub(ok) });
assert.equal(r.status, 200);
assert.ok(seen.system.includes('Selected machine: b64') || /Selected machine: bernette b64/i.test(seen.system), 'model name in prompt');
assert.ok(seen.system.includes('g:bernette-b64-airlock~threading#'), 'model guide ids in context');
assert.ok(seen.system.includes('Known facts about this model'));
r = await mod.handle(post({ question: 'bobbin?', machine: 'not-a-machine' }), { client: stub(ok) });
assert.ok(/Selected machine: .*b59/i.test(seen.system));
r = await mod.handle(post({ question: 'bobbin?', machine: 'janome' }), { client: stub(ok) });
assert.ok(seen.system.includes('generic layout'));
console.log('function tests passed; bundle size', (await import('node:fs')).statSync(out).size);
