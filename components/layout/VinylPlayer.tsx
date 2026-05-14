'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { MusicNotesSimpleIcon } from '@phosphor-icons/react/dist/ssr/MusicNotesSimple'

const TRACKS = [
  { name: 'head in the clouds', label: 'head in the<br/>clouds', src: '/head-in-the-cloud.mp3', cover: '/head-in-the-cloud.png' },
  { name: 'lover',              label: 'lover',                  src: '/lover.mp3',             cover: '/lover.png'             },
]

export default function VinylPlayer() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [playing, setPlaying]       = useState(false)
  const audioRef                    = useRef<HTMLAudioElement>(null)

  const track = TRACKS[trackIndex]

  const playAudio = () => {
    audioRef.current?.play().catch(() => {})
    setPlaying(true)
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else         { playAudio() }
  }

  const goTo = (index: number) => {
    const audio = audioRef.current
    if (!audio) return
    const wasPlaying = playing
    audio.pause()
    setTrackIndex(index)
    setPlaying(false)
    // let the src update before playing
    requestAnimationFrame(() => {
      if (wasPlaying) {
        audio.load()
        audio.play().catch(() => {})
        setPlaying(true)
      }
    })
  }

  const prev = () => goTo((trackIndex - 1 + TRACKS.length) % TRACKS.length)
  const next = () => goTo((trackIndex + 1)                 % TRACKS.length)

  return (
    <div className="mt-[var(--space-xxl)] flex flex-col items-end gap-[var(--space-sm)]">
      <audio
        ref={audioRef}
        src={track.src}
        loop
        onEnded={next}
      />

      <div className="flex flex-col items-center gap-[var(--space-sm)] w-[120px]">
        <div className="flex items-center gap-[var(--space-sm)]">
          <button
            onClick={prev}
            aria-label="Previous track"
            className="font-[var(--font-mono)] text-[15px] text-[var(--color-meta)] cursor-pointer leading-none p-0 select-none"
          >
            ⏮
          </button>

          {/* CD disc — cover art, spins when playing */}
          <button
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Play'}
            className={`relative w-[64px] h-[64px] rounded-full cursor-pointer p-0 shrink-0 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.22)] ${playing ? 'vinyl-spinning' : ''}`}
          >
            <Image
              src={track.cover}
              alt={track.name}
              fill
              sizes="64px"
              priority
              className="object-cover rounded-full"
            />
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-bg)] opacity-80 shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" />
            </span>
          </button>

          <button
            onClick={next}
            aria-label="Next track"
            className="font-[var(--font-mono)] text-[15px] text-[var(--color-meta)] cursor-pointer leading-none p-0 select-none"
          >
            ⏭
          </button>
        </div>

        <span className="flex items-start justify-center gap-[4px] text-[8px] tracking-[0.08em] uppercase text-[var(--color-meta)] w-full text-center leading-[1.5]" style={{ fontFamily: 'var(--font-mono)' }}>
          {/* <MusicNotesSimpleIcon size={10} weight="light" className="mt-[1px] shrink-0" /> */}
          <span dangerouslySetInnerHTML={{ __html: track.label }} />
        </span>
      </div>
    </div>
  )
}
