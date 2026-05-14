'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import TopRightControls from './TopRightControls'
import MobileNav from './MobileNav'
import { useSky } from '@/contexts/SkyContext'

const PixelCloud = ({
  delay, duration, bottom, opacity, scale = 1, flipped = false,
}: {
  delay: number; duration: number; bottom: number; opacity: number
  scale?: number; flipped?: boolean
}) => (
  <div
    className="absolute pointer-events-none"
    style={{
      animation: `shellCloudDrift ${duration}s linear ${delay}s infinite`,
      bottom: `${bottom}%`,
      opacity,
    }}
  >
    <Image
      src="/cloud.svg"
      alt=""
      width={200}
      height={88}
      sizes={`${Math.round(200 * scale)}px`}
      style={{
        width: `${200 * scale}px`,
        height: 'auto',
        display: 'block',
        transform: flipped ? 'scaleX(-1)' : 'none',
      }}
    />
  </div>
)

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const { mode, enabled } = useSky()

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes shellCloudDrift {
          0%   { transform: translateX(-320px); }
          100% { transform: translateX(105vw);  }
        }
        @keyframes shellCloudFade {
          0%  { opacity: 0; }
          5%  { opacity: 1; }
          100%{ opacity: 1; }
        }
      `}</style>

      {/* ── Full-bleed sky backdrop ─────────────────────── */}
      <AnimatePresence>
        {enabled && (
          <motion.div
            key="sky"
            className="absolute inset-x-0 top-0 pointer-events-none overflow-hidden"
            style={{ height: '380px', zIndex: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Gradient — very low opacity, washed-out pastels */}
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundPosition: mode === 'sunset' ? '0% 100%' : '0% 0%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                backgroundSize: '100% 220%',
                backgroundImage: `
                  radial-gradient(120% 88% at 50% 108%, rgba(255,153,170,0.45) 0%, rgba(255,170,182,0.28) 25%, rgba(255,188,176,0.12) 50%, transparent 72%),
                  radial-gradient(82% 62% at 84% 80%, rgba(255,219,150,0.32) 0%, rgba(255,199,156,0.16) 35%, transparent 60%),
                  linear-gradient(180deg, rgba(80,130,215,0.42) 0%, rgba(120,155,225,0.34) 18%, rgba(165,180,230,0.24) 38%, rgba(200,195,235,0.14) 58%, transparent 100%)
                `,
              }}
            />

            {/* Bottom fade — starts at 45% height for a smooth dissolve */}
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: '55%',
                background: `linear-gradient(to bottom, transparent, var(--color-bg))`,
              }}
            />

            {/* Clouds */}
            <PixelCloud delay={-8}  duration={35} bottom={45} opacity={0.55} scale={1.4} />
            <PixelCloud delay={-3}  duration={28} bottom={65} opacity={0.50} scale={0.7} flipped />
            <PixelCloud delay={-18} duration={40} bottom={30} opacity={0.45} scale={1.0} />
            <PixelCloud delay={-13} duration={32} bottom={55} opacity={0.60} scale={1.2} flipped />
            <PixelCloud delay={-25} duration={38} bottom={72} opacity={0.40} scale={0.9} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navigation ──────────────────────────────────── */}
      <div
        className="hidden md:block"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <TopRightControls skyActive={enabled} />
      </div>

      <div className="md:hidden" style={{ position: 'relative', zIndex: 100 }}>
        <MobileNav />
      </div>

      {/* ── Main layout ─────────────────────────────────── */}
      <div
        className="flex-1 flex w-full max-w-[1200px] mx-auto"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="hidden md:flex">
          <Sidebar skyActive={enabled} />
        </div>
        <MainContent>{children}</MainContent>
      </div>

      <footer style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-[1200px] mx-auto w-full px-[var(--space-lg)] py-[var(--space-md)] flex items-center justify-between md:px-[var(--space-xl)] md:py-[var(--space-xl)]">
          <span className="type-meta text-[var(--color-meta)]">
            neelakshi das — design engineer
          </span>
          <span className="type-meta text-[var(--color-meta)]">
            © 2026
          </span>
        </div>
      </footer>
    </div>
  )
}
