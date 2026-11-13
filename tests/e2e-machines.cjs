// Per-machine end-to-end sweep: b59 + every built model, at 390px and 1280px.
// Static server on :8801 first (python3 -m http.server 8801), then:
//   PUPPETEER_PATH=/workspace/tools/node_modules/puppeteer-core node tests/e2e-machines.cjs
const puppeteer = require(process.env.PUPPETEER_PATH || 'puppeteer-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const BASE = process.env.BASE || 'http://localhost:8801/';
const SHOTS = process.env.SHOTS || __dirname + '/../screenshots';
fs.mkdirSync(SHOTS, { recursive: true });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const errors = []; const problems = [];
const nav = async (pg, h) => { await pg.evaluate(x => { location.hash = x; }, h); await sleep(120); };
const text = (pg, s) => pg.$eval(s, e => e.innerText);

async function sweep(browser, w, h) {
  const pg = await browser.newPage(); await pg.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  pg.on('pageerror', e => errors.push(`[${w}] PAGEERR ${e.message}`));
  pg.on('console', m => { if (m.type() === 'error') errors.push(`[${w}] CONSOLE ${m.text()}`); });
  await pg.setRequestInterception(true);
  pg.on('request', req => { if (req.url().endsWith('/api/ask')) req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ configured: false }) }).catch(() => {}); else req.continue().catch(() => {}); });
  await pg.goto(BASE, { waitUntil: 'networkidle0' });
  const info = await pg.evaluate(async () => {
    const r = await import('/js/registry.js');
    return r.MACHINES.filter(m => m.id === 'b59' || m.model).map(m => ({ id: m.id, name: m.name, views: r.viewsFor(m.id).map(v => ({ id: v.id, n: v.parts.length })), guides: r.guidesFor(m.id).map(g => ({ id: g.id, steps: g.steps.length })), gear: r.accessoriesFor(m.id).map(a => a.id), pages: r.pagesFor(m.id).length }));
  });
  const expected = 1 + (await pg.evaluate(async () => (await import('/js/machines/index.js')).MODELS.length));
  assert.equal(info.length, expected, 'b59 + every registered model');
  console.log('machines under test:', info.length);
  let nViews = 0, nSteps = 0;
  for (const m of info) {
    await pg.evaluate(id => { localStorage.setItem('ssai.v1', JSON.stringify({ machine: id, progress: {} })); location.hash = '#/'; }, m.id);
    await pg.reload({ waitUntil: 'networkidle0' });
    assert.ok((await text(pg, 'main')).includes('Welcome'), `${m.id} home`);
    for (const v of m.views) {
      await nav(pg, '#/machine/' + v.id); nViews++;
      const r = await pg.evaluate(() => {
        const c = [...document.querySelectorAll('.hs')].map(e => { const b = e.getBoundingClientRect(); return { id: e.dataset.id, x: b.x + b.width / 2, y: b.y + b.height / 2 }; });
        const bad = []; for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++) if (Math.hypot(c[i].x - c[j].x, c[i].y - c[j].y) < 24) bad.push(c[i].id + '/' + c[j].id);
        return { svg: !!document.querySelector('main svg.scene'), n: c.length, bad, over: document.documentElement.scrollWidth > innerWidth + 1 };
      });
      if (!r.svg) problems.push(`[${w}] ${m.id} ${v.id}: no svg`);
      if (r.n !== v.n) problems.push(`[${w}] ${m.id} ${v.id}: ${r.n} hotspots, expected ${v.n}`);
      if (r.bad.length) problems.push(`[${w}] ${m.id} ${v.id}: marker overlap ${r.bad.join(' ')}`);
      if (r.over) problems.push(`[${w}] ${m.id} ${v.id}: horizontal overflow`);
    }
    for (const g of m.guides) for (let s = 1; s <= g.steps; s++) {
      await nav(pg, `#/guide/${g.id}/${s}`); nSteps++;
      const r = await pg.evaluate(() => ({ svg: !!document.querySelector('main svg.scene'), t: document.querySelector('main').innerText.length, over: document.documentElement.scrollWidth > innerWidth + 1 }));
      if (!r.svg || r.t < 80) problems.push(`[${w}] ${m.id} ${g.id} step ${s}: empty (${JSON.stringify(r)})`);
      if (r.over) problems.push(`[${w}] ${m.id} ${g.id} step ${s}: horizontal overflow`);
    }
    await nav(pg, '#/gear'); const cards = (await pg.$$('.gcard')).length;
    if (cards < 2) problems.push(`[${w}] ${m.id}: only ${cards} gear cards (need ≥2)`);
    if (m.gear[0]) { await nav(pg, '#/gear/' + m.gear[0]); if (!(await text(pg, 'main')).includes('How to fit it')) problems.push(`[${w}] ${m.id}: gear detail ${m.gear[0]} broken`); }
    await nav(pg, '#/manuals'); const mt = await text(pg, 'main');
    if (!/Official manuals/.test(mt)) problems.push(`[${w}] ${m.id}: manuals page broken`);
    if (m.pages && !/Where to look/.test(mt)) problems.push(`[${w}] ${m.id}: pages table missing`);
    if (!m.pages && /Where to look/.test(mt)) problems.push(`[${w}] ${m.id}: pages table shown without verified pages`);
  }
  // browse page
  await pg.evaluate(() => localStorage.clear()); await pg.reload({ waitUntil: 'networkidle0' });
  await nav(pg, '#/machines');
  assert.equal((await pg.$$('#mlist .mrow')).length, 155, 'all 155 listed');
  await pg.type('#mq', 'janome'); await sleep(100);
  const jn = await pg.$$eval('#mlist .mrow', e => e.map(x => x.innerText));
  assert.ok(jn.length > 5 && jn.every(t => /janome/i.test(t)), 'search narrows to janome');
  await pg.$eval('#mq', e => { e.value = ''; e.dispatchEvent(new Event('input')); });
  await pg.$eval('[data-g="overlocker"]', e => e.click()); await sleep(100);
  const ov = await pg.$$eval('#mlist .mrow', e => e.length); assert.ok(ov > 3 && ov < 155, 'type filter');
  await pg.$eval('[data-g="all"]', e => e.click()); await pg.$eval('[data-b="Brother"]', e => e.click()); await sleep(100);
  assert.ok((await pg.$$eval('#mlist .mrow', e => e.every(x => /brother/i.test(x.innerText)))), 'brand filter');
  await pg.$eval('[data-b="all"]', e => e.click());
  await pg.$eval('#mq', e => { e.value = 'LX25'; e.dispatchEvent(new Event('input')); }); await sleep(100);
  await pg.$eval('#mlist [data-pick]', e => e.click()); await sleep(300);
  assert.equal(await pg.evaluate(() => location.hash), '#/machine'); assert.ok((await text(pg, 'main')).includes('LX25'));
  if (!(await pg.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))) problems.push(`[${w}] browse overflow`);
  // ask offline fallback search per model
  for (const id of ['bernette-b64-airlock', 'brother-lx25', 'janome-5060-qdc']) {
    await pg.evaluate(x => { localStorage.setItem('ssai.v1', JSON.stringify({ machine: x, progress: {} })); location.hash = '#/'; }, id); await pg.reload({ waitUntil: 'networkidle0' });
    await nav(pg, '#/ask'); await pg.type('#q', 'how do I thread the machine'); await pg.click('#send'); await sleep(900);
    if (!(await pg.$(`#chat a[href*="${id}~"]`))) problems.push(`[${w}] ask fallback for ${id} does not link a model guide`);
  }
  console.log(`[${w}px] ${info.length} machines, ${nViews} diagram views, ${nSteps} guide steps checked`);
  await pg.close();
}
(async () => {
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: 'new' });
  const pid = browser.process().pid; console.log('browser pid', pid);
  try { await sweep(browser, 390, 844); await sweep(browser, 1280, 860); } finally { await browser.close(); }
  const real = errors.filter(e => !/favicon|api\/ask/.test(e));
  if (problems.length || real.length) { console.log('PROBLEMS:\n' + problems.join('\n') + '\nERRORS:\n' + real.join('\n')); process.exit(1); }
  console.log('machines e2e passed, no console errors');
})().catch(e => { console.error('FAILED', e); console.error(problems.join('\n')); console.error(errors.join('\n')); process.exit(1); });
