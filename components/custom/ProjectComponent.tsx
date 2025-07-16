"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type ProjectComponentProps = {
  className?: string;
  imagePosition?: string;
  imageSrc?: string;
  projectTitle?: string;
  projectDescription?: string;
  projectDate?: string;
  hoverTextColor?: string;
  hoverArrowColor?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
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
  onMouseEnter,
  onMouseLeave,
}: ProjectComponentProps & { hovered?: boolean }) => {
  return (
    <motion.div
      className={cn(
        "relative flex flex-col h-[454.5px] flex-1 rounded-[20px] bg-[#F5F5F5] cursor-pointer group",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
          <h3 className="font-normal transition-colors duration-300 text-xl">{projectTitle || "Gamify"}</h3>
          {/* {projectDescription && ( */}
            <p className={cn(
              "font-normal text-lg transition-colors duration-300 text-[#7C7C7C]",
              hoverTextColor && `group-hover:${hoverTextColor}`
            )}>
              {projectDescription}
            </p>
          {/* )} */}
        </div>
        {/* <h3 className="font-normal text-base">{projectDate || "03/2025"}</h3> */}
        <div className="cursor-pointer" onClick={() => {}}>
          <div className="flex items-center justify-center bg-[#F5F5F5] border-4 border-[#E6E6E6] rounded-full p-2">
            <ArrowUpRight className={cn(
              "text-[#7C7C7C] w-10 h-10 transition-colors duration-300",
              `hover:${hoverArrowColor}`
            )} />
          </div>
        </div>
      </div>
      <Image
        src={imageSrc || "/FlintDashboard.webp"}
        alt="flint dashboard"
        width={384}
        height={216}
        className={cn("absolute bottom-0", imagePosition)}
      />
    </motion.div>
  );
};

export default ProjectComponent;
