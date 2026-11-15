import { CATS } from './content.js';
import { MACHINES, CATALOG, GROUPS, catalogToApp, getModel, isModel, viewsFor as viewsForId, guidesFor, allGuides, guideById, accessoriesFor, allAccessories, accessoryById, linksFor, pagesFor, fullManualUrl, pdfPageFor, hasPages } from './registry.js';
import { renderScene, footIcon, hoopIcon, needleIcon, otherIcon } from './svg.js';
import { mountAsk } from './ask.js';
import { mountThreadViewer } from './threadviewer.js';
import { B59_THREADING, B59_GUIDE_MAP } from './threading/b59.js';
import { mountIdentify } from './identify.js';
import { APP_NAME, TAGLINE, SHOP } from './config.js';
import { mascotSvg } from './mascot.js';

/* ---------- state ---------- */
const KEY = 'ssai.v1';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const S = Object.assign({ machine: 'b59', progress: {} }, load());
const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ machine: S.machine, progress: S.progress })); } catch { /* private mode */ } };

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
if (!MACHINES.some(m => m.id === S.machine)) S.machine = 'b59';
const machine = () => MACHINES.find(m => m.id === S.machine) || MACHINES[0];
const isB59 = () => S.machine === 'b59';
const viewsFor = () => viewsForId(S.machine);
const shortName = (m) => m.short || (m.id === 'b59' ? 'b59' : m.name);
const main = $('#view');
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600); }

function pageLink(page, machineId = S.machine) {
  if (!page) return null;
  const pdf = pdfPageFor(machineId, page);
  const url = fullManualUrl(machineId);
  if (url) return { href: `${url}#page=${pdf}`, label: `Official manual p.${page} ↗`, ext: true };
  return null;
}
const aLink = (l, cls = 'chip') => l ? `<a class="${cls}" href="${esc(l.href)}"${l.ext ? ' target="_blank" rel="noopener"' : ''}>${esc(l.label)}</a>` : '';

