import Link from 'next/link'
import Image from 'next/image'
import HeroSection from '@/components/sections/HeroSection'
import LazyVideo from '@/components/ui/LazyVideo'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight'

type Card = {
  title: string
  date:  string
  asset: string
}

const cards: Card[] = [
  { title: 'Sound, Made Visible',        date: "03 '26", asset: '/figmamakeathon.webm' },
  { title: 'Credit Card Masking',        date: "03 '25", asset: '/credit-card.webm'    },
  { title: 'Randomness as Inspiration',  date: "03 '26", asset: '/button.webm'         },
  { title: 'Anime Theme Iteration',      date: "03 '26", asset: '/naruto.webm'          },
  { title: 'Just a Potterhead',          date: "02 '25", asset: '/potter.webm'          },
  { title: 'Wind Hashira Prelude',       date: "02 '25", asset: '/preloader.webm'      },
]

function CardMedia({ src, alt }: { src: string; alt: string }) {
  if (src.endsWith('.webm') || src.endsWith('.mp4')) {
    return <LazyVideo src={src} />
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 50vw, 33vw"
      className="object-cover"
    />
  )
}

export default function Home() {
  return (
    <div className="pb-[var(--space-xxxxxl)]">

      {/* ── Hero with sky ────────────────────────────────── */}
      <HeroSection />

      {/* ── Creative explorations ───────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-[var(--space-lg)]">
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
              <div className="relative aspect-[16/10] bg-[#E6E7E8] overflow-hidden">
                <CardMedia src={card.asset} alt={card.title} />
              </div>

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
