import Image from "next/image";
import { useState } from "react";

import { Instrument_Serif } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Folder from "../custom/Folder";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
  display: "swap",
});

export default function PersonSections() {
  const [openFolder, setOpenFolder] = useState<string>("cosx"); // Default to CosX open
  const [selectedCompany, setSelectedCompany] = useState("cosx"); // Default to CosX

  const handleFolderClick = (company: string) => {
    setSelectedCompany(company);
    setOpenFolder(company);
  };

  const companyData = {
    vng: {
      name: "VNG Medical",
      role: "Designer Intern",
      period: "Dec 2023 - Nov 2024",
      description: [
        <>Designed marketing visuals and communication graphics to strengthen brand identity.</>,
        <>Built and refined the app&apos;s UI with a focus on accessibility and consistency.</>,
      ],
    },
    nlti: {
      name: "National Law Training Institute",
      role: "Designer Intern",
      period: "Mar 2024 - Jun 2024",
      description: [
        <>Designed brand and learning materials for training modules and digital assets.</>,
        <>Built and launched the institute&apos;s website with a clean, responsive design.</>,
      ],
    },
    vexio: {
      name: "Vexio",
      role: "UI/UX Designer & Developer Intern",
      period: "Jul 2024 - Apr 2025",
      description: [
        <>Created high-fidelity Figma prototypes and design systems to streamline design-to-development workflows.</>,
        <>Developed responsive, accessible interfaces with Next.js, TypeScript, and Tailwind, enhancing overall usability.</>,
      ],
    },
      cosx: {
        name: "CosX",
        role: "UI/UX Designer & Developer Intern",
        period: "Jun 2025 - Present",
        description: [
          <>Worked on the WordPress → Next.js migration for <a href="https://signzy.com" target="_blank" rel="noopener noreferrer" className="text-[#093FB4] hover:text-[#273554]">Signzy <ArrowUpRight className="w-4 h-4 inline" /></a>, improving design consistency and performance.</>,
          <>Designed and built websites for <a href="https://www.natural-capital.partners/" target="_blank" rel="noopener noreferrer" className="text-[#093FB4] hover:text-[#273554]">Natural Capital Partners <ArrowUpRight className="w-4 h-4 inline" /></a>, <a href="https://www.cosx.ai/" target="_blank" rel="noopener noreferrer" className="text-[#093FB4] hover:text-[#273554]">CosX Website <ArrowUpRight className="w-4 h-4 inline" /></a>,  <a href="https://kareverse.com" target="_blank" rel="noopener noreferrer" className="text-[#093FB4] hover:text-[#273554]">Kareverse <ArrowUpRight className="w-4 h-4 inline" /></a>, and <a href="https://www.anmoljyoti.akhandjyoti.com/" target="_blank" rel="noopener noreferrer" className="text-[#093FB4] hover:text-[#273554]">Akhand Jyoti <ArrowUpRight className="w-4 h-4 inline" /></a>, and currently leading the CosxLive redesign.</>,
        ],
      },
  };

  return (
    <section className="bg-white w-full max-w-7xl mx-auto h-fit p-4 md:p-[40px] rounded-[16px] flex flex-col gap-8 ">
      {/* Header */}
      <div className="text-[28px] md:text-[32px] font-normal text-black mb-2">
        Behind The Pixels
      </div>
      <div className="flex flex-col justify-between items-center w-full max-w-5xl mx-auto">
        {/* Top Row */}
        <div className="flex flex-col justify-between items-center w-full">
          <div
            className={`text-[#093FB4] text-2xl font-normal ${instrumentSerif.className} mb-4`}
          >
            Peek into my life
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Polaroid Grid */}
            <Image
              src="/about-one.webp"
              alt="polaroid"
              width={1000}
              height={1000}
              className="object-contain w-full h-full md:w-[300px] md:h-fit lg:w-[400px] lg:h-fit"
            />
            {/* Bio Text */}
            <div className="text-black text-lg font-normal">
              Born in Kolkata, the City of Joy — where every lane hums with art,
              culture, and color — I grew up surrounded by stories and
              creativity. That early chaos and charm shaped how I see and
              express.
              <br />
              <br />I speak Hindi, English, and Bengali — each with its own
              rhythm — and I&apos;m slowly picking up Spanish too. Wherever I
              go, that energy stays — a quiet anchor, a loud spark.
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] my-6 bg-[repeating-linear-gradient(to_right,_#BFBFAF_0_12px,_transparent_12px_24px)]" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Image
            src="/about-two.webp"
            alt="polaroid"
            width={1000}
            height={1000}
            className="object-contain w-full h-full block md:hidden"
          />
          <div className="text-black text-lg font-normal">
            Creativity has always been my constant — from handmade cards to
            intuitive UI. I fell for design through its visual charm, but
            it&apos;s the research and problem-solving that keep me grounded.
            <br />
            I&apos;m a curious soul with a love for mountains, travel, and the
            occasional deep-dive into random rabbit holes. Design lets me blend
            craft with clarity — and I wouldn&apos;t have it any other way.
          </div>
          <Image
            src="/about-two.webp"
            alt="polaroid"
            width={1000}
            height={1000}
            className="object-contain w-full h-full md:w-[300px] md:h-fit lg:w-[400px] lg:h-fit hidden md:block"
          />
        </div>
        <div className="w-full h-[1px] my-6 bg-[repeating-linear-gradient(to_right,_#BFBFAF_0_12px,_transparent_12px_24px)]" />
        <div className="flex flex-col md:flex-row justify-between items-center lg:gap-24 gap-12">
          {/* Polaroid Grid */}
          <Image
            src="/figma.png"
            alt="polaroid"
            width={1000}
            height={1000}
            className="object-contain w-full h-full md:w-[300px] md:h-fit lg:w-[600px] lg:h-fit lg:pl-12 pl-0"
          />
          {/* Bio Text */}
          <div className="flex flex-col gap-2">
            <div className="text-black text-lg font-normal">
              Also...One of my most exciting moments was being featured at the
              Figma Makeathon, recognized among 10,000+ participants.
              <br />
              Seeing a project I built from scratch stand out on a global stage
              was surreal — both humbling and electrifying — and reminded me why
              I love creating
            </div>
            <button
              onClick={() =>
                window.open(
                  "https://x.com/figma/status/1968007805203517458",
                  "_blank"
                )
              }
              className="bg-black text-white text-sm font-normal px-3 py-1 rounded-full shadow-md w-fit flex whitespace-nowrap justify-center items-center gap-1"
            >
              Link
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] my-6 bg-[repeating-linear-gradient(to_right,_#BFBFAF_0_12px,_transparent_12px_24px)]" />
        {/* Timeline Header */}
        <div
          className={`text-[#093FB4] text-2xl hidden md:block font-normal ${instrumentSerif.className} mt-4 lg:mb-16 mb-8`}
        >
          Places I&apos;ve worked before
        </div>
        <div
          className={`text-[#093FB4] text-2xl block md:hidden font-normal ${instrumentSerif.className} my-8`}
        >
          Places I&apos;ve worked before
        </div>
        {/* Timeline */}
        <div className="relative flex flex-col items-center w-full">
          {/* Animated Folder Component */}
          <div className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 hidden md:grid">
            <div onClick={() => handleFolderClick("vng")}>
              <Folder
                isOpen={openFolder === "vng"}
                onClick={() => {}} // Empty function since click is handled by parent div
                logo="/vnglogo.webp"
                logoAlt="VNG Logo"
              />
            </div>
            <div onClick={() => handleFolderClick("nlti")}>
              <Folder
                isOpen={openFolder === "nlti"}
                onClick={() => {}} // Empty function since click is handled by parent div
                logo="/nltilogo.webp"
                logoAlt="NLTI Logo"
              />
            </div>
            <div onClick={() => handleFolderClick("vexio")}>
              <Folder
                isOpen={openFolder === "vexio"}
                onClick={() => {}} // Empty function since click is handled by parent div
                logo="/vexiologo.webp"
                logoAlt="Vexio Logo"
              />
            </div>
            <div onClick={() => handleFolderClick("cosx")}>
              <Folder
                isOpen={openFolder === "cosx"}
                onClick={() => {}} // Empty function since click is handled by parent div
                logo="/cosxlogo.webp"
                logoAlt="CosX Logo"
              />
            </div>
          </div>

          {/* Mobile Version */}
          <div className="grid grid-cols-2 w-full gap-4 md:hidden p-4 bg-[#F2F2F2] rounded-xl">
            <div onClick={() => handleFolderClick("vng")} className="cursor-pointer">
              <div className={`bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center transition-opacity duration-200 ${selectedCompany === "vng" ? "opacity-100" : "opacity-50"}`}>
                <div className="w-20 h-20 mb-2 flex items-center justify-center">
                  <Image
                    src="/vnglogo.png"
                    alt="VNG Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
   
              </div>
            </div>
            <div onClick={() => handleFolderClick("nlti")} className="cursor-pointer">
              <div className={`bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center transition-opacity duration-200 ${selectedCompany === "nlti" ? "opacity-100" : "opacity-50"}`}>
                <div className="w-20 h-20 mb-2 flex items-center justify-center">
                  <Image
                    src="/nltilogo.png"
                    alt="NLTI Logo"
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                </div>

              </div>
            </div>
            <div onClick={() => handleFolderClick("vexio")} className="cursor-pointer">
              <div className={`bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center transition-opacity duration-200 ${selectedCompany === "vexio" ? "opacity-100" : "opacity-50"}`}>
                <div className="w-20 h-20 mb-2 flex items-center justify-center">
                  <Image
                    src="/vexiologo.png"
                    alt="Vexio Logo"
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                </div>
              
              </div>
            </div>
            <div onClick={() => handleFolderClick("cosx")} className="cursor-pointer">
              <div className={`bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center transition-opacity duration-200 ${selectedCompany === "cosx" ? "opacity-100" : "opacity-50"}`}>
                <div className="w-20 h-20 mb-2 flex items-center justify-center">
                  <Image
                    src="/cosxlogo.png"
                    alt="CosX Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
    
              </div>
            </div>
          </div>
 
          <div className="md:mt-8 mt-6 w-full max-w-5xl mx-auto">
            <div 
              key={selectedCompany}
              className="bg-[#F2F2F2] border border-[#E1E2E2] rounded-lg md:p-6 p-4 animate-slide-up"
            >
              <div className="flex flex-row items-center justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-normal md:text-xl text-lg text-gray-900">
                    {
                      companyData[selectedCompany as keyof typeof companyData]
                        .name
                    }
                  </h3>
                </div>
                <div className="text-sm md:text-base text-[#7C7C7C]">
                  {
                    companyData[selectedCompany as keyof typeof companyData]
                      .period
                  }
                </div>
              </div>
              <div className="text-base text-[#626262] mb-4">
                {companyData[selectedCompany as keyof typeof companyData].role}
              </div>
              <div className="space-y-2">
                <ul className="list-disc space-y-1 text-base md:text-lg text-[#626262] pl-4">
                  {companyData[
                    selectedCompany as keyof typeof companyData
                  ].description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-4 gap-4 md:gap-0">
            <div className="text-lg text-[#626262]">
            Peek inside the folder to uncover my professional adventures !!
            </div>
            <Link
              href="https://drive.google.com/file/d/1A2RkGJNKCQKiEHqFEwLgM9iMx6JwHme4/view"
              target="_blank"
              className="items-center gap-2 sm:gap-3 lg:gap-4 bg-black text-white text-base font-normal px-4 py-2 rounded-md shadow-md flex whitespace-nowrap"
            >
              Resume
              <div className="flex flex-row items-center gap-1 sm:gap-2 bg-[#4253D5] rounded-full p-0.5 sm:p-1">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </div>
          {/* <div className="absolute w-full h-[1px] top-4 bg-[repeating-linear-gradient(to_right,_#BFBFAF_0_12px,_transparent_12px_24px)] z-0" /> */}

          {/* {timeline.map((_, i) => (
            <div
              key={i}
              className={`absolute top-2.5 md:top-1.5 z-20 ${
                i === 0 ? "md:left-[calc(13%-12px)] left-[calc(15%-1px)]" : ""
              } ${
                i === 1 ? "md:left-[calc(40%-12px)] left-[calc(45%-12px)]" : ""
              } ${
                i === 2 ? "md:left-[calc(68%-12px)] left-[calc(75%-24px)]" : ""
              } ${
                i === 3 ? "md:left-[calc(95%-12px)] left-[calc(95%-1px)]" : ""
              }`}
            >
              <div
                className={`w-2 h-2 md:w-4 md:h-4 rounded-full border-[1px] flex items-center justify-center
                ${
                  i === timeline.length - 1
                    ? "bg-[#BFBFAF] border-[#BFBFAF]"
                    : "bg-white border-[#BFBFAF]"
                }`}
              >
               
                {i === timeline.length - 1 && (
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#BFBFAF]" />
                )}
              </div>
            </div>
          ))} */}

          {/* <div className="flex flex-row justify-between w-full gap-4 md:gap-14 lg:gap-24 z-10 pt-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex flex-col items-center w-1/4">
                <div className="flex flex-col items-center mb-2">
                  <Image
                    src={item.logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="object-contain w-full h-full mb-2"
                  />
                </div>
                <div className="text-black text-[15px] font-normal text-center leading-tight">
                  {item.role}
                </div>
                <div className="text-[#093FB4] text-[14px] font-normal text-center leading-tight mt-1 hidden md:block">
                  {item.date}
                </div>
                <div className="text-zinc-500 text-[13px] font-normal text-center leading-tight hidden md:block">
                  {item.duration}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