const ICONS = {
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>', machine: '<rect x="3" y="4" width="18" height="6" rx="2"/><path d="M5 10v9h14v-9M9 15h6"/>',
  guides: '<path d="M4 5h16M4 12h16M4 19h10"/><circle cx="19" cy="19" r="2"/>', gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  manuals: '<path d="M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3V4zM8 4v13"/>', ask: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M9 9h6M9 12h4"/>'
};
const ico = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg>`;
ICONS.browse = '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>';
// [route, label, shown in the phone tab bar]. Manuals stays in the desktop sidebar and on the Browse page.
const NAV = [['home', 'Home', 1], ['browse', 'Browse', 1], ['machine', 'Diagrams', 1], ['guides', 'Guides', 1], ['gear', 'Gear', 1], ['manuals', 'Manuals', 0], ['ask', 'Ask Bobbin', 1]];
const iconFor = (a) => a.icon[0] === 'foot' ? footIcon(a.icon[1]) : a.icon[0] === 'hoop' ? hoopIcon(a.icon[1]) : a.icon[0] === 'needle' ? needleIcon(a.icon[1]) : otherIcon(a.icon[1]);
const guideIcon = (g) => ({ hoop: hoopIcon('M'), thread: needleIcon('embroidery'), bobbin: otherIcon('bobbin'), sew: otherIcon('plate'), foot: footIcon('zigzag'), needle: needleIcon('universal') }[g.icon]);

function buildChrome() {
  const sel = (id) => `<div class="msel"><label for="${id}">Machine</label><select id="${id}" aria-label="Machine">${MACHINES.map(m => `<option value="${m.id}"${m.id === S.machine ? ' selected' : ''}>${esc(m.name)}</option>`).join('')}</select></div>`;
  $('#side').innerHTML = `<div class="brand"><img src="icons/icon.svg" alt=""><div>${esc(APP_NAME)}<small>${esc(TAGLINE)}</small></div></div>${sel('msel-side')}<nav aria-label="Main">${NAV.map(([k, l]) => `<a href="#/${k}" data-nav="${k}">${ico(k)}<span>${l}</span></a>`).join('')}</nav><div class="foot"><span id="net-state"></span><br>Your progress stays on this device.</div>`;
  $('#top').innerHTML = `<div class="brand"><img src="icons/icon.svg" alt=""><div>${esc(APP_NAME)}<small>${esc(TAGLINE)}</small></div></div><span id="net-pill" class="pill" hidden>Offline</span><div class="msel"><select id="msel-top" aria-label="Machine">${MACHINES.map(m => `<option value="${m.id}"${m.id === S.machine ? ' selected' : ''}>${esc(m.name)}</option>`).join('')}</select></div>`;
  $('#tabbar').innerHTML = NAV.filter(n => n[2]).map(([k, l]) => `<a href="#/${k}" data-nav="${k}">${ico(k)}<span>${l}</span></a>`).join('');
  $$('#msel-side,#msel-top').forEach(s => s.addEventListener('change', e => setMachine(e.target.value)));
}
function setMachine(id) { S.machine = id; save(); $$('#msel-side,#msel-top').forEach(s => { s.value = id; }); route(); }
function netState() { const off = !navigator.onLine; const p = $('#net-pill'); if (p) { p.hidden = !off; p.classList.toggle('off', off); } const n = $('#net-state'); if (n) n.textContent = off ? 'Offline – Bobbin\'s answers are paused' : 'Online'; }

/* ---------- router ---------- */
function parse() {
  const h = location.hash.replace(/^#\/?/, ''); const [path, qs] = h.split('?'); const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
  return { name: parts[0] || 'home', args: parts.slice(1), q: new URLSearchParams(qs || '') };
}
let cleanup = null;
async function route() {
  if (cleanup) { try { cleanup(); } catch { /* ignore */ } cleanup = null; }
  const r = parse();
  const fn = { home: vWelcome, welcome: vWelcome, browse: vBrowse, machine: vMachine, guides: vGuides, guide: vGuide, thread: vThread, gear: vGear, manuals: vManuals, ask: vAsk, machines: vMachines }[r.name] || vWelcome;
  const navKey = (r.name === 'guide' || r.name === 'thread') ? 'guides' : r.name === 'machines' ? 'browse' : fn === vWelcome ? 'home' : r.name;
  $$('[data-nav]').forEach(a => { if (a.dataset.nav === navKey) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  main.innerHTML = '';
  const c = await fn(r);
  if (typeof c === 'function') cleanup = c;
  if (!r.q.has('keep')) window.scrollTo(0, 0);
  document.title = `${{ home: 'Welcome', welcome: 'Welcome', browse: 'Browse machines', machine: 'Machine diagrams', guides: 'Guides', guide: 'Guide', thread: 'Threading diagrams', gear: 'Gear', manuals: 'Manuals', ask: 'Ask Bobbin', machines: 'All machines' }[r.name] || 'Welcome'} · ${APP_NAME}`;
}
window.addEventListener('hashchange', route);

/* ---------- progress ---------- */
const prog = (gid) => (S.progress[gid] = S.progress[gid] || { done: {}, checks: {} });
const doneCount = (g) => g.steps.filter((_, i) => prog(g.id).done[i + 1]).length;
const pct = (g) => Math.round(100 * doneCount(g) / g.steps.length);

/* ---------- Welcome (landing screen) ---------- */
const CAMERA_ICO = '<svg viewBox="0 0 48 48" aria-hidden="true" class="cam-ico"><path d="M8 15h8l3-5h10l3 5h8a2 2 0 012 2v19a2 2 0 01-2 2H8a2 2 0 01-2-2V17a2 2 0 012-2z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><circle cx="24" cy="26" r="7.5" fill="none" stroke="currentColor" stroke-width="2.6"/></svg>';
function vWelcome() {
  const logoImg = (cls) => `<img class="${cls}" data-logo src="${esc(SHOP.logo)}" alt="${esc(SHOP.name)}">`;
  main.innerHTML = `
  <section class="welcome">
    <div class="hero">
      <div class="hero-mascot">${mascotSvg({ blink: true, size: 92 })}</div>
      <h1 class="hero-title">${esc(APP_NAME)}</h1>
      <p class="byline"><span>by</span> <a href="${esc(SHOP.url)}" target="_blank" rel="noopener" aria-label="${esc(TAGLINE)}">${logoImg('byline-logo')}</a></p>
      <p class="hero-intro">Your pocket guide to sewing and embroidery machines. Manuals, step-by-step threading, accessories and friendly help, from ${esc(SHOP.name)}, ${esc(SHOP.address)}.</p>
    </div>
    <div class="cam-card">
      <label class="cam-btn" for="wcam">${CAMERA_ICO}<span class="cam-t">Snap a machine or accessory</span><span class="cam-s">Take a photo and I'll find it in the app</span></label>
      <input id="wcam" class="sr" type="file" accept="image/*" capture="environment">
      <input id="wpick" class="sr" type="file" accept="image/*">
      <p class="small muted cam-alt"><label for="wpick" class="linklike">or choose a photo you already have</label></p>
      <div id="idres" class="idres" aria-live="polite"></div>
    </div>
    <div class="quick">
      <a class="btn" href="#/browse">${ico('browse')}Browse machines</a>
      <a class="btn sec" href="#/ask">${ico('ask')}Ask Bobbin</a>
    </div>
    <a class="tv-promo" href="#/thread/b59/upper/1"><span class="ico-wrap">${needleIcon('universal')}</span><span><strong>New: b59 threading diagrams</strong><br><span class="small muted">Follow the thread step by step on a line drawing, with close-ups.</span></span><span class="go" aria-hidden="true">›</span></a>
    <footer class="wfoot">
      <a class="foot-logo" href="${esc(SHOP.url)}" target="_blank" rel="noopener" aria-label="${esc(SHOP.name)} website">${logoImg('shop-logo-img')}</a>
      <p>${esc(APP_NAME)} ${esc(TAGLINE)}, ${esc(SHOP.address)}</p>
      <p class="small"><a href="${esc(SHOP.url)}" target="_blank" rel="noopener">Visit ${esc(SHOP.name)} online ›</a></p>
      <p class="small muted">Works offline once loaded (except Bobbin's answers and photo search). Add it to your home screen from your browser menu.</p>
    </footer>
  </section>`;
  // if the logo file is missing, fall back to the shop name as text rather than a broken image
  $$('img[data-logo]', main).forEach(i => i.addEventListener('error', () => { const s = document.createElement('span'); s.className = 'logo-text'; s.textContent = SHOP.name; i.replaceWith(s); }, { once: true }));
  return mountIdentify($('#idres', main), { inputs: ['#wcam', '#wpick'], openMachine: openIdentified, toast });
}
// Identify flow hands back a chosen match: open it.
function openIdentified(m) {
  if (m.kind === 'accessory') { location.hash = `#/gear/${encodeURIComponent(m.id)}`; return; }
  if (m.appId) { S.machine = m.appId; save(); $$('#msel-side,#msel-top').forEach(x => { x.value = S.machine; }); location.hash = '#/machine'; return; }
  if (m.generic) { S.machine = m.generic; save(); $$('#msel-side,#msel-top').forEach(x => { x.value = S.machine; }); location.hash = '#/machine'; return; }
  location.hash = '#/machines';
}

