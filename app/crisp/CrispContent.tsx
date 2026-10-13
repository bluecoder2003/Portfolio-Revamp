'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Figma brand palette + canvas selection blue
const FIG = {
  red: '#F24E1E',
  orange: '#FF7262',
  purple: '#A259FF',
  blue: '#1ABCFE',
  green: '#0ACF83',
  yellow: '#FFC943',
  select: '#0D99FF',
  ink: '#2B3FD6', // blue-pen handwriting
}

const TALINDREW_NOTE = <>a dna/rna visualiser<br />built in <u>figma make</u> ✦</>

// ─── Pointer-capture drag ─────────────────────────────────────────────────────
function Drag({
  children, x, y, rot = 0, z = 10, className,
}: {
  children: React.ReactNode
  x: string
  y: string
  rot?: number
  z?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const s = useRef({ drag: false, px: 0, py: 0, ox: 0, oy: 0, cx: 0, cy: 0, k: 1 })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `rotate(${rot}deg)`,
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
        willChange: 'transform',
        zIndex: z,
      }}
      onPointerDown={(e) => {
        const el = ref.current
        if (!el) return
        el.setPointerCapture(e.pointerId)
        s.current = {
          drag: true,
          px: e.clientX, py: e.clientY,
          ox: s.current.cx, oy: s.current.cy,
          cx: s.current.cx, cy: s.current.cy,
          // phone layout shrinks items with the CSS `scale` property; undo it so drag follows the finger
          k: parseFloat(getComputedStyle(el).scale) || 1,
        }
        el.style.zIndex = '400'
        el.style.cursor = 'grabbing'
      }}
      onPointerMove={(e) => {
        const st = s.current
        if (!st.drag || !ref.current) return
        st.cx = st.ox + (e.clientX - st.px) / st.k
        st.cy = st.oy + (e.clientY - st.py) / st.k
        ref.current.style.transform = `translate(${st.cx}px,${st.cy}px) rotate(${rot}deg)`
      }}
      onPointerUp={() => {
        s.current.drag = false
        if (ref.current) {
          ref.current.style.cursor = 'grab'
          ref.current.style.zIndex = String(z)
        }
      }}
    >
      {children}
    </div>
  )
}

// ─── Easter egg: draggable sticker + handwritten note on hover/focus ─────────
function Egg({
  x, y, rot = 0, z = 12, className = '', note, side = 'bottom', label, children,
}: {
  x: string
  y: string
  rot?: number
  z?: number
  className?: string
  note: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  label: string
  children: React.ReactNode
}) {
  return (
    <Drag x={x} y={y} rot={rot} z={z} className={`egg ${className}`}>
      <div className="egg-inner" tabIndex={0} aria-label={label}>
        <div className="sticker">{children}</div>
        <div className={`egg-note egg-note-${side}`} role="note">{note}</div>
      </div>
    </Drag>
  )
}

