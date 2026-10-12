'use client'

import { ReactNode } from 'react'
import HeroSection from './HeroSection'
import FooterSection from './FooterSection'
import { motion } from 'framer-motion'
import { ModalProvider } from '../context/ModalContext'
import ModalWrapper from '../custom/ModalWrapper'

interface PageLayoutProps {
  currentSection: string
  children: ReactNode
}

export default function PageLayout({ currentSection, children }: PageLayoutProps) {
  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col bg-[#F5F4F2]">
        <HeroSection currentSection={currentSection} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-col gap-[10px] px-4 lg:px-[40px] pb-[10px] w-full max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
        <div className="px-4 lg:px-[40px] pb-4 lg:pb-[40px] w-full max-w-7xl mx-auto">
          <FooterSection />
        </div>
      </div>
      <ModalWrapper />
    </ModalProvider>
  )
}
