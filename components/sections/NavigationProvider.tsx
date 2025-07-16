'use client'

import { useState } from 'react'
import HeroSection from './HeroSection'
import ProjectSection from './ProjectSection'
import PersonSection from './PersonSections'
import ConnectSection from './ConnectSection'
import PlaygroundSection from './PlaygroundSection'
import FooterSection from './FooterSection'
import AnimatedSection from '../ui/animated-section'
import { motion, AnimatePresence } from 'framer-motion'

type SectionType = 'playground' | 'projects' | 'person' | 'connect'

const NavigationProvider = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('playground')

  const handleNavigate = (section: string) => {
    setActiveSection(section as SectionType)
  }

  // Animation variants for section transitions
  const sectionVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3
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
            className="flex flex-col gap-[10px]"
          >
            <AnimatedSection delay={0.1}>
              <HeroSection onNavigate={handleNavigate} currentSection="playground" />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <PlaygroundSection />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <FooterSection onNavigate={handleNavigate} />
            </AnimatedSection>
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
            className="flex flex-col gap-[10px]"
          >
            <AnimatedSection delay={0.1}>
              <HeroSection onNavigate={handleNavigate} currentSection="projects" />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <ProjectSection />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <FooterSection onNavigate={handleNavigate} />
            </AnimatedSection>
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
            className="flex flex-col gap-[10px]"
          >
            <AnimatedSection delay={0.1}>
              <HeroSection onNavigate={handleNavigate} currentSection="person" />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <PersonSection />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <FooterSection onNavigate={handleNavigate} />
            </AnimatedSection>
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
            className="flex flex-col gap-[10px]"
          >
            <AnimatedSection delay={0.1}>
              <HeroSection onNavigate={handleNavigate} currentSection="connect" />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <ConnectSection />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <FooterSection onNavigate={handleNavigate} />
            </AnimatedSection>
          </motion.div>
        </AnimatePresence>
      ),
    }

    return sections[activeSection]
  }

  return (
    <div className="h-fit flex items-center justify-center flex-col p-4 lg:p-[80px] gap-[10px] bg-[#E6E6E6]">
      {renderSections()}
    </div>
  )
}

export default NavigationProvider 