// ─── Paper-quilled minion: every part is a coiled paper strip ─────────────────
// A strip = a darker "edge" stroke under a lighter "face" stroke, like quilling paper seen side-on
function Strip({ d, c, e, w = 2.4 }: { d: string; c: string; e: string; w?: number }) {
  return (
    <>
      <path d={d} stroke={e} strokeWidth={w + 1.3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

// Archimedean coil (tight quilling coil) as an SVG path
function coil(cx: number, cy: number, r: number, gap = 2.6) {
  const turns = r / gap
  const max = turns * Math.PI * 2
  let d = ''
  for (let t = 0; t <= max; t += 0.3) {
    const rr = (gap * t) / (Math.PI * 2)
    d += `${t ? 'L' : 'M'}${(cx + rr * Math.cos(t)).toFixed(1)} ${(cy + rr * Math.sin(t)).toFixed(1)} `
  }
  return d
}

// Nested capsule rings (a "filled" quilled shape)
function capsuleRings(x: number, y: number, w: number, h: number, n: number, step: number) {
  return Array.from({ length: n }, (_, i) => {
    const xi = x + i * step, yi = y + i * step, wi = w - 2 * i * step, hi = h - 2 * i * step
    const r = wi / 2
    return `M${xi} ${yi + r} A${r} ${r} 0 0 1 ${xi + wi} ${yi + r} L${xi + wi} ${yi + hi - r} A${r} ${r} 0 0 1 ${xi} ${yi + hi - r} Z`
  })
}

const Y = { c: '#FFD84D', e: '#D9A800' }
const B = { c: '#3E78C9', e: '#24508F' }
const K = { c: '#3A3A3A', e: '#151515' }
const G = { c: '#C9CED6', e: '#8B929C' }

function QuilledMinion() {
  const rings = capsuleRings(26, 16, 68, 112, 9, 3.3)
  return (
    <svg className="qm" width="128" height="150" viewBox="0 0 120 150" role="img" aria-label="a minion made with paper quilling">
      <defs>
        <clipPath id="qm-top"><rect x="0" y="0" width="120" height="92" /></clipPath>
        <clipPath id="qm-bot"><rect x="0" y="92" width="120" height="60" /></clipPath>
      </defs>

      {/* feet + arms (behind body) */}
      <g className="qm-feet">
        <Strip d={coil(46, 134, 7, 2.2)} {...K} w={2} />
        <Strip d={coil(74, 134, 7, 2.2)} {...K} w={2} />
      </g>
      <g className="qm-arm-l">
        <Strip d="M28 86 Q16 96 18 110" {...Y} w={4} />
        <Strip d={coil(18, 113, 4.5, 2)} {...K} w={1.8} />
      </g>
      <g className="qm-arm-r">
        <Strip d="M92 86 Q104 96 102 110" {...Y} w={4} />
        <Strip d={coil(102, 113, 4.5, 2)} {...K} w={1.8} />
      </g>

      {/* body: yellow rings on top, blue overalls below */}
      <rect x="27" y="17" width="66" height="110" rx="33" fill={Y.c} />
      <path d="M27 92 L93 92 L93 94 Q93 127 60 127 Q27 127 27 94Z" fill={B.c} />
      <g clipPath="url(#qm-top)">{rings.map((d, i) => <Strip key={i} d={d} {...Y} w={2.2} />)}</g>
      <g clipPath="url(#qm-bot)">{rings.map((d, i) => <Strip key={i} d={d} {...B} w={2.2} />)}</g>
      <Strip d={coil(60, 108, 6, 2)} {...B} w={1.6} />

      {/* bib + straps + tiny figma pocket */}
      <path d="M42 92 L42 82 L78 82 L78 92Z" fill="#3E78C9" />
      <Strip d="M42 92 L42 82 L78 82 L78 92" {...B} w={2.2} />
      <Strip d="M30 70 L42 84 M90 70 L78 84" {...B} w={2.6} />
      <g transform="translate(55.5 84) scale(0.16)">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
      </g>

      {/* goggle strap + goggle */}
      <Strip d="M26 50 L94 50" {...K} w={5} />
      <circle cx="60" cy="50" r="17.5" fill="#fff" />
      <Strip d={coil(60, 50, 17.5, 2.2).replace(/^M[^L]+/, 'M60 50 ')} {...G} w={1.6} />
      <circle cx="60" cy="50" r="10.5" fill="#fff" />
      <Strip d="M60 39.5 A10.5 10.5 0 1 1 59.9 39.5" c="#ffffff" e="#C9CED6" w={1.4} />
      <g className="qm-eye">
        <Strip d={coil(60, 50, 5, 1.5)} c="#8A5A2B" e="#5B3A18" w={1.3} />
        <circle cx="60" cy="50" r="2" fill="#151515" />
      </g>

      {/* mouth + hair curls */}
      <Strip d="M51 70 Q60 77 69 70" {...K} w={1.6} />
      <g className="qm-hair">
        <Strip d="M52 17 Q50 8 46 6 q-3 -1 -2 2" {...K} w={1.4} />
        <Strip d="M60 16 Q60 6 62 3 q2 -2 3 1" {...K} w={1.4} />
        <Strip d="M68 17 Q71 9 75 8 q3 0 1 3" {...K} w={1.4} />
      </g>
    </svg>
  )
}

// ─── Photo objects (cut-out stock photos) ─────────────────────────────────────
// Sources: mic — Holger Ellgaard (CC BY-SA 3.0), walkman — Dillan Payne (CC BY-SA 4.0),
// the rest are CC0 / public domain.
// These licences expect visible credit; it was removed from the page by request.
function MusicNotes() {
  return (
    <svg className="notes" width="60" height="70" viewBox="0 0 60 70" aria-hidden="true">
      <text className="note-float" x="30" y="40" fill={FIG.orange} fontSize="22">♪</text>
      <text className="note-float d2" x="40" y="62" fill={FIG.blue} fontSize="18">♫</text>
      <text className="note-float d3" x="8" y="50" fill={FIG.green} fontSize="20">♪</text>
    </svg>
  )
}

function MicPhoto() {
  return (
    <div className="obj" style={{ width: 66, height: 141 }}>
      <Image src="/crisp/mic.webp" alt="vintage microphone" width={66} height={141} className="obj-img sway" />
      <span style={{ position: 'absolute', top: -28, left: 44 }}><MusicNotes /></span>
    </div>
  )
}

function WalkmanPhoto() {
  return (
    <div className="obj" style={{ width: 140, height: 119 }}>
      <Image src="/crisp/cassette.webp" alt="mixtape cassette" width={104} height={66} className="obj-img tape" style={{ position: 'absolute', left: 18, top: 10 }} />
      <Image src="/crisp/walkman.webp" alt="cassette walkman" width={140} height={119} className="obj-img" style={{ position: 'relative' }} />
    </div>
  )
}

// Neelakshi's own mountain photos, as a stack of two postcards
const MOUNTAIN_SHOTS = [
  { src: '/crisp/mountains-1.webp', alt: 'hilltop camp with red-roofed cottages above layered blue mountains' },
  { src: '/crisp/mountains-2.webp', alt: 'misty mountain road at dawn, shot on a film-date camera' },
]

function Postcard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="postcard">
      <div style={{ position: 'relative', width: 108, height: 81, overflow: 'hidden' }}>
        <Image src={src} alt={alt} fill sizes="108px" className="pc-photo" style={{ objectFit: 'cover' }} />
      </div>
    </div>
  )
}

function MountainPostcard() {
  return (
    <div className="pc-stack">
      <div className="pc-back"><Postcard {...MOUNTAIN_SHOTS[1]} /></div>
      <div className="pc-front"><Postcard {...MOUNTAIN_SHOTS[0]} /></div>
    </div>
  )
}

// ─── talindrew: glass microscope slide with a stained DNA helix ───────────────
const HELIX = (() => {
  const period = 36, w = 118 + period, mid = 21, amp = 12
  const y = (x: number, sign: number) => mid + sign * amp * Math.sin((2 * Math.PI * x) / period)
  let a = '', b = ''
  for (let x = 0; x <= w; x++) {
    a += `${x ? 'L' : 'M'}${x} ${y(x, 1).toFixed(1)} `
    b += `${x ? 'L' : 'M'}${x} ${y(x, -1).toFixed(1)} `
  }
  const colors = [FIG.purple, FIG.blue, FIG.green, FIG.orange]
  const rungs = Array.from({ length: Math.floor(w / 6) }, (_, i) => {
    const x = 3 + i * 6
    return { x, y1: y(x, 1), y2: y(x, -1), c: colors[i % 4] }
  })
  return { a, b, rungs, w, period }
})()

function MicroscopeSlide() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="slide">
        <div className="slide-window">
          <svg className="helix" width={HELIX.w} height="42" viewBox={`0 0 ${HELIX.w} 42`} aria-hidden="true">
            {HELIX.rungs.map((r) => (
              <line key={r.x} x1={r.x} x2={r.x} y1={r.y1} y2={r.y2} stroke={r.c} strokeWidth="2" strokeLinecap="round" opacity=".85" />
            ))}
            <path d={HELIX.a} stroke="#5B2BB5" strokeWidth="2.4" fill="none" />
            <path d={HELIX.b} stroke="#2B6FB5" strokeWidth="2.4" fill="none" />
          </svg>
        </div>
        <div className="slide-label">
          <span className="slide-name">talindrew</span>
          <span className="slide-meta">DNA · RNA</span>
        </div>
      </div>
      <a className="egg-link" href="https://www.talindrew.com/" target="_blank" rel="noopener noreferrer" onPointerDown={(e) => e.stopPropagation()}>
        talindrew.com ↗
      </a>
    </div>
  )
}

// ─── vectordrop stats — thermal-printed receipt ────────────────────────────────
// Torn edge on both ends: zigzag clip-path
function torn(teeth: number, depth: number) {
  const top: string[] = []
  const bottom: string[] = []
  for (let i = 0; i <= teeth * 2; i++) {
    const x = ((i / (teeth * 2)) * 100).toFixed(2)
    top.push(`${x}% ${i % 2 ? depth : 0}px`)
    bottom.unshift(`${x}% calc(100% - ${i % 2 ? depth : 0}px)`)
  }
  return `polygon(${[...top, ...bottom].join(',')})`
}

const RECEIPT: [string, string][] = [
  ['page views', '21,000'],
  ['visitors', '5,000'],
  ['paid customers', '7'],
]

