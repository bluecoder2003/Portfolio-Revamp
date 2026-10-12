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

const MacChrome = ({ title }: { title?: string }) => (
  <div className="flex items-center gap-[6px] px-3 py-[7px] bg-[#F0EFEF] border-b border-[#E2E2E2] flex-shrink-0">
    <span className="w-3 h-3 rounded-full bg-[#FF5F57] flex-shrink-0" />
    <span className="w-3 h-3 rounded-full bg-[#FEBC2E] flex-shrink-0" />
    <span className="w-3 h-3 rounded-full bg-[#28C840] flex-shrink-0" />
    {title && (
      <span className="ml-2 text-[11px] text-[#999] font-normal truncate">
        {title}
      </span>
    )}
  </div>
);

const ProjectComponent = ({
  className,
  imageSrc,
  projectTitle,
  projectDescription,
  tags,
  onClick,
}: ProjectComponentProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col flex-1 rounded-[10px] bg-white border border-[#E2E2E2] overflow-hidden cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <MacChrome title={projectTitle} />

      {imageSrc && (
        <div className="relative w-full flex-1 min-h-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={projectDescription || "project media"}
            width={600}
            height={400}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

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
