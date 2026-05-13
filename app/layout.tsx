import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/layout/SiteShell'

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets:  ['latin'],
  variable: '--font-ibm-plex-mono',
  weight:   ['100', '200', '300', '400', '500', '600', '700'],
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'Neelakshi Das — Design Engineer',
  description: 'Design engineer working at the seam of AI, design, and the web.',
  metadataBase: new URL('https://dasneelakshi.com'),
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
