'use client'

import { useState, useRef } from 'react'

const TRACK_NAME = 'now playing'
const TRACK_SRC  = '/music/track.mp3'

export default function VinylPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setPlaying(p => !p)
  }

  const restart = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    if (!playing) {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <div className="mt-[var(--space-xxl)] flex flex-col items-end gap-[var(--space-sm)]">
      <audio ref={audioRef} src={TRACK_SRC} loop />

      <div className="flex items-center gap-[var(--space-sm)]">
        <button
          onClick={restart}
          aria-label="Restart"
          className="font-[var(--font-mono)] text-[9px] text-[var(--color-meta)] cursor-pointer leading-none p-0 select-none"
        >
          ⏮
        </button>

        <button
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className={`vinyl-disc w-[52px] h-[52px] rounded-full cursor-pointer p-0 relative shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.18)] ${playing ? 'vinyl-spinning' : ''}`}
        />

        <button
          onClick={() => {
            const audio = audioRef.current
            if (!audio) return
            audio.currentTime = audio.duration || 0
          }}
          aria-label="Next"
          className="font-[var(--font-mono)] text-[9px] text-[var(--color-meta)] cursor-pointer leading-none p-0 select-none"
        >
          ⏭
        </button>
      </div>

      <span className="font-[var(--font-mono)] text-[9px] font-light tracking-[0.08em] uppercase text-[var(--color-meta)]">
        ♪ {TRACK_NAME}
      </span>
    </div>
  )
}
