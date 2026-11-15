// v7 shots + smoke checks (Bobbin rebrand): welcome, Ask Bobbin (with the thinking mascot), threading step 8, identify,
// and a sweep that no customer-visible text says "AI".
//   python3 -m http.server 8801 &   then   PUPPETEER_PATH=/workspace/tools/node_modules/puppeteer-core node tests/shots-v7.cjs
const puppeteer = require(process.env.PUPPETEER_PATH || 'puppeteer-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const BASE = process.env.BASE || 'http://localhost:8801/';
const SHOTS = __dirname + '/../screenshots';
fs.mkdirSync(SHOTS, { recursive: true });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const errors = [];
const MOCK = { configured: true, seen: 'a white computerised sewing machine with a colour touchscreen', kind: 'machine', guesses: ['bernette b59'],
  matches: [{ kind: 'machine', id: 'bernette-b59', appId: 'b59', name: 'bernette B59', hasBreakdown: true, confidence: 0.82 },
            { kind: 'machine', id: 'bernette-b79', appId: 'bernette-b79', name: 'bernette b79', hasBreakdown: true, confidence: 0.46 }] };
let delay = 0, mode = 'ok';
async function page(browser, w, h, reduce) {
  const pg = await browser.newPage(); await pg.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  if (reduce) await pg.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  pg.on('pageerror', e => errors.push(`[${w}] PAGEERR ${e.message}`));
  pg.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(`[${w}] CONSOLE ${m.text()}`); });
  await pg.setRequestInterception(true);
  pg.on('request', async req => {
    const u = req.url();
    if (u.endsWith('/api/identify') || u.endsWith('/api/ask')) {
      if (delay) await sleep(delay);
      const body = u.endsWith('/api/ask')
        ? (mode === 'off' ? { configured: false, note: 'Bobbin is not switched on for this site yet.' } : { configured: true, answer: 'Try this:\n1. Raise the **presser foot**.\n2. Re-thread from the spool [[g:threading#4]].', refs: ['g:threading#4'] })
        : MOCK;
      return req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify(body) }).catch(() => {});
    }
    req.continue().catch(() => {});
  });
  return pg;
}
const nav = async (pg, hash) => { await pg.evaluate(h => { location.hash = h; }, hash); await sleep(500); };
const shot = (pg, name) => pg.screenshot({ path: `${SHOTS}/v9-${name}.png` });
const click = (pg, sel) => pg.$eval(sel, e => e.click());
fs.writeFileSync('/tmp/tiny.png', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'));
const AI = /\bAI\b|\bA\.I\./;

(async () => {
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: 'new' });
  // ---- static files ----
  for (const f of ['index.html', 'manifest.webmanifest']) { const t = fs.readFileSync(__dirname + '/../' + f, 'utf8'); assert.ok(!AI.test(t.replace(/<script[\s\S]*?<\/script>/g, '')), f + ' mentions AI'); }
  const man = JSON.parse(fs.readFileSync(__dirname + '/../manifest.webmanifest', 'utf8')); assert.equal(man.name, 'Bobbin'); assert.equal(man.short_name, 'Bobbin');
  assert.match(fs.readFileSync(__dirname + '/../index.html', 'utf8'), /<title>Bobbin/);

  for (const [tag, w, h] of [['phone', 390, 844], ['desktop', 1280, 800]]) {
    const pg = await page(browser, w, h);
    await pg.goto(BASE, { waitUntil: 'load' }); await sleep(900);
    assert.equal(await pg.$eval('.hero-title', e => e.textContent), 'Bobbin');
    assert.ok(await pg.$('.byline [data-logo], .byline .logo-text'), 'by <logo> under the name');
    assert.ok(await pg.$('.wfoot a[href="https://www.thesewingstudio.co.uk"]'), 'footer logo links to the shop');
    assert.ok(await pg.$$eval('img[data-logo]', is => is.length > 0 && is.every(i => i.complete && i.naturalWidth > 0)), 'shop logo loads');
    assert.ok(!(await pg.$('.logo-slot')), 'placeholder replaced');
    assert.ok(/Redruth/.test(await pg.$eval('.welcome', e => e.textContent)));
    await shot(pg, `${tag}-welcome`);
    if (tag === 'phone') { await pg.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await sleep(300); await shot(pg, 'phone-welcome-footer'); await pg.evaluate(() => window.scrollTo(0, 0)); }
    // ---- sweep every view for visible "AI" ----
    const hashes = ['#/', '#/browse', '#/machines', '#/machine', '#/guides', '#/guide/threading/3', '#/gear', '#/gear/hopper', '#/manuals', '#/ask', '#/thread/b59/upper/8', '#/thread/b59/winding/3', '#/thread/b59/insert/7'];
    for (const hh of hashes) { await nav(pg, hh); const t = await pg.evaluate(() => document.body.innerText + ' ' + document.title + ' ' + [...document.querySelectorAll('[aria-label],[alt],[title],[placeholder]')].map(e => ['aria-label', 'alt', 'title', 'placeholder'].map(a => e.getAttribute(a)).join(' ')).join(' ')); assert.ok(!AI.test(t), `visible "AI" on ${hh}: ${(t.match(/.{0,30}\bAI\b.{0,30}/) || [''])[0]}`); }
    // other machines too (a generic layout, a per-model page)
    for (const id of ['brother', 'bernette-b79', 'brother-innov-is-f580']) { await pg.evaluate(i => { const s = JSON.parse(localStorage.getItem('ssai.v1') || '{}'); s.machine = i; localStorage.setItem('ssai.v1', JSON.stringify(s)); }, id); await pg.reload({ waitUntil: 'load' }); for (const hh of ['#/ask', '#/guides', '#/machine', '#/browse']) { await nav(pg, hh); const t = await pg.evaluate(() => document.body.innerText); assert.ok(!AI.test(t), `visible "AI" for ${id} ${hh}`); } }
    await pg.evaluate(() => { localStorage.clear(); }); await pg.reload({ waitUntil: 'load' });
    // ---- Ask Bobbin, thinking state, answer with avatar ----
    await nav(pg, '#/ask'); assert.equal(await pg.$eval('h1.page', e => e.textContent), 'Ask Bobbin');
    assert.ok((await pg.$eval('.askbox + p', e => e.textContent)).includes('Bobbin can make mistakes, so check'));
    delay = 5200; await pg.type('#q', 'Why does my thread keep breaking?'); await click(pg, '#send'); await sleep(900);
    assert.ok(await pg.$('.thinking .bm.live'), 'mascot thinking state'); const l1 = await pg.$eval('.tline', e => e.textContent);
    await sleep(2400); const l2 = await pg.$eval('.tline', e => e.textContent); assert.notEqual(l1, l2, 'status line rotates');
    if (tag === 'phone') { await pg.evaluate(() => document.querySelector('.thinking').scrollIntoView({ block: 'center' })); await sleep(250); await shot(pg, 'phone-bobbin-thinking'); }
    await pg.waitForSelector('.msg.a .av .bm', { timeout: 8000 }); delay = 0;
    if (tag === 'phone') { await pg.evaluate(() => window.scrollTo(0, 0)); await sleep(200); await shot(pg, 'phone-ask-bobbin'); }
    // ---- threading step 8 ----
    await nav(pg, '#/thread/b59/upper/8'); await sleep(1100);
    await pg.evaluate(() => document.querySelector('.tv').scrollIntoView({ block: 'start' })); await sleep(200);
    if (tag === 'phone') await shot(pg, 'phone-thread-step8');
    // ---- identify: thinking then results ----
    await nav(pg, '#/'); delay = 1800; await (await pg.$('#wcam')).uploadFile('/tmp/tiny.png'); await sleep(700);
    assert.ok(await pg.$('#idres .thinking .bm.live'), 'identify thinking state');
    await pg.waitForSelector('.id-item', { timeout: 8000 }); delay = 0;
    assert.ok(/Bobbin thinks this is/.test(await pg.$eval('#idres', e => e.textContent)));
    if (tag === 'phone') { await pg.evaluate(() => document.querySelector('.cam-card').scrollIntoView({ block: 'start' })); await sleep(250); await shot(pg, 'phone-identify-results'); }
    await pg.close();
  }
  // reduced motion: mascot stays, no bobbing/tapping
  const rm = await page(browser, 390, 844, true); await rm.goto(BASE + '#/ask', { waitUntil: 'load' }); delay = 1500; await rm.type('#q', 'hello'); await click(rm, '#send'); await sleep(500);
  const anims = await rm.$eval('.thinking .bm-all', e => getComputedStyle(e).animationName); assert.equal(anims, 'none', 'no bobbing with reduced motion');
  assert.notEqual(await rm.$eval('.thinking .bm-eyes', e => getComputedStyle(e).animationName), 'none', 'blinking kept');
  await rm.close(); delay = 0;
  await browser.close();
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  console.log('v9 shots ok');
})().catch(e => { console.error(e); process.exit(1); });
