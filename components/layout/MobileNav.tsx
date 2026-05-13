'use client'

import { useState } from 'react'
import Link from 'next/link'
import { List, X } from '@phosphor-icons/react'

const navLinks = [
  { href: '/',           label: 'home'       },
  { href: '/projects',   label: 'projects'   },
  { href: '/playground', label: 'playground' },
  { href: '/about',      label: 'about'      },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      {/* ── Top bar ──────────────────────────────────────── */}
      <div className="flex items-center justify-between px-[var(--space-lg)] py-[var(--space-md)] bg-[var(--color-surface)] border-b-hairline">
        <Link
          href="/"
          className="type-mono text-[var(--color-primary)]"
          onClick={() => setOpen(false)}
        >
          neelakshi das
        </Link>
        <button
          onClick={() => setOpen(o => !o)}
          className="text-[var(--color-primary)] flex items-center"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={18} weight="light" /> : <List size={18} weight="light" />}
        </button>
      </div>

      {/* ── Nav panel ────────────────────────────────────── */}
      {open && (
        <nav className="bg-[var(--color-surface)] border-b-hairline px-[var(--space-lg)] py-[var(--space-xl)] flex flex-col gap-[var(--space-lg)]">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="type-mono text-[var(--color-secondary)]"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
