// Upload-your-own manual: PDFs live in IndexedDB on this device only; pdf.js comes from a CDN on first use.
const DB = 'ssai-manuals', STORE = 'docs';
const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
export const MAX_BYTES = 120 * 1024 * 1024;

const open = () => new Promise((res, rej) => {
  const r = indexedDB.open(DB, 1);
  r.onupgradeneeded = () => r.result.createObjectStore(STORE, { keyPath: 'id' });
  r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
});
const tx = async (mode, fn) => { const db = await open(); return new Promise((res, rej) => { const t = db.transaction(STORE, mode); const out = fn(t.objectStore(STORE)); t.oncomplete = () => { db.close(); res(out && out.result !== undefined ? out.result : out); }; t.onerror = () => rej(t.error); t.onabort = () => rej(t.error); }); };

export const listDocs = async () => (await tx('readonly', s => s.getAll()) || []).map(({ blob, ...m }) => m).sort((a, b) => b.added - a.added);
export const getDoc = (id) => tx('readonly', s => s.get(id));
export const deleteDoc = (id) => tx('readwrite', s => s.delete(id));
export async function setLastPage(id, page) { const d = await getDoc(id); if (d) { d.lastPage = page; await tx('readwrite', s => s.put(d)); } }

export async function addDoc(file, { machine, type }) {
  if (!file) throw new Error('Choose a PDF first.');
  if (file.size > MAX_BYTES) throw new Error('That PDF is over 120 MB, which is too big to store on the device.');
  const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  if (String.fromCharCode(...head) !== '%PDF-') throw new Error('That file does not look like a PDF.');
  const doc = { id: 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name: file.name.replace(/\.pdf$/i, ''), machine, type, size: file.size, added: Date.now(), lastPage: 1, blob: new Blob([file], { type: 'application/pdf' }) };
  await tx('readwrite', s => s.put(doc));
  try { navigator.storage?.persist?.(); } catch { /* optional */ }
  const { blob, ...meta } = doc; return meta;
}

let libPromise = null, workerUrl = null;
export function loadPdfJs() {
  if (libPromise) return libPromise;
  libPromise = new Promise((res, rej) => {
    if (window.pdfjsLib) return res(window.pdfjsLib);
    const s = document.createElement('script'); s.src = PDFJS; s.crossOrigin = 'anonymous';
    s.onload = async () => {
      try {
        const lib = window.pdfjsLib;
        // fetch the worker ourselves so the service worker can cache it and it runs offline
        const code = await (await fetch(WORKER, { mode: 'cors' })).text();
        workerUrl = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
        lib.GlobalWorkerOptions.workerSrc = workerUrl;
        res(lib);
      } catch (e) { libPromise = null; rej(new Error('Could not load the PDF viewer. It needs an internet connection the first time.')); }
    };
    s.onerror = () => { libPromise = null; rej(new Error('Could not load the PDF viewer. It needs an internet connection the first time.')); };
    document.head.appendChild(s);
  });
  return libPromise;
}

// Builds a viewer into `el`. Returns { goto(page), destroy() }.
export async function mountViewer(el, docMeta, startPage = 1, hooks = {}) {
  const rec = await getDoc(docMeta.id); if (!rec) throw new Error('That manual is no longer stored on this device.');
  const lib = await loadPdfJs();
  const pdf = await lib.getDocument({ data: await rec.blob.arrayBuffer() }).promise;
  let page = Math.min(Math.max(1, +startPage || rec.lastPage || 1), pdf.numPages), zoom = 1, task = null, dead = false;
  el.innerHTML = `<div class="vbar" role="toolbar" aria-label="PDF controls">
    <button class="btn sec sm" data-a="prev" aria-label="Previous page">‹ Prev</button>
    <label class="sr" for="pg">Page</label><input id="pg" type="number" min="1" max="${pdf.numPages}" value="${page}" inputmode="numeric"> <span class="muted small">of ${pdf.numPages}</span>
    <button class="btn sec sm" data-a="next" aria-label="Next page">Next ›</button>
    <button class="btn ghost sm" data-a="out" aria-label="Zoom out">−</button><button class="btn ghost sm" data-a="in" aria-label="Zoom in">+</button></div>
    <div class="viewer" id="vwrap"><canvas id="cv" aria-label="Manual page"></canvas></div>`;
  const cv = el.querySelector('#cv'), wrap = el.querySelector('#vwrap'), inp = el.querySelector('#pg');
  async function render() {
    if (dead) return; if (task) { try { task.cancel(); } catch { /* ignore */ } }
    const p = await pdf.getPage(page); const v1 = p.getViewport({ scale: 1 });
    const fit = Math.max(200, wrap.clientWidth - 18) / v1.width, dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const vp = p.getViewport({ scale: fit * zoom * dpr });
    cv.width = Math.floor(vp.width); cv.height = Math.floor(vp.height); cv.style.width = Math.floor(vp.width / dpr) + 'px'; cv.style.height = Math.floor(vp.height / dpr) + 'px';
    task = p.render({ canvasContext: cv.getContext('2d'), viewport: vp });
    try { await task.promise; } catch (e) { if (e?.name !== 'RenderingCancelledException') throw e; }
    inp.value = page; setLastPage(rec.id, page); hooks.onPage?.(page);
  }
  const go = (n) => { n = Math.min(Math.max(1, Math.round(+n) || 1), pdf.numPages); page = n; wrap.scrollTop = 0; return render(); };
  el.addEventListener('click', (e) => { const a = e.target.closest('[data-a]')?.dataset.a; if (!a) return; if (a === 'prev') go(page - 1); if (a === 'next') go(page + 1); if (a === 'in') { zoom = Math.min(4, zoom + .25); render(); } if (a === 'out') { zoom = Math.max(.5, zoom - .25); render(); } });
  inp.addEventListener('change', () => go(inp.value));
  el.addEventListener('keydown', (e) => { if (e.target === inp) return; if (e.key === 'ArrowRight') go(page + 1); if (e.key === 'ArrowLeft') go(page - 1); });
  await render();
  return { goto: go, pages: pdf.numPages, destroy() { dead = true; try { task?.cancel(); pdf.destroy(); } catch { /* ignore */ } } };
}
