// Shared helpers for tools/gen-brother-*.mjs: turn a compact per-model record into a js/machines/<id>.js data file.
// Every feature flag is explicit on the record (threader, cutter, pressure dial, knee lift...), never inherited from a family.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

export const DL = 'https://download.brother.com/welcome/';
export const SUP = (prod, c = 'eu_ot') => `https://support.brother.com/g/b/manualtop.aspx?c=${c}&lang=en&prod=${prod}`;

// Page rows: auto-picked from the manual text (tools in /tmp/man3), or given by hand on the record.
export function autoRows(file) {
  const out = execFileSync('python3', ['-c', `import sys,json;sys.path.insert(0,'/tmp/man3');import autopages as A;print(json.dumps(A.run(sys.argv[1])[1]))`, file.replace(/\.pdf$/, '')], { encoding: 'utf8' });
  return JSON.parse(out);
}

const q = (s) => JSON.stringify(s).replace(/\u2028|\u2029/g, '');
const prim = (v) => v === null || typeof v !== 'object';
function js(v, ind = 0, lvl = 0) {
  const pad = '  '.repeat(lvl + 1), end = '  '.repeat(lvl);
  if (prim(v)) return JSON.stringify(v);
  if (Array.isArray(v)) {
    if (v.every(prim) || (v.every(x => Array.isArray(x) && x.every(prim)) && v.length)) return '[' + v.map(x => js(x, 0, lvl + 1)).join(', ') + ']'.replace(/^/, '') ;
    return '[\n' + v.map(x => pad + js(x, 0, lvl + 1)).join(',\n') + '\n' + end + ']';
  }
  const ks = Object.keys(v).filter(k => v[k] !== undefined);
  if (!ks.length) return '{}';
  const key = (k) => (/^[A-Za-z_][A-Za-z0-9_]*$/.test(k) ? k : JSON.stringify(k));
  const inline = ks.every(k => prim(v[k]) || (Array.isArray(v[k]) && v[k].every(prim))) && JSON.stringify(v).length < 150;
  if (inline) return '{ ' + ks.map(k => key(k) + ': ' + js(v[k], 0, lvl + 1)).join(', ') + ' }';
  return '{\n' + ks.map(k => pad + key(k) + ': ' + js(v[k], 0, lvl + 1)).join(',\n') + '\n' + end + '}';
}

/* ---- t dialects: Brother wording checked against the A-series, F-series and NV manuals ---- */
export function sewT(o) {
  const t = {
    ready: o.mech ? 'Raise the presser foot lever and turn the handwheel toward you until the take-up lever is at its highest position.' : 'Raise the presser foot lever and press the needle position button until the needle is at its highest (the handwheel mark is at the top).',
    spool: 'Take off the spool cap, slide the spool on so the thread unwinds from the bottom toward the front, then push a spool cap that fits the spool on firmly, rounded side outward. Three cap sizes are supplied.',
    path: 'Pass the thread under the thread guide cover to the front, under the thread guide, then down the thread channel in the order of the numbered path printed on the machine.',
    takeup: 'Make sure the thread goes up into the take-up lever eye, then down and behind the needle bar thread guide just above the needle.',
    threader: o.threader || 'none',
    needleGuide: 'Slide the thread behind the needle bar thread guide.',
    windPlace: 'Fit the empty bobbin on the bobbin winder shaft so the notch in the bobbin lines up with the spring on the shaft, and put the thread spool on the spool pin.',
    windPath: 'Take the thread under the thread guide, hook it under the bobbin-winding thread guide and round the pretension disk, then wind a few turns by hand round the bobbin and pass the end through the slit in the winder seat.',
    windStart: o.startStop ? 'Slide the bobbin winder shaft to the right, then press Start/Stop (or the foot controller). The sewing speed controller sets the winding speed.' : 'Slide the bobbin winder shaft to the right and press the foot controller to start winding.',
    windStop: 'Stop when the bobbin is full, slide the shaft back to the left, cut the thread and take the bobbin off.',
    bobbinOpen: 'Raise the needle and the presser foot, switch off, slide the bobbin cover latch to the right and take the cover off.',
    bobbinIn: 'Put the bobbin in with the thread unwinding to the left (the same way it came off the winder), guide the thread through the slit and round the tab, then put the cover back on.',
    footHolder: 'brother',
    needleNote: o.lock ? 'Touch the needle/presser foot lock key on the screen first so nothing can start by accident.' : 'Switch the machine off before changing the needle.',
    startNote: o.startStop ? 'Start/Stop can be used instead of the foot controller.' : 'There is no Start/Stop button: sewing is with the foot controller.',
    stitchPick: o.stitchPick || (o.mech ? 'Turn the stitch selection dial to the stitch you want, then set length and width.' : 'Choose a stitch with the keys or dial and check length and width on the screen.')
  };
  if (o.mech) { t.mech = true; if (!o.threader || o.threader === 'none') t.noThreader = true; }
  if (o.fourStep) t.fourStep = true;
  if (o.noFeed) t.noFeed = true;
  if (o.dual) t.dual = true;
  return t;
}
export function embT(o) {
  return {
    ...sewT({ ...o, mech: false }),
    embArea: o.area, hoops: o.hoops || 'the frames supplied with your machine', embFoot: o.embFoot || 'embroidery foot', embSpeed: o.speed, hoopRecognition: false, brotherEmb: true, sensors: true,
    ...(o.tExtra || {})
  };
}

