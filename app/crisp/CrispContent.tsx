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

const TALINDREW_NOTE = <>a <u>dna/rna</u> visualiser ✦</>

// ─── Kaomoji: bobs gently and flips through a few expressions ─────────────────
function Kao({ frames, delay }: { frames: string[]; delay: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t: ReturnType<typeof setInterval>
    const start = setTimeout(() => { t = setInterval(() => setI((n) => (n + 1) % frames.length), 900) }, delay * 1000)
    return () => { clearTimeout(start); clearInterval(t) }
  }, [frames.length, delay])
  return <span className="kao" style={{ animationDelay: `${-delay}s` }}>{frames[i]}</span>
}

// ─── Pointer-capture drag ─────────────────────────────────────────────────────
function Drag({
  children, x, y, rot = 0, z = 10, className, onTap,
}: {
  children: React.ReactNode
  x: string
  y: string
  rot?: number
  z?: number
  className?: string
  onTap?: () => void // fired on pointer-up when the pointer barely moved (capture swallows child clicks)
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
        const st = s.current
        if (st.drag && onTap && Math.hypot(st.cx - st.ox, st.cy - st.oy) < 4) onTap()
        st.drag = false
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
  x, y, rot = 0, z = 12, className = '', note, side = 'bottom', label, onTap, children,
}: {
  x: string
  y: string
  rot?: number
  z?: number
  className?: string
  note: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  label: string
  onTap?: () => void
  children: React.ReactNode
}) {
  return (
    <Drag x={x} y={y} rot={rot} z={z} className={`egg ${className}`} onTap={onTap}>
      <div
        className="egg-inner"
        tabIndex={0}
        aria-label={label}
        role={onTap ? 'button' : undefined}
        onKeyDown={onTap ? (e) => {
          if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onTap() }
        } : undefined}
      >
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

// ─── Singing: Jigglypuff with a mic (Tenor gif, background cut out, saved locally) ──
function MusicNotes() {
  return (
    <svg className="notes" width="60" height="70" viewBox="0 0 60 70" aria-hidden="true">
      <text className="note-float" x="30" y="40" fill={FIG.orange} fontSize="22">♪</text>
      <text className="note-float d2" x="40" y="62" fill={FIG.blue} fontSize="18">♫</text>
      <text className="note-float d3" x="8" y="50" fill={FIG.green} fontSize="20">♪</text>
    </svg>
  )
}

function SingingPuff() {
  return (
    <div className="obj" style={{ width: 96, height: 110 }}>
      <Image src="/crisp/jigglypuff.webp" alt="jigglypuff singing into a mic" width={96} height={110} className="obj-img sway" unoptimized />
      <span style={{ position: 'absolute', top: -34, left: 66 }}><MusicNotes /></span>
    </div>
  )
}

// ─── Record player + CD stack ────────────────────────────────────────────────
// Covers saved locally; audio is Apple's official 30-second iTunes preview for each track.
// `sky` = top / middle / horizon colours the background fades to while that cd spins.
const CDS = [
  { id: 'lover', title: 'lover', artist: 'taylor swift', cover: '/crisp/cds/lover.jpg', itunes: 1468058173,
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e0/db/47/e0db47b0-7f70-0631-0414-cd4777d2fb3e/mzaf_6362891154838442638.plus.aac.p.m4a',
    sky: ['#F29BC6', '#C8B4F2', '#A8D3F6'] as const },
  { id: 'yellow', title: 'yellow', artist: 'coldplay', cover: '/crisp/cds/yellow.jpg', itunes: 1122782283,
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/66/f3/1a/66f31a76-a6ed-cb4c-f353-23310a7ae9a8/mzaf_10593596652344378873.plus.aac.p.m4a',
    sky: ['#E89A1C', '#F5C543', '#FBE7A0'] as const },
  { id: 'sunshine', title: 'pocketful of sunshine', artist: 'natasha bedingfield', cover: '/crisp/cds/sunshine.jpg', itunes: 1429194116,
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ed/5e/e5/ed5ee543-0a02-c0f2-3d55-611fd7a29864/mzaf_9524300124207831673.plus.aac.p.m4a',
    sky: ['#2FA8F0', '#86D3F7', '#FFF0B3'] as const },
  { id: 'mystery', title: 'mystery of love', artist: 'sufjan stevens', cover: '/crisp/cds/mystery.jpg', itunes: 1318981699,
    preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/73/5f/3d/735f3ddf-b063-1f18-db94-ab20e888edb3/mzaf_16854351342495465745.plus.aac.p.m4a',
    sky: ['#5D8DC0', '#B399C3', '#E89A95'] as const },
]
type Cd = (typeof CDS)[number]
const DEFAULT_SKY = ['#2C7AD6', '#4C96E5', '#7DB7EF'] as const

// tint the sky (and the phone's browser chrome) to the song that's spinning
function useSongSky(sky: readonly string[] | null, scene: string | null) {
  // scene = cd id; some songs get extra scenery in the sky (see .scene-* styles)
  useEffect(() => {
    if (scene) document.documentElement.dataset.song = scene
    else delete document.documentElement.dataset.song
  }, [scene])
  useEffect(() => {
    const [a, b, c] = sky ?? DEFAULT_SKY
    const root = document.documentElement.style
    root.setProperty('--sky-a', a)
    root.setProperty('--sky-b', b)
    root.setProperty('--sky-c', c)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', sky ? a : '#3F8BDF')
  }, [sky])
  useEffect(() => () => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#3F8BDF')
    delete document.documentElement.dataset.song
  }, [])
}

// groove arcs in two opposite quadrants, like the flat record illustration
function grooves(cx: number, cy: number) {
  const arcs: string[] = []
  for (let r = 30; r <= 64; r += 5.5) {
    arcs.push(`M${cx} ${cy - r}A${r} ${r} 0 0 1 ${cx + r} ${cy}`)
    arcs.push(`M${cx} ${cy + r}A${r} ${r} 0 0 1 ${cx - r} ${cy}`)
  }
  return arcs.join('')
}

function Turntable({ cd, playing }: { cd: Cd | null; playing: boolean }) {
  return (
    <svg className={`tt${playing ? ' playing' : ''}`} width="200" height="145" viewBox="0 0 220 160" aria-hidden="true">
      <defs>
        <clipPath id="tt-label"><circle cx="88" cy="80" r="23" /></clipPath>
        <path id="tt-curve" d="M88 80m-15 0a15 15 0 1 1 30 0a15 15 0 1 1 -30 0" />
      </defs>
      {/* plinth */}
      <rect x="30" y="22" width="184" height="128" rx="9" fill="#8E1620" />
      <rect x="30" y="14" width="184" height="128" rx="9" fill="#C8232E" />
      <rect x="160" y="148" width="22" height="6" rx="1.5" fill="#2B2626" />
      <rect x="186" y="148" width="22" height="6" rx="1.5" fill="#2B2626" />
      <circle cx="202" cy="104" r="6.5" fill="#2B2626" />
      <circle cx="202" cy="124" r="6.5" fill="#2B2626" />
      {/* record */}
      <g className="tt-record">
        <circle cx="88" cy="80" r="72" fill="#141111" />
        <path d={grooves(88, 80)} fill="none" stroke="#332E2E" strokeWidth="2.6" strokeLinecap="round" />
        {cd ? (
          <image href={cd.cover} x="65" y="57" width="46" height="46" clipPath="url(#tt-label)" preserveAspectRatio="xMidYMid slice" />
        ) : (
          <>
            <circle cx="88" cy="80" r="23" fill="#FF8A00" />
            <text fontSize="8.2" fontWeight="800" fill="#fff" letterSpacing="1.2" fontFamily="system-ui, sans-serif">
              <textPath href="#tt-curve">NEELAKSHI · MIXTAPE ·</textPath>
            </text>
          </>
        )}
        <circle cx="88" cy="80" r="2.6" fill="#141111" />
      </g>
      {/* tonearm, drawn in the playing position; rotated off the record at rest */}
      <g className="tt-arm">
        <path d="M188 38 L188 64 Q190 116 150 134" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <rect x="132" y="128" width="20" height="11" rx="2" fill="#A8A49C" transform="rotate(-24 142 133)" />
        <circle cx="188" cy="38" r="14" fill="#2B2626" />
        <circle cx="188" cy="38" r="6" fill="#141111" />
      </g>
    </svg>
  )
}

