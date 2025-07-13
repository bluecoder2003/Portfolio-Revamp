"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedSection = ({
  children,
  delay = 0,
  className = "",
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        rotateX: 15,
        transformPerspective: 1000,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        transformPerspective: 1000,
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth motion
      }}
      className={`${className} w-full`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
