import Link from 'next/link'
import { navigationItems } from './Navigation'
import Image from 'next/image'
import { CornerRightDown } from 'lucide-react'

import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
});

const HeroSection = () => {
  return (
    <div className='bg-[#F5F5F5] w-full h-[462px] p-[40px] rounded-[16px] flex flex-col justify-between'>
      {/* Top Row */}
      <div className='flex flex-row justify-between items-start w-full'>
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
        <div className='grid grid-cols-2 gap-4'>
          {navigationItems.map((item) => (
            <Link key={item.label} href={item.href} className='flex items-center text-black text-lg gap-2 font-normal'>
              <Image src="/quote.svg" alt={item.label} width={24} height={24} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      {/* Bottom Row */}
      <div className='flex flex-row justify-between items-end w-full'>
        {/* Bottom Left */}
        <div>
          <div className='text-xl font-normal text-black mb-2'>Hellooo, I&apos;m Neelakshi Das</div>
          <div
            className={`text-[56px] font-normal text-[#093FB4] leading-none ${instrumentSerif.className}`}
          >
            Designer Engineer
          </div>
        </div>
        {/* Bottom Right */}
        <div className='mb-2'>
          <Link href='#' className='text-[#093FB4] text-lg font-normal flex items-center gap-2'>
            The Projects
            <CornerRightDown className='w-5 h-5 mt-1' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection