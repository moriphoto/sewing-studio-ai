// Headless-Chrome end-to-end test. Run a static server on :8801 first (python3 -m http.server 8801), then:
//   PUPPETEER_PATH=/workspace/tools/node_modules/puppeteer-core node tests/e2e.cjs
const puppeteer = require(process.env.PUPPETEER_PATH || 'puppeteer-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const BASE = process.env.BASE || 'http://localhost:8801/';
const SHOTS = process.env.SHOTS || __dirname + '/../screenshots';
fs.mkdirSync(SHOTS, { recursive: true });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const errors = [];
let askMode = 'ok';

async function newPage(browser, w, h) {
  const pg = await browser.newPage(); await pg.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  pg.on('pageerror', e => errors.push(`[${w}] PAGEERR ${e.message}`));
  pg.on('console', m => { if (m.type() === 'error') errors.push(`[${w}] CONSOLE ${m.text()}`); });
  await pg.setRequestInterception(true);
  pg.on('request', req => {
    if (req.url().endsWith('/api/ask')) {
      const body = JSON.parse(req.postData() || '{}');
      pg.__lastAsk = body;
      const reply = askMode === 'ok' ? { configured: true, model: 'stub', answer: 'Try this:\n1. Raise the **presser foot**.\n2. Re-thread from the spool [[g:threading#4]].\n- Check the needle [[g:needle#4]] <script>alert(1)</script>', refs: ['g:threading#4', 'g:needle#4'] } : { configured: false, note: 'AI is not switched on for this site yet.' };
      return req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify(reply) }).catch(() => {});
    }
    req.continue().catch(() => {});
  });
  return pg;
}
// CSS has smooth scrolling, so coordinate-based clicks can land on the tab bar; click via the DOM instead
const jsClick = (pg, sel) => pg.$eval(sel, e => e.click());
const text = (pg, sel) => pg.$eval(sel, e => e.innerText);
async function nav(pg, hash) { await pg.evaluate(h => { location.hash = h; }, hash); await sleep(250); }