export function write(rec, outDir = 'js/machines') {
  const id = rec.id; const file = rec.manual.file;
  let rows = rec.rows || autoRows(file);
  const drop = new Set(rec.dropRows || []);
  rows = rows.filter(r => !drop.has(r.key));
  if (!rec.emb) rows = rows.filter(r => !['module', 'hoop', 'embfoot'].includes(r.key));
  rows = rows.filter(r => !['twin', 'quilt', 'threader'].includes(r.key) || (rec.keepRows || []).includes(r.key));
  for (const x of rec.extraRows || []) { rows = rows.filter(r => r.key !== x.key); rows.push(x); }
  const hide = ['felt'];
  if (!rec.threaderKind || rec.threaderKind === 'none') hide.push('threader');
  if (rec.cutter === false) hide.push('cutter');
  if (rec.pressureDial === false) hide.push('pressureDial');
  if (rec.mech) hide.push('startStop', 'buttonholeLever', 'plateRelease');
  if (rec.mech && rec.noWidth) hide.push('widthDial');
  const gearIds = rec.embOnly ? ['o-spoolnet', 'o-brush', 'n-embroidery', 'n-metallic'] : ['invisiblezip', 'walking', 'quarter', 'freemotion', 'rolled', 'satin', 'straightfoot', 'o-spoolnet', 'o-brush', 'n-universal', 'n-ballpoint', 'n-stretch', 'n-microtex', 'n-topstitch', 'n-denim', 'n-leather', 'n-quilting', 'n-twin'].concat(rec.emb ? ['n-embroidery', 'n-metallic'] : []);
  const links = [
    { title: `${rec.name} – Operation Manual (PDF, English)`, url: DL + rec.manual.path, kind: 'PDF', doc: 'full', note: `Official brother.com. ${rec.manual.multi ? 'One manual covers several product codes (' + rec.manual.codes + '); check the quick reference guide for yours.' : 'Product code ' + rec.manual.codes + '.'}` }
  ];
  for (const l of rec.extraLinks || []) links.push(l);
  links.push({ title: `${rec.name} – manuals and downloads`, url: SUP(rec.prod, rec.supC), kind: 'Web', doc: 'page', note: 'Brother support page.' });
  const feet = [];
  const F = (k, name, variant, what, when, fit = 'brother', tip = '') => feet.push(`foot(id, ${q(k)}, ${q(name)}, ${q(variant)}, ${q(what)}, ${q(when)}, ${q(fit)}${tip ? ', ' + q(tip) : ''})`);
  for (const f of rec.feet || []) F(...f);
  const extra = feet.concat((rec.hoopsList || []).map(h => `hoop(id, ${q(h[0])}, ${q(h[1])}, ${q(h[2])}, ${q(h[3])}, ${q(h[4])})`)).concat(rec.otherGear || []);
  const model = {
    id, catalogId: rec.id, brand: 'Brother', name: rec.name, short: rec.short, type: rec.type, profile: rec.profile, ...(rec.layout ? { layout: rec.layout } : {}), ...(rec.small ? { small: true } : {}), emb: !!rec.emb, ...(rec.embOnly ? { embOnly: true } : {}),
    shopUrl: rec.shopUrl, blurb: rec.blurb, facts: rec.facts, specs: rec.specs, links,
    manual: { file, offset: rec.manual.offset || 0, edition: `Operation Manual ${rec.manual.codes} (page numbers are PDF page numbers)`, pages: rows.map(r => ({ key: r.key, topic: r.topic, printed: r.printed, find: r.find })) },
    hide, over: rec.over || {}, t: rec.t
  };
  const body = js(model).replace(/"id": ?"[^"]*", /, '');
  // emit with real identifiers for id and gear
  let src = js(model).replace(/^\{\n  id: "[^"]*",/, `{\n  id,`);
  src = src.replace(/\n\}$/, `,\n  gear: { ids: ${js(gearIds)},\n    extra: [\n      ${extra.join(',\n      ')}\n    ] }\n}`);
  const imports = ['foot', ...(rec.hoopsList?.length ? ['hoop'] : []), ...((rec.otherGear || []).length ? ['other'] : [])];
  const text = `// Generated by tools/${rec.gen || 'gen-brother-*.mjs'} from its per-model table – edit the table, then re-run.\nimport { ${imports.join(', ')} } from './_gear.js';\nconst id = ${q(id)};\nexport default ${src};\n`;
  fs.writeFileSync(`${outDir}/${id}.js`, text);
  return { id, rows: rows.length };
}
