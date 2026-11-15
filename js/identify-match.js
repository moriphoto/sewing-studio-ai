// Matches what a vision model says it saw against the app's own machine registry and accessories list.
// Pure data + string maths (no DOM), shared by the Netlify function and the tests.
import { CATALOG } from './machines/catalog.js';
import { catalogToApp, allAccessories, machineById } from './registry.js';

const compact = (s = '') => String(s).toLowerCase().replace(/innov[\s-]*is/g, 'innovis').replace(/[^a-z0-9]+/g, '');
const toks = (s = '') => String(s).toLowerCase().replace(/innov[\s-]*is/g, 'innovis').replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean);
const GENERIC = { brother: 'brother', bernina: 'bernina', janome: 'janome' };

let LIST = null;
export function candidates() {
  if (LIST) return LIST;
  const machines = CATALOG.map(c => ({ kind: 'machine', key: 'm:' + c.id, cid: c.id, appId: catalogToApp(c.id), brand: c.brand, name: `${c.brand} ${c.model}`, model: c.model, url: c.url }));
  const acc = allAccessories().map(a => ({ kind: 'accessory', key: 'a:' + a.id, id: a.id, name: a.name, cat: a.cat }));
  LIST = { machines, accessories: acc, all: [...machines, ...acc] };
  return LIST;
}
// Compact "key|name" lines handed to the model so it can answer with an id from our list.
export const promptList = () => {
  const c = candidates(); const seen = new Set();
  const acc = c.accessories.filter(a => { const k = compact(a.name); if (seen.has(k)) return false; seen.add(k); return true; }); // same-named model-specific copies add nothing
  return [...c.machines.map(m => `${m.key}|${m.name}`), ...acc.map(a => `${a.key}|${a.name}`)].join('\n');
};

// 0..1 – how well free text `q` names candidate `c`.
function nameScore(q, c) {
  const qc = compact(q); if (!qc) return 0;
  const full = compact(c.name);
  if (qc.includes(full) || full.includes(qc) && qc.length >= 4) return 1;
  if (c.kind === 'machine') {
    const mod = compact(c.model);
    if (mod.length >= 3 && /\d/.test(mod) && qc.includes(mod)) return compact(q).includes(compact(c.brand)) ? 0.97 : 0.85;
  }
  const ct = toks(c.name), qt = new Set(toks(q));
  let hit = 0, tot = 0;
  for (const t of ct) { const w = /\d/.test(t) ? 2 : 1; tot += w; if (qt.has(t)) hit += w; }
  return tot ? hit / tot : 0;
}

// items: [{ key?, name?, confidence? }] as returned by the model. Returns up to `limit` ranked matches.
export function matchCandidates(items, limit = 3) {
  const { all, machines } = candidates();
  const byKey = new Map(all.map(c => [c.key, c]));
  const found = new Map();
  const add = (c, conf, how) => { const prev = found.get(c.key); if (!prev || conf > prev.confidence) found.set(c.key, { c, confidence: Math.max(0, Math.min(1, conf)), how }); };
  for (const it of Array.isArray(items) ? items : []) {
    const mc = typeof it?.confidence === 'number' ? it.confidence : 0.5;
    if (typeof it?.key === 'string' && byKey.has(it.key)) { add(byKey.get(it.key), mc, 'id'); continue; }
    const q = [it?.brand, it?.name].filter(x => typeof x === 'string').join(' ');
    if (!q.trim()) continue;
    const scored = all.map(c => ({ c, s: nameScore(q, c) })).filter(x => x.s >= 0.6).sort((a, b) => b.s - a.s).slice(0, 2);
    for (const { c, s } of scored) add(c, mc * s, 'name');
    if (!scored.length) { // brand only: offer the generic brand layout
      const b = Object.keys(GENERIC).find(k => compact(q).includes(k));
      if (b) { const g = machineById(GENERIC[b]); if (g) found.set('g:' + b, { c: { kind: 'machine', key: 'g:' + b, generic: GENERIC[b], name: g.name }, confidence: Math.min(mc, 0.35), how: 'brand' }); }
    }
  }
  const names = new Set();
  const ranked = [...found.values()].sort((a, b) => b.confidence - a.confidence).filter(({ c }) => { const k = c.kind + compact(c.name); if (names.has(k)) return false; names.add(k); return true; });
  return ranked.slice(0, limit).map(({ c, confidence }) => c.kind === 'accessory'
    ? { kind: 'accessory', id: c.id, name: c.name, confidence: +confidence.toFixed(2) }
    : { kind: 'machine', id: c.cid || c.generic, appId: c.appId || null, generic: c.generic || null, name: c.name, shopUrl: c.url || null, hasBreakdown: !!c.appId, confidence: +confidence.toFixed(2) });
}
