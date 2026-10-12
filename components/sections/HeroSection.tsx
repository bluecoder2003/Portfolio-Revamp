'use client'

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationItems } from "./Navigation";
import { GeistPixelSquare } from "geist/font/pixel";
import SocialLinks from "@/components/custom/SocialLinks";

const geistPixelSquare = GeistPixelSquare;

const E_THOUGHT_LINK =
  "https://x.com/bluecoder2003/status/2043025344299667617?s=20";

const FloatingWindow = ({
  title,
  videoSrc,
  className,
  rotation,
}: {
  title: string;
  videoSrc: string;
  className?: string;
  rotation: number;
}) => (
  <div
    aria-hidden="true"
    className={`absolute hidden xl:flex flex-col rounded-[10px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-[#E2E2E2] bg-white ${className ?? ""}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <div className="flex items-center gap-[6px] px-3 py-[6px] bg-[#F0EFEF] border-b border-[#E2E2E2] flex-shrink-0">
      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] flex-shrink-0" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] flex-shrink-0" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28C840] flex-shrink-0" />
      <span className="ml-1.5 text-[10px] text-[#999] font-normal truncate">{title}</span>
    </div>
    <div className="flex-1 overflow-hidden">
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

interface HeroSectionProps {
  currentSection?: string;
}

const HeroSection = ({ currentSection = "playground" }: HeroSectionProps) => {
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

  const handleEClick = () => {
    window.open(E_THOUGHT_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-7xl mx-auto" data-fetchpriority="high">
      {/* ── Top nav ── */}
      <nav className="flex items-center justify-between px-4 lg:px-[40px] py-5 w-full">
        <span className="text-sm font-normal text-[#0D0D0D] tracking-wide select-none">
          neelakshi
        </span>

        <div className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className={`text-sm font-normal transition-colors ${
                  isActive
                    ? "text-[#093FB4]"
                    : "text-[#666] hover:text-[#0D0D0D]"
                }`}
              >
                {item.label.toLowerCase().replace("the ", "")}
              </button>
            );
          })}
        </div>

        <SocialLinks />
      </nav>

      {/* ── Scattered hero body ── */}
      <div
        className="relative px-4 lg:px-[40px] flex items-center justify-center overflow-hidden"
        style={{ minHeight: "clamp(440px, 70vh, 640px)" }}
      >
        {/* Kaomoji accents — desktop only */}
        <span className="absolute top-8 left-[7%] text-[#C8C8C8] text-sm font-mono select-none pointer-events-none hidden xl:block">
          {`(^ ω ^)`}
        </span>
        <span className="absolute top-10 right-[7%] text-[#C8C8C8] text-sm font-mono select-none pointer-events-none hidden xl:block">
          {`{^.^}`}
        </span>
        <span className="absolute bottom-14 left-[13%] text-[#C8C8C8] text-xs font-mono select-none pointer-events-none hidden xl:block">
          {`(~ . ~)`}
        </span>
        <span className="absolute bottom-10 right-[11%] text-[#C8C8C8] text-xs font-mono select-none pointer-events-none hidden xl:block">
          {`¯\\_(ツ)_/¯`}
        </span>

        {/* Floating macOS windows — xl only */}
        <FloatingWindow
          title="vectordrop"
          videoSrc="/vectordrop-hero.webm"
          className="top-4 left-0 w-[210px] h-[144px]"
          rotation={-3.5}
        />
        <FloatingWindow
          title="lynart"
          videoSrc="/flower-lovable.webm"
          className="bottom-4 right-0 w-[210px] h-[144px]"
          rotation={3}
        />
        <FloatingWindow
          title="credit card"
          videoSrc="/credit-card.webm"
          className="top-10 right-[7%] w-[168px] h-[114px]"
          rotation={-1.5}
        />

        {/* ── Center content ── */}
        <div className="text-center z-10 relative max-w-lg">
          <p className="text-base text-[#999] mb-6">hey, i&apos;m neelakshi —</p>

          <div
            className={`text-[48px] md:text-[64px] font-normal text-[#093FB4] tracking-tighter leading-none ${geistPixelSquare.className}`}
          >
            Designer &amp;{" "}
            <span className="whitespace-nowrap">
              <span className="relative inline-block">
                <span
                  role="link"
                  tabIndex={0}
                  aria-label="Notice anything different about this letter? Open the story on X"
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
                    Notice anything different
                    <br />
                    about this letter?
                  </span>
                </span>
              </span>
              ngineer
            </span>
          </div>

          <p className="text-base text-[#999] mt-5">
            fluent in ai, design and the web
          </p>

          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-[#BBBBBB]">
            <span>currently at</span>
            <Link
              href="https://oleria.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#093FB4] hover:underline"
            >
              @oleria
            </Link>
            <span>·</span>
            <span>prev</span>
            <Link
              href="https://cosx.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#BBBBBB] hover:text-[#093FB4] transition-colors"
            >
              @cosx.ai
            </Link>
          </div>

          {/* Mobile nav */}
          <div className="flex items-center justify-center gap-5 mt-8 md:hidden">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className={`text-sm font-normal ${
                    isActive ? "text-[#093FB4]" : "text-[#666]"
                  }`}
                >
                  {item.label.toLowerCase().replace("the ", "")}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
