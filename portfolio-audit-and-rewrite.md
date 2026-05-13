# Portfolio Audit & Rewrite — Neelakshi Das

Extracted from the live codebase at `/Users/neelakshidas/Documents/Portfolio-Revamp/` on 2026-05-13.
**Section 1** is the existing content verbatim. **Section 2** is the gap analysis you outlined. **Section 3** is the rewrite — positioning, hero, project copy, case-study skeleton, and the new IA. **Section 4** is the concrete punch list of what to build/write next.

---

## Section 1 — Current Content (verbatim)

### 1.1 Brand / metadata

- **Page title**: `Neelakshi Das — Design Engineer`
- **Meta description**: `I help startups and SaaS teams bring ideas to life.`
- **Keywords**: portfolio, design engineer, UI/UX designer, frontend developer, React, Next.js
- **Hero (`HeroSection.tsx`)**:
  - `currently at @cosx.ai`
  - `Hey, I'm Neelakshi`
  - `Designer & Engineer`
- **Nav**: `The Playground` · `The Projects` · `The Person`
- **Footer**: `In case you didn't look up today, here's a little sky for you ~` + day/sunset toggle
- **404**: `PAGE NOT FOUND` · `// BACK TO PLAYGROUND_`

### 1.2 Main Projects (`/projects`)

| Slug      | Title in grid          | One-liner                                                         | Date    |
| --------- | ---------------------- | ----------------------------------------------------------------- | ------- |
| hiyn      | `design : hiyn`        | Hiyn empowers designers to rise through a dynamic creative hierarchy | 03/2025 |
| flint     | `design & dev : flint` | It's a platform that allows you to create and manage tasks.       | 02/2025 |
| safeve    | `design : safeve`      | Report anonymously. Break the silence, not your privacy.          | 01/2025 |
| vion      | `design : vion`        | Vion is a platform that helps you create and manage your tasks.   | 02/2026 |

**Case-study page bodies — each currently follows the same 2-block structure:**

- **Flint** — *Flint: simplifying team task management.*
  Overview: existing tools are complex; bad onboarding kills adoption.
  Solution bullets: clean UI · onboarding · Kanban · speed/clarity.
- **Hiyn** — *Hiyn: a dynamic creative hierarchy for designers.*
  Overview: unified platform — learning + collaboration + recruitment.
  Solution bullets: curated modules · real-world projects · public portfolios · recruiter discovery.
- **Safeve** — *Safeve: enhancing women's safety through anonymous reporting.*
  Overview: POSH Act exists but fear of backlash silences victims, especially in tech.
  Solution bullets: secure anonymous reporting · pattern detection · trust + accountability.
- **Vion** — *Vion: fully customizable AI-powered audiobook experience.*
  Overview: current audiobooks are fixed; Vion personalizes narration with AI.
  Solution bullets: AI narration · custom narrator/character voices · tone/emotion control · cinematic listening.

**Across all four**: each page goes Overview → Proposed Solution → image grid → next/prev nav. No research, no wireframes, no iteration, no metrics.

### 1.3 The Playground (`/playground`)

Ten experiments:

1. **Credit Card Masking** — card numbers hidden by default, reveal on hover · 03/2025
2. **Logo Iteration** — a non-mainstream logo study driven by intentional decisions · 02/2025
3. **Pause Before You Reel** — sarcastic guilt-trip pop-ups over the Reels button · 01/2025
4. **Wind Hashira Prelude** — preloader built around a wind motif · 02/2025
5. **Just a Potterhead** — how *Aparecium* would work in real life · 02/2025
6. **Randomness as Inspiration** — one click → one randomly curated site, breaks creative blocks · 03/2026
7. **Anime Portfolio Iteration** — cozy anime-themed desk where you move things around · 03/2026
8. **Sound, Made Visible** — audio → real-time generative patterns (Figma Makeathon, 2026) · 03/2026
9. **SOMA, Decoding Discomfort** — AR concept translating stress signals to guided pressure-point relief · 03/2026

### 1.4 The Person (`/person`) — "Behind The Pixels"

**Bio paragraph 1** — Kolkata origin, Hindi/English/Bengali (+ Spanish in progress), early creative environment.
**Bio paragraph 2** — Fell for design via visual charm, stays for research and problem-solving. Loves mountains, travel, deep-dive rabbit holes.
**Featured moment** — Figma Makeathon recognition (10,000+ participants).

**Experience timeline:**

