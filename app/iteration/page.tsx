'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const PIXEL = 8

type Expression = 'neutral' | 'smile' | 'wide' | 'blink' | 'surprised' | 'happy'

// Pixelated shapes drawn on canvas
function drawPixelRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  ctx.fillStyle = color
  for (let px = 0; px < w; px += PIXEL) {
    for (let py = 0; py < h; py += PIXEL) {
      ctx.fillRect(x + px, y + py, PIXEL - 1, PIXEL - 1)
    }
  }
}

function drawPixelEllipse(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  color: string
) {
  ctx.fillStyle = color
  for (let px = -rx; px < rx; px += PIXEL) {
    for (let py = -ry; py < ry; py += PIXEL) {
      const nx = px / rx
      const ny = py / ry
      if (nx * nx + ny * ny <= 1) {
        ctx.fillRect(cx + px, cy + py, PIXEL - 1, PIXEL - 1)
      }
    }
  }
}

function drawPixelArc(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  startAngle: number,
  endAngle: number,
  color: string,
  thickness: number = 3
) {
  ctx.fillStyle = color
  for (let px = -rx - PIXEL; px < rx + PIXEL; px += PIXEL) {
    for (let py = -ry - PIXEL; py < ry + PIXEL; py += PIXEL) {
      const nx = px / rx
      const ny = py / ry
      const dist = nx * nx + ny * ny
      const angle = Math.atan2(py, px)
      const t = thickness * PIXEL / Math.min(rx, ry)
      if (dist <= 1 && dist >= (1 - t) * (1 - t) && angle >= startAngle && angle <= endAngle) {
        ctx.fillRect(cx + px, cy + py, PIXEL - 1, PIXEL - 1)
      }
    }
  }
}

