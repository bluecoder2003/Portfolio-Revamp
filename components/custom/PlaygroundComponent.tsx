"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

type PlaygroundComponentProps = {
  className?: string;
  id: number;
  imageSrc?: string;
  videoSrc?: string;
  mediaType?: "image" | "video";
  projectTitle?: string;
  projectDescription?: string;
  projectDate?: string;
  projectText?: string;
  tags?: string[];
  redirectLink?: string;
  onClick?: () => void;
};

const VideoPreview = ({ src, className }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={isVisible ? src : undefined}
      className={className}
      autoPlay={isVisible}
      muted
      loop
      playsInline
      preload="none"
    />
  );
};

const PlaygroundComponent = ({
  className,
  id,
  imageSrc,
  videoSrc,
  mediaType = "image",
  projectTitle,
  projectDescription,
  projectDate,
  projectText,
  tags,
  onClick,
}: PlaygroundComponentProps) => {
  const { theme } = useTheme();
  const isBlue = theme === 'blue';
  const hasTextContent = projectTitle || projectDescription || projectDate;
  const hasMedia = imageSrc || videoSrc;

  return (
    <div
      className={cn(
        "relative flex flex-col flex-1 rounded-[20px] group overflow-hidden transition-colors duration-500",
        isBlue ? "bg-[#093FB4]" : "bg-white",
        onClick ? "cursor-pointer" : "cursor-default",
        className
      )}
      onClick={onClick}
    >
      {/* Media section on top */}
      {hasMedia && (
        <div
          className="relative w-full flex-1 min-h-0 overflow-hidden rounded-[20px] m-[6px]"
          style={{ width: "calc(100% - 12px)" }}
        >
          {mediaType === "video" && videoSrc ? (
            <VideoPreview
              src={videoSrc}
              className="w-full h-full object-cover rounded-[14px]"
            />
          ) : imageSrc ? (
            <Image
              src={imageSrc}
              alt={projectDescription || "project media"}
              width={384}
              height={216}
              className="w-full h-full object-cover rounded-[14px]"
              loading="lazy"
            />
          ) : null}
        </div>
      )}

      {/* Text-only cards (no media) */}
      {!hasMedia && hasTextContent && (
        <div className="flex flex-col justify-start h-full px-6 py-8">
          {/* <div className="flex justify-between items-start w-full mb-2">
            <h3 className="font-normal text-sm md:text-base text-[#3d3d3d]">
              {projectTitle}
            </h3>
            <h3 className="font-normal text-sm md:text-base text-[#3d3d3d]">
              {projectDate}
            </h3>
          </div> */}
          <p className={cn("font-normal text-lg md:text-xl transition-colors duration-500", isBlue ? "text-white" : "text-black")}>
            {projectDescription}
          </p>
          {projectText && (
            <p
              className={cn("font-normal mt-4 text-base transition-colors duration-500", isBlue ? "text-white/70" : "text-gray-700")}
              dangerouslySetInnerHTML={{ __html: projectText }}
            />
          )}
          <div className="flex items-end justify-start mt-8">
            <button
              className="bg-gray-800 text-white px-4 py-3 rounded-sm flex items-center gap-2 hover:bg-gray-700 transition-colors h-[40px]"
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  "https://www.ridiculous.design/ridiculous-shots",
                  "_blank"
                );
              }}
            >
              <span className="text-base">Visit the wall of shame</span>
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center p-1">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Tags section at bottom */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 py-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={cn("px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors duration-500", isBlue ? "text-white/70 bg-white/10 border border-white/20" : "text-[#555] bg-white border border-[#e0e0e0]")}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaygroundComponent;
