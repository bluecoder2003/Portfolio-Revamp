'use client'

import { useEffect, useRef, useState } from 'react'

export default function Preloader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Check if first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('portfolio-visited')
    if (!hasVisited) {
      setIsVisible(true)
      localStorage.setItem('portfolio-visited', 'true')
    } else {
      setIsVisible(false)
      setIsLoading(false)
    }
  }, [])

  // Simulate loading progress
  useEffect(() => {
    if (!isVisible || !isLoading) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        return prev + Math.random() * 20
      })
    }, 300)

    return () => clearInterval(interval)
  }, [isVisible, isLoading])

  // Handle page load completion
  useEffect(() => {
    if (!isVisible) return

    const handleLoad = () => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
      }, 800)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [isVisible])

  // Canvas animation
  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    let animId: number

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

      // CRT scanline effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 2)
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  const cellCount = 20
  const cellSize = 8
  const cellGap = 2
  const filledCells = Math.ceil((progress / 100) * cellCount)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: '#093fb4',
        opacity: isLoading ? 1 : 0,
        transition: isLoading ? 'none' : 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isLoading ? 'auto' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        {/* Pixel Battery Cells */}
        <div
          style={{
            display: 'flex',
            gap: `${cellGap}px`,
            margin: '0 auto 32px',
            justifyContent: 'center',
          }}
        >
          {Array.from({ length: cellCount }).map((_, index) => (
            <div
              key={index}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                border: '1px solid #ffffff',
                background: index < filledCells ? '#ffffff' : 'transparent',
                transition: 'background 0.2s ease-out',
                animation:
                  index < filledCells
                    ? 'cellFill 0.3s ease-out'
                    : 'none',
                animationDelay: `${index * 0.05}s`,
              }}
            />
          ))}
        </div>

        {/* Percentage Text */}
        <div
          style={{
            fontFamily: 'var(--font-geist-pixel-square), monospace',
            fontSize: '16px',
            color: '#ffffff',
            fontWeight: 700,
            letterSpacing: '2px',
            opacity: isLoading ? 1 : 0,
            transform: isLoading ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {Math.min(100, Math.ceil(progress))}%
        </div>

        {/* Loading Text */}
        <div
          style={{
            fontFamily: 'var(--font-geist-pixel-square), monospace',
            fontSize: '12px',
            color: '#ffffff',
            letterSpacing: '1px',
            marginTop: '16px',
            opacity: 0.7,
            textTransform: 'uppercase',
          }}
        >
          LOADING_
        </div>
      </div>

      <style>{`
        @keyframes cellFill {
          0% {
            background: transparent;
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
          }
          100% {
            background: #ffffff;
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </div>
  )
}
