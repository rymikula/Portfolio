'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * OptimizedParticles - Renders particles with performance optimizations
 * This component ensures particles are consistently rendered without teleporting or disappearing
 */
export function OptimizedParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Generate stable particle positions to prevent teleporting
  const generateParticles = (count: number) => {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      // Create consistent properties for each particle
      const size = 3 + (i % 7);
      const top = Math.floor((i * 13) % 100);
      const left = Math.floor((i * 17) % 100);
      const opacity = 0.7 + (i % 4) * 0.05;
      const delay = i * 0.2;
      const drift = -5 + (i % 10);
      
      particles.push({
        id: `particle-${i}`,
        size,
        top,
        left,
        opacity,
        delay,
        drift
      });
    }
    
    return particles;
  };
  
  // Determine appropriate particle count based on device capability
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Wait for a moment to ensure the component is mounted
    const timer = setTimeout(() => {
      const isMobile = window.innerWidth <= 768;
      const particles = generateParticles(isMobile ? 15 : 30);
      setParticleCount(particles.length);
      setIsReady(true);
      
      // Add a small delay to ensure CSS transitions have time to initialize
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Generate stable particles
  const particles = generateParticles(particleCount);
  
  return (
    <div 
      ref={containerRef}
      className={`particles-container ${isLoaded ? 'particles-loaded' : 'particles-initializing'}`}
      aria-hidden="true"
    >
      {isReady && particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          data-drift={particle.drift.toString()}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.top}vh`,
            left: `${particle.left}vw`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            // Use data attribute instead of CSS custom property
            visibility: isLoaded ? 'visible' : 'hidden'
          }}
        />
      ))}
    </div>
  );
} 