// Build step (netlify.toml: [build] command). Binary assets are stored in git as base64 text next to where they belong
// (e.g. icons/icon-192.png.b64) and turned back into the real files here, just before Netlify publishes the site.
// Usage: node tools/decode-assets.mjs     (run from the repo root; safe to run any number of times)
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

let n = 0;
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.b64')) {
      const out = p.slice(0, -4);
      writeFileSync(out, Buffer.from(readFileSync(p, 'utf8').replace(/\s+/g, ''), 'base64'));
      n++;
    }
  }
};
for (const d of ['assets', 'icons']) walk(d);
console.log(`decode-assets: wrote ${n} binary file(s)`);
