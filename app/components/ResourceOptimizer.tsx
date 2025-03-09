'use client';

import { useEffect } from 'react';
import { initializeOptimizations } from '../utils/resource-init';

/**
 * ResourceOptimizer - Component that handles preloading and resource optimization
 * This helps with caching, preloading, and overall performance
 */
export function ResourceOptimizer() {
  useEffect(() => {
    // Initialize all optimizations
    initializeOptimizations();
  }, []);

  return null; // This component doesn't render anything
} 