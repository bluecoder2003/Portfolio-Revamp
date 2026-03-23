import PageLayout from "@/components/sections/PageLayout";
import ProjectSection from "@/components/sections/ProjectSection";

export default function ProjectsPage() {
  return (
    <PageLayout currentSection="projects">
      <ProjectSection />
    </PageLayout>
  );
}
