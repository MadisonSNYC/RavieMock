/**
 * Premium Intro Sequence Component - Refactored
 * 5-second animation sequence
 * 
 * Timeline:
 * 0-1600ms: Mosaic tiles reveal
 * 1600-2400ms: Left slide to black
 * 2400-2500ms: Brief pause
 * 2500-4400ms: "25 Million Views. And Counting." with logo
 * 4400-5000ms: Final reveal
 */

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntroState } from './useIntroState'
import MosaicGrid from './MosaicGrid'
import SecondaryContent from './SecondaryContent'
import WordCycle from './WordCycle'
import DebugProgress from './DebugProgress'
import { TIMELINE, WORD_CYCLE_CONFIG } from './constants'
import './intro.css'

export default function IntroSequence({ onComplete }) {
  const { shouldPlay, markAsCompleted, isReducedMotion } = useIntroState()
  const [currentTime, setCurrentTime] = useState(0)
  const [isVisible, setIsVisible] = useState(shouldPlay)
  const animationFrame = useRef()
  const startTime = useRef()
  const containerRef = useRef()

  // Lock body scroll when intro is active
  useEffect(() => {
    if (shouldPlay && isVisible) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [shouldPlay, isVisible])

  // Handle completion
  const handleComplete = useCallback(() => {
    markAsCompleted()
    
    // Start exit animation
    setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = ''
      onComplete?.()
      
      // Transfer focus to main content
      const mainHeading = document.querySelector('h1:not(.intro-headline)')
      if (mainHeading) {
        mainHeading.tabIndex = -1
        mainHeading.focus()
        mainHeading.removeAttribute('tabindex')
      }
    }, 300)
  }, [markAsCompleted, onComplete])

  // Main animation loop using RAF for smooth timeline
  useEffect(() => {
    if (!shouldPlay) {
      setIsVisible(false)
      onComplete?.()
      return
    }

    // Reduced motion: skip pre-roll, start at mosaic
    if (isReducedMotion) {
      setCurrentTime(TIMELINE.mosaic.start)
      setTimeout(handleComplete, 200)
      return
    }

    // Animation loop
    const animate = (timestamp) => {
      if (!startTime.current) {
        startTime.current = timestamp
      }

      const elapsed = timestamp - startTime.current
      setCurrentTime(elapsed)

      if (elapsed < TIMELINE.total) {
        animationFrame.current = requestAnimationFrame(animate)
      } else {
        handleComplete()
      }
    }

    animationFrame.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [shouldPlay, isReducedMotion, handleComplete, onComplete])

  if (!isVisible) return null

  // Calculate animation states based on timeline
  const prerollVisible = currentTime >= TIMELINE.preroll.start && currentTime < TIMELINE.preroll.end
  const mosaicVisible = currentTime >= TIMELINE.mosaic.start
  const leftHalfSliding = currentTime >= TIMELINE.leftSlide.start
  const secondaryVisible = currentTime >= TIMELINE.secondary.start && currentTime < TIMELINE.reveal.start
  const overlayExiting = currentTime >= TIMELINE.reveal.start

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="intro-container"
        initial={{ opacity: 1 }}
        animate={{ 
          y: overlayExiting ? '-110vh' : 0,
          opacity: overlayExiting ? 0 : 1
        }}
        transition={{ 
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1]
        }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-label="Loading Ravie"
        aria-modal="true"
      >
        {/* Pre-roll: Word cycle - TEMPORARILY DISABLED */}
        {!isReducedMotion && prerollVisible && (
          <WordCycle
            prefixes={WORD_CYCLE_CONFIG.prefixes}
            perWordMs={WORD_CYCLE_CONFIG.perWordMs}
            startDelayMs={WORD_CYCLE_CONFIG.startDelayMs}
            isVisible={prerollVisible}
            currentTime={currentTime - TIMELINE.preroll.start}
          />
        )}

        {/* Phase 2-3: Mosaic Grid */}
        {mosaicVisible && (
          <MosaicGrid 
            currentTime={currentTime}
            leftHalfSliding={leftHalfSliding}
          />
        )}

        {/* Phase 3: Secondary copy - 25 Million Views with Logo */}
        <SecondaryContent isVisible={secondaryVisible} />

        {/* Debug progress bar (development only) */}
        <DebugProgress currentTime={currentTime} totalTime={TIMELINE.total} />
      </motion.div>
    </AnimatePresence>
  )
}