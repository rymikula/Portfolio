import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import dynamic from 'next/dynamic'

// Dynamically import optimization components with no SSR to prevent hydration issues
const ScrollOptimizer = dynamic(() => import('./utils/scroll-optimizer').then(mod => mod.ScrollOptimizer), { ssr: false })
const ResourceOptimizer = dynamic(() => import('./components/ResourceOptimizer').then(mod => mod.ResourceOptimizer), { ssr: false })

// Optimize font loading
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'Portfolio | Professional Resume',
  description: 'Personal portfolio showcasing professional skills and projects',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#18191b',
  metadataBase: new URL('https://portfolio.example.com'),
  other: {
    // Cache hints for better browser caching
    'Cache-Control': 'public, max-age=31536000, immutable',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/app/globals.css" as="style" />
        
        {/* Preload critical page content */}
        <link rel="preload" href="/" as="fetch" crossOrigin="anonymous" />
        
        {/* Indicate to browsers this site works offline */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Add meta tags for caching */}
        <meta httpEquiv="Cache-Control" content="max-age=31536000" />
      </head>
      <body className={`${montserrat.variable} ${sourceSans.variable} font-sans overflow-x-hidden`}>
        <ScrollOptimizer />
        <ResourceOptimizer />
        <main className="overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  )
} 