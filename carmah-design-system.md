# Carmah Hawwari — Design System Reference

Captured from `https://carmahhawwari.com/` (production CSS bundle + JS design-tokens object).
The site is a React SPA. All values below are pulled directly from `assets/index-*.css` and the in-bundle design-tokens object (`$schema: design-tokens.json`).

---

## 1. Overall Aesthetic

- **Mood**: Quiet, editorial, design-engineer portfolio. Warm-neutral background, near-black text, very thin display weights, monospace metadata. No drop shadows, no rounded corners, no gradients on chrome.
- **References**: Modernist editorial / specimen-book layout. Minimalist with subtle craft (custom cursor, brick "lift on hover", hairline 0.5px borders, gentle shimmer loading).
- **Hierarchy comes from weight + size + family**, not color. Most text sits in a 4-step gray scale from `#23201F` to `#8F9499`.
- **Flat surfaces only.** `border-radius: 0` throughout. Borders are hairline (0.5px) at 10% opacity of the ink color.

---

## 2. Colors

All token values are taken verbatim from the in-bundle tokens object.

### 2.1 Ink (text) scale

| Token         | Value     | Usage                                                              |
| ------------- | --------- | ------------------------------------------------------------------ |
| `primary`     | `#23201F` | Body default color (set on `<body>`), primary headings, ink anchor |
| `primaryBody` | `#3A3634` | Hover color for footer links and preset questions                  |
| `secondary`   | `#6B6461` | Lower-emphasis body, drives the brick hover glow                   |
| `tertiary`    | `#8A8F94` | Tertiary copy                                                      |
| `meta`        | `#8F9499` | Captions, metadata, timestamps                                     |

### 2.2 Surfaces

| Token              | Value                       | Usage                                                                          |
| ------------------ | --------------------------- | ------------------------------------------------------------------------------ |
| `background`       | `#FAFAF8`                   | Token value (warm off-white)                                                   |
| Body background    | `#F7F9FA`                   | Actual `body` background in CSS (cool off-white — slightly different from token) |
| Site surface       | `#FAFCFD`                   | `.site-surface` background, sits above body                                    |
| `drawerBackground` | `oklab(0.159 0 0 / 0.03)`   | Modal/drawer fill                                                              |
| Blur surface       | `rgba(150, 143, 140, 0.05)` | `.blur-surface` — used with `backdrop-filter: blur(16px)`                      |
| Selection          | `#E0E0E0`                   | `::selection`                                                                  |

### 2.3 Lines & subtle fills

| Token        | Value                  | Usage                                          |
| ------------ | ---------------------- | ---------------------------------------------- |
| `dividers`   | `rgba(47, 43, 42, 0.10)` | Hairline borders, footer divider               |
| `frameFill`  | `rgba(47, 43, 42, 0.02)` | Inset frame fills, experiment-row hover bg     |
| Brick border | `rgba(47, 43, 42, 0.10)` | Painted as 0.5px masked border on media cards  |
| Brick loading bg | `rgba(47, 43, 42, 0.04)` | Skeleton state                              |

### 2.4 Accents (used sparingly, only on specific case studies)

| Token                   | Value                       | Usage                                                  |
| ----------------------- | --------------------------- | ------------------------------------------------------ |
| `caltrainRed`           | `#871717`                   | Caltrain case-study accent                             |
| `caltrainRedGlowStrong` | `rgba(135, 23, 23, 0.45)`   | Strong glow variant                                    |
| `caltrainRedGlowSoft`   | `rgba(135, 23, 23, 0.20)`   | Soft glow variant                                      |
| `replitOrange`          | `#F26207`                   | Replit case-study accent                               |
| Brick glow default      | `rgba(107, 100, 97, 0.35)`  | `--brick-glow` (≈ `secondary` at 35%); radial on hover |

> **Design intent**: the palette is intentionally desaturated. Color is a *case-study-level* decision (red for Caltrain, orange for Replit), never a chrome decision.

---

## 3. Typography

### 3.1 Loaded font families

Loaded via `@import` from Google Fonts:

- **Instrument Sans** — weights 400, 500, 600, 700
- **Inter** — weights 100–900 (the workhorse)
- **IBM Plex Mono** — weights 100–700
- **Lateef** — weights 200–800 (Arabic; for the name "حواري" / "Carmah Hawwari")

