"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variants?: Variants;
}

const AnimatedSection = ({
  children,
  delay = 0,
  className = "",
  variants,
}: AnimatedSectionProps) => {
  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.34, 1.56, 0.64, 1], // Custom spring easing for slight bounce
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      initial="hidden"
      animate="visible"
      className={`${className} w-full`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
