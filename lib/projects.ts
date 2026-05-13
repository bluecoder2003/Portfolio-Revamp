export type Project = {
  slug:        string
  kind:        'case study' | 'concept'
  title:       string
  tagline:     string
  description: string
  year:        string
  tags:        string[]
  coverColor:  string  // fallback gradient when no cover image
  sections?:   CaseStudySection[]
}

export type CaseStudySection = {
  heading: string
  body:    string
}

export const projects: Project[] = [
  {
    slug:        'signzy',
    kind:        'case study',
    title:       'Signzy',
    tagline:     'WordPress → Next.js migration for a 3M+ visit platform.',
    description: 'The site had outgrown its CMS — slow loads, inconsistent UI, brittle forms. I led the migration to Next.js while contributing to UX improvements end-to-end.',
    year:        '2026',
    tags:        ['Next.js', 'migration', 'UX', 'performance'],
    coverColor:  '#E6E7E8',
    sections: [
      {
        heading: 'Context',
        body: 'Signzy is a fintech identity-verification platform with 3M+ monthly visits. The WordPress site had accumulated years of design debt — inconsistent typography, slow image loading, and reCAPTCHA forms that leaked user sessions on mobile.',
      },
      {
        heading: 'Constraints',
        body: 'Zero downtime. The platform handles live financial verification flows, so a hard cutover was off the table. I had to migrate page-by-page while keeping the WordPress site as fallback.',
      },
      {
        heading: 'Research',
        body: 'Ran a full Lighthouse audit across the 12 highest-traffic pages. Median First Contentful Paint: 4.2s. Median LCP: 7.8s. Image assets averaged 800 KB unoptimised. reCAPTCHA loaded on every page regardless of whether a form was present.',
      },
      {
        heading: 'Decisions',
        body: 'Adopted Next.js Image with AVIF + WebP pipeline. Moved reCAPTCHA to lazy-load only on pages with forms. Rebuilt the design system component-by-component in parallel with the migration, rather than porting existing styles, to eliminate accumulated specificity debt.',
      },
      {
        heading: 'The work',
        body: 'Migrated 30+ pages across 4 product lines. Built a shared component library (nav, footer, hero, form, pricing table). Contributed UX design decisions on form flow, error states, and the mobile navigation collapse behaviour.',
      },
      {
        heading: 'Outcome',
        body: '40% improvement in page load speed. 99 Lighthouse SEO score. reCAPTCHA integrated without session leaks. 3M+ monthly visits preserved with no traffic drop during migration.',
      },
    ],
  },
  {
    slug:        'vectordrop',
    kind:        'case study',
    title:       'VectorDrop',
    tagline:     'Drop a file, get a vectorized output. Shipped solo to 250+ users.',
    description: 'A small tool I built to solve my own friction: uploading a raster image and getting a clean SVG back without opening Illustrator. Designed and engineered end-to-end, with AI in the loop throughout.',
    year:        '2026',
    tags:        ['tool', 'AI', 'Next.js', 'design systems'],
    coverColor:  '#E6E7E8',
    sections: [
      {
        heading: 'Context',
        body: 'Every time I needed a quick SVG from a sketch or screenshot, I was opening Illustrator, running Image Trace, tweaking thresholds, exporting. Five minutes minimum. I wanted one drag-and-drop tool that got out of my way.',
      },
      {
        heading: 'Constraints',
        body: 'Solo project. Budget: zero. Had to use free-tier APIs and self-host. Needed to be fast enough to feel instant — under 3s for a typical 500 KB PNG.',
      },
      {
        heading: 'Research',
        body: 'Tested six vectorization libraries against a corpus of 40 screenshots, sketches, and diagrams. Evaluated on: edge fidelity, node count, colour accuracy, and processing time. Also interviewed 8 designers about their current workflow to surface what mattered most.',
      },
      {
        heading: 'Decisions',
        body: 'Chose Potrace over Inkscape CLI and commercial APIs — it had the best edge fidelity-to-speed tradeoff for sketch inputs. Added an AI preprocessing step (contrast normalization via Claude vision) that improved Potrace output quality by ~30% on low-contrast inputs.',
      },
      {
        heading: 'The work',
        body: 'Built the drag-and-drop UI with live SVG preview, zoom, and node inspector. Iterated on the upload → processing → download flow across 4 design versions based on user feedback. Wrote the Next.js API route handling file validation, size limits, and error states.',
      },
      {
        heading: 'Outcome',
        body: '250+ active users. 113% traffic increase in the first 90 days. Average processing time: 1.8s. Most common feedback: "I deleted Illustrator."',
      },
    ],
  },
  {
    slug:        'hiyn',
    kind:        'case study',
    title:       'Hiyn',
    tagline:     'Designing a recruitment surface where learning and portfolio collapse into one signal.',
    description: 'A platform for designers to prove their skill in public — curated learning, real-world projects, and a portfolio that recruiters can actually read.',
    year:        '2025',
    tags:        ['product design', 'design systems', 'UX research'],
    coverColor:  '#E6E7E8',
    sections: [
      {
        heading: 'Context',
        body: 'Junior designers struggle to break into the industry because their portfolios are full of unsolicited redesigns and Figma mockups with no context. Recruiters can\'t tell who actually knows what they\'re doing.',
      },
      {
        heading: 'Constraints',
        body: 'Concept project with a 6-week timeline. Had to design the full platform experience — learning, project management, and recruiter discovery — without overloading any single flow.',
      },
      {
        heading: 'Research',
        body: 'Interviewed 12 junior designers and 4 hiring managers. Key finding: hiring managers spend an average of 90 seconds on a portfolio. The signal they\'re looking for is "can this person explain why they made this decision," which current portfolio formats don\'t surface.',
      },
      {
        heading: 'Decisions',
        body: 'Collapsed the portfolio and the project into one object — when you work on a Hiyn brief, your process is the portfolio. No separate "portfolio page" to maintain. Recruiters see the brief, your decisions, and the output together.',
      },
      {
        heading: 'The work',
        body: 'Designed the brief-taking flow, the in-progress workspace, the public profile, and the recruiter discovery dashboard. Ran two rounds of usability testing with 6 participants each.',
      },
      {
        heading: 'Outcome',
        body: 'Concept project. Validated the core thesis with 12/12 junior designer participants saying they\'d use it over a traditional portfolio format. Recruiter participants rated process-visible portfolios 4.3/5 vs. 2.1/5 for traditional formats.',
      },
    ],
  },
  {
    slug:        'vion',
    kind:        'concept',
    title:       'Vion',
    tagline:     'A customizable AI audiobook studio — direct the narrator, control the pacing.',
    description: 'Upload a book, direct narrator and character voices, control tone and emotion. A concept exploring how generative voice changes the reader\'s relationship to a text.',
    year:        '2026',
    tags:        ['AI', 'product design', 'concept'],
    coverColor:  '#E6E7E8',
  },
  {
    slug:        'flint',
    kind:        'concept',
    title:       'Flint',
    tagline:     'Task management for teams that hate task managers.',
    description: 'Stripped onboarding, single-pane Kanban, no settings page. What if the tool got out of your way on day one?',
    year:        '2025',
    tags:        ['product design', 'UX'],
    coverColor:  '#E6E7E8',
  },
  {
    slug:        'safeve',
    kind:        'concept',
    title:       'Safeve',
    tagline:     'Designing for trust when the user can\'t trust the system.',
    description: 'Anonymous workplace-harassment reporting under the POSH Act. The design problem: how do you make someone feel safe enough to file a report when they\'re terrified of being identified?',
    year:        '2025',
    tags:        ['product design', 'UX research', 'sensitive design'],
    coverColor:  '#E6E7E8',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
