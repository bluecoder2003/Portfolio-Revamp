import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
// import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import AnimatedSection from "@/components/ui/animated-section";
import type { Metadata } from "next";
import { GeistPixelSquare } from "geist/font/pixel";
const geistPixelSquare = GeistPixelSquare;
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Safeve - Women's Safety Platform",
  description: "Enhancing women's safety through anonymous reporting mechanisms. A secure, anonymous reporting system that empowers victims, helps organizations spot patterns, and fosters a culture of trust and accountability.",
  keywords: "women safety, anonymous reporting, workplace safety, harassment reporting, POSH act, safety platform",
  alternates: {
    canonical: "/safeve",
  },
  openGraph: {
    title: "Safeve - Women's Safety Platform",
    description: "Enhancing women's safety through anonymous reporting mechanisms. A secure, anonymous reporting system that empowers victims, helps organizations spot patterns, and fosters a culture of trust and accountability.",
    type: "website",
    images: [
      {
        url: "/safeve-proj.webp",
        width: 1200,
        height: 630,
        alt: "Safeve Women's Safety Platform",
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
          <div className="flex flex-col gap-6 mt-2">
            {/* Heading and Subtitle */}
            <div className="flex flex-col gap-3 max-w-3xl">
              <span
                className="text-3xl md:text-5xl lg:text-5xl font-normal text-black leading-tight"
              >
                <span className={` text-[#DD3418] ${geistPixelSquare.className}`} >Safeve:</span> enhancing women&apos;s safety through anonymous reporting
              </span>
              <span className="text-base md:text-lg font-normal text-black w-full">
                A secure, anonymous reporting system that empowers victims, helps organizations spot patterns, and fosters a culture of trust and accountability.
              </span>
            </div>
            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4">
              {/* Project Overview */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className={`text-lg lg:text-xl font-medium text-gray-700 mb-4 ${geistPixelSquare.className}`}>
                  Project Overview
                </div>
                <div className="flex flex-col gap-3 text-base font-normal text-black">
                  <div className="flex items-center gap-1">
                    <Link
                      href="https://www.behance.net/gallery/223013105/Safeve"
                      className="relative text-black hover:text-[#DD3418] transition-colors duration-200 inline-flex items-center gap-1 leading-tight after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-[repeating-linear-gradient(to_right,#DD3418_0px,#DD3418_4px,transparent_4px,transparent_8px)] after:transition-[width] after:duration-300 hover:after:w-full"
                    >
                      Case Study <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div>Despite the POSH Act, women’s safety remains a concern. Fear of backlash and stigma often silences victims—especially in tech—making anonymous reporting essential.
                  </div>
                </div>
              </div>
              {/* What I worked on */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 lg:p-6 h-full flex flex-col">
                <div className={`text-lg lg:text-xl font-medium text-gray-700 mb-4 ${geistPixelSquare.className}`}>
                Proposed Solution
                </div>
                <ul className="flex flex-col gap-2 text-base font-normal text-black list-disc list-inside">
                  <li>A secure, anonymous reporting system that empowers victims</li>
                  <li>Helps organizations spot patterns</li>
                  <li>Fosters a culture of trust and accountability</li>
                </ul>
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
            className="w-full h-auto object-cover rounded-3xl"
          />
          <Image
            src="/s2.webp"
            alt="Safeve"
            width={1000}
            height={1000}
            className="w-full h-auto object-cover rounded-3xl"
          />
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-[10px]">
            <Image
              src="/s3.webp"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full lg:w-1/2 h-auto object-cover rounded-3xl"
            />
            <Image
              src="/s4.webp"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full lg:w-1/2 h-auto object-cover rounded-3xl"
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-[10px]">
            <Image
              src="/s5.webp"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full lg:w-1/3 h-full lg:h-[700px] object-cover rounded-3xl"
            />
            <Image
              src="/s6.webp"
              alt="Safeve"
              width={1000}
              height={1000}
              className="w-full h-full lg:h-[700px] object-cover rounded-3xl"
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
            <Link href="/projects/vion" className="group flex flex-col gap-4">
              <div className="flex whitespace-nowrap items-center gap-2 bg-gray-100 px-4 py-2 rounded-md w-fit text-xs md:text-base text-gray-600 group-hover:text-black transition-colors">
                <ArrowLeft className="md:w-4 md:h-4 w-3 h-3" />
                <span>Previous Project</span>
              </div>
            </Link>

            {/* Next Project */}
            <Link href="/projects/hiyn" className="group flex flex-col gap-4 items-end">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md w-fit text-xs md:text-base text-gray-600 group-hover:text-black transition-colors justify-end">
                <span>Next Project</span>
                <ArrowRight className="md:w-4 md:h-4 w-3 h-3" />
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="pt-4 flex flex-row justify-between items-end md:text-base text-xs text-black">
            <span>© 2026 All Rights Reserved</span>
            <div
  className="w-20 h-20 bg-black hover:bg-[#093FB4] transition-colors duration-300"
  style={{
    maskImage: "url('/hand.svg')",
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
    WebkitMaskImage: "url('/hand.svg')",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    WebkitMaskSize: "contain",
  }}
/>


          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Page;
