"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
type ProjectComponentProps = {
  className?: string;
  imagePosition?: string;
  imageSrc?: string;
  projectTitle?: string;
  projectDate?: string;
};
const ProjectComponent = ({
  className,
  imagePosition,
  imageSrc,
  projectTitle,
  projectDate,
}: ProjectComponentProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[454.5px] flex-1 rounded-[20px] bg-white hover:bg-[#DD3418] cursor-pointer transition-all duration-300",
        className
      )}
    >
      <div className="flex justify-between items-center pt-8 px-8">
        <h3 className="font-normal text-base">
          DESIGN: {projectTitle || "Gamify"}
        </h3>
        <h3 className="font-normal text-base">{projectDate || "03/2025"}</h3>
      </div>
      <Image
        src={imageSrc || "/FlintDashboard.webp"}
        alt="flint dashboard"
        width={384}
        height={216}
        className={cn("absolute bottom-0", imagePosition)}
      />
      <div
        className="absolute bottom-8 right-8 cursor-pointer"
        onClick={() => {}}
      >
        <Image src={"/ArrowTopRight.webp"} alt="arrow" width={24} height={24} />
      </div>
    </div>
  );
};

export default ProjectComponent;
