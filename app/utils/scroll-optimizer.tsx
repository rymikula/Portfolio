'use client';

import { useEffect } from 'react';

/**
 * ScrollOptimizer - Component that improves scroll performance by applying
 * lightweight optimizations during scrolling with better caching
 */
export function ScrollOptimizer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    let isScrolling = false;
    let lastScrollTop = 0;
    const scrollThreshold = 50; // px of scroll before optimization kicks in
    
    // Simple scroll handler for basic optimizations
    function handleScroll() {
      const scrollTop = window.scrollY;
      const scrollDelta = Math.abs(scrollTop - lastScrollTop);
      const fastScroll = scrollDelta > scrollThreshold;
      
      // Clear previous timer
      if (scrollTimer) clearTimeout(scrollTimer);
      
      // If not already in scrolling state and moving fast, apply light optimizations
      if (!isScrolling && fastScroll) {
        document.body.classList.add('scroll-active');
        // Add a class to disable smooth scrolling during fast scrolls
        document.documentElement.classList.add('is-scrolling');
        isScrolling = true;
      }
      
      // Set a timeout to remove the class after scrolling stops
      scrollTimer = setTimeout(() => {
        document.body.classList.remove('scroll-active');
        document.documentElement.classList.remove('is-scrolling');
        isScrolling = false;
        
        // When scrolling stops, ensure visible sections are properly rendered
        maybePreloadVisibleSections();
      }, 200);
      
      lastScrollTop = scrollTop;
    }
    
    // Preload visible sections when scroll stops
    function maybePreloadVisibleSections() {
      if ('IntersectionObserver' in window && 'requestIdleCallback' in window) {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const section = entry.target;
              
              // When a section becomes visible, ensure its resources are loaded
              // during browser idle time
              (window as any).requestIdleCallback(() => {
                // Find all lazy-loaded images in this section
                const lazyImages = section.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => {
                  const imgElement = img as HTMLImageElement;
                  if (imgElement.dataset.src && !imgElement.src) {
                    imgElement.src = imgElement.dataset.src;
                  }
                });
                
                // Find all lazy-loaded background images
                const lazyBgElements = section.querySelectorAll('[data-background]');
                lazyBgElements.forEach(el => {
                  const element = el as HTMLElement;
                  if (element.dataset.background) {
                    element.style.backgroundImage = `url(${element.dataset.background})`;
                    delete element.dataset.background;
                  }
                });
              });
            }
          });
        }, { rootMargin: '100px' });
        
        sections.forEach(section => sectionObserver.observe(section));
      }
    }
    
    // Add event listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check for mobile devices - apply lighter animations by default
    if (window.innerWidth <= 768) {
      document.body.classList.add('reduce-animations');
      
      // But ensure mobile devices still see animations
      const mobileElements = document.querySelectorAll('.stars-bg, .particles-container, .aurora-bg, .floating-blob');
      mobileElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.classList.add('essential-animations');
        }
      });
    }
    
    // Clean up event listener on component unmount
    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return null; // This component doesn't render anything
} 