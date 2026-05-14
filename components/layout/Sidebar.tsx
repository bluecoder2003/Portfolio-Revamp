import Link from 'next/link'
import VinylPlayer from './VinylPlayer'

const navLinks = [
  { href: '/projects',   label: 'projects'   },
  { href: '/playground', label: 'playground' },
  { href: '/about',      label: 'about'      },
]

export default function Sidebar({ skyActive }: { skyActive?: boolean }) {
  return (
    <aside className="w-[var(--sidebar-width)] sticky top-[var(--space-xl)] h-fit ml-[var(--space-xl)] mt-[var(--space-xxxl)] shrink-0 flex flex-col items-end">
      <Link href="/" className="type-mono text-[var(--color-primary)] mb-[var(--space-xl)] text-right">
        neelakshi das
      </Link>

      <nav className="flex flex-col items-end gap-[var(--space-md)]">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="type-mono text-[var(--color-secondary)] text-right">
            {label}
          </Link>
        ))}
      </nav>

      <VinylPlayer />
    </aside>
  )
}
