'use client'

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { navigationItems } from "./Navigation";
import { CornerRightDown, Quote } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
  currentSection?: string;
}

const HeroSection = ({
  currentSection = "playground",
}: HeroSectionProps) => {
  const router = useRouter();
  const { theme } = useTheme();
  const isBlue = theme === 'blue';

  const handleNavigation = (href: string) => {
    router.push(href);
  };

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
      className={`relative w-full max-w-7xl mx-auto h-[600px] md:h-fit rounded-[16px] flex flex-col justify-between overflow-hidden transition-colors duration-500 ${isBlue ? 'bg-[#093FB4]' : 'bg-white'}`}
      data-fetchpriority="high"
    >
      {/* Top Row */}
      <div className="absolute top-0 left-0 z-20 h-full flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between items-start w-full px-4 md:px-[40px] pt-4 md:pt-[40px] pointer-events-none">
        <div
          className={`h-[300px] w-full absolute top-0 left-0 -z-10 transition-colors duration-500 ${isBlue ? 'bg-gradient-to-b from-[#093FB4] to-transparent' : 'bg-gradient-to-b from-white to-transparent'}`}
        />
        <div
          className={`h-[300px] w-full absolute bottom-0 left-0 -z-10 transition-colors duration-500 ${isBlue ? 'bg-gradient-to-t from-[#093FB4] to-transparent' : 'bg-gradient-to-t from-white to-transparent'}`}
        />
        {/* Top Left */}
        <div className="pointer-events-auto flex flex-col md:flex-row justify-between items-start w-full gap-8">
          <span className={`text-lg font-normal transition-colors duration-500 ${isBlue ? 'text-white' : 'text-black'}`}>
          currently building at {" "}
            <span className={`underline transition-colors duration-500 ${isBlue ? 'text-white/70 hover:text-white' : 'text-[#093FB4]'}`}>
              <Link href="https://cosx.ai">@cosx.ai</Link>
            </span>{" "}
            <span className={`transition-colors duration-500 ${isBlue ? 'text-white' : 'text-black'}`}>
            ~ design x code
            </span>
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 w-full md:w-fit pointer-events-auto">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.href)}
              className={`flex items-center text-lg gap-2 font-normal transition-colors group ${isBlue ? 'text-white hover:text-white/70' : 'text-black hover:text-[#093FB4]'}`}
            >
              <div className={`group-hover:rotate-[-35deg] transition-all duration-300 ease-in-out rounded-full p-1 ${isBlue ? 'bg-white text-[#093FB4] group-hover:bg-white/70' : 'bg-black text-white group-hover:bg-[#093FB4]'}`}>
                <Quote size={16} className="fill-current" />
              </div>
              {item.label}
            </button>
          ))}
        </div>
        </div>
      </div>
     
        <div className="w-full overflow-hidden z-10">
          <Rive currentSection={currentSection} />
        </div>
    

      <div className={`h-full w-full absolute bottom-0 left-0 z-0 transition-colors duration-500 ${isBlue ? 'bg-gradient-to-t from-[#093FB4] to-transparent' : 'bg-gradient-to-t from-white to-transparent'}`} />
      <div className="absolute bottom-0 left-0 z-20 flex flex-row justify-between items-end w-full px-4 md:px-[40px] pb-4 md:pb-[40px]">
        <div className="pointer-events-auto">
          <div className={`text-xl font-normal mb-2 transition-colors duration-500 ${isBlue ? 'text-white' : 'text-black'}`}>
            Hellooo, I&apos;m Neelakshi Das
          </div>
          <div
            className={`text-[48px] md:text-[56px] font-normal tracking-normal leading-none transition-colors duration-500 ${instrumentSerif.className} ${isBlue ? 'text-white' : 'text-[#093FB4]'}`}
          >
            Designer & Engineer
          </div>
        </div>

        <div className="mb-2 pointer-events-auto">
          <div className={`text-lg font-normal items-center gap-2 transition-colors hidden md:flex ${isBlue ? 'text-white' : 'text-[#093FB4]'}`}>
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
