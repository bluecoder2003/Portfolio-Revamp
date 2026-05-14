import PlaygroundReel from '@/components/sections/PlaygroundReel'

export default function PlaygroundPage() {
  return (
    <div>

      {/* ── Header ──────────────────────────────────────── */}
      <div className="pt-0 pb-[var(--space-xl)] flex items-baseline justify-between">
        <span className="type-mono text-[var(--color-secondary)]">playground</span>
        <span className="text-[12px] text-[var(--color-meta)]">
          experiments · interaction · motion · AI
        </span>
      </div>

      {/* ── Scroll reel ─────────────────────────────────── */}
      <PlaygroundReel />

    </div>
  )
}
