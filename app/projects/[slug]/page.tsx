import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { projects, getProject } from '@/lib/projects'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Neelakshi Das`,
    description: project.tagline,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex(p => p.slug === slug)
  const prev = projects[currentIndex - 1]
  const next = projects[currentIndex + 1]

  return (
    <article className="pb-[var(--space-xxxxxl)]">

      {/* ── Eyebrow ─────────────────────────────────────── */}
      <div className="mb-[var(--space-lg)]">
        <Link href="/projects" className="type-meta text-[var(--color-meta)] transition-colors inline-flex items-center gap-[4px]">
          <ArrowLeft size={10} weight="light" /> work
        </Link>
      </div>

      {/* ── Cover ───────────────────────────────────────── */}
      <div
        className="aspect-video mb-[var(--space-xxl)]"
        style={{ background: project.coverColor }}
      />

      {/* ── Header ──────────────────────────────────────── */}
      <header className="mb-[var(--space-xxl)] border-b-hairline pb-[var(--space-xl)]">
        <div className="flex items-baseline gap-[var(--space-md)] mb-[var(--space-md)]">
          <span className="type-meta text-[var(--color-meta)]">[ {project.kind} ]</span>
          <span className="type-meta text-[var(--color-meta)]">{project.year}</span>
        </div>

        <p className="type-body text-[var(--color-primary)] text-[15px] mb-[var(--space-md)]">
          {project.title}
        </p>

        <p className="type-body text-[var(--color-secondary)] max-w-[520px]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-[var(--space-sm)] mt-[var(--space-lg)]">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="type-meta text-[var(--color-meta)] border-hairline py-[2px] px-[8px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* ── Case study sections ──────────────────────────── */}
      {project.sections && project.sections.length > 0 ? (
        <div className="stack-xxl">
          {project.sections.map((section, i) => (
            <section key={i}>
              <h2 className="type-mono text-[var(--color-meta)] mb-[var(--space-md)]">
                {String(i + 1).padStart(2, '0')} — {section.heading}
              </h2>
              <p className="type-body text-[var(--color-primary-body)] max-w-[520px]">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      ) : (
        <p className="type-body text-[var(--color-secondary)]">
          Case study coming soon.
        </p>
      )}

      {/* ── Prev / Next nav ─────────────────────────────── */}
      <div className="flex justify-between mt-[var(--space-xxxxxl)] pt-[var(--space-xl)] border-t-hairline">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="no-underline">
            <span className="type-meta text-[var(--color-meta)] block mb-[var(--space-xxxxs)] inline-flex items-center gap-[4px]"><ArrowLeft size={10} weight="light" /> prev</span>
            <span className="type-body text-[var(--color-primary)]">{prev.title}</span>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`/projects/${next.slug}`} className="no-underline text-right">
            <span className="type-meta text-[var(--color-meta)] block mb-[var(--space-xxxxs)] inline-flex items-center gap-[4px] justify-end">next <ArrowRight size={10} weight="light" /></span>
            <span className="type-body text-[var(--color-primary)]">{next.title}</span>
          </Link>
        ) : <div />}
      </div>

    </article>
  )
}
