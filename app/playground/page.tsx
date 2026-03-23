import PageLayout from "@/components/sections/PageLayout";
import PlaygroundSection from "@/components/sections/PlaygroundSection";

export default function PlaygroundPage() {
  return (
    <PageLayout currentSection="playground">
      <PlaygroundSection />
    </PageLayout>
  );
}
