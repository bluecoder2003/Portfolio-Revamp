// components/Footer.tsx
import Link from "next/link";
import { navigationItems } from './Navigation';
// import { FaHeart } from "react-icons/fa";
import { motion } from 'framer-motion';
import { RiDoubleQuotesL } from "react-icons/ri";
import { useState, useEffect } from 'react';

import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
});

interface FooterProps {
  onNavigate?: (section: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);
  const handleNavigation = (href: string) => {
    if (onNavigate) {
      // Map href to section type
      const sectionMap: { [key: string]: string } = {
        '#playground': 'playground',
        '#projects': 'projects', 
        '#person': 'person',
        '#connect': 'connect'
      }
      const section = sectionMap[href] || 'playground'
      onNavigate(section)
    }
  }

  return (
    <footer className="relative bg-[#093FB4] max-w-7xl mx-auto w-full h-[500px] md:h-[462px] p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 w-full">
        {/* Left Side */}
        <div className="flex flex-col justify-between items-start w-full lg:w-3/5">
          <p className="mb-3 text-lg font-normal text-white">
            This portfolio is just a glimpse — a few pages from{" "}
            <Link href="#person" className={`text-white text-xl underline decoration-2 underline-offset-4 ${instrumentSerif.className}`}>
              a longer story
            </Link>{" "}
            still unfolding.
          </p> 
        </div>

        {/* Right Side */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4'>
          {navigationItems.map((item) => (
            <motion.button 
              key={item.label} 
              onClick={() => handleNavigation(item.href)}
              className='flex items-center text-white text-lg gap-2 font-normal transition-colors group'
              // whileHover={{ scale: .98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="group-hover:rotate-[-35deg] transition-transform duration-300 ease-in-out bg-white rounded-full p-1 text-[#093FB4] hover:text-[#093FB4] group-hover:bg-white"
              >
               <RiDoubleQuotesL size={18} className="group-hover:text-[#093FB4]"/>
              </motion.div>
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>
      <motion.div 
        className="absolute -bottom-7 md:-bottom-16 lg:-bottom-24 left-0 z-10 flex items-center justify-center pointer-events-none"
        initial={{ y: isDesktop ? 100 : 0, opacity: isDesktop ? 0 : 0.3 }}
        whileInView={{ y: 0, opacity: 0.3 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: isDesktop ? 0.8 : 0, ease: "easeOut" }}
      >
        <span className="text-[#072A8A] text-[60px] md:text-[120px] lg:text-[200px] font-bold tracking-wider select-none">
          BLUECODER
        </span>
      </motion.div>

      {/* Divider */}
      {/* <div className="mt-12 border-t pt-4 flex flex-row justify-between items-center text-base text-black">
        <span>© 2025 All Rights Reserved</span>
        <span className="flex flex-row items-center gap-2">
          Made with <FaHeart size={16} className="text-black"/>
        </span>
      </div> */}
    </footer>
  );
};

export default Footer;
