"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ProjectComponentProps = {
  className?: string;
  imageSrc?: string;
  projectTitle?: string;
  projectDescription?: string;
  projectDate?: string;
  tags?: string[];
  onClick?: () => void;
};

const ProjectComponent = ({
  className,
  imageSrc,
  projectDescription,
  tags,
  onClick,
}: ProjectComponentProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col flex-1 rounded-[16px] bg-white group overflow-hidden cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Media section on top */}
      {imageSrc && (
        <div
          className="relative w-full flex-1 min-h-0 overflow-hidden rounded-[10px] m-[6px]"
          style={{ width: "calc(100% - 12px)" }}
        >
          <Image
            src={imageSrc}
            alt={projectDescription || "project media"}
            width={600}
            height={400}
            className="w-full h-full object-cover object-center rounded-[10px]"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Tags section at bottom */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 py-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1.5 text-xs md:text-sm text-[#555] bg-white border border-[#e0e0e0] rounded-full whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectComponent;