Loaded via local `@font-face` (in `/fonts/`):

- **Libre Baskerville (New)** — Light 300, Regular 400, Italic 400, Bold 700, ExtraBold 800

> **Important nuance**: the resolved token map uses `Inter` for *both* the `serif` and `sans` slots, and `IBM Plex Mono` for `mono`. The other families (Libre Baskerville, Instrument Sans, Lateef) are loaded for specific case-study or localized usage, not for the global system.

```ts
fontFamilies = {
  serif: 'Inter',          // semantic "display" role
  sans:  'Inter',
  mono:  'IBM Plex Mono',
}
```

### 3.2 Type scale (the typography token map)

| Token              | Family       | Size  | Weight | Line height | Tracking   | Transform | Typical usage                       |
| ------------------ | ------------ | ----- | ------ | ----------- | ---------- | --------- | ----------------------------------- |
| `heroHeading`      | Inter (serif slot) | 46px  | **100** (Thin) | 1.1   | **−0.02em** | —         | Page-opening hero line              |
| `primaryHeading`   | Inter (serif slot) | 26px  | **100** (Thin) | 1.2   | −0.01em    | —         | H1 / case-study openers             |
| `sectionTitleSans` | Inter (sans) | 26px  | 400    | 1.2         | −0.01em    | —         | Section titles, sans variant        |
| `subsectionSans`   | Inter (sans) | 24px  | 500    | 1.2         | 0          | —         | Subsection headings                 |
| `label`            | Inter (serif slot) | 20px  | 400    | 1.4         | 0          | —         | Inline labels                       |
| `metaCaption`      | Inter (sans) | 16px  | **300** (Light) | 1.6  | 0          | —         | Captions, ancillary copy            |
| `smallHeading`     | Inter (sans) | 15px  | 500    | 1.5         | 0.01em     | —         | Small headings / nav-adjacent text  |
| `bodyPrimary`      | Inter (sans) | 13px  | **300** (Light) | 1.6  | 0          | —         | **Default body copy**               |
| `bodySecondary`    | IBM Plex Mono | 11px | 400    | 1.6         | **0.08em** | **UPPERCASE** | Eyebrow / tag-like body         |
| `metadata`         | IBM Plex Mono | 11px | 300    | 1.6         | 0.01em     | **UPPERCASE** | Timestamps, file meta, captions |

**Patterns to internalize:**

- **Display = Inter Thin (100) with tight tracking (−0.01 to −0.02em).** The combination of large size + weight 100 + negative tracking is the signature move.
- **Body is small (13px) and light (300).** This is the editorial calm — paragraphs are quiet, never assertive.
- **Mono + UPPERCASE + 0.08em tracking** is the convention for eyebrows, tags, and metadata. It's the only place letter-spacing goes wide.
- Only two true tracking modes: tight negative for display, wide positive (0.08em) for uppercase mono.

---

## 4. Spacing

Spacing is driven by a single CSS variable `--space-unit` that scales the whole system at breakpoints.

```css
:root {
  --space-unit: 1em;            /* default                */
}
@media (width <= 1200px) {
  :root { --space-unit: 0.875em; }
}
@media (width <= 768px) {
  :root { --space-unit: 0.75em; }
}
```

### 4.1 Raw step ramp (CSS variables)

| Variable           | Multiplier | At 16px base   |
| ------------------ | ---------- | -------------- |
| `--space-xxxxs`    | 0.25       | 4px            |
| `--space-xxxs`     | 0.375      | 6px            |
| `--space-xxs`      | 0.5        | 8px            |
| `--space-xs`       | 0.5        | 8px            |
| `--space-sm`       | 0.75       | 12px           |
| `--space-md`       | 1.0        | 16px           |
| `--space-lg`       | 1.5        | 24px           |
| `--space-xl`       | 2.0        | 32px           |
| `--space-xxl`      | 3.0        | 48px           |
| `--space-xxxl`     | 4.5        | 72px           |
| `--space-xxxxl`    | 6.0        | 96px           |
| `--space-xxxxxl`   | 8.0        | 128px          |

