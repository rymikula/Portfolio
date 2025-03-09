'use client'

import { useState, useEffect, useCallback } from 'react'

interface PerformanceMetrics {
  isMobile: boolean
  isLowPerformance: boolean
  devicePixelRatio: number
  memoryInfo: {
    jsHeapSizeLimit?: number
    totalJSHeapSize?: number
    usedJSHeapSize?: number
  }
  supportsWebGLTwo: boolean
  fps: number
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isMobile: false,
    isLowPerformance: false,
    devicePixelRatio: 1,
    memoryInfo: {},
    supportsWebGLTwo: false,
    fps: 60
  })

  // Measure FPS
  const measureFPS = useCallback(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let frameTimes: number[] = []
    
    const countFrame = () => {
      const now = performance.now()
      const delta = now - lastTime
      
      if (delta >= 1000) {
        // Calculate average FPS over the last second
        const fps = frameCount * 1000 / delta
        frameTimes.push(fps)
        
        // Keep only the last 5 measurements for a smoother average
        if (frameTimes.length > 5) {
          frameTimes.shift()
        }
        
        // Calculate average FPS
        const avgFps = frameTimes.reduce((sum, fps) => sum + fps, 0) / frameTimes.length
        
        setMetrics(prev => ({
          ...prev,
          fps: Math.round(avgFps)
        }))
        
        frameCount = 0
        lastTime = now
      }
      
      frameCount++
      requestAnimationFrame(countFrame)
    }
    
    const frameId = requestAnimationFrame(countFrame)
    return () => cancelAnimationFrame(frameId)
  }, [])

  // Check device capabilities
  const checkDevice = useCallback(() => {
    if (typeof window === 'undefined') return
    
    // Detect mobile
    const isMobileDevice = 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
      window.innerWidth <= 768
    
    // Check for memory constraints
    const memory = (performance as any).memory || {}
    
    // Check WebGL capabilities
    let supportsWebGL2 = false
    try {
      const canvas = document.createElement('canvas')
      supportsWebGL2 = !!canvas.getContext('webgl2')
    } catch (e) {
      supportsWebGL2 = false
    }
    
    // Determine if device is likely to be low performance
    const isLowPerf = 
      isMobileDevice || 
      !supportsWebGL2 || 
      (memory.jsHeapSizeLimit && memory.jsHeapSizeLimit < 2147483648) // < 2GB RAM threshold
    
    setMetrics(prev => ({
      ...prev,
      isMobile: isMobileDevice,
      isLowPerformance: isLowPerf,
      devicePixelRatio: window.devicePixelRatio || 1,
      memoryInfo: {
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        totalJSHeapSize: memory.totalJSHeapSize,
        usedJSHeapSize: memory.usedJSHeapSize
      },
      supportsWebGLTwo: supportsWebGL2
    }))
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Initial check
    checkDevice()
    
    // Start FPS monitoring
    const cleanup = measureFPS()
    
    // Monitor for changes in device orientation or window size
    const handleResize = () => {
      checkDevice()
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      cleanup()
    }
  }, [checkDevice, measureFPS])

  return metrics
}

export default usePerformanceMonitor 