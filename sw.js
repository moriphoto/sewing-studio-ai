// Offline support: pre-cache the app shell, stale-while-revalidate for same-origin files.
// /api/* is never cached (Ask Bobbin and photo search need the network).
const VERSION = 'ssai-v10';
const SHELL = ['./', 'assets/sewing-studio-logo.webp', 'index.html', 'css/app.css', 'js/app.js', 'js/ask.js', 'js/config.js', 'js/mascot.js', 'js/identify.js', 'js/identify-match.js', 'js/threadviewer.js', 'js/threading/b59.js', 'js/content.js', 'js/guides.js', 'js/search.js', 'js/svg.js', 'js/registry.js', 'js/templates.js', 'js/machines/_gear.js', 'js/machines/bernette-05-academy.js', 'js/machines/bernette-05-crafter.js', 'js/machines/bernette-08.js', 'js/machines/bernette-b33.js', 'js/machines/bernette-b35.js', 'js/machines/bernette-b37.js', 'js/machines/bernette-b38.js', 'js/machines/bernette-b64-airlock.js', 'js/machines/bernette-b68-airlock.js', 'js/machines/bernette-b70-deco.js', 'js/machines/bernette-b77.js', 'js/machines/bernette-b79.js', 'js/machines/bernette-funlock-b42.js', 'js/machines/bernette-funlock-b44.js', 'js/machines/bernette-funlock-b48.js', 'js/machines/brother-celeste-cx1.js', 'js/machines/brother-expedition-innov-is-bx1.js', 'js/machines/brother-hf37.js', 'js/machines/brother-innov-is-15.js', 'js/machines/brother-innov-is-a150.js', 'js/machines/brother-innov-is-a16.js', 'js/machines/brother-innov-is-a50.js', 'js/machines/brother-innov-is-a65.js', 'js/machines/brother-innov-is-f420.js', 'js/machines/brother-innov-is-f560.js', 'js/machines/brother-innov-is-f580.js', 'js/machines/brother-innov-is-m380.js', 'js/machines/brother-innov-is-nv2700.js', 'js/machines/brother-innov-is-vq2.js', 'js/machines/brother-inventio-nv1350.js', 'js/machines/brother-inventio-nv1850q.js', 'js/machines/brother-l14s.js', 'js/machines/brother-lx17.js', 'js/machines/brother-lx25.js', 'js/machines/brother-sh40.js', 'js/machines/brother-vq2.js', 'js/machines/catalog.js', 'js/machines/index.js', 'js/machines/janome-5060-qdc.js', 'js/machines/janome-mylock-454d.js', 'js/machines/janome-sewist-725s.js', 'js/machines/verified-pages.js', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-maskable.svg', 'icons/favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/favicon-32.png', 'icons/favicon-16.png', 'icons/favicon.ico', 'icons/apple-touch-icon.png', 'favicon.ico'];

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
  }
});
