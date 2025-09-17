'use client'

import { Suspense, lazy } from 'react'
import { Loader2 } from 'lucide-react'

// Lazy load heavy components
const PDFExport = lazy(() => import('./PDFExport'))
const CalendarIntegration = lazy(() => import('./CalendarIntegration'))

// Loading component
const ComponentLoader = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
      <p className="text-gray-600">Loading {name}...</p>
    </div>
  </div>
)

// Lazy PDF Export
export const LazyPDFExport = (props: any) => (
  <Suspense fallback={<ComponentLoader name="PDF Export" />}>
    <PDFExport {...props} />
  </Suspense>
)

// Lazy Calendar Integration
export const LazyCalendarIntegration = (props: any) => (
  <Suspense fallback={<ComponentLoader name="Calendar Integration" />}>
    <CalendarIntegration {...props} />
  </Suspense>
)

// Performance monitoring hook
export const usePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const timing = performance.timing
    const loadTime = timing.loadEventEnd - timing.navigationStart
    const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart
    
    return {
      loadTime,
      domContentLoadedTime,
      isPerformanceSupported: true
    }
  }
  
  return {
    loadTime: 0,
    domContentLoadedTime: 0,
    isPerformanceSupported: false
  }
}

// Image optimization component
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '',
  width,
  height,
  priority = false
}: {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ${className}`}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