function Receipt() {
  return (
    <div className="receipt-wrap" tabIndex={0} aria-label="vectordrop receipt: 21k page views, 5k visitors, 7 paid customers in the last 3 months">
      <div className="receipt" style={{ clipPath: torn(14, 5) }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em' }}>✦ VECTORDROP ✦</div>
          <a className="rc-link" href="https://www.vectordrop.co.in/" target="_blank" rel="noopener noreferrer" onPointerDown={(e) => e.stopPropagation()}>
            vectordrop.co.in ↗
          </a>
        </div>
        <div className="rc-rule" />
        <div>LAST 3 MONTHS</div>
        {RECEIPT.map(([k, v]) => (
          <div key={k} className="rc-row"><span>{k}</span><span className="rc-dots" /><span>{v}</span></div>
        ))}
        <div className="rc-rule" />
        <div className="rc-row" style={{ fontWeight: 700 }}><span>TOTAL</span><span className="rc-dots" /><span>7 happy users</span></div>
        <div className="rc-rule" />
        <div style={{ textAlign: 'center' }}>thanks for visiting ✦</div>
        <svg width="100%" height="22" viewBox="0 0 120 22" preserveAspectRatio="none" style={{ display: 'block', marginTop: 6 }} aria-hidden="true">
          {[2,1,3,1,1,2,1,3,2,1,1,2,3,1,2,1,1,3,1,2,2,1,3,1,1,2,1,2,3,1,1,2,1,3,1,2].reduce<{ x: number; els: React.ReactNode[] }>(
            (acc, w, i) => {
              if (i % 2 === 0) acc.els.push(<rect key={i} x={acc.x} y="0" width={w} height="22" fill="#2A2A2A" />)
              acc.x += w + 0.6
              return acc
            },
            { x: 4, els: [] },
          ).els}
        </svg>
      </div>
      <span className="rc-stamp" aria-hidden="true">PAID ×7</span>
    </div>
  )
}

// ─── Recognition corner content ───────────────────────────────────────────────
const WINS = [
  {
    cls: 'win-a', rot: -2, src: '/recognition/image.png',
    alt: 'Dylan Field reposting Neelakshi’s Figma Makeathon post about Talindrew, a DNA/RNA visualiser built in Figma Make',
    note: <>Got reposted by<br />Dylan Field</>,
  },
  {
    cls: 'win-b', rot: 2, src: '/recognition/image%20copy%202.png',
    alt: 'Contra post: “Neelakshi is goated”, next to her sound-visualiser project',
    note: <>Featured on<br />Contra</>,
  },
  {
    cls: 'win-c', rot: -1.5, src: '/recognition/image%20copy.png',
    alt: 'FigBuild 2026 merch: t-shirt, notebook, enamel pin and Figma for Edu stickers',
    note: <>Got my<br />FigBuild merch</>,
  },
]

function FigmaMark({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 38 57" aria-hidden="true">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  )
}

// ─── Recognition corner: home-screen widget → celebratory popup ───────────────
function RecognitionWidget({ onOpen }: { onOpen: () => void }) {
  return (
    <button className="rc-widget" onClick={onOpen} aria-haspopup="dialog" aria-label="a little bragging — open recognition corner">
      <span className="rc-fan" aria-hidden="true">
        {WINS.map((w, i) => (
          <span key={w.cls} className="rc-thumb" style={{ ['--i' as string]: i - 1 }}>
            <Image src={w.src} alt="" width={96} height={96} sizes="96px" />
          </span>
        ))}
      </span>
      <span className="rc-w-label">a little bragging <span className="rc-arrow">↗</span></span>
    </button>
  )
}

const CONFETTI_COLORS = [FIG.red, FIG.orange, FIG.purple, FIG.blue, FIG.green, FIG.yellow, '#FF8FD8', '#ffffff']

function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = ref.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    let W = window.innerWidth
    let H = window.innerHeight
    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      c.width = W * dpr
      c.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    type P = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; tilt: number; w: number; h: number; c: string; shape: number }
    const ps: P[] = []
    const burst = (x: number, y: number, angle: number, spread: number, n: number, speed: number) => {
      for (let i = 0; i < n; i++) {
        const a = angle + (Math.random() - 0.5) * spread
        const s = speed * (0.45 + Math.random() * 0.75)
        ps.push({
          x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
          rot: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.4, tilt: Math.random() * Math.PI * 2,
          w: 6 + Math.random() * 9, h: 4 + Math.random() * 7,
          c: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0], shape: Math.random(),
        })
      }
    }
    const timers = [
      setTimeout(() => { burst(0, H * 0.95, -Math.PI / 3, 0.9, 180, 26); burst(W, H * 0.95, (-2 * Math.PI) / 3, 0.9, 180, 26) }, 50),
      setTimeout(() => burst(W / 2, H * 0.4, -Math.PI / 2, Math.PI * 2, 220, 18), 350),
      setTimeout(() => { burst(0, H * 0.5, -Math.PI / 5, 0.8, 140, 22); burst(W, H * 0.5, (-4 * Math.PI) / 5, 0.8, 140, 22) }, 800),
      setTimeout(() => { for (let i = 0; i < 10; i++) burst(Math.random() * W, -20, Math.PI / 2, 0.7, 24, 5) }, 1200),
      setTimeout(() => { burst(W * 0.25, H, -Math.PI / 2, 0.5, 90, 24); burst(W * 0.75, H, -Math.PI / 2, 0.5, 90, 24) }, 1700),
    ]

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        p.vy += 0.32
        p.vx *= 0.986
        p.vy *= 0.986
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        p.tilt += 0.12
        if (p.y > H + 40) { ps.splice(i, 1); continue }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.scale(1, Math.cos(p.tilt))
        ctx.fillStyle = p.c
        if (p.shape < 0.18) { ctx.beginPath(); ctx.arc(0, 0, p.h / 2, 0, Math.PI * 2); ctx.fill() }
        else if (p.shape < 0.36) ctx.fillRect(-p.w, -1.5, p.w * 2, 3)
        else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      timers.forEach(clearTimeout)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={ref} className="rc-confetti" aria-hidden="true" />
}

// Dancers: Tenor GIFs with the white background removed, saved as transparent animated WebP
// cat — tenor.com/view/cat-dance-happy-dance-cat-gif-8638417088064838099
// minion — tenor.com/view/minion-minions-minions-the-rise-of-gru-rise-of-gru-bob-gif-9437512764717097165
function Dancer({ src, w, h }: { src: string; w: number; h: number }) {
  return <Image className="dancer" src={src} alt="" width={w} height={h} unoptimized />
}

function RecognitionModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="rc-overlay" role="dialog" aria-modal="true" aria-labelledby="recognition-title" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cat-spot cat-spot-l" aria-hidden="true"><Dancer src="/crisp/cat-dance.webp" w={175} h={204} /></div>
      <div className="cat-spot cat-spot-r" aria-hidden="true"><Dancer src="/crisp/minion-dance.webp" w={200} h={256} /></div>

      <div className="rc-panel">
        <button ref={closeRef} className="rc-close" onClick={onClose} aria-label="close recognition corner">×</button>
        <header className="rc-head">
          <FigmaMark size={30} />
          <div>
            <h2 id="recognition-title">recognition corner <span aria-hidden="true">✦</span></h2>
            <p>a little bragging, as a treat — figma makeathon ’25, ’26 &amp; figbuild ’26</p>
          </div>
        </header>
        <p className="rc-swipe" aria-hidden="true">swipe →</p>
        <div className="rc-grid">
          {WINS.map((w, i) => (
            <figure key={w.cls} className="rc-win" style={{ ['--rot' as string]: `${w.rot * 1.5}deg`, animationDelay: `${0.15 + i * 0.14}s` }}>
              <figcaption className="stamp-note">{w.note}</figcaption>
              <div className="win-card">
                <Image src={w.src} alt={w.alt} width={800} height={800} sizes="(max-width: 760px) 90vw, 340px" />
              </div>
            </figure>
          ))}
        </div>
      </div>

      <Confetti />
    </div>
  )
}

// ─── Config lanyard badge (FigBuild-style ID card) ──────────
const BADGE = { lime: '#E4FB8F', orange: '#FF7236', lilac: '#C4B5FD', green: '#24CB71', blue: '#4D49FC' }

// Wavy-edged blob as a clip-path polygon: r = 1 + amp·sin(lobes·θ)
function wavy(lobes: number, amp: number) {
  const pts: string[] = []
  for (let i = 0; i < 72; i++) {
    const t = (i / 72) * Math.PI * 2
    const r = 1 - amp + amp * Math.sin(lobes * t)
    pts.push(`${(50 + 50 * r * Math.cos(t)).toFixed(1)}% ${(50 + 50 * r * Math.sin(t)).toFixed(1)}%`)
  }
  return `polygon(${pts.join(',')})`
}

