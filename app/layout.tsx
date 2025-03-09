import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Source_Sans_3 } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
})

export const metadata: Metadata = {
  title: 'Portfolio | Professional Resume',
  description: 'Personal portfolio showcasing professional skills and projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} ${sourceSans.variable} font-sans overflow-x-hidden`}>
        <main className="overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  )
} 