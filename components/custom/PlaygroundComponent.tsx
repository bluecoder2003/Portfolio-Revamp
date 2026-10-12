"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type PlaygroundComponentProps = {
  className?: string;
  id: number;
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  mediaType?: "image" | "video";
  projectTitle?: string;
  projectDescription?: string;
  projectDate?: string;
  projectText?: string;
  tags?: string[];
  redirectLink?: string;
  onClick?: () => void;
};

const VideoPreview = ({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);

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
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {!hasFrame && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 animate-pulse"
          style={
            poster
              ? {
                  backgroundImage: `url(${poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
          aria-hidden="true"
        />
      )}
      <video
        ref={videoRef}
        src={isVisible ? src : undefined}
        poster={poster}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          hasFrame ? "opacity-100" : "opacity-0"
        )}
        autoPlay={isVisible}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setHasFrame(true)}
      />
    </div>
  );
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

const PlaygroundComponent = ({
  className,
  imageSrc,
  videoSrc,
  posterSrc,
  mediaType = "image",
  projectTitle,
  projectDescription,
  projectDate,
  projectText,
  tags,
  onClick,
}: PlaygroundComponentProps) => {
  const hasTextContent = projectTitle || projectDescription || projectDate;
  const hasMedia = imageSrc || videoSrc;

  return (
    <div
      className={cn(
        "relative flex flex-col flex-1 rounded-[10px] bg-white border border-[#E2E2E2] overflow-hidden",
        onClick ? "cursor-pointer" : "cursor-default",
        className
      )}
      onClick={onClick}
    >
      <MacChrome title={projectTitle} />

      {/* Media */}
      {hasMedia && (
        <div className="relative w-full flex-1 min-h-0 overflow-hidden">
          {mediaType === "video" && videoSrc ? (
            <VideoPreview
              src={videoSrc}
              poster={posterSrc}
              className="w-full h-full"
            />
          ) : imageSrc ? (
            <Image
              src={imageSrc}
              alt={projectDescription || "project media"}
              width={384}
              height={216}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
      )}

      {/* Text-only cards */}
      {!hasMedia && hasTextContent && (
        <div className="flex flex-col justify-start h-full px-6 py-8">
          <p className="font-normal text-lg md:text-xl text-black">
            {projectDescription}
          </p>
          {projectText && (
            <p
              className="font-normal mt-4 text-base text-gray-700"
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
    </div>
  );
};

export default PlaygroundComponent;
