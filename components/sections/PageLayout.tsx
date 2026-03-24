'use client'

import { ReactNode } from 'react'
import HeroSection from './HeroSection'
import FooterSection from './FooterSection'
import { motion, Variants } from 'framer-motion'
import { ModalProvider } from '../context/ModalContext'
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import ModalWrapper from '../custom/ModalWrapper'
import ThemeToggle from '../custom/ThemeToggle'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.05,
      ease: "easeOut"
    }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.99 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: "easeOut", type: "tween" }
  }
}

interface PageLayoutProps {
  currentSection: string
  children: ReactNode
}

function PageLayoutInner({ currentSection, children }: PageLayoutProps) {
  const { theme } = useTheme()
  const isBlue = theme === 'blue'

  return (
    <div className={`h-fit flex items-center justify-center flex-col p-4 lg:p-[80px] gap-[10px] transition-colors duration-500 ${isBlue ? 'bg-[#072A8A]' : 'bg-[#E6E6E6]'}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-[10px] w-full max-w-7xl mx-auto"
      >
        {/* Theme toggle above hero */}
        <div className="flex justify-end w-full">
          <ThemeToggle />
        </div>
        <motion.div variants={cardVariants}>
          <HeroSection currentSection={currentSection} />
        </motion.div>
        <motion.div variants={cardVariants}>
          {children}
        </motion.div>
        <motion.div variants={cardVariants}>
          <FooterSection />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function PageLayout({ currentSection, children }: PageLayoutProps) {
  return (
    <ThemeProvider>
      <ModalProvider>
        <PageLayoutInner currentSection={currentSection}>{children}</PageLayoutInner>
        <ModalWrapper />
      </ModalProvider>
    </ThemeProvider>
  )
}
