// One place that answers "what do we know about machine X?" – for b59, the generic brand layouts,
// and every per-model data file in js/machines/. Pure data, shared by the browser and the Netlify function.
import { MACHINES as BASE, VIEWS, MANUAL_LINKS, B59_PAGES, ACCESSORIES, accessoriesFor as accessoriesForOld } from './content.js';
import { GUIDES as OLD_GUIDES, guidesFor as guidesForOld } from './guides.js';
import { MODELS } from './machines/index.js';
import { CATALOG, GROUPS } from './machines/catalog.js';
import { buildModel, pageKeysFor } from './templates.js';

export { CATALOG, GROUPS };
const cache = new Map();
const built = (m) => { if (!cache.has(m.id)) cache.set(m.id, buildModel(m)); return cache.get(m.id); };
export const getModel = (id) => MODELS.find(m => m.id === id) || null;
export const isModel = (id) => !!getModel(id);

const modelSummary = (m) => ({ id: m.id, name: m.name, brand: m.brand, studio: true, model: true, type: m.type, blurb: m.blurb, facts: m.facts, specs: m.specs, shopUrl: m.shopUrl, short: m.short });
// Machines that have their own breakdown (b59 first, then the new models, then generic brand layouts).
export const MACHINES = [BASE.find(m => m.id === 'b59'), ...MODELS.map(modelSummary), ...BASE.filter(m => m.id !== 'b59')];
export const BUILT_IDS = new Set(['b59', ...MODELS.map(m => m.id)]);
// Catalogue id (from the shop list) -> app machine id
export const catalogToApp = (cid) => (cid === 'bernette-b59' ? 'b59' : (MODELS.find(m => m.catalogId === cid) || {}).id || null);

export function viewsFor(id) {
  if (id === 'b59') return VIEWS.b59;
  const m = getModel(id); return m ? built(m).views : VIEWS.generic;
}
export function guidesFor(id) {
  const m = getModel(id); return m ? built(m).guides : guidesForOld(id);
}
export const allGuides = () => [...OLD_GUIDES, ...MODELS.flatMap(m => built(m).guides)];
export const guideById = (gid) => allGuides().find(g => g.id === gid);
export function accessoriesFor(id) {
  const m = getModel(id); if (!m) return accessoriesForOld(id);
  const generic = ACCESSORIES.filter(a => a.m === 'all' && m.gear.ids.includes(a.id));
  return [...m.gear.extra, ...generic];
}
export const allAccessories = () => [...ACCESSORIES, ...MODELS.flatMap(m => m.gear.extra)];
export const accessoryById = (aid) => allAccessories().find(a => a.id === aid);
export function linksFor(id) {
  const m = getModel(id); return m ? m.links : (MANUAL_LINKS[id] || []);
}
// "Where to look in the manual": only rows that the verifier confirmed on the right page.
export function pagesFor(id) {
  if (id === 'b59') return B59_PAGES;
  const m = getModel(id); if (!m || !m.manual) return [];
  const ok = pageKeysFor(m);
  return m.manual.pages.filter(p => ok.has(p.key)).map(p => ({ topic: p.topic, page: p.printed, keys: p.topic, pdfPage: p.printed + m.manual.offset }));
}
export function fullManualUrl(id) {
  if (id === 'b59') return MANUAL_LINKS.b59[0].url;
  const m = getModel(id); const l = m && m.links.find(x => x.doc === 'full'); return l && !l.blocked ? l.url : null;
}
export function pdfPageFor(id, printed) { const m = getModel(id); return m && m.manual ? printed + m.manual.offset : printed; }
export const hasPages = (id) => id === 'b59' || pagesFor(id).length > 0;
export const machineById = (id) => MACHINES.find(m => m.id === id);
