import type { Metadata, Viewport } from 'next'
import CrispContent from './CrispContent'

const title = 'bello! I\'m neelakshi'
const description = 'i design, build & ship ~ with ai as my sidekick. a little canvas of things i love — tap around.'
const image = { url: '/crisp/og.png', width: 1200, height: 630, alt: 'neelakshi das — a playful canvas with a config badge, record player, microscope and lego bricks' }

export const metadata: Metadata = {
  title: 'neelakshi das',
  description,
  alternates: { canonical: '/crisp' },
  openGraph: { title, description, url: '/crisp', siteName: 'Neelakshi Das', type: 'website', images: [image] },
  twitter: { card: 'summary_large_image', title, description, images: [image.url], creator: '@bluecoder2003' },
}

// Phone polish: sky-blue browser chrome, draw under the notch (layout pads with safe-area insets)
export const viewport: Viewport = {
  themeColor: '#3F8BDF',
  viewportFit: 'cover',
}

export default function CrispPage() {
  return <CrispContent />
}
