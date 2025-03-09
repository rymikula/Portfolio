'use client'

import { useState, useEffect, useMemo } from 'react'
import { lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { OptimizedParticles } from './components/OptimizedParticles'

// Dynamic components for better performance
const Hero = dynamic(() => import('../components/Hero'), { 
  ssr: true,
  loading: () => <LoadingFallback />
})

// Optimize lazy loading with chunking
const About = lazy(() => import('../components/About'))
const Skills = lazy(() => import('../components/Skills'))
const Projects = lazy(() => import('../components/Projects'))
const Experience = lazy(() => import('../components/Experience'))

// Loading fallback for lazy-loaded components
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen w-full bg-gray-900">
    <div className="text-brown-400 text-xl">Loading...</div>
  </div>
)

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [reduceAnimations, setReduceAnimations] = useState(false)
  const [fps, setFps] = useState(60)
  
  // Memoize counts to prevent unnecessary re-renders
  const { starCount } = useMemo(() => ({
    starCount: isMobile ? (isLowPerformance ? 80 : 150) : 300
  }), [isMobile, isLowPerformance])
  
  // Memoize arrays to prevent regeneration on each render
  const starArray = useMemo(() => [...Array(starCount)], [starCount])
  
  useEffect(() => {
    // Set viewport height
    setViewportHeight(window.innerHeight)
    
    // Detect mobile devices and evaluate performance capabilities
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth <= 768
      setIsMobile(isMobileDevice)
      setViewportHeight(window.innerHeight)
      
      // Estimate if this is a low performance device
      const isLowPerf = isMobileDevice && (
        /Android/.test(navigator.userAgent) || 
        /iPhone|iPad|iPod/.test(navigator.userAgent)
      )
      setIsLowPerformance(isLowPerf)
      
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      // Set reduce animations based on device capability and user preference
      setReduceAnimations(isLowPerf || prefersReducedMotion)
      
      // Remove console log in production
      if (process.env.NODE_ENV !== 'production') {
        console.log("Device:", isMobileDevice ? "Mobile" : "Desktop", "Performance:", isLowPerf ? "Low" : "High")
      }
    }
    
    // Monitor FPS to reduce animations if needed
    let frameCount = 0
    let lastTime = performance.now()
    let rafId: number

    const measureFps = () => {
      const now = performance.now()
      frameCount++
      
      if (now - lastTime >= 1000) {
        const currentFps = Math.round(frameCount * 1000 / (now - lastTime))
        setFps(currentFps)
        
        // If FPS drops below threshold, reduce animations
        if (currentFps < 30 && !reduceAnimations) {
          setReduceAnimations(true)
        }
        
        frameCount = 0
        lastTime = now
      }
      
      rafId = requestAnimationFrame(measureFps)
    }
    
    // Start FPS monitoring
    rafId = requestAnimationFrame(measureFps)
    
    // Throttle scroll handler to improve performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    
    // Initial check
    checkDevice()
    
    // Add event listeners
    window.addEventListener('resize', checkDevice)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [reduceAnimations]) // Add reduceAnimations to dependency array
  
  return (
    <main className={`relative min-h-screen overflow-hidden ${reduceAnimations ? 'reduce-animations' : ''}`}>
      {/* Background elements */}
      <div className="stars-bg animate-optimized">
        {starArray.map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>
      
      {/* Use the OptimizedParticles component for particle effects */}
      <OptimizedParticles />
      
      {/* Rest of the background elements */}
      <div className="aurora-bg animate-optimized essential-animations" />
      <div className="mesh-grid animate-optimized" />
      
      {/* Skip grain overlay on low performance devices */}
      {!isLowPerformance && (
        <div className="grain-overlay animate-optimized" />
      )}

      {/* Render FPS meter in development */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed top-0 right-0 bg-black/50 text-white p-2 z-50 text-xs">
          FPS: {fps} | {reduceAnimations ? 'Low Perf Mode' : 'High Perf Mode'}
        </div>
      )}

      {/* Hero Section - Not lazy loaded for immediate visibility */}
      <section className="relative min-h-screen flex items-center justify-center z-10">
        <div className="floating-blob floating-blob-1 animate-optimized" />
        <div className="floating-blob floating-blob-2 animate-optimized" style={{ opacity: 0.1 }} />
        <Hero />
      </section>

      {/* Lazy loaded sections - use fewer animated elements on mobile */}
      <Suspense fallback={<LoadingFallback />}>
        {/* 1. About Me Section */}
        <section id="about" className="relative py-20 content-section">
          {!isMobile && <div className="floating-blob floating-blob-3 animate-optimized" style={{ opacity: 0.12 }} />}
          <div className="section-bg-gradient animate-optimized" />
          {!isLowPerformance && <div className="mesh-grid animate-optimized" style={{ opacity: 0.03 }} />}
          <About />
        </section>

        {/* 2 & 3. Education & Work Experience Section */}
        <section id="education-experience" className="relative py-20 content-section bg-black/10">
          {!isLowPerformance && (
            <div className="floating-blob animate-optimized"
              style={{
                width: '25vw',
                height: '25vw',
                top: '20%',
                left: '15%',
                opacity: 0.08
              }}
            />
          )}
          <div className="section-bg-gradient animate-optimized" />
          <Experience />
        </section>

        {/* 4. Projects Section */}
        <section id="projects" className="relative py-20 content-section">
          {!isLowPerformance && (
            <div className="floating-blob animate-optimized"
              style={{
                width: '35vw',
                height: '35vw',
                bottom: '20%',
                right: '10%',
                opacity: 0.08
              }}
            />
          )}
          {!isLowPerformance && <div className="mesh-grid animate-optimized" style={{ opacity: 0.02 }} />}
          <div className="section-bg-gradient animate-optimized" />
          <Projects />
        </section>

        {/* 5. Skills Section */}
        <section id="skills" className="relative py-20 content-section bg-black/10">
          {!isLowPerformance && (
            <div className="floating-blob animate-optimized pointer-events-none"
              style={{
                width: '30vw',
                height: '30vw',
                top: '30%',
                left: '10%',
                opacity: 0.08
              }}
            />
          )}
          <div className="section-bg-gradient animate-optimized" />
          <Skills />
        </section>
      </Suspense>
    </main>
  )
} 