/* ---------- Threading diagrams (b59) ---------- */
function vThread(r) {
  const cfg = B59_THREADING; // other machines: add a config like js/threading/b59.js and look it up here by r.args[0]
  if (r.args[0] && r.args[0] !== cfg.id) { location.hash = '#/guides'; return; }
  if (S.machine !== 'b59') { S.machine = 'b59'; save(); $$('#msel-side,#msel-top').forEach(x => { x.value = 'b59'; }); }
  main.innerHTML = `<a class="back" href="#/guides">‹ All guides</a><h1 class="page">${esc(cfg.machineName)} · threading diagrams</h1>
  <p class="lead">Tap Next and Back, or tap a step number. The pink line shows where the thread goes in that step; earlier steps fade back. Dashed means behind a part.</p><div id="tvroot"></div>`;
  return mountThreadViewer($('#tvroot', main), cfg, {
    seq: r.args[1] || 'upper', step: r.args[2],
    onChange: (seq, n) => history.replaceState(null, '', `#/thread/${cfg.id}/${seq}/${n}?keep=1`),
    pageLink: (pg) => aLink2(pageLink(pg, 'b59')), askHref: (q) => `#/ask?q=${encodeURIComponent(q)}`
  });
}
const aLink2 = (l) => l ? { href: l.href, label: l.label } : null;

