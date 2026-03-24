'use client'

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { navigationItems } from "./Navigation";
import { GeistPixelSquare } from "geist/font/pixel";
import SocialLinks from "@/components/custom/SocialLinks";

const geistPixelSquare = GeistPixelSquare;
const navigationIcons: Record<string, string> = {
  "The Playground": "/playground.svg",
  "The Projects": "/projects.svg",
  "The Person": "/user.svg",
};

interface HeroSectionProps {
  currentSection?: string;
}

const HeroSection = ({
  currentSection = "playground",
}: HeroSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();

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
       
        {/* Top Left */}
        <div className="pointer-events-auto flex flex-col md:flex-row justify-between items-start w-full gap-8">
          <span className="text-lg font-normal text-black flex gap-2">
          currently at {" "}
            <span className="text-[#093FB4] cursor-pointer inline-flex items-center gap-2 dotted-underline leading-tight">
              <Link href="https://cosx.ai"> @cosx.ai</Link>
            </span>
          </span>
          <div className="grid grid-cols-1 gap-2 md:gap-4 w-full md:w-fit pointer-events-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className={`flex items-center text-lg gap-2 leading-1.5 font-normal transition-colors group ${geistPixelSquare.className} ${
                  isActive
                    ? 'text-[#093FB4]'
                    : 'text-black hover:text-[#093FB4]'
                }`}
              >
                <div className={`rounded-full p-1 border border-dashed transition-all duration-300 ease-in-out ${
                  isActive
                    ? 'bg-[#093FB4] border-[#093FB4] group-hover:rotate-[-12deg]'
                    : 'border-transparent group-hover:rotate-[-12deg] group-hover:border-[#093FB4]'
                }`}>
                  <div
                    className={`h-5 w-5 transition-colors duration-300 ease-in-out ${
                      isActive ? 'bg-white' : 'bg-black group-hover:bg-[#093FB4]'
                    }`}
                    style={{
                      maskImage: `url(${navigationIcons[item.label]})`,
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      maskSize: "contain",
                      WebkitMaskImage: `url(${navigationIcons[item.label]})`,
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      WebkitMaskSize: "contain",
                    }}
                    aria-hidden="true"
                  />
                </div>
                {item.label}
              </button>
            );
          })}
        </div>
        </div>
      </div>

      <div className="h-full w-full " />
      <div className="flex flex-col lg:flex-row justify-between items-end w-full px-4 md:px-[40px] pb-4 md:pb-[40px] gap-4 md:gap-0">
        <div className="pointer-events-auto flex w-full flex-col gap-2 md:gap-3">
          <div className="text-xl font-normal text-black">
            Hey, I&apos;m Neelakshi
          </div>
          <div
            className={`text-4xl md:text-[56px] font-normal text-[#093FB4] tracking-tighter leading-none ${geistPixelSquare.className}`}
          >
            Designer & Engineer
          </div>

          {/* Mobile social links - below title */}
          <div className="pointer-events-auto lg:hidden mt-6 md:mt-4">
            <SocialLinks />
          </div>
        </div>

        {/* Desktop social links - bottom right */}
        <div className="pointer-events-auto hidden lg:block">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
