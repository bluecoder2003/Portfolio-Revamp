"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Instrument_Serif } from "next/font/google";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";  

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
});

type ProjectComponentProps = {
  className?: string;
  imagePosition?: string;
  imageSrc?: string;
  projectTitle?: string;
  projectDescription?: string;
  projectDate?: string;
  hoverTextColor?: string;
  hoverArrowColor?: string;
  route?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: () => void;
};

const ProjectComponent = ({
  className,
  imagePosition,
  imageSrc,
  projectTitle,
  projectDescription,
  // projectDate,
  hoverTextColor,
  hoverArrowColor,
  // onMouseEnter,
  // onMouseLeave,
  onClick,
}: ProjectComponentProps & { hovered?: boolean }) => {
  return (
    <motion.div
      className={cn(
        "relative flex flex-col h-[454.5px] flex-1 rounded-[20px] bg-white cursor-pointer group transition-all duration-300 ease-out",
        className
      )}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      onClick={onClick}
      animate={{ boxShadow: "0 0px 0px rgba(0,0,0,0)" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 24,
        mass: 1,
        duration: 0.5,
        delay: 0.6,
      }}
    >
      <div className="flex justify-between items-start gap-4 pt-4 md:pt-8 px-4 md:px-8">
        <div className="flex flex-col gap-2">
          <h3 className="font-normal transition-all duration-300 ease-out text-xl">{projectTitle || "Gamify"}</h3>
          {/* {projectDescription && ( */}
            <p className={cn(
              "font-normal text-base md:text-lg transition-all duration-300 ease-out text-[#7C7C7C] leading-tight",
              hoverTextColor && `group-hover:${hoverTextColor}`
            )}>
              {projectDescription}
            </p>
          {/* )} */}
        </div>
        {/* <h3 className="font-normal text-base">{projectDate || "03/2025"}</h3> */}
        <div className="cursor-pointer" onClick={() => {}}>
          <div className="flex items-center justify-center bg-white border-4 border-[#E6E6E6] rounded-full p-2 transition-all duration-300 ease-out">
            <ArrowUpRight className={cn(
              "text-[#7C7C7C] w-10 h-10 transition-all duration-300 ease-out",
              `hover:${hoverArrowColor}`
            )} />
          </div>
        </div>
      </div>
      {imageSrc ? (
        imageSrc.endsWith('.lottie') ? (
          <div className={cn("absolute bottom-0 left-1/2 -translate-x-1/2", imagePosition)} style={{ width: '500px', height: '300px' }}>
            <DotLottieReact
              src={imageSrc}
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt="project image"
            width={384}
            height={216}
            className={cn("absolute bottom-0", imagePosition)}
          />
        )
      ) : (
        <div className="absolute -bottom-10 left-10 flex items-center justify-center h-[216px]">
          <p className={`${instrumentSerif.className} text-[40px] font-normal text-black`}>Coming Soon...</p>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectComponent;
