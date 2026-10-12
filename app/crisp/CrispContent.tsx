'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { GeistPixelSquare } from 'geist/font/pixel'

const geo = GeistPixelSquare

// ─── Pointer-capture drag — direct DOM writes, zero React re-renders ──────────
function Drag({
  children,
  x,
  y,
  rot = 0,
}: {
  children: React.ReactNode
  x: string
  y: string
  rot?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const s = useRef({ drag: false, px: 0, py: 0, ox: 0, oy: 0, cx: 0, cy: 0 })

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `rotate(${rot}deg)`,
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
        willChange: 'transform',
        zIndex: 10,
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
        }
        el.style.zIndex = '200'
        el.style.cursor = 'grabbing'
      }}
      onPointerMove={(e) => {
        const st = s.current
        if (!st.drag || !ref.current) return
        st.cx = st.ox + (e.clientX - st.px)
        st.cy = st.oy + (e.clientY - st.py)
        ref.current.style.transform = `translate(${st.cx}px,${st.cy}px) rotate(${rot}deg)`
      }}
      onPointerUp={() => {
        s.current.drag = false
        if (ref.current) {
          ref.current.style.cursor = 'grab'
          ref.current.style.zIndex = '10'
        }
      }}
    >
      {children}
    </div>
  )
}

// ─── Mac window ───────────────────────────────────────────────────────────────
function MacWin({ title, children, w = 180 }: { title: string; children: React.ReactNode; w?: number }) {
  return (
    <div style={{
      width: w, background: '#fff', borderRadius: 10,
      boxShadow: '0 8px 28px rgba(0,0,0,0.12)', border: '1px solid #E0E0E0', overflow: 'hidden',
    }}>
      <div style={{
        background: '#F0EFEF', padding: '6px 10px', borderBottom: '1px solid #E0E0E0',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E', flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', flexShrink: 0 }} />
        <span style={{ fontSize: 10, color: '#999', marginLeft: 6, fontFamily: 'inherit' }}>{title}</span>
      </div>
      <div style={{ padding: '10px 12px' }}>{children}</div>
    </div>
  )
}

// ─── Sticky note ──────────────────────────────────────────────────────────────
function Sticky({ children, color = '#FFE566' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      background: color, padding: '12px 14px', width: 148,
      boxShadow: '3px 4px 14px rgba(0,0,0,0.13)', fontSize: 12,
      fontFamily: "'Neue Montreal', sans-serif", lineHeight: 1.55, color: '#1a1a1a',
    }}>
      {children}
    </div>
  )
}

// ─── Pill sticker ─────────────────────────────────────────────────────────────
function Sticker({ children, bg = '#0D0D0D', color = '#fff' }: { children: React.ReactNode; bg?: string; color?: string }) {
  return (
    <div style={{
      background: bg, color, padding: '8px 14px', borderRadius: 999,
      fontSize: 12, fontFamily: "'Neue Montreal', sans-serif", whiteSpace: 'nowrap',
      boxShadow: '0 3px 10px rgba(0,0,0,0.14)', lineHeight: 1.4,
    }}>
      {children}
    </div>
  )
}

