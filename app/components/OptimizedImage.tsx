'use client'

import React, { useState, useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

/**
 * OptimizedImage component with lazy loading, progressive loading, and WebP support
 * Maintains the same visual appearance while improving loading performance
 */
const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  style = {},
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  
  // Use IntersectionObserver for better lazy loading
  useEffect(() => {
    if (!priority && imgRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Only set the loaded state when image is in viewport
              if (imgRef.current?.complete) {
                setLoaded(true)
              }
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '200px', // Load images 200px before they enter viewport
          threshold: 0.01
        }
      )
      
      observer.observe(imgRef.current)
      
      return () => {
        if (imgRef.current) observer.unobserve(imgRef.current)
        observer.disconnect()
      }
    }
    
    return undefined
  }, [priority])
  
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ ...style }}>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={80} // Slightly reduced quality for better performance
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`}
      />
    </div>
  )
})

OptimizedImage.displayName = 'OptimizedImage'

export default OptimizedImage 