// Ask AI tab: local keyword search always runs first (works offline); the AI call is on demand only.
import { search, resolveRef } from './search.js';

const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const SUGGEST = ['Why does my thread keep breaking?', 'Which needle for stretchy jersey?', 'How do I hoop fabric for embroidery?', 'The bobbin thread is looping underneath'];

// Shrinks a camera photo so the upload stays small: max 1024px, JPEG.
export async function shrinkImage(file, max = 1024, q = 0.82) {
  const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' }).catch(() => null);
  let w, h, draw;
  if (bmp) { w = bmp.width; h = bmp.height; draw = (c) => c.drawImage(bmp, 0, 0, c.canvas.width, c.canvas.height); }
  else { const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = URL.createObjectURL(file); }); w = img.naturalWidth; h = img.naturalHeight; draw = (c) => c.drawImage(img, 0, 0, c.canvas.width, c.canvas.height); }
  const k = Math.min(1, max / Math.max(w, h)); const cv = document.createElement('canvas'); cv.width = Math.round(w * k); cv.height = Math.round(h * k);
  draw(cv.getContext('2d'));
  const url = cv.toDataURL('image/jpeg', q);
  return { mime: 'image/jpeg', data: url.split(',')[1], preview: url };
}

// Tiny, safe formatter: escapes everything, then supports **bold**, "- " bullets and "1." lists, and turns [[id]] into links.
export function formatAnswer(text, refs = []) {
  const lines = esc(text).split(/\n/); let out = '', list = null;
  const close = () => { if (list) { out += `</${list}>`; list = null; } };
  const inline = (t) => t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\[\[([a-z]:[^\]\s]+)\]\]/g, (m, id) => { const r = resolveRef(id.replace(/&amp;/g, '&')); return r ? `<a href="${esc(r.link)}">${esc(r.label)}</a>` : ''; });
  for (const l of lines) {
    let m;
    if ((m = l.match(/^\s*[-•*]\s+(.*)/))) { if (list !== 'ul') { close(); out += '<ul>'; list = 'ul'; } out += `<li>${inline(m[1])}</li>`; }
    else if ((m = l.match(/^\s*\d+[.)]\s+(.*)/))) { if (list !== 'ol') { close(); out += '<ol>'; list = 'ol'; } out += `<li>${inline(m[1])}</li>`; }
    else if (!l.trim()) close();
    else { close(); out += `<p>${inline(l)}</p>`; }
  }
  close();
  return out;
}

