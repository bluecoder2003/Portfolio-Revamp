"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import HeroSection from "./HeroSection";
import { ModalProvider } from "../context/ModalContext";

// Import from the new motion/react package for better performance
import { motion, Variants, LazyMotion } from "motion/react";

// Import only the motion features we actually use
const loadFeatures = () => import("motion/react").then((res) => res.domMax);

// Lazy load non-critical sections to improve initial bundle size
const ProjectSection = dynamic(() => import("./ProjectSection"), {
  loading: () => (
    <div className="w-full h-64 bg-gray-100 animate-pulse rounded-2xl" />
  ),
});

const PersonSection = dynamic(() => import("./PersonSections"), {
  loading: () => (
    <div className="w-full h-64 bg-gray-100 animate-pulse rounded-2xl" />
  ),
});

const ConnectSection = dynamic(() => import("./ConnectSection"), {
  loading: () => (
    <div className="w-full h-64 bg-gray-100 animate-pulse rounded-2xl" />
  ),
});

const PlaygroundSection = dynamic(() => import("./PlaygroundSection"), {
  loading: () => (
    <div className="w-full h-64 bg-gray-100 animate-pulse rounded-2xl" />
  ),
});

const FooterSection = dynamic(() => import("./FooterSection"), {
  loading: () => (
    <div className="w-full h-16 bg-gray-50 animate-pulse rounded-2xl" />
  ),
});

const ModalWrapper = dynamic(() => import("../custom/ModalWrapper"), {
  ssr: false,
});

// Import ViewportLoader for additional optimization
const ViewportLoader = dynamic(() => import("../ui/viewport-loader"), {
  ssr: false,
});

type SectionType = "playground" | "projects" | "person" | "connect";

// Lightweight animation variants - much simpler than before
const lightVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1], // easeOut equivalent in cubic-bezier
    },
  },
};

const NavigationProvider = () => {
  const [activeSection, setActiveSection] = useState<SectionType>("projects");

  const handleNavigate = (section: string) => {
    setActiveSection(section as SectionType);
  };

  const renderSections = () => {
    const sections = {
      playground: (
        <div className="flex flex-col gap-[10px] w-full max-w-7xl mx-auto">
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroSection
              onNavigate={handleNavigate}
              currentSection="playground"
            />
          </motion.div>
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <ViewportLoader>
              <PlaygroundSection />
            </ViewportLoader>
          </motion.div>
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <FooterSection onNavigate={handleNavigate} />
          </motion.div>
        </div>
      ),
      projects: (
        <div className="flex flex-col gap-[10px] w-full max-w-7xl mx-auto">
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroSection
              onNavigate={handleNavigate}
              currentSection="projects"
            />
          </motion.div>
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <ViewportLoader>
              <ProjectSection />
            </ViewportLoader>
          </motion.div>
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <FooterSection onNavigate={handleNavigate} />
          </motion.div>
        </div>
      ),
      person: (
        <div className="flex flex-col gap-[10px] w-full max-w-7xl mx-auto">
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroSection onNavigate={handleNavigate} currentSection="person" />
          </motion.div>
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <ViewportLoader>
              <PersonSection />
            </ViewportLoader>
          </motion.div>
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <FooterSection onNavigate={handleNavigate} />
          </motion.div>
        </div>
      ),
      connect: (
        <div className="flex flex-col gap-[10px] w-full max-w-7xl mx-auto">
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroSection onNavigate={handleNavigate} currentSection="connect" />
          </motion.div>
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <ViewportLoader>
              <ConnectSection />
            </ViewportLoader>
          </motion.div>
          <motion.div
            variants={lightVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <FooterSection onNavigate={handleNavigate} />
          </motion.div>
        </div>
      ),
    };

    return sections[activeSection];
  };

  return (
    <LazyMotion features={loadFeatures}>
      <ModalProvider>
        <div className="h-fit flex items-center justify-center flex-col p-4 lg:p-[80px] gap-[10px] bg-[#E6E6E6]">
          {renderSections()}
        </div>
        <ModalWrapper />
      </ModalProvider>
    </LazyMotion>
  );
};

export default NavigationProvider;
