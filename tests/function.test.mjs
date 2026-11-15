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

// ---------- Gemini switch + /api/identify ----------
const idOut = 'identify.bundle.mjs';
await build({ entryPoints: ['netlify/functions/identify.mts'], bundle: true, platform: 'node', format: 'esm', outfile: '/tmp/' + idOut, logLevel: 'error' });
const idMod = await import(pathToFileURL('/tmp/' + idOut).href + '?t=' + Date.now());
const idPost = (b) => new Request('http://x/api/identify', { method: 'POST', body: JSON.stringify(b), headers: { 'content-type': 'application/json' } });
const photo = { mime: 'image/jpeg', data: 'AAAA' };
delete process.env.ANTHROPIC_API_KEY; delete process.env.GEMINI_API_KEY; delete process.env.SSAI_AI_PROVIDER;
r = await idMod.handle(idPost({ image: photo })); j = await r.json();
assert.equal(r.status, 200); assert.equal(j.configured, false, 'no key + no gateway -> not configured');
r = await idMod.handle(idPost({})); assert.equal(r.status, 400);
r = await idMod.handle(idPost({ image: { mime: 'image/gif', data: 'AAAA' } })); assert.equal(r.status, 400);
r = await idMod.handle(new Request('http://x/api/identify')); assert.equal(r.status, 405);
// gateway path (stub Anthropic-shaped client): key from the list is honoured, free text is matched, unknown keys dropped
const idStub = (text) => ({ messages: { create: async (a) => { seen = a; return { content: [{ type: 'text', text }] }; } } });
r = await idMod.handle(idPost({ image: photo }), { client: idStub('```json\n' + JSON.stringify({ seen: 'a white sewing machine', kind: 'machine', items: [{ key: 'm:bernette-b59', name: 'bernette b59', confidence: 0.8 }, { key: 'm:does-not-exist', name: 'Brother Innov-is NV2700', confidence: 0.4 }, { key: null, name: 'Zigzag foot', confidence: 0.2 }] }) + '\n```') });
j = await r.json();
assert.equal(r.status, 200); assert.equal(j.configured, true);
assert.equal(j.matches[0].appId, 'b59'); assert.ok(j.matches.length <= 3);
assert.ok(j.matches.some((m) => m.appId === 'brother-innov-is-nv2700'), 'free-text name matched the registry');
assert.equal(seen.messages[0].content[0].type, 'image'); assert.ok(seen.system.includes('m:bernette-b59|'));
r = await idMod.handle(idPost({ image: photo }), { client: idStub('not json at all') }); assert.equal(r.status, 502);
r = await idMod.handle(idPost({ image: photo }), { client: idStub(JSON.stringify({ seen: 'a cat', kind: 'other', items: [] })) }); j = await r.json();
assert.deepEqual(j.matches, []);
// Provider switch: a GEMINI_API_KEY alone is ignored; Gemini needs SSAI_AI_PROVIDER=gemini as well
{
  const lib = await import('../netlify/lib/ai.ts');
  process.env.GEMINI_API_KEY = 'test-key';
  assert.equal(lib.pickProvider(), null, 'key alone, no gateway -> nothing configured (key ignored)');
  process.env.ANTHROPIC_API_KEY = 'gw'; assert.equal(lib.pickProvider().name, 'gateway', 'key alone -> gateway');
  process.env.SSAI_AI_PROVIDER = 'other'; assert.equal(lib.pickProvider().name, 'gateway', 'unknown provider value -> gateway');
  process.env.SSAI_AI_PROVIDER = 'gemini'; assert.equal(lib.pickProvider().name, 'gemini', 'switch + key -> gemini');
  delete process.env.GEMINI_API_KEY; assert.equal(lib.pickProvider().name, 'gateway', 'switch without key -> gateway');
  delete process.env.ANTHROPIC_API_KEY; assert.equal(lib.pickProvider(), null);
  delete process.env.SSAI_AI_PROVIDER;
  console.log('provider switch tests passed');
}
// Gemini path: SSAI_AI_PROVIDER=gemini + GEMINI_API_KEY switch provider, plain REST with the key in a header, vision parts + JSON mode
process.env.SSAI_AI_PROVIDER = 'gemini'; process.env.GEMINI_API_KEY = 'test-key';
const calls = [];
const gfetch = async (url, init) => { calls.push({ url: String(url), init, body: JSON.parse(init.body) });
  return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify({ seen: 'x', kind: 'machine', items: [{ key: 'm:bernette-b59', name: 'b59', confidence: 0.9 }] }) }] } }] }), { status: 200 }); };
r = await idMod.handle(idPost({ image: photo }), { fetch: gfetch }); j = await r.json();
assert.equal(j.configured, true); assert.equal(j.matches[0].appId, 'b59');
assert.ok(calls[0].url.includes('generativelanguage.googleapis.com') && calls[0].url.includes('gemini-3.5-flash-lite:generateContent'), calls[0].url);
assert.equal(calls[0].init.headers['x-goog-api-key'], 'test-key');
assert.equal(calls[0].body.contents[0].parts[0].inlineData.mimeType, 'image/jpeg');
assert.equal(calls[0].body.generationConfig.responseMimeType, 'application/json');
process.env.SSAI_GEMINI_MODEL = 'gemini-custom-lite';
calls.length = 0; await idMod.handle(idPost({ image: photo }), { fetch: gfetch }); assert.ok(calls[0].url.includes('gemini-custom-lite'));
delete process.env.SSAI_GEMINI_MODEL;
// Ask AI uses the same switch
const gAsk = async (url, init) => { calls.push({ url: String(url), body: JSON.parse(init.body) }); return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Use [[g:needle#4]] ok' }] } }] }), { status: 200 }); };
calls.length = 0;
r = await mod.handle(post({ question: 'How do I change the needle?', machine: 'b59', history: [{ role: 'user', text: 'hi' }, { role: 'assistant', text: 'hello' }] }), { fetch: gAsk }); j = await r.json();
assert.equal(r.status, 200); assert.equal(j.configured, true); assert.ok(/needle/i.test(calls[0].body.systemInstruction.parts[0].text));
assert.equal(calls[0].body.contents.at(-1).role, 'user'); assert.ok(j.model.startsWith('gemini'));
// invalid Gemini key (400 "API key not valid") -> configured:false with a helpful note, not a crash
const bad = async () => new Response(JSON.stringify({ error: { message: 'API key not valid. Please pass a valid API key.' } }), { status: 400 });
r = await mod.handle(post({ question: 'zipper?' }), { fetch: bad }); j = await r.json();
assert.equal(j.configured, false); assert.ok(/GEMINI_API_KEY/.test(j.detail)); assert.ok(!/AI|GEMINI/.test(j.note), 'customer-facing note has no AI wording');
// thinking-setting rejected -> retried without it
let n2 = 0; const think = async (url, init) => { n2++; const b = JSON.parse(init.body); if (b.generationConfig.thinkingConfig) return new Response('{"error":{"message":"thinking_level is not supported"}}', { status: 400 }); return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'fine' }] } }] }), { status: 200 }); };
r = await mod.handle(post({ question: 'zipper?' }), { fetch: think }); j = await r.json(); assert.equal(j.answer, 'fine'); assert.equal(n2, 2);
delete process.env.GEMINI_API_KEY; delete process.env.SSAI_AI_PROVIDER;
console.log('gemini + identify tests passed');
