import Link from "next/link";
import dynamic from "next/dynamic";
import { navigationItems } from "./Navigation";
import { CornerRightDown, Quote } from "lucide-react";

import { Instrument_Serif } from "next/font/google";

const Rive = dynamic(() => import("../custom/Rive"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] md:h-[450px] lg:h-[500px] bg-gray-50 animate-pulse" />
  ),
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
  display: "swap",
});

interface HeroSectionProps {
  onNavigate?: (section: string) => void;
  currentSection?: string;
}

const HeroSection = ({
  onNavigate,
  currentSection = "playground",
}: HeroSectionProps) => {
  const handleNavigation = (href: string) => {
    if (onNavigate) {
      // Map href to section type
      const sectionMap: { [key: string]: string } = {
        "#playground": "playground",
        "#projects": "projects",
        "#person": "person",
        "#connect": "connect",
      };
      const section = sectionMap[href] || "playground";
      onNavigate(section);
    }
  };

  // Map section to display title
  const getSectionTitle = (section: string) => {
    const titleMap: { [key: string]: string } = {
      playground: "The Playground",
      projects: "The Projects",
      person: "The Person",
      connect: "Connect Maybe?",
    };
    return titleMap[section] || "The Playground";
  };

  return (
    <div 
      className="relative bg-white w-full max-w-7xl mx-auto h-[600px] md:h-fit rounded-[16px] flex flex-col justify-between overflow-hidden"
      data-fetchpriority="high"
    >
      {/* Top Row */}
      <div className="absolute top-0 left-0 z-20 h-full flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between items-start w-full px-4 md:px-[40px] pt-4 md:pt-[40px] pointer-events-none">
        <div className="bg-gradient-to-b from-white to-transparent h-[300px] w-full absolute top-0 left-0 -z-10" />
        <div className="bg-gradient-to-t from-white to-transparent h-[300px] w-full absolute bottom-0 left-0 -z-10" />
        {/* Top Left */}
        <div className="pointer-events-auto flex flex-col md:flex-row justify-between items-start w-full gap-8">
          <span className="text-lg font-normal text-black">
            Designer & Developer{" "}
            <span className="text-[#093FB4] underline">
              <Link href="https://cosx.ai">@cosx.ai</Link>
            </span>{" "}
            · prev.{" "}
            <span className="text-[#093FB4] underline">
              <Link href="https://vexio.in">@vexio.in</Link>
            </span>
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 w-full md:w-fit pointer-events-auto">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.href)}
              className="flex items-center text-black text-lg gap-2 font-normal hover:text-[#093FB4] transition-colors group"
            >
              <div className="group-hover:rotate-[-35deg] transition-transform duration-300 ease-in-out bg-black rounded-full p-1 text-white group-hover:bg-[#093FB4]">
                <Quote size={16} className="group-hover:text-white fill-current" />
              </div>
              {item.label}
            </button>
          ))}
        </div>
        </div>
        {/* Top Right Navigation */}
        {/* <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 w-full md:w-fit pointer-events-auto">
          {navigationItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavigation(item.href)}
              className="flex items-center text-black text-lg gap-2 font-normal hover:text-[#093FB4] transition-colors group"
              // whileHover={{ scale: .98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div className="group-hover:rotate-[-35deg] transition-transform duration-300 ease-in-out bg-black rounded-full p-1 text-white hover:text-[#093FB4] group-hover:bg-[#093FB4]">
                <RiDoubleQuotesL size={18} className="group-hover:text-white" />
              </motion.div>
              {item.label}
            </motion.button>
          ))}
        </div> */}
      </div>
      <div className="w-full overflow-hidden z-10">
        <Rive currentSection={currentSection} />
      </div>

      {/* <div className="relative w-full overflow-hidden hidden lg:block">
        <svg
          className="absolute w-0 h-0"
          viewBox="0 0 1440 428"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
              <path
                d="M1 0L0.9413 0.0492C0.8826 0.0984 0.7653 0.1967 0.6483 0.2877C0.5313 0.3787 0.4142 0.4625 0.2972 0.4825C0.1802 0.5024 0.0632 0.4586 0.0045 0.4376L-0.0542 0.4166V1H0.0045C0.0632 1 0.1802 1 0.2972 1C0.4142 1 0.5313 1 0.6483 1C0.7653 1 0.8826 1 0.9413 1H1V0Z"
                transform="scale(1.0, 0.5)"
              />
              <path
                d="M1 0L0.9413 0.0492C0.8826 0.0984 0.7653 0.1967 0.6483 0.2877C0.5313 0.3787 0.4142 0.4625 0.2972 0.4825C0.1802 0.5024 0.0632 0.4586 0.0045 0.4376L-0.0542 0.4166V1H0.0045C0.0632 1 0.1802 1 0.2972 1C0.4142 1 0.5313 1 0.6483 1C0.7653 1 0.8826 1 0.9413 1H1V0Z"
                transform="scale(-1, -0.5) translate(-1, -2)"
              />
            </clipPath>
          </defs>
        </svg>

        <div
          style={{
            clipPath: "url(#waveClip)",
            WebkitClipPath: "url(#waveClip)",
          }}
          className="w-full py-6 flex-row hidden lg:flex bg-white"
        >
          <Rive />
          <Rive />
        </div>
      </div>

      <div
        style={{
          clipPath: "url(#waveClip)",
          WebkitClipPath: "url(#waveClip)",
        }}
        className="w-full py-6 flex-row hidden md:flex lg:hidden"
      >
        <Rive />
        <Rive />
      </div>
      <div
        style={{
          clipPath: "url(#waveClip)",
          WebkitClipPath: "url(#waveClip)",
        }}
        className="w-full py-6 flex-row flex md:hidden"
      >
        <Rive />
      </div> */}
      <div className="bg-gradient-to-t from-white to-transparent h-full w-full absolute bottom-0 left-0 z-0" />
      <div className="absolute bottom-0 left-0 z-20 flex flex-row justify-between items-end w-full px-4 md:px-[40px] pb-4 md:pb-[40px]">
        <div className="pointer-events-auto">
          <div className="text-xl font-normal text-black mb-2">
            Hellooo, I&apos;m Neelakshi Das
          </div>
          <div
            className={`text-[48px] md:text-[56px] font-normal text-[#093FB4] leading-none ${instrumentSerif.className}`}
          >
            Design Engineer
          </div>
        </div>

        <div className="mb-2 pointer-events-auto">
          <div className="text-[#093FB4] text-lg font-normal items-center gap-2 transition-colors hidden md:flex ">
            {getSectionTitle(currentSection)}
            <div>
              <CornerRightDown className="w-5 h-5 mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
