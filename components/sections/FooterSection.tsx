'use client'

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PixelCloud = ({ delay, duration, bottom, opacity, scale = 1, flipped = false, isSunset = false }: { delay: number; duration: number; bottom: number; opacity: number; scale?: number; flipped?: boolean; isSunset?: boolean }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        animation: `drift ${duration}s linear ${delay}s infinite`,
        bottom: `${bottom}%`,
        opacity,
      }}
    >
      <div
        style={{
          animation: `fadeInOut ${duration}s linear ${delay}s infinite`,
        }}
      >
        <Image
          src="/cloud.svg"
          alt="cloud"
          width={200}
          height={88}
          sizes={`${Math.round(200 * scale)}px`}
          style={{
            width: `${200 * scale}px`,
            height: `auto`,
            display: 'block',
            transform: flipped ? 'scaleX(-1)' : 'scaleX(1)',
            filter: isSunset ? 'hue-rotate(-20deg) saturate(1.5) brightness(1.15) drop-shadow(0 4px 10px rgba(217, 120, 159, 0.3))' : 'none',
            transition: 'filter 1s ease-in-out',
          }}
        />
      </div>
    </div>
  );
};

const PixelSun = ({ isSunset = false }: { isSunset?: boolean }) => {
  const pixelSize = 3;
  const coreColor = isSunset ? '#FFD56A' : '#FFF67A';
  const outlineColor = isSunset ? '#FFC533' : '#FFD400';
  const highlightColor = isSunset ? '#FFF1B0' : '#FFFFCF';
  const rayColor = isSunset ? '#FFCF59' : '#FFD94A';
  const rayTipColor = isSunset ? '#FFBD45' : '#FFC94A';
  const eyeColor = '#D4A243';
  const cheekColor = '#F7B7C8';

  const bodyPixels: Array<{ x: number; y: number; color: string }> = [
    { x: 5, y: 0, color: outlineColor }, { x: 6, y: 0, color: outlineColor }, { x: 7, y: 0, color: outlineColor },
    { x: 3, y: 1, color: outlineColor }, { x: 4, y: 1, color: outlineColor }, { x: 5, y: 1, color: coreColor }, { x: 6, y: 1, color: coreColor }, { x: 7, y: 1, color: coreColor }, { x: 8, y: 1, color: outlineColor }, { x: 9, y: 1, color: outlineColor },
    { x: 2, y: 2, color: outlineColor }, { x: 3, y: 2, color: coreColor }, { x: 4, y: 2, color: coreColor }, { x: 5, y: 2, color: highlightColor }, { x: 6, y: 2, color: highlightColor }, { x: 7, y: 2, color: coreColor }, { x: 8, y: 2, color: coreColor }, { x: 9, y: 2, color: coreColor }, { x: 10, y: 2, color: outlineColor },
    { x: 1, y: 3, color: outlineColor }, { x: 2, y: 3, color: coreColor }, { x: 3, y: 3, color: highlightColor }, { x: 4, y: 3, color: highlightColor }, { x: 5, y: 3, color: highlightColor }, { x: 6, y: 3, color: highlightColor }, { x: 7, y: 3, color: highlightColor }, { x: 8, y: 3, color: coreColor }, { x: 9, y: 3, color: coreColor }, { x: 10, y: 3, color: coreColor }, { x: 11, y: 3, color: outlineColor },
    { x: 1, y: 4, color: outlineColor }, { x: 2, y: 4, color: coreColor }, { x: 3, y: 4, color: highlightColor }, { x: 4, y: 4, color: highlightColor }, { x: 5, y: 4, color: highlightColor }, { x: 6, y: 4, color: highlightColor }, { x: 7, y: 4, color: highlightColor }, { x: 8, y: 4, color: highlightColor }, { x: 9, y: 4, color: coreColor }, { x: 10, y: 4, color: coreColor }, { x: 11, y: 4, color: outlineColor },
    { x: 0, y: 5, color: outlineColor }, { x: 1, y: 5, color: coreColor }, { x: 2, y: 5, color: highlightColor }, { x: 3, y: 5, color: highlightColor }, { x: 4, y: 5, color: highlightColor }, { x: 5, y: 5, color: highlightColor }, { x: 6, y: 5, color: highlightColor }, { x: 7, y: 5, color: highlightColor }, { x: 8, y: 5, color: highlightColor }, { x: 9, y: 5, color: coreColor }, { x: 10, y: 5, color: coreColor }, { x: 11, y: 5, color: coreColor }, { x: 12, y: 5, color: outlineColor },
    { x: 0, y: 6, color: outlineColor }, { x: 1, y: 6, color: coreColor }, { x: 2, y: 6, color: highlightColor }, { x: 3, y: 6, color: highlightColor }, { x: 4, y: 6, color: highlightColor }, { x: 5, y: 6, color: highlightColor }, { x: 6, y: 6, color: highlightColor }, { x: 7, y: 6, color: highlightColor }, { x: 8, y: 6, color: highlightColor }, { x: 9, y: 6, color: coreColor }, { x: 10, y: 6, color: coreColor }, { x: 11, y: 6, color: coreColor }, { x: 12, y: 6, color: outlineColor },
    { x: 1, y: 7, color: outlineColor }, { x: 2, y: 7, color: coreColor }, { x: 3, y: 7, color: highlightColor }, { x: 4, y: 7, color: highlightColor }, { x: 5, y: 7, color: highlightColor }, { x: 6, y: 7, color: highlightColor }, { x: 7, y: 7, color: highlightColor }, { x: 8, y: 7, color: coreColor }, { x: 9, y: 7, color: coreColor }, { x: 10, y: 7, color: coreColor }, { x: 11, y: 7, color: outlineColor },
    { x: 1, y: 8, color: outlineColor }, { x: 2, y: 8, color: coreColor }, { x: 3, y: 8, color: coreColor }, { x: 4, y: 8, color: highlightColor }, { x: 5, y: 8, color: highlightColor }, { x: 6, y: 8, color: highlightColor }, { x: 7, y: 8, color: coreColor }, { x: 8, y: 8, color: coreColor }, { x: 9, y: 8, color: coreColor }, { x: 10, y: 8, color: outlineColor },
    { x: 2, y: 9, color: outlineColor }, { x: 3, y: 9, color: coreColor }, { x: 4, y: 9, color: coreColor }, { x: 5, y: 9, color: coreColor }, { x: 6, y: 9, color: coreColor }, { x: 7, y: 9, color: coreColor }, { x: 8, y: 9, color: coreColor }, { x: 9, y: 9, color: outlineColor },
    { x: 4, y: 10, color: outlineColor }, { x: 5, y: 10, color: outlineColor }, { x: 6, y: 10, color: outlineColor }, { x: 7, y: 10, color: outlineColor },
    { x: 4, y: 4, color: eyeColor }, { x: 8, y: 4, color: eyeColor },
    { x: 3, y: 5, color: cheekColor }, { x: 9, y: 5, color: cheekColor },
    // { x: 6, y: 9, color: mouthColor }, { x: 4, y: 7, color: mouthColor }, { x: 8, y: 7, color: mouthColor },{ x: 5, y: 8, color: mouthColor }, { x: 7, y: 8, color: mouthColor }
  ];

  const rayPixels: Array<{ x: number; y: number; color: string }> = [
    { x: 5, y: -3, color: rayTipColor }, { x: 6, y: -3, color: rayTipColor },
    { x: 5, y: -2, color: rayColor }, { x: 6, y: -2, color: rayColor },
    { x: 0, y: 0, color: rayTipColor }, { x: 1, y: 0, color: rayTipColor }, { x: -1, y: 1, color: rayColor }, { x: 0, y: 1, color: rayColor },
    { x: 11, y: 0, color: rayTipColor }, { x: 12, y: 0, color: rayTipColor }, { x: 12, y: 1, color: rayColor }, { x: 13, y: 1, color: rayColor },
    { x: -3, y: 5, color: rayTipColor }, { x: -2, y: 5, color: rayTipColor }, { x: -1, y: 5, color: rayColor }, { x: -2, y: 6, color: rayColor },
    { x: 13, y: 5, color: rayTipColor }, { x: 14, y: 5, color: rayTipColor }, { x: 12, y: 5, color: rayColor }, { x: 13, y: 6, color: rayColor },
    { x: 0, y: 10, color: rayTipColor }, { x: 1, y: 10, color: rayTipColor }, { x: -1, y: 9, color: rayColor }, { x: 0, y: 9, color: rayColor },
    { x: 11, y: 10, color: rayTipColor }, { x: 12, y: 10, color: rayTipColor }, { x: 12, y: 9, color: rayColor }, { x: 13, y: 9, color: rayColor },
    { x: 5, y: 12, color: rayTipColor }, { x: 6, y: 12, color: rayTipColor },
    { x: 5, y: 11, color: rayColor }, { x: 6, y: 11, color: rayColor },
  ];

  return (
    <div className="relative h-[60px] w-[60px]" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[48px] w-[48px] -translate-x-1/2 -translate-y-1/2">
        {rayPixels.map(({ x, y, color }, index) => (
          <div
            key={`ray-${index}`}
            className="absolute"
            style={{
              left: `${x * pixelSize}px`,
              top: `${y * pixelSize}px`,
              width: `${pixelSize}px`,
              height: `${pixelSize}px`,
              backgroundColor: color,
            }}
          />
        ))}
        {bodyPixels.map(({ x, y, color }, index) => (
          <div
            key={`body-${index}`}
            className="absolute"
            style={{
              left: `${x * pixelSize}px`,
              top: `${y * pixelSize}px`,
              width: `${pixelSize}px`,
              height: `${pixelSize}px`,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  const [mode, setMode] = useState<'day' | 'sunset'>('day');

  return (
    <>
      <style>{`
        @keyframes drift {
          0% {
            transform: translateX(-300px);
          }
          100% {
            transform: translateX(100vw);
          }
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes sunGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255, 200, 0, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 200, 0, 0.9));
          }
        }
      `}</style>
      <motion.footer
        className={`relative max-w-7xl mx-auto w-full h-[500px] md:h-[462px] p-4 md:p-[40px] rounded-[16px] flex flex-col justify-between overflow-hidden`}
        animate={{
          backgroundPosition: mode === 'sunset' ? '0% 100%' : '0% 0%',
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
        }}
        style={{
          backgroundSize: '100% 220%',
          backgroundImage: `
            radial-gradient(120% 88% at 50% 108%, rgba(255, 153, 170, 0.98) 0%, rgba(255, 170, 182, 0.88) 16%, rgba(255, 188, 176, 0.66) 30%, rgba(239, 178, 222, 0.34) 52%, rgba(239, 178, 222, 0) 72%),
            radial-gradient(82% 62% at 84% 80%, rgba(255, 219, 150, 0.74) 0%, rgba(255, 199, 156, 0.38) 24%, rgba(255, 199, 156, 0) 58%),
            linear-gradient(180deg, #1A53C5 0%, #496EDC 18%, #7A87EA 36%, #AF95EC 56%, #D79CDE 74%, #F3A7CB 88%, #FF9EB5 100%)
          `,
        }}
      >
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
      {/* Animated pixel clouds - negative delays spread them across screen from start */}
      <PixelCloud delay={-5} duration={25} bottom={25} opacity={0.3} scale={1.2} isSunset={mode === 'sunset'} />
      <PixelCloud delay={-12} duration={30} bottom={40} opacity={0.4} scale={0.8} flipped isSunset={mode === 'sunset'} />
      <PixelCloud delay={-8} duration={35} bottom={50} opacity={0.5} scale={1.5} isSunset={mode === 'sunset'} />
      <PixelCloud delay={-3} duration={28} bottom={60} opacity={0.65} scale={0.6} flipped isSunset={mode === 'sunset'} />
      <PixelCloud delay={-15} duration={32} bottom={70} opacity={0.75} scale={1.1} isSunset={mode === 'sunset'} />
      <PixelCloud delay={-20} duration={38} bottom={80} opacity={0.85} scale={0.7} flipped isSunset={mode === 'sunset'} />
      <PixelCloud delay={-10} duration={33} bottom={35} opacity={0.38} scale={1.3} isSunset={mode === 'sunset'} />

      {/* Sun message in bottom right */}
      <div className={`absolute w-full bottom-0 right-0 md:bottom-6 md:right-6 text-sm md:text-base font-normal flex items-start justify-center md:justify-end gap-4 ${mode === 'sunset' ? 'text-[#FFF7EE]' : 'text-white'} transition-colors duration-500`}>
        <p className="text-center md:text-right leading-[1.35]">In case you didn&apos;t look up today,<br />here&apos;s a little sky for you ~</p>
        <button
          onClick={() => setMode(mode === 'sunset' ? 'day' : 'sunset')}
          className="shrink-0 cursor-pointer hover:scale-100 transition-transform"
          aria-label={mode === 'sunset' ? 'Switch to day sky' : 'Switch to sunset sky'}
          style={{
            animation: mode === 'sunset' ? 'sunGlow 2s ease-in-out infinite' : 'none',
          }}
        >
          <PixelSun isSunset={mode === 'sunset'} />
        </button>
      </div>

      {/* <div
        className="absolute -bottom-7 md:-bottom-16 lg:-bottom-24 left-0 z-10 flex items-center justify-center pointer-events-none opacity-30"
      >
        <span className="text-[#072A8A] text-[60px] md:text-[120px] lg:text-[200px] font-bold tracking-wider select-none">
          BLUECODER
        </span>
      </div> */}
    </motion.footer>
    </>
  );
};

export default Footer;
