import Link from 'next/link'
import Ghost from '@/components/ui/Ghost'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

const positions = [
  { year: '2026', org: 'CosX',  role: 'Design Engineer Intern' },
  { year: '2025', org: 'Vexio', role: 'UI/UX Designer & Dev Intern' },
]

type Card = {
  title: string
  date:  string
}

const cards: Card[] = [
  { title: 'Sound, Made Visible',        date: "03 '26" },
  { title: 'Credit Card Masking',        date: "03 '25" },
  { title: 'SOMA — Decoding Discomfort', date: "03 '26" },
  { title: 'Anime Portfolio Iteration',  date: "03 '26" },
  { title: 'Randomness as Inspiration',  date: "03 '26" },
  { title: 'Wind Hashira Prelude',       date: "02 '25" },
]

export default function Home() {
  return (
    <div className="pb-[var(--space-xxxxxl)]">

      {/* ── Intro ───────────────────────────────────────── */}
      <section className="mb-[var(--space-xxxxxl)]">
        <Ghost />

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

      {/* ── Creative explorations ───────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-[var(--space-lg)] pb-[var(--space-sm)] border-b-hairline">
          <span className="type-mono text-[var(--color-secondary)]">creative explorations</span>
          <Link href="/playground" className="type-meta text-[var(--color-meta)] transition-colors">
            view all <ArrowRight size={10} weight="light" className="inline" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-[var(--space-md)] md:grid-cols-3">
          {cards.map(card => (
            <Link
              key={card.title}
              href="/playground"
              className="no-underline flex flex-col gap-[var(--space-xs)]"
            >
              <div className="aspect-[16/10] bg-[#E6E7E8] overflow-hidden" />

              <div className="flex items-baseline justify-between gap-[var(--space-xs)]">
                <p className="type-body text-[var(--color-primary)] text-[12px]">
                  {card.title}
                </p>
                <span className="type-meta text-[var(--color-meta)] shrink-0">
                  {card.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
