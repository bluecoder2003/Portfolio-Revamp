'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { navigationItems } from "./Navigation";
import { CornerRightDown, Quote } from "lucide-react";

import { Instrument_Serif } from "next/font/google";

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

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const getSectionTitle = (section: string) => {
    const titleMap: { [key: string]: string } = {
      playground: "The Playground",
      projects: "The Projects",
      person: "The Person",
    };
    return titleMap[section] || "The Playground";
  };

  return (
    <div
      className="relative bg-white w-full max-w-7xl mx-auto h-[600px] md:h-[500px] rounded-[16px] flex flex-col justify-between overflow-hidden"
      data-fetchpriority="high"
    >
      {/* Top Row */}
      <div className="h-full flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between items-start w-full px-4 md:px-[40px] pt-4 md:pt-[40px] pointer-events-none">
        <div className="bg-gradient-to-b from-white to-transparent h-[300px] w-full absolute top-0 left-0 -z-10" />
        <div className="bg-gradient-to-t from-white to-transparent h-[300px] w-full absolute bottom-0 left-0 -z-10" />
        {/* Top Left */}
        <div className="pointer-events-auto flex flex-col md:flex-row justify-between items-start w-full gap-8">
          <span className="text-lg font-normal text-black">
          currently building at {" "}
            <span className="text-[#093FB4] underline">
              <Link href="https://cosx.ai">@cosx.ai</Link>
            </span>{" "}
            <span className="text-black">
            ~ design x code
            </span>
          </span>
          <div className="grid grid-cols-1 gap-2 md:gap-4 w-full md:w-fit pointer-events-auto">
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
      </div>

      <div className="bg-gradient-to-t from-white to-transparent h-full w-full " />
      <div className="flex flex-row justify-between items-end w-full px-4 md:px-[40px] pb-4 md:pb-[40px]">
        <div className="pointer-events-auto">
          <div className="text-xl font-normal text-black mb-2">
            Hellooo, I&apos;m Neelakshi Das
          </div>
          <div
            className={`text-[48px] md:text-[56px] font-normal text-[#093FB4] tracking-normal leading-none ${instrumentSerif.className}`}
          >
            Designer & Engineer
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
