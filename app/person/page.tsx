import PageLayout from "@/components/sections/PageLayout";
import PersonSection from "@/components/sections/PersonSections";

export default function PersonPage() {
  return (
    <PageLayout currentSection="person">
      <PersonSection />
    </PageLayout>
  );
}
