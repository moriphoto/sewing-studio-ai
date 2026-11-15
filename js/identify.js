// Camera / photo identify flow for the welcome page. The photo is shrunk on the phone (max 1024px, JPEG), sent once to
// /api/identify, and the top matches come back for the user to confirm before anything opens.
import { shrinkImage } from './ask.js';
import { mountThinking, PHOTO_LINES } from './mascot.js';

const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sure = (c) => c >= 0.7 ? ['Likely', ''] : c >= 0.4 ? ['Possible', 'fawn'] : ['Long shot', 'grey'];

// Pure view: HTML for a results payload (exported so the tests / screenshots can render it without a network).
export function resultsHtml(preview, j) {
  const thumb = preview ? `<img class="id-thumb" src="${esc(preview)}" alt="Your photo">` : '';
  const ms = j.matches || [];
  const head = `<div class="id-head">${thumb}<div><strong>${ms.length ? 'Bobbin thinks this is…' : 'Bobbin isn\'t sure about this one'}</strong>${j.seen ? `<p class="small muted">Bobbin can see: ${esc(j.seen)}</p>` : ''}</div></div>`;
  if (!ms.length) return `${head}<p class="small">${j.guesses && j.guesses.length ? `Bobbin's best guess is <strong>${esc(j.guesses[0])}</strong>, but that is not in the app yet.` : 'Bobbin could not tell what that is from the photo.'} Try again with the whole machine in view, or a close-up of the model name (usually on the front or the back).</p>${again()}`;
  return `${head}<div class="list id-list">${ms.map((m, i) => { const [lab, cls] = sure(m.confidence); return `<div class="item id-item"><span class="grow"><span class="t">${esc(m.name)}</span><br><span class="d"><span class="badge ${cls}">${lab}</span> ${m.kind === 'accessory' ? 'Accessory' : m.hasBreakdown ? '<span class="badge">Breakdown ready</span>' : m.generic ? 'Generic brand layout' : '<span class="badge grey">Not built yet</span>'}</span></span><span class="mact"><button class="btn sm" data-open="${i}">Open</button>${m.shopUrl && !m.hasBreakdown ? `<a class="chip" href="${esc(m.shopUrl)}" target="_blank" rel="noopener">Shop ↗</a>` : ''}</span></div>`; }).join('')}</div>
  <p class="small muted" style="margin-top:8px">Bobbin can make mistakes, so check it is the right one. Many models look alike.</p>${again()}`;
}
const again = () => `<div class="links"><a class="chip" href="#/browse">Browse machines</a><a class="chip" href="#/ask">Ask Bobbin</a></div>`;
const note = (title, body) => `<div class="id-msg"><strong>${esc(title)}</strong><p class="small">${body}</p>${again()}</div>`;

export function mountIdentify(root, { inputs = [], openMachine, toast } = {}) {
  let last = [], busy = false, stop = () => {};
  const els = inputs.map(s => document.querySelector(s)).filter(Boolean);
  async function handle(file) {
    if (!file || busy) return;
    busy = true; stop(); stop = mountThinking(root, PHOTO_LINES);
    let img;
    try { img = await shrinkImage(file, 1024, 0.8); } catch { stop(); busy = false; root.innerHTML = note('Could not read that photo', 'Try taking it again, or choose a different one (JPEG or PNG works best).'); return; }
    if (!navigator.onLine) { stop(); busy = false; root.innerHTML = `<div class="id-head"><img class="id-thumb" src="${esc(img.preview)}" alt="Your photo"><div><strong>You're offline</strong></div></div>` + note('Photo search needs the internet', 'Browse the machines instead, or try again when you are back online.'); return; }
    try {
      const res = await fetch('/api/identify', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ image: { mime: img.mime, data: img.data } }) });
      let j = null; try { j = await res.json(); } catch { /* function missing: not JSON */ }
      if (res.status === 404 || !j) root.innerHTML = note('Photo search is not set up on this site', 'Photo search is not available here yet. You can still browse the machines or ask Bobbin a question.');
      else if (j.configured === false) root.innerHTML = note('Photo search is switched off', `${esc(j.note || 'Bobbin is resting for now.')} You can still browse the machines.`);
      else if (!res.ok || j.error) root.innerHTML = note(res.status === 429 ? 'Too many photos just now' : 'Something went wrong', esc(j.error || 'Please try again in a moment.'));
      else { last = j.matches || []; root.innerHTML = resultsHtml(img.preview, j); }
    } catch { root.innerHTML = note('Could not reach Bobbin', 'Check your connection and try again.'); }
    stop(); busy = false; root.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  const onChange = (e) => { const f = e.target.files && e.target.files[0]; e.target.value = ''; handle(f); };
  els.forEach(el => el.addEventListener('change', onChange));
  root.onclick = (e) => { const b = e.target.closest('[data-open]'); if (b && last[+b.dataset.open]) openMachine(last[+b.dataset.open]); };
  return () => { stop(); els.forEach(el => el.removeEventListener('change', onChange)); root.onclick = null; };
}
