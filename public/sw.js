// Service Worker for Portfolio Website
const CACHE_NAME = 'portfolio-cache-v1';
const RUNTIME_CACHE = 'runtime-cache';

// Resources to cache immediately during installation
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/app/globals.css',
  '/favicon.ico',
  // Add other static assets here
];

// Install event - precaching resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Pre-caching resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Stale-while-revalidate strategy for most resources
self.addEventListener('fetch', event => {
  // Don't cache analytics or other third-party requests
  if (event.request.url.startsWith('https://analytics') || 
      event.request.url.includes('chrome-extension')) {
    return;
  }

  // For navigation requests (HTML pages), use network-first
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  // For images, CSS, JS, use stale-while-revalidate
  if (
    event.request.destination === 'image' || 
    event.request.destination === 'style' ||
    event.request.destination === 'script'
  ) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Update cache with new response
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });

          // Return cached response immediately if available, otherwise wait for network
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // For all other requests, use network-first
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Background sync for offline capabilities
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// Function to handle syncing data when online
async function syncData() {
  // Implement any background sync logic here
  console.log('Syncing data');
  // Placeholder for future implementation
} 