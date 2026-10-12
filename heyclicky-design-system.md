# HeyClicky Design System

Reference: https://www.heyclicky.com/

---

## Brand Personality

Playful, casual, and human. HeyClicky sits at the intersection of a nostalgic internet aesthetic and modern macOS-native product design. The tone is conversational — almost like a text from a friend — and the visual language reinforces that through scattered layouts, kaomoji, and OS-chrome mimicry. Not corporate. Not hustle-y. Just approachable and a little weird in the best way.

---

## Typography

### Fonts

| Role | Font | Notes |
|---|---|---|
| Wordmark / H1 | Custom / clean geometric sans-serif | Lowercase only, wide letterspacing, appears to be a slightly refined/distinctive weight — think DM Sans, Geist, or a custom variant |
| Body / UI | System sans-serif (likely `-apple-system, BlinkMacSystemFont, "Segoe UI"`) | Leans into native OS feel |
| Kaomoji / accents | Monospace / emoji | `^ ω ^`, `(;-;)`, `(~ . ~)`, `{^.^}` — used as visual texture, not body copy |

### Scale (estimated from screenshot)

| Element | Size | Weight | Notes |
|---|---|---|---|
| Brand name (`heyclicky`) | ~64–80px | Regular / 400 | Large, centered hero text |
| Tagline | ~16–18px | Regular / 400 | Subtler, sits directly under wordmark |
| Nav items | ~13–14px | Regular / 400 | All lowercase |
| Button labels | ~13–14px | Medium / 500 | Paired with system icons |
| Caption / labels on windows | ~11–12px | Regular / 400 | Below floating window mockups |

### Rules
- **All lowercase** for brand voice — even button labels and nav
- No decorative serifs anywhere; entirely sans or mono
- Kaomoji are typographic, not emoji images — render as text

---

## Color Palette

### Core

| Token | Value (approx) | Usage |
|---|---|---|
| `--bg` | `#F5F4F2` or `#FFFFFF` | Page background — off-white or pure white |
| `--text-primary` | `#0D0D0D` | Headings, body, nav |
| `--text-secondary` | `#6B6B6B` | Captions, subtitles, labels under mockups |
| `--accent-blue` | `#3B82F6` (system blue) | Link color, interactive states |
| `--btn-primary-bg` | `#0D0D0D` | "download for mac" button |
| `--btn-primary-text` | `#FFFFFF` | Button label |
| `--btn-secondary-bg` | `transparent` | "windows waitlist" button |
| `--btn-secondary-border` | `#D1D1D1` | Outlined button border |
| `--macos-red` | `#FF5F57` | Traffic light — close |
| `--macos-yellow` | `#FEBC2E` | Traffic light — minimize |
| `--macos-green` | `#28C840` | Traffic light — zoom |

### Notes
- No heavy gradients — flat, clean surfaces
- Dark mode is implied (light-first, but OS-native app suggests system preference support)
- Green checkmarks used in pricing lists (likely macOS system green)

---

## Spacing & Layout

### Approach
The hero layout is a **controlled scatter** — not a grid. Elements are positioned absolutely or with CSS transforms, rotated slightly, giving a scrapbook / corkboard feel. Below the hero, the layout normalizes into centered columns.

### Spacing Scale (estimated)

| Token | Value |
|---|---|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 32px |
| `--space-xl` | 64px |
| `--space-2xl` | 128px |

### Layout Rules
- Max content width: ~960–1100px, centered
- Nav: full-width with centered logo + links, right-aligned CTA
- Hero: center-anchored text with absolutely positioned floating windows radiating outward
- Sections below hero: generous vertical padding (~80–120px between sections)

---

## UI Components

### Navigation

```
[logo] [features] [pricing] [trust] [changelog] [careers]        [get heyclicky →]
```

- Sticky top bar, minimal height (~44–48px)
- Logo is the wordmark ("heyclicky") in small, bold-ish sans
- Nav links: lowercase, no underline, subtle hover
- Squiggle mark (∿∿) appears in nav — likely a favicon/brand mark variant
- CTA pill button right-aligned: dark background, white text, rounded

### Buttons

**Primary (dark)**
```
[  ⌘  download for mac  ]
```
- Background: `#0D0D0D`
- Text: `#FFFFFF`
- Padding: ~10px 20px
- Border-radius: ~8–10px (pill-adjacent but not full pill)
- Icon: Apple logo SVG left of label

**Secondary (outlined)**
```
[  ⊞  windows waitlist  ]
```
- Background: transparent
- Border: 1px solid `#D1D1D1`
- Text: `#0D0D0D`
- Same dimensions as primary

