const CACHE_NAME = 'mca-gateway-v1';
const urlsToCache = [
  '/',
  '/about',
  '/contact',
  '/notice',
  '/levels',
  '/study',
  '/notes',
  '/test',
  '/leaderboard',
  '/dashboard',
  '/lecture',
  '/favicon.ico',
  '/manifest.json',
  '/logo.png',

];

// Install the service worker and cache necessary assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // activate immediately
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // take control of clients
});

// Respond to fetch requests
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match('/')
        )
      );
    })
  );
});
