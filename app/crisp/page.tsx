import type { Metadata, Viewport } from 'next'
import CrispContent from './CrispContent'

export const metadata: Metadata = {
  title: 'neelakshi das',
  description: 'design engineer — fluent in ai, design and the web.',
}

// Phone polish: sky-blue browser chrome, draw under the notch (layout pads with safe-area insets)
export const viewport: Viewport = {
  themeColor: '#3F8BDF',
  viewportFit: 'cover',
}

export default function CrispPage() {
  return <CrispContent />
}