### 4.2 Token alias map (used in JS)

```ts
spacing = {
  0:    '0px',
  xs:   'var(--space-xxxxs)',   //  4px
  sm:   'var(--space-xxs)',     //  8px
  md:   'var(--space-md)',      // 16px
  lg:   'var(--space-lg)',      // 24px
  xl:   'var(--space-xl)',      // 32px
  '2xl':'var(--space-xxl)',     // 48px
  '3xl':'var(--space-xxxl)',    // 72px
  '4xl':'var(--space-xxxxl)',   // 96px
  '5xl':'var(--space-xxxxxl)',  //128px
}
```

> Default vertical stack rhythm: `.stack > * + *` uses `margin-top: var(--space-xl)` (32px) by default, overridable via `--space-stack`.

---

## 5. Layout

- **Site footer height**: `--footer-height: 350px`, **fixed** at the bottom of the viewport (`position: fixed`). The site content scrolls *over* the footer; content has its own surface (`.site-surface`) that sits above the footer with its own background.
- **Container**: there is no global `max-width`; layouts are grid-based per page (`.home-hero`, `.work-columns`, `.about-hero`, `.case-study-grid`, `.about-photo-grid`, `.kali-two-col`). All collapse to a single column under `≤ 1200px`.
- **Body**: `overflow: hidden scroll`, `overscroll-behavior-y: none`, prevents rubber-band scroll.
- **Breakpoints**:
  - `≤ 1200px` — tablet: collapses multi-column grids to single column, scales `--space-unit` to 0.875em.
  - `≤ 768px`  — small tablet: scales `--space-unit` to 0.75em.
  - `≤ 640px`  — mobile: locks `max-width: 100vw`, hides desktop nav, shows mobile menu button + dropdown, hides built-with/footer-nav, switches footer to static positioning, hides various case-study aside content.
  - `(hover: none) and (pointer: coarse)` — touch: hides the custom cursor, restores native cursor everywhere.

---

## 6. Components

### 6.1 Navigation

- `.nav-center` and `.nav-chat-btn` are the desktop nav.
- On mobile (`≤ 640px`) they're hidden; `.nav-mobile-menu-btn` and `.nav-mobile-dropdown` take over.
- No persistent background on the nav itself — it sits on the page surface.

### 6.2 Brick (the media-card primitive — the centerpiece)

```css
.brick-media {
  --mouse-x: 50%; --mouse-y: 50%;
  border-radius: 0;
  transition: transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1);
  position: relative; overflow: hidden;
  will-change: transform;
}
.brick-media::before {
  /* 0.5px hairline border painted via two-layer mask compositing */
  background: linear-gradient(rgba(47,43,42,0.10), rgba(47,43,42,0.10));
  padding: 0.5px;
  transition: background 0.18s;
}
.brick-media:hover {
  transform: translateY(-2px) scale(1.01);
}
.brick-media:hover::before {
  /* glow that follows the cursor */
  background:
    radial-gradient(circle 420px at var(--mouse-x) var(--mouse-y),
      var(--brick-glow, rgba(107,100,97,0.35)), rgba(107,100,97,0) 85%),
    linear-gradient(#fff, #fff);
}
```

**Loading state:**

```css
.brick-loading { background: rgba(47,43,42,0.04) !important; }
.brick-loading::before {
  background: linear-gradient(120deg, transparent, rgba(47,43,42,0.08), transparent);
  animation: brick-shimmer 0.27s cubic-bezier(0.22,0.61,0.36,1);
}
```

Children fade in over 0.7s once `.brick-loading` is removed.

### 6.3 Experiment list rows

```css
.experiment-row {
  transition:
    opacity 1.8s cubic-bezier(0.22,0.61,0.36,1),
    background-color 1s cubic-bezier(0.22,0.61,0.36,1);
}

/* group hover effect — sibling rows dim */
.experiment-list:has(a:hover) .experiment-row,
.experiment-list:has(a:focus) .experiment-row,
.experiment-list:has(a:active) .experiment-row { opacity: 0.3; }

.experiment-row:hover {
  opacity: 1;
  background-color: rgba(47, 43, 42, 0.04);
  transition: opacity 0.15s, background-color;
}
```

