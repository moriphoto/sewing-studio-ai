// Registers every js/machines/*.js model file in js/machines/index.js (existing order kept, new files appended).
import fs from 'node:fs';
const skip = new Set(['_gear.js', 'catalog.js', 'index.js', 'verified-pages.js']);
const idx = fs.readFileSync('js/machines/index.js', 'utf8');
const have = new Set([...idx.matchAll(/from '\.\/([^']+)'/g)].map(m => m[1]));
const files = fs.readdirSync('js/machines').filter(f => f.endsWith('.js') && !skip.has(f));
const add = files.filter(f => !have.has(f)).sort();
if (!add.length) { console.log('index.js already lists every model'); process.exit(0); }
const name = (f) => 'm_' + f.replace(/\.js$/, '').replace(/[^A-Za-z0-9]/g, '_');
let out = idx.replace(/\nexport const MODELS = \[([^\]]*)\];/, (_, list) => add.map(f => `import ${name(f)} from './${f}';`).join('\n') + '\nexport const MODELS = [' + list.trim() + ', ' + add.map(name).join(', ') + '];');
fs.writeFileSync('js/machines/index.js', out);
console.log('added', add.length, 'models');
