// BrickRewind service worker
// Verhoog CACHE_VERSION elke keer dat je index.html aanpast en opnieuw upload,
// anders blijft de tablet de oude versie uit de cache tonen.
const CACHE_VERSION = 'brickrewind-v0.18-29';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Strategie:
// - App-shell bestanden (dit domein): cache-first, zodat de app altijd meteen opent.
// - Externe bestanden (pdf.js vanaf cdnjs, Google Fonts): stale-while-revalidate,
//   zodat ze na de eerste keer online laden ook offline werken.
// - Rebrickable API-verzoeken (setnummer opzoeken): altijd gewoon naar het netwerk,
//   want dat moet actuele data zijn en werkt sowieso alleen online.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== 'GET') return;
  if (url.hostname.includes('rebrickable.com')) return; // niet cachen, altijd live
  if (url.hostname === '192.168.178.189') return; // NAS-proxy: altijd live, geen SW-tussenlaag

  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
  } else {
    event.respondWith(
      caches.open(CACHE_VERSION).then(async (cache) => {
        const cached = await cache.match(req);
        const networkFetch = fetch(req)
          .then((res) => {
            if (res && res.status === 200) cache.put(req, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
  }
});
