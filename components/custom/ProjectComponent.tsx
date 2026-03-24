"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import { useTheme } from "../context/ThemeContext";

// Dynamic import for Lottie to avoid SSR issues
const DotLottieReact = React.lazy(() =>
  import("@lottiefiles/dotlottie-react").then(module => ({
    default: module.DotLottieReact
  }))
);

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: "italic",
  display: "swap",
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
  const [isClient, setIsClient] = React.useState(false);
  const { theme } = useTheme();
  const isBlue = theme === 'blue';

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div
      className={cn(
        "relative flex flex-col h-[454.5px] flex-1 rounded-[20px] cursor-pointer group transition-all duration-300 ease-out",
        isBlue ? "bg-[#093FB4]" : "bg-white",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start gap-4 pt-4 md:pt-8 px-4 md:px-8">
        <div className="flex flex-col gap-2">
          <h3 className={cn("font-normal transition-all duration-300 ease-out text-xl", isBlue ? "text-white" : "text-black")}>{projectTitle || "Gamify"}</h3>
          {/* {projectDescription && ( */}
            <p className={cn(
              "font-normal text-base md:text-lg transition-all duration-300 ease-out leading-tight",
              isBlue ? "text-white/60" : "text-[#7C7C7C]",
              hoverTextColor && `group-hover:${hoverTextColor}`
            )}>
              {projectDescription}
            </p>
          {/* )} */}
        </div>
        {/* <h3 className="font-normal text-base">{projectDate || "03/2025"}</h3> */}
        <div className="cursor-pointer" onClick={() => {}}>
          <div className={cn("flex items-center justify-center border-2 rounded-full p-2 transition-all duration-300 ease-out", isBlue ? "bg-white/10 border-white/20" : "bg-white border-[#E6E6E6]")}>
            <ArrowUpRight className={cn(
              "lg:w-8 lg:h-8 md:w-6 md:h-6 w-5 h-5 transition-all duration-300 ease-out",
              isBlue ? "text-white/60" : "text-[#7C7C7C]",
              `hover:${hoverArrowColor}`
            )} />
          </div>
        </div>
      </div>
      {imageSrc ? (
        imageSrc.endsWith('.lottie') ? (
          <div 
            className={cn("absolute bottom-0 left-1/2 -translate-x-1/2", imagePosition)} 
            style={{ width: '500px', height: '300px' }}
          >
            {isClient ? (
              <Suspense fallback={
                <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              }>
                <DotLottieReact
                  src={imageSrc}
                  loop
                  autoplay
                  style={{ width: '100%', height: '100%' }}
                />
              </Suspense>
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ) : (
            <Image
              src={imageSrc}
              alt="project image"
              width={500}
              height={300}
              className={cn("absolute bottom-0 left-1/2 -translate-x-1/2", imagePosition)}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
        )
      ) : (
        <div className="absolute -bottom-10 left-10 flex items-center justify-center h-[216px]">
          <p className={`${instrumentSerif.className} text-[40px] font-normal text-black`}>Coming Soon...</p>
        </div>
      )}
    </div>
  );
};

export default ProjectComponent;
