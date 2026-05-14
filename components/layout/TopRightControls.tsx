const links = [
  { href: 'https://github.com/bluecoder2003',      label: 'github'   },
  { href: 'https://linkedin.com/in/neelakshidas',  label: 'linkedin' },
  { href: 'mailto:hi@dasneelakshi.com',            label: 'email'    },
]

export default function TopRightControls({ skyActive }: { skyActive?: boolean }) {
  return (
    <div
      className="fixed right-[var(--space-xl)] flex flex-col items-end gap-[var(--space-sm)] z-50"
      style={{ top: 'var(--space-xxxl)' }}
    >
      {links.map(({ href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="type-meta transition-colors duration-500"
          style={{ color: 'var(--color-secondary)' }}
        >
          {label}
        </a>
      ))}
    </div>
  )
}
