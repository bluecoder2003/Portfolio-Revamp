"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minimize2 } from "lucide-react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1D1D1D]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#FFF2E9] rounded-[20px] max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
                <h2 className="text-xl md:text-4xl lg:text-[58px] font-normal text-[#1E2F2D] mb-4 md:mb-0">
                  CONCEPT
                </h2>
                <p className="text-base lg:text-lg text-[#1E2F2D] max-w-[300px] leading-tight mb-0 lg:mb-4">
                  Design a holographic logo for a casual restaurant in Italy
                </p>
              </div>

              <div className="mb-8 hidden md:block">
                <Image
                  src="/luce-web.png"
                  alt="Holographic Logo"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="mb-8 md:hidden flex flex-col justify-center items-center">
                <Image
                  src="/luce-mobile.png"
                  alt="Holographic Logo"
                  width={800}
                  height={800}
                  className="w-3/4 h-auto mb-6"
                />
                <div className="w-full max-w-sm">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 justify-start">
                      <div className="w-3 h-3 bg-[#A4A145]/20 border border-dotted border-[#A4A145] rounded-full flex-shrink-0"></div>
                      <span className="text-base text-[#1E2F2D]">Luce — Italian for &quot;light&quot;</span>
                    </li>
                    <li className="flex items-center gap-3 justify-start">
                      <div className="w-3 h-3 bg-[#9D63E0]/20 border border-dotted border-[#9D63E0] rounded-full flex-shrink-0"></div>
                      <span className="text-base text-[#1E2F2D]">Grapes evoke vineyards and home</span>
                    </li>
                    <li className="flex items-center gap-3 justify-start">
                      <div className="w-3 h-3 bg-[#F893F9]/20 border border-dotted border-[#F893F9] rounded-full flex-shrink-0"></div>
                      <span className="text-base text-[#1E2F2D]">Wine glass means connection and warmth</span>
                    </li>
                    <li className="flex items-center gap-3 justify-start">
                      <div className="w-3 h-3 bg-[#7F3129]/20 border border-dotted border-[#7F3129] rounded-full flex-shrink-0"></div>
                      <span className="text-base text-[#1E2F2D]">Tabletop suggests tradition and elegance</span>
                    </li>
                    <li className="flex items-center gap-3 justify-start">
                      <div className="w-3 h-3 bg-[#1E2F2D]/20 border border-dotted border-[#1E2F2D] rounded-full flex-shrink-0"></div>
                      <span className="text-base text-[#1E2F2D]">Holographic light adds magic and play</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="p-2 lg:p-4 rounded-full bg-[#222222] hover:bg-[#333333] transition-colors"
                >
                  <Minimize2
                    className="w-6 h-6 lg:w-8 lg:h-8 text-[#FFF2E9]"
                    strokeWidth={1}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
