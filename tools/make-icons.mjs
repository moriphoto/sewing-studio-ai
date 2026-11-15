// Builds the Bobbin icons (SVG + PNG + ICO) from the mascot artwork.
// Run from the repo root: node tools/make-icons.mjs  (needs Chrome for the PNGs).
//
// Two drawings share the same character, teal and cream:
//   - Full mascot (arms, thread tail, winding lines, cheeks) for the app / home-screen icons.
//   - Simplified bold face (no fine detail) for 16px and 32px favicons, so it stays readable in a tab.
// Colour: change TEAL below (and --teal in css/app.css) when the brand teal is confirmed.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const TEAL = '#008080', CHAR = '#3a3f43', BG = '#F4F2F1', INK = '#2b2f32';

// Full mascot, in the same 120×140 space as js/mascot.js.
const bodyFull = (s, tx, ty) => `<g transform="translate(${tx} ${ty}) scale(${s})">
<path d="M86 108 C108 108 112 126 98 130 C88 133 84 124 92 121" fill="none" stroke="${TEAL}" stroke-width="5" stroke-linecap="round"/>
<rect x="24" y="14" width="72" height="15" rx="7.5" fill="${CHAR}"/><rect x="31" y="28" width="58" height="84" rx="5" fill="${TEAL}"/>
<g stroke="rgba(255,255,255,.28)" stroke-width="2.2" stroke-linecap="round">${Array.from({ length: 7 }, (_, i) => `<path d="M33 ${38 + i * 10} H87"/>`).join('')}</g>
<rect x="24" y="111" width="72" height="15" rx="7.5" fill="${CHAR}"/>
<ellipse cx="49" cy="64" rx="10" ry="11.5" fill="#fff"/><ellipse cx="71" cy="64" rx="10" ry="11.5" fill="#fff"/>
<circle cx="49" cy="66" r="5" fill="${INK}"/><circle cx="71" cy="66" r="5" fill="${INK}"/><circle cx="51" cy="63.5" r="1.7" fill="#fff"/><circle cx="73" cy="63.5" r="1.7" fill="#fff"/>
<circle cx="39" cy="82" r="5" fill="#f4a6a0" opacity=".75"/><circle cx="81" cy="82" r="5" fill="#f4a6a0" opacity=".75"/>
<path d="M52 85 Q60 94 68 85" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
<path d="M31 84 Q20 90 22 100" fill="none" stroke="${CHAR}" stroke-width="5" stroke-linecap="round"/>
<path d="M89 86 Q104 80 104 66" fill="none" stroke="${CHAR}" stroke-width="5" stroke-linecap="round"/><circle cx="104" cy="64" r="3.6" fill="${CHAR}"/></g>`;

// Visual centre of the full mascot (including the raised finger and thread tail).
const FULL_CX = 66, FULL_CY = 73.5;

const svgFull = (round, scale) => {
  const tx = 256 - FULL_CX * scale, ty = 256 - FULL_CY * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512"${round ? ' rx="108"' : ''} fill="${BG}"/>${bodyFull(scale, tx, ty)}</svg>\n`;
};

