'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion'

/* ─── Data ───────────────────────────────────────────────── */

const experiments = [
  {
    title:       'Sound, Made Visible',
    description: 'Audio visualisation that maps live microphone input to real-time generative patterns.',
    tags:        ['INTERACTION', 'AI'],
    date:        '03 / 2026',
    note:        'Figma Makeathon 2026',
  },
  {
    title:       'SOMA, Decoding Discomfort',
    description: 'An AR concept that translates wearable stress signals into guided pressure-point relief.',
    tags:        ['CONCEPT', 'AR'],
    date:        '03 / 2026',
  },
  {
    title:       'Anime Portfolio Iteration',
    description: 'A cozy anime-themed desk scene where every object on screen can be rearranged.',
    tags:        ['MOTION', 'PLAY'],
    date:        '03 / 2026',
  },
  {
    title:       'Randomness as Inspiration',
    description: 'One click surfaces one randomly curated site — a tool for breaking creative blocks on demand.',
    tags:        ['TOOL'],
    date:        '03 / 2026',
  },
  {
    title:       'Credit Card Masking',
    description: 'Card numbers stay hidden by default and reveal themselves only on deliberate hover.',
    tags:        ['INTERACTION'],
    date:        '03 / 2025',
  },
  {
    title:       'Logo Iteration',
    description: 'A non-mainstream logo study driven by intentional and documented design decisions.',
    tags:        ['VISUAL'],
    date:        '02 / 2025',
  },
  {
    title:       'Wind Hashira Prelude',
    description: 'A page preloader built entirely around a wind motif — every element tied to the metaphor.',
    tags:        ['MOTION'],
    date:        '02 / 2025',
  },
  {
    title:       'Just a Potterhead',
    description: 'A concept interaction exploring subtle moments of fandom through playful micro-interactions.',
    tags:        ['CONCEPT', 'INTERACTION'],
    date:        '02 / 2025',
  },
  {
    title:       'Pause Before You Reel',
    description: 'Sarcastic guilt-trip pop-ups that surface directly over the Instagram Reels button.',
    tags:        ['DARK PATTERNS', 'PLAY'],
    date:        '01 / 2025',
  },
]

/* ─── Responsive layout ──────────────────────────────────── */

const N       = experiments.length
const RADIUS  = 20
const STEP_PX = 300

const PALETTE = [
  '#EBE4F2', '#DFF0F3', '#F2EBE4',
  '#E2F2E9', '#F2E4E4', '#E7F2E2',
  '#E4E7F2', '#F2EEE4', '#E4F2F0',
]

interface Layout {
  mobile:  boolean
  cardW:   number
  cardH:   number
  stageH:  number
  gap:     number
  rightW:  number
  colGap:  number
}

function getLayout(w: number): Layout {
  if (w < 640) return {
    mobile: true,
    cardW:  Math.min(w - 32, 300),
    cardH:  210,
    stageH: 560,
    gap:    185,
    rightW: 0,
    colGap: 0,
  }
  if (w < 1024) return {
    mobile: false,
    cardW:  300,
    cardH:  240,
    stageH: 580,
    gap:    210,
    rightW: 180,
    colGap: 20,
  }
  return {
    mobile: false,
    cardW:  480,
    cardH:  360,
    stageH: 700,
    gap:    245,
    rightW: 210,
    colGap: 28,
  }
}

/* ─── Per-card component ─────────────────────────────────── */

interface CardProps {
  index:     number
  activePos: MotionValue<number>
  cardW:     number
  cardH:     number
  gap:       number
}

function ReelCard({ index, activePos, cardW, cardH, gap }: CardProps) {
  const offset  = useTransform(activePos, (v) => v - index)
  const y       = useTransform(offset, (v) =>  v * gap)
  const scale   = useTransform(offset, (v) => Math.max(0.38, 1 - Math.abs(v) * 0.165))
  const opacity = useTransform(offset, (v) => Math.max(0,    1 - Math.abs(v) * 0.42))
  const filter  = useTransform(offset, (v) => `blur(${Math.min(4, Math.abs(v) * 1.2)}px)`)
  const zIndex  = useTransform(offset, (v) => Math.round(60 - Math.abs(v) * 12))

  return (
    <motion.div
      aria-hidden
      style={{
        position:   'absolute',
        width:      cardW,
        height:     cardH,
        left:       '50%',
        marginLeft: -cardW / 2,
        top:        '50%',
        marginTop:  -cardH / 2,
        borderRadius: RADIUS,
        overflow:   'hidden',
        background: PALETTE[index % PALETTE.length],
        y, scale, opacity, filter, zIndex,
      }}
    >
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(165deg, rgba(255,255,255,0.26) 0%, transparent 48%)',
        pointerEvents: 'none',
      }} />
      <span style={{
        position:      'absolute',
        bottom:        16,
        left:          18,
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.58rem',
        letterSpacing: '0.14em',
        color:         'rgba(0,0,0,0.18)',
        userSelect:    'none',
      }}>
        {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
      </span>
    </motion.div>
  )
}

/* ─── Info panel (shared across breakpoints) ─────────────── */

