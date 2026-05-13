# justinzwu.com/me — Layout Reference

Captured from production CSS bundles on 2026-05-13.

---

## 1. Overall Page Architecture

```
┌─────────────────────────────────────────────────────────┐
│ .appContainer  (flex-direction: column, min-height:100vh) │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │ .mainWrapper  (flex: 1, display: flex)            │   │
│  │                                                   │   │
│  │  ┌──────────────┐  ┌───────────────────────────┐  │   │
│  │  │  .sidebar    │  │     .mainContent          │  │   │
│  │  │  160px wide  │  │   max-width: 800px        │  │   │
│  │  │  sticky top  │  │   padding: xl 2xl         │  │   │
│  │  │              │  │                           │  │   │
│  │  └──────────────┘  └───────────────────────────┘  │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │  Footer  (full-width)                             │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Design pattern**: Fixed-width left sidebar + fluid-but-capped main content column. Not centered globally — the sidebar sits at the left edge, the content flows to its right. The sidebar is `sticky top: --spacing-xl` so it rides along while scrolling.

---

## 2. Layout Variables

```css
:root {
  --sidebar-width:       160px;
  --content-max-width:   800px;
}
```

---

## 3. Spacing Scale

| Token           | Value   | At 16px base |
| --------------- | ------- | ------------ |
| `--spacing-xs`  | 0.25rem | 4px          |
| `--spacing-sm`  | 0.5rem  | 8px          |
| `--spacing-md`  | 1rem    | 16px         |
| `--spacing-lg`  | 1.5rem  | 24px         |
| `--spacing-xl`  | 2rem    | 32px         |
| `--spacing-2xl` | 3rem    | 48px         |
| `--spacing-3xl` | 4rem    | 64px         |

---

## 4. Left Sidebar (`.SidebarNav`)

```css
.sidebar {
  width: var(--sidebar-width);      /* 160px */
  position: sticky;
  top: var(--spacing-xl);           /* 32px from top */
  height: fit-content;
  margin-left: var(--spacing-xl);   /* 32px from viewport left */
  margin-top: var(--spacing-xl);
  flex-shrink: 0;
}
```

**Contents (top → bottom):**

1. **Nav links** — right-aligned column (`align-items: flex-end`), gap `--spacing-md` (16px).
   - `me` · `experience` · `drawer of thoughts` · `bookshelf` · `art gallery`
   - Font-size: `0.9rem` (desktop), `0.85rem` (tablet)
   - Active state: `font-weight: 500`
   - Text align: **right** — reads inward toward the content column
   - Transition: `color 0.2s`

2. **Droplets toggle** — `margin-top: --spacing-lg`. Small icon button, `font-size: 0.65rem` label, right-aligned.

3. **Theme toggles** — `margin-top: --spacing-lg`. Row of icon buttons, `font-size: 0.65rem` hint text (`shift+o`), right-aligned column.

4. **Vinyl/music player** — `margin-top: calc(--spacing-xl + --spacing-lg)` (56px), right-justified, shown only on larger screens.

---

## 5. Main Content (`.mainContent`)

```css
.mainContent {
  max-width: var(--content-max-width);            /* 800px */
  padding: var(--spacing-xl) var(--spacing-2xl);  /* 32px 48px */
  margin-left: var(--spacing-lg);                 /* 24px gap from sidebar */
  flex: 1;
  position: relative;
  z-index: 30;
}
```

Content is left-aligned inside its 800px column. Sections stack vertically in a flex column container (`gap: --spacing-xl`).

---

## 6. Top-Right Controls

Fixed top-right overlay, outside the sidebar and main content:

```
position: fixed
right: var(--spacing-lg)
top: var(--spacing-sm) + var(--spacing-lg) + 6px
```

Contains: social icon links (X, GitHub, LinkedIn, YouTube, email) + theme toggle button. Hidden at ≤ 480px.

---

## 7. Hero Section

```css
.hero {
  margin-bottom: 0;
  line-height: 1.2;
}
.subtitle {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: var(--spacing-sm);   /* 8px */
}
```

**Layout**: pure single-column prose. No image alongside text. Large display text using weight/size utilities (no fixed font-size in the module).

**Inline highlight chips** — rectangular inline badges:

```css
.chip {
  border-radius: 0;       /* sharp corners — no rounding */
  padding: 2px 6px;
  transition: all 0.2s;
  display: inline;
}
```

Seven color variants exist (orange, yellow, green, grey, blue, red, purple) — all share the same `border-radius: 0` and `2px 6px` padding shape.

**SVG circle/underline annotations** — a second highlight system layered on top of words:

```css
.circleHighlight svg {
  width: calc(100% + 70px);   /* overshoots text on both sides */
  height: calc(100% + 12px);
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

.underlineHighlight svg {
  width: 100%;
  height: 6px;
  position: absolute;
  bottom: -2px; left: 0;
}
```

Size variants: `.circleWide` (`+10px` wide), `.circleLarge` (`+30px` wide), `.circleSmall` (`+16px` wide).

**Bullet list under hero**:

```css
.bulletList {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);                       /* 8px between items */
  padding-left: calc(var(--spacing-lg) / 2);   /* 12px indent */
  font-size: 0.9rem;
  line-height: 1.6;
  list-style: none;
}
```

---

## 8. About Strip

```css
.about {
  margin-top: calc(-1 * var(--spacing-lg));   /* -24px — pulls tighter to hero */
  margin-bottom: var(--spacing-md);           /* 16px */
}
```

Prose paragraph that runs directly under the hero bullet list with a slight negative margin to close the gap.

---

## 9. Section Titles

```css
.sectionTitle {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);   /* 16px */
}
.projectsTitle {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);             /* 8px */
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}
```

The projects title has a small 16×16px circle dot (`border-radius: 9999px`) to its left.

---

## 10. Projects Grid

```css
.projects {
  margin-top: var(--spacing-3xl);   /* 64px above section */
  padding-top: var(--spacing-xl);   /* 32px inner */
}
.projectsGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);   /* always 2 columns */
  gap: var(--spacing-2xl);                 /* 48px col gap */
  row-gap: var(--spacing-3xl);             /* 64px row gap */
}
```

**The grid stays 2-column at all viewport widths.** Gaps shrink at smaller breakpoints but the structure never collapses to 1 column.

| Breakpoint | Column gap              | Row gap                 |
| ---------- | ----------------------- | ----------------------- |
| Desktop    | `--spacing-2xl` (48px)  | `--spacing-3xl` (64px)  |
| ≤ 768px    | `--spacing-md` (16px)   | `--spacing-lg` (24px)   |
| ≤ 480px    | `--spacing-sm` (8px)    | `--spacing-md` (16px)   |

### Project Card

```css
.card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);   /* 16px between image and text */
}
.imageWrapper {
  aspect-ratio: 16 / 10;
  border-radius: 0;
  overflow: hidden;
}
.imageLink:hover {
  transform: translateY(-2px);
  opacity: 0.9;
  transition: transform 0.2s, opacity 0.2s;
}
```

**Card structure (top → bottom):**
1. Image (16:10 ratio, full card width, `object-fit: cover`)
2. Project title
3. Date (e.g., "mar '26")
4. Description (1–2 sentences)

No border, no shadow, no card background. The image block is the card.

---

## 11. Typography

**Font**: `Inter` (variable, 100–900 weight range).

| Use                 | Size                        | Weight           |
| ------------------- | --------------------------- | ---------------- |
| Hero display        | large (utility classes)     | 700–800          |
| Section titles      | `1.125rem`                  | 600              |
| Subtitle / lead     | `1.125rem`                  | 400              |
| Sidebar nav links   | `0.9rem`                    | 400 / 500 active |
| Bullet list / body  | `0.9rem`                    | 400              |
| Sidebar hint text   | `0.65rem`                   | 400              |
| Date / meta         | `0.85rem`                   | 400              |
| Footer copyright    | `0.7rem`                    | 400              |

Line heights: `1.2` (hero) · `1.4` (subtitle) · `1.6` (lists, body).

---

## 12. Footer

```css
.footerBar {
  padding: var(--spacing-sm) var(--spacing-md);   /* 8px 16px */
}
```

**Full-width.** Contains:
- Logo SVG (height 38px)
- Bilingual name: English + Chinese characters at `4rem` (desktop, responsive below)
- Tech-stack attribution line
- Copyright
- UWaterloo Webring badge
- Polaroid wrapper — hidden at ≤ 768px
- Footer nav links — hidden at ≤ 768px

---

## 13. Responsive Breakpoints

| Width   | Behaviour                                                                                          |
| ------- | -------------------------------------------------------------------------------------------------- |
| > 768px | Sidebar (160px) + main content (800px max) side-by-side                                           |
| ≤ 768px | Sidebar hidden; top-right controls hidden; hamburger nav shown; `mainWrapper` → column, `padding: 0 --spacing-lg` |
| ≤ 480px | `padding: 0 --spacing-md`; grid gaps at minimum                                                   |

---

## 14. Interaction Inventory

| Element                     | Trigger        | Effect                                                         |
| --------------------------- | -------------- | -------------------------------------------------------------- |
| Highlight chip              | hover          | Saturated bg; 0.2s transition                                  |
| Project card                | hover          | `translateY(-2px)` + `opacity: 0.9`; 0.2s                     |
| Sidebar nav link            | hover          | Color shift; 0.2s                                              |
| Theme toggle                | click / Shift+O| Toggles `data-theme` attribute on root                         |
| Droplets toggle             | click          | Shows/hides animated droplet overlay                           |
| Hamburger (mobile)          | click          | Slides in mobile nav panel                                     |
| Collection grid item (art)  | hover          | `box-shadow: 0 4px 12px rgba(0,0,0,0.1)`; dashed border shifts |
| Collection scroll handle    | hover on item  | Circle button fades in top-right of item; 0.15s                |

---

## 15. Key Layout Decisions

1. **Sidebar nav is right-aligned, reading inward.** `text-align: right` so text flush-right against the sidebar edge, pointing toward the content. Creates a gutter line without an explicit border.

2. **`border-radius: 0` everywhere.** Chips, cards, image wrappers, project thumbnails — all sharp rectangles. No rounding anywhere.

3. **Content max-width is 800px, not globally centered.** The column starts to the right of the sidebar with a 24px gap. On wide screens the content sits left-of-center.

4. **Two highlight systems coexist.** Rectangular `<span>` chips AND hand-drawn SVG circle/underline overlays — chips for clickable links, SVG circles for decorative emphasis.

5. **Projects grid is always 2-column.** No single-column mobile fallback — the grid compresses its gaps but holds its structure.

6. **Sidebar vinyl/music player is decorative-functional.** Hidden on tablet and mobile.

---

## 16. Quick Reconstruction Cheatsheet

```css
:root {
  --sidebar-width: 160px;
  --content-max-width: 800px;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
}

