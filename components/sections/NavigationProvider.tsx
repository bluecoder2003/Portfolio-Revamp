'use client'

import { useState, useRef } from 'react'
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
      staggerChildren: 0.02, // Even faster staggering for smoother feel
      delayChildren: 0.05,   // Minimal delay for immediate start
      ease: "easeOut"        // Smoother easing
    }
  }
}

// Individual card animation variant
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,           // Minimal movement to reduce jitter
    scale: 0.99      // Minimal scale change for smoother feel
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,  // Faster animation for smoother feel
      ease: "easeOut", // Smoother easing
      type: "tween"   // Use tween for more predictable animations
    }
  }
}

const NavigationProvider = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('projects')
  
  // Create refs for each main section component
  const playgroundRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const personRef = useRef<HTMLDivElement>(null)
  const connectRef = useRef<HTMLDivElement>(null)

  const handleNavigate = (section: string) => {
    const newSection = section as SectionType
    
    // If clicking on the same section, scroll to the section component
    if (newSection === activeSection) {
      const refs = {
        playground: playgroundRef,
        projects: projectsRef,
        person: personRef,
        connect: connectRef
      }
      
      const targetRef = refs[newSection]
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        })
      }
    } else {
      // Otherwise, just change the section
      setActiveSection(newSection)
    }
  }

  // Animation variants for section transitions
  const sectionVariants = {
    initial: { 
      opacity: 0, 
      y: 10,          // Minimal movement to reduce jitter
      scale: 0.99     // Minimal scale change for smoother feel
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3  // Faster transition for smoother feel
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,         // Minimal movement to reduce jitter
      scale: 0.99,    // Minimal scale change
      transition: {
        duration: 0.2  // Faster exit for smoother feel
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
              <motion.div variants={cardVariants} ref={playgroundRef}>
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
              <motion.div variants={cardVariants} ref={projectsRef}>
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
              <motion.div variants={cardVariants} ref={personRef}>
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
              <motion.div variants={cardVariants} ref={connectRef}>
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