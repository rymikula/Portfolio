// Self-destructing service worker.
// The previous version cached JS/CSS with stale-while-revalidate, which served
// outdated chunks. This version unregisters itself, purges all caches, and
// reloads open clients so everyone returns to a clean, network-only state.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((k) => caches.delete(k)))
      await self.registration.unregister()
      const clients = await self.clients.matchAll({ type: 'window' })
      clients.forEach((client) => client.navigate(client.url))
    })()
  )
})
