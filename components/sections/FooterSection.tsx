// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { navigationItems } from './Navigation';
import { FaHeart } from "react-icons/fa";

import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
});

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] w-full h-[462px] p-[40px] rounded-[16px] flex flex-col justify-between">
      <div className="flex flex-row justify-between items-start w-full">
        {/* Left Side */}
        <div className="flex flex-col justify-between items-start w-3/5">
          <p className="mb-3 text-lg font-normal text-black">
            This portfolio is just a glimpse — a few pages from{" "}
            <Link href="/story" className={`text-blue-600 text-xl underline decoration-2 underline-offset-4 ${instrumentSerif.className}`}>
              a longer story
            </Link>{" "}
            still unfolding.
          </p>
          <p className="text-lg font-normal text-black">
            If something here sparked a thought, a question, or just a sense of possibility, I’d love to hear where you want to take it next.
          </p>
        </div>

        {/* Right Side */}
        <div className='grid grid-cols-2 gap-4'>
          {navigationItems.map((item) => (
            <Link key={item.label} href={item.href} className='flex items-center text-black text-lg gap-2 font-normal'>
              <Image src="/quote.svg" alt={item.label} width={24} height={24} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t pt-4 flex flex-col md:flex-row justify-between items-center text-base text-black">
        <span>© 2025 All Rights Reserved</span>
        <span className="flex flex-row items-center gap-2">
          Made with <FaHeart size={16} className="text-black"/>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