// Favicon art is drawn on a 16×16 grid so 16px and 32px stay sharp.
// No winding lines, arms, tail, cheeks or glints — just the flanges, teal body and a bold face.
// Drawn on a 16×16 grid. Features are chunky so a 16px tab icon still reads as a face.
const faviconSvg = (round) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
<rect width="16" height="16"${round ? ' rx="3.2"' : ''} fill="${BG}"/>
<rect x="2" y="1" width="12" height="2.4" rx="1.2" fill="${CHAR}"/>
<rect x="3" y="2.9" width="10" height="10.2" rx="1.2" fill="${TEAL}"/>
<rect x="2" y="12.6" width="12" height="2.4" rx="1.2" fill="${CHAR}"/>
<circle cx="6" cy="6.3" r="2.2" fill="#fff"/><circle cx="10" cy="6.3" r="2.2" fill="#fff"/>
<circle cx="6" cy="6.7" r="1.25" fill="${INK}"/><circle cx="10" cy="6.7" r="1.25" fill="${INK}"/>
<path d="M5.8 9.05 Q8 11.05 10.2 9.05" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>
</svg>\n`;

fs.writeFileSync('icons/icon.svg', svgFull(true, 3.15));
// Maskable: scale 2.55 keeps the character inside the 80% circular safe zone
// (radius 0.4 × 512 = 204.8px from the centre).
fs.writeFileSync('icons/icon-maskable.svg', svgFull(false, 2.55));
fs.writeFileSync('icons/favicon.svg', faviconSvg(true));

const png = (svgFile, out, px) => {
  fs.writeFileSync('/tmp/_ico.html', `<!DOCTYPE html><html><body style="margin:0;background:transparent"><img src="file://${process.cwd()}/${svgFile}" width="${px}" height="${px}" style="display:block"></body></html>`);
  execFileSync('google-chrome', [
    '--headless=new', '--no-sandbox', '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--default-background-color=00000000',
    `--window-size=${px},${px}`,
    `--screenshot=${process.cwd()}/${out}`,
    'file:///tmp/_ico.html',
  ], { stdio: 'ignore' });
};

png('icons/icon.svg', 'icons/icon-512.png', 512);
png('icons/icon.svg', 'icons/icon-192.png', 192);
// Apple applies its own squircle, so this is square. Scale 3.0 is tighter than the
// maskable safe zone but leaves enough cream around the corners that they are not cropped.
fs.writeFileSync('icons/_apple.svg', svgFull(false, 3.0));
png('icons/_apple.svg', 'icons/apple-touch-icon.png', 180);
fs.unlinkSync('icons/_apple.svg');
png('icons/icon-maskable.svg', 'icons/icon-maskable-512.png', 512);
png('icons/favicon.svg', 'icons/favicon-32.png', 32);
png('icons/favicon.svg', 'icons/favicon-16.png', 16);

// Multi-size ICO (PNG-encoded 16 and 32), written to icons/ and the site root
// so browsers that request /favicon.ico automatically still get Mr. Bobbin.
const writeIco = (path, files) => {
  const entries = files.map(({ file, w, h }) => ({ w, h, data: fs.readFileSync(file) }));
  const n = entries.length;
  let offset = 6 + 16 * n;
  const header = Buffer.alloc(6 + 16 * n);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(n, 4);
  const chunks = [header];
  entries.forEach((e, i) => {
    const o = 6 + 16 * i;
    header.writeUInt8(e.w >= 256 ? 0 : e.w, o);
    header.writeUInt8(e.h >= 256 ? 0 : e.h, o + 1);
    header.writeUInt8(0, o + 2);
    header.writeUInt8(0, o + 3);
    header.writeUInt16LE(1, o + 4);
    header.writeUInt16LE(32, o + 6);
    header.writeUInt32LE(e.data.length, o + 8);
    header.writeUInt32LE(offset, o + 12);
    chunks.push(e.data);
    offset += e.data.length;
  });
  fs.writeFileSync(path, Buffer.concat(chunks));
};
writeIco('icons/favicon.ico', [
  { file: 'icons/favicon-16.png', w: 16, h: 16 },
  { file: 'icons/favicon-32.png', w: 32, h: 32 },
]);
fs.copyFileSync('icons/favicon.ico', 'favicon.ico');

const binaries = [
  'icons/favicon-16.png', 'icons/favicon-32.png', 'icons/favicon.ico', 'favicon.ico',
  'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
];
for (const f of binaries) fs.writeFileSync(f + '.b64', fs.readFileSync(f).toString('base64') + '\n');

console.log('icons written:', ['icons/icon.svg', 'icons/icon-maskable.svg', 'icons/favicon.svg', ...binaries].join(', '));
