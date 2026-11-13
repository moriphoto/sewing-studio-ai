// Screenshot helper for the batch report: PUPPETEER_PATH=... node tests/shots-machines.cjs
const puppeteer = require(process.env.PUPPETEER_PATH || 'puppeteer-core');
const BASE = process.env.BASE || 'http://localhost:8801/'; const OUT = __dirname + '/../screenshots';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const defaultShots = [
  [390, 'phone-b64-front', 'bernette-b64-airlock', '#/machine/front'],
  [390, 'phone-b64-air-threading', 'bernette-b64-airlock', '#/guide/bernette-b64-airlock~threading/3'],
  [390, 'phone-lx25-front', 'brother-lx25', '#/machine/front'],
  [390, 'phone-f580-embroidery', 'brother-innov-is-f580', '#/guide/brother-innov-is-f580~embroidery/4'],
  [390, 'phone-browse', 'b59', '#/machines'],
  [1280, 'desktop-b77-front', 'bernette-b77', '#/machine/front'],
  [1280, 'desktop-725s-manuals', 'janome-sewist-725s', '#/manuals'],
  [1280, 'desktop-b70-front', 'bernette-b70-deco', '#/machine/front'],
  [390, 'phone-454d-looper', 'janome-mylock-454d', '#/machine/loopers']
];
const shots = process.env.SHOTLIST ? JSON.parse(process.env.SHOTLIST) : defaultShots;
(async () => {
  const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: 'new' }); console.log('pid', b.process().pid);
  try {
    for (const [w, name, id, hash] of shots) {
      const pg = await b.newPage(); await pg.setViewport({ width: w, height: w > 900 ? 860 : 844, deviceScaleFactor: 2 });
      await pg.goto(BASE, { waitUntil: 'networkidle0' });
      await pg.evaluate((x) => { localStorage.setItem('ssai.v1', JSON.stringify({ machine: x, progress: {} })); location.hash = '#/'; }, id); await pg.reload({ waitUntil: 'networkidle0' });
      await pg.evaluate(h => { location.hash = h; }, hash); await sleep(600);
      await pg.screenshot({ path: `${OUT}/${name}.png` }); await pg.close(); console.log(name);
    }
  } finally { await b.close(); }
})();
