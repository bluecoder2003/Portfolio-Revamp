import HeroSection from "@/components/sections/HeroSection";
import ProjectSection from "@/components/sections/ProjectSection";
import FooterSection from "@/components/sections/FooterSection";
import ConnectSection from "@/components/sections/ConnectSection";
import PersonSection from "@/components/sections/PersonSections";

export default function Home() {
  return (
    <div className="h-fit flex items-center justify-center flex-col p-[80px] gap-[10px] bg-[#E6E6E6]">
      <HeroSection />
      <ProjectSection />
      <PersonSection />
      <ConnectSection />
      <FooterSection />
    </div>
  );
}
