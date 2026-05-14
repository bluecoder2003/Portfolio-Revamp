'use client'

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationItems } from "./Navigation";
import { GeistPixelSquare } from "geist/font/pixel";
import SocialLinks from "@/components/custom/SocialLinks";

const E_THOUGHT_LINK =
  "https://x.com/bluecoder2003/status/2043025344299667617?s=20";

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
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    let cycleTimer: ReturnType<typeof setTimeout> | undefined;

    const cycle = (shouldShow: boolean) => {
      setShowBubble(shouldShow);
      cycleTimer = setTimeout(
        () => cycle(!shouldShow),
        shouldShow ? 4500 : 9000
      );
    };

    const initial = setTimeout(() => cycle(true), 1500);

    return () => {
      clearTimeout(initial);
      if (cycleTimer) clearTimeout(cycleTimer);
    };
  }, []);

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const handleEClick = () => {
    window.open(E_THOUGHT_LINK, "_blank", "noopener,noreferrer");
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
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 w-full md:w-fit pointer-events-auto justify-end">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className={`flex items-center justify-start xl:justify-end w-fit text-lg md:text-base gap-2 lg:gap-1 leading-1.5 font-normal transition-colors group ${geistPixelSquare.className} ${
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
                    className={`h-5 w-5 md:h-4 md:w-4 transition-colors duration-300 ease-in-out ${
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
            Designer &{" "}
            <span className="whitespace-nowrap">
              <span className="relative inline-block">
                <span
                  role="link"
                  tabIndex={0}
                  aria-label="Doesn't this letter feel a little different from the rest? Open the story on X"
                  onClick={handleEClick}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleEClick();
                    }
                  }}
                  className={`designer-engineer-e${
                    showBubble ? " designer-engineer-e--active" : ""
                  }`}
                >
                  E
                  <span
                    className="designer-engineer-e__fill"
                    aria-hidden="true"
                  >
                    E
                  </span>
                </span>
                <span
                  className={`thought-bubble${
                    showBubble ? " thought-bubble--visible" : ""
                  }`}
                  role="note"
                  aria-hidden={!showBubble}
                >
                  <span className="thought-bubble-text">
                    Doesn&apos;t this letter feel
                    <br />
                    a little different from the rest?
                  </span>
                </span>
              </span>
              ngineer
            </span>
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