/* App shell */
.app { display: flex; flex-direction: column; min-height: 100vh; }
.main-wrapper { display: flex; flex: 1; }

/* Sidebar */
.sidebar {
  width: var(--sidebar-width);
  position: sticky;
  top: var(--spacing-xl);
  height: fit-content;
  margin-left: var(--spacing-xl);
  margin-top: var(--spacing-xl);
  flex-shrink: 0;
}
.sidebar-nav { display: flex; flex-direction: column; align-items: flex-end; gap: var(--spacing-md); }
.sidebar-link { font-size: 0.9rem; text-align: right; }
.sidebar-link.active { font-weight: 500; }

/* Main content */
.main-content {
  max-width: var(--content-max-width);
  padding: var(--spacing-xl) var(--spacing-2xl);
  margin-left: var(--spacing-lg);
  flex: 1;
}
.content-stack { display: flex; flex-direction: column; gap: var(--spacing-xl); }

/* Highlight chip */
.chip { border-radius: 0; padding: 2px 6px; transition: background-color 0.2s, color 0.2s; }

/* Projects grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-2xl);
  row-gap: var(--spacing-3xl);
}

/* Project card image */
.card-image { aspect-ratio: 16 / 10; border-radius: 0; overflow: hidden; }

/* Mobile */
@media (max-width: 768px) {
  .sidebar { display: none; }
  .main-wrapper { flex-direction: column; padding: 0 var(--spacing-lg); }
  .main-content { padding: var(--spacing-lg) 0; margin-left: 0; }
  .projects-grid { gap: var(--spacing-md); row-gap: var(--spacing-lg); }
}
@media (max-width: 480px) {
  .main-wrapper { padding: 0 var(--spacing-md); }
  .main-content { padding: var(--spacing-md) 0; }
  .projects-grid { gap: var(--spacing-sm); row-gap: var(--spacing-md); }
}
```
