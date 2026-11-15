// Builds the Bobbin icons (SVG + PNG) from the mascot artwork. Run: node tools/make-icons.mjs (needs Chrome for the PNGs).
// Colour: change TEAL below (and --teal in css/app.css) when the brand teal is confirmed.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const TEAL = '#008080', CHAR = '#3a3f43', BG = '#F4F2F1';
const body = (s, tx, ty) => `<g transform="translate(${tx} ${ty}) scale(${s})">
<path d="M86 108 C108 108 112 126 98 130 C88 133 84 124 92 121" fill="none" stroke="${TEAL}" stroke-width="5" stroke-linecap="round"/>
<rect x="24" y="14" width="72" height="15" rx="7.5" fill="${CHAR}"/><rect x="31" y="28" width="58" height="84" rx="5" fill="${TEAL}"/>
<g stroke="rgba(255,255,255,.28)" stroke-width="2.2" stroke-linecap="round">${Array.from({ length: 7 }, (_, i) => `<path d="M33 ${38 + i * 10} H87"/>`).join('')}</g>
<rect x="24" y="111" width="72" height="15" rx="7.5" fill="${CHAR}"/>
<ellipse cx="49" cy="64" rx="10" ry="11.5" fill="#fff"/><ellipse cx="71" cy="64" rx="10" ry="11.5" fill="#fff"/>
<circle cx="49" cy="66" r="5" fill="#2b2f32"/><circle cx="71" cy="66" r="5" fill="#2b2f32"/><circle cx="51" cy="63.5" r="1.7" fill="#fff"/><circle cx="73" cy="63.5" r="1.7" fill="#fff"/>
<circle cx="39" cy="82" r="5" fill="#f4a6a0" opacity=".75"/><circle cx="81" cy="82" r="5" fill="#f4a6a0" opacity=".75"/>
<path d="M52 85 Q60 94 68 85" fill="none" stroke="#2b2f32" stroke-width="3" stroke-linecap="round"/>
<path d="M31 84 Q20 90 22 100" fill="none" stroke="${CHAR}" stroke-width="5" stroke-linecap="round"/>
<path d="M89 86 Q104 80 104 66" fill="none" stroke="${CHAR}" stroke-width="5" stroke-linecap="round"/><circle cx="104" cy="64" r="3.6" fill="${CHAR}"/></g>`;
const svg = (round, s, tx, ty) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512"${round ? ' rx="108"' : ''} fill="${BG}"/>${body(s, tx, ty)}</svg>\n`;
fs.writeFileSync('icons/icon.svg', svg(true, 3.2, 64, 32));
fs.writeFileSync('icons/icon-maskable.svg', svg(false, 2.7, 94, 67));
const png = (svgFile, out, px) => {
  fs.writeFileSync('/tmp/_ico.html', `<html><body style="margin:0;background:transparent"><img src="file://${process.cwd()}/${svgFile}" width="${px}" height="${px}" style="display:block"></body></html>`);
  execFileSync('google-chrome', ['--headless=new', '--no-sandbox', '--hide-scrollbars', '--default-background-color=00000000', `--window-size=${px},${px}`, `--screenshot=${process.cwd()}/${out}`, 'file:///tmp/_ico.html'], { stdio: 'ignore' });
};
png('icons/icon.svg', 'icons/icon-512.png', 512); png('icons/icon.svg', 'icons/icon-192.png', 192);
png('icons/icon-maskable.svg', 'icons/apple-touch-icon.png', 180); png('icons/icon.svg', 'icons/favicon-32.png', 32);
png('icons/icon-maskable.svg', 'icons/icon-maskable-512.png', 512);
console.log('icons written');
