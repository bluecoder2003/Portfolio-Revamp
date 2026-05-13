const links = [
  { href: 'https://github.com/bluecoder2003',      label: 'github'   },
  { href: 'https://linkedin.com/in/neelakshidas',  label: 'linkedin' },
  { href: 'mailto:hi@dasneelakshi.com',            label: 'email'    },
]

export default function TopRightControls() {
  return (
    <div className="fixed top-[var(--space-xl)] right-[var(--space-xl)] flex flex-col items-end gap-[var(--space-sm)] z-50">
      {links.map(({ href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="type-meta text-[var(--color-meta)]"
        >
          {label}
        </a>
      ))}
    </div>
  )
}
