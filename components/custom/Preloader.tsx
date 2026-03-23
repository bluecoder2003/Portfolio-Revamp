'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'

const useGlitchText = (finalText: string, startDelay = 500) => {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)

  const scramble = useCallback(() => {
    let iteration = 0
    const length = finalText.length

    const interval = setInterval(() => {
      setDisplay(
        finalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration) return finalText[i]
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')
      )

      iteration += 1 / 3

      if (iteration >= length) {
        clearInterval(interval)
        setDisplay(finalText)
        setDone(true)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [finalText])

  useEffect(() => {
    const timer = setTimeout(scramble, startDelay)
    return () => clearTimeout(timer)
  }, [scramble, startDelay])

  return { display, done }
}

const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
  const [isVisible, setIsVisible] = useState(true)

  const line1 = useGlitchText('welcome to', 400)
  const line2 = useGlitchText('a glimpse of', 900)
  const line3 = useGlitchText('my life', 1400)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#093FB4' }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
            }}
          />

          {/* TV container */}
          <motion.div
            className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* TV image */}
            <Image
              src="/tv.png"
              alt="TV"
              fill
              className="object-contain z-20 relative pointer-events-none"
              priority
            />

            {/* Screen content area — positioned to fit inside the TV screen */}
            <div
              className="absolute z-10 flex flex-col items-center justify-center overflow-hidden"
              style={{
                top: '12%',
                left: '14%',
                width: '62%',
                height: '42%',
                backgroundColor: '#0a0a12',
              }}
            >
              {/* CRT scanline effect on screen */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)',
                }}
              />

              {/* Flicker overlay */}
              <motion.div
                className="absolute inset-0 bg-white pointer-events-none"
                animate={{ opacity: [0, 0.03, 0, 0.02, 0, 0.04, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />

              {/* Glitch text */}
              <div className="relative z-10 flex flex-col items-center gap-1 px-3">
                <motion.p
                  className="text-[11px] md:text-[15px] tracking-[0.15em] uppercase text-green-400"
                  style={{ fontFamily: "'Neue Montreal', monospace", textShadow: '0 0 8px rgba(74, 222, 128, 0.5)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {line1.display}
                </motion.p>
                <motion.p
                  className="text-[11px] md:text-[15px] tracking-[0.15em] uppercase text-green-400"
                  style={{ fontFamily: "'Neue Montreal', monospace", textShadow: '0 0 8px rgba(74, 222, 128, 0.5)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {line2.display}
                </motion.p>
                <motion.p
                  className="text-[13px] md:text-[18px] tracking-[0.15em] uppercase text-green-300 font-bold"
                  style={{ fontFamily: "'Neue Montreal', monospace", textShadow: '0 0 12px rgba(74, 222, 128, 0.7)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  {line3.display}
                </motion.p>

                {/* Blinking cursor */}
                {line3.done && (
                  <motion.span
                    className="block w-[8px] h-[2px] bg-green-400 mt-2"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
