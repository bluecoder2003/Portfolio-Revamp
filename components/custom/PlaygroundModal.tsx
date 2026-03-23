"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

interface PlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: number;
  title?: string;
  description?: string;
  text?: string;
  videoSrc?: string;
  imageSrc?: string;
  mediaType?: "image" | "video";
  redirectLink?: string;
}

const PlaygroundModal: React.FC<PlaygroundModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  text,
  videoSrc,
  imageSrc,
  mediaType,
  redirectLink,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const hasMedia = videoSrc || imageSrc;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-white rounded-[24px] inline-flex flex-col max-w-[90vw] md:max-w-3xl max-h-[90vh] overflow-hidden relative pointer-events-auto will-change-transform"
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.2 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5 text-black" />
              </motion.button>

              {/* Media */}
              {hasMedia && (
                <div className="relative m-3 mb-0">
                  {mediaType === "video" && videoSrc ? (
                    <video
                      src={videoSrc}
                      className="w-full h-auto max-h-[65vh] rounded-[16px] object-contain"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={description || "project media"}
                      width={1200}
                      height={800}
                      className="w-full h-auto max-h-[65vh] rounded-[16px] object-contain"
                    />
                  ) : null}

                  {/* Visit button overlaid on bottom-right of media */}
                  {redirectLink && (
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.2 }}
                      onClick={() => window.open(redirectLink, "_blank")}
                      className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-4 py-2 bg-[#222] text-white rounded-full hover:bg-[#333] transition-colors text-sm font-medium shadow-lg"
                    >
                      Visit
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              )}

              {/* Title & description */}
              {(title || description) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.25 }}
                  className="px-5 py-4"
                >
                  {description && (
                    <h3 className="text-base font-normal text-black">
                      {description}
                    </h3>
                  )}
                  {text ? (
                    <p
                      className="text-sm text-gray-500 mt-1"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  ) : title && (
                    <p className="text-sm text-gray-500 mt-1">
                      {title}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PlaygroundModal;
