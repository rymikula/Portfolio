'use client'

import { lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Lazy load components for better performance
const Hero = dynamic(() => import('../components/Hero'), { ssr: true })
const About = lazy(() => import('../components/About'))
const Skills = lazy(() => import('../components/Skills'))
const Projects = lazy(() => import('../components/Projects'))
const Experience = lazy(() => import('../components/Experience'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-brown-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Enhanced Global background elements */}
      <div className="stars-bg animate-optimized">
        {[...Array(300)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>
      <div className="particles-container animate-optimized">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
      <div className="aurora-bg animate-optimized" />
      <div className="mesh-grid animate-optimized" />
      <div className="grain-overlay animate-optimized" />

      {/* Hero Section - Not lazy loaded for immediate visibility */}
      <section className="relative min-h-screen flex items-center justify-center z-10">
        <div className="floating-blob floating-blob-1 animate-optimized" />
        <div className="floating-blob floating-blob-2 animate-optimized" style={{ opacity: 0.1 }} />
        <Hero />
      </section>

      {/* Lazy loaded sections */}
      <Suspense fallback={<LoadingFallback />}>
        {/* About Section */}
        <section className="relative">
          <div className="floating-blob floating-blob-3 animate-optimized" style={{ opacity: 0.12 }} />
          <div className="section-bg-gradient animate-optimized" />
          <div className="mesh-grid animate-optimized" style={{ opacity: 0.03 }} />
          <About />
        </section>

        {/* Experience Section */}
        <section className="relative">
          <div className="floating-blob animate-optimized pointer-events-none" 
            style={{ 
              width: '40vw', 
              height: '40vw', 
              top: '30%', 
              right: '0',
              opacity: 0.09 
            }} 
          />
          <div className="section-bg-gradient animate-optimized" />
          <Experience />
        </section>

        {/* Projects Section */}
        <section className="relative">
          <div className="floating-blob animate-optimized" 
            style={{ 
              width: '45vw', 
              height: '45vw', 
              bottom: '10%', 
              left: '0',
              opacity: 0.1 
            }} 
          />
          <div className="mesh-grid animate-optimized" style={{ opacity: 0.02 }} />
          <div className="section-bg-gradient animate-optimized" />
          <Projects />
        </section>

        {/* Skills Section */}
        <section className="relative">
          <div className="floating-blob animate-optimized" 
            style={{ 
              width: '35vw', 
              height: '35vw', 
              top: '20%', 
              right: '0',
              opacity: 0.08 
            }} 
          />
          <div className="section-bg-gradient animate-optimized" />
          <Skills />
        </section>
      </Suspense>

      {/* Additional decorative elements */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/30 to-transparent z-0 pointer-events-none animate-optimized" />
    </main>
  )
} 