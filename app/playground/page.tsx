const experiments = [
  {
    title:       'Sound, Made Visible',
    description: 'Audio input mapped to real-time generative visual patterns.',
    tags:        ['interaction', 'AI'],
    date:        '03 / 2026',
    note:        'Figma Makeathon 2026',
  },
  {
    title:       'SOMA — Decoding Discomfort',
    description: 'AR concept that translates stress signals into guided pressure-point relief.',
    tags:        ['concept', 'AR'],
    date:        '03 / 2026',
  },
  {
    title:       'Anime Portfolio Iteration',
    description: 'A cozy anime-themed desk scene — objects you can move around.',
    tags:        ['motion', 'play'],
    date:        '03 / 2026',
  },
  {
    title:       'Randomness as Inspiration',
    description: 'One click → one randomly curated site. Breaks creative blocks on demand.',
    tags:        ['tool'],
    date:        '03 / 2026',
  },
  {
    title:       'Credit Card Masking',
    description: 'Card numbers hidden by default, revealed on deliberate hover.',
    tags:        ['interaction'],
    date:        '03 / 2025',
  },
  {
    title:       'Logo Iteration',
    description: 'A non-mainstream logo study driven by intentional design decisions.',
    tags:        ['visual'],
    date:        '02 / 2025',
  },
  {
    title:       'Wind Hashira Prelude',
    description: 'A preloader built entirely around a wind motif.',
    tags:        ['motion'],
    date:        '02 / 2025',
  },
  {
    title:       'Just a Potterhead',
    description: 'How Aparecium would actually work in real life, designed seriously.',
    tags:        ['concept', 'interaction'],
    date:        '02 / 2025',
  },
  {
    title:       'Pause Before You Reel',
    description: 'Sarcastic guilt-trip pop-ups that surface over the Instagram Reels button.',
    tags:        ['dark patterns', 'play'],
    date:        '01 / 2025',
  },
]

export default function PlaygroundPage() {
  return (
    <div className="pb-[var(--space-xxxxxl)]">

      {/* ── Header ──────────────────────────────────────── */}
      <div className="mb-[var(--space-xxl)] pb-[var(--space-md)] border-b-hairline flex items-baseline justify-between">
        <span className="type-mono text-[var(--color-secondary)]">playground</span>
        <span className="text-[12px] text-[var(--color-meta)]">
          experiments, interaction ideas, motion concepts, AI explorations.
        </span>
      </div>

      {/* ── Experiment rows ──────────────────────────────── */}
      <div>
        {experiments.map(exp => (
          <div key={exp.title} className="experiment-row border-b-hairline">
            <div className="flex items-start justify-between gap-[var(--space-xl)] py-[var(--space-md)]">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-[var(--space-md)] mb-[var(--space-xxxxs)]">
                  <p className="type-body text-[var(--color-primary)]">{exp.title}</p>
                  {exp.note && (
                    <span className="type-meta text-[var(--color-meta)]">{exp.note}</span>
                  )}
                </div>
                <p className="type-body text-[var(--color-secondary)]">{exp.description}</p>
              </div>

              <div className="flex flex-col items-end gap-[var(--space-xxxxs)] shrink-0">
                <span className="type-meta text-[var(--color-meta)]">{exp.date}</span>
                <div className="flex gap-[var(--space-xs)] flex-wrap justify-end">
                  {exp.tags.map(tag => (
                    <span key={tag} className="type-meta text-[var(--color-tertiary)]">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
