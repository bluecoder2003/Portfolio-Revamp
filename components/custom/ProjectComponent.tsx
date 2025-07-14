"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
type ProjectComponentProps = {
  className?: string;
  imagePosition?: string;
  imageSrc?: string;
  projectTitle?: string;
  projectDescription?: string;
  projectDate?: string;
};
const ProjectComponent = ({
  className,
  imagePosition,
  imageSrc,
  projectTitle,
  projectDescription,
  projectDate,
}: ProjectComponentProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[454.5px] flex-1 rounded-[20px] bg-[#F5F5F5] hover:bg-[#f5f5f5] cursor-pointer transition-all duration-300",
        className
      )}
    >
      <div className="flex justify-between items-start pt-8 px-8">
        <div className="flex flex-col gap-2">
        <h3 className="font-normal text-base">
          {projectTitle || "Gamify"}
        </h3>
        {projectDescription && (
          <p className="font-normal text-2xl">{projectDescription}</p>
        )}
        </div>
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
        <div className="flex items-center justify-center">
              <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center">
                <ArrowUpRight className="text-white w-6 h-6" />
              </div>
            </div>
      </div>
    </div>
  );
};

export default ProjectComponent;
