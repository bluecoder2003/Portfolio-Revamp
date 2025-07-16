import Link from 'next/link'
import { navigationItems } from './Navigation'
import { CornerRightDown } from 'lucide-react'
import { motion } from 'framer-motion'

import { Instrument_Serif } from "next/font/google";
import { RiDoubleQuotesL } from 'react-icons/ri'

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
});

interface HeroSectionProps {
  onNavigate?: (section: string) => void;
  currentSection?: string;
}

const HeroSection = ({ onNavigate, currentSection = 'playground' }: HeroSectionProps) => {
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

  // Map section to display title
  const getSectionTitle = (section: string) => {
    const titleMap: { [key: string]: string } = {
      'playground': 'The Playground',
      'projects': 'The Projects',
      'person': 'The Person', 
      'connect': 'Connect Maybe?'
    }
    return titleMap[section] || 'The Playground'
  }

  return (
    <div className='bg-[#F5F5F5] w-full max-w-7xl mx-auto h-[800px] lg:h-[462px] p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between'>
      {/* Top Row */}
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between items-start w-full'>
        {/* Top Left */}
        <div>
          <span className='text-lg font-normal text-black'>
            Designer & Developer{' '}
            <span className='text-[#093FB4] underline'><Link href="https://cosx.ai">@cosx.ai</Link></span>
            {' '}· prev.{' '}
            <span className='text-[#093FB4] underline'><Link href="https://vexio.in">@vexio.in</Link></span>
          </span>
        </div>
        {/* Top Right Navigation */}
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
      {/* Bottom Row */}
      <div className='flex flex-row justify-between items-end w-full'>
        {/* Bottom Left */}
        <div>
          <div className='text-xl font-normal text-black mb-2'>Hellooo, I&apos;m Neelakshi Das</div>
          <div
            className={`text-[48px] md:text-[56px] font-normal text-[#093FB4] leading-none ${instrumentSerif.className}`}
          >
            Designer Engineer
          </div>
        </div>
        {/* Bottom Right */}
        <div className='mb-2'>
          <div
            className='text-[#093FB4] text-lg font-normal items-center gap-2 transition-colors hidden md:flex '
          >
            {getSectionTitle(currentSection)}
            <div
            >
              <CornerRightDown className='w-5 h-5 mt-1' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection