import Sidebar from './Sidebar'
import MainContent from './MainContent'
import TopRightControls from './TopRightControls'
import MobileNav from './MobileNav'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="hidden md:block">
        <TopRightControls />
      </div>

      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Centered layout — caps at 1200px and centers on wide screens */}
      <div className="flex-1 flex w-full max-w-[1200px] mx-auto">
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <MainContent>{children}</MainContent>
      </div>

      <footer className="border-t-hairline">
        <div className="max-w-[1200px] mx-auto w-full px-[var(--space-lg)] py-[var(--space-md)] flex items-center justify-between md:px-[var(--space-xl)] md:py-[var(--space-xl)]">
          <span className="type-meta text-[var(--color-meta)]">
            neelakshi das — design engineer
          </span>
          <span className="type-meta text-[var(--color-meta)]">
            © 2026
          </span>
        </div>
      </footer>
    </div>
  )
}