const LINKS = [
  { label: 'email', href: 'mailto:dasneelakshi01@gmail.com' },
  { label: 'x', href: 'https://x.com/bluecoder2003' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/neelakshi-das-b0ba68244/' },
  { label: 'portfolio →', href: '/' },
]

export default function CrispContent() {
  return (
    <>
      {/* Suppress preloader */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{localStorage.setItem('portfolio-visited','true')}catch(e){}`,
        }}
      />

      <style>{`
        .cp { display:inline-flex; align-items:center; padding:10px 18px; font-size:13px; border:1px solid #D0D0D0; border-radius:999px; color:#0D0D0D; text-decoration:none; transition:background .18s,color .18s,border-color .18s,transform .1s; font-family:'Neue Montreal',sans-serif; -webkit-tap-highlight-color:transparent; touch-action:manipulation; }
        .cp:active,.cp:hover { background:#0D0D0D; color:#fff; border-color:#0D0D0D; }
        .cp:active { transform:scale(.96); }
      `}</style>

      {/* ── Canvas ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          background: '#F5F4F2',
          fontFamily: "'Neue Montreal','Helvetica Neue',Arial,sans-serif",
          WebkitFontSmoothing: 'antialiased',
        }}
      >

        {/* ── FLOATING ELEMENTS ───────────────────────────────────────── */}

        {/* 1 — job desc meme (top-left, half off-screen) */}
        <Drag x="-28px" y="22px" rot={-4}>
          <MacWin title="job-desc.txt" w={178}>
            <p style={{ fontSize: 11, color: '#555', lineHeight: 1.65, margin: 0 }}>
              <b style={{ color: '#0D0D0D' }}>role:</b> senior pixel pusher<br />
              – move things until it looks right<br />
              – say &ldquo;that&apos;s intentional&rdquo;<br />
              – ship it anyway&nbsp;🚀
            </p>
          </MacWin>
        </Drag>

        {/* 2 — kaomoji card (top-right) */}
        <Drag x="calc(100% - 138px)" y="14px" rot={3.5}>
          <div style={{
            background: '#fff', padding: '12px 16px', borderRadius: 10,
            boxShadow: '0 6px 20px rgba(0,0,0,0.10)', border: '1px solid #E8E8E8', textAlign: 'center',
          }}>
            <p style={{ fontSize: 20, margin: '0 0 4px', letterSpacing: 3 }}>(^ ω ^)</p>
            <p style={{ fontSize: 10, color: '#BBB', margin: 0, fontFamily: 'monospace' }}>drag things!</p>
          </div>
        </Drag>

        {/* 3 — open to connect badge (top-center) */}
        <Drag x="calc(50% - 68px)" y="10px" rot={-1.5}>
          <div style={{
            background: '#fff', border: '1px solid #E0E0E0', borderRadius: 999,
            padding: '6px 14px', fontSize: 12, color: '#0D0D0D',
            fontFamily: "'Neue Montreal',sans-serif",
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', whiteSpace: 'nowrap',
          }}>
            ✨ open to connect
          </div>
        </Drag>

        {/* 4 — 3am sticky (left, below name) */}
        <Drag x="-10px" y="62vh" rot={-5}>
          <Sticky>
            <b>3am thought:</b><br />
            what if I just<br />
            redesigned my<br />
            portfolio again<br /><br />
            <span style={{ fontSize: 13 }}>(╥_╥)</span>
          </Sticky>
        </Drag>

        {/* 5 — client meme window (right, peeking) */}
        <Drag x="calc(100% - 72px)" y="35vh" rot={4}>
          <MacWin title="design-review.exe" w={164}>
            <p style={{ fontSize: 11, color: '#555', lineHeight: 1.65, margin: 0 }}>
              client: make it pop<br />
              me:&nbsp;🔥<br />
              client: not like that<br />
              me:&nbsp;🫠
            </p>
          </MacWin>
        </Drag>

        {/* 6 — ai native sticker (bottom-left) */}
        <Drag x="10px" y="78vh" rot={-6}>
          <Sticker bg="#093FB4" color="#fff">🤖 ai native</Sticker>
        </Drag>

        {/* 7 — stack sticky (bottom-right) */}
        <Drag x="calc(100% - 148px)" y="74vh" rot={5}>
          <Sticky color="#E8F4FF">
            <b>stack rn:</b><br />
            figma &rarr; framer<br />
            next.js + tailwind<br />
            claude api&nbsp;✨<br />
            vibes: maximum
          </Sticky>
        </Drag>

        {/* 8 — git commit meme (bottom, partially hidden) */}
        <Drag x="calc(50% - 220px)" y="82vh" rot={-2}>
          <MacWin title="git-commit.log" w={154}>
            <p style={{ fontSize: 10, color: '#555', margin: 0, fontFamily: 'monospace', lineHeight: 1.65 }}>
              &gt; &quot;quick fix&quot;<br />
              47 files changed<br />
              823 insertions<br />
              <span style={{ fontSize: 13 }}>🙃</span>
            </p>
          </MacWin>
        </Drag>

        {/* ── CENTER CONTENT (always on top, non-drag) ────────────────── */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(300px, 78vw)',
            zIndex: 20,
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(42px, 13vw, 62px)',
              lineHeight: 0.9,
              fontWeight: 400,
              color: '#0D0D0D',
              letterSpacing: '-0.04em',
              margin: '0 0 16px',
              fontFamily: "'Neue Montreal','Helvetica Neue',Arial,sans-serif",
            }}
          >
            neelakshi<br />das
          </h1>

          <div style={{ width: 24, height: 1, background: '#C8C8C8', margin: '0 0 14px' }} />

          <p
            className={geo.className}
            style={{ fontSize: 17, color: '#093FB4', margin: '0 0 5px' }}
          >
            design engineer
          </p>
          <p style={{ fontSize: 13, color: '#999', margin: 0, lineHeight: 1.45 }}>
            fluent in ai, design and the web
          </p>

          <p style={{ fontSize: 12, color: '#BBBBBB', margin: '12px 0 0' }}>
            currently at{' '}
            <a href="https://oleria.com" target="_blank" rel="noopener noreferrer"
              style={{ color: '#093FB4', textDecoration: 'none' }}>
              @oleria
            </a>
            {' '}· prev{' '}
            <a href="https://cosx.ai" target="_blank" rel="noopener noreferrer"
              style={{ color: '#BBBBBB', textDecoration: 'none' }}>
              @cosx.ai
            </a>
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, margin: '18px 0 0' }}>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('/') || l.href.startsWith('mailto') ? undefined : '_blank'}
                rel={l.href.startsWith('/') || l.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="cp"
              >
                {l.label}
              </a>
            ))}
          </div>

          <p style={{ fontSize: 11, color: '#D0D0D0', fontFamily: 'monospace', margin: '14px 0 0', letterSpacing: '.05em' }}>
            (^ ω ^)
          </p>
        </div>

        {/* drag hint */}
        <p style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          fontSize: 11, color: '#C8C8C8', fontFamily: 'monospace', whiteSpace: 'nowrap',
          pointerEvents: 'none', letterSpacing: '.04em',
        }}>
          drag the stuff around ↑
        </p>
      </div>
    </>
  )
}