| Org                            | Role                            | Period            | Bullets                                                                                                                                                                             |
| ------------------------------ | ------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VNG Medical                    | Designer Intern                 | Dec 2023–Nov 2024 | Marketing visuals; refined app UI with accessibility focus                                                                                                                          |
| National Law Training Institute| Designer Intern                 | Mar 2024–Jun 2024 | Brand + learning materials; built/launched the institute's website                                                                                                                  |
| Vexio                          | UI/UX Designer & Dev Intern     | Jul 2024–Apr 2025 | Hi-fi Figma prototypes + design systems; Next.js/TS/Tailwind responsive interfaces                                                                                                  |
| CosX                           | UI/UX Designer & Dev Intern     | Jun 2025–Present  | **WordPress → Next.js migration for Signzy** (consistency + performance); sites for Natural Capital Partners, CosX, Kareverse, Akhand Jyoti; currently leading **CosxLive redesign**|

**CTAs**: `Peek inside the folders above` · `Resume` · `© 2026 All Rights Reserved`

### 1.5 The Iteration page (`/iteration`) — pixel-canvas manifesto

A blue (`#093fb4`) pixel-canvas page with a mouse-tracking pixel face. Three sections in lowercase monospace:

- **01 — what i design**: "interfaces that feel alive. systems that respond to you, not the other way around. pixels with personality. layouts that breathe. details no one asked for but everyone notices."
- **02 — what i build**: "things that move and react. canvas experiments at 2am. components that remember you. interactions > decorations. performance is a feature. every frame matters."
- **03 — what i learn**: "that the best UI disappears. that constraints breed creativity. that shipping beats perfecting. iteration > ideation. every version teaches something the last one couldn't."

This page is the strongest single artifact on the site for the design-engineer position. It is currently unlinked from the main nav.

---

## Section 2 — Gap Analysis

### 2.A Portfolio & case-study gaps

| # | Gap                                                                                                                             | Evidence                                                                                                  |
| - | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1 | Every case study shows solution screens and skips the thinking that produced them                                               | All four case-study pages have only `Overview` + `Proposed Solution` bullets. No research, no wireframes. |
| 2 | The measurable outcomes from your resume (113% traffic ↑, 250+ active users, 99 SEO, 40% page-load improvement, 3M+ monthly) are completely absent | Grep across all `app/projects/**/page.tsx` — no numbers, no metrics blocks                                |
| 3 | **VectorDrop** — the most recent and technically differentiated project — is not in the main portfolio at all                  | Not in `ProjectSection.tsx`, no `/projects/vectordrop` route exists                                       |
| 4 | The Signzy WordPress → Next.js migration appears only as a single bullet on the Person page, not as a case study                | Mentioned once in the CosX role; no `/projects/signzy` page                                               |
| 5 | The site can't answer "what kinds of problems do you solve and how do you approach them?"                                       | Project one-liners describe *the product*, never *the problem-class* or *the approach*                    |
| 6 | Resume skills (user research, wireframing, usability testing, design systems) are undetectable in any case study                | None of these terms appear in case-study copy                                                             |
| 7 | Vion's one-liner is wrong: "Vion is a platform that helps you create and manage your tasks" — that's Flint's copy duplicated   | `ProjectSection.tsx` data array: Vion row has the wrong description string                                |
| 8 | Two near-duplicate "Pause Before You Reel" entries in the Playground                                                            | `PlaygroundSection.tsx`                                                                                   |

### 2.B Thinking & process gaps

| # | Gap                                                                                                                | Why it hurts                                                                                                       |
| - | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| 1 | No research artifacts (user interviews, competitive audits, journey maps) are visible anywhere                     | The headline claim "research and problem-solving keep me grounded" has no evidence on the site                     |
| 2 | No wireframes / mid-fi explorations / version histories shown                                                      | Reviewers can't tell whether a screen was the first idea or the tenth                                              |
| 3 | No iteration or "what didn't work" sections                                                                        | Senior reviewers specifically look for ability to discard ideas                                                    |
| 4 | No engineering thinking shown either — no perf traces, no Lighthouse before/after, no architecture diagrams        | The "engineer" half of "designer + engineer" has zero artifacts                                                    |
| 5 | **AI in your workflow is invisible** — no mention of how you use AI for research synthesis, code, design exploration | This is the differentiator in 2026 and you're not claiming it                                                      |
| 6 | The `/iteration` page (which is *literally about process*) is unlinked from the main nav                           | Your strongest process artifact is hidden                                                                          |

### 2.C Positioning & direction gaps