/* ---------- Browse (the old home screen: pick a machine) ---------- */
function vBrowse() {
  const m = machine(); const gs = guidesFor(S.machine);
  const inprog = gs.find(g => doneCount(g) > 0 && doneCount(g) < g.steps.length);
  const next = inprog || gs[0];
  main.innerHTML = `
  <h1 class="page">Browse machines</h1><p class="lead">Pick your machine, then jump to its diagrams, guides, gear and manuals.</p>
  <div class="card"><h2>Your machine</h2>
    <div class="mgrid" role="group" aria-label="Choose machine">${MACHINES.map(x => `<button class="mbtn${x.id === S.machine ? ' on' : ''}" data-m="${x.id}" aria-pressed="${x.id === S.machine}">${esc(x.name)}<small>${x.model ? esc(typeLabel(x.type)) : x.studio ? 'Used at the studio' : 'Generic layout'}</small></button>`).join('')}</div>
    <p class="small" style="margin-top:10px"><a href="#/machines">Browse all ${CATALOG.length} machines the studio stocks ›</a></p>
    <p class="small muted" style="margin-top:10px">${esc(m.blurb)}</p></div>
  <div class="tiles" style="margin-bottom:14px">
    <a class="tile" href="#/machine">${ico('machine')}<strong>Machine diagrams</strong><span>Tap parts and controls to see what they do</span></a>
    <a class="tile" href="#/guides">${ico('guides')}<strong>Setup guides</strong><span>Threading, bobbin, foot, needle, embroidery</span></a>
    <a class="tile" href="#/gear">${ico('gear')}<strong>Feet, hoops & needles</strong><span>What each is for and how to fit it</span></a>
    <a class="tile" href="#/manuals">${ico('manuals')}<strong>Manuals</strong><span>Official manuals, checked page links</span></a>
  </div>
  ${next ? `<div class="card"><h2>${inprog ? 'Pick up where you left off' : 'Start here'}</h2>
    <div class="list"><a class="item" href="#/guide/${next.id}/${firstOpen(next)}"><span class="ico-wrap">${guideIcon(next)}</span><span class="grow"><span class="t">${esc(next.title)}</span><br><span class="d">${doneCount(next)} of ${next.steps.length} steps done · ${esc(next.time)}</span></span><span aria-hidden="true">›</span></a></div></div>` : ''}
  ${m.facts ? `<div class="card"><h2>${esc(m.name)} at a glance</h2><ul style="margin-left:18px;font-size:.88rem">${m.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>` : ''}
  <div class="card"><h2>Ask for help</h2><p class="small muted">Describe the problem or snap a photo of the thread path, needle or stitching. Answers link to the right guide step or diagram.</p><a class="btn" href="#/ask" style="margin-top:10px">Ask Bobbin</a></div>`;
  main.onclick = (e) => { const b = e.target.closest('[data-m]'); if (b) setMachine(b.dataset.m); };
}
const TYPE_LABEL = { sewing: 'Sewing', 'sewing+embroidery': 'Sewing + embroidery', embroidery: 'Embroidery', overlocker: 'Overlocker', coverstitch: 'Coverstitch', 'overlocker+coverstitch': 'Overlocker + coverstitch' };
const typeLabel = (t = '') => TYPE_LABEL[t] || (t.startsWith('sewing (') ? 'Sewing – ' + t.slice(8, -1) : t);
const firstOpen = (g) => { const i = g.steps.findIndex((_, k) => !prog(g.id).done[k + 1]); return i < 0 ? 1 : i + 1; };

/* ---------- Machine diagrams ---------- */
function hsMarkup(view, selId) {
  const sc = renderScene(view.scene, { ...(view.sopts || {}) });
  const letters = view.labels === 'letters';
  const pts = view.parts.map((p, i) => ({ p, i, a: sc.anchors[p.id] })).filter(x => x.a);
  const g = pts.map(({ p, i, a }) => `<g class="hs${p.id === selId ? ' sel' : ''}" data-id="${p.id}" data-x="${a[0]}" data-y="${a[1]}" tabindex="0" role="button" aria-label="${esc(p.name)}"><line class="lead" x1="0" y1="0" x2="0" y2="0"/><circle class="anc" r="3.5"/><circle class="hit" r="22"/><circle class="dot" r="12"/><text y="4.5" font-size="12.5">${letters ? String.fromCharCode(65 + i) : i + 1}</text></g>`).join('');
  return { vb: sc.vb, g };
}
function layoutHs(svg) {
  const w = svg.getBoundingClientRect().width || 1; const vb = svg.viewBox.baseVal; const k = vb.width / w;
  const gs = $$('.hs', svg);
  // Place each marker at its anchor, then nudge apart any that would overlap on screen (min 27px between centres),
  // keeping them inside the drawing. A thin leader line points back to the real anchor when a marker was moved.
  const pts = gs.map(g => ({ g, ax: +g.dataset.x, ay: +g.dataset.y, x: +g.dataset.x, y: +g.dataset.y }));
  const D = 27 * k, M = 14 * k;
  for (let it = 0; it < 80; it++) {
    let moved = false;
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j]; let dx = b.x - a.x, dy = b.y - a.y; let d = Math.hypot(dx, dy);
      if (d >= D) continue;
      if (d < 0.01) { dx = 1; dy = 0.3; d = Math.hypot(dx, dy); }
      const push = (D - d) / 2 + 0.2 * k; dx /= d; dy /= d;
      a.x -= dx * push; a.y -= dy * push; b.x += dx * push; b.y += dy * push; moved = true;
    }
    for (const p of pts) { // stay near the anchor (<= 38px) and inside the picture
      const ox = p.x - p.ax, oy = p.y - p.ay, od = Math.hypot(ox, oy), maxOff = 38 * k;
      if (od > maxOff) { p.x = p.ax + ox / od * maxOff; p.y = p.ay + oy / od * maxOff; }
      p.x = Math.min(vb.x + vb.width - M, Math.max(vb.x + M, p.x)); p.y = Math.min(vb.y + vb.height - M, Math.max(vb.y + M, p.y));
    }
    if (!moved) break;
  }
  for (const p of pts) {
    p.g.setAttribute('transform', `translate(${p.x} ${p.y}) scale(${k})`);
    const l = p.g.querySelector('.lead'); if (!l) continue;
    const lx = (p.ax - p.x) / k, ly = (p.ay - p.y) / k, far = Math.hypot(lx, ly) > 5;
    l.setAttribute('x2', lx); l.setAttribute('y2', ly); l.style.display = far ? '' : 'none';
    p.g.querySelector('.anc')?.setAttribute('cx', lx); p.g.querySelector('.anc')?.setAttribute('cy', ly); p.g.querySelector('.anc')?.style.setProperty('display', far ? '' : 'none');
  }
}
function vMachine(r) {
  const views = viewsFor();
  let view = views.find(v => v.id === r.args[0]) || views[0];
  let sel = r.args[1] && view.parts.find(p => p.id === r.args[1]) ? r.args[1] : null;
  const m = machine();
  const draw = () => {
    const sc = renderScene(view.scene, { ...(view.sopts || {}), hl: sel ? [sel] : [], label: `${m.name} – ${view.title}` });
    const letters = view.labels === 'letters';
    const hs = hsMarkup(view, sel);
    const svgHtml = sc.svg.replace('</svg>', `${hs.g}</svg>`);
    const p = view.parts.find(x => x.id === sel);
    main.innerHTML = `
    <h1 class="page">${esc(m.name)} · diagrams</h1>
    <p class="small" style="margin:-6px 0 10px"><a href="#/machines">Browse all machines ›</a></p>
    ${m.generic ? `<div class="tip" style="margin:0 0 10px"><strong>Generic layout.</strong> ${esc(m.brand)} models differ, so this shows typical parts and controls. Use the Manuals tab for your exact model.</div>` : ''}
    <div class="chips" role="tablist" aria-label="Diagram views">${views.map(v => `<a class="chip" role="tab" href="#/machine/${v.id}" aria-pressed="${v.id === view.id}" aria-selected="${v.id === view.id}">${esc(v.title)}</a>`).join('')}</div>
    <div class="two"><div class="sticky"><div class="card" style="padding:10px">${svgHtml}<p class="small muted" style="margin-top:8px">${esc(view.intro)} <em>Schematic drawing, not to scale.</em></p></div></div>
    <div><div id="detail">${p ? detailHtml(p, view) : `<div class="detail"><h3>Tap a ${letters ? 'letter' : 'number'} on the diagram</h3><p>…or pick a part from the list below to see what it does and where it is used in the guides.</p></div>`}</div>
    <div class="legend" role="list">${view.parts.map((q, i) => `<button role="listitem" data-id="${q.id}" class="${q.id === sel ? 'sel' : ''}"><span class="n">${letters ? String.fromCharCode(65 + i) : i + 1}</span>${esc(q.name)}</button>`).join('')}</div></div></div>`;
    const svg = $('svg.scene', main); layoutHs(svg);
    ro?.disconnect(); ro = new ResizeObserver(() => layoutHs(svg)); ro.observe(svg);
  };
  let ro;
  main.onclick = (e) => {
    const t = e.target.closest('.hs,.legend button'); if (!t) return;
    sel = t.dataset.id; history.replaceState(null, '', `#/machine/${view.id}/${sel}?keep=1`); draw();
    const d = $('#detail'); if (window.innerWidth < 900) d.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };
  main.onkeydown = (e) => { const t = e.target.closest?.('.hs'); if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); t.dispatchEvent(new MouseEvent('click', { bubbles: true })); } };
  draw();
  return () => ro?.disconnect();
}
function detailHtml(p, view) {
  const g = p.guide && guideById(p.guide[0]);
  const pl = aLink(pageLink(p.page), 'chip');
  return `<div class="detail"><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p><div class="links">
    ${p.go && viewsFor().find(v => v.id === p.go) ? `<a class="chip fawn" href="#/machine/${p.go}">See ${esc(viewsFor().find(v => v.id === p.go).title)} view ›</a>` : ''}
    ${g ? `<a class="chip" href="#/guide/${g.id}/${p.guide[1]}">${esc(g.title)}, step ${p.guide[1]} ›</a>` : ''}${pl}
    <a class="chip" href="#/ask?q=${encodeURIComponent('What is the ' + p.name + ' for?')}">Ask Bobbin</a></div></div>`;
}

