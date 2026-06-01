import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '700'],
})

const title = 'Ryan Mikula - Software Engineer'
const description =
  'Ryan Mikula - software engineer working on systems, graphics, and games. A timeline of my work.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://ryanmikula.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: 'https://ryanmikula.com',
    siteName: 'Ryan Mikula',
    type: 'website',
  },
  twitter: { card: 'summary', title, description },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
