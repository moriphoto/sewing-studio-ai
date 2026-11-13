// Keeps the service-worker SHELL list in step with js/machines/*.js and bumps the cache VERSION when it changes.
import fs from 'node:fs';
const sw = fs.readFileSync('sw.js', 'utf8');
const files = fs.readdirSync('js/machines').filter(f => f.endsWith('.js')).sort().map(f => `'js/machines/${f}'`).join(', ');
let out = sw.replace(/'js\/machines\/_gear\.js'.*?'js\/machines\/verified-pages\.js'/, files);
if (out !== sw) out = out.replace(/ssai-v(\d+)/, (_, n) => `ssai-v${+n + 1}`);
if (out !== sw) fs.writeFileSync('sw.js', out);
console.log('sw.js SHELL machine files:', files.split(',').length, out !== sw ? '(updated, VERSION bumped)' : '(unchanged)');