/* ---------- Guides ---------- */
function vGuides() {
  const gs = guidesFor(S.machine); const all = allGuides();
  const hidden = all.filter(g => !gs.includes(g));
  main.innerHTML = `<h1 class="page">Setup guides</h1><p class="lead">Step-by-step with a diagram, a checklist and a “mark done” state for each step. Progress is saved on this device.</p>
  ${isB59() ? `<a class="tv-promo" href="#/thread/b59/upper/1"><span class="ico-wrap">${needleIcon('universal')}</span><span><strong>Threading diagrams</strong><br><span class="small muted">Upper thread, needle threader, bobbin winding and bobbin insertion on a line drawing, with close-ups.</span></span><span class="go" aria-hidden="true">›</span></a>` : ''}
  <div class="card list">${gs.map(g => `<a class="item" href="#/guide/${g.id}/${firstOpen(g)}"><span class="ico-wrap">${guideIcon(g)}</span><span class="grow"><span class="t">${esc(g.title)}</span> ${g.machines.length === 1 ? '<span class="badge fawn">b59</span>' : ''}<br><span class="d">${esc(g.intro)}</span><div class="bar" style="margin-top:7px"><i style="width:${pct(g)}%"></i></div><span class="d">${doneCount(g)}/${g.steps.length} done · ${esc(g.time)}</span></span><span aria-hidden="true">›</span></a>`).join('')}</div>
  ${hidden.length ? `<div class="tip">${hidden.map(g => esc(g.title)).join(', ')} ${hidden.length > 1 ? 'are' : 'is'} written for the Bernette b59 only. Switch machine to see ${hidden.length > 1 ? 'them' : 'it'}.</div>` : ''}
  ${gs.some(g => doneCount(g)) ? `<button class="btn ghost" id="reset" style="margin-top:10px">Reset all progress</button>` : ''}`;
  main.onclick = (e) => { if (e.target.id === 'reset' && confirm('Clear all guide progress on this device?')) { S.progress = {}; save(); vGuides(); } };
}

