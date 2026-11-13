import { MACHINES, VIEWS, MANUAL_LINKS, B59_PAGES, ACCESSORIES, CATS, accessoriesFor } from './content.js';
import { GUIDES, guideById, guidesFor } from './guides.js';
import { renderScene, footIcon, hoopIcon, needleIcon, otherIcon } from './svg.js';
import * as Man from './manuals.js';
import { mountAsk } from './ask.js';

/* ---------- state ---------- */
const KEY = 'ssai.v1';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const S = Object.assign({ machine: 'b59', progress: {} }, load());
const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ machine: S.machine, progress: S.progress })); } catch { /* private mode */ } };
let docs = [];
const refreshDocs = async () => { try { docs = await Man.listDocs(); } catch { docs = []; } };

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const machine = () => MACHINES.find(m => m.id === S.machine) || MACHINES[0];
const isB59 = () => S.machine === 'b59';
const viewsFor = () => (isB59() ? VIEWS.b59 : VIEWS.generic);
const main = $('#view');
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600); }

const B59_PDF = MANUAL_LINKS.b59[0].url;
function pageLink(page, machineId = S.machine) {
  if (!page) return null;
  const d = docs.find(x => x.machine === machineId && x.type === 'full');
  if (d) return { href: `#/manuals/view/${d.id}?page=${page}`, label: `Manual p.${page} (your copy)`, ext: false };
  if (machineId === 'b59') return { href: `${B59_PDF}#page=${page}`, label: `Official manual p.${page} ↗`, ext: true };
  return null;
}
const aLink = (l, cls = 'chip') => l ? `<a class="${cls}" href="${esc(l.href)}"${l.ext ? ' target="_blank" rel="noopener"' : ''}>${esc(l.label)}</a>` : '';

