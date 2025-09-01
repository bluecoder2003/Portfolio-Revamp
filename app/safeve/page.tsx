import React from "react";
import Link from "next/link";
import { RiHeartFill } from "react-icons/ri";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import AnimatedSection from "@/components/ui/animated-section";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
});

const Page = () => {
  return (
    <div className="h-fit flex items-center justify-center flex-col p-4 lg:p-[80px] gap-[10px] bg-[#E6E6E6]">
      <AnimatedSection delay={0.1}>
        <div className="bg-white w-full max-w-7xl mx-auto h-fit p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between">
          {/* Top Row: Back Button */}
          <div className="flex flex-row items-start justify-between w-full">
            <Link
              href="/"
              className="bg-black rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center mb-4 hover:scale-105 transition-transform"
            >
              <ArrowLeft className="text-white w-8 h-8" />
            </Link>
            <div className="flex-1" />
          </div>
          {/* Main Content */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Heading and Subtitle */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-3">
            <div className="flex flex-col gap-2">
              <span
                className={`text-4xl md:text-5xl lg:text-[56px] font-normal text-black leading-none ${instrumentSerif.className}`}
              >
                Safeve
              </span>
              <span className="text-lg lg:text-xl font-normal text-gray-700 w-full">
                Enhancing women&apos;s safety through anonymous reporting mechanisms
              </span>
            </div>
            <Link
              href="https://www.behance.net/gallery/223013105/Safeve"
              className="items-center gap-2 sm:gap-3 lg:gap-4 bg-black text-white text-base font-normal px-4 py-2 rounded-md shadow-md flex whitespace-nowrap"
            >
              Know More
              <div className="flex flex-row items-center gap-1 sm:gap-2 bg-[#DD3418] rounded-full p-0.5 sm:p-1">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>
            </div>
            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-3 lg:mt-6">
              {/* Project Overview */}
              <div className="border border-dashed border-zinc-300 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className="text-lg lg:text-xl font-normal text-gray-700 mb-4">
                  Project Overview
                </div>
                <div className="text-base font-normal text-black">
                  Despite laws like the POSH Act, women&apos;s safety remains a
                  serious concern. Fear of backlash and stigma often silence
                  victims of workplace and institutional harassment—especially
                  in tech. A safe, anonymous way to report incidents is urgently
                  needed.
                </div>
              </div>
              {/* Problem Statement */}
              <div className="border border-dashed border-zinc-300 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className="text-lg lg:text-xl font-normal text-gray-700 mb-4">
                  Problem Statement
                </div>
                <div className="text-base font-normal text-black">
                  User Problem: Fear and stigma stop women from reporting
                  harassment.
                </div>
                <div className="text-base font-normal text-black mt-2">
                  Institutional Problem: Without reports, organisations miss
                  patterns and risk a toxic culture.
                </div>
              </div>
              {/* Proposed Solution */}
              <div className="border border-dashed border-zinc-300 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className="text-lg lg:text-xl font-normal text-gray-700 mb-4">
                  Proposed Solution
                </div>
                <div className="text-base font-normal text-black">
                  A secure, anonymous reporting system that empowers victims,
                  helps organizations spot patterns, and fosters a culture of
                  trust and accountability.
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="w-full max-w-7xl mx-auto h-fit flex flex-col justify-between gap-[10px]">
          <Image
            src="/s1.webp"
            alt="Safeve"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
          <Image
            src="/s2.webp"
            alt="Safeve"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-[10px]">
            <Image
              src="/s3.webp"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
            <Image
              src="/s4.webp"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-[10px]">
            <Image
              src="/s5.webp"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
            <Image
              src="/s6.webp"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Next Project Section */}
      <AnimatedSection delay={0.3}>
        <div className="bg-white max-w-7xl mx-auto w-full h-[300px] md:h-[462px] p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center lg:items-start w-full">
            <span className="text-3xl md:text-4xl lg:text-[64px] font-normal text-black">
              Next Project
            </span>
            <div className="flex items-center justify-center">
              <Link 
                href="/hiyn"
                className="bg-black rounded-full w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors duration-300"
              >
                <ArrowUpRight className="text-white w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10" />
              </Link>
            </div>
          </div>
          <div className="flex-1" />
          <div className="mt-12 border-t pt-4 flex flex-row justify-between items-center text-base text-black">
            <span>© 2025 All Rights Reserved</span>
            <span className="flex items-center gap-2">
              Made with{" "}
              <span className="text-black text-xl">
                <RiHeartFill />
              </span>
            </span>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Page;
