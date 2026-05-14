'use client'

import { useEffect, useRef, useState } from 'react'
import { useSky } from '@/contexts/SkyContext'
import { useSound } from '@/hooks/useSound'

const positions = [
  { year: '2026', org: 'CosX',  role: 'Design Engineer Intern' },
  { year: '2025', org: 'Vexio', role: 'UI/UX Designer & Dev Intern' },
]

function PixelSun({ isSunset = false, blinking = false, size = 5 }: {
  isSunset?: boolean; blinking?: boolean; size?: number
}) {
  const s = size
  const core      = isSunset ? '#FFD56A' : '#FFF67A'
  const outline   = isSunset ? '#FFC533' : '#FFD400'
  const highlight = isSunset ? '#FFF1B0' : '#FFFFCF'
  const ray       = isSunset ? '#FFCF59' : '#FFD94A'
  const rayTip    = isSunset ? '#FFBD45' : '#FFC94A'

  const body: Array<{ x: number; y: number; c: string }> = [
    {x:5,y:0,c:outline},{x:6,y:0,c:outline},{x:7,y:0,c:outline},
    {x:3,y:1,c:outline},{x:4,y:1,c:outline},{x:5,y:1,c:core},{x:6,y:1,c:core},{x:7,y:1,c:core},{x:8,y:1,c:outline},{x:9,y:1,c:outline},
    {x:2,y:2,c:outline},{x:3,y:2,c:core},{x:4,y:2,c:core},{x:5,y:2,c:highlight},{x:6,y:2,c:highlight},{x:7,y:2,c:core},{x:8,y:2,c:core},{x:9,y:2,c:core},{x:10,y:2,c:outline},
    {x:1,y:3,c:outline},{x:2,y:3,c:core},{x:3,y:3,c:highlight},{x:4,y:3,c:highlight},{x:5,y:3,c:highlight},{x:6,y:3,c:highlight},{x:7,y:3,c:highlight},{x:8,y:3,c:core},{x:9,y:3,c:core},{x:10,y:3,c:core},{x:11,y:3,c:outline},
    {x:1,y:4,c:outline},{x:2,y:4,c:core},{x:3,y:4,c:highlight},{x:4,y:4,c:'#D4A243'},{x:5,y:4,c:highlight},{x:6,y:4,c:highlight},{x:7,y:4,c:highlight},{x:8,y:4,c:'#D4A243'},{x:9,y:4,c:core},{x:10,y:4,c:core},{x:11,y:4,c:outline},
    {x:0,y:5,c:outline},{x:1,y:5,c:core},{x:2,y:5,c:highlight},{x:3,y:5,c:'#F7B7C8'},{x:4,y:5,c:highlight},{x:5,y:5,c:highlight},{x:6,y:5,c:highlight},{x:7,y:5,c:highlight},{x:8,y:5,c:highlight},{x:9,y:5,c:'#F7B7C8'},{x:10,y:5,c:core},{x:11,y:5,c:core},{x:12,y:5,c:outline},
    {x:0,y:6,c:outline},{x:1,y:6,c:core},{x:2,y:6,c:highlight},{x:3,y:6,c:highlight},{x:4,y:6,c:highlight},{x:5,y:6,c:highlight},{x:6,y:6,c:highlight},{x:7,y:6,c:highlight},{x:8,y:6,c:highlight},{x:9,y:6,c:core},{x:10,y:6,c:core},{x:11,y:6,c:core},{x:12,y:6,c:outline},
    {x:1,y:7,c:outline},{x:2,y:7,c:core},{x:3,y:7,c:highlight},{x:4,y:7,c:highlight},{x:5,y:7,c:highlight},{x:6,y:7,c:highlight},{x:7,y:7,c:highlight},{x:8,y:7,c:core},{x:9,y:7,c:core},{x:10,y:7,c:core},{x:11,y:7,c:outline},
    {x:1,y:8,c:outline},{x:2,y:8,c:core},{x:3,y:8,c:core},{x:4,y:8,c:highlight},{x:5,y:8,c:highlight},{x:6,y:8,c:highlight},{x:7,y:8,c:core},{x:8,y:8,c:core},{x:9,y:8,c:core},{x:10,y:8,c:outline},
    {x:2,y:9,c:outline},{x:3,y:9,c:core},{x:4,y:9,c:core},{x:5,y:9,c:core},{x:6,y:9,c:core},{x:7,y:9,c:core},{x:8,y:9,c:core},{x:9,y:9,c:outline},
    {x:4,y:10,c:outline},{x:5,y:10,c:outline},{x:6,y:10,c:outline},{x:7,y:10,c:outline},
  ]

  const rays: Array<{ x: number; y: number; c: string }> = [
    {x:5,y:-3,c:rayTip},{x:6,y:-3,c:rayTip},{x:5,y:-2,c:ray},{x:6,y:-2,c:ray},
    {x:0,y:0,c:rayTip},{x:1,y:0,c:rayTip},{x:-1,y:1,c:ray},{x:0,y:1,c:ray},
    {x:11,y:0,c:rayTip},{x:12,y:0,c:rayTip},{x:12,y:1,c:ray},{x:13,y:1,c:ray},
    {x:-3,y:5,c:rayTip},{x:-2,y:5,c:rayTip},{x:-1,y:5,c:ray},{x:-2,y:6,c:ray},
    {x:13,y:5,c:rayTip},{x:14,y:5,c:rayTip},{x:12,y:5,c:ray},{x:13,y:6,c:ray},
    {x:0,y:10,c:rayTip},{x:1,y:10,c:rayTip},{x:-1,y:9,c:ray},{x:0,y:9,c:ray},
    {x:11,y:10,c:rayTip},{x:12,y:10,c:rayTip},{x:12,y:9,c:ray},{x:13,y:9,c:ray},
    {x:5,y:12,c:rayTip},{x:6,y:12,c:rayTip},{x:5,y:11,c:ray},{x:6,y:11,c:ray},
  ]

  const dim = s * 16

  return (
    <div
      aria-hidden="true"
      style={{ position: 'relative', width: dim, height: dim }}
    >
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        width: s * 13, height: s * 11,
        transform: 'translate(-50%, -50%)',
      }}>
        {rays.map(({ x, y, c }, i) => (
          <div key={`r${i}`} style={{ position:'absolute', left:x*s, top:y*s, width:s, height:s, backgroundColor:c }} />
        ))}
        {body.map(({ x, y, c }, i) => {
          const isEye = c === '#D4A243'
          return (
            <div
              key={`b${i}`}
              style={{
                position: 'absolute',
                left: x * s,
                top:  isEye && blinking ? y * s + Math.floor(s * 0.4) : y * s,
                width: s,
                height: isEye && blinking ? Math.max(1, Math.floor(s * 0.2)) : s,
                backgroundColor: c,
                transition: 'height 60ms ease-in-out, top 60ms ease-in-out',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function HeroSection() {
  const { mode, setMode, setEnabled } = useSky()
  const { playSound } = useSound()
  const [blinking, setBlinking] = useState(false)
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setEnabled(true)
    return () => setEnabled(false)
  }, [setEnabled])

  // Schedule random eye blinks
  useEffect(() => {
    const schedule = () => {
      blinkTimer.current = setTimeout(() => {
        setBlinking(true)
        setTimeout(() => { setBlinking(false); schedule() }, 150)
      }, 2500 + Math.random() * 4500)
    }
    schedule()
    return () => { if (blinkTimer.current) clearTimeout(blinkTimer.current) }
  }, [])

  const handleSunClick = () => {
    playSound('toggle')
    setMode(mode === 'sunset' ? 'day' : 'sunset')
  }

  return (
    <section className="relative mb-[var(--space-xxxxxl)] pt-[var(--space-xl)] pb-[var(--space-xxxl)]">

      {/* Sun — replaces ghost, doubles as day/sunset toggle */}
      <button
        onClick={handleSunClick}
        className="cursor-pointer mb-[var(--space-lg)] block"
        aria-label={mode === 'sunset' ? 'Switch to day sky' : 'Switch to sunset sky'}
      >
        <PixelSun isSunset={mode === 'sunset'} blinking={blinking} size={5} />
      </button>

      <p className="type-body text-[var(--color-secondary)] max-w-[360px] mb-[var(--space-xl)]">
        Design engineer working at the seam of AI, design, and the web.
        I ship product surfaces end-to-end — research, interfaces, code,
        and the metrics that prove they worked.
      </p>

      <div className="flex flex-col gap-[var(--space-xs)]">
        {positions.map(p => (
          <div key={p.org} className="flex gap-[var(--space-xl)]">
            <span className="type-meta text-[var(--color-meta)] w-8 shrink-0">{p.year}</span>
            <span className="type-body text-[var(--color-primary)] w-[72px] shrink-0">{p.org}</span>
            <span className="type-body text-[var(--color-secondary)]">{p.role}</span>
          </div>
        ))}
      </div>

    </section>
  )
}