**Micro CTA (nav)**
- Small, filled dark pill: `get heyclicky`
- Possibly with a small arrow or chevron

### macOS Window Mockups

One of the most distinctive components — simulated OS windows used as product screenshots.

```
┌─────────────────────────────┐
│ ● ● ●  heyclicky - draw.io  │  ← title bar with traffic lights
├─────────────────────────────┤
│                             │
│   [product screenshot]      │
│                             │
└─────────────────────────────┘
```

- Traffic lights: red/yellow/green circles (~10px diameter, ~8px gap)
- Title bar height: ~28px, light gray background
- Window body: screenshot or video
- Drop shadow: soft, diffused (macOS-style) — `box-shadow: 0 8px 32px rgba(0,0,0,0.15)`
- Border radius: ~10px (matches macOS window chrome)
- Windows appear at slight rotations (`transform: rotate(-3deg)` etc.) in the hero

### Pricing Cards

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   free       │   │   pro        │   │   max        │
│              │   │   $20/mo     │   │   $100/mo    │
│  ✓ feature   │   │  ✓ feature   │   │  ✓ feature   │
│  ✓ feature   │   │  ✓ feature   │   │  ✓ feature   │
│              │   │              │   │              │
│ [start free] │   │  [get pro]   │   │  [get max]   │
└──────────────┘   └──────────────┘   └──────────────┘
```

- Bordered containers, rounded corners (~12px)
- Border: `1px solid #E5E5E5`
- Light background (white or off-white)
- Consistent internal padding
- Feature list uses `✓` checkmarks in green

### Testimonial / Social Proof

Tweet-style cards rendered inside macOS window frames — keeps the OS-native aesthetic consistent with the product.

---

## Motion & Animation

The site's energy comes from its scattered layout, but there are implied animation patterns:

| Pattern | Description |
|---|---|
| Float / parallax | Floating window mockups likely have subtle CSS parallax on scroll |
| Rotation | Elements positioned with slight `rotate()` transforms (~-5deg to +5deg) |
| Entrance animation | Fade-in + slight upward translate on scroll into view |
| Hover on buttons | Subtle scale or opacity shift — not dramatic |
| Video autoplay | Product demo videos play silently in window mockups |

---

## Iconography

- macOS system icons used verbatim: wifi, bluetooth, control center, battery
- macOS traffic lights (close/minimize/zoom) as authentic SVGs
- Apple logo (⌘-adjacent) on download button
- Windows logo on waitlist button
- Folder icon (macOS blue folder) used decoratively
- No icon library detected — icons appear to be system-native SVGs or PNGs

---

## Photography & Imagery Style

- Real photos (not illustrations) — people using the product, candid-feeling
- Mixed media: screenshots, screen recordings, webcam-style captures
- Images are contained inside macOS window frames — never raw/unframed
- Warm, natural lighting in photos; no heavy filters
- Vintage / nostalgic references: Nokia phone image, old-school UI screenshots
- Mix of aspect ratios — not uniform

---

## Kaomoji as Design Language

This is central to the brand. Kaomoji are used as:

- **Decorative accents** between or around floating windows
- **Personality markers** — the product has a character
- **Section breaks** or transitions

Common ones used:
```
^ ω ^
(;-;)
(~ . ~)
{^.^}
¯\_(ツ)_/¯
```

These appear as small text labels near floating elements, always at small size (~12–14px), in a muted/secondary text color.

---

## Voice & Copy Style

| Pattern | Example |
|---|---|
| All lowercase | "heyclicky", "download for mac" |
| Casual contractions | "that lives on your mac" |
| Slang affirmations | "no cap!" (on unlimited plan badge) |
| Parenthetical humor | Pricing footnotes, feature descriptions |
| Direct questions | Section headers as conversational prompts |

---

## Summary: The Visual DNA

HeyClicky's design is built on three tensions that resolve beautifully:

1. **Familiar OS chrome + unfamiliar scattered layout** — macOS windows you trust, arranged like a corkboard you don't expect
2. **Clean minimal type + messy expressive kaomoji** — restrained typographic scale with ASCII chaos as accent
3. **Professional product + deeply casual voice** — it's a real AI productivity tool, but the copy sounds like a Discord message

To replicate this aesthetic: start with a pure white canvas, set your heading in a clean lowercase sans at 72px, then start throwing macOS-chrome-wrapped screenshots around it at ±5° rotations, and sprinkle `^ ω ^` wherever things feel too serious.
