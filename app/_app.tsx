import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Head from 'next/head';
import '../globals.css';

// Define a polyfill for requestIdleCallback
const requestIdleCallbackPolyfill = (
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): number => {
  const startTime = Date.now();
  return window.setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - startTime)),
    });
  }, options?.timeout || 1);
};

const cancelIdleCallbackPolyfill = (id: number) => {
  clearTimeout(id);
};

function MyApp({ Component, pageProps }: AppProps) {
  // Setup performance optimizations on client side
  useEffect(() => {
    // Polyfill requestIdleCallback
    if (!('requestIdleCallback' in window)) {
      (window as any).requestIdleCallback = requestIdleCallbackPolyfill;
      (window as any).cancelIdleCallback = cancelIdleCallbackPolyfill;
    }

    // Initialize service worker
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('ServiceWorker registered: ', registration);
          })
          .catch((error) => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }

    // Set viewport height for mobile browsers
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);

    // Implement preloading for offscreen images
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove('lazy');
              lazyImageObserver.unobserve(lazyImage);
            }
          }
        });
      });

      document.querySelectorAll('img.lazy').forEach((img) => {
        lazyImageObserver.observe(img);
      });
    }

    // Prefetch visible links
    const prefetchVisibleLinks = () => {
      const links = document.querySelectorAll('a');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.includes('#')) {
              const prefetchLink = document.createElement('link');
              prefetchLink.rel = 'prefetch';
              prefetchLink.href = href;
              document.head.appendChild(prefetchLink);
              observer.unobserve(link);
            }
          }
        });
      });

      links.forEach((link) => {
        observer.observe(link);
      });
    };

    // Use requestIdleCallback to prefetch links when browser is idle
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(prefetchVisibleLinks);
    } else {
      setTimeout(prefetchVisibleLinks, 2000);
    }

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#18191b" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 