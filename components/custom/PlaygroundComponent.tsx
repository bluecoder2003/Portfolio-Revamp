"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, Maximize2 } from "lucide-react";

type PlaygroundComponentProps = {
  className?: string;
  imagePosition?: string;
  imageSrc?: string;
  videoSrc?: string;
  mediaType?: "image" | "video";
  projectTitle?: string;
  projectDescription?: string;
  projectDate?: string;
  projectText?: string;
  showMaximizeButton?: boolean;
  showRedirectButton?: boolean;
  redirectLink?: string;
  onMaximizeClick?: () => void;
};

const PlaygroundComponent = ({
  className,
  imageSrc,
  videoSrc,
  mediaType = "image",
  projectTitle,
  projectDescription,
  projectDate,
  projectText,
  showMaximizeButton = false,
  showRedirectButton = false,
  redirectLink,
  onMaximizeClick,
}: PlaygroundComponentProps & { hovered?: boolean }) => {
  const hasTextContent = projectTitle || projectDescription || projectDate;
  const hasMedia = imageSrc || videoSrc;

  return (
    <motion.div
      className={cn(
        "relative flex flex-col h-[454.5px] flex-1 rounded-[20px] bg-white cursor-pointer group",
        className
      )}
    >
      {hasTextContent && (
        <div
          className={cn(
            "flex justify-between items-start gap-4 pt-4 md:pt-8 px-4 md:px-8",
            !hasMedia && "h-full flex-col justify-center"
          )}
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center w-full">
              <h3 className="font-normal transition-colors duration-300 text-sm md:text-base text-[#3d3d3d]">
                {projectTitle}
              </h3>
              <h3 className="font-normal text-sm md:text-base text-[#3d3d3d]">
                {projectDate}
              </h3>
            </div>

            <p
              className={cn(
                "font-normal text-lg md:text-xl transition-colors duration-300 text-black"
              )}
            >
              {projectDescription}
            </p>
            <p
              className="font-normal mt-8 text-lg text-gray-700"
              dangerouslySetInnerHTML={{ __html: projectText || "" }}
            />
          </div>
          {/* <h3 className="font-normal text-base text-[#3d3d3d]">{projectDate}</h3> */}

          {!hasMedia && (
            <div className="flex items-end justify-center mb-8 h-[350px]">
              <button
                className="bg-gray-800 text-white px-4 py-3 rounded-sm flex items-center gap-2 hover:bg-gray-700 transition-colors h-[40px]"
                onClick={() =>
                  window.open(
                    "https://www.ridiculous.design/ridiculous-shots",
                    "_blank"
                  )
                }
              >
                <span className="text-base">Visit the wall of shame</span>
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center p-1">
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </div>
              </button>
            </div>
          )}
        </div>
      )}
      {(imageSrc || videoSrc) && (
        <div
          className={cn(
            "w-full h-full overflow-hidden",
            hasTextContent ? "pt-4 px-4 md:px-8 pb-4 md:pb-8" : "w-full h-full"
          )}
        >
          {mediaType === "video" && videoSrc ? (
            <video
              src={videoSrc}
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : imageSrc ? (
            <Image
              src={imageSrc}
              alt="project media"
              width={384}
              height={216}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : null}
          {showMaximizeButton && (
            <div className="absolute md:bottom-4 md:right-4 right-2 bottom-2 z-10">
              <button
                className="p-2 lg:p-4 rounded-full bg-[#222222] hover:bg-[#333333] transition-colors"
                onClick={
                  onMaximizeClick || (() => window.open(imageSrc, "_blank"))
                }
              >
                <Maximize2
                  className="w-6 h-6 lg:w-8 lg:h-8 text-[#FFF2E9]"
                  strokeWidth={1}
                />
              </button>
            </div>
          )}
          {showRedirectButton && (
            <div className="absolute md:bottom-4 md:right-4 right-2 bottom-2 z-10">
              <button
                className="p-2 lg:p-4 rounded-full bg-[#222222] hover:bg-[#333333] transition-colors"
                onClick={() => window.open(redirectLink, "_blank")}
              >
                <ArrowUpRight
                  className="w-6 h-6 lg:w-8 lg:h-8 text-[#FFF2E9]"
                  strokeWidth={1}
                />
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default PlaygroundComponent;
