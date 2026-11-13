// Local keyword search over the in-app content. Shared by the browser (offline fallback)
// and by the Netlify Function (to ground the AI answer). Pure JS, no DOM.
import { VIEWS, ACCESSORIES, MACHINES, MANUAL_LINKS, B59_PAGES } from './content.js';
import { GUIDES } from './guides.js';

const SYN = {
  bobbin: ['bobbin', 'lower', 'underthread', 'winding', 'wind'], thread: ['thread', 'threading', 'upper', 'spool', 'tension'],
  needle: ['needle', 'needles', 'broken', 'skipping', 'skipped'], foot: ['foot', 'feet', 'presser', 'sole', 'hopper'],
  hoop: ['hoop', 'hoops', 'embroider', 'embroidery', 'embroidering', 'hooping', 'stabiliser', 'stabilizer'],
  plate: ['plate', 'stitch plate', 'throat'], zip: ['zip', 'zipper', 'zips'], button: ['button', 'buttons', 'buttonhole', 'buttonholes'],
  stretch: ['stretch', 'jersey', 'knit', 'knits', 'lycra'], denim: ['denim', 'jeans', 'canvas', 'heavy'], hem: ['hem', 'hems', 'hemming', 'blind']
};
const STOP = new Set(('a an the is are was be to of in on for and or my me i it how do does can what which when where why with this that there if as at by from your you use using need want get got').split(' '));
export const tokens = (s = '') => String(s).toLowerCase().replace(/[^a-z0-9µ½¼+/.\s-]/g, ' ').split(/\s+/).map(t => t.replace(/^[-.]+|[-.]+$/g, '')).filter(t => t && !STOP.has(t));
const stem = (t) => t.replace(/(ing|ed|es|s)$/, '');
function expand(ts) {
  const out = new Set();
  for (const t of ts) {
    out.add(t); out.add(stem(t));
    for (const k in SYN) if (SYN[k].some(v => v === t || stem(v) === stem(t))) SYN[k].forEach(v => out.add(v));
  }
  return [...out].filter(x => x.length > 1);
}

let INDEX = null;
export function buildIndex() {
  if (INDEX) return INDEX;
  const items = [];
  for (const g of GUIDES) {
    g.steps.forEach((s, i) => items.push({
      kind: 'guide', id: `g:${g.id}#${i + 1}`, title: `${g.title} – step ${i + 1}: ${s.t}`, body: [s.b, s.tip, s.warn, (s.check || []).join('. ')].filter(Boolean).join(' '),
      machines: g.machines, link: `#/guide/${g.id}/${i + 1}`, label: `${g.title}, step ${i + 1}`
    }));
  }
  for (const grp of ['b59', 'generic']) {
    for (const v of VIEWS[grp]) for (const p of v.parts) items.push({
      kind: 'diagram', id: `d:${grp}.${v.id}#${p.id}`, title: `${p.name} (diagram: ${v.title})`, body: p.text, machines: [grp === 'b59' ? 'b59' : 'generic'],
      link: `#/machine/${v.id}/${p.id}`, label: `${p.name} on the ${v.title} diagram`
    });
  }
  for (const a of ACCESSORIES) items.push({
    kind: 'gear', id: `a:${a.id}`, title: `${a.name} (${a.cat})`, body: [a.what, a.when.join('. '), a.fit.join(' '), a.tip].filter(Boolean).join(' '),
    machines: [a.m === 'all' ? 'all' : a.m], link: `#/gear/${a.id}`, label: a.name
  });
  for (const t of B59_PAGES) items.push({ kind: 'manual', id: `m:b59#${t.page}`, title: `Official b59 manual, page ${t.page}: ${t.topic}`, body: t.keys, machines: ['b59'], link: `#/manuals?page=${t.page}`, label: `b59 manual p.${t.page}` });
  INDEX = items.map(it => ({ ...it, tt: expand(tokens(it.title)), bt: expand(tokens(it.body)) }));
  return INDEX;
}

export function search(query, machine = 'b59', limit = 8) {
  const q = expand(tokens(query));
  if (!q.length) return [];
  const generic = machine !== 'b59';
  const res = [];
  for (const it of buildIndex()) {
    const ok = it.machines.includes('all') || it.machines.includes(machine) || (generic && it.machines.includes('generic'));
    if (!ok) continue;
    let sc = 0;
    for (const t of q) {
      if (it.tt.includes(t)) sc += 3;
      if (it.bt.includes(t)) sc += 1;
    }
    if (sc > 0) res.push({ it, sc: sc + (it.kind === 'guide' ? .4 : 0) });
  }
  res.sort((a, b) => b.sc - a.sc);
  return res.slice(0, limit).map(({ it, sc }) => ({ kind: it.kind, id: it.id, title: it.title, body: it.body, link: it.link, label: it.label, score: sc }));
}

export const machineName = (id) => (MACHINES.find(m => m.id === id) || {}).name || id;
export const manualLinks = (id) => MANUAL_LINKS[id] || [];
export function resolveRef(id) {
  const it = buildIndex().find(x => x.id === id);
  return it ? { id, link: it.link, label: it.label } : null;
}
