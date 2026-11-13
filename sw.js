// Offline support: pre-cache the app shell, cache-first for same-origin files, runtime-cache the pdf.js CDN files.
// /api/* is never cached (AI needs the network).
const VERSION = 'ssai-v1';
const SHELL = ['./', 'index.html', 'css/app.css', 'js/app.js', 'js/ask.js', 'js/content.js', 'js/guides.js', 'js/manuals.js', 'js/search.js', 'js/svg.js', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-maskable.svg'];
const CDN = ['https://cdnjs.cloudflare.com/'];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/.netlify/')) return;
    e.respondWith((async () => {
      const cache = await caches.open(VERSION); const hit = await cache.match(req, { ignoreSearch: true });
      const net = fetch(req).then(r => { if (r.ok) cache.put(req, r.clone()); return r; }).catch(() => null);
      if (hit) { e.waitUntil(net); return hit; }   // stale-while-revalidate
      return (await net) || (req.mode === 'navigate' ? cache.match('index.html') : Response.error());
    })());
  } else if (CDN.some(p => req.url.startsWith(p))) {
    e.respondWith((async () => {
      const cache = await caches.open(VERSION); const hit = await cache.match(req);
      if (hit) return hit;
      const r = await fetch(req); if (r.ok || r.type === 'opaque') cache.put(req, r.clone()); return r;
    })());
  }
});