function MusicCorner() {
  const [open, setOpen] = useState(false)
  const [cd, setCd] = useState<Cd | null>(null)
  const [playing, setPlaying] = useState(false)
  const audio = useRef<HTMLAudioElement | null>(null)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => () => audio.current?.pause(), [])

  // close the stack on outside tap / Esc
  useEffect(() => {
    if (!open) return
    const away = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc) }
  }, [open])

  const stop = () => { audio.current?.pause(); setPlaying(false) }

  const spin = (next: Cd) => {
    setOpen(false)
    if (cd?.id === next.id && playing) return stop()
    audio.current?.pause()
    const a = new Audio(next.preview)
    a.volume = 0.7
    a.onended = () => setPlaying(false)
    // preview links can rotate; ask iTunes for a fresh one if the saved link dies
    a.onerror = async () => {
      try {
        const res = await fetch(`https://itunes.apple.com/lookup?id=${next.itunes}&country=us`)
        const url = (await res.json()).results?.[0]?.previewUrl
        if (url && audio.current === a) { a.src = url; await a.play() }
      } catch { setPlaying(false) }
    }
    audio.current = a
    a.play().catch(() => {})
    setCd(next)
    setPlaying(true)
  }

  useSongSky(playing && cd ? cd.sky : null, playing && cd ? cd.id : null)

  const note = playing && cd
    ? <>now spinning:<br /><u>{cd.title}</u> ♪</>
    : <>music on, <u>always</u><br />tap for my cds</>

  return (
    <Egg x="calc(100% - 250px)" y="46%" rot={0} z={open ? 300 : 12} className={`pos-vinyl${open ? ' crate-open' : ''}`} side="left"
      label={playing && cd ? `record player — playing ${cd.title} by ${cd.artist}, press to stop` : 'record player — press to pick a cd'}
      onTap={() => (playing ? stop() : setOpen((o) => !o))}
      note={note}>
      <div ref={root} className="obj">
        <div className="crate" role="group" aria-label="cd stack" aria-hidden={!open}>
          {CDS.map((c, i) => (
            <button
              key={c.id}
              className={`cd${cd?.id === c.id ? ' on' : ''}`}
              style={{ '--i': i, '--r': `${(i - (CDS.length - 1) / 2) * 4}deg` } as React.CSSProperties}
              tabIndex={open ? 0 : -1}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => spin(c)}
              aria-label={`play ${c.title} by ${c.artist}`}
            >
              <span className="cd-disc" />
              <span className="cd-case">
                <Image src={c.cover} alt="" width={64} height={64} className="obj-img" style={{ width: 64, height: 64 }} />
              </span>
              <span className="cd-title">{c.title}</span>
            </button>
          ))}
        </div>
        <Turntable cd={cd} playing={playing} />
      </div>
    </Egg>
  )
}

// Neelakshi's own mountain photos, as a stack of two postcards
const MOUNTAIN_SHOTS = [
  { src: '/crisp/mountains-1.webp', alt: 'hilltop camp with red-roofed cottages above layered blue mountains', caption: 'above the clouds', tape: '#F9C8D9' },
  { src: '/crisp/mountains-2.webp', alt: 'misty mountain road at dawn, shot on a film-date camera', caption: 'the road up', tape: '#BFE3F5' },
]

