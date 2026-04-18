// Service Worker - Offline & Cache
const CACHE_ADI = 'kpss-arkadasim-v1';
const DOSYALAR = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// Kurulum
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_ADI).then((cache) => {
      return cache.addAll(DOSYALAR).catch(() => {
        // Tek tek dene, hata olursa geç
        return Promise.all(
          DOSYALAR.map(f => cache.add(f).catch(() => {}))
        );
      });
    })
  );
  self.skipWaiting();
});

// Aktivasyon - eski cache'leri temizle
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_ADI).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch - cache-first strateji
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((response) => {
        // Başarılı response'u cache'le
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_ADI).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
