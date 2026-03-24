'use client'

import { useRouter } from 'next/navigation';
import { navigationItems } from './Navigation';
import { Quote } from "lucide-react";

import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
  display: "swap",
});

const Footer = () => {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <footer className="relative bg-[#093FB4] max-w-7xl mx-auto w-full h-[500px] md:h-[462px] p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 w-full">
        {/* Left Side */}
        {/* <div className="flex flex-col justify-between items-start w-full lg:w-3/5">
          <p className="mb-3 text-lg font-normal text-white">
            This portfolio is just a glimpse — a few pages from{" "}
            <button
              onClick={() => handleNavigation('/person')}
              className={`text-white text-xl underline decoration-2 underline-offset-4 hover:text-gray-200 transition-colors cursor-pointer ${instrumentSerif.className}`}
            >
              a longer story
            </button>{" "}
            still unfolding.
          </p>
        </div> */}

        {/* Right Side */}
        {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4'>
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.href)}
              className='flex items-center text-white text-lg gap-2 font-normal transition-colors group'
            >
              <div
                className="group-hover:rotate-[-35deg] transition-transform duration-300 ease-in-out bg-white rounded-full p-1 text-[#093FB4] group-hover:bg-white"
              >
               <Quote size={16} className="group-hover:text-[#093FB4] fill-current"/>
              </div>
              {item.label}
            </button>
          ))}
        </div> */}
      </div>
      {/* <div
        className="absolute -bottom-7 md:-bottom-16 lg:-bottom-24 left-0 z-10 flex items-center justify-center pointer-events-none opacity-30"
      >
        <span className="text-[#072A8A] text-[60px] md:text-[120px] lg:text-[200px] font-bold tracking-wider select-none">
          BLUECODER
        </span>
      </div> */}
    </footer>
  );
};

export default Footer;
