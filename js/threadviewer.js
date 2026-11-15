// Reusable step-by-step thread viewer. Give it a config like js/threading/b59.js and it draws a line outline with
// the thread overlaid in numbered steps: the current step's thread segment is drawn in colour and animated,
// earlier steps stay dimmed, and a zoomed close-up can be shown for the fiddly spots.
// No machine-specific code lives here – to add another machine, write another config file.
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const segs = (seg) => (seg ? (Array.isArray(seg) ? seg : [seg]) : []).map(x => typeof x === 'string' ? { d: x } : x);
const vbw = (vb) => +vb.split(/\s+/)[2];

const DEFS = `<defs>
<marker id="tvAhT" viewBox="0 0 8 8" refX="5" refY="4" markerWidth="4.2" markerHeight="4.2" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#d62a6b"/></marker>
<marker id="tvAhA" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#b8690f"/></marker>
</defs>`;

// One drawing: the base artwork, thread segments from earlier steps (dim) and the current one (bright), and markers.
function drawing({ cfg, seq, idx, scene, vb, zoom, ring, ov }) {
  const sc = cfg.scenes[scene]; const st = { ...seq.steps[idx], ...(ov || {}) }; // a close-up tab may override seg / extra / at
  const k = vbw(vb) / 400;
  const past = seq.steps.slice(0, idx).filter(s => (s.scene || seq.scene) === scene).flatMap(s => segs(s.seg));
  const now = segs(st.seg);
  const art = sc.art + (seq.art && scene === seq.scene ? seq.art : '');
  const [ax, ay, ar = 12] = st.at || [];
  const solids = now.filter(x => !x.back); const lastSolid = solids[solids.length - 1];
  return `<svg class="tv-svg ${zoom ? 'tv-zoom' : 'tv-main'}" viewBox="${vb}" role="img" aria-label="${esc(sc.label)}${zoom ? ', close-up' : ''}" style="--ow:${(1.7 * k).toFixed(3)};--tw:${(3.5 * k).toFixed(3)};--fs:${(vbw(vb) * 0.027).toFixed(2)}">${DEFS}
  <g class="tv-art">${art}</g>
  <g class="tv-past">${past.map(p => `<path class="tv-th${p.back ? ' back' : ''}" d="${p.d}"/>`).join('')}</g>
  ${st.extra && (st.scene || seq.scene) === scene ? `<g class="tv-extra">${st.extra}</g>` : ''}
  <g class="tv-now">${now.map(p => `<path class="tv-th${p.back ? ' back' : ' draw'}" d="${p.d}" pathLength="1"${p === lastSolid ? ' marker-end="url(#tvAhT)"' : ''}/>`).join('')}</g>
  ${st.at && (st.scene || seq.scene) === scene ? `<g class="tv-at" transform="translate(${ax} ${ay})"><circle class="halo" r="${ar}"/><circle class="dot" r="${(2.6 * k + 0.8).toFixed(2)}"/></g>` : ''}
  ${ring && !zoom ? `<circle class="tv-ring" cx="${ring[0]}" cy="${ring[1]}" r="${ring[2]}"/>` : ''}
</svg>`;
}

