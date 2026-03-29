'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const PIXEL = 8

// Pixel font definitions: 5×7 grids for digits
const DIGITS: Record<string, number[][]> = {
  '0': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '4': [
    [0, 0, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0],
  ],
}

function drawDigit(
  ctx: CanvasRenderingContext2D,
  digit: string,
  x: number,
  y: number,
  color: string,
  scale: number
) {
  const grid = DIGITS[digit]
  if (!grid) return

  const cellSize = PIXEL * scale
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col]) {
        const px = x + col * cellSize
        const py = y + row * cellSize
        ctx.fillStyle = color
        ctx.fillRect(px, py, cellSize - 1, cellSize - 1)
      }
    }
  }
}

export default function NotFoundPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isBlink, setIsBlink] = useState(false)
  const ghostStateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    velocityX: 0,
    velocityY: 0,
    time: 0,
    nextDirectionChangeTime: 0,
  })
  const ghostPositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleClick = () => {
      setIsBlink(true)

      if (blinkTimeoutRef.current) {
        clearTimeout(blinkTimeoutRef.current)
      }

      blinkTimeoutRef.current = setTimeout(() => {
        setIsBlink(false)
      }, 170)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    return () => {
      if (blinkTimeoutRef.current) {
        clearTimeout(blinkTimeoutRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    let animId: number
    const canvas = canvasRef.current
    if (!canvas) return

    const render = (timestamp: number) => {
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

      // Responsive scaling
      const digitScale = Math.max(1.5, Math.min(3, w / 300))

      // Draw "404"
      const digitWidth = 5 * digitScale * PIXEL
      const digitHeight = 7 * digitScale * PIXEL
      const spacing = Math.max(10, digitScale * 8)
      const totalWidth = digitWidth * 3 + spacing * 2

      const startX = centerX - totalWidth / 2
      const startY = centerY - digitHeight / 2 - 80

      drawDigit(ctx, '4', startX, startY, '#ffffff', digitScale)
      drawDigit(ctx, '0', startX + digitWidth + spacing, startY, '#ffffff', digitScale)
      drawDigit(ctx, '4', startX + (digitWidth + spacing) * 2, startY, '#ffffff', digitScale)

      // Update ghost state
      const ghostState = ghostStateRef.current
      ghostState.time = timestamp / 1000

      // Initialize ghost position on first frame
      if (ghostState.x === 0 && ghostState.y === 0) {
        ghostState.x = w / 2
        ghostState.y = h / 2 + 100
        ghostState.targetX = w / 2
        ghostState.targetY = h / 2 + 100
      }

      // Random wandering behavior
      const changeDirectionInterval = 2500 // Change direction every 2.5 seconds
      const padding = 30 // Allow ghost to roam across entire screen
      const maxSpeed = 0.6 // Slower, more gentle movement

      // Pick new target if needed
      if (timestamp >= ghostState.nextDirectionChangeTime) {
        ghostState.targetX = Math.random() * (w - padding * 2) + padding
        ghostState.targetY = Math.random() * (h - padding * 2) + padding
        ghostState.nextDirectionChangeTime = timestamp + changeDirectionInterval
      }

      // Calculate direction to target
      const dx = ghostState.targetX - ghostState.x
      const dy = ghostState.targetY - ghostState.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Move towards target with smooth acceleration
      if (distance > 8) {
        const dirX = dx / distance
        const dirY = dy / distance
        ghostState.velocityX = dirX * maxSpeed
        ghostState.velocityY = dirY * maxSpeed
      } else {
        // Decelerate when near target
        ghostState.velocityX *= 0.85
        ghostState.velocityY *= 0.85
      }

      // Update position
      ghostState.x += ghostState.velocityX
      ghostState.y += ghostState.velocityY

      // Keep ghost within bounds (allow full screen roaming)
      ghostState.x = Math.max(padding, Math.min(w - padding, ghostState.x))
      ghostState.y = Math.max(padding, Math.min(h - padding, ghostState.y))

      // Store position for SVG rendering
      ghostPositionRef.current = { x: ghostState.x, y: ghostState.y }

      // Update SVG position directly (no React re-render needed)
      if (svgRef.current) {
        svgRef.current.style.left = `${ghostState.x}px`
        svgRef.current.style.top = `${ghostState.y}px`
      }



      // CRT scanline effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 2)
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div style={{ background: '#093fb4', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100vw',
          height: '100vh',
          cursor: 'none',
        }}
      />

      {/* Ghost SVG */}
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          transform: 'translate(-50%, -50%)',
          width: '90px',
          height: 'auto',
          pointerEvents: 'none',
        }}
        width="225"
        height="206"
        viewBox="0 0 225 206"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M83.6958 0.0222188L158.651 0L158.575 9.31173C161.709 9.34728 164.842 9.36266 167.975 9.35753C167.972 12.3932 167.896 15.7242 167.979 18.7335L177.361 18.6597C177.389 20.7649 177.735 26.6712 176.816 28.063C177.337 29.5017 176.957 31.7461 177.262 33.4989C177.403 31.5048 177.451 30.0278 177.42 28.0299L186.772 28.0511L186.724 37.3683L196.11 37.3857C196.086 43.5503 195.99 49.8825 196.1 56.0327L205.462 56.0481C205.469 71.5795 205.599 87.2986 205.434 102.815L214.848 102.757C214.828 105.692 214.708 109.199 214.797 112.087L224.183 112.096L224.207 130.786L214.862 130.83L214.841 140.093L186.768 140.11L186.713 158.839L177.44 158.811C177.351 161.915 177.327 165.021 177.372 168.126L167.972 168.129C167.968 171.217 167.91 174.459 167.982 177.533L158.661 177.499L158.613 186.84L149.203 186.871L149.244 196.176C143.097 196.166 136.666 196.059 130.547 196.178C130.451 199.13 130.53 202.446 130.533 205.426C122.518 205.907 110.808 205.536 102.436 205.532L46.1868 205.594L46.1916 196.154L27.4064 196.137L27.4664 186.854L18.1494 186.877C17.9835 183.967 18.099 180.572 18.133 177.619C20.9985 177.62 24.7332 177.722 27.5034 177.408C25.5813 177.042 20.158 177.233 18.0414 177.354C17.0462 177.66 10.1708 177.544 8.66204 177.543C8.64798 172.99 8.40081 163.092 8.92635 158.787C9.13546 157.143 9.0693 147.107 9.01308 144.869C8.83104 137.655 9.34869 128.552 8.85676 121.523L18.0675 121.526C24.2865 121.441 30.5061 121.408 36.7262 121.426C36.7248 123.668 36.6027 128.84 36.9089 130.822C37.2626 128.458 37.155 123.916 36.9504 121.491C36.6223 119.988 36.7916 113.985 36.8149 112.118L46.2183 112.111C46.1429 108.949 46.1436 105.73 46.1717 102.566C46.338 83.9778 45.8848 65.2915 46.2403 46.7131L55.5315 46.733L55.56 28.0562L64.8976 28.061L64.9452 18.7192L74.3208 18.6976C74.2341 15.6825 74.3229 12.3457 74.3421 9.30523C77.2138 9.39855 80.9275 9.10732 83.6982 9.48981L83.884 9.45426C83.4369 7.62418 83.657 2.21018 83.6958 0.0222188Z" fill="#FCFCFB"/>
        <path d="M84.112 0.0222188L158.845 0L158.769 9.31173C161.893 9.34728 165.017 9.36266 168.141 9.35753C168.138 12.3932 168.063 15.7242 168.145 18.7335L177.5 18.6597C177.527 20.7649 177.872 26.6712 176.956 28.063C177.476 29.5017 177.097 31.7461 177.401 33.4989C177.428 34.7564 177.479 36.0396 177.452 37.2951C174.451 37.3542 171.132 37.4988 168.169 37.252C168.155 34.283 168.063 30.8984 168.241 27.9707C165.913 27.9923 160.964 27.9072 158.848 28.1734L158.831 18.673L107.903 18.6809C101.248 18.6836 90.4346 19.0999 84.3052 18.752C84.1035 21.9062 83.988 25.065 83.9579 28.2254C80.8154 28.0333 77.7529 28.1263 74.7677 27.9577C74.6248 34.1586 74.647 40.3626 74.8343 46.5621C71.9191 46.6482 68.3891 46.8396 65.5272 46.7073C65.4284 49.5669 65.2097 53.1847 65.2982 55.9852C62.4285 55.9808 58.4332 56.1045 55.5918 55.9852L54.0918 96.5996C54.0928 98.6515 55.9175 110.803 55.5918 112.111L46.7458 112.111C46.6706 108.949 46.6713 105.73 46.6993 102.566C46.8651 83.9778 46.4132 65.2915 46.7677 46.7131L56.0314 46.733L56.0598 28.0562L65.3696 28.061L65.4171 18.7192L74.7649 18.6976C74.6785 15.6825 74.767 12.3457 74.7861 9.30523C77.6494 9.39855 81.352 9.10732 84.1144 9.48981L84.2997 9.45426C83.854 7.62418 84.0734 2.21018 84.112 0.0222188Z" fill="#093FB4"/>
        <path d="M84.1124 0.0222188L158.845 0L158.77 9.31173C161.894 9.34728 165.018 9.36266 168.142 9.35753C168.138 12.3932 168.063 15.7242 168.145 18.7335C165.192 18.7304 161.709 18.8111 158.818 18.5318L158.828 9.35958L111.034 9.3459C102.481 9.34453 92.7766 9.13091 84.3001 9.45426C83.8544 7.62418 84.0738 2.21018 84.1124 0.0222188Z" fill="#FCFCFB"/>
        <path d="M46.7674 46.7129L56.0311 46.7327L55.9836 93.2811C55.9836 95.8348 56.6827 112.702 57.0918 114.6H46.5917C46.5165 111.438 46.671 105.73 46.699 102.565C46.8648 83.9776 46.4129 65.2912 46.7674 46.7129Z" fill="#FCFCFB"/>
        <path d="M65.3695 28.0614C65.3651 34.2206 65.4471 40.5937 65.3408 46.7348L56.0312 46.7334L56.0596 28.0566L65.3695 28.0614Z" fill="#FCFCFB"/>
        <path d="M74.786 9.30637C77.6492 9.39969 81.3519 9.10847 84.1143 9.49096C84.0381 12.5635 84.0237 15.6371 84.0712 18.7104L74.7648 18.6988C74.6783 15.6836 74.7669 12.3468 74.786 9.30637Z" fill="#FCFCFB"/>
        <path d="M65.4176 18.7207L74.7654 18.6992C74.7227 21.8101 74.7083 24.9209 74.7227 28.0321C71.7361 28.038 68.3191 27.9604 65.3701 28.0626L65.4176 18.7207Z" fill="#FCFCFB"/>
        <path d="M168.145 18.734L177.5 18.6602C177.527 20.7654 177.872 26.6716 176.956 28.0635L168.151 28.0044L168.145 18.734Z" fill="#FCFCFB"/>
        <path d="M186.899 56.0234L196.183 56.0327L205.517 56.048C205.524 71.5794 205.654 87.2985 205.49 102.815L214.876 102.757C214.855 105.692 214.735 109.199 214.824 112.087L224.183 112.096L224.207 130.786L214.889 130.83L214.424 130.845C214.646 128.661 214.506 123.996 214.503 121.627C208.904 121.169 201.826 121.305 196.114 121.295C196.148 118.271 196.114 115.023 196.436 112.037C193.366 112.137 190 112.08 186.903 112.091L186.899 56.0234Z" fill="#093FB4"/>
        <path d="M205.517 56.0486L196.183 56.0332L196.186 112.072H205.49C205.401 109.184 205.469 105.751 205.49 102.815C205.654 87.299 205.524 71.58 205.517 56.0486Z" fill="#FCFCFB"/>
        <path d="M214.824 112.088L224.183 112.097L224.207 130.788L214.889 130.831C215.012 124.881 214.937 118.022 214.824 112.088Z" fill="#212121"/>
        <path d="M46.7196 196.154L65.1828 196.163L130.825 196.178C130.729 199.129 130.807 202.446 130.811 205.426C122.82 205.907 111.144 205.536 102.797 205.532L46.7148 205.594L46.7196 196.154Z" fill="#FCFCFB"/>
        <path d="M65.3757 186.872C87.1851 186.743 108.994 186.733 130.804 186.845L130.824 196.179L65.1826 196.163C65.5172 193.283 65.3973 189.818 65.3757 186.872Z" fill="#093FB4"/>
        <path d="M177.36 130.855L186.923 130.746C186.855 133.867 186.838 136.989 186.879 140.111L186.824 158.84L177.579 158.812C177.49 161.916 177.466 165.022 177.51 168.127L168.138 168.129L168.189 158.832C168.029 152.796 168.142 146.284 168.135 140.211C171.252 140.142 174.369 140.093 177.49 140.063C177.288 137.413 177.373 133.594 177.36 130.855Z" fill="#093FB4"/>
        <path d="M186.879 140.111L186.825 158.84L177.579 158.812C177.49 161.916 177.466 165.022 177.511 168.127L168.139 168.13L168.19 158.832L177.521 158.805L177.47 140.13L186.879 140.111Z" fill="#FCFCFB"/>
        <path d="M130.838 177.587L149.452 177.512L149.425 186.873L149.466 196.177C143.337 196.167 136.925 196.06 130.824 196.179L130.803 186.845C130.609 184.651 130.807 179.963 130.838 177.587Z" fill="#093FB4"/>
        <path d="M130.804 186.844L149.425 186.871L149.466 196.176C143.337 196.166 136.925 196.059 130.824 196.178L130.804 186.844Z" fill="#FCFCFB"/>
        <path d="M214.424 130.846L214.889 130.831L214.868 140.095L186.878 140.112C186.837 136.99 186.855 133.868 186.923 130.747C195.393 130.914 206.453 130.376 214.424 130.846Z" fill="#212121"/>
        <path d="M177.558 28.0312L186.882 28.0524L186.834 37.3696L196.192 37.3871C196.168 43.5517 196.073 49.8838 196.182 56.0341L186.899 56.0249C186.714 50.0626 186.868 43.3087 186.865 37.2849C184.038 37.3563 180.176 37.5604 177.452 37.2965C177.479 36.041 177.428 34.7578 177.4 33.5003C177.541 31.5061 177.588 30.0292 177.558 28.0312Z" fill="#FCFCFB"/>
        <path d="M177.452 37.2948C180.176 37.5587 184.038 37.3546 186.865 37.2832C186.868 43.307 186.714 50.0609 186.899 56.0232C183.826 55.9802 180.483 56.0837 177.387 56.1176C177.64 49.7865 177.325 43.6215 177.452 37.2948Z" fill="#093FB4"/>
        <path d="M168.138 168.129C168.135 171.217 168.077 174.459 168.148 177.533L158.855 177.499L158.807 186.841L149.425 186.872L149.452 177.511C152.33 177.603 155.919 177.472 158.855 177.448C158.8 174.394 158.845 171.222 158.848 168.157L168.138 168.129Z" fill="#FCFCFB"/>
        <path d="M9.565 158.787C12.6084 158.809 15.6517 158.814 18.6951 158.803L18.653 177.354C17.6608 177.66 10.8057 177.544 9.30148 177.543C9.28747 172.99 9.04103 163.092 9.565 158.787Z" fill="#FCFCFB"/>
        <path d="M18.6789 121.526C24.8794 121.442 31.0807 121.408 37.2822 121.427C37.2809 123.668 37.1592 128.841 37.4644 130.822L18.7206 130.821C18.6252 127.847 18.6881 124.528 18.6789 121.526Z" fill="#FCFCFB"/>
        <path d="M28.05 186.855L46.7105 186.862C46.706 189.67 46.5847 193.427 46.7197 196.156L27.9902 196.138L28.05 186.855Z" fill="#FCFCFB"/>
        <path d="M149.36 168.09C152.501 168.153 155.701 168.139 158.848 168.158C158.845 171.222 158.801 174.394 158.855 177.449C155.919 177.473 152.33 177.604 149.452 177.511C149.251 174.951 149.367 170.771 149.36 168.09Z" fill="#093FB4"/>
        <path d="M37.3708 112.118L46.7463 112.111L46.6937 121.523L37.5058 121.491C37.1787 119.988 37.3476 113.986 37.3708 112.118Z" fill="#FCFCFB"/>
        <path d="M158.848 158.816L168.189 158.832L168.138 168.13L158.848 168.158C158.81 165.07 158.848 161.911 158.848 158.816Z" fill="#093FB4"/>
        <path d="M18.0914 176.6C20.9485 176.601 25.2877 175.914 28.0498 175.6C28.0347 178.677 27.9903 183.799 28.0498 186.854L18.7604 186.877C18.595 183.967 18.0575 179.552 18.0914 176.6Z" fill="#FCFCFB"/>
        {isBlink ? (
          <>
            <path d="M102.691 49.5818C102.747 50.3 102.697 51 103.179 51.5L121.449 51.5C121.408 51.5 121.623 51 121.381 50.5C120.017 50.2 113.728 50 111.954 50C111.951 50 111.971 50 112.012 50C105.767 50 99.5194 50 93.2734 50L93.5479 49.617L102.362 49.6Z" fill="#212121"/>
            <path d="M149.404 46.7213L168.268 46.6875C169.058 47 167.896 47.5 168.555 48C171.501 48 174.448 48 177.394 48C177.445 48 177.698 48.5 177.476 49C170.917 49.3 165.39 49 159.07 49.1C159.022 48.2 158.899 47 158.954 46.1C157.04 46.1 150.99 46.2 149.445 46L149.404 46.7213Z" fill="#212121"/>
          </>
        ) : (
          <>
            <path d="M102.691 49.5818C102.747 48.717 102.697 47.5309 103.179 46.8825C106.208 46.3951 117.884 46.7 121.449 46.7191C121.408 55.8948 121.623 65.886 121.381 74.9711C120.017 75.2911 113.728 75.181 111.954 75.1814C111.951 78.1545 111.971 81.1272 112.012 84.0997C105.767 84.1304 99.5194 84.2104 93.2734 84.3393L93.5479 65.617L102.362 65.4C102.353 63.318 102.107 50.625 102.691 49.5818Z" fill="#212121"/>
            <path d="M149.404 46.7213L168.268 46.6875C169.058 52.1384 167.896 59.7941 168.555 65.6063C171.501 65.5174 174.448 65.394 177.394 65.2357C177.445 71.4821 177.698 77.846 177.476 84.0609C170.917 84.35 165.39 84.0452 159.07 84.1549C159.022 81.2542 158.899 78.0343 158.954 75.1597C157.04 75.1614 150.99 75.2803 149.445 74.96L149.404 46.7213Z" fill="#212121"/>
          </>
        )}
      </svg>

      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'var(--font-geist-pixel-square), monospace',
          color: '#ffffff',
        }}
      >
        <h2
          style={{
            fontSize: 14,
            letterSpacing: 1,
            textTransform: 'uppercase',
            margin: 0,
            opacity: 1,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          PAGE NOT FOUND
        </h2>
        <Link
          href="/playground"
          style={{
            display: 'inline-block',
            fontSize: 13,
            letterSpacing: 1,
            margin: '12px 0 0 0',
            opacity: 0.4,
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          {'// BACK TO PLAYGROUND_'}
        </Link>
      </div>
    </div>
  )
}
