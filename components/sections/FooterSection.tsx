// components/Footer.tsx
import Link from "next/link";
import { navigationItems } from './Navigation';
import { FaHeart } from "react-icons/fa";
import { motion } from 'framer-motion';
import { RiDoubleQuotesL } from "react-icons/ri";

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
    <footer className="bg-[#F5F5F5] max-w-7xl mx-auto w-full h-fit md:h-[462px] p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 w-full">
        {/* Left Side */}
        <div className="flex flex-col justify-between items-start w-full lg:w-3/5">
          <p className="mb-3 text-lg font-normal text-black">
            This portfolio is just a glimpse — a few pages from{" "}
            <Link href="#person" className={`text-blue-600 text-xl underline decoration-2 underline-offset-4 ${instrumentSerif.className}`}>
              a longer story
            </Link>{" "}
            still unfolding.
          </p>
          <p className="text-lg font-normal text-black">
            If something here sparked a thought, a question, or just a sense of possibility, I&apos;d love to hear where you want to take it next.
          </p>
        </div>

        {/* Right Side */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4'>
          {navigationItems.map((item) => (
            <motion.button 
              key={item.label} 
              onClick={() => handleNavigation(item.href)}
              className='flex items-center text-black text-lg gap-2 font-normal hover:text-[#093FB4] transition-colors group'
              // whileHover={{ scale: .98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="group-hover:rotate-[-35deg] transition-transform duration-300 ease-in-out bg-black rounded-full p-1 text-white hover:text-[#093FB4] group-hover:bg-[#093FB4]"
              >
               <RiDoubleQuotesL size={18} className="group-hover:text-white"/>
              </motion.div>
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t pt-4 flex flex-row justify-between items-center text-base text-black">
        <span>© 2025 All Rights Reserved</span>
        <span className="flex flex-row items-center gap-2">
          Made with <FaHeart size={16} className="text-black"/>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
