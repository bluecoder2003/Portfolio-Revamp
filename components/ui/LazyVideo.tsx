'use client'

import { useEffect, useRef, useState } from 'react'

export default function LazyVideo({
  src,
  className = 'w-full h-full object-cover',
}: {
  src: string
  className?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' }, // start loading 300px before entering viewport
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="w-full h-full">
      {ready && (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className={className}
        />
      )}
    </div>
  )
}