Initial entrance: `experiment-blur-in` keyframe (0 → 1 opacity, `blur(8px)` → 0, `translateY(4px)` → 0) over 0.6s.

### 6.4 Footer

- `--footer-height: 350px`, position fixed bottom, behind site content.
- Hairline divider: `.footer-divider { background: rgba(47,43,42,0.10); height: 0.5px; }`
- `.footer-link` color transitions to `#3A3634` (`primaryBody`) on hover over 0.2s.
- On `≤ 640px` the footer becomes `position: static` and the built-with line + nav links are hidden.

### 6.5 Preset questions / footer links

```css
.preset-question, .footer-link { transition: color 0.2s; }
.preset-question:hover, .footer-link:hover { color: #3A3634; }
```

### 6.6 Custom cursor

- `.custom-cursor` is rendered on hover-capable pointer devices only.
- Disabled entirely under `(hover: none) and (pointer: coarse)`.

---

## 7. Motion

### 7.1 Easing

A single easing curve does almost all the work:

```
cubic-bezier(0.22, 0.61, 0.36, 1)   // ease-out, slow finish — feels "settled"
```

### 7.2 Duration table

| Use                                | Duration |
| ---------------------------------- | -------- |
| Hover color shift (links)          | 0.2s     |
| Brick border tint                  | 0.18s    |
| Brick transform (lift)             | 0.32s    |
| Page enter (opacity + 8px rise)    | 0.6s     |
| Experiment row entrance (blur in)  | 0.6s     |
| Brick child fade-in after load     | 0.7s     |
| Experiment row group dim/undim     | 1.0s – 1.8s |
| Gradient drift                     | 10s, infinite |

### 7.3 Named keyframes

- `chatFadeUp` — 8px ↑ + opacity (chat bubbles)
- `pinFadeUp` — 3px ↑ + opacity (map/globe pins)
- `pinFadeIn` — opacity only
- `pinPulse` — `scale(1)` → `scale(3.5)`, opacity 0.6 → 0 (pulse ring)
- `gradient-drift` — background-position oscillation, ease-in-out infinite
- `brick-shimmer` — skeleton-loader pulse
- `sketch-draw` — `stroke-dashoffset` to 0 (SVG line draw)
- `experiment-blur-in` — opacity + 8px blur + 4px ↑

### 7.4 Page transitions

```css
.page-loading > * { opacity: 0; transform: translateY(8px); }
.page-loaded  > * { opacity: 1; transform: translateY(0);  }
/* both share: transition: opacity 0.6s ease, transform 0.6s ease (same curve) */
```

---

## 8. Borders, Radii, Shadows

- **Radii**: `border-radius: 0` everywhere. Cards, media, buttons — all sharp corners. This is a deliberate signature.
- **Borders**: 0.5px hairlines at 10% ink (`rgba(47,43,42,0.10)`). On bricks they're painted via a two-layer CSS mask trick (`mask-composite: xor`) so the border lives inside `::before` and can be cheaply animated on hover.
- **Shadows**: no `box-shadow` is used in chrome. The closest thing is the brick hover radial glow, achieved entirely with a gradient inside `::before` — not a shadow.
- **Backdrop blur**: `.blur-surface` uses `backdrop-filter: blur(16px)` over a `rgba(150,143,140,0.05)` tint for overlay/drawer states.

---

## 9. Effects worth copying

1. **Hairline-border-via-mask on cards** — gives a 0.5px crisp border that stays pin-sharp on retina and can be animated cleanly.
2. **Cursor-following radial glow inside the card's `::before`** — `--mouse-x` / `--mouse-y` updated by JS; cheap to animate (background only).
3. **`:has()` group-dim on lists** — hovering one row fades the others to 0.3 over 1.8s, hovered row stays at 1.0 with a fast 0.15s acknowledgement. Reads as elegant attention shifting.
4. **Inter Thin at large sizes with negative tracking** — the visual identity of the headings.
5. **Fixed footer beneath scrolling surface** — content scrolls "over" the footer like a sheet, exposing footer at end-of-page.
6. **One curve, one rhythm** — `cubic-bezier(0.22, 0.61, 0.36, 1)` is the only easing function in any non-trivial transition.

---

## 10. Quick-reference token export