function Chip({ bg, color = '#111', shape, rot, children, style }: {
  bg: string
  color?: string
  shape: 'wavy' | 'burst' | 'pill'
  rot: number
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <span
      className="chip"
      style={{
        position: 'absolute',
        background: bg,
        color,
        transform: `rotate(${rot}deg)`,
        clipPath: shape === 'pill' ? undefined : shape === 'wavy' ? wavy(10, 0.07) : wavy(14, 0.14),
        borderRadius: shape === 'pill' ? 999 : undefined,
        padding: shape === 'pill' ? '4px 8px' : shape === 'burst' ? '13px 11px' : '11px 12px',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

function ConfigBadge() {
  return (
    <div className="badge-wrap" tabIndex={0} aria-label="config 2026 badge">
      {/* lanyard strap + clip */}
      <svg width="48" height="76" viewBox="0 0 48 76" style={{ display: 'block', margin: '0 auto' }} aria-hidden="true">
        <path d="M4 0 L44 0 L34 66 L14 66Z" fill="#0A0A0A" />
        <text x="28" y="8" fontSize="9" fill="#fff" transform="rotate(84 28 8)" letterSpacing=".4">config</text>
        <g fill="none" stroke="#fff" strokeWidth="1"><circle cx="14" cy="10" r="2.2" /><circle cx="18.4" cy="10" r="2.2" /><circle cx="14" cy="14.4" r="2.2" /><circle cx="18.4" cy="14.4" r="2.2" /></g>
        <rect x="10" y="64" width="28" height="12" fill="#D4D4D4" stroke="#9A9A9A" strokeWidth=".8" />
      </svg>

      <div className="badge">
        {/* front */}
        <div className="badge-face">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 8px 0' }}>
            <span style={{ background: '#0A0A0A', color: '#fff', fontSize: 19, padding: '2px 6px', letterSpacing: '-0.03em' }}>Config</span>
            <span style={{ background: '#0A0A0A', color: '#fff', fontSize: 19, padding: '2px 9px', borderRadius: 999, letterSpacing: '-0.03em' }}>2026</span>
          </div>

          <span style={{ position: 'absolute', top: 44, right: 7, background: BADGE.lime, fontSize: 7, padding: '3px 5px', transform: 'rotate(-4deg)', letterSpacing: '.04em' }}>
            SHE/HER
          </span>

          <svg className="badge-name" width="96" height="57" viewBox="0 0 112 66" role="img" aria-label="neel">
            <g stroke="#111" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path pathLength={1} d="M2 50 L8 50 L9 12 L27 48 L29 8" />
              <path pathLength={1} d="M41 9 L40 48 M41 9 L55 8 M40 28 L52 27 M40 48 L56 47" style={{ animationDelay: '.25s' }} />
              <path pathLength={1} d="M64 10 L63 48 M64 10 L77 9 M63 29 L75 28 M63 48 L78 47" style={{ animationDelay: '.5s' }} />
              <path pathLength={1} d="M88 3 L87 45 L104 45" style={{ animationDelay: '.75s' }} />
              <path pathLength={1} d="M86 62 L95 54 M92 62 L106 57" style={{ animationDelay: '.95s' }} />
            </g>
          </svg>

          {/* checkerboard base */}
          <div className="checker" />

          <Chip bg={BADGE.lilac} shape="wavy" rot={-2} style={{ left: -10, top: 118 }}>HERE 4 FUN</Chip>
          <Chip bg={BADGE.green} shape="wavy" rot={-6} style={{ left: 30, top: 114 }}>DESIGNER</Chip>
          <Chip bg={BADGE.blue} color="#fff" shape="wavy" rot={3} style={{ left: 66, top: 120 }}>DEVELOPER</Chip>
          <Chip bg={BADGE.lime} shape="burst" rot={10} style={{ left: 104, top: 128 }}>SINGER</Chip>
          <Chip bg={BADGE.green} shape="pill" rot={-6} style={{ left: 76, top: 158 }}>AMBIVERT</Chip>
        </div>

      </div>
    </div>
  )
}

// ─── Figma multiplayer cursor ─────────────────────────────────────────────────
function Cursor({ name, color, className }: { name: string; color: string; className: string }) {
  return (
    <div className={`fcursor ${className}`} aria-hidden="true">
      <svg width="18" height="20" viewBox="0 0 18 20">
        <path d="M1 1 L1 16 L5.5 12 L8.5 19 L11 18 L8 11 L14 11 Z" fill={color} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span style={{ background: color }}>{name}</span>
    </div>
  )
}

// ─── Selection frame (Figma) with live dimensions ─────────────────────────────
function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

// ─── Menu bar icons ───────────────────────────────────────────────────────────
export default function CrispContent() {
  const [showWins, setShowWins] = useState(false)
  const closeWins = useCallback(() => setShowWins(false), [])
  const [titleRef, titleSize] = useSize<HTMLHeadingElement>()
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `try{localStorage.setItem('portfolio-visited','true')}catch(e){}` }} />

      <style>{`
        :root { --gut: clamp(12px, 3.2vw, 56px); }
        .window { margin-top: max(var(--gut), env(safe-area-inset-top)) !important; margin-bottom: max(var(--gut), env(safe-area-inset-bottom)) !important; }
        body { background: #3F8BDF; }

        /* sky */
        .sky { position: fixed; inset: 0; z-index: 0; overflow: hidden; background: linear-gradient(180deg, #2C7AD6 0%, #4C96E5 55%, #7DB7EF 100%); }
        .cloud { position: absolute; top: -5%; bottom: -5%; left: 0; background-repeat: repeat; will-change: transform; }
        .cloud-a { width: calc(100% + 1600px); background-image: url(/crisp/clouds-a.webp); background-size: 1600px 800px; animation: drift-a 150s linear infinite; }
        .cloud-b { width: calc(100% + 1100px); background-image: url(/crisp/clouds-b.webp); background-size: 1100px 550px; background-position: 300px 120px; opacity: .7; animation: drift-b 240s linear infinite; }
        @keyframes drift-a { to { transform: translateX(-1600px); } }
        @keyframes drift-b { to { transform: translateX(-1100px); } }

        .cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 11px 24px;
          font-size: 17px;
          color: #0D0D0D;
          text-decoration: none;
          border-radius: 999px;
          transition: transform .12s, box-shadow .18s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          white-space: nowrap;
        }
        .cta-primary {
          background: linear-gradient(180deg, #E6EFFF 0%, #C8DBFF 100%);
          border: 1.5px solid #3D7BFF;
          box-shadow: inset 0 1px 0 #fff, 0 2px 8px rgba(61,123,255,0.18);
        }
        .cta-secondary {
          background: linear-gradient(180deg, #FFFFFF 0%, #EFEFEF 100%);
          border: 1.5px solid #C4C4C4;
          box-shadow: inset 0 1px 0 #fff, 0 2px 6px rgba(0,0,0,0.06);
        }
        .cta:hover { box-shadow: inset 0 1px 0 #fff, 0 4px 14px rgba(0,0,0,0.12); }
        .cta:active { transform: scale(0.97); }
        .cta:focus-visible, .egg-inner:focus-visible, .receipt-wrap:focus-visible, .badge-wrap:focus-visible {
          outline: 2px solid ${FIG.select}; outline-offset: 4px; border-radius: 8px;
        }

        .kao {
          position: absolute;
          font-size: 15px;
          color: #2A2A2A;
          font-family: ui-monospace, monospace;
          user-select: none;
          pointer-events: none;
          z-index: 5;
        }

        /* ── Eggs ── */
        .egg:hover, .egg:focus-within { z-index: 300 !important; }
        .egg-inner { position: relative; outline: none; }
        .sticker { filter: drop-shadow(0 10px 14px rgba(0,0,0,0.18)) drop-shadow(0 2px 3px rgba(0,0,0,0.12)); transition: transform .35s cubic-bezier(.3,1.6,.5,1); }
        .egg-inner:hover .sticker, .egg-inner:focus .sticker { transform: scale(1.05) rotate(-2deg); }

        .egg-note {
          position: absolute;
          font-family: var(--font-hand), cursive;
          font-size: 21px;
          line-height: 1.05;
          color: ${FIG.ink};
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity .2s, transform .3s cubic-bezier(.3,1.5,.5,1);
        }
        .egg-note-bottom { top: calc(100% + 6px); left: 50%; transform: translate(-50%, -6px) rotate(-3deg); }
        .egg-note-top    { bottom: calc(100% + 6px); left: 50%; transform: translate(-50%, 6px) rotate(-2deg); }
        .egg-note-right  { left: calc(100% + 10px); top: 50%; transform: translate(-6px, -50%) rotate(-3deg); }
        .egg-note-left   { right: calc(100% + 10px); top: 50%; transform: translate(6px, -50%) rotate(3deg); text-align: right; }
        .egg-inner:hover .egg-note, .egg-inner:focus .egg-note { opacity: 1; }
        .egg-inner:hover .egg-note-bottom, .egg-inner:focus .egg-note-bottom { transform: translate(-50%, 0) rotate(-3deg); }
        .egg-inner:hover .egg-note-top, .egg-inner:focus .egg-note-top { transform: translate(-50%, 0) rotate(-2deg); }
        .egg-inner:hover .egg-note-right, .egg-inner:focus .egg-note-right { transform: translate(0, -50%) rotate(-3deg); }
        .egg-inner:hover .egg-note-left, .egg-inner:focus .egg-note-left { transform: translate(0, -50%) rotate(3deg); }
        .egg-note u { text-decoration: none; background: linear-gradient(transparent 62%, ${FIG.yellow}88 62%); }

        /* sticker-specific motion */
        .note-float { opacity: 0; transform-box: fill-box; }
        .egg-inner:hover .note-float, .egg-inner:focus .note-float { animation: floatUp 1.6s ease-out infinite; }
        .note-float.d2 { animation-delay: .4s !important; }
        .note-float.d3 { animation-delay: .8s !important; }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(6px) rotate(0); }
          25% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-30px) rotate(18deg); }
        }

        /* photo objects */
        .obj { position: relative; }
        .obj-img { display: block; height: auto; user-select: none; -webkit-user-drag: none; pointer-events: none; }
        .notes { overflow: visible; pointer-events: none; }
        .sway { transform-origin: 50% 95%; }
        .egg-inner:hover .sway, .egg-inner:focus .sway { animation: sway .5s ease-in-out infinite alternate; }
        @keyframes sway { from { transform: rotate(-6deg); } to { transform: rotate(6deg); } }

        /* quilled minion */
        .qm { display: block; overflow: visible; }
        .egg-inner:hover .qm, .egg-inner:focus .qm { animation: qmHop .45s ease-in-out infinite alternate; }
        @keyframes qmHop { from { transform: translateY(0) rotate(-2deg); } to { transform: translateY(-7px) rotate(2deg); } }
        .qm-eye { transform-box: view-box; animation: qmLook 4s ease-in-out infinite; }
        .egg-inner:hover .qm-eye, .egg-inner:focus .qm-eye { animation-duration: 1.2s; }
        @keyframes qmLook { 0%, 30%, 100% { transform: translate(0, 0); } 40%, 55% { transform: translate(-4px, 1px); } 65%, 80% { transform: translate(4px, -1px); } }
        .qm-arm-r { transform-box: view-box; transform-origin: 92px 86px; }
        .egg-inner:hover .qm-arm-r, .egg-inner:focus .qm-arm-r { animation: qmWave .3s ease-in-out infinite alternate; }
        @keyframes qmWave { from { transform: rotate(-10deg); } to { transform: rotate(-80deg); } }
        .qm-hair { transform-box: view-box; transform-origin: 60px 17px; }
        .egg-inner:hover .qm-hair, .egg-inner:focus .qm-hair { animation: qmHair .25s ease-in-out infinite alternate; }
        @keyframes qmHair { to { transform: scaleY(1.18) rotate(4deg); } }
        .twirl { transition: transform .9s cubic-bezier(.2,.9,.3,1.2); }
        .egg-inner:hover .twirl, .egg-inner:focus .twirl { transform: rotate(-14deg) scale(1.04); }


        .tape { transition: transform .45s cubic-bezier(.3,1.5,.5,1); }
        .egg-inner:hover .tape, .egg-inner:focus .tape { transform: translate(6px, -46px) rotate(-8deg); }

        .pc-stack { position: relative; }
        .pc-back { position: absolute; inset: 0; transform: rotate(7deg) translate(7px, -3px); transition: transform .5s cubic-bezier(.3,1.4,.5,1); }
        .pc-front { position: relative; transition: transform .5s cubic-bezier(.3,1.4,.5,1); }
        .egg-inner:hover .pc-front, .egg-inner:focus .pc-front { transform: translate(-34px, 8px) rotate(-10deg); }
        .egg-inner:hover .pc-back, .egg-inner:focus .pc-back { transform: translate(38px, -10px) rotate(9deg); }
        .pc-back .postcard { box-shadow: 0 6px 14px rgba(0,0,0,.12); }
        .postcard { position: relative; background: #FBF8F1; padding: 5px 5px 18px; box-shadow: 0 1px 0 rgba(0,0,0,.04); }
        .pc-photo { filter: saturate(.8) sepia(.12); transition: filter .5s, transform .8s cubic-bezier(.2,.9,.3,1); }
        .egg-inner:hover .pc-photo, .egg-inner:focus .pc-photo { filter: none; transform: scale(1.08); }

        .slide {
          position: relative; width: 204px; height: 64px; display: flex; align-items: center; gap: 8px; padding: 0 6px 0 10px;
          border-radius: 3px; border: 1px solid rgba(150,180,190,.75);
          background: linear-gradient(135deg, rgba(255,255,255,.82), rgba(214,232,238,.6));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.95), inset 0 -2px 0 rgba(120,150,160,.2);
          overflow: hidden;
        }
        .slide::after { content: ''; position: absolute; inset: 0; background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,.7) 40%, transparent 48%); pointer-events: none; transition: transform .8s; }
        .egg-inner:hover .slide::after, .egg-inner:focus .slide::after { transform: translateX(60%); }
        .slide-window { position: relative; width: 118px; height: 46px; overflow: hidden; border: 1px solid rgba(140,170,180,.55); background: radial-gradient(ellipse at center, rgba(162,89,255,.16), rgba(162,89,255,.03) 70%); }
        .helix { display: block; margin-top: 2px; animation: helix 4s linear infinite; }
        .egg-inner:hover .helix, .egg-inner:focus .helix { animation-duration: 1.1s; }
        @keyframes helix { to { transform: translateX(-36px); } }
        .slide-label { flex: 1; align-self: stretch; margin: 5px 0; display: flex; flex-direction: column; justify-content: center; text-align: left; padding-left: 6px;
          background: repeating-linear-gradient(45deg, #EEEEEA 0 2px, #F6F6F2 2px 4px); border-radius: 1px; }
        .slide-name { font-family: var(--font-hand), cursive; font-size: 17px; line-height: 1; color: #2A2A2A; font-weight: 700; }
        .slide-meta { font-size: 8px; letter-spacing: .08em; color: #777; margin-top: 2px; }
        .egg-link, .rc-link { color: #2F6BFF; text-decoration: none; border-bottom: 1px dashed rgba(47,107,255,.5); cursor: pointer; }
        .egg-link { display: inline-block; margin-top: 8px; font-size: 12px; }
        .egg-link:hover, .rc-link:hover { border-bottom-style: solid; }


        /* recognition widget — fanned stack of the three proof cards */
        .rc-widget { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 0; border: 0; background: none; cursor: pointer; font: inherit; color: #111; }
        .rc-widget:focus-visible { outline: 2px solid ${FIG.select}; outline-offset: 6px; border-radius: 14px; }
        .rc-fan { position: relative; display: block; width: 210px; height: 118px; }
        .rc-thumb {
          position: absolute; left: 50%; top: 10px; width: 96px; height: 96px; margin-left: -48px;
          border-radius: 12px; overflow: hidden; border: 3px solid #fff;
          box-shadow: 0 12px 22px -10px rgba(0,0,0,.35), 0 1px 3px rgba(0,0,0,.12);
          transform: translateX(calc(var(--i) * 40px)) rotate(calc(var(--i) * 11deg)) translateY(calc(var(--i) * var(--i) * 6px));
          transition: transform .45s cubic-bezier(.3,1.5,.5,1);
        }
        .rc-thumb:nth-child(2) { z-index: 2; }
        .rc-thumb img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .rc-widget:hover .rc-thumb, .rc-widget:focus-visible .rc-thumb { transform: translateX(calc(var(--i) * 62px)) rotate(calc(var(--i) * 16deg)) translateY(calc(var(--i) * var(--i) * 10px - 8px)); }
        .rc-w-label { font-family: var(--font-hand), cursive; font-size: 18px; line-height: 1; color: ${FIG.ink}; transform: rotate(-2deg); transition: transform .3s cubic-bezier(.3,1.6,.5,1); }
        .rc-arrow { font-size: 13px; vertical-align: 2px; }
        .rc-widget:hover .rc-w-label { transform: rotate(-4deg) scale(1.06); }

        /* recognition popup */
        .rc-overlay { position: fixed; inset: 0; z-index: 2000; display: grid; place-items: center; padding: 24px; overflow-y: auto;
          background: rgba(20,30,60,.45); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); animation: fadeIn .25s ease both; }
        @keyframes fadeIn { from { opacity: 0; } }
        .rc-confetti { position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 3; }
        .rc-panel { position: relative; z-index: 2; width: min(1080px, 100%); padding: 28px 32px 40px; border-radius: 26px;
          background: #F6F6F6 radial-gradient(#CFCFCF 1.1px, transparent 1.3px) 0 0 / 26px 26px;
          box-shadow: 0 40px 100px -30px rgba(0,0,0,.5); animation: panelIn .55s cubic-bezier(.3,1.5,.5,1) both; }
        @keyframes panelIn { from { opacity: 0; transform: scale(.6) rotate(-4deg); } }
        .rc-close { position: absolute; top: 14px; right: 14px; width: 36px; height: 36px; border-radius: 50%; border: 0; background: #fff; font-size: 22px; line-height: 1; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,.12); transition: transform .2s; }
        .rc-close:hover { transform: rotate(90deg); }
        .rc-close:focus-visible { outline: 2px solid ${FIG.select}; outline-offset: 2px; }
        .rc-head { display: flex; align-items: center; gap: 14px; }
        .rc-head h2 { margin: 0; font-family: var(--font-hand), cursive; font-weight: 700; font-size: clamp(34px, 4.4vw, 56px); line-height: 1; color: #111; transform: rotate(-2deg); transform-origin: left; }
        .rc-head h2 span { color: ${FIG.purple}; display: inline-block; animation: spin 4s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .rc-head p { margin: 6px 0 0; font-size: 14px; color: #6B6B6B; }
        .rc-swipe { display: none; margin: 10px 18px 0; font-family: var(--font-hand), cursive; font-size: 18px; color: ${FIG.ink}; }
        .rc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 32px; margin-top: 84px; }
        .rc-win { position: relative; margin: 0; transform: rotate(var(--rot)); animation: winIn .7s cubic-bezier(.3,1.4,.5,1) both; transition: transform .35s cubic-bezier(.3,1.4,.5,1); }
        .rc-win:hover { transform: rotate(0) scale(1.04); z-index: 2; }
        @keyframes winIn { from { opacity: 0; transform: translateY(-120px) rotate(-18deg) scale(.7); } }
        .rc-win .stamp-note { left: 10px; bottom: calc(100% - 12px); font-size: 21px; padding: 16px 22px; }
        .rc-win:hover .stamp-note { transform: rotate(-4deg) scale(1.05); }
        .win-card { border-radius: 14px; overflow: hidden; box-shadow: 0 24px 50px -24px rgba(0,0,0,.35), 0 2px 6px rgba(0,0,0,.08); }
        .win-card img { display: block; width: 100%; height: auto; }

        /* dancing cats (GIF in a white sticker card) */
        .cat-spot { position: fixed; bottom: 3vh; z-index: 1; width: clamp(80px, 9vw, 130px); pointer-events: none; animation: catIn .6s cubic-bezier(.3,1.8,.5,1) .3s both; }
        .cat-spot-l { left: 3vw; }
        .cat-spot-r { right: 3vw; }
        @keyframes catIn { from { opacity: 0; transform: scale(0) rotate(-40deg); } }
        .dancer { display: block; width: 100%; height: auto; filter: drop-shadow(0 12px 14px rgba(0,0,0,.3)); }

        .stamp-note {
          --r: 4px;
          position: absolute; z-index: 1;
          padding: 22px 28px; background: #fff;
          font-family: var(--font-hand), cursive; font-size: 24px; line-height: 1.1; color: #1E1E1E;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,.08));
          -webkit-mask:
            radial-gradient(circle var(--r) at 50% 0, #0000 98%, #000) 0 0 / 12px 100% repeat-x,
            radial-gradient(circle var(--r) at 50% 100%, #0000 98%, #000) 0 0 / 12px 100% repeat-x,
            radial-gradient(circle var(--r) at 0 50%, #0000 98%, #000) 0 0 / 100% 12px repeat-y,
            radial-gradient(circle var(--r) at 100% 50%, #0000 98%, #000) 0 0 / 100% 12px repeat-y;
          -webkit-mask-composite: source-in, source-in, source-in;
          mask:
            radial-gradient(circle var(--r) at 50% 0, #0000 98%, #000) 0 0 / 12px 100% repeat-x,
            radial-gradient(circle var(--r) at 50% 100%, #0000 98%, #000) 0 0 / 12px 100% repeat-x,
            radial-gradient(circle var(--r) at 0 50%, #0000 98%, #000) 0 0 / 100% 12px repeat-y,
            radial-gradient(circle var(--r) at 100% 50%, #0000 98%, #000) 0 0 / 100% 12px repeat-y;
          mask-composite: intersect;
          transition: transform .35s cubic-bezier(.3,1.6,.5,1);
          white-space: nowrap;
        }

        /* receipt */
        .receipt-wrap { position: relative; outline: none; filter: drop-shadow(0 10px 14px rgba(0,0,0,0.14)) drop-shadow(0 1px 2px rgba(0,0,0,0.1)); transition: transform .35s cubic-bezier(.3,1.5,.5,1); }
        .receipt-wrap:hover, .receipt-wrap:focus { transform: translateY(-4px) rotate(1.5deg); }
        .receipt {
          width: 176px; padding: 16px 13px 14px;
          background: linear-gradient(180deg, #FFFFFF 0%, #F7F6F1 100%);
          font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 10px; line-height: 1.6; color: #2A2A2A;
          animation: printOut 1.4s steps(18) .3s both;
        }
        @keyframes printOut { from { clip-path: inset(0 0 100% 0); } }
        .rc-rule { border-top: 1.5px dashed #9A9A9A; margin: 6px 0; }
        .rc-row { display: flex; align-items: baseline; gap: 4px; }
        .rc-dots { flex: 1; border-bottom: 1px dotted #B4B4B4; transform: translateY(-3px); }
        .rc-stamp {
          position: absolute; right: 12px; bottom: 30px; padding: 3px 7px;
          font: 700 15px/1 ui-monospace, Menlo, monospace; letter-spacing: .06em;
          color: ${FIG.red}; border: 2.5px solid ${FIG.red}; border-radius: 4px;
          mix-blend-mode: multiply; opacity: 0; transform: rotate(-14deg) scale(1.8);
          transition: opacity .15s, transform .25s cubic-bezier(.3,1.6,.5,1);
          pointer-events: none;
        }
        .receipt-wrap:hover .rc-stamp, .receipt-wrap:focus .rc-stamp { opacity: .85; transform: rotate(-14deg) scale(1); }

        /* config badge */
        .badge-wrap { outline: none; transform-origin: 50% 0; animation: swing 4s ease-in-out infinite; cursor: pointer; }
        .badge-wrap:hover, .badge-wrap:focus { animation-duration: 1.4s; }
        @keyframes swing { 0%,100% { transform: rotate(3deg); } 50% { transform: rotate(-3deg); } }
        .badge { position: relative; width: 148px; height: 206px; margin-top: -2px; perspective: 800px; }
        .badge-face {
          position: absolute; inset: 0;
          background: #fff; border: 1px solid #3A3A3A; overflow: hidden;
          box-shadow: 0 18px 34px -14px rgba(0,0,0,0.35);
          backface-visibility: hidden;
          transition: transform .7s cubic-bezier(.3,1.3,.5,1);
          display: flex; flex-direction: column; justify-content: space-between;
          font-family: 'Neue Montreal', sans-serif;
        }
        .badge-name { position: absolute; top: 52px; left: 14px; transform: rotate(-3deg); }
        .badge-name path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw .5s ease-out forwards; }
        @keyframes draw { to { stroke-dashoffset: 0; } }
        .checker {
          position: absolute; left: 0; right: 0; bottom: 0; height: 66px;
          background: repeating-conic-gradient(${BADGE.orange} 0 25%, ${BADGE.lime} 0 50%) 0 0 / 52px 30px;
        }
        .chip { font-size: 7.5px; letter-spacing: .05em; white-space: nowrap; line-height: 1; transition: transform .35s cubic-bezier(.3,1.6,.5,1); }

        /* selection frame */
        .sel { position: absolute; inset: -10px -14px; border: 1.5px solid ${FIG.select}; pointer-events: none; }
        .sel i { position: absolute; width: 8px; height: 8px; background: #fff; border: 1.5px solid ${FIG.select}; }
        .sel i:nth-child(1) { left: -5px; top: -5px; } .sel i:nth-child(2) { right: -5px; top: -5px; }
        .sel i:nth-child(3) { left: -5px; bottom: -5px; } .sel i:nth-child(4) { right: -5px; bottom: -5px; }
        .sel-name { position: absolute; left: -1px; top: -22px; font-size: 11px; color: ${FIG.select}; white-space: nowrap; }
        .sel-dim { position: absolute; left: 50%; bottom: -26px; transform: translateX(-50%); font-size: 10px; color: #fff; background: ${FIG.select}; padding: 2px 6px; border-radius: 3px; white-space: nowrap; font-variant-numeric: tabular-nums; }

        /* multiplayer cursors */
        .fcursor { position: absolute; left: 0; top: 0; z-index: 250; pointer-events: none; display: flex; align-items: flex-start; }
        .fcursor span { margin: 14px 0 0 -4px; padding: 3px 7px; border-radius: 4px 10px 10px 10px; color: #fff; font-size: 11px; white-space: nowrap; }
        .cur-a { animation: curA 22s ease-in-out infinite; }
        .cur-b { animation: curB 27s ease-in-out infinite; }
        @keyframes curA {
          0%,100% { transform: translate(34vw, 22vh); }
          25% { transform: translate(40vw, 64vh); }
          50% { transform: translate(62vw, 30vh); }
          75% { transform: translate(28vw, 46vh); }
        }
        @keyframes curB {
          0%,100% { transform: translate(70vw, 70vh); }
          30% { transform: translate(58vw, 20vh); }
          60% { transform: translate(36vw, 78vh); }
        }

        /* comment pin */
        .pin { position: absolute; z-index: 120; display: flex; align-items: center; gap: 8px; background: #fff; border-radius: 18px 18px 18px 4px; padding: 4px; box-shadow: 0 6px 18px rgba(0,0,0,0.14); max-width: 32px; overflow: hidden; transition: max-width .4s cubic-bezier(.3,1.2,.5,1), padding .3s; cursor: default; outline: none; }
        .pin:hover, .pin:focus { max-width: 260px; padding-right: 14px; }
        .pin-av { flex: none; width: 24px; height: 24px; border-radius: 50%; background: ${FIG.purple}; color: #fff; font-size: 12px; display: grid; place-items: center; }
        .pin p { margin: 0; font-size: 12px; color: #222; white-space: nowrap; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition-duration: .01ms !important; }
          .badge-name path { stroke-dashoffset: 0; }
        }

        /* ── Mobile: compact one-fold ── */
        .touch-hint { display: none; }

        /* ── Phones: a composed one-screen layout (items are scaled with the scale property, which Drag compensates for) ── */
        @media (max-width: 760px) {
          .hide-mobile { display: none !important; }
          .window { min-height: 600px !important; }

          /* top band: badge hanging top-left, bragging widget top-right, mic tucked under it */
          .pos-badge    { left: 16px !important; top: -6px !important; scale: .56; transform-origin: top left; }
          .pos-rc       { left: auto !important; right: 6px; top: 14px !important; scale: .66; transform-origin: top right; }
          .pos-mic      { left: auto !important; right: 26%; top: 17% !important; scale: .5; transform-origin: top left; }

          /* centre: name + CTAs */
          .center-text  { top: 41% !important; width: calc(100% - 28px) !important; }
          .title-huge   { font-size: clamp(32px, 9.4vw, 42px) !important; }
          .center-text p:first-of-type { margin: 14px 0 16px !important; font-size: 15px !important; }
          .cta { font-size: 15px; padding: 11px 20px; min-height: 44px; touch-action: manipulation; }
          .touch-hint { display: block; margin: 10px 0 0; font-family: var(--font-hand), cursive; font-size: 17px; color: ${FIG.ink}; }

          /* bottom collage */
          .pos-stats    { left: 3% !important;  top: 59% !important; scale: .6;  transform-origin: top left; }
          .pos-quill    { left: 35% !important; top: 61% !important; scale: .5;  transform-origin: top left; }
          .pos-mountain { left: auto !important; right: 3%; top: 60% !important; scale: .83; transform-origin: top right; }
          .pos-vinyl    { left: 34% !important; top: 77% !important; scale: .52; transform-origin: top left; }
          .pos-tal      { left: auto !important; right: 2%; top: 80% !important; scale: .58; transform-origin: top right; }

          /* tap notes: stack under the object, wrap, never run off-screen */
          .egg-note { font-size: 22px; white-space: normal; width: max-content; max-width: 240px; text-align: center; background: #fff; padding: 8px 14px 10px; border-radius: 14px; box-shadow: 0 10px 24px -8px rgba(0,0,0,.28), 0 0 0 1px rgba(0,0,0,.04); }
          .egg-note-left, .egg-note-right { left: 50%; right: auto; top: calc(100% + 6px); transform: translate(-50%, -6px) rotate(-3deg); }
          .egg-inner:focus .egg-note-left, .egg-inner:focus .egg-note-right { transform: translate(-50%, 0) rotate(-3deg); }
          .pos-tal .egg-note, .pos-mountain .egg-note, .pos-vinyl .egg-note { left: auto; right: 0; transform: rotate(-3deg); text-align: right; }
          .pos-tal .egg-note-left, .pos-mountain .egg-note-top { top: auto; bottom: calc(100% + 6px); }

          /* popup: swipeable carousel instead of a long stack */
          .rc-overlay { padding: 12px; }
          .rc-panel { padding: 20px 0 24px; border-radius: 22px; }
          .rc-head { padding: 0 52px 0 18px; }
          .rc-head h2 { font-size: 34px; }
          .rc-head p { font-size: 12px; }
          .rc-grid { display: flex; gap: 18px; margin-top: 0; padding: 74px 18px 8px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
          .rc-grid::-webkit-scrollbar { display: none; }
          .rc-win { flex: 0 0 76%; scroll-snap-align: center; }
          .rc-win .stamp-note { font-size: 18px; padding: 12px 16px; }
          .rc-swipe { display: block; }
          .cat-spot { width: 72px; bottom: max(10px, env(safe-area-inset-bottom)); z-index: 4; }
          .rc-close { width: 40px; height: 40px; }
        }

        /* tall phones (iPhone 14/15/Pro Max, Pixels): fill the extra height with bigger objects */
        @media (max-width: 760px) and (min-height: 780px) {
          .pos-stats    { top: 58% !important; scale: .7; }
          .pos-quill    { top: 60% !important; left: 36% !important; scale: .56; }
          .pos-mountain { top: 59% !important; scale: .97; }
          .pos-vinyl    { top: 76% !important; scale: .62; left: 32% !important; }
          .pos-tal      { top: 81% !important; scale: .66; }
          .pos-mic      { top: 18% !important; scale: .56; }
        }

        /* very short phones (iPhone SE / landscape-ish): tighten the centre */
        @media (max-width: 760px) and (max-height: 700px) {
          .center-text { top: 40% !important; }
          .title-huge { font-size: clamp(30px, 9vw, 38px) !important; }
          .touch-hint { display: none; }
          .pos-vinyl { top: 78% !important; scale: .46; }
          .pos-tal { top: 82% !important; scale: .52; }
          .pos-mic { top: 14% !important; right: 30%; scale: .44; }
        }
      `}</style>

      {/* ═══════ SKY with drifting clouds (fixed, behind everything) ═══════ */}
      <div className="sky" aria-hidden="true">
        <div className="cloud cloud-b" />
        <div className="cloud cloud-a" />
      </div>

      {/* ═══════ DESKTOP CANVAS — a rounded window floating on the sky ═══════ */}
      <main
        className="window"
        style={{
          position: 'relative',
          zIndex: 1,
          height: 'calc(100svh - max(var(--gut), env(safe-area-inset-top)) - max(var(--gut), env(safe-area-inset-bottom)))',
          minHeight: 600,
          margin: 'var(--gut)',
          borderRadius: 22,
          boxShadow: '0 30px 80px -30px rgba(10,40,90,.55), 0 0 0 1px rgba(255,255,255,.5)',
          background: '#F6F6F6',
          backgroundImage: 'radial-gradient(#CFCFCF 1.1px, transparent 1.3px)',
          backgroundSize: '26px 26px',
          overflow: 'hidden',
          fontFamily: "'Neue Montreal','Helvetica Neue',Arial,sans-serif",
          WebkitFontSmoothing: 'antialiased',
          color: '#0A0A0A',
        }}
      >
        <div style={{ position: 'relative', height: '100%' }}>

          {/* ═══════ Multiplayer cursors ═══════ */}
          <Cursor name="neelakshi" color={FIG.purple} className="cur-a hide-mobile" />
          <Cursor name="you?" color={FIG.green} className="cur-b hide-mobile" />

          {/* ═══════ KAOMOJI ═══════ */}
          <span className="kao hide-mobile" style={{ top: '24%', left: '31%' }}>{`^ ω ^`}</span>
          <span className="kao hide-mobile" style={{ top: '74%', right: '30%' }}>{`¯\\_(ツ)_/¯`}</span>
          <span className="kao hide-mobile" style={{ top: '62%', left: '28%' }}>{`(¬_¬)`}</span>
          <span className="kao hide-mobile" style={{ top: '52%', right: '22%' }}>{`{ ^-^ }`}</span>

          {/* ═══════ LEFT ═══════ */}

          {/* Singing */}
          <Egg x="17%" y="24%" rot={-6} className="pos-mic" side="bottom" label="microphone — about singing"
            note={<>i <u>sing</u>!<br />ask me for a song</>}>
            <MicPhoto />
          </Egg>

          {/* Quilling */}
          <Egg x="6%" y="40%" rot={-4} className="pos-quill" side="right" label="a minion made with paper quilling"
            note={<>i do <u>paper quilling</u>!</>}>
            <QuilledMinion />
          </Egg>

          {/* vectordrop stats receipt */}
          <Drag x="13%" y="56%" rot={-3} z={14} className="pos-stats">
            <Receipt />
          </Drag>

          {/* Mountains */}
          <Egg x="40%" y="78%" rot={-5} className="pos-mountain" side="top" label="mountain postcards — two of my photos"
            note={<>happiest in the <u>mountains</u></>}>
            <MountainPostcard />
          </Egg>

          {/* ═══════ RIGHT ═══════ */}

          {/* Music */}
          <Egg x="calc(100% - 190px)" y="46%" rot={0} className="pos-vinyl" side="left" label="cassette walkman — music"
            note={<>music on,<br /><u>always</u></>}>
            <WalkmanPhoto />
          </Egg>

          {/* Talindrew */}
          <Egg x="calc(100% - 330px)" y="76%" rot={-4} className="pos-tal" side="left" label="talindrew — microscope slide"
            note={TALINDREW_NOTE}>
            <MicroscopeSlide />
          </Egg>

          {/* ═══════ Config badge hanging from the top edge ═══════ */}
          <div className="pos-badge" style={{ position: 'absolute', top: -6, left: 'calc(100% - 300px)', zIndex: 110 }}>
            <ConfigBadge />
          </div>

          {/* ═══════ CENTER SPINE ═══════ */}
          <div
            className="center-text"
            style={{
              position: 'absolute',
              top: '54%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(640px, 72vw)',
              textAlign: 'center',
              zIndex: 100,
            }}
          >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <h1
                ref={titleRef}
                className="title-huge"
                style={{
                  fontSize: 'clamp(34px, 5.6vw, 80px)',
                  lineHeight: 0.95,
                  fontWeight: 500,
                  letterSpacing: '-0.045em',
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                bello! I&apos;m neelakshi
              </h1>
              <div className="sel hide-mobile" aria-hidden="true">
                <i /><i /><i /><i />
                <span className="sel-name"># hello-config</span>
                {titleSize && (
                  <span className="sel-dim">{Math.round(titleSize.w)} × {Math.round(titleSize.h)}</span>
                )}
              </div>
            </div>

            <p style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', color: '#1A1A1A', margin: '38px 0 22px', lineHeight: 1.3 }}>
              a design engineer fluent in ai, design and the web
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <a href="/playground" className="cta cta-primary">
                see my work
              </a>
              <a href="mailto:dasneelakshi01@gmail.com" className="cta cta-secondary">
                email me
              </a>
            </div>

            <p style={{ fontSize: 13, color: '#9A9A9A', margin: '12px 0 0', lineHeight: 1.4 }}>
              currently at{' '}
              <a href="https://oleria.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2F6BFF', textDecoration: 'none' }}>@oleria</a>
              {' '}· prev{' '}
              <a href="https://cosx.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#9A9A9A', textDecoration: 'none' }}>@cosx.ai</a>
            </p>
            <p className="touch-hint">tap &amp; drag the little things ✦</p>
          </div>

          {/* Recognition corner widget */}
          <div className="pos-rc" style={{ position: 'absolute', left: '36%', top: '5%', zIndex: 120 }}>
            <RecognitionWidget onOpen={() => setShowWins(true)} />
          </div>

          {/* FigJam comment pin */}
          <div className="pin hide-mobile" tabIndex={0} style={{ left: 'calc(50% + 250px)', top: '60%' }} aria-label="comment from neelakshi">
            <span className="pin-av">N</span>
            <p>find me at config — let&apos;s talk design × code</p>
          </div>

        </div>
      </main>

      {showWins && <RecognitionModal onClose={closeWins} />}

    </>
  )
}
