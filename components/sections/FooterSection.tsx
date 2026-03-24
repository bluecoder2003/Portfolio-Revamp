'use client'

import Image from 'next/image';

const PixelCloud = ({ delay, duration, bottom, opacity, scale = 1, flipped = false }: { delay: number; duration: number; bottom: number; opacity: number; scale?: number; flipped?: boolean }) => {
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
          }}
        />
      </div>
    </div>
  );
};

const Footer = () => {
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
      `}</style>
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
      {/* Animated pixel clouds - negative delays spread them across screen from start */}
      <PixelCloud delay={-5} duration={25} bottom={25} opacity={0.3} scale={1.2} />
      <PixelCloud delay={-12} duration={30} bottom={40} opacity={0.4} scale={0.8} flipped />
      <PixelCloud delay={-8} duration={35} bottom={50} opacity={0.5} scale={1.5} />
      <PixelCloud delay={-3} duration={28} bottom={60} opacity={0.65} scale={0.6} flipped />
      <PixelCloud delay={-15} duration={32} bottom={70} opacity={0.75} scale={1.1} />
      <PixelCloud delay={-20} duration={38} bottom={80} opacity={0.85} scale={0.7} flipped />
      <PixelCloud delay={-10} duration={33} bottom={35} opacity={0.38} scale={1.3} />

      {/* Sun message in bottom right */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-white text-sm md:text-base font-normal pointer-events-none">
        <p className="text-right">In case you didn&apos;t look up today,<br />here&apos;s my little sky for you!!</p>
      </div>

      {/* <div
        className="absolute -bottom-7 md:-bottom-16 lg:-bottom-24 left-0 z-10 flex items-center justify-center pointer-events-none opacity-30"
      >
        <span className="text-[#072A8A] text-[60px] md:text-[120px] lg:text-[200px] font-bold tracking-wider select-none">
          BLUECODER
        </span>
      </div> */}
    </footer>
    </>
  );
};

export default Footer;