export default function IterationPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const expressionRef = useRef<Expression>('neutral')
  const expressionTimerRef = useRef<NodeJS.Timeout | null>(null)
  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [, setTick] = useState(0)

  const scheduleExpression = useCallback(() => {
    if (expressionTimerRef.current) clearTimeout(expressionTimerRef.current)
    const delay = 1500 + Math.random() * 2500
    expressionTimerRef.current = setTimeout(() => {
      const expressions: Expression[] = ['smile', 'smile', 'smile', 'happy', 'happy', 'wide', 'surprised', 'neutral']
      const next = expressions[Math.floor(Math.random() * expressions.length)]
      expressionRef.current = next
      // Hold expression for 1-2s then return to neutral
      setTimeout(() => {
        expressionRef.current = 'neutral'
        scheduleExpression()
      }, 1000 + Math.random() * 1000)
    }, delay)
  }, [])

  const scheduleBlink = useCallback(() => {
    if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current)
    const delay = 2500 + Math.random() * 3500
    blinkTimerRef.current = setTimeout(() => {
      expressionRef.current = 'blink'
      setTimeout(() => {
        expressionRef.current = 'neutral'
        scheduleBlink()
      }, 150)
    }, delay)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleClick = () => {
      expressionRef.current = 'blink'
      setTimeout(() => {
        expressionRef.current = 'neutral'
      }, 150)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    scheduleExpression()
    scheduleBlink()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      if (expressionTimerRef.current) clearTimeout(expressionTimerRef.current)
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current)
    }
  }, [scheduleExpression, scheduleBlink])

  useEffect(() => {
    let animId: number
    const canvas = canvasRef.current
    if (!canvas) return

    const render = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = '100%'
      canvas.style.height = '100vh'
      ctx.scale(dpr, dpr)

      // Background
      ctx.fillStyle = '#093fb4'
      ctx.fillRect(0, 0, w, h)

      const centerX = w / 2
      const centerY = h / 2

      // Mouse direction for eye tracking
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const dx = mx - centerX
      const dy = my - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxShift = 20
      const shiftX = dist > 0 ? (dx / dist) * Math.min(maxShift, dist * 0.05) : 0
      const shiftY = dist > 0 ? (dy / dist) * Math.min(maxShift, dist * 0.05) : 0

      const expression = expressionRef.current

      // Eye dimensions
      const eyeRX = 56
      const eyeRY = 72
      const eyeSpacing = 160

      const leftEyeX = centerX - eyeSpacing
      const rightEyeX = centerX + eyeSpacing
      const eyeY = centerY - 20

      // Pupil dimensions
      const pupilRX = 18
      const pupilRY = 24

      if (expression === 'blink') {
        // Draw blink as horizontal lines
        drawPixelRect(ctx, leftEyeX - eyeRX, eyeY - PIXEL, eyeRX * 2, PIXEL * 2, '#ffffff')
        drawPixelRect(ctx, rightEyeX - eyeRX, eyeY - PIXEL, eyeRX * 2, PIXEL * 2, '#ffffff')
      } else if (expression === 'happy') {
        // Happy eyes - upside down arcs (^ ^)
        drawPixelArc(ctx, leftEyeX, eyeY + 20, eyeRX, eyeRY, -Math.PI, 0, '#ffffff', 4)
        drawPixelArc(ctx, rightEyeX, eyeY + 20, eyeRX, eyeRY, -Math.PI, 0, '#ffffff', 4)
      } else {
        // Normal eyes
        const currentEyeRY = expression === 'surprised' ? eyeRY * 1.2 : eyeRY
        drawPixelEllipse(ctx, leftEyeX, eyeY, eyeRX, currentEyeRY, '#ffffff')
        drawPixelEllipse(ctx, rightEyeX, eyeY, eyeRX, currentEyeRY, '#ffffff')

        // Pupils (follow cursor)
        const pupilColor = '#093fb4'
        drawPixelEllipse(
          ctx,
          leftEyeX + shiftX,
          eyeY + shiftY,
          pupilRX,
          pupilRY,
          pupilColor
        )
        drawPixelEllipse(
          ctx,
          rightEyeX + shiftX,
          eyeY + shiftY,
          pupilRX,
          pupilRY,
          pupilColor
        )
      }

      // Mouth
      const mouthY = centerY + 90

      switch (expression) {
        case 'smile':
          // Smile arc
          drawPixelArc(ctx, centerX, mouthY - 10, 56, 40, 0.2, Math.PI - 0.2, '#ffffff', 5)
          break
        case 'wide':
          // Wide open mouth
          drawPixelEllipse(ctx, centerX, mouthY + 10, 44, 34, '#ffffff')
          break
        case 'surprised':
          // O shape
          drawPixelEllipse(ctx, centerX, mouthY + 10, 30, 38, '#ffffff')
          drawPixelEllipse(ctx, centerX, mouthY + 10, 16, 20, '#093fb4')
          break
        case 'happy':
          // Big smile
          drawPixelArc(ctx, centerX, mouthY - 16, 72, 52, 0.1, Math.PI - 0.1, '#ffffff', 5)
          break
        case 'neutral':
        case 'blink':
        default:
          // Neutral mouth - small smile
          drawPixelArc(ctx, centerX, mouthY - 6, 32, 24, 0.3, Math.PI - 0.3, '#ffffff', 4)
          break
      }

      // Scanline / CRT effect for extra pixelated feel
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 2)
      }

      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [])

  // Force re-render periodically to pick up expression changes
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ background: '#093fb4', minHeight: '100vh' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100vw',
          height: '100vh',
          cursor: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '80px 24px 120px',
          fontFamily: '"Courier New", Courier, monospace',
          color: '#ffffff',
          imageRendering: 'pixelated',
        }}
      >
        <h2
          style={{
            fontSize: 14,
            letterSpacing: 6,
            textTransform: 'uppercase',
            opacity: 0.5,
            marginBottom: 40,
          }}
        >
          {'> documenting the process_'}
        </h2>

        <Section
          label="01"
          title="what i design"
          lines={[
            'interfaces that feel alive.',
            'systems that respond to you,',
            'not the other way around.',
            '',
            'pixels with personality.',
            'layouts that breathe.',
            'details no one asked for',
            'but everyone notices.',
          ]}
        />

        <Section
          label="02"
          title="what i build"
          lines={[
            'things that move and react.',
            'canvas experiments at 2am.',
            'components that remember you.',
            '',
            'interactions > decorations.',
            'performance is a feature.',
            'every frame matters.',
          ]}
        />

        <Section
          label="03"
          title="what i learn"
          lines={[
            'that the best UI disappears.',
            'that constraints breed creativity.',
            'that shipping beats perfecting.',
            '',
            'iteration > ideation.',
            'every version teaches something',
            'the last one couldn\'t.',
          ]}
        />

        <div
          style={{
            marginTop: 80,
            paddingTop: 40,
            borderTop: '2px solid rgba(255,255,255,0.1)',
            fontSize: 12,
            opacity: 0.35,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          {'// this page is an iteration too_'}
        </div>
      </div>
    </div>
  )
}

function Section({
  label,
  title,
  lines,
}: {
  label: string
  title: string
  lines: string[]
}) {
  return (
    <div style={{ marginBottom: 64 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontSize: 11,
            opacity: 0.4,
            letterSpacing: 2,
          }}
        >
          {label}
        </span>
        <h3
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'lowercase',
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      <div style={{ paddingLeft: 36 }}>
        {lines.map((line, i) =>
          line === '' ? (
            <div key={i} style={{ height: 16 }} />
          ) : (
            <p
              key={i}
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                margin: 0,
                opacity: 0.7,
                letterSpacing: 1,
              }}
            >
              {line}
            </p>
          )
        )}
      </div>
    </div>
  )
}
