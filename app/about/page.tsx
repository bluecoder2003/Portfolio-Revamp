const experience = [
  {
    org:    'CosX',
    role:   'UI/UX Designer & Dev Intern',
    period: 'Jun 2025 — Present',
    bullets: [
      'Led WordPress → Next.js migration for Signzy (3M+ monthly visits, 40% faster page loads).',
      'Designed and built sites for Natural Capital Partners, CosX, Kareverse, and Akhand Jyoti.',
      'Currently leading the CosxLive redesign end-to-end.',
    ],
  },
  {
    org:    'Vexio',
    role:   'UI/UX Designer & Dev Intern',
    period: 'Jul 2024 — Apr 2025',
    bullets: [
      'Built hi-fi Figma prototypes and a shared design system used across 4 products.',
      'Shipped responsive Next.js / TypeScript / Tailwind interfaces from design to production.',
    ],
  },
  {
    org:    'National Law Training Institute',
    role:   'Designer Intern',
    period: 'Mar 2024 — Jun 2024',
    bullets: [
      'Created brand identity and learning materials for the institute.',
      'Designed and launched the institute\'s website.',
    ],
  },
  {
    org:    'VNG Medical',
    role:   'Designer Intern',
    period: 'Dec 2023 — Nov 2024',
    bullets: [
      'Produced marketing visuals and refined the app UI with an accessibility focus.',
    ],
  },
]

const interests = [
  { label: 'mountains + travel',    value: 'Happiest above 2,000m. Have a running list of trails.' },
  { label: 'languages',             value: 'Hindi, English, Bengali. Slowly: Spanish.' },
  { label: 'rabbit holes',          value: 'Currently: generative audio, the history of type design, and competitive speedcubing.' },
  { label: 'AI in the loop',        value: 'I use Claude for research synthesis, design exploration, and a lot of my production code. The call about what matters is still mine.' },
]

const hackathons = [
  {
    name:   'Figma Makeathon 2026',
    result: 'Top recognition out of 10,000+ participants',
    project: 'Sound, Made Visible — audio → real-time generative visual patterns.',
  },
]

export default function AboutPage() {
  return (
    <div className="pb-[var(--space-xxxxxl)]">

      {/* ── Bio ─────────────────────────────────────────── */}
      <section className="mb-[var(--space-xxxxxl)]">
        <div className="mb-[var(--space-xl)] pb-[var(--space-md)] border-b-hairline">
          <span className="type-mono text-[var(--color-secondary)]">about</span>
        </div>

        <div className="stack-md max-w-[460px]">
          <p className="type-body text-[var(--color-primary-body)]">
            I&apos;m a design engineer. I split my time between Figma and a code editor,
            and most days I can&apos;t tell you which one I started in. I&apos;m fluent in
            research and the web — wireframes, design systems, Next.js, TypeScript,
            and increasingly, the AI tools sitting between the two.
          </p>
          <p className="type-body text-[var(--color-secondary)]">
            I grew up in Kolkata, the City of Joy — every lane hums with art, culture,
            and colour. That early creative chaos is still how I see and express.
          </p>
          <p className="type-body text-[var(--color-secondary)]">
            Creativity has been the constant. I fell for design through its visual charm;
            I stayed for the research and the problem-solving.
          </p>
        </div>
      </section>

      {/* ── How I work with AI ──────────────────────────── */}
      <section className="mb-[var(--space-xxxxxl)]">
        <h2 className="type-mono text-[var(--color-meta)] mb-[var(--space-xl)]">
          how I work with AI
        </h2>
        <div className="stack-lg max-w-[520px]">
          <div>
            <p className="type-body text-[var(--color-primary)] mb-[var(--space-xxxxs)]">Research synthesis</p>
            <p className="type-body text-[var(--color-secondary)]">I use Claude to pressure-test problem framings against interviews and PRDs. The model clusters faster than I do; the call about what matters is still mine.</p>
          </div>
          <div>
            <p className="type-body text-[var(--color-primary)] mb-[var(--space-xxxxs)]">Design exploration</p>
            <p className="type-body text-[var(--color-secondary)]">I generate ten ugly variants before I draw one good one. The model is a sparring partner for layout and copy — not the designer.</p>
          </div>
          <div>
            <p className="type-body text-[var(--color-primary)] mb-[var(--space-xxxxs)]">Engineering</p>
            <p className="type-body text-[var(--color-secondary)]">I pair with Claude Code on greenfield features and migration work. Most of my recent shipped code was written with AI in the loop.</p>
          </div>
        </div>
      </section>

      {/* ── Experience ──────────────────────────────────── */}
      <section className="mb-[var(--space-xxxxxl)]">
        <h2 className="type-mono text-[var(--color-meta)] mb-[var(--space-xl)]">
          experience
        </h2>
        <div className="stack-xxl">
          {experience.map(job => (
            <div key={job.org}>
              <div className="flex justify-between items-baseline mb-[var(--space-sm)] pb-[var(--space-sm)] border-b-hairline">
                <div>
                  <p className="type-body text-[var(--color-primary)]">{job.org}</p>
                  <p className="type-body text-[var(--color-secondary)]">{job.role}</p>
                </div>
                <span className="type-meta text-[var(--color-meta)] shrink-0">{job.period}</span>
              </div>
              <ul className="list-none flex flex-col gap-[var(--space-xs)]">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-[var(--space-sm)]">
                    <span className="type-body text-[var(--color-meta)] shrink-0">—</span>
                    <p className="type-body text-[var(--color-secondary)]">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hackathons ──────────────────────────────────── */}
      <section className="mb-[var(--space-xxxxxl)]">
        <h2 className="type-mono text-[var(--color-meta)] mb-[var(--space-xl)]">
          makeathons + hackathons
        </h2>
        {hackathons.map(h => (
          <div key={h.name} className="border-b-hairline pb-[var(--space-lg)]">
            <p className="type-body text-[var(--color-primary)] mb-[var(--space-xxxxs)]">{h.name}</p>
            <p className="type-body text-[var(--color-secondary)] mb-[var(--space-xxxxs)]">{h.result}</p>
            <p className="type-body text-[var(--color-meta)]">{h.project}</p>
          </div>
        ))}
      </section>

      {/* ── Interests ───────────────────────────────────── */}
      <section>
        <h2 className="type-mono text-[var(--color-meta)] mb-[var(--space-xl)]">
          interests
        </h2>
        <div className="stack-md">
          {interests.map(item => (
            <div key={item.label} className="flex gap-[var(--space-xl)]">
              <p className="type-body text-[var(--color-secondary)] w-[140px] shrink-0">
                {item.label}
              </p>
              <p className="type-body text-[var(--color-secondary)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