const ICONS = {
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>', machine: '<rect x="3" y="4" width="18" height="6" rx="2"/><path d="M5 10v9h14v-9M9 15h6"/>',
  guides: '<path d="M4 5h16M4 12h16M4 19h10"/><circle cx="19" cy="19" r="2"/>', gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  manuals: '<path d="M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3V4zM8 4v13"/>', ask: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M9 9h6M9 12h4"/>'
};
const ico = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg>`;
const NAV = [['home', 'Home'], ['machine', 'Machine'], ['guides', 'Guides'], ['gear', 'Gear'], ['manuals', 'Manuals'], ['ask', 'Ask AI']];
const iconFor = (a) => a.icon[0] === 'foot' ? footIcon(a.icon[1]) : a.icon[0] === 'hoop' ? hoopIcon(a.icon[1]) : a.icon[0] === 'needle' ? needleIcon(a.icon[1]) : otherIcon(a.icon[1]);
const guideIcon = (g) => ({ hoop: hoopIcon('M'), thread: needleIcon('embroidery'), bobbin: otherIcon('bobbin'), sew: otherIcon('plate'), foot: footIcon('zigzag'), needle: needleIcon('universal') }[g.icon]);

function buildChrome() {
  const sel = (id) => `<div class="msel"><label for="${id}">Machine</label><select id="${id}" aria-label="Machine">${MACHINES.map(m => `<option value="${m.id}"${m.id === S.machine ? ' selected' : ''}>${esc(m.name)}</option>`).join('')}</select></div>`;
  $('#side').innerHTML = `<div class="brand"><img src="icons/icon.svg" alt=""><div>Sewing Studio AI<small>The Sewing Studio · Redruth</small></div></div>${sel('msel-side')}<nav aria-label="Main">${NAV.map(([k, l]) => `<a href="#/${k}" data-nav="${k}">${ico(k)}<span>${l}</span></a>`).join('')}</nav><div class="foot"><span id="net-state"></span><br>Your progress and uploaded manuals stay on this device.</div>`;
  $('#top').innerHTML = `<div class="brand"><img src="icons/icon.svg" alt=""><div>Sewing Studio AI<small>Guided help for your machine</small></div></div><span id="net-pill" class="pill" hidden>Offline</span><div class="msel"><select id="msel-top" aria-label="Machine">${MACHINES.map(m => `<option value="${m.id}"${m.id === S.machine ? ' selected' : ''}>${esc(m.name)}</option>`).join('')}</select></div>`;
  $('#tabbar').innerHTML = NAV.map(([k, l]) => `<a href="#/${k}" data-nav="${k}">${ico(k)}<span>${l.replace(' AI', '')}</span></a>`).join('');
  $$('#msel-side,#msel-top').forEach(s => s.addEventListener('change', e => setMachine(e.target.value)));
}
function setMachine(id) { S.machine = id; save(); $$('#msel-side,#msel-top').forEach(s => { s.value = id; }); route(); }
function netState() { const off = !navigator.onLine; const p = $('#net-pill'); if (p) { p.hidden = !off; p.classList.toggle('off', off); } const n = $('#net-state'); if (n) n.textContent = off ? 'Offline – AI help is paused' : 'Online'; }

/* ---------- router ---------- */
function parse() {
  const h = location.hash.replace(/^#\/?/, ''); const [path, qs] = h.split('?'); const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
  return { name: parts[0] || 'home', args: parts.slice(1), q: new URLSearchParams(qs || '') };
}
let cleanup = null;
async function route() {
  if (cleanup) { try { cleanup(); } catch { /* ignore */ } cleanup = null; }
  const r = parse();
  const fn = { home: vHome, machine: vMachine, guides: vGuides, guide: vGuide, gear: vGear, manuals: vManuals, ask: vAsk }[r.name] || vHome;
  const navKey = r.name === 'guide' ? 'guides' : (fn === vHome && r.name !== 'home' ? 'home' : r.name);
  $$('[data-nav]').forEach(a => { if (a.dataset.nav === navKey) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  main.innerHTML = '';
  const c = await fn(r);
  if (typeof c === 'function') cleanup = c;
  if (!r.q.has('keep')) window.scrollTo(0, 0);
  document.title = `${{ home: 'Home', machine: 'Machine diagrams', guides: 'Guides', guide: 'Guide', gear: 'Gear', manuals: 'Manuals', ask: 'Ask AI' }[r.name] || 'Home'} · Sewing Studio AI`;
}
window.addEventListener('hashchange', route);

/* ---------- progress ---------- */
const prog = (gid) => (S.progress[gid] = S.progress[gid] || { done: {}, checks: {} });
const doneCount = (g) => g.steps.filter((_, i) => prog(g.id).done[i + 1]).length;
const pct = (g) => Math.round(100 * doneCount(g) / g.steps.length);

/* ---------- Home ---------- */
function vHome() {
  const m = machine(); const gs = guidesFor(S.machine);
  const inprog = gs.find(g => doneCount(g) > 0 && doneCount(g) < g.steps.length);
  const next = inprog || gs[0];
  main.innerHTML = `
  <h1 class="page">Welcome 👋</h1><p class="lead">Manuals, machine diagrams, step-by-step setup guides, accessories and AI help – in one place.</p>
  <div class="card"><h2>Your machine</h2>
    <div class="mgrid" role="group" aria-label="Choose machine">${MACHINES.map(x => `<button class="mbtn${x.id === S.machine ? ' on' : ''}" data-m="${x.id}" aria-pressed="${x.id === S.machine}">${esc(x.name)}<small>${x.studio ? 'Used at the studio' : 'Generic layout'}</small></button>`).join('')}</div>
    <p class="small muted" style="margin-top:10px">${esc(m.blurb)}</p></div>
  <div class="tiles" style="margin-bottom:14px">
    <a class="tile" href="#/machine">${ico('machine')}<strong>Machine diagrams</strong><span>Tap parts and controls to see what they do</span></a>
    <a class="tile" href="#/guides">${ico('guides')}<strong>Setup guides</strong><span>Threading, bobbin, foot, needle, embroidery</span></a>
    <a class="tile" href="#/gear">${ico('gear')}<strong>Feet, hoops & needles</strong><span>What each is for and how to fit it</span></a>
    <a class="tile" href="#/manuals">${ico('manuals')}<strong>Manuals</strong><span>Official links + your own PDFs, offline</span></a>
  </div>
  ${next ? `<div class="card"><h2>${inprog ? 'Pick up where you left off' : 'Start here'}</h2>
    <div class="list"><a class="item" href="#/guide/${next.id}/${firstOpen(next)}"><span class="ico-wrap">${guideIcon(next)}</span><span class="grow"><span class="t">${esc(next.title)}</span><br><span class="d">${doneCount(next)} of ${next.steps.length} steps done · ${esc(next.time)}</span></span><span aria-hidden="true">›</span></a></div></div>` : ''}
  ${m.facts ? `<div class="card"><h2>${esc(m.name)} at a glance</h2><ul style="margin-left:18px;font-size:.88rem">${m.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>` : ''}
  <div class="card"><h2>Ask for help</h2><p class="small muted">Describe the problem or snap a photo of the thread path, needle or stitching. Answers link to the right guide step or diagram.</p><a class="btn" href="#/ask" style="margin-top:10px">Ask AI</a></div>
  <p class="small muted" style="text-align:center;margin-top:6px">Works offline once loaded (except AI help). Install it from your browser menu: “Add to Home screen”.</p>`;
  main.onclick = (e) => { const b = e.target.closest('[data-m]'); if (b) setMachine(b.dataset.m); };
}
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
  const pl = isB59() ? aLink(pageLink(p.page), 'chip') : '';
  return `<div class="detail"><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p><div class="links">
    ${p.go && viewsFor().find(v => v.id === p.go) ? `<a class="chip fawn" href="#/machine/${p.go}">See ${esc(viewsFor().find(v => v.id === p.go).title)} view ›</a>` : ''}
    ${g ? `<a class="chip" href="#/guide/${g.id}/${p.guide[1]}">${esc(g.title)}, step ${p.guide[1]} ›</a>` : ''}${pl}
    <a class="chip" href="#/ask?q=${encodeURIComponent('What is the ' + p.name + ' for?')}">Ask AI</a></div></div>`;
}

/* ---------- Guides ---------- */
function vGuides() {
  const gs = guidesFor(S.machine); const all = GUIDES;
  const hidden = all.filter(g => !gs.includes(g));
  main.innerHTML = `<h1 class="page">Setup guides</h1><p class="lead">Step-by-step with a diagram, a checklist and a “mark done” state for each step. Progress is saved on this device.</p>
  <div class="card list">${gs.map(g => `<a class="item" href="#/guide/${g.id}/${firstOpen(g)}"><span class="ico-wrap">${guideIcon(g)}</span><span class="grow"><span class="t">${esc(g.title)}</span> ${g.machines.length === 1 ? '<span class="badge fawn">b59</span>' : ''}<br><span class="d">${esc(g.intro)}</span><div class="bar" style="margin-top:7px"><i style="width:${pct(g)}%"></i></div><span class="d">${doneCount(g)}/${g.steps.length} done · ${esc(g.time)}</span></span><span aria-hidden="true">›</span></a>`).join('')}</div>
  ${hidden.length ? `<div class="tip">${hidden.map(g => esc(g.title)).join(', ')} ${hidden.length > 1 ? 'are' : 'is'} written for the Bernette b59 only. Switch machine to see ${hidden.length > 1 ? 'them' : 'it'}.</div>` : ''}
  ${gs.some(g => doneCount(g)) ? `<button class="btn ghost" id="reset" style="margin-top:10px">Reset all progress</button>` : ''}`;
  main.onclick = (e) => { if (e.target.id === 'reset' && confirm('Clear all guide progress on this device?')) { S.progress = {}; save(); vGuides(); } };
}

function vGuide(r) {
  const g = guideById(r.args[0]); if (!g) { location.hash = '#/guides'; return; }
  let step = Math.min(Math.max(1, parseInt(r.args[1]) || 1), g.steps.length);
  const p = prog(g.id); const m = machine();
  const generic = !isB59();
  const draw = () => {
    const s = g.steps[step - 1];
    const hlIds = s.so?.hl || [];
    const sc = renderScene(s.scene, { ...(s.so || {}), label: `Diagram for step ${step}: ${s.t}` });
    const dc = doneCount(g);
    const gear = (s.acc || []).map(id => ACCESSORIES.find(a => a.id === id)).filter(Boolean);
    const viewLink = findView(s.scene, hlIds);
    const pl = isB59() ? aLink(pageLink(s.page)) : '';
    const checks = (s.check || []);
    const stepsList = g.steps.map((x, i) => `<button class="sitem${i + 1 === step ? ' cur' : ''}${p.done[i + 1] ? ' done' : ''}" data-step="${i + 1}" aria-current="${i + 1 === step}"><span class="n">${p.done[i + 1] ? '✓' : i + 1}</span>${esc(x.t)}</button>`).join('');
    main.innerHTML = `<a class="back" href="#/guides">‹ All guides</a>
    <h1 class="page">${esc(g.title)}</h1>
    ${generic ? `<div class="tip" style="margin:0 0 10px">Written for the Bernette b59. Other machines work on the same principles, but positions and button names differ – check your own manual (Manuals tab).</div>` : ''}
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
      <div class="links">${viewLink ? `<a class="chip fawn" href="${viewLink}">Find it on the diagram ›</a>` : ''}${pl}${gear.map(a => `<a class="chip" href="#/gear/${a.id}">${esc(a.name)}</a>`).join('')}<a class="chip" href="#/ask?q=${encodeURIComponent('Help with ' + g.title + ', step ' + step + ': ' + s.t)}">Ask AI about this step</a></div>
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
  const list = (gearAll ? ACCESSORIES : accessoriesFor(S.machine)).filter(a => (gearCat === 'all' || a.cat === gearCat) && (!gearQ || (a.name + ' ' + a.what).toLowerCase().includes(gearQ.toLowerCase())));
  const item = id && ACCESSORIES.find(a => a.id === id);
  const card = (a) => `<a class="gcard${item && item.id === a.id ? ' sel' : ''}" href="#/gear/${a.id}">${iconFor(a)}<strong>${esc(a.name)}</strong>${isB59() ? (a.inc ? '<span class="badge">Included with b59</span>' : a.m === 'all' ? '<span class="badge grey">Optional · check fit</span>' : '') : ''}</a>`;
  const gridHtml = list.length ? `<div class="gear-grid">${list.map(card).join('')}</div>` : `<div class="empty">Nothing matches. Try “All” or turn on “Show every machine”.</div>`;
  const filters = `<input class="search" id="gq" type="search" placeholder="Search feet, hoops, needles…" value="${esc(gearQ)}" aria-label="Search gear"><div class="chips" role="group" aria-label="Category">${CATS.map(c => `<button class="chip" data-cat="${c.id}" aria-pressed="${gearCat === c.id}">${c.name}</button>`).join('')}<button class="chip fawn" id="gall" aria-pressed="${gearAll}">${gearAll ? 'Showing every machine' : 'For ' + esc(m.name)}</button></div>`;
  main.innerHTML = `<h1 class="page">Feet, hoops & needles</h1><p class="lead">What each one is for, when to use it and how to fit it${isB59() ? '. “Included” items come with the b59.' : '. Check fit with your own machine.'}</p>
  ${item && window.innerWidth < 900 ? '' : filters}
  <div class="${item ? 'two' : ''}">${item && window.innerWidth < 900 ? '' : `<div>${gridHtml}</div>`}${item ? `<div class="${window.innerWidth >= 900 ? 'sticky' : ''}">${gearDetail(item)}</div>` : ''}</div>`;
  main.onclick = (e) => {
    const c = e.target.closest('[data-cat]'); if (c) { gearCat = c.dataset.cat; return vGear({ args: id ? [id] : [], q: new URLSearchParams() }); }
    if (e.target.closest('#gall')) { gearAll = !gearAll; return vGear({ args: id ? [id] : [], q: new URLSearchParams() }); }
  };
  const q = $('#gq'); if (q) q.addEventListener('input', (e) => { gearQ = e.target.value; const pos = e.target.selectionStart; vGear({ args: id ? [id] : [], q: new URLSearchParams([['keep', '1']]) }); const n = $('#gq'); n.focus(); n.setSelectionRange(pos, pos); });
}
function gearDetail(a) {
  const sc = a.scene || (a.cat === 'foot' ? ['foot', { mode: 'sole' }] : a.cat === 'hoop' ? ['hoop', {}] : a.cat === 'needle' ? ['needle', { mode: 'insert' }] : null);
  const g = a.guide && guideById(a.guide[0]);
  const pl = isB59() ? aLink(pageLink(a.page)) : '';
  const back = window.innerWidth < 900 ? '<a class="back" href="#/gear">‹ All gear</a>' : '';
  return `${back}<div class="card"><div class="row"><span class="ico-wrap" style="flex-basis:64px;height:64px">${iconFor(a)}</span><div class="grow"><h2 style="margin:0;font-size:1.15rem">${esc(a.name)}</h2>${isB59() && a.inc ? '<span class="badge">Included with b59</span>' : ''} ${a.m === 'b59' && !isB59() ? '<span class="badge fawn">b59 accessory</span>' : ''}</div></div>
  <p style="margin-top:12px;font-size:.92rem">${esc(a.what)}</p>
  <h3 class="h2" style="margin-top:12px">When to use it</h3><ul style="margin-left:18px;font-size:.88rem">${a.when.map(w => `<li>${esc(w)}</li>`).join('')}</ul>
  ${sc ? `<h3 class="h2" style="margin-top:14px">Fitting diagram</h3>${renderScene(sc[0], { ...sc[1], label: 'Fitting diagram for ' + a.name }).svg}` : ''}
  <h3 class="h2" style="margin-top:14px">How to fit it</h3><ol class="fit">${a.fit.map(f => `<li>${esc(f)}</li>`).join('')}</ol>
  ${a.tip ? `<div class="tip"><strong>Tip:</strong> ${esc(a.tip)}</div>` : ''}
  <div class="links">${g ? `<a class="chip" href="#/guide/${g.id}/${a.guide[1]}">${esc(g.title)}, step ${a.guide[1]} ›</a>` : ''}${pl}<a class="chip" href="#/ask?q=${encodeURIComponent('When should I use the ' + a.name + '?')}">Ask AI</a></div></div>`;
}