export function mountAsk(root, ctx) {
  const history = []; let image = null; let busy = false; let preview = '';
  const m = () => ctx.machine();
  root.innerHTML = `<h1 class="page">Ask AI</h1><p class="lead">Ask about <strong id="am">${esc(m().name)}</strong> – your question and any photo go to the AI only when you press Ask. Answers link to the right guide step or diagram.</p>
  <div class="chat" id="chat" aria-live="polite"></div>
  <div class="chips" id="sug">${SUGGEST.map(s => `<button class="chip" data-s="${esc(s)}">${esc(s)}</button>`).join('')}</div>
  <div class="askbox"><div id="thumb"></div><label class="sr" for="q">Your question</label><textarea id="q" placeholder="e.g. How do I attach the embroidery module?" maxlength="1000"></textarea>
  <div class="askrow"><label class="btn sec sm" for="cam" style="cursor:pointer">📷 Photo</label><input id="cam" type="file" accept="image/*" capture="environment" class="sr"><span class="grow small muted" id="hint">Optional: photograph the thread path, bobbin or stitches.</span><button class="btn" id="send">Ask</button></div></div>
  <p class="small muted" style="margin-top:8px">AI can make mistakes – check anything important against the official manual. Photos are shrunk on your phone and not stored by the app.</p>`;
  const chat = root.querySelector('#chat'), q = root.querySelector('#q'), send = root.querySelector('#send'), thumb = root.querySelector('#thumb');
  const add = (cls, html) => { const d = document.createElement('div'); d.className = 'msg ' + cls; d.innerHTML = html; chat.appendChild(d); d.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); return d; };
  const localCards = (hits) => hits.length ? `<div class="refs">${hits.slice(0, 5).map(h => `<a href="${esc(h.link)}">${esc(h.label)}</a>`).join('')}</div>` : '';

  async function ask(text) {
    if (busy) return; text = (text ?? q.value).trim(); if (!text && !image) { q.focus(); return; }
    busy = true; send.disabled = true;
    const hits = search(text || 'photo', m().id);
    add('u', `${preview ? `<img src="${preview}" alt="Your photo">` : ''}${esc(text || '(photo)')}`);
    q.value = ''; const img = image; image = null; preview = ''; thumb.innerHTML = '';
    const wait = add('a', '<span class="dots"><span></span><span></span><span></span></span>');
    const local = () => hits.length ? `<p><strong>From the guides, diagrams and gear in this app:</strong></p>${localCards(hits)}<p class="small muted" style="margin-top:8px">${hits.slice(0, 3).map(h => `<strong>${esc(h.label)}</strong> – ${esc(h.body.slice(0, 150))}…`).join('<br>')}</p>` : '<p>I could not find a match in the app\'s guides. Try different words, or check the official manual in the Manuals tab.</p>';
    if (!navigator.onLine) { wait.innerHTML = `<p><strong>You're offline</strong>, so AI help is paused. Here is what the app's own content says:</p>${local()}`; busy = false; send.disabled = false; return; }
    try {
      const res = await fetch('/api/ask', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ question: text, machine: m().id, image: img ? { mime: img.mime, data: img.data } : undefined, history: history.slice(-4) }) });
      let j = null; try { j = await res.json(); } catch { /* not json: function missing */ }
      if (res.status === 404 || !j) { wait.className = 'msg sys'; wait.innerHTML = `<strong>AI is not set up on this site.</strong> The AI function is not available here, so this is a plain search of the app's own content:${local()}`; }
      else if (j.configured === false) { wait.className = 'msg sys'; wait.innerHTML = `<strong>AI not configured.</strong> ${esc(j.note || '')} Ask the site owner to enable Netlify AI Gateway. Meanwhile, here is what the app's own content says:${local()}`; }
      else if (!res.ok || j.error) { wait.className = 'msg sys'; wait.innerHTML = `<strong>${esc(j.error || 'Something went wrong.')}</strong>${local()}`; }
      else {
        wait.innerHTML = formatAnswer(j.answer, j.refs) + (j.refs?.length ? '' : localCards(hits.slice(0, 3))) + (img ? '' : '');
        history.push({ role: 'user', text }, { role: 'assistant', text: j.answer.replace(/\[\[[^\]]+\]\]/g, '') });
      }
    } catch (e) { wait.className = 'msg sys'; wait.innerHTML = `<strong>Couldn't reach the AI.</strong> Check your connection. Here is what the app's own content says:${local()}`; }
    busy = false; send.disabled = false; wait.scrollIntoView({ block: 'nearest' });
  }
  send.addEventListener('click', () => ask());
  q.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) ask(); });
  root.querySelector('#sug').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (b) ask(b.dataset.s); });
  root.querySelector('#cam').addEventListener('change', async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try { image = await shrinkImage(f); preview = image.preview; thumb.innerHTML = `<div class="thumb"><img src="${preview}" alt="Photo to send"><button class="btn ghost sm" id="rm">Remove</button></div>`; thumb.querySelector('#rm').onclick = () => { image = null; preview = ''; thumb.innerHTML = ''; }; }
    catch { thumb.innerHTML = '<p class="small warn">Could not read that photo.</p>'; }
    e.target.value = '';
  });
  if (ctx.initial) { q.value = ctx.initial; q.focus(); }
  return () => { /* nothing to clean */ };
}
