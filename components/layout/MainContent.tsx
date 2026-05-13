export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="
      flex-1 relative min-w-0 max-w-[var(--content-max-width)]
      pt-[68px] px-[var(--space-lg)] ml-0
      md:pt-[var(--space-xxxl)] md:px-[var(--space-xxl)] md:ml-[var(--space-lg)]
    ">
      {children}
    </main>
  )
}