function vGuide(r) {
  const g = guideById(r.args[0]); if (!g) { location.hash = '#/guides'; return; }
  let step = Math.min(Math.max(1, parseInt(r.args[1]) || 1), g.steps.length);
  const p = prog(g.id); const m = machine();
  const generic = !isB59() && !isModel(S.machine);
  const draw = () => {
    const s = g.steps[step - 1];
    const hlIds = s.so?.hl || [];
    const sc = renderScene(s.scene, { ...(s.soptsOverride || {}), ...(s.so || {}), label: `Diagram for step ${step}: ${s.t}` });
    const dc = doneCount(g);
    const gear = (s.acc || []).map(id => accessoryById(id)).filter(Boolean);
    const viewLink = findView(s.scene, hlIds);
    const pl = aLink(pageLink(s.page));
    const checks = (s.check || []);
    const stepsList = g.steps.map((x, i) => `<button class="sitem${i + 1 === step ? ' cur' : ''}${p.done[i + 1] ? ' done' : ''}" data-step="${i + 1}" aria-current="${i + 1 === step}"><span class="n">${p.done[i + 1] ? '✓' : i + 1}</span>${esc(x.t)}</button>`).join('');
    main.innerHTML = `<a class="back" href="#/guides">‹ All guides</a>
    <h1 class="page">${esc(g.title)}</h1>
    ${isModel(S.machine) ? `<div class="tip" style="margin:0 0 10px">Written for the ${esc(m.name)} from the maker's manual and product page. Drawings are simplified${getModel(S.machine).manual ? '; page links were checked against the PDF' : '; the maker\'s PDF could not be read automatically, so check details against your own manual'}.</div>` : ''}
    ${generic ? `<div class="tip" style="margin:0 0 10px">Written for the Bernette b59. Other machines work on the same principles, but positions and button names differ – check your own manual (Manuals tab).</div>` : ''}
    ${isB59() && B59_GUIDE_MAP[g.id] ? `<a class="tv-promo" style="margin:0 0 10px;padding:10px 12px" href="#/thread/b59/${B59_GUIDE_MAP[g.id][Math.min(step, B59_GUIDE_MAP[g.id].length) - 1].join('/')}"><span><strong>Follow the thread on the new diagram</strong><br><span class="small muted">Line drawing with numbered steps and close-ups.</span></span><span class="go" aria-hidden="true">›</span></a>` : ''}
    <div class="row" style="margin-bottom:8px"><div class="grow"><div class="bar"><i style="width:${pct(g)}%"></i></div></div><span class="small muted">${dc}/${g.steps.length} done</span></div>
    <div class="steps" role="group" aria-label="Steps">${g.steps.map((x, i) => `<button data-step="${i + 1}" class="${p.done[i + 1] ? 'done' : ''}${i + 1 === step ? ' cur' : ''}" aria-label="Step ${i + 1}${p.done[i + 1] ? ' (done)' : ''}: ${esc(x.t)}" aria-current="${i + 1 === step}">${p.done[i + 1] ? '✓' : i + 1}</button>`).join('')}</div>
    <div class="two"><div class="stepside card" style="padding:8px">${stepsList}${dc ? '<button class="btn ghost sm" id="greset" style="margin-top:6px">Reset this guide</button>' : ''}</div>
    <div class="card">
      <div class="small muted" style="font-weight:700;letter-spacing:.4px;text-transform:uppercase">Step ${step} of ${g.steps.length}${p.done[step] ? ' · <span class="doneflag">done ✓</span>' : ''}</div>
      <h2 style="font-size:1.12rem;margin:2px 0 10px;color:var(--ink)">${esc(s.t)}</h2>
      ${sc.svg}
      <p style="margin-top:12px;font-size:.92rem">${esc(s.b)}</p>
      ${s.warn ? `<div class="warn"><strong>Careful:</strong> ${esc(s.warn)}</div>` : ''}${s.tip ? `<div class="tip"><strong>Tip:</strong> ${esc(s.tip)}</div>` : ''}
      <ul class="checks" aria-label="Checklist">${checks.map((c, k) => `<li><label class="${p.checks[step + '.' + k] ? 'on' : ''}"><input type="checkbox" data-c="${step}.${k}"${p.checks[step + '.' + k] ? ' checked' : ''}><span>${esc(c)}</span></label></li>`).join('')}</ul>
      <div class="links">${viewLink ? `<a class="chip fawn" href="${viewLink}">Find it on the diagram ›</a>` : ''}${pl}${gear.map(a => `<a class="chip" href="#/gear/${a.id}">${esc(a.name)}</a>`).join('')}<a class="chip" href="#/ask?q=${encodeURIComponent('Help with ' + g.title + ', step ' + step + ': ' + s.t)}">Ask Bobbin about this step</a></div>
      <div class="stepnav"><button class="btn sec" data-a="prev"${step === 1 ? ' disabled' : ''}>‹ Back</button><button class="btn ${p.done[step] ? 'sec' : ''}" data-a="done">${p.done[step] ? 'Undo done' : '✓ Mark done'}</button><button class="btn sec" data-a="next"${step === g.steps.length ? ' disabled' : ''}>Next ›</button></div>
      ${dc === g.steps.length ? `<div class="tip" style="margin-top:12px"><strong>All steps done 🎉</strong> You can reset this guide any time.</div>` : (checks.length && checks.some((_, k) => !p.checks[step + '.' + k]) && !p.done[step] ? '' : '')}
    </div></div>`;
  };
  const go = (n, replace) => { step = n; history.replaceState(null, '', `#/guide/${g.id}/${n}?keep=1`); draw(); window.scrollTo({ top: 0 }); };
  main.onclick = (e) => {
    const sb = e.target.closest('[data-step]'); if (sb) return go(+sb.dataset.step);
    if (e.target.id === 'greset') { if (confirm('Reset progress for this guide?')) { S.progress[g.id] = { done: {}, checks: {} }; save(); Object.assign(p, S.progress[g.id]); go(1); } return; }
    const a = e.target.closest('[data-a]')?.dataset.a; if (!a) return;
    if (a === 'prev' && step > 1) go(step - 1);
    if (a === 'next' && step < g.steps.length) go(step + 1);
    if (a === 'done') { const now = !p.done[step]; p.done[step] = now || undefined; if (!now) delete p.done[step]; save(); if (now && step < g.steps.length) go(step + 1); else draw(); if (now && doneCount(g) === g.steps.length) toast('Guide complete 🎉'); }
  };
  main.onchange = (e) => { const c = e.target.dataset?.c; if (!c) return; if (e.target.checked) p.checks[c] = true; else delete p.checks[c]; save(); e.target.closest('label').classList.toggle('on', e.target.checked); };
  main.onkeydown = (e) => { if (e.target.matches('input,textarea,select')) return; if (e.key === 'ArrowRight' && step < g.steps.length) go(step + 1); if (e.key === 'ArrowLeft' && step > 1) go(step - 1); };
  draw();
}
function findView(scene, hl) {
  const vs = viewsFor(); const cand = vs.filter(v => v.scene === scene && (!v.sopts || !scene || true));
  const v = cand.find(x => hl.some(h => x.parts.some(p => p.id === h))) || null;
  return v ? `#/machine/${v.id}/${hl.find(h => v.parts.some(p => p.id === h))}` : null;
}