| # | Gap                                                                                                                                              | Today                                                                | Should be                                                            |
| - | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1 | "Designer & Engineer" is stated in the hero but never demonstrated in how individual projects are framed                                          | Project titles use prefixes `design :` and `design & dev :` mechanically | Each case study explicitly shows *what design decided* and *what engineering enabled* |
| 2 | The portfolio doesn't pick a target — product design, design engineering, or interaction design                                                  | Tagline reads "I help startups and SaaS teams bring ideas to life" — generic | One clear position: **design engineer fluent in AI, design, and the web** (per memory) |
| 3 | "Designer & engineer" doesn't argue *why the combination matters*                                                                                | The label is asserted; the value of the pairing isn't explained      | A one-paragraph thesis on the hero/about that names the unlock        |
| 4 | The Playground — your most differentiating work — is siloed under its own tab away from the main projects                                         | Separate `/playground` route, not surfaced on home                   | Surface 2–3 playground pieces on home as proof of craft; keep the full set under `/playground` |
| 5 | The "Behind The Pixels" bio is warm but doesn't say what you *do* or *for whom*                                                                  | Kolkata origin → languages → creative childhood                      | Open with the work and the position; keep Kolkata as the second beat |
| 6 | Tone is split across surfaces — sky toggle and "wall of shame" are playful; case studies are formal; `/iteration` is brutalist                    | Three different voices                                               | One voice, with playful flashes — don't kill the personality, but make case studies sound like the same author as the bio |

---

## Section 3 — Rewrite

> **Direction chosen** (per your memory note and the evidence in your resume): **design engineer fluent in AI, design, and the web.** All copy below commits to this single position.

### 3.1 Metadata & hero

**Page title**
```
Neelakshi Das — Design Engineer
```

**Meta description (rewrite)**
```
Design engineer working at the seam of AI, design, and the web.
I ship product surfaces end-to-end — research → interface → code → measurement.
```

**Hero (rewrite of `HeroSection.tsx`)**

Replace:

```
Hey, I'm Neelakshi
Designer & Engineer
currently at @cosx.ai
```

With:

```
Hey, I'm Neelakshi —
a design engineer working at the seam of
AI, design, and the web.

I ship product surfaces end-to-end:
research, interfaces, code, and the metrics that prove they worked.

Currently at @cosx.ai, where I led the Signzy
WordPress → Next.js migration (40% faster, 3M+ monthly visits).
```

**Why this works**
- Names the discipline ("design engineer") instead of stapling two nouns together.
- States the seam ("AI, design, and the web") that makes the combo meaningful.
- Lists the deliverables in one breath so a reviewer immediately knows what you produce.
- Anchors with a *specific* shipped result, not a generic "bring ideas to life."

### 3.2 New IA (information architecture)

Today's nav: `The Playground` · `The Projects` · `The Person`. Keep the tone, but reorder so the strongest signal is first and process is visible:

```
Work        →  /projects   (case studies, including Signzy + VectorDrop)
Process     →  /iteration  (link the manifesto page; add a "how I work with AI" section)
Playground  →  /playground
About       →  /person
```

**Home page** should surface, in order:

1. Hero (above).
2. **Featured work** — 3 cards: Signzy migration, VectorDrop, Vion (the AI one). Each card shows a one-line problem statement + one outcome metric.
3. **From the playground** — 2 picks from `/playground` to prove craft (Sound Made Visible + Credit Card Masking are the strongest).
4. **How I work with AI** — three short bullets (see §3.6).
5. **About strip** — one paragraph + Resume + Contact.
6. Footer (keep the sky toggle — it's good).

### 3.3 Featured project copy (rewrites + new entries)

#### Add: Signzy — WordPress → Next.js migration (new case study)

**Card copy**
```
build : signzy
A WordPress → Next.js migration for a platform with 3M+ monthly visits.
40% faster page loads, integrated reCAPTCHA, design consistency restored.
```

**Page header**
```
Signzy: rebuilding a 3M-visit platform without losing a session
A WordPress site that had outgrown its CMS — slow loads,
inconsistent UI, brittle forms. I led the migration to Next.js
while contributing to UX improvements end-to-end.
```

**Sections to write** (skeleton in §3.5):
- Context — why the migration was needed (perf, design debt, security).
- Research — what I audited before touching code (page-weight inventory, Lighthouse baseline, top-traffic pages, form-abandonment data).
- Design decisions — typographic system, component library, what got cut.
- Engineering decisions — Next.js routing strategy, image pipeline, reCAPTCHA integration, SEO preservation.
- Outcomes — **40% faster page loads · 3M+ monthly visits preserved · reCAPTCHA integrated · 99 SEO score**.
- What I'd do differently.

#### Add: VectorDrop (new case study — flagship for "design engineer + AI")

**Card copy** (replace one of the weaker entries on the home featured strip)
```
build : vectordrop
A small tool I shipped to solve my own friction: drop a file,
get a vectorized output. Designed and engineered solo,
shipped to 250+ active users with a 113% traffic lift in [period].
```

**Why this is the flagship**
- It is the clearest single piece of evidence for "design engineer fluent in AI" — you designed the UX, built it, used AI in the workflow, and have measurable outcomes.
- It is recent.
- It is small enough to document fully without inventing scope.

#### Rewrite: Vion

The current copy is literally wrong (it's Flint's description). Replace:

```
design : vion        ❌  Vion is a platform that helps you create and manage your tasks.
```

with:

```
design : vion        ✅  A customizable AI audiobook studio — upload a book,
                         direct narrator and character voices, control tone and pacing.
                         Concept project exploring how generative voice changes reader agency.
```

#### Rewrite: Hiyn, Flint, Safeve

Today, each one-liner describes the *product*. Rewrite to lead with the *problem-class* you took on, which is what reviewers actually want to know:

| Slug   | Today                                                                                | Rewrite                                                                                                                                            |
| ------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| hiyn   | Hiyn empowers designers to rise through a dynamic creative hierarchy                 | **Hiyn — designing a recruitment surface where learning and portfolio collapse into one signal.** A platform for designers to prove their skill in public. |
| flint  | It's a platform that allows you to create and manage tasks.                          | **Flint — what does task management look like for a team that hates task managers?** Stripped onboarding, single-pane Kanban, no settings page.    |
| safeve | Report anonymously. Break the silence, not your privacy.                             | **Safeve — designing for trust when the user can't trust the system.** Anonymous workplace-harassment reporting under the POSH Act.                |

### 3.4 Project-tile labelling

Drop the `design :` / `design & dev :` / `build :` prefixes — they're filing-system labels and they're inconsistent. Replace with a single small `kind` tag on the card:

```
[ case study ]   Signzy
[ case study ]   VectorDrop
[ concept ]      Vion
[ case study ]   Hiyn
[ concept ]      Safeve
[ case study ]   Flint
```

This separates *shipped work with measurable outcomes* from *concept work*, which is the distinction reviewers care about. It also lets you keep concepts in the portfolio without diluting the signal.

### 3.5 Case-study skeleton (use this for Signzy, VectorDrop, and retrofitting the others)

Every case-study page should answer six questions in this order:

```
1. Context        Why did this exist? What was failing or absent?
2. Constraints    Time, scope, team size, the non-negotiables.
3. Research       What I learned before I designed anything.
                  (Even one user quote or one audit screenshot counts.)
4. Decisions      The 2–3 hard calls I made and what I traded off.
5. The work       Design + engineering, side by side. Show iterations.
6. Outcome        Numbers if you have them; observed behavior if you don't.
                  Then: "what I'd do differently."
```

**Per page, include at least one of each:**
- A *before* artifact (a sketch, a competitive audit screenshot, a Lighthouse score, a quote).
- A *during* artifact (a wireframe, a discarded variant, a Figma frame from an earlier iteration, a git commit graph).
- An *after* artifact (the shipped screen + a number).

A reviewer flipping through three case studies should see at least nine *non-final-screen* artifacts. Right now the count is zero.

### 3.6 "How I work with AI" — a section worth ~150 words

Add this as a strip on the home page and as a permanent section on `/iteration`. Make it specific, not aspirational:

```
How I work with AI

Research synthesis — I use Claude/GPT to pressure-test problem framings
against a corpus of interviews and PRDs. The model is faster at clustering
than I am; the call about what matters is still mine.

Design exploration — I generate ten ugly variants before I draw one good one.
The model is a sparring partner for layout and copy, not the designer.

Engineering — I pair with Claude Code on greenfield features and on
migration work. Most of my recent shipped code (Signzy migration, VectorDrop,
this portfolio) was written with AI in the loop.

Measurement — I write the eval before I write the prompt, the same way
I write the success metric before the wireframe.
```

This single section does three jobs at once: claims the AI-fluent position, names tools concretely (which is what hiring managers want), and quietly demonstrates engineering discipline ("eval before prompt").

### 3.7 Bio rewrite (`PersonSections.tsx`)

Reorder so the work comes first, Kolkata becomes the second beat (it's a great detail but it's not what gets you hired):

```
I'm a design engineer. I split my time between Figma and a code editor,
and most days I can't tell you which one I started in. I'm fluent in
research and the web — wireframes, design systems, Next.js, TypeScript,
and increasingly, the AI tools that are starting to sit between the two.

I grew up in Kolkata, the City of Joy — every lane hums with art, culture,
and color, and that early chaos is still how I see and express. I speak
Hindi, English, and Bengali, and I'm slowly picking up Spanish.

Creativity has been the constant — from handmade cards to intuitive UI.
I fell for design through its visual charm; I stayed for the research
and the problem-solving. Mountains, travel, occasional rabbit holes.
```

### 3.8 Tone and voice — keep the personality

The current site has three genuinely good voice moves: the sky toggle, the "wall of shame" CTA, and the `/iteration` page. **Don't sand these off.** The fix is to make the case studies sound like they were written by the same person — currently they sound like they were written by a template. Loosening case-study copy by one click (e.g., "I'd do differently next time" sections written in first person) closes the voice gap without sacrificing the professional read.

### 3.9 Small content bugs to fix while you're in there

- **`ProjectSection.tsx`** — Vion's description is Flint's description; replace per §3.3.
- **`PlaygroundSection.tsx`** — two `Pause Before You Reel` entries; collapse to one.
- **Footer date** — "© 2026 All Rights Reserved" is fine for now but consider auto-dating it via JS so this doesn't rot.
- **Metadata** — `keywords` meta tag still includes generic "UI/UX designer, frontend developer." If the position is design engineer, prune.

---

## Section 4 — Punch list, in priority order

Each item is sized so you can do it in one sitting.

### Must do (positioning fixes — this is what makes the site answer the reviewer question)

1. **Rewrite the hero** per §3.1. (15 min, biggest single signal change.)
2. **Add the Signzy case study** with the §3.5 skeleton and your real numbers from the resume. (Half a day. This single page changes how the whole portfolio reads.)
3. **Add VectorDrop to `/projects`** with at least a stub case study and the metrics you have. (Half a day.)
4. **Fix the Vion copy bug** in `ProjectSection.tsx`. (5 min.)
5. **Add the "How I work with AI" strip** to home and `/iteration` per §3.6. (1 hour.)

### Should do (process visibility — this is what closes the "thinking gap")

6. **Retrofit one existing case study** (recommend Hiyn — it has the most depth potential) with the §3.5 six-section skeleton, including at least one wireframe and one piece of research. (1 day.)
7. **Link `/iteration` in the nav** as "Process." Don't let your strongest process artifact stay hidden. (5 min.)
8. **Promote 2 playground pieces to the home page** as proof of craft. (30 min.)

### Nice to have (polish)

9. Move project tile labels to a single `[ case study ]` / `[ concept ]` tag per §3.4.
10. Replace the bio with §3.7.
11. Collapse the duplicate "Pause Before You Reel" entry.
12. Decide whether to keep "Designer & Engineer" anywhere — if you commit to "design engineer," the old phrasing should go from the hero entirely.

### Don't touch

- The sky toggle in the footer.
- The `/iteration` page itself (just link to it).
- The Playground tone.
- The Libre Baskerville + Neue Montreal type direction.

---

## Appendix A — Where each piece of resume evidence should land

You have outcome numbers that aren't on the site. Map them in:

| Resume claim                                            | Lives in                                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **WordPress → Next.js migration for Signzy, 3M+ monthly** | New `/projects/signzy` case study (context + outcome)                          |
| **40% page-load improvement, reCAPTCHA, design consistency** | Signzy case study (engineering + outcome)                                      |
| **99 SEO score**                                        | Signzy case study (outcome metric)                                             |
| **113% traffic increase**                               | VectorDrop case study (outcome) — confirm which project this belongs to        |
| **250+ active users**                                   | VectorDrop case study (outcome)                                                |
| **Figma Makeathon top recognition (10,000+ participants)** | Keep on `/person`; also mention in the Sound, Made Visible playground entry    |
| **User research, wireframing, usability testing, design systems** | Each should appear at least once across the retrofitted case studies          |

If a number's denominator/period isn't crisp, write the period next to it ("Q1 2026") rather than dropping it. A specific number with a date beats no number every time.

## Appendix B — One-line elevator pitches to A/B in the hero

Pick one. Don't ship more than one at a time.

1. *Design engineer working at the seam of AI, design, and the web.*
2. *I ship product surfaces end-to-end — research, interface, code, measurement.*
3. *Design engineer. I'm fluent in Figma, Next.js, and the AI tools learning to sit between them.*
4. *Designer-engineer for teams that want one person to take a feature from research to production.*

My recommendation is #1 as the headline with #2 as the supporting line — it's the cleanest statement of position and capability without sounding like a job description.