function InfoPanel({ exp, activeIdx, style }: {
  exp: typeof experiments[number]
  activeIdx: number
  style?: React.CSSProperties
}) {
  return (
    <div style={style}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{    opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.25, 0, 0, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          <p style={{
            fontFamily:   'var(--font-sans)',
            fontSize:     '1.0625rem',
            fontWeight:   400,
            color:        'var(--color-primary)',
            lineHeight:   1.35,
            marginBottom: 10,
          }}>
            {exp.title}
          </p>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.68rem',
            letterSpacing: '0.06em',
            color:         'var(--color-meta)',
            marginBottom:  14,
          }}>
            {exp.date}
          </p>
          <p style={{
            fontFamily:   'var(--font-sans)',
            fontSize:     '0.8125rem',
            fontWeight:   300,
            color:        'var(--color-secondary)',
            lineHeight:   1.65,
            marginBottom: 18,
          }}>
            {exp.description}
          </p>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6rem',
            letterSpacing: '0.1em',
            color:         'var(--color-tertiary)',
          }}>
            {exp.tags.join(' · ')}
          </p>
          {exp.note && (
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6rem',
              letterSpacing: '0.06em',
              color:         'var(--color-meta)',
              marginTop:     10,
            }}>
              {exp.note}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ─── Main export ─────────────────────────────────────────── */

export default function PlaygroundReel() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const rawPos    = useMotionValue(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const [layout, setLayout]       = useState<Layout>(getLayout(1440))

  useEffect(() => {
    const update = () => setLayout(getLayout(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const pos = Math.max(0, Math.min(N - 1, el.scrollTop / STEP_PX))
    rawPos.set(pos)
    setActiveIdx(Math.round(pos))
  }, [rawPos])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const exp = experiments[activeIdx]
  const { mobile, cardW, cardH, stageH, gap, rightW, colGap } = layout

  /* card zone height for mobile (58% of stage) */
  const mobileCardZoneH = Math.round(stageH * 0.56)

  return (
    <div style={{ position: 'relative', height: stageH, overflow: 'hidden' }}>

      {/* ── Invisible scroll track ───────────────────────── */}
      <div
        ref={trackRef}
        style={{
          position:       'absolute',
          inset:          0,
          overflowY:      'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          zIndex:         300,
          opacity:        0,
          pointerEvents:  'auto',
        }}
      >
        {experiments.map((_, i) => (
          <div key={i} style={{ height: STEP_PX, scrollSnapAlign: 'start', flexShrink: 0 }} />
        ))}
        <div style={{ height: stageH + 40 }} />
      </div>

      {/* ── Top gradient mask ───────────────────────────── */}
      <div aria-hidden style={{
        position:      'absolute',
        top:           0, left: 0, right: 0,
        height:        mobile ? '18%' : '34%',
        background:    'linear-gradient(to bottom, var(--color-bg) 8%, transparent 100%)',
        zIndex:        200,
        pointerEvents: 'none',
      }} />

      {/* ── Bottom gradient mask (desktop/tablet only) ── */}
      {!mobile && (
        <div aria-hidden style={{
          position:      'absolute',
          bottom:        0, left: 0, right: 0,
          height:        '34%',
          background:    'linear-gradient(to top, var(--color-bg) 8%, transparent 100%)',
          zIndex:        200,
          pointerEvents: 'none',
        }} />
      )}

      {mobile ? (
        /* ── Mobile: card on top, info below ────────────── */
        <div style={{
          position:      'absolute',
          inset:         0,
          display:       'flex',
          flexDirection: 'column',
          pointerEvents: 'none',
        }}>
          {/* Card zone */}
          <div style={{ height: mobileCardZoneH, position: 'relative', flexShrink: 0 }}>
            {experiments.map((_, i) => (
              <ReelCard key={i} index={i} activePos={rawPos} cardW={cardW} cardH={cardH} gap={gap} />
            ))}
          </div>

          {/* Info zone */}
          <InfoPanel
            exp={exp}
            activeIdx={activeIdx}
            style={{
              flex:          1,
              display:       'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingTop:    20,
            }}
          />
        </div>

      ) : (
        /* ── Tablet / Desktop: side-by-side ──────────────── */
        <div style={{
          position:   'absolute',
          inset:      0,
          display:    'flex',
          alignItems: 'stretch',
          pointerEvents: 'none',
        }}>
          {/* Card column */}
          <div style={{ flex: 1, position: 'relative' }}>
            {experiments.map((_, i) => (
              <ReelCard key={i} index={i} activePos={rawPos} cardW={cardW} cardH={cardH} gap={gap} />
            ))}
          </div>

          <div style={{ width: colGap, flexShrink: 0 }} />

          {/* Right rail */}
          <InfoPanel
            exp={exp}
            activeIdx={activeIdx}
            style={{
              width:          rightW,
              flexShrink:     0,
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'center',
            }}
          />
        </div>
      )}

      {/* ── Progress strip ───────────────────────────────── */}
      <div style={{
        position:      'absolute',
        bottom:        mobile ? 10 : 20,
        left:          '50%',
        transform:     'translateX(-50%)',
        display:       'flex',
        gap:           5,
        zIndex:        210,
        pointerEvents: 'none',
      }}>
        {experiments.map((_, i) => (
          <div key={i} style={{
            height:       3,
            width:        i === activeIdx ? 20 : 4,
            borderRadius: 2,
            background:   i === activeIdx
              ? 'var(--color-secondary)'
              : 'var(--color-dividers)',
            transition:   'all 0.3s var(--ease)',
          }} />
        ))}
      </div>

    </div>
  )
}