/* ---------- Gear ---------- */
let gearCat = 'all', gearAll = false, gearQ = '';
function vGear(r) {
  const id = r.args[0];
  const m = machine();
  const list = (gearAll ? allAccessories() : accessoriesFor(S.machine)).filter(a => (gearCat === 'all' || a.cat === gearCat) && (!gearQ || (a.name + ' ' + a.what).toLowerCase().includes(gearQ.toLowerCase())));
  const item = id && accessoryById(decodeURIComponent(id));
  const card = (a) => `<a class="gcard${item && item.id === a.id ? ' sel' : ''}" href="#/gear/${a.id}">${iconFor(a)}<strong>${esc(a.name)}</strong>${a.inc && a.m === S.machine ? `<span class="badge">Included with ${esc(shortName(m))}</span>` : a.inc ? `<span class="badge fawn">${esc(shortName(machineOf(a.m)))} accessory</span>` : a.m === 'all' ? '<span class="badge grey">Optional · check fit</span>' : ''}</a>`;
  const gridHtml = list.length ? `<div class="gear-grid">${list.map(card).join('')}</div>` : `<div class="empty">Nothing matches. Try “All” or turn on “Show every machine”.</div>`;
  const filters = `<input class="search" id="gq" type="search" placeholder="Search feet, hoops, needles…" value="${esc(gearQ)}" aria-label="Search gear"><div class="chips" role="group" aria-label="Category">${CATS.map(c => `<button class="chip" data-cat="${c.id}" aria-pressed="${gearCat === c.id}">${c.name}</button>`).join('')}<button class="chip fawn" id="gall" aria-pressed="${gearAll}">${gearAll ? 'Showing every machine' : 'For ' + esc(m.name)}</button></div>`;
  main.innerHTML = `<h1 class="page">Feet, hoops & needles</h1><p class="lead">What each one is for, when to use it and how to fit it${isB59() || isModel(S.machine) ? `. “Included” items come with the ${esc(shortName(m))}; optional items are common extras – check fit with your own machine.` : '. Check fit with your own machine.'}</p>
  ${item && window.innerWidth < 900 ? '' : filters}
  <div class="${item ? 'two' : ''}">${item && window.innerWidth < 900 ? '' : `<div>${gridHtml}</div>`}${item ? `<div class="${window.innerWidth >= 900 ? 'sticky' : ''}">${gearDetail(item)}</div>` : ''}</div>`;
  main.onclick = (e) => {
    const c = e.target.closest('[data-cat]'); if (c) { gearCat = c.dataset.cat; return vGear({ args: id ? [id] : [], q: new URLSearchParams() }); }
    if (e.target.closest('#gall')) { gearAll = !gearAll; return vGear({ args: id ? [id] : [], q: new URLSearchParams() }); }
  };
  const q = $('#gq'); if (q) q.addEventListener('input', (e) => { gearQ = e.target.value; const pos = e.target.selectionStart; vGear({ args: id ? [id] : [], q: new URLSearchParams([['keep', '1']]) }); const n = $('#gq'); n.focus(); n.setSelectionRange(pos, pos); });
}
const machineOf = (id) => MACHINES.find(x => x.id === id) || machine();
function gearDetail(a) {
  const sc = a.scene || (a.cat === 'foot' ? ['foot', { mode: 'sole' }] : a.cat === 'hoop' ? ['hoop', {}] : a.cat === 'needle' ? ['needle', { mode: 'insert' }] : null);
  const g = a.guide && guideById(a.guide[0]);
  const pl = aLink(pageLink(a.page));
  const back = window.innerWidth < 900 ? '<a class="back" href="#/gear">‹ All gear</a>' : '';
  return `${back}<div class="card"><div class="row"><span class="ico-wrap" style="flex-basis:64px;height:64px">${iconFor(a)}</span><div class="grow"><h2 style="margin:0;font-size:1.15rem">${esc(a.name)}</h2>${a.inc ? `<span class="badge">Included with ${esc(shortName(machineOf(a.m)))}</span>` : ''} ${a.m === 'b59' && !isB59() ? '<span class="badge fawn">b59 accessory</span>' : ''}</div></div>
  <p style="margin-top:12px;font-size:.92rem">${esc(a.what)}</p>
  <h3 class="h2" style="margin-top:12px">When to use it</h3><ul style="margin-left:18px;font-size:.88rem">${a.when.map(w => `<li>${esc(w)}</li>`).join('')}</ul>
  ${sc ? `<h3 class="h2" style="margin-top:14px">Fitting diagram</h3>${renderScene(sc[0], { ...sc[1], label: 'Fitting diagram for ' + a.name }).svg}` : ''}
  <h3 class="h2" style="margin-top:14px">How to fit it</h3><ol class="fit">${a.fit.map(f => `<li>${esc(f)}</li>`).join('')}</ol>
  ${a.tip ? `<div class="tip"><strong>Tip:</strong> ${esc(a.tip)}</div>` : ''}
  <div class="links">${g ? `<a class="chip" href="#/guide/${g.id}/${a.guide[1]}">${esc(g.title)}, step ${a.guide[1]} ›</a>` : ''}${pl}<a class="chip" href="#/ask?q=${encodeURIComponent('When should I use the ' + a.name + '?')}">Ask Bobbin</a></div></div>`;
}

