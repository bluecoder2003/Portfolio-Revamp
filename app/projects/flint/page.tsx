import React from "react";
import Link from "next/link";
import { Heart, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
// import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import AnimatedSection from "@/components/ui/animated-section";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Flint - Task Management Made Easy",
  description: "Flint simplifies task management with an easy-to-use interface, quick team creation, seamless member invites, and an intuitive Kanban board for efficient collaboration.",
  keywords: "task management, project management, team collaboration, kanban board, productivity",
  alternates: {
    canonical: "/flint",
  },
  openGraph: {
    title: "Flint - Task Management Made Easy",
    description: "Flint simplifies task management with an easy-to-use interface, quick team creation, seamless member invites, and an intuitive Kanban board for efficient collaboration.",
    type: "website",
    images: [
      {
        url: "/flint-proj.webp",
        width: 1200,
        height: 630,
        alt: "Flint Task Management Platform",
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
              href="/"
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
                <span className="text-[#4253D5]">Flint:</span> simplifying team task management
              </span>
              <span className="text-base md:text-lg font-normal text-black w-full">
              Flint is a collaborative task management platform designed to help teams plan, organize, and deliver work efficiently without the friction of complex setup or overwhelming interfaces.
              </span>
            </div>
            
            </div>
            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4">
              {/* Project Overview */}
              <div className="bg-white border border-dashed border-zinc-300 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className="text-lg lg:text-xl font-medium text-gray-700 mb-4">
                  Project Overview
                </div>
                <div className="flex flex-col gap-2 text-base font-normal text-black">
                  <div className="flex items-center gap-1">Website: <Link href="https://www.flint.social/" className="text-black hover:text-[#4253D5] transition-colors duration-200 flex items-center gap-1">Site <ArrowUpRight className="w-4 h-4" /></Link></div>
                  <div>Problem: Many existing task management tools are overly complex, making onboarding slow and daily workflows difficult. This often leads to poor adoption, reduced team efficiency, and fragmented collaboration.
                  </div>
                </div>
              </div>
              {/* What I worked on */}
              <div className="bg-white border border-dashed border-zinc-300 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className="text-lg lg:text-xl font-medium text-gray-700 mb-4">
                Proposed Solution
                </div>
                <ul className="flex flex-col gap-2 text-base font-normal text-black list-disc list-inside">
                  <li>Designed a clean, intuitive interface to simplify task management</li>
                  <li>Streamlined onboarding with quick workspace setup and team invites</li>
                  <li>Built a clear Kanban system to improve visibility and collaboration</li>
                  <li>Focused on speed, clarity, and ease of use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="w-full max-w-7xl mx-auto h-fit flex flex-col justify-between gap-[10px]">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-[10px] overflow-hidden rounded-3xl">
            <Image
              src="/f1.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full h-full lg:h-[700px] object-cover rounded-3xl"
            />
            <Image
              // src="https://neelakshi.s3.us-east-1.amazonaws.com/portfolio/f2.svg"
              src="/f2.webp"
              alt="Flint"
              width={1000}
              height={1000}
              className="w-full lg:w-1/2 h-full lg:h-[700px] object-contain rounded-3xl"
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full gap-[10px] overflow-hidden rounded-3xl">
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
        <div className="bg-white max-w-7xl mx-auto w-full p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between h-[300px] md:h-[462px]">
          {/* Previous and Next Projects */}
          <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12">
            {/* Previous Project */}
            <Link href="/hiyn" className="group flex flex-col gap-4">
              <div className="flex whitespace-nowrap items-center gap-2 bg-gray-100 px-4 py-2 rounded-md w-fit text-xs md:text-base text-gray-600 group-hover:text-black transition-colors">
                <ArrowLeft className="md:w-4 md:h-4 w-3 h-3" />
                <span>Previous Project</span>
              </div>
            </Link>

            {/* Next Project */}
            <Link href="/vion" className="group flex flex-col gap-4 items-end">
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