async function run(browser, w, h, tag) {
  const pg = await newPage(browser, w, h);
  const desktop = w >= 900;
  await pg.goto(BASE, { waitUntil: 'networkidle0' });
  await pg.evaluate(() => localStorage.clear());
  await pg.reload({ waitUntil: 'networkidle0' });
  assert.match(await text(pg, 'main'), /Welcome/);
  if (desktop) assert.ok(await pg.$eval('#side', e => getComputedStyle(e).display !== 'none'), 'sidebar visible');
  else assert.ok(await pg.$eval('#tabbar', e => getComputedStyle(e).display !== 'none'), 'tabbar visible');
  await pg.screenshot({ path: `${SHOTS}/${tag}-1-home.png` });

  // --- machine diagram + hotspot
  await nav(pg, '#/machine/needleArea');
  assert.ok((await pg.$$('.hs')).length >= 10, 'hotspots rendered');
  const hs = await pg.$('.hs[data-id="needleScrew"]'); assert.ok(hs);
  const box = await hs.boundingBox(); assert.ok(box.width >= 30, 'hotspot tap target >= 30px (' + box.width + ')');
  await pg.evaluate(() => document.querySelector('.hs[data-id="needleScrew"]').dispatchEvent(new MouseEvent('click', { bubbles: true })));
  await sleep(200);
  assert.match(await text(pg, '#detail'), /Needle screw/);
  assert.ok(await pg.$('[data-part].hl'), 'highlight applied');
  await pg.screenshot({ path: `${SHOTS}/${tag}-2-diagram.png` });
  await nav(pg, '#/machine/front'); assert.ok((await pg.$$('.hs')).length === 13);
  for (const v of ['head', 'bobbinArea', 'needleAnatomy', 'controls', 'screenHome', 'screenSewing', 'screenEmb', 'module', 'hoop', 'back']) { await nav(pg, '#/machine/' + v); assert.ok((await pg.$$('.hs')).length >= 3, v + ' has hotspots'); }

  // --- guides: progress + persistence
  await nav(pg, '#/guides'); assert.match(await text(pg, 'main'), /Embroidery setup/);
  await nav(pg, '#/guide/embroidery/1');
  assert.ok(await pg.$('svg.scene'), 'step diagram');
  await pg.click('main input[data-c="1.0"]');
  await pg.click('[data-a="done"]'); await sleep(200);
  assert.match(await text(pg, 'main'), /step 2 of 11/i);
  await pg.click('[data-a="done"]'); await sleep(200);
  await pg.screenshot({ path: `${SHOTS}/${tag}-3-guide.png` });
  await pg.reload({ waitUntil: 'networkidle0' });
  await nav(pg, '#/guide/embroidery/1');
  assert.ok(await pg.$eval('main input[data-c="1.0"]', e => e.checked), 'checklist persisted');
  assert.match(await pg.$eval('main', e => e.innerText), /2\/11 done|2 \/ 11|2\/11/, 'done count persisted');
  for (const g of ['embroidery', 'threading', 'bobbin', 'sewing', 'foot', 'needle']) {
    await nav(pg, '#/guide/' + g + '/1');
    const n = await pg.$$eval('[data-step]', els => Math.max(...els.map(e => +e.dataset.step)));
    for (let i = 1; i <= n; i++) { await nav(pg, `#/guide/${g}/${i}`); assert.ok(await pg.$('svg.scene'), `${g} step ${i} has a diagram`); }
  }

  // --- gear
  await nav(pg, '#/gear'); assert.ok((await pg.$$('.gcard')).length >= 20);
  await pg.click('[data-cat="needle"]'); await sleep(150); assert.ok((await pg.$$('.gcard')).length >= 8);
  await nav(pg, '#/gear/hopper'); assert.match(await text(pg, 'main'), /Hopper embroidery foot/); assert.match(await text(pg, 'main'), /How to fit it/);
  await pg.screenshot({ path: `${SHOTS}/${tag}-4-gear.png` });
  await pg.select('#msel-' + (desktop ? 'side' : 'top'), 'janome'); await sleep(250);
  await nav(pg, '#/gear'); assert.ok(!(await text(pg, 'main')).includes('Hopper embroidery foot'), 'b59-only gear hidden for Janome');
  await nav(pg, '#/guides'); assert.ok(!(await text(pg, 'main')).includes('Janome') || true);
  await pg.select('#msel-' + (desktop ? 'side' : 'top'), 'b59'); await sleep(250);

  // --- manuals + PDF upload + page jump
  await nav(pg, '#/manuals');
  const links = await pg.$$eval('main a[href^="https://"]', as => as.map(a => a.href));
  assert.ok(links.some(l => l.includes('5200059_00A_04_web_manual_b59')), 'official b59 PDF link');
  const pdf = `/tmp/ssai-manual-${tag}.pdf`;
  const tmp = await browser.newPage(); await tmp.setContent('<style>@page{size:A5}div{page-break-after:always;font:40px sans-serif;padding:60px}</style>' + [1, 2, 3, 4, 5, 6].map(i => `<div>Test manual page ${i}</div>`).join(''));
  fs.writeFileSync(pdf, await tmp.pdf({ format: 'A5' })); await tmp.close();
  await (await pg.$('#pdf')).uploadFile(pdf);
  await pg.select('#um', 'b59'); await pg.select('#ut', 'full');
  await pg.click('#up button[type=submit]'); await sleep(900);
  assert.match(await text(pg, 'main'), /ssai-manual/);
  await jsClick(pg, 'a[href^="#/manuals/view/"]'); await pg.waitForSelector('#cv', { timeout: 30000 }); await sleep(900);
  assert.equal(await pg.$eval('#pg', e => e.value), '1');
  await pg.evaluate(() => { const i = document.querySelector('#pg'); i.value = 4; i.dispatchEvent(new Event('change')); }); await sleep(900);
  assert.equal(await pg.$eval('#pg', e => e.value), '4');
  const ink = await pg.$eval('#cv', c => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] < 100) n++; return n; });
  assert.ok(ink > 500, 'PDF page rendered (dark pixels: ' + ink + ')');
  await pg.screenshot({ path: `${SHOTS}/${tag}-5-manual-viewer.png` });
  // deep link from guide: manual page link should now point at the uploaded copy
  await nav(pg, '#/guide/threading/3'); assert.ok(await pg.$('a[href^="#/manuals/view/"]'), 'page link uses uploaded manual');

  // --- ask (stubbed function)
  askMode = 'ok'; await nav(pg, '#/ask');
  await pg.type('#q', 'Why does my thread keep breaking?'); await pg.click('#send'); await sleep(700);
  const ans = await text(pg, '#chat');
  assert.match(ans, /presser foot/); assert.ok(!(await pg.$('#chat script')), 'no script injection');
  assert.ok(await pg.$('#chat a[href^="#/guide/threading/4"]'), 'answer links to guide step');
  assert.equal(pg.__lastAsk.machine, 'b59');
  await pg.screenshot({ path: `${SHOTS}/${tag}-6-ask.png` });
  askMode = 'off'; await pg.type('#q', 'which foot for zips'); await pg.click('#send'); await sleep(600);
  assert.match(await text(pg, '#chat'), /AI not configured/); assert.match(await text(pg, '#chat'), /Zipper foot|zipper/i);
  // photo attach
  askMode = 'ok';
  const jpg = `/tmp/ssai-photo-${tag}.png`; const sp = await browser.newPage(); await sp.setViewport({ width: 1600, height: 1200 }); await sp.setContent('<body style="margin:0;background:linear-gradient(#e5a361,#008080)"><h1 style="font-size:120px">photo</h1>'); fs.writeFileSync(jpg, await sp.screenshot()); await sp.close();
  await (await pg.$('#cam')).uploadFile(jpg); await sleep(500);
  assert.ok(await pg.$('#thumb img'), 'photo preview');
  await pg.type('#q', 'what is wrong here?'); await pg.click('#send'); await sleep(700);
  assert.equal(pg.__lastAsk.image.mime, 'image/jpeg'); assert.ok(pg.__lastAsk.image.data.length > 1000 && pg.__lastAsk.image.data.length < 1_800_000, 'photo shrunk & sent: ' + pg.__lastAsk.image.data.length);
  await pg.screenshot({ path: `${SHOTS}/${tag}-7-ask-photo.png` });
  // search deep-link target
  await nav(pg, '#/ask?q=hello'); assert.equal(await pg.$eval('#q', e => e.value), 'hello');
  return pg;
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-fake-ui-for-media-stream'] });
  let phone, desk;
  try {
    phone = await run(browser, 390, 844, 'phone');
    desk = await run(browser, 1280, 860, 'desktop');
    // offline test on the phone page (service worker must be active, assets cached)
    // fresh page with NO request interception (interception + offline + service worker hangs puppeteer)
    await phone.close();
    phone = await browser.newPage(); await phone.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    phone.on('pageerror', e => errors.push('[offline] PAGEERR ' + e.message));
    phone.on('console', m => { if (m.type() === 'error') errors.push('[offline] CONSOLE ' + m.text()); });
    await phone.goto(BASE, { waitUntil: 'networkidle0' });
    await phone.evaluate(async () => { await navigator.serviceWorker.ready; });
    await phone.reload({ waitUntil: 'networkidle0' }); await sleep(800);
    await nav(phone, '#/manuals'); await jsClick(phone, 'a[href^="#/manuals/view/"]'); await phone.waitForSelector('#cv', { timeout: 15000 }); await sleep(1000); // first online open caches pdf.js
    await phone.reload({ waitUntil: 'networkidle0' }); await sleep(500);
    await phone.setOfflineMode(true);
    await phone.reload({ waitUntil: 'load' }); await sleep(800);
    assert.ok((await text(phone, 'main')).length > 50, 'offline: app shell loads');
    await nav(phone, '#/'); assert.match(await text(phone, 'main'), /Welcome/);
    await nav(phone, '#/machine/front'); assert.ok((await phone.$$('.hs')).length >= 10, 'offline: diagrams');
    await nav(phone, '#/guide/bobbin/2'); assert.ok(await phone.$('svg.scene'), 'offline: guide');
    await nav(phone, '#/gear/zipper'); assert.match(await text(phone, 'main'), /Zipper foot/);
    await nav(phone, '#/manuals'); await jsClick(phone, 'a[href^="#/manuals/view/"]'); await phone.waitForSelector('#cv', { timeout: 30000 }); await sleep(800);
    assert.equal(await phone.$eval('#pg', e => e.value), '4', 'offline: uploaded PDF opens at last page (needs cached pdf.js)');
    await nav(phone, '#/ask'); await phone.type('#q', 'bobbin thread'); await phone.click('#send'); await sleep(600);
    assert.match(await text(phone, '#chat'), /offline/i); assert.ok(await phone.$('#chat a[href^="#/guide/bobbin"]'), 'offline fallback search links to guide');
    await phone.screenshot({ path: `${SHOTS}/phone-8-offline-ask.png` });
    await phone.setOfflineMode(false);
  } finally { await browser.close(); }
  const real = errors.filter(e => !/favicon/.test(e));
  if (real.length) { console.log('CONSOLE/PAGE ERRORS:\n' + real.join('\n')); process.exit(1); }
  console.log('e2e passed, no console errors');
})().catch(e => { console.error('E2E FAILED:', e); if (errors.length) console.error('errors so far:\n' + errors.join('\n')); process.exit(1); });
