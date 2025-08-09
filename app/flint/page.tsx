"use client";
import React from "react";
import Link from "next/link";
import { RiHeartFill } from "react-icons/ri";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedSection from "@/components/ui/animated-section";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
});

const Page = () => {
  const router = useRouter();

  const handleNextProjectClick = () => {
    router.push("/safeve");
  };

  return (
    <div className="h-fit flex items-center justify-center flex-col p-4 lg:p-[80px] gap-[10px] bg-[#E6E6E6]">
      <AnimatedSection delay={0.1}>
        <div className="bg-white w-full max-w-7xl mx-auto h-fit p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between">
          {/* Top Row: Back Button */}
          <div className="flex flex-row items-start justify-between w-full">
            <Link
              href="/"
              className="bg-black rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center mb-4"
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
                Flint
              </span>
              <span className="text-lg lg:text-xl font-normal text-gray-700 w-full">
              Makes task management easy and fun
              </span>
            </div>
            <Link
              href="https://www.flint.social/"
              className="items-center gap-2 sm:gap-3 lg:gap-4 bg-black text-white text-base font-normal px-4 py-2 rounded-md shadow-md flex whitespace-nowrap"
            >
              Visit Site
              <div className="flex flex-row items-center gap-1 sm:gap-2 bg-[#4253D5] rounded-full p-0.5 sm:p-1">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>
            </div>
            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 mt-3 lg:mt-6">
              {/* Project Overview */}
              <div className="border border-dashed border-zinc-300 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className="text-lg lg:text-xl font-normal text-gray-700 mb-4">
                Problem Statement
                </div>
                <div className="text-base font-normal text-black">
                Many teams struggle with complex task management tools that are hard to set up, difficult to onboard new members, and unintuitive to use daily.
                </div>
              </div>
        
              {/* Proposed Solution */}
              <div className="border border-dashed border-zinc-300 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className="text-lg lg:text-xl font-normal text-gray-700 mb-4">
                  Proposed Solution
                </div>
                <div className="text-base font-normal text-black">
                Flint simplifies task management with an easy-to-use interface, quick team creation, seamless member invites, and an intuitive Kanban board for efficient collaboration.
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="w-full max-w-7xl mx-auto h-fit flex flex-col justify-between gap-[10px]">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-[10px]">
            <Image
              src="/f1.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-3xl"
            />
            <Image
              // src="https://neelakshi.s3.us-east-1.amazonaws.com/portfolio/f2.svg"
              src="/f2.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full h-full lg:w-[464px] lg:h-[669px] object-cover rounded-3xl"
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full gap-[10px]">
            <Image
              // src="https://neelakshi.s3.us-east-1.amazonaws.com/portfolio/f3.svg"
              src="/f3.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full h-full lg:h-[500px] object-cover rounded-3xl"
            />
           <video
              src="/card.webm"
              width={1000}
              height={1000}
              autoPlay
              loop
              muted
              playsInline
              className="lg:w-[750px] lg:h-[500px] w-full h-full object-contain rounded-3xl"
            />
          </div>
          <Image
              // src="https://neelakshi.s3.us-east-1.amazonaws.com/portfolio/f4.svg"
              src="/f4.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-3xl"
            />
          <video
              src="/kanban.webm"
              width={1000}
              height={1000}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain rounded-3xl"
            />
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
              <div 
                className="bg-black rounded-full w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors duration-300"
                onClick={handleNextProjectClick}
              >
                <ArrowUpRight className="text-white w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10" />
              </div>
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
