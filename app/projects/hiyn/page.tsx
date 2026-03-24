import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
// import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import AnimatedSection from "@/components/ui/animated-section";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Hiyn - UI/UX Design Platform",
  description: "A digital platform for UI/UX designers that merges learning, collaboration, and recruitment—helping learners grow and showcase their skills while enabling companies to discover top design talent.",
  keywords: "UI/UX design, design platform, design learning, design collaboration, design recruitment, portfolio",
  alternates: {
    canonical: "/hiyn",
  },
  openGraph: {
    title: "Hiyn - UI/UX Design Platform",
    description: "A digital platform for UI/UX designers that merges learning, collaboration, and recruitment—helping learners grow and showcase their skills while enabling companies to discover top design talent.",
    type: "website",
    images: [
      {
        url: "/hiyn-proj.webp",
        width: 1200,
        height: 630,
        alt: "Hiyn UI/UX Design Platform",
      },
    ],
  },
};

// const instrumentSerif = Instrument_Serif({
//   subsets: ["latin"],
//   weight: ["400"],
//   variable: "--font-instrument-serif",
//   style: "italic",
// });

const Page = () => {
  return (
    <div className="h-fit flex items-center justify-center flex-col p-4 lg:p-[80px] gap-[10px] bg-[#E6E6E6]">
      <AnimatedSection delay={0.1}>
        <div className="bg-white w-full max-w-7xl mx-auto h-fit p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between">
          {/* Top Row: Back Button */}
          <div className="flex flex-row items-start justify-between w-full mb-4">
            <Link
              href="/projects"
              className="flex items-center gap-2 text-xs md:text-base bg-gray-100 px-3 py-2 rounded-md text-gray-600 hover:text-black transition-colors duration-200"
            >
              <ArrowLeft className="md:w-4 md:h-4 w-3 h-3" />
              <span>back to projects</span>
            </Link>
            <div className="flex-1" />
          </div>
          {/* Main Content */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Heading and Subtitle */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-3">
            <div className="flex flex-col gap-3 max-w-3xl">
              <span
                className="text-3xl md:text-5xl lg:text-5xl font-normal text-black leading-tight"
              >
                <span className="text-[#AD1F04]">Hiyn:</span> a dynamic creative hierarchy for designers
              </span>
              <span className="text-base md:text-lg font-normal text-black w-full">
                Hiyn is a digital platform that helps designers rise through a dynamic creative hierarchy, showcasing their skills and gaining recognition.
              </span>
            </div>
            
            </div>
            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-3 lg:mt-6">
              {/* Project Overview */}
              <div className="border border-dashed border-zinc-300 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className="text-lg lg:text-xl font-medium text-gray-700 mb-4">
                  Project Overview
                </div>
                <div className="text-base font-normal text-black">
                A digital platform for UI/UX designers that merges learning, collaboration, and recruitment—helping learners grow and showcase their skills while enabling companies to discover top design talent.
                </div>
              </div>
        
              {/* Proposed Solution */}
              <div className="border border-dashed border-zinc-300 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className="text-lg lg:text-xl font-medium text-gray-700 mb-4">
                  Proposed Solution
                </div>
                <ul className="flex flex-col gap-2 text-base font-normal text-black list-disc list-inside">
                  <li>Created a unified platform for designers to learn through curated modules</li>
                  <li>Enabled hands-on learning with real-world projects</li>
                  <li>Provided public portfolios to showcase work and track growth</li>
                  <li>Helped recruiters discover top design talent</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="w-full max-w-7xl mx-auto h-fit flex flex-col justify-between gap-[10px]">
        <Image
              src="/h1.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-3xl"
            />
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-[10px] overflow-hidden rounded-3xl">
            <Image
              src="/h2.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full lg:w-1/2 h-full lg:h-[670px] object-cover rounded-3xl"
            />
            <Image
              src="/h3.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full lg:w-1/2 h-full lg:h-[670px] object-cover rounded-3xl"
            />
          </div>
          <Image
              src="/h4.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-3xl"
            />
          <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full gap-[10px]">
            <Image
              src="/h5.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full lg:w-1/2 h-full lg:h-[670px] object-cover rounded-3xl"
            />
            <Image
              src="/h6.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full lg:w-1/2 h-full lg:h-[670px] object-cover rounded-3xl"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Next Project Section */}
      <AnimatedSection delay={0.3}>
        <div className="bg-white max-w-7xl mx-auto w-full p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between h-[300px] md:h-[462px]">
          {/* Previous and Next Projects */}
          <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12">
            {/* Previous Project */}
            <Link href="/projects/safeve" className="group flex flex-col gap-4">
              <div className="flex whitespace-nowrap items-center gap-2 bg-gray-100 px-4 py-2 rounded-md w-fit text-xs md:text-base text-gray-600 group-hover:text-black transition-colors">
                <ArrowLeft className="md:w-4 md:h-4 w-3 h-3" />
                <span>Previous Project</span>
              </div>
            </Link>

            {/* Next Project */}
            <Link href="/projects/flint" className="group flex flex-col gap-4 items-end">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md w-fit text-xs md:text-base text-gray-600 group-hover:text-black transition-colors justify-end">
                <span>Next Project</span>
                <ArrowRight className="md:w-4 md:h-4 w-3 h-3" />
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 flex flex-row justify-between items-center md:text-base text-xs text-black">
            <span>© 2026 All Rights Reserved</span>
            <span className="flex items-center gap-2">
              Made with{" "}
              <span className="text-black text-xl">
                <Heart className="w-5 h-5 fill-current" />
              </span>
            </span>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Page;
