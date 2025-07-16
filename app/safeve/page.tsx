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

const page = () => {
  return (
    <div className="h-fit flex items-center justify-center flex-col p-4 lg:p-[80px] gap-[10px] bg-[#E6E6E6]">
      <AnimatedSection delay={0.1}>
        <div className="bg-[#F5F5F5] w-full max-w-7xl mx-auto h-fit p-[40px] rounded-[16px] flex flex-col justify-between">
          {/* Top Row: Back Button */}
          <div className="flex flex-row items-start justify-between w-full">
            <Link
              href="/"
              className="bg-black rounded-full w-14 h-14 flex items-center justify-center mb-4 hover:scale-105 transition-transform"
            >
              <ArrowLeft className="text-white w-8 h-8" />
            </Link>
            <div className="flex-1" />
            {/* Know More Button */}
            <Link
              href="#"
              className="flex items-center gap-4 bg-black text-white text-xl font-normal px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-md"
              style={{ marginTop: 8 }}
            >
              Know More
              <div className="flex flex-row items-center gap-2 bg-[#DD3418] rounded-full p-1">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </Link>
          </div>
          {/* Main Content */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Heading and Subtitle */}
            <div className="flex flex-col gap-2">
              <span
                className={`text-[56px] font-normal text-black leading-none ${instrumentSerif.className}`}
              >
                Safeve
              </span>
              <span className="text-2xl font-normal text-black">
                Enhancing women&apos;s safety through anonymous reporting mechanisms
              </span>
            </div>
            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Project Overview */}
              <div className="border border-dashed border-zinc-300 rounded-2xl p-6 h-full flex flex-col">
                <div className="text-2xl font-normal text-black mb-4">
                  Project Overview
                </div>
                <div className="text-lg font-normal text-black">
                  Despite laws like the POSH Act, women&apos;s safety remains a
                  serious concern. Fear of backlash and stigma often silence
                  victims of workplace and institutional harassment—especially
                  in tech. A safe, anonymous way to report incidents is urgently
                  needed.
                </div>
              </div>
              {/* Problem Statement */}
              <div className="border border-dashed border-zinc-300 rounded-2xl p-6 h-full flex flex-col">
                <div className="text-2xl font-normal text-black mb-4">
                  Problem Statement
                </div>
                <div className="text-lg font-normal text-black">
                  User Problem: Fear and stigma stop women from reporting
                  harassment.
                </div>
                <div className="text-lg font-normal text-black mt-2">
                  Institutional Problem: Without reports, organisations miss
                  patterns and risk a toxic culture.
                </div>
              </div>
              {/* Proposed Solution */}
              <div className="border border-dashed border-zinc-300 rounded-2xl p-6 h-full flex flex-col">
                <div className="text-2xl font-normal text-black mb-4">
                  Proposed Solution
                </div>
                <div className="text-lg font-normal text-black">
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
            src="/s1.svg"
            alt="Safeve"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
          <Image
            src="/s2.svg"
            alt="Safeve"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
          <div className="flex flex-row justify-between items-center w-full gap-[10px]">
            <Image
              src="/s3.svg"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
            <Image
              src="/s4.svg"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full gap-[10px]">
            <Image
              src="/s5.svg"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
            <Image
              src="/s6.svg"
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
        <div className="w-full max-w-7xl mx-auto h-[462px] bg-[#F5F5F5] rounded-[16px] flex flex-col justify-between p-[40px]">
          <div className="flex flex-row justify-between items-start w-full">
            <span className="text-[64px] font-normal text-black">
              Next Project
            </span>
            <div className="flex items-center justify-center">
              <div className="bg-black rounded-full w-20 h-20 flex items-center justify-center">
                <ArrowUpRight className="text-white w-10 h-10" />
              </div>
            </div>
          </div>
          <div className="flex-1" />
          <div className="w-full border-t border-zinc-300 mt-8 mb-2" />
          <div className="flex flex-row justify-between items-center w-full text-lg mt-2">
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

export default page;
