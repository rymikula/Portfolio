import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Source_Sans_3 } from 'next/font/google'

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${montserrat.variable} ${sourceSans.variable} font-sans overflow-x-hidden`}>
        <main className="overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  )
} 