export function mountThreadViewer(root, cfg, o = {}) {
  let si = Math.max(0, cfg.sequences.findIndex(s => s.id === o.seq)); let idx = 0; let inset = 0;
  const seqs = cfg.sequences;
  idx = Math.min(Math.max(0, (parseInt(o.step) || 1) - 1), seqs[si].steps.length - 1);
  const emit = () => o.onChange && o.onChange(seqs[si].id, idx + 1);

  function draw(focus) {
    const seq = seqs[si]; const st = seq.steps[idx]; const n = seq.steps.length;
    const scene = st.scene || seq.scene;
    // an inset is a crop id, or { crop, label, seg?, extra?, at? } to show a different state of the same crop (e.g. approach / secured)
    const insets = (st.insets || []).map(x => typeof x === 'string' ? { id: x, ...cfg.crops[x] } : { id: x.crop, ...cfg.crops[x.crop], ...x }).filter(c => c.vb);
    inset = Math.min(inset, Math.max(0, insets.length - 1));
    const cur = insets[inset];
    const pl = st.page && o.pageLink ? o.pageLink(st.page) : null;
    const nextSeq = idx === n - 1 ? seqs[si + 1] : null;
    root.innerHTML = `<div class="tv" data-tv>
      <div class="chips tv-seq" role="tablist" aria-label="Threading diagrams">${seqs.map((s, i) => `<button class="chip" role="tab" data-seq="${i}" aria-pressed="${i === si}" aria-selected="${i === si}">${esc(s.title)}</button>`).join('')}</div>
      <p class="small muted tv-blurb">${esc(seq.blurb)}</p>
      <div class="tv-grid">
        <div class="tv-stage">
          <div class="tv-frame">${drawing({ cfg, seq, idx, scene, vb: cfg.scenes[scene].vb, ring: cur && cur.scene === scene ? st.ring : null })}</div>
          ${cur ? `<div class="tv-inset" role="group" aria-label="Close-up">
            <div class="tv-inset-h"><span class="tv-lens" aria-hidden="true"></span><strong>Close-up</strong> · ${esc(cur.caption)}${insets.length > 1 ? `<span class="tv-itabs">${insets.map((c, i) => `<button class="chip sm" data-inset="${i}" aria-pressed="${i === inset}">${esc(c.label || i + 1)}</button>`).join('')}</span>` : ''}</div>
            ${drawing({ cfg, seq, idx, scene: cur.scene, vb: cur.vb, zoom: true, ov: { seg: cur.seg ?? st.seg, extra: cur.extra ?? st.extra, at: cur.at ?? st.at } })}</div>` : ''}
          <p class="small muted tv-note">Simplified line drawing, not to scale. The ${esc(cfg.machineName)} has the same steps but real parts are shaped a little differently.</p>
        </div>
        <div class="tv-side">
          <div class="steps tv-dots" role="group" aria-label="Steps">${seq.steps.map((x, i) => `<button data-step="${i}" class="${i < idx ? 'done' : ''}${i === idx ? ' cur' : ''}" aria-label="Step ${i + 1}: ${esc(x.t)}" aria-current="${i === idx}">${i + 1}</button>`).join('')}</div>
          <div class="card tv-text" tabindex="-1">
            <div class="small muted tv-count">Step ${idx + 1} of ${n}${pl ? '' : ''}</div>
            <h2 class="tv-title">${esc(st.t)}</h2>
            <p class="tv-body">${esc(st.b)}</p>
            ${st.warn ? `<div class="warn"><strong>Careful:</strong> ${esc(st.warn)}</div>` : ''}${st.tip ? `<div class="tip"><strong>Tip:</strong> ${esc(st.tip)}</div>` : ''}
            ${st.unsure ? `<div class="tv-unsure"><strong>Check this one:</strong> ${esc(st.unsure)}</div>` : ''}
            <div class="links">${pl ? `<a class="chip" href="${esc(pl.href)}" target="_blank" rel="noopener">${esc(pl.label)}</a>` : ''}${o.askHref ? `<a class="chip" href="${esc(o.askHref(`Help with ${cfg.machineName} ${seq.title.toLowerCase()}, step ${idx + 1}: ${st.t}`))}">Ask Bobbin about this step</a>` : ''}</div>
            <div class="stepnav"><button class="btn sec" data-a="prev"${idx === 0 ? ' disabled' : ''}>‹ Back</button>${nextSeq ? `<button class="btn" data-a="nextseq">Next: ${esc(nextSeq.title)} ›</button>` : `<button class="btn" data-a="next"${idx === n - 1 ? ' disabled' : ''}>Next ›</button>`}</div>
          </div>
          <div class="stepside tv-list" role="list">${seq.steps.map((x, i) => `<button role="listitem" class="sitem${i === idx ? ' cur' : ''}${i < idx ? ' done' : ''}" data-step="${i}"><span class="n">${i + 1}</span>${esc(x.t)}</button>`).join('')}</div>
        </div>
      </div></div>`;
    if (focus) { const cur = root.querySelector('.tv-dots .cur'); if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest', inline: 'center' }); }
  }
  const go = (i, jump) => { idx = Math.min(Math.max(0, i), seqs[si].steps.length - 1); inset = 0; emit(); draw(true); if (jump) root.querySelector('.tv')?.scrollIntoView({ block: 'start' }); };
  root.onclick = (e) => {
    const sb = e.target.closest('[data-seq]'); if (sb) { si = +sb.dataset.seq; idx = 0; inset = 0; emit(); return draw(); }
    const ib = e.target.closest('[data-inset]'); if (ib) { inset = +ib.dataset.inset; return draw(); }
    const stp = e.target.closest('[data-step]'); if (stp) return go(+stp.dataset.step);
    const a = e.target.closest('[data-a]')?.dataset.a; if (!a) return;
    if (a === 'prev') go(idx - 1); else if (a === 'next') go(idx + 1);
    else if (a === 'nextseq') { si += 1; idx = 0; inset = 0; emit(); draw(); root.querySelector('.tv')?.scrollIntoView({ block: 'start' }); }
  };
  // document-level so the arrow keys keep working after a redraw replaces the focused button
  const key = (e) => { if (!root.isConnected || e.target.matches?.('input,textarea,select')) return; if (e.key === 'ArrowRight') go(idx + 1); if (e.key === 'ArrowLeft') go(idx - 1); };
  document.addEventListener('keydown', key);
  draw();
  return () => { root.onclick = null; document.removeEventListener('keydown', key); };
}