// instant-film print: washi tape on top, glossy photo, handwritten caption on the strip
function Postcard({ src, alt, caption, tape }: { src: string; alt: string; caption: string; tape: string }) {
  return (
    <div className="postcard">
      <span className="pc-tape" style={{ background: tape }} />
      <div className="pc-window">
        <Image src={src} alt={alt} fill sizes="112px" className="pc-photo" style={{ objectFit: 'cover' }} />
      </div>
      <span className="pc-caption">{caption}</span>
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

// hand-drawn loopy arrow used for every outbound link (matches the handwriting)
function LoopArrow() {
  return (
    <svg className="rc-arrow" width="13" height="10" viewBox="0 0 18 14" aria-hidden="true">
      <path d="M1.5 12.5 C4 12 5.5 9.5 4.5 8 C3.6 6.7 1.8 8 3 9.4 C5 11.5 10 8 15.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 2.2 L15.8 2.2 L15.4 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── talindrew: flat microscope + slide box (works like the record player) ────
// strand art: a scrolling DNA double helix or a single RNA strand with its bases
function strand(w: number, period: number, amp: number, mid: number) {
  const y = (x: number, sign: number) => mid + sign * amp * Math.sin((2 * Math.PI * x) / period)
  let a = '', b = ''
  for (let x = 0; x <= w; x++) {
    a += `${x ? 'L' : 'M'}${x} ${y(x, 1).toFixed(1)} `
    b += `${x ? 'L' : 'M'}${x} ${y(x, -1).toFixed(1)} `
  }
  const colors = [FIG.purple, FIG.blue, FIG.green, FIG.orange]
  const rungs = Array.from({ length: Math.floor(w / 6) }, (_, i) => {
    const x = 3 + i * 6
    // rounded so server and client render identical numbers (avoids hydration mismatch)
    return { x, y1: +y(x, 1).toFixed(2), y2: +y(x, -1).toFixed(2), c: colors[i % 4] }
  })
  return { a, b, rungs }
}
const HELIX = { w: 200, period: 40, ...strand(200, 40, 13, 24) }

function Helix() {
  const h = HELIX
  return (
    <svg className="helix" width={h.w} height="48" viewBox={`0 0 ${h.w} 48`} aria-hidden="true">
      {h.rungs.map((r) => (
        <line key={r.x} x1={r.x} x2={r.x} y1={r.y1} y2={r.y2} stroke={r.c} strokeWidth="2.2" strokeLinecap="round" opacity=".9" />
      ))}
      <path d={h.a} stroke="#7B4DFF" strokeWidth="2.6" fill="none" />
      <path d={h.b} stroke="#1E88E5" strokeWidth="2.6" fill="none" />
    </svg>
  )
}

// flat cream-and-ink microscope, side view (after a mid-century poster illustration)
function Microscope({ on }: { on: boolean }) {
  const cream = '#EDE4D3', creamHi = '#F7F1E5', creamLo = '#D8CCB6', ink = '#1F2D33', steel = '#B9C6CA'
  return (
    <svg className={`scope${on ? ' on' : ''}`} width="132" height="158" viewBox="0 0 200 240" aria-hidden="true">
      {/* base plate */}
      <rect x="26" y="200" width="150" height="28" rx="3" fill={creamLo} />
      <rect x="26" y="196" width="150" height="26" rx="3" fill={cream} />
      <rect x="104" y="186" width="58" height="12" rx="2" fill={creamHi} />
      {/* arm: one thick curve from the foot up to the head */}
      <path d="M74 182 C26 150 26 86 82 66" fill="none" stroke={creamLo} strokeWidth="34" strokeLinecap="round" />
      <path d="M72 180 C28 150 30 88 84 66" fill="none" stroke={cream} strokeWidth="28" strokeLinecap="round" />
      {/* foot block */}
      <path d="M56 198 L60 164 Q62 152 74 152 L90 152 Q100 152 101 164 L104 198 Z" fill={cream} />
      <circle cx="80" cy="176" r="7.5" fill={ink} />
      {/* mirror under the stage */}
      <g transform="rotate(24 120 176)">
        <ellipse cx="120" cy="176" rx="17" ry="7" fill={ink} />
        <ellipse cx="120" cy="174" rx="13" ry="4.5" fill="#33454D" />
      </g>
      <line x1="104" y1="182" x2="114" y2="178" stroke={ink} strokeWidth="3" />
      {/* stage + slide */}
      <rect x="96" y="148" width="72" height="9" rx="1.5" fill={ink} />
      <g className="scope-slide">
        <rect x="112" y="143" width="40" height="5" rx="1" fill="#DDEFF2" stroke={steel} strokeWidth=".8" />
        <circle cx="132" cy="145.5" r="1.8" fill={FIG.purple} />
      </g>
      <circle className="scope-glow" cx="132" cy="146" r="14" fill="#FFF3B0" />
      {/* head: tilted tube, eyepiece and nosepiece with objectives */}
      <g className="scope-head" transform="rotate(-24 112 84)">
        <rect x="96" y="44" width="34" height="74" rx="3" fill={cream} />
        <rect x="96" y="44" width="9" height="74" rx="3" fill={creamHi} />
        <rect x="100" y="14" width="26" height="34" rx="3" fill={ink} />
        <rect x="104" y="116" width="18" height="12" fill={ink} />
        <path d="M94 128 L134 124 L130 142 L100 146 Z" fill={ink} />
        <rect x="104" y="144" width="6" height="7" rx="1.5" fill={steel} />
        <rect x="121" y="142" width="6" height="7" rx="1.5" fill={steel} />
      </g>
      {/* focus knobs on the arm */}
      <circle cx="84" cy="72" r="13" fill={ink} />
      <circle cx="84" cy="102" r="8" fill={ink} />
    </svg>
  )
}

function LabCorner() {
  const [on, setOn] = useState(false)

  return (
    <Egg x="calc(100% - 400px)" y="62%" rot={0} z={on ? 300 : 12} className={`pos-tal${on ? ' zoomed' : ''}`} side="left"
      label={on ? 'talindrew microscope — showing a zoomed-in dna strand, press to close' : 'talindrew microscope — press to zoom in on dna'}
      onTap={() => setOn((v) => !v)}
      note={TALINDREW_NOTE}>
      <div className="obj lab">
        {/* zoomed-in view popping out of the eyepiece */}
        <div className={`lens${on ? ' on' : ''}`} aria-hidden={!on}>
          <div className="lens-view">
            <Helix />
            <span className="lens-mag">×1000</span>
          </div>
        </div>
        <Microscope on={on} />
        <a className="hand-link lab-name" href="https://www.talindrew.com/" target="_blank" rel="noopener noreferrer" onPointerDown={(e) => e.stopPropagation()}>
          talindrew <LoopArrow />
        </a>
      </div>
    </Egg>
  )
}

// ─── vectordrop: loose LEGO bricks that snap into a pixel flower (image → vector) ──
const LEGO_COLORS: Record<string, string> = { P: '#EC4899', V: '#8B5CF6', Y: '#F5C518', G: '#84CC16' }
const FLOWER = [
  '..VV.VV..',
  '.VPPVPPV.',
  '.PPPYPPP.',
  '.VPPPPPV.',
  '..VV.VV..',
  '....G....',
  '.GG.G.GG.',
  '..GGGGG..',
]
const CELL = 12
const BRICKS = FLOWER.flatMap((row, r) =>
  [...row].flatMap((ch, c) => (ch === '.' ? [] : [{ c, r, color: LEGO_COLORS[ch] }])),
).map((b, i) => ({
  ...b,
  i,
  // deterministic "loose pile" offsets so server and client agree
  sx: ((i * 37) % 13) * 9 - 54,
  sy: ((i * 53) % 7) * 7 - 6 + (b.r < 4 ? 26 : 0),
  sr: ((i * 29) % 9) * 10 - 40,
}))

function LegoBuild({ built }: { built: boolean }) {
  const cols = 14, rows = 10, ox = (cols - 9) / 2 * CELL, oy = 0.5 * CELL
  return (
    <svg className={`lego-svg${built ? ' built' : ''}`} width="172" height="128" viewBox={`0 0 ${cols * CELL + 4} ${rows * CELL + 10}`} aria-hidden="true">
      {BRICKS.map((b) => (
        <g
          key={b.i}
          className="lb"
          style={{ '--sx': `${b.sx}px`, '--sy': `${b.sy}px`, '--sr': `${b.sr}deg`, '--d': b.i } as React.CSSProperties}
        >
          <rect x={2 + ox + b.c * CELL + 0.5} y={4 + oy + b.r * CELL + 0.5} width={CELL - 1} height={CELL - 1} rx="1.5" fill={b.color} />
          <rect x={2 + ox + b.c * CELL + 0.5} y={4 + oy + b.r * CELL + CELL - 3} width={CELL - 1} height="2.5" rx="1" fill="#000" opacity=".22" />
          <circle cx={2 + ox + b.c * CELL + CELL / 2} cy={4 + oy + b.r * CELL + CELL / 2} r="3.3" fill={b.color} stroke="#000" strokeOpacity=".2" strokeWidth="1" />
          <circle cx={2 + ox + b.c * CELL + CELL / 2 - 1} cy={4 + oy + b.r * CELL + CELL / 2 - 1} r="1.2" fill="#fff" opacity=".45" />
        </g>
      ))}
    </svg>
  )
}

function VectordropCorner() {
  const [built, setBuilt] = useState(false)
  return (
    <Egg x="6%" y="73%" rot={-3} z={built ? 300 : 14} className={`pos-stats${built ? ' built-open' : ''}`} side="right"
      label={built ? 'vectordrop — lego bricks snapped into a flower, press to scatter them' : 'vectordrop — lego bricks, press to build'}
      onTap={() => setBuilt((v) => !v)}
      note={<>i built <u>vectordrop</u>:<br />image → vector ✦</>}>
      <div className="obj lego-obj">
        <LegoBuild built={built} />
        <a className="hand-link" href="https://www.vectordrop.co.in/" target="_blank" rel="noopener noreferrer" onPointerDown={(e) => e.stopPropagation()}>
          vectordrop <LoopArrow />
        </a>
      </div>
    </Egg>
  )
}

// ─── Recognition corner content ───────────────────────────────────────────────
const WINS = [
  {
    cls: 'win-a', rot: -2, src: '/recognition/image.png',
    alt: 'Dylan Field reposting Neelakshi’s Figma Makeathon post about Talindrew, a DNA/RNA visualiser built in Figma Make',
    note: <>Got reposted by<br />Dylan Field</>,
    href: 'https://x.com/bluecoder2003/status/1964913736776614331?s=20',
  },
  {
    cls: 'win-b', rot: 2, src: '/recognition/image%20copy%202.png',
    alt: 'Contra post: “Neelakshi is goated”, next to her sound-visualiser project',
    note: <>Featured on<br />Contra</>,
    href: 'https://x.com/bluecoder2003/status/2027777880747544953?s=20',
  },
  {
    cls: 'win-c', rot: -1.5, src: '/recognition/image%20copy.png',
    alt: 'FigBuild 2026 merch: t-shirt, notebook, enamel pin and Figma for Edu stickers',
    note: <>Got my<br />FigBuild merch</>,
    href: 'https://x.com/bluecoder2003/status/2040424319550144982?s=20',
  },
  {
    cls: 'win-d', rot: 1.5, src: '/recognition/airpods.png',
    alt: 'Lilac AirPods Max on a blue MacBook — the prize for winning Contra’s HCB launch giveaway',
    note: <>Won AirPods Max<br />from Contra</>,
    href: 'https://lnkd.in/p/gwMf2_bS',
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
        {WINS.slice(0, 3).map((w, i) => (
          <span key={w.cls} className="rc-thumb" style={{ ['--i' as string]: i - 1 }}>
            <Image src={w.src} alt="" width={96} height={96} sizes="96px" />
          </span>
        ))}
      </span>
      <span className="rc-w-label">a little bragging <LoopArrow /></span>
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
            <p>a little bragging, as a treat — figma makeathon ’25, ’26, figbuild ’26 &amp; contra</p>
          </div>
        </header>
        <p className="rc-swipe" aria-hidden="true">swipe →</p>
        <div className="rc-grid">
          {WINS.map((w, i) => (
            <figure key={w.cls} className="rc-win" style={{ ['--rot' as string]: `${w.rot * 1.5}deg`, animationDelay: `${0.15 + i * 0.14}s` }}>
              <figcaption className="stamp-note">{w.note}</figcaption>
              <a className="win-card" href={w.href} target="_blank" rel="noopener noreferrer" aria-label={`${w.alt} — open the post`}>
                <Image src={w.src} alt={w.alt} width={800} height={800} sizes="(max-width: 760px) 90vw, 340px" />
              </a>
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

function ConfigBadge({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div
      className="badge-wrap"
      tabIndex={0}
      role="button"
      aria-pressed={on}
      aria-label={on ? 'config 2026 badge — remove the config frame' : 'config 2026 badge — put a config frame around the page'}
      onClick={onToggle}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
    >
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
          <Chip bg={BADGE.lime} shape="burst" rot={10} style={{ left: 104, top: 128 }}>CREATIVE</Chip>
          <Chip bg={BADGE.green} shape="pill" rot={-6} style={{ left: 76, top: 158 }}>AMBIVERT</Chip>
        </div>

      </div>
    </div>
  )
}

// ─── Config frame: the badge's checkerboard + chips wrapped around the window ──
// a new two-colour checker every time the frame goes on (all from the badge palette)
const FRAME_PALETTES = [
  [BADGE.orange, BADGE.lime],
  [BADGE.blue, BADGE.lilac],
  [BADGE.green, BADGE.lime],
  ['#0A0A0A', BADGE.lime],
  [BADGE.lilac, BADGE.orange],
  [BADGE.blue, BADGE.green],
]

// colours come from --f1/--f2 on the window, shared with the badge's own checkerboard
function ConfigFrame({ on }: { on: boolean }) {
  return (
    <div className={`cfg-frame${on ? ' on' : ''}`} aria-hidden="true">
      <div className="cfg-checker" />
      <span className="cfg-chip cfg-tl" style={{ '--i': 0 } as React.CSSProperties}>
        <span className="cfg-word">Config</span><span className="cfg-year">2026</span>
      </span>
      <Chip bg={BADGE.lilac} shape="wavy" rot={-4} style={{ left: 'auto', right: 70, top: 4, '--i': 1 } as React.CSSProperties}>HERE 4 FUN</Chip>
      <Chip bg={BADGE.blue} color="#fff" shape="wavy" rot={5} style={{ right: 8, bottom: 70, '--i': 2 } as React.CSSProperties}>DEVELOPER</Chip>
      <Chip bg={BADGE.green} shape="wavy" rot={-6} style={{ left: '46%', bottom: 2, '--i': 3 } as React.CSSProperties}>DESIGNER</Chip>
      <Chip bg={BADGE.lime} shape="burst" rot={10} style={{ left: 2, bottom: 26, '--i': 4 } as React.CSSProperties}>CREATIVE</Chip>
      <Chip bg={BADGE.green} shape="pill" rot={-90} style={{ left: -18, top: '42%', '--i': 5 } as React.CSSProperties}>AMBIVERT</Chip>
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
    const measure = () => { if (el.offsetWidth) setSize({ w: el.offsetWidth, h: el.offsetHeight }) }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

// ─── Menu bar icons ───────────────────────────────────────────────────────────
// ─── Title garden: click the heading frame and vines, leaves and roses grow around it ──
// (inspired by type-garden.vercel.app; drawn from scratch here)
const GARDENS = [
  { vine: '#2B4BFF', flower: '#FF2A12', swirl: '#FFC2B5' },
  { vine: '#0ACF83', flower: '#A259FF', swirl: '#E6D4FF' },
  { vine: '#1ABCFE', flower: '#FF7262', swirl: '#FFE0DA' },
  { vine: '#1F2D33', flower: '#FFC943', swirl: '#FFF3C4' },
]

function rng(seed: number) {
  let t = seed * 9301 + 49297
  return () => { t = (t + 0x6d2b79f5) | 0; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296 }
}

type Pt = { x: number; y: number }
function smooth(pts: Pt[]) {
  // catmull-rom → cubic beziers
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }
    d += `C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

// the selection frame sits 14px / 10px outside the heading (see .sel)
const FRAME_PAD = { x: 14, y: 10 }
// while blooming the frame grows out a little and the vines follow the bigger frame
const FRAME_GROW = 10

// ivy on a picture frame: two diagonal corners sprout a vine along each adjacent edge,
// with a little flower cluster on the corner; leaves shrink toward the growing tips
function growGarden(seed: number, w: number, h: number) {
  const r = rng(seed)
  const sc = Math.min(1, Math.max(.72, h / 76)) // never too tiny on phones
  const px = FRAME_PAD.x + FRAME_GROW, py = FRAME_PAD.y + FRAME_GROW
  const x0 = -px, y0 = -py, x1 = w + px, y1 = h + py
  const W = x1 - x0, H = y1 - y0
  const vines: { d: string; delay: number; wdt: number }[] = []
  const leaves: { x: number; y: number; a: number; s: number; delay: number }[] = []
  const roses: { x: number; y: number; s: number; rot: number; delay: number }[] = []

  // corners as (x, y, horizontal dir, vertical dir)
  const TL = { x: x0, y: y0, hx: 1, vy: 1 }, TR = { x: x1, y: y0, hx: -1, vy: 1 }
  const BL = { x: x0, y: y1, hx: 1, vy: -1 }, BR = { x: x1, y: y1, hx: -1, vy: -1 }
  const pair = r() < 0.5 ? [TL, BR] : [TR, BL]

  pair.forEach((c, ci) => {
    const base = ci * 0.35
    const arms = [
      { len: W * (0.2 + r() * 0.12), along: (d: number) => ({ x: c.x + c.hx * d, y: c.y }), n: { x: 0, y: -c.vy }, ang: c.hx > 0 ? 0 : 180 },
      { len: H * (0.65 + r() * 0.3), along: (d: number) => ({ x: c.x, y: c.y + c.vy * d }), n: { x: -c.hx, y: 0 }, ang: c.vy > 0 ? 90 : -90 },
    ]
    arms.forEach((arm, ai) => {
      const p1 = (34 + r() * 14) * sc, p2 = (13 + r() * 6) * sc, ph1 = r() * 6, ph2 = r() * 6, amp = 3.2 * sc
      const pts: Pt[] = []
      const step = 3
      const N = Math.floor(arm.len / step)
      for (let i = 0; i <= N; i++) {
        const d = i * step
        const p = arm.along(d)
        // irregular wander around the frame line (two mixed waves, not a zig-zag)
        const o = (Math.sin(d / p1 + ph1) * 0.7 + Math.sin(d / p2 + ph2) * 0.3) * amp * Math.min(1, d / (10 * sc))
        pts.push({ x: p.x + arm.n.x * o, y: p.y + arm.n.y * o })
      }
      // tip curls off the frame, outward
      const last = pts[pts.length - 1]
      const fwd = { x: Math.cos((arm.ang * Math.PI) / 180), y: Math.sin((arm.ang * Math.PI) / 180) }
      for (let i = 1; i <= 5; i++) {
        const t = i / 5
        const rad = 6 * sc * (1 - t * 0.6)
        const a = t * Math.PI * 1.4
        pts.push({ x: last.x + fwd.x * Math.sin(a) * rad + arm.n.x * (1 - Math.cos(a)) * rad, y: last.y + fwd.y * Math.sin(a) * rad + arm.n.y * (1 - Math.cos(a)) * rad })
      }
      const delay = base + ai * 0.12
      vines.push({ d: smooth(pts), delay, wdt: 2.1 })
      // leaves: alternate sides, irregular spacing, shrinking toward the tip
      let i = Math.round((6 + r() * 4) / step), side = r() < 0.5 ? 1 : -1
      while (i < N - 2) {
        const t = i / N
        const tan = Math.atan2(pts[i + 1].y - pts[i - 1].y, pts[i + 1].x - pts[i - 1].x) * 180 / Math.PI
        leaves.push({ x: pts[i].x, y: pts[i].y, a: tan + side * (38 + r() * 18), s: (0.66 - t * 0.32 + r() * 0.08) * sc, delay: delay + t * 1.1 })
        side = -side
        i += Math.round(((14 + r() * 10) * sc) / step)
      }
      // a bud just before the curl
      if (r() < 0.7) roses.push({ x: last.x, y: last.y, s: 0.27 * sc, rot: r() * 360, delay: delay + 1.2 })
    })
    // flower cluster on the corner itself
    const cl = [
      { dx: 0, dy: 0, s: 0.6 },
      { dx: c.hx * (11 + r() * 4), dy: -c.vy * (3 + r() * 3), s: 0.42 },
      { dx: -c.hx * (2 + r() * 3), dy: c.vy * (12 + r() * 4), s: 0.36 },
    ]
    cl.forEach((f, fi) => roses.push({ x: c.x + f.dx * sc, y: c.y + f.dy * sc, s: f.s * sc, rot: r() * 360, delay: base + 0.55 + fi * 0.12 }))
  })
  return { vines, leaves, roses }
}

const LEAF = 'M0 0 C5 -6 14 -7 22 0 C14 7 5 6 0 0Z'
const ROSE_EDGE = wavy(9, 0.12)
function TitleGarden({ seed, w, h, withering }: { seed: number; w: number; h: number; withering: boolean }) {
  const g = growGarden(seed, w, h)
  const c = GARDENS[seed % GARDENS.length]
  const P = 40
  // on the way back everything plays in reverse: buds close first, vines retract to their corner last
  const end = Math.max(...g.roses.map((f) => f.delay), ...g.leaves.map((l) => l.delay)) + 0.2
  const t = (grow: number, back: number) => ({ animationDelay: `${(withering ? back : grow).toFixed(2)}s` })
  return (
    <svg className={`garden${withering ? ' wither' : ''}`} width={w + P * 2} height={h + P * 2} viewBox={`${-P} ${-P} ${w + P * 2} ${h + P * 2}`}
      style={{
        left: -P, top: -P,
        // while retracting, the whole garden shrinks with the frame so the vines ride it back in
        '--gsx': (w + FRAME_PAD.x * 2) / (w + (FRAME_PAD.x + FRAME_GROW) * 2),
        '--gsy': (h + FRAME_PAD.y * 2) / (h + (FRAME_PAD.y + FRAME_GROW) * 2),
      } as React.CSSProperties} aria-hidden="true">
      {g.vines.map((v, i) => (
        <path key={i} className="g-vine" d={v.d} pathLength={1} stroke={c.vine} strokeWidth={v.wdt} style={t(v.delay, Math.max(0, end - v.delay - 1.4) * 0.5)} />
      ))}
      {g.leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.a.toFixed(0)}) scale(${l.s.toFixed(2)})`}>
          <g className="g-pop" style={t(l.delay, (end - l.delay) * 0.5)}>
            <path d={LEAF} fill={c.vine} />
          </g>
        </g>
      ))}
      {g.roses.map((f, i) => (
        <g key={i} transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) rotate(${f.rot.toFixed(0)}) scale(${f.s.toFixed(2)})`}>
          <g className="g-pop g-rose" style={t(f.delay, (end - f.delay) * 0.5)}>
            <foreignObject x="-17" y="-16" width="34" height="32">
              <div style={{ width: '100%', height: '100%', background: c.flower, clipPath: ROSE_EDGE }} />
            </foreignObject>
            <path d="M0 0 c3 -1 4 3 1 5 c-5 2 -8 -3 -6 -7 c3 -6 12 -5 13 2 c1 7 -6 12 -12 9" fill="none" stroke={c.swirl} strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </g>
      ))}
    </svg>
  )
}

export default function CrispContent() {
  const [showWins, setShowWins] = useState(false)
  const closeWins = useCallback(() => setShowWins(false), [])
  const [titleRef, titleSize] = useSize<HTMLHeadingElement>()
  const [garden, setGarden] = useState(0) // 0 = bare; each click grows a new garden seed
  const [withering, setWithering] = useState(false)
  const bloom = () => {
    setWithering(false)
    setGarden((g) => (g ? g + 1 : 1 + Math.floor(Math.random() * 1000)))
  }
  // grow → stay a few seconds → wither away (a click restarts it)
  useEffect(() => {
    if (!garden) return
    const t1 = setTimeout(() => setWithering(true), 5200)
    const t2 = setTimeout(() => { setGarden(0); setWithering(false) }, 7800) // after the retract finishes
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [garden])
  const [configFrame, setConfigFrame] = useState(false)
  const [framePalette, setFramePalette] = useState(0)
  const toggleFrame = () => {
    // pick the next palette only when the frame comes back on, so it doesn't swap while closing
    if (!configFrame) setFramePalette((n) => n + 1)
    setConfigFrame((v) => !v)
  }
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `try{localStorage.setItem('portfolio-visited','true')}catch(e){}` }} />

      <style>{`
        :root { --gut: clamp(12px, 3.2vw, 56px); }
        .window { margin-top: max(var(--gut), env(safe-area-inset-top)) !important; margin-bottom: max(var(--gut), env(safe-area-inset-bottom)) !important; }
        @property --f1 { syntax: '<color>'; inherits: true; initial-value: ${BADGE.orange}; }
        @property --f2 { syntax: '<color>'; inherits: true; initial-value: ${BADGE.lime}; }
        @property --sky-a { syntax: '<color>'; inherits: true; initial-value: #2C7AD6; }
        @property --sky-b { syntax: '<color>'; inherits: true; initial-value: #4C96E5; }
        @property --sky-c { syntax: '<color>'; inherits: true; initial-value: #7DB7EF; }
        body { background: var(--sky-b); transition: --sky-b 1.6s ease; }

        /* sky */
        .sky { position: fixed; inset: 0; z-index: 0; overflow: hidden; background: linear-gradient(180deg, var(--sky-a) 0%, var(--sky-b) 55%, var(--sky-c) 100%); transition: --sky-a 1.6s ease, --sky-b 1.6s ease, --sky-c 1.6s ease; }
        .cloud { position: absolute; top: -5%; bottom: -5%; left: 0; background-repeat: repeat; will-change: transform; }
        .cloud-a { width: calc(100% + 1600px); background-image: url(/crisp/clouds-a.webp); background-size: 1600px 800px; animation: drift-a 150s linear infinite; }
        .cloud-b { width: calc(100% + 1100px); background-image: url(/crisp/clouds-b.webp); background-size: 1100px 550px; background-position: 300px 120px; opacity: .7; animation: drift-b 240s linear infinite; }
        @keyframes drift-a { to { transform: translateX(-1600px); } }
        @keyframes drift-b { to { transform: translateX(-1100px); } }
        .cloud { transition: filter 1.6s ease, opacity 1.6s ease; }

        /* song scenery (shown via :root[data-song]) */
        .scene { position: absolute; inset: 0; opacity: 0; transition: opacity 1.6s ease; pointer-events: none; }
        :root[data-song="sunshine"] .scene-sunshine, :root[data-song="mystery"] .scene-mystery { opacity: 1; }

        /* one big soft radial glow (no hard disc edge, no box-shadow ring) */
        .morning-sun { position: absolute; top: -380px; right: -380px; width: 900px; height: 900px;
          background: radial-gradient(circle closest-side,
            #FFFEF6 0%, #FFFBE0 9%, #FFF2B0 14%, rgba(255,232,140,.75) 20%, rgba(255,226,130,.45) 32%,
            rgba(255,236,170,.22) 50%, rgba(255,244,205,.08) 72%, rgba(255,248,220,0) 100%);
          transform: translateY(60px) scale(.85); transition: transform 2.4s cubic-bezier(.2,.8,.3,1); }
        .morning-rays { position: absolute; top: -560px; right: -560px; width: 1280px; height: 1280px; border-radius: 50%;
          background: repeating-conic-gradient(from 0deg, rgba(255,248,215,.32) 0deg 3deg, rgba(255,248,215,0) 7deg 15deg);
          filter: blur(10px); mix-blend-mode: screen;
          -webkit-mask: radial-gradient(circle, transparent 9%, #000 16%, transparent 58%); mask: radial-gradient(circle, transparent 9%, #000 16%, transparent 58%);
          animation: rays 60s linear infinite; }
        @keyframes rays { to { transform: rotate(360deg); } }
        :root[data-song="sunshine"] .morning-sun { transform: none; }
        :root[data-song="sunshine"] .cloud { filter: brightness(1.12) saturate(1.1); }

        .sunset-photo { background: url(/crisp/sky-mystery.webp) center 62% / cover no-repeat; transform: scale(1.06); transition: opacity 1.6s ease, transform 6s ease-out; }
        :root[data-song="mystery"] .sunset-photo { transform: none; }

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
        .cta:focus-visible, .egg-inner:focus-visible, .badge-wrap:focus-visible {
          outline: 2px solid ${FIG.select}; outline-offset: 4px; border-radius: 8px;
        }

        @keyframes kaoBob { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-5px) rotate(2deg); } }
        .kao {
          display: block;
          white-space: nowrap;
          font-size: 15px;
          color: #2A2A2A;
          font-family: ui-monospace, monospace;
          user-select: none;
          padding: 4px 6px;
          animation: kaoBob 2.6s ease-in-out infinite;
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


        /* record player */
        .tt { display: block; overflow: visible; filter: drop-shadow(0 10px 14px rgba(40,10,10,.22)); }
        .tt-record { transform-box: view-box; transform-origin: 88px 80px; transition: transform 1.2s cubic-bezier(.2,.8,.3,1); }
        .egg-inner:hover .tt:not(.playing) .tt-record { transform: rotate(40deg); }
        .tt.playing .tt-record { animation: ttSpin 1.8s linear infinite; }
        @keyframes ttSpin { to { transform: rotate(360deg); } }
        .tt-arm { transform-box: view-box; transform-origin: 188px 38px; transform: rotate(-24deg); transition: transform .7s cubic-bezier(.4,1.4,.5,1); }
        .tt.playing .tt-arm { transform: rotate(0deg); }

        .crate { position: absolute; right: -6px; top: calc(100% + 2px); display: flex; gap: 10px; pointer-events: none; }
        .crate-open .crate { pointer-events: auto; }
        .cd { position: relative; width: 64px; padding: 0; border: 0; background: none; cursor: pointer; font: inherit; opacity: 0; transform: translateY(46px) scale(.4) rotate(0); transition: opacity .25s, transform .45s cubic-bezier(.3,1.5,.5,1); transition-delay: calc((4 - var(--i)) * 40ms); }
        .crate-open .cd { opacity: 1; transform: translateY(0) scale(1) rotate(var(--r)); transition-delay: calc(var(--i) * 55ms); }
        .crate-open .cd:hover, .crate-open .cd:focus-visible { transform: translateY(-6px) scale(1.06) rotate(0); }
        .cd:focus-visible { outline: none; }
        .cd:focus-visible .cd-case { box-shadow: 0 0 0 2px ${FIG.select}, 0 8px 16px -6px rgba(0,0,0,.4); }
        .cd-case { position: relative; display: block; width: 64px; height: 64px; border-radius: 3px; overflow: hidden; box-shadow: 0 8px 16px -6px rgba(0,0,0,.4), inset 0 0 0 1px rgba(255,255,255,.25); }
        .cd-case::after { content: ''; position: absolute; inset: 0; background: linear-gradient(125deg, rgba(255,255,255,.45), transparent 38%); border-left: 5px solid rgba(255,255,255,.28); }
        .cd-disc { position: absolute; top: 4px; left: 4px; width: 56px; height: 56px; border-radius: 50%; background: radial-gradient(circle, #fff 0 5px, #c9ccd2 6px 11px, transparent 12px), conic-gradient(from 20deg, #e8ebf0, #b8c4d6, #f4e6f0, #c9d6e8, #eef0f3, #d4c8e4, #e8ebf0); box-shadow: 0 2px 6px rgba(0,0,0,.25); transition: transform .4s cubic-bezier(.3,1.4,.5,1); }
        .cd:hover .cd-disc, .cd:focus-visible .cd-disc, .cd.on .cd-disc { transform: translateY(-24px) rotate(90deg); }
        .cd-title { display: block; margin-top: 3px; font-family: var(--font-hand), cursive; font-size: 15px; line-height: .95; color: ${FIG.ink}; text-align: center; }
        .cd.on .cd-title::before { content: '♪ '; }
        .crate-open .egg-note { opacity: 0 !important; }

        .pc-stack { position: relative; }
        .pc-back { position: absolute; inset: 0; transform: rotate(8deg) translate(10px, -4px); transition: transform .55s cubic-bezier(.3,1.4,.5,1); }
        .pc-front { position: relative; transform: rotate(-2deg); transition: transform .55s cubic-bezier(.3,1.4,.5,1); }
        .egg-inner:hover .pc-front, .egg-inner:focus .pc-front { transform: translate(-40px, 10px) rotate(-9deg); }
        .egg-inner:hover .pc-back, .egg-inner:focus .pc-back { transform: translate(44px, -8px) rotate(8deg); }
        .postcard { position: relative; width: 124px; padding: 8px 8px 0; background: #FDFBF6;
          background-image: radial-gradient(rgba(0,0,0,.035) 1px, transparent 1px); background-size: 3px 3px;
          box-shadow: 0 1px 1px rgba(0,0,0,.08), 0 8px 18px -8px rgba(40,30,10,.3); border-radius: 1.5px; }
        .pc-back .postcard { box-shadow: 0 1px 1px rgba(0,0,0,.08), 0 6px 14px -6px rgba(40,30,10,.25); }
        .pc-window { position: relative; width: 108px; height: 104px; overflow: hidden; background: #2A2A2A; box-shadow: inset 0 0 0 1px rgba(0,0,0,.06); }
        .pc-window::after { content: ''; position: absolute; inset: 0; background: linear-gradient(130deg, rgba(255,255,255,.28), transparent 38%), radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,.18)); pointer-events: none; }
        .pc-caption { display: block; height: 26px; line-height: 26px; text-align: center; font-family: var(--font-hand), cursive; font-size: 15px; color: #3A3A3A; white-space: nowrap; }
        .pc-tape { position: absolute; top: -8px; left: 50%; width: 46px; height: 15px; translate: -50% 0; rotate: -4deg; opacity: .85; z-index: 1;
          clip-path: polygon(3% 0, 97% 4%, 100% 30%, 96% 55%, 100% 82%, 97% 100%, 2% 96%, 0 70%, 4% 45%, 0 18%);
          background-image: repeating-linear-gradient(90deg, rgba(255,255,255,.25) 0 3px, transparent 3px 7px) !important; }
        .pc-back .pc-tape { rotate: 6deg; left: 62%; }
        .pc-photo { filter: saturate(.85) sepia(.1) contrast(1.02); transition: filter .5s, transform .8s cubic-bezier(.2,.9,.3,1); }
        .egg-inner:hover .pc-photo, .egg-inner:focus .pc-photo { filter: saturate(1.05); transform: scale(1.08); }

        /* talindrew microscope */
        .lab { display: flex; flex-direction: column; align-items: center; }
        .scope { display: block; overflow: visible; }
        .pos-tal .sticker { filter: drop-shadow(0 3px 4px rgba(20,40,50,.13)); } /* flat illustration: just a light contact shadow */
        .scope-glow { opacity: 0; filter: blur(6px); transition: opacity .5s; }
        .scope.on .scope-glow { opacity: .8; }
        .scope-slide { transform-box: view-box; opacity: 0; transform: translateX(30px); transition: transform .5s cubic-bezier(.3,1.3,.5,1), opacity .3s; }
        .scope.on .scope-slide { opacity: 1; transform: none; }
        .scope-head { transition: translate .5s cubic-bezier(.3,1.4,.5,1); }
        .scope.on .scope-head { translate: 0 3px; }
        .egg-inner:hover .scope:not(.on) .scope-head, .egg-inner:focus .scope:not(.on) .scope-head { translate: 0 2px; }
        .lab-name { margin-top: 4px; }
        /* handwritten project names, same ink as "a little bragging" */
        .hand-link { display: inline-block; margin-top: 4px; font-family: var(--font-hand), cursive; font-size: 18px; line-height: 1; color: ${FIG.ink}; text-decoration: none; transform: rotate(-2deg); transition: transform .3s cubic-bezier(.3,1.6,.5,1); }
        .hand-link:hover { transform: rotate(-4deg) scale(1.06); }
        .zoomed .egg-note { opacity: 0 !important; } /* the lens takes over */

        .helix { display: block; animation: helix 2.6s linear infinite; }
        @keyframes helix { to { transform: translateX(-40px); } }

        .lens { position: absolute; right: calc(100% - 26px); top: -40px; display: flex; flex-direction: column; align-items: center; gap: 8px;
          opacity: 0; transform: translate(50px, 30px) scale(.25); transform-origin: 100% 20%; pointer-events: none; transition: opacity .3s, transform .55s cubic-bezier(.3,1.4,.5,1); }
        .lens.on { opacity: 1; transform: none; pointer-events: auto; }
        .lens-view { position: relative; width: 168px; height: 168px; border-radius: 50%; overflow: hidden; display: grid; place-items: center;
          background: radial-gradient(circle, #FBFDF7 0 34%, #E3EFEE 64%, #BFD6D8 100%); border: 8px solid #1F2D33;
          box-shadow: 0 18px 32px -12px rgba(0,0,0,.45), inset 0 0 26px rgba(20,60,70,.35); }
        .lens-view::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 32% 26%, rgba(255,255,255,.55), transparent 32%); pointer-events: none; }
        .lens-view .helix { scale: 1.9; }
        .lens-mag { position: absolute; bottom: 16px; left: 50%; translate: -50% 0; font-size: 10px; letter-spacing: .08em; color: #1F2D33; opacity: .55; }
        .egg-link { color: #2F6BFF; text-decoration: none; border-bottom: 1px dashed rgba(47,107,255,.5); cursor: pointer; }
        .egg-link { display: inline-block; margin-top: 8px; font-size: 12px; }
        .egg-link:hover { border-bottom-style: solid; }


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
        .rc-arrow { display: inline-block; vertical-align: 2px; margin-left: 2px; }
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
        .rc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px 26px; margin-top: 84px; }
        .rc-win { position: relative; margin: 0; transform: rotate(var(--rot)); animation: winIn .7s cubic-bezier(.3,1.4,.5,1) both; transition: transform .35s cubic-bezier(.3,1.4,.5,1); }
        .rc-win:hover { transform: rotate(0) scale(1.04); z-index: 2; }
        a.win-card { display: block; cursor: pointer; }
        a.win-card:focus-visible { outline: 2px solid ${FIG.select}; outline-offset: 4px; }
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

        /* vectordrop: loose lego bricks */
        .lego-obj { display: flex; flex-direction: column; align-items: center; }
        .lego-svg { display: block; overflow: visible; }
        .pos-stats .sticker { filter: drop-shadow(0 4px 6px rgba(0,0,0,.18)); }
        .lb { transform-box: fill-box; transform-origin: center; transform: translate(var(--sx), var(--sy)) rotate(var(--sr));
          transition: transform .7s cubic-bezier(.3,1.35,.5,1); transition-delay: calc(var(--d) * 8ms); }
        .lego-svg.built .lb { transform: none; transition-delay: calc(var(--d) * 22ms); }
        .egg-inner:hover .lego-svg:not(.built) .lb, .egg-inner:focus .lego-svg:not(.built) .lb { transform: translate(var(--sx), calc(var(--sy) - 3px)) rotate(calc(var(--sr) + 6deg)); }
        .built-open .egg-note { opacity: 0 !important; }

        /* config frame (toggled by the badge) */
        .cfg-frame { position: absolute; inset: 0; z-index: 90; pointer-events: none; }
        .cfg-checker { position: absolute; inset: 0; border-radius: 22px; padding: 16px;
          background: repeating-conic-gradient(var(--f1) 0 25%, var(--f2) 0 50%) 0 0 / 32px 32px;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
          clip-path: inset(50% 50% 50% 50% round 22px); transition: clip-path .7s cubic-bezier(.6,0,.2,1); }
        .cfg-frame.on .cfg-checker { clip-path: inset(0 0 0 0 round 22px); }
        .cfg-frame .chip, .cfg-chip { font-size: 11px; opacity: 0; scale: .2; transition: opacity .2s, scale .45s cubic-bezier(.3,1.7,.5,1); transition-delay: 0s; }
        .cfg-frame.on .chip, .cfg-frame.on .cfg-chip { opacity: 1; scale: 1; transition-delay: calc(.45s + var(--i) * 90ms); }
        .cfg-chip { position: absolute; left: 30px; top: 4px; display: flex; align-items: center; rotate: -3deg; }
        .cfg-word { background: #0A0A0A; color: #fff; font-size: 20px; padding: 2px 7px; letter-spacing: -.03em; }
        .cfg-year { background: #0A0A0A; color: #fff; font-size: 20px; padding: 2px 10px; border-radius: 999px; letter-spacing: -.03em; }
        @media (max-width: 760px) {
          .cfg-checker { padding: 9px; background-size: 18px 18px; }
          .cfg-frame .chip { font-size: 8px; }
          .cfg-word, .cfg-year { font-size: 14px; }
          .cfg-chip { left: auto; right: 14px; top: auto; bottom: 2px; }
          .cfg-frame > .chip:nth-of-type(2), .cfg-frame > .chip:nth-of-type(3), .cfg-frame > .chip:nth-of-type(5) { display: none; } /* keep the edges clear on a small screen */
        }

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
          background: repeating-conic-gradient(var(--f1) 0 25%, var(--f2) 0 50%) 0 0 / 52px 30px;
          transition: --f1 .6s ease, --f2 .6s ease;
        }
        .chip { font-size: 7.5px; letter-spacing: .05em; white-space: nowrap; line-height: 1; transition: transform .35s cubic-bezier(.3,1.6,.5,1); }

        /* selection frame */
        /* title garden */
        .title-frame { cursor: pointer; outline: none; }
        .title-frame h1 { position: relative; }
        .garden { position: absolute; z-index: 2; overflow: visible; pointer-events: none; transition: opacity .4s, transform .45s ease-in; }
        .garden { transform-origin: 50% 50%; }
        .garden.wither { transform: scale(var(--gsx), var(--gsy)); transition: transform 1.6s cubic-bezier(.45,0,.4,1); }
        .garden.wither .g-vine { stroke-dashoffset: 0; animation: gRetract 1.3s cubic-bezier(.5,0,.6,1) forwards; }
        .garden.wither .g-pop { transform: scale(1); animation: gUnpop .35s cubic-bezier(.5,0,.8,.4) forwards; }
        @keyframes gRetract { from { stroke-dashoffset: 0; } 92% { opacity: .9; } to { stroke-dashoffset: 1; opacity: 0; } }
        @keyframes gUnpop { from { transform: scale(1); } to { transform: scale(0); } }
        .g-vine { fill: none; opacity: .9; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; animation: gGrow 1.4s cubic-bezier(.35,.1,.25,1) forwards; }
        @keyframes gGrow { to { stroke-dashoffset: 0; } }
        .g-pop { transform-box: fill-box; transform-origin: 0 50%; transform: scale(0); animation: gPop .45s cubic-bezier(.3,1.7,.5,1) forwards; }
        .g-rose { transform-origin: center; }
        @keyframes gPop { to { transform: scale(1); } }
        .hint-tap { display: none; }
        .sel-hint { position: absolute; right: -2px; top: -26px; font-family: var(--font-hand), cursive; font-size: 17px; color: ${FIG.ink}; white-space: nowrap; opacity: 0; transform: translateY(4px) rotate(-2deg); transition: opacity .25s, transform .25s; }
        .title-frame:hover .sel-hint, .title-frame:focus-visible .sel-hint { opacity: 1; transform: rotate(-2deg); }
        .title-frame .sel { transition: inset 1.6s cubic-bezier(.45,0,.4,1); } /* shrink back with the retracting vines */
        .title-frame.grown .sel { transition: inset .45s cubic-bezier(.3,1.5,.5,1); inset: -${10 + FRAME_GROW}px -${14 + FRAME_GROW}px; }
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

        /* ── Tablets (portrait): a taller composed layout ── */
        @media (min-width: 761px) and (max-width: 1100px) and (orientation: portrait) {
          .pos-rc       { left: 7% !important; top: 4% !important; }
          .pos-badge    { left: auto !important; right: 7%; }
          .pos-mic      { left: 40% !important; top: 21% !important; }
          .center-text  { top: 47% !important; width: 84vw !important; }
          .title-huge   { font-size: 8.4vw !important; }
          .center-text p:first-of-type { font-size: 2.6vw !important; margin: 34px 0 24px !important; }
          .cta { font-size: 2.3vw; padding: 1.5vw 3vw; }
          .pos-quill    { left: 44% !important; top: 81% !important; }
          .pos-stats    { left: 6% !important; top: 66% !important; }
          .pos-mountain { left: 38% !important; top: 64% !important; }
          .pos-tal      { left: auto !important; right: 8%; top: 63% !important; }
          .pos-vinyl    { left: 9% !important; top: 84% !important; }
          .kao-1 { left: 62% !important; top: 30% !important; }
          .kao-2 { left: 7% !important; top: 57% !important; }
          .kao-3 { left: 72% !important; top: 89% !important; }
          .kao-4 { left: 12% !important; top: 25% !important; }
        }

        /* ── Tablets (landscape): desktop layout, nudged so nothing collides ── */
        @media (min-width: 761px) and (max-width: 1100px) and (orientation: landscape) {
          .pos-badge    { left: auto !important; right: 4%; scale: .78; transform-origin: top right; }
          .pos-vinyl    { scale: .85; transform-origin: top right; }
          .pos-tal      { top: 66% !important; scale: .9; }
          .kao-4 { left: 8% !important; top: 10% !important; }
          .kao-2 { left: 76% !important; top: 86% !important; }
        }

                /* ── Phones: a composed one-screen layout (items are scaled with the scale property, which Drag compensates for) ── */
        @media (max-width: 760px) {
          .hide-mobile { display: none !important; }
          .window { min-height: 600px !important; }

          /* top band: badge hanging top-left, bragging widget top-right, jigglypuff centred under them */
          .pos-badge    { left: 16px !important; top: -6px !important; scale: .56; transform-origin: top left; }
          .pos-rc       { left: auto !important; right: 6px; top: 14px !important; scale: .8; transform-origin: top right; }
          .pos-mic      { left: 50% !important; margin-left: -48px; top: 13% !important; scale: .6; --k: .6; transform-origin: top center; } /* 96px wide, centred above the name */

          /* centre: name + CTAs */
          .center-text  { top: 41% !important; width: calc(100% - 28px) !important; }
          .title-huge   { font-size: clamp(32px, 9.4vw, 42px) !important; }
          .sel-name { font-size: 9px; top: -17px; }
          .sel-dim { display: none; } /* would sit on the tagline at this size */
          .sel-hint { font-size: 14px; top: -21px; opacity: .85; transform: rotate(-2deg); }
          .hint-click { display: none; } .hint-tap { display: inline; }
          .pos-mic, .pos-mountain { display: none !important; } /* phone only: jigglypuff + mountain prints stay on tablet/desktop */
          /* kaomoji tucked into the gaps of the phone layout */
          .kao-pos .kao { font-size: 12px; }
          .kao-1 { left: 7% !important; top: 22% !important; }
          .kao-2 { left: 44% !important; top: 93% !important; }
          .kao-3 { left: 40% !important; top: 56% !important; }
          .kao-4 { left: auto !important; right: 7%; top: 19% !important; }
          .center-text p:first-of-type { margin: 30px 0 16px !important; font-size: 15px !important; }
          .cta { font-size: 15px; padding: 11px 20px; min-height: 44px; touch-action: manipulation; }

          /* bottom collage */
          .pos-stats    { left: 3% !important;  top: 61% !important; scale: .62; --k: .62; transform-origin: top left; }
          .pos-quill    { left: 45% !important; top: 72% !important; scale: .5; --k: .5;  transform-origin: top left; }
          .pos-mountain { left: auto !important; right: 8%; top: 60% !important; scale: .66; --k: .66; transform-origin: top right; }
          .pos-vinyl    { left: 8% !important; top: 83% !important; scale: .46; --k: .46; transform-origin: top left; }
          .pos-tal      { left: auto !important; right: 2%; top: 78% !important; scale: .56; --k: .56; transform-origin: top right; }

          /* tap notes: stack under the object, wrap, never run off-screen */
          /* every note renders at the same on-screen size: divide by the item's scale (--k) */
          .egg-note { font-size: calc(15.5px / var(--k, 1)); white-space: normal; width: max-content; max-width: calc(170px / var(--k, 1)); text-align: center; background: #fff; padding: calc(5px / var(--k, 1)) calc(11px / var(--k, 1)) calc(7px / var(--k, 1)); border-radius: calc(11px / var(--k, 1)); box-shadow: 0 10px 24px -8px rgba(0,0,0,.28), 0 0 0 1px rgba(0,0,0,.04); }
          .egg-note-left, .egg-note-right { left: 50%; right: auto; top: calc(100% + 6px); transform: translate(-50%, -6px) rotate(-3deg); }
          .egg-inner:focus .egg-note-left, .egg-inner:focus .egg-note-right { transform: translate(-50%, 0) rotate(-3deg); }
          .pos-tal .egg-note, .pos-mountain .egg-note { left: auto; right: 0; transform: rotate(-3deg); text-align: right; }
          .pos-vinyl .egg-note { left: 0; right: auto; transform: rotate(-3deg); text-align: left; }
          .pos-tal .egg-note-left, .pos-mountain .egg-note-top, .pos-vinyl .egg-note-left { top: auto; bottom: calc(100% + 6px); }
          .crate { right: auto; top: auto; left: 50%; bottom: calc(100% + 4px); display: flex; gap: 8px; transform: translateX(-50%); }

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
          .pos-stats    { top: 60% !important; scale: .7; --k: .7; }
          .pos-quill    { top: 73% !important; left: 45% !important; scale: .56; --k: .56; }
          .pos-mountain { top: 59% !important; scale: .76; --k: .76; }
          .pos-vinyl    { top: 84.5% !important; left: 10% !important; scale: .5; --k: .5; }
          .pos-tal      { top: 78% !important; scale: .62; --k: .62; }
          .pos-mic      { top: 14% !important; scale: .68; --k: .68; }
        }

        /* very short phones (iPhone SE / landscape-ish): tighten the centre */
        @media (max-width: 760px) and (max-height: 700px) {
          .center-text { top: 40% !important; }
          .title-huge { font-size: clamp(30px, 9vw, 38px) !important; }
          .pos-vinyl { top: 83% !important; scale: .42; --k: .42; }
          .pos-tal { top: 76% !important; scale: .5; --k: .5; }
          .pos-mic { top: 11% !important; scale: .54; --k: .54; }
          .kao-1 { left: 8% !important; top: 77% !important; }
          .kao-4 { display: none; } /* no free spot on a short screen */
        }
      `}</style>

      {/* ═══════ SKY with drifting clouds (fixed, behind everything) ═══════ */}
      <div className="sky" aria-hidden="true">
        {/* pocketful of sunshine: bright morning sun */}
        <div className="scene scene-sunshine">
          <div className="morning-rays" />
          <div className="morning-sun" />
        </div>
        <div className="cloud cloud-b" />
        <div className="cloud cloud-a" />
        {/* mystery of love: a soft pastel sunset photo (with its two birds) over the clouds */}
        <div className="scene scene-mystery sunset-photo" />
      </div>

      {/* ═══════ DESKTOP CANVAS — a rounded window floating on the sky ═══════ */}
      <main
        className="window"
        style={{
          ...(() => {
            const [f1, f2] = FRAME_PALETTES[Math.max(0, framePalette - 1) % FRAME_PALETTES.length]
            return { '--f1': f1, '--f2': f2 } as React.CSSProperties
          })(),
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
        <ConfigFrame on={configFrame} />
        <div style={{ position: 'relative', height: '100%' }}>

          {/* ═══════ Multiplayer cursors ═══════ */}
          <Cursor name="neelakshi" color={FIG.purple} className="cur-a hide-mobile" />
          <Cursor name="you?" color={FIG.green} className="cur-b hide-mobile" />

          {/* ═══════ KAOMOJI ═══════ */}
          {/* kaomoji: draggable like everything else */}
          <Drag x="31%" y="24%" z={6} className="kao-pos kao-1"><Kao frames={['^ ω ^', '^ ▽ ^', '^ ω ^', '> ω <']} delay={0} /></Drag>
          <Drag x="calc(67% - 110px)" y="88%" z={6} className="kao-pos kao-2"><Kao frames={['¯\\_(ツ)_/¯', '¯\\_(ツ)_/¯', '\\_(ツ)_/']} delay={0.6} /></Drag>
          <Drag x="28%" y="62%" z={6} className="kao-pos kao-3"><Kao frames={['(¬_¬)', '(¬_¬ )', '( ¬_¬)', '(¬_¬)', '(-_-)']} delay={1.1} /></Drag>
          <Drag x="calc(74% - 70px)" y="30%" z={6} className="kao-pos kao-4"><Kao frames={['{ ^-^ }', '{ ^o^ }', '{ ^-^ }', '{ -‿- }']} delay={1.7} /></Drag>

          {/* ═══════ LEFT ═══════ */}

          {/* Singing */}
          <Egg x="16%" y="24%" rot={-6} className="pos-mic" side="bottom" label="jigglypuff singing — about singing"
            note={<>i <u>sing</u>!<br />ask me for a song</>}>
            <SingingPuff />
          </Egg>

          {/* Quilling */}
          <Egg x="6%" y="40%" rot={-4} className="pos-quill" side="right" label="a minion made with paper quilling"
            note={<>i do <u>paper quilling</u>!</>}>
            <QuilledMinion />
          </Egg>

          {/* vectordrop, in lego */}
          <VectordropCorner />

          {/* Mountains */}
          <Egg x="30%" y="74%" rot={-5} className="pos-mountain" side="top" label="mountain postcards — two of my photos"
            note={<>happiest in the <u>mountains</u></>}>
            <MountainPostcard />
          </Egg>

          {/* ═══════ RIGHT ═══════ */}

          {/* Music */}
          <MusicCorner />

          {/* Talindrew */}
          <LabCorner />

          {/* ═══════ Config badge hanging from the top edge ═══════ */}
          <div className="pos-badge" style={{ position: 'absolute', top: -6, left: 'calc(100% - 300px)', zIndex: 110 }}>
            <ConfigBadge on={configFrame} onToggle={toggleFrame} />
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
            <div
              className={`title-frame${garden && !withering ? ' grown' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={garden ? 'heading garden — click to regrow' : 'heading — click to grow a garden'}
              onClick={bloom}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bloom() } }}
              style={{ position: 'relative', display: 'inline-block' }}
            >
              {garden > 0 && titleSize && <TitleGarden key={garden} seed={garden} w={titleSize.w} h={titleSize.h} withering={withering} />}
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
              <div className="sel" aria-hidden="true">
                <i /><i /><i /><i />
                <span className="sel-name"># hello-config</span>
                {!garden && <span className="sel-hint"><span className="hint-click">click</span><span className="hint-tap">tap</span> to bloom ✿</span>}
                {titleSize && (
                  <span className="sel-dim">{Math.round(titleSize.w + (garden && !withering ? FRAME_GROW * 2 : 0))} × {Math.round(titleSize.h + (garden && !withering ? FRAME_GROW * 2 : 0))}</span>
                )}
              </div>
            </div>

            <p style={{ fontSize: 'clamp(16px, 1.6vw, 22px)', color: '#1A1A1A', margin: '38px 0 22px', lineHeight: 1.3 }}>
              i design, build &amp; ship ~ with ai as my sidekick
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
