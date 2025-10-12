import ServerNavigationProvider from "@/components/sections/ServerNavigationProvider";

// Force static generation
export const dynamic = 'force-static'
export const revalidate = false

export default function Home() {
  return <ServerNavigationProvider />;
}
