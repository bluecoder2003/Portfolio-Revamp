'use client'

import { useState } from 'react'
import HeroSection from './HeroSection'
import ProjectSection from './ProjectSection'
import PersonSection from './PersonSections'
import ConnectSection from './ConnectSection'
import PlaygroundSection from './PlaygroundSection'
import FooterSection from './FooterSection'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ModalProvider } from '../context/ModalContext'
import ModalWrapper from '../custom/ModalWrapper'

type SectionType = 'playground' | 'projects' | 'person' | 'connect'

// Container animation variant (for staggering children)
const containerVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Reduced from 0.1 to 0.05 for faster staggering
      delayChildren: 0.1     // Reduced from 0.2 to 0.1 for quicker start
    }
  }
}

// Individual card animation variant
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,           // Reduced from 60 to 40 for subtler movement
    scale: 0.98      // Increased from 0.95 to 0.98 for less dramatic scale
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,  // Reduced from 0.8 to 0.6 for faster animation
      ease: [0.25, 0.46, 0.45, 0.94], // Smoother easing curve
      type: "spring",
      stiffness: 120,  // Increased stiffness for snappier feel
      damping: 20      // Increased damping for less bounce
    }
  }
}

const NavigationProvider = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('projects')

  const handleNavigate = (section: string) => {
    setActiveSection(section as SectionType)
  }

  // Animation variants for section transitions
  const sectionVariants = {
    initial: { 
      opacity: 0, 
      y: 15,          // Reduced from 20 to 15 for subtler movement
      scale: 0.98     // Increased from 0.95 to 0.98 for less dramatic scale
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4  // Reduced from 0.1 to 0.4 for smoother transition
      }
    },
    exit: { 
      opacity: 0, 
      y: -15,         // Reduced from -20 to -15 for subtler movement
      scale: 0.98,    // Increased from 0.95 to 0.98
      transition: {
        duration: 0.3  // Reduced from 0.15 to 0.3 for faster exit
      }
    }
  }

  const renderSections = () => {
    const sections = {
      playground: (
        <AnimatePresence mode="wait">
          <motion.div
            key="playground"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={sectionVariants}
            className="flex flex-col gap-[10px] w-full max-w-7xl mx-auto"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-[10px] w-full"
            >
              <motion.div variants={cardVariants}>
                <HeroSection onNavigate={handleNavigate} currentSection="playground" />
              </motion.div>
              <motion.div variants={cardVariants}>
                <PlaygroundSection />
              </motion.div>
              <motion.div variants={cardVariants}>
                <FooterSection onNavigate={handleNavigate} />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ),
      projects: (
        <AnimatePresence mode="wait">
          <motion.div
            key="projects"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={sectionVariants}
            className="flex flex-col gap-[10px] w-full max-w-7xl mx-auto"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-[10px] w-full"
            >
              <motion.div variants={cardVariants}>
                <HeroSection onNavigate={handleNavigate} currentSection="projects" />
              </motion.div>
              <motion.div variants={cardVariants}>
                <ProjectSection />
              </motion.div>
              <motion.div variants={cardVariants}>
                <FooterSection onNavigate={handleNavigate} />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ),
      person: (
        <AnimatePresence mode="wait">
          <motion.div
            key="person"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={sectionVariants}
            className="flex flex-col gap-[10px] w-full max-w-7xl mx-auto"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-[10px] w-full"
            >
              <motion.div variants={cardVariants}>
                <HeroSection onNavigate={handleNavigate} currentSection="person" />
              </motion.div>
              <motion.div variants={cardVariants}>
                <PersonSection />
              </motion.div>
              <motion.div variants={cardVariants}>
                <FooterSection onNavigate={handleNavigate} />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ),
      connect: (
        <AnimatePresence mode="wait">
          <motion.div
            key="connect"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={sectionVariants}
            className="flex flex-col gap-[10px] w-full max-w-7xl mx-auto"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-[10px] w-full"
            >
              <motion.div variants={cardVariants}>
                <HeroSection onNavigate={handleNavigate} currentSection="connect" />
              </motion.div>
              <motion.div variants={cardVariants}>
                <ConnectSection />
              </motion.div>
              <motion.div variants={cardVariants}>
                <FooterSection onNavigate={handleNavigate} />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ),
    }

    return sections[activeSection]
  }

  return (
    <ModalProvider>
      <div className="h-fit flex items-center justify-center flex-col p-4 lg:p-[80px] gap-[10px] bg-[#E6E6E6]">
        {renderSections()}
      </div>
      <ModalWrapper />
    </ModalProvider>
  )
}

export default NavigationProvider 