```ts
export const tokens = {
  fontFamilies: {
    serif: 'Inter',
    sans:  'Inter',
    mono:  'IBM Plex Mono',
  },
  colors: {
    primary:               '#23201F',
    primaryBody:           '#3A3634',
    secondary:             '#6B6461',
    meta:                  '#8F9499',
    tertiary:              '#8A8F94',
    background:            '#FAFAF8',
    bodyBackground:        '#F7F9FA',
    siteSurface:           '#FAFCFD',
    drawerBackground:      'oklab(0.159 0 0 / 0.03)',
    dividers:              'rgba(47, 43, 42, 0.10)',
    frameFill:             'rgba(47, 43, 42, 0.02)',
    selection:             '#E0E0E0',
    // accents (case-study scoped)
    caltrainRed:           '#871717',
    caltrainRedGlowStrong: 'rgba(135, 23, 23, 0.45)',
    caltrainRedGlowSoft:  'rgba(135, 23, 23, 0.20)',
    replitOrange:          '#F26207',
    brickGlow:             'rgba(107, 100, 97, 0.35)',
  },
  spacing: {
    0: '0px',
    xs: 'var(--space-xxxxs)',  // 4px
    sm: 'var(--space-xxs)',    // 8px
    md: 'var(--space-md)',     // 16px
    lg: 'var(--space-lg)',     // 24px
    xl: 'var(--space-xl)',     // 32px
    '2xl': 'var(--space-xxl)', // 48px
    '3xl': 'var(--space-xxxl)',// 72px
    '4xl': 'var(--space-xxxxl)',// 96px
    '5xl': 'var(--space-xxxxxl)',//128px
  },
  typography: {
    heroHeading:      { fontFamily: 'Inter', fontSize: '46px', fontWeight: 100, lineHeight: 1.1, letterSpacing: '-0.02em' },
    primaryHeading:   { fontFamily: 'Inter', fontSize: '26px', fontWeight: 100, lineHeight: 1.2, letterSpacing: '-0.01em' },
    sectionTitleSans: { fontFamily: 'Inter', fontSize: '26px', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.01em' },
    subsectionSans:   { fontFamily: 'Inter', fontSize: '24px', fontWeight: 500, lineHeight: 1.2, letterSpacing: '0em' },
    label:            { fontFamily: 'Inter', fontSize: '20px', fontWeight: 400, lineHeight: 1.4, letterSpacing: '0em' },
    metaCaption:      { fontFamily: 'Inter', fontSize: '16px', fontWeight: 300, lineHeight: 1.6, letterSpacing: '0em' },
    smallHeading:     { fontFamily: 'Inter', fontSize: '15px', fontWeight: 500, lineHeight: 1.5, letterSpacing: '0.01em' },
    bodyPrimary:      { fontFamily: 'Inter', fontSize: '13px', fontWeight: 300, lineHeight: 1.6, letterSpacing: '0em' },
    bodySecondary:    { fontFamily: 'IBM Plex Mono', fontSize: '11px', fontWeight: 400, lineHeight: 1.6, letterSpacing: '0.08em', textTransform: 'uppercase' },
    metadata:         { fontFamily: 'IBM Plex Mono', fontSize: '11px', fontWeight: 300, lineHeight: 1.6, letterSpacing: '0.01em', textTransform: 'uppercase' },
  },
  motion: {
    easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    durations: {
      micro: '0.18s',
      hover: '0.2s',
      brick: '0.32s',
      page:  '0.6s',
      slow:  '1.8s',
    },
  },
  radii: { all: 0 },
  borders: { hairline: '0.5px solid rgba(47, 43, 42, 0.10)' },
} as const;
```

---

## 11. Loaded but not in the resolved token map

These fonts are loaded by the site but the live tokens above only reference Inter + IBM Plex Mono. Treat them as page-specific assets, not part of the global system:

- **Libre Baskerville** (local OTF, Light/Regular/Italic/Bold/ExtraBold) — likely used in specific long-form case studies.
- **Instrument Sans** (400–700) — Google Fonts, available for case-study scoped use.
- **Lateef** (200–800) — Arabic, used to set the name "حواري" alongside the Latin "Carmah Hawwari".