/* ---------- Manuals ---------- */
let viewer = null;
async function vManuals(r) {
  await refreshDocs();
  if (r.args[0] === 'view') return vViewer(r);
  const links = MANUAL_LINKS[S.machine] || []; const m = machine();
  const mine = docs.filter(d => d.machine === S.machine); const others = docs.filter(d => d.machine !== S.machine);
  const want = parseInt(r.q.get('page'));
  const full = docs.find(d => d.machine === 'b59' && d.type === 'full');
  if (want && isB59() && full) { location.replace(`#/manuals/view/${full.id}?page=${want}`); return; }
  main.innerHTML = `<h1 class="page">Manuals</h1><p class="lead">Official manuals for ${esc(m.name)}, plus your own PDF copy that works offline.</p>
  ${want && isB59() ? `<div class="tip" style="margin:0 0 12px">You haven't uploaded the b59 manual yet, so here's the official PDF at page ${want}: ${aLink({ href: `${B59_PDF}#page=${want}`, label: 'Open page ' + want + ' ↗', ext: true }, 'chip fawn')}. Upload it below to read it inside the app.</div>` : ''}
  <div class="card"><h2>Official manuals</h2><div class="list">${links.map(l => `<a class="item" href="${esc(l.url)}" target="_blank" rel="noopener"><span class="ico-wrap"><strong class="small" style="color:var(--tealD)">${l.kind}</strong></span><span class="grow"><span class="t">${esc(l.title)}</span><br><span class="d">${esc(l.note)}</span></span><span aria-hidden="true">↗</span></a>`).join('')}</div>
  <p class="small muted" style="margin-top:8px">Links open the maker's own site. Manuals are copyrighted, so the app links to them rather than copying them.</p></div>
  <div class="card"><h2>Your manuals (stored on this device)</h2>
    ${mine.length ? `<div class="list">${mine.map(d => docRow(d)).join('')}</div>` : `<p class="small muted">Nothing uploaded for ${esc(m.name)} yet. Download the PDF from the link above, then add it here to read it inside the app – with page jumping – even without internet.</p>`}
    ${others.length ? `<details style="margin-top:8px"><summary class="small">Other machines (${others.length})</summary><div class="list">${others.map(d => docRow(d)).join('')}</div></details>` : ''}
    <form id="up" style="margin-top:14px"><div class="field"><label for="pdf">Add a PDF manual</label><input id="pdf" type="file" accept="application/pdf,.pdf" required></div>
      <div class="row"><div class="field grow"><label for="um">Machine</label><select id="um">${MACHINES.map(x => `<option value="${x.id}"${x.id === S.machine ? ' selected' : ''}>${esc(x.name)}</option>`).join('')}</select></div>
      <div class="field grow"><label for="ut">Type</label><select id="ut"><option value="full">Full user manual</option><option value="qsg">Quick start guide</option><option value="other">Other</option></select></div></div>
      <button class="btn" type="submit">Save to this device</button><p class="small muted" id="upmsg" role="status" style="margin-top:8px"></p></form></div>
  ${isB59() ? `<div class="card"><h2>Where to look in the b59 manual</h2><p class="small muted">Page numbers for the English 2026-03 edition – other editions may shift by a page or two.</p><table class="pages">${B59_PAGES.map(t => { const l = pageLink(t.page); return `<tr><td>${esc(t.topic)}</td><td>${aLink(l ? { ...l, label: 'p.' + t.page + (l.ext ? ' ↗' : ' →') } : null, 'chip')}</td></tr>`; }).join('')}</table></div>` : ''}`;
  main.onsubmit = async (e) => {
    e.preventDefault(); const msg = $('#upmsg'); const f = $('#pdf').files[0]; msg.textContent = 'Saving…';
    try { await Man.addDoc(f, { machine: $('#um').value, type: $('#ut').value }); toast('Manual saved on this device'); vManuals({ args: [], q: new URLSearchParams() }); } catch (err) { msg.textContent = err.message || 'Could not save that file.'; }
  };
  main.onclick = async (e) => { const b = e.target.closest('[data-del]'); if (b && confirm('Remove this manual from the device?')) { await Man.deleteDoc(b.dataset.del); toast('Removed'); vManuals({ args: [], q: new URLSearchParams() }); } };
}
const docRow = (d) => `<div class="item"><span class="ico-wrap"><strong class="small" style="color:var(--tealD)">PDF</strong></span><a class="grow" href="#/manuals/view/${d.id}" style="text-decoration:none;color:inherit"><span class="t">${esc(d.name)}</span><br><span class="d">${esc(MACHINES.find(m => m.id === d.machine)?.name || '')} · ${({ full: 'Full manual', qsg: 'Quick start', other: 'Other' })[d.type]} · ${(d.size / 1048576).toFixed(1)} MB · last read p.${d.lastPage || 1}</span></a><button class="btn ghost sm" data-del="${d.id}" aria-label="Remove ${esc(d.name)}">Remove</button></div>`;
async function vViewer(r) {
  const d = docs.find(x => x.id === r.args[1]); if (!d) { location.hash = '#/manuals'; return; }
  const topics = d.machine === 'b59' && d.type === 'full' ? B59_PAGES : [];
  main.innerHTML = `<a class="back" href="#/manuals">‹ Manuals</a><h1 class="page" style="font-size:1.1rem">${esc(d.name)}</h1>
  ${topics.length ? `<div class="chips" aria-label="Jump to topic">${topics.map(t => `<button class="chip" data-p="${t.page}">${esc(t.topic.replace(/ \(.*\)/, ''))} · ${t.page}</button>`).join('')}</div>` : ''}
  <div id="vmount"><p class="empty">Loading the viewer…</p></div>`;
  try {
    viewer = await Man.mountViewer($('#vmount'), d, parseInt(r.q.get('page')) || d.lastPage || 1);
    main.onclick = (e) => { const b = e.target.closest('[data-p]'); if (b) { viewer.goto(+b.dataset.p); $('#vmount').scrollIntoView({ block: 'start', behavior: 'smooth' }); } };
  } catch (e) { $('#vmount').innerHTML = `<div class="warn">${esc(e.message)}</div>`; }
  return () => { viewer?.destroy(); viewer = null; };
}

/* ---------- Ask ---------- */
function vAsk(r) { return mountAsk(main, { machine: () => machine(), isB59, initial: r.q.get('q') || '', docs: () => docs }); }

/* ---------- boot ---------- */
buildChrome();
netState(); addEventListener('online', netState); addEventListener('offline', netState);
refreshDocs().then(route);
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
