import Link from 'next/link'
import Brick from '@/components/ui/Brick'
import { projects } from '@/lib/projects'

export default function ProjectsPage() {
  return (
    <div className="pb-[var(--space-xxxxxl)]">

      {/* ── Header ──────────────────────────────────────── */}
      <div className="mb-[var(--space-xxl)] pb-[var(--space-md)]">
        <span className="type-mono text-[var(--color-secondary)]">work</span>
      </div>

      {/* ── Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-y-[var(--space-xxxl)] md:grid-cols-2 md:gap-x-[var(--space-xxl)]">
        {projects.map(project => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="no-underline">
            <Brick>
              <div
                className="aspect-[16/10] overflow-hidden mb-[var(--space-md)]"
                style={{ background: project.coverColor }}
              />

              <div>
                <div className="flex items-baseline justify-between mb-[var(--space-xxxxs)]">
                  <span className="type-meta text-[var(--color-meta)]">[ {project.kind} ]</span>
                  <span className="type-meta text-[var(--color-meta)]">{project.year}</span>
                </div>

                <p className="type-body text-[var(--color-primary)] mb-[var(--space-xxxxs)]">
                  {project.title}
                </p>

                <p className="type-body text-[var(--color-secondary)]">
                  {project.tagline}
                </p>
              </div>
            </Brick>
          </Link>
        ))}
      </div>

    </div>
  )
}
