import HeroSection from "@/components/sections/HeroSection";
import ProjectSection from "@/components/sections/ProjectSection";
import FooterSection from "@/components/sections/FooterSection";
import ConnectSection from "@/components/sections/ConnectSection";
import PersonSection from "@/components/sections/PersonSections";
import AnimatedSection from "@/components/ui/animated-section";

export default function Home() {
  return (
    <div className="h-fit flex items-center justify-center flex-col p-[80px] gap-[10px] bg-[#E6E6E6]">
      <AnimatedSection delay={0.1}>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ProjectSection />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <PersonSection />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <ConnectSection />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
}