/* ---------- Manuals (official links only) ---------- */
function vManuals() {
  const links = linksFor(S.machine); const m = machine(); const pages = pagesFor(S.machine);
  main.innerHTML = `<h1 class="page">Manuals</h1><p class="lead">Official manuals for ${esc(m.name)}, straight from the maker.</p>
  <div class="card"><h2>Official manuals</h2><div class="list">${links.map(l => `<a class="item" href="${esc(l.url)}" target="_blank" rel="noopener"><span class="ico-wrap"><strong class="small" style="color:var(--tealD)">${l.kind}</strong></span><span class="grow"><span class="t">${esc(l.title)}</span><br><span class="d">${esc(l.note)}${l.blocked ? ' <strong>Link not auto-checked</strong> (the site blocks bots).' : ''}</span></span><span aria-hidden="true">↗</span></a>`).join('')}</div>
  <p class="small muted" style="margin-top:8px">Links open the maker's own site. Manuals are copyrighted, so the app links to them rather than copying them.</p></div>
  ${pages.length ? `<div class="card"><h2>Where to look in the ${esc(shortName(m))} manual</h2><p class="small muted">${isB59() ? 'Page numbers for the English 2026-03 edition – other editions may shift by a page or two.' : `Printed page numbers in the ${esc(getModel(S.machine).manual.edition)} edition. Each one was checked against the PDF text; other editions may shift by a page or two.`}</p><table class="pages">${pages.map(t => { const l = pageLink(t.page); return `<tr><td>${esc(t.topic)}</td><td>${aLink(l ? { ...l, label: 'p.' + t.page + ' ↗' } : null, 'chip')}</td></tr>`; }).join('')}</table></div>` : ''}`;
}

/* ---------- Browse machines ---------- */
let mQ = '', mBrand = 'all', mGroup = 'all';
const GENERIC_FOR = { Brother: 'brother', Bernina: 'bernina', Janome: 'janome' };
function vMachines() {
  const BUILT_COUNT = CATALOG.filter(c => catalogToApp(c.id)).length; // computed from the registry, never hard-coded
  const brands = [...new Set(CATALOG.map(c => c.brand))].sort((a, b) => a.localeCompare(b));
  const rows = () => CATALOG.filter(c => (mBrand === 'all' || c.brand === mBrand) && (mGroup === 'all' || c.group === mGroup) && (!mQ || `${c.brand} ${c.model} ${typeLabel(c.type)}`.toLowerCase().includes(mQ.toLowerCase())));
  const card = (c) => {
    const aid = catalogToApp(c.id); const sel = aid && aid === S.machine;
    return `<div class="item mrow" data-cid="${esc(c.id)}"><span class="grow"><span class="t">${esc(c.brand)} ${esc(c.model)}</span><br><span class="d">${esc(typeLabel(c.type))}${aid ? ' · <span class="badge">Breakdown ready</span>' : ' · <span class="badge grey">Not built yet</span>'}</span></span>
      <span class="mact">${aid ? `<button class="btn sm${sel ? ' sec' : ''}" data-pick="${esc(aid)}">${sel ? 'Selected' : 'Open'}</button>` : `${GENERIC_FOR[c.brand] ? `<button class="btn sm sec" data-pick="${GENERIC_FOR[c.brand]}" title="Typical ${esc(c.brand)} layout">Generic layout</button>` : ''}`}<a class="chip" href="${esc(c.url)}" target="_blank" rel="noopener" aria-label="Shop page for ${esc(c.brand)} ${esc(c.model)}">Shop ↗</a></span></div>`;
  };
  main.innerHTML = `<h1 class="page">All machines</h1><p class="lead">Every sewing, embroidery and overlocker model The Sewing Studio lists – ${CATALOG.length} in all. ${BUILT_COUNT} have their own breakdown so far; the rest are being added in batches.</p>
  <input class="search" id="mq" type="search" placeholder="Search brand or model…" value="${esc(mQ)}" aria-label="Search machines">
  <div class="chips" role="group" aria-label="Type">${GROUPS.map(([k, l]) => `<button class="chip" data-g="${k}" aria-pressed="${mGroup === k}">${l}</button>`).join('')}</div>
  <div class="chips" role="group" aria-label="Brand"><button class="chip" data-b="all" aria-pressed="${mBrand === 'all'}">All brands</button>${brands.map(b => `<button class="chip" data-b="${esc(b)}" aria-pressed="${mBrand === b}">${esc(b)}</button>`).join('')}</div>
  <p class="small muted" id="mcount" role="status"></p><div class="list" id="mlist"></div>`;
  const paint = () => { const rs = rows(); $('#mcount').textContent = `Showing ${rs.length} of ${CATALOG.length}`; $('#mlist').innerHTML = rs.length ? rs.map(card).join('') : '<div class="empty">No machines match. Try a different brand or type.</div>'; $$('[data-g]', main).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.g === mGroup))); $$('[data-b]', main).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.b === mBrand))); };
  paint();
  $('#mq').addEventListener('input', (e) => { mQ = e.target.value; paint(); });
  main.onclick = (e) => {
    const g = e.target.closest('[data-g]'); if (g) { mGroup = g.dataset.g; return paint(); }
    const b = e.target.closest('[data-b]'); if (b) { mBrand = b.dataset.b; return paint(); }
    const pk = e.target.closest('[data-pick]'); if (pk) { S.machine = pk.dataset.pick; save(); $$('#msel-side,#msel-top').forEach(x => { x.value = S.machine; }); location.hash = '#/machine'; }
  };
}

/* ---------- Ask ---------- */
function vAsk(r) { return mountAsk(main, { machine: () => machine(), isB59, initial: r.q.get('q') || '' }); }

/* ---------- boot ---------- */
buildChrome();
netState(); addEventListener('online', netState); addEventListener('offline', netState);
route();
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
