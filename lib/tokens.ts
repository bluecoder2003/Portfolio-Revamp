export const tokens = {
  font: {
    sans: 'var(--font-inter), Helvetica Neue, Arial, sans-serif',
    mono: 'var(--font-ibm-plex-mono), Courier New, monospace',
  },

  color: {
    primary:     '#23201F',
    primaryBody: '#3A3634',
    secondary:   '#6B6461',
    tertiary:    '#8A8F94',
    meta:        '#8F9499',
    bg:          '#F7F9FA',
    background:  '#FAFAF8',
    surface:     '#FAFCFD',
    dividers:    'rgba(47, 43, 42, 0.10)',
    frameFill:   'rgba(47, 43, 42, 0.02)',
    selection:   '#E0E0E0',
    brickGlow:   'rgba(107, 100, 97, 0.35)',
  },

  ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',

  duration: {
    micro: '0.18s',
    hover: '0.2s',
    brick: '0.32s',
    page:  '0.6s',
    slow:  '1.8s',
  },

  sidebar: {
    width: '160px',
  },

  content: {
    maxWidth: '800px',
  },
} as const

export type Tokens = typeof tokens
