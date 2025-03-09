// Polyfill for requestIdleCallback
const requestIdleCallback = 
  typeof window !== 'undefined'
    ? window.requestIdleCallback ||
      function(cb: IdleRequestCallback): number {
        const start = Date.now();
        return window.setTimeout(() => {
          cb({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
          });
        }, 1);
      }
    : null;

// Initialize lazy loading for images
export function initializeLazyLoading() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const lazyImages = document.querySelectorAll('img.lazy');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize viewport height calculation
export function initializeViewportHeight() {
  if (typeof window === 'undefined') return;

  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setVh();
  window.addEventListener('resize', setVh);
  return () => window.removeEventListener('resize', setVh);
}

// Initialize resource preloading
export function initializeResourcePreloading() {
  if (typeof window === 'undefined' || !requestIdleCallback) return;

  requestIdleCallback(() => {
    const preloadLinks = [
      '/components/Hero',
      '/components/About',
      '/components/Skills',
      '/components/Projects',
      '/components/Experience'
    ];

    preloadLinks.forEach(path => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = path;
      document.head.appendChild(link);
    });
  });
}

// Initialize service worker
export function initializeServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
        
        if ('periodicSync' in registration) {
          const syncOptions = {
            tag: 'sync-data',
            minInterval: 24 * 60 * 60 * 1000
          };
          registration.periodicSync.register(syncOptions)
            .catch(console.error);
        }
      })
      .catch(console.error);
  });
}

// Initialize all optimizations
export function initializeOptimizations() {
  initializeViewportHeight();
  initializeLazyLoading();
  initializeResourcePreloading();
  initializeServiceWorker();
} 