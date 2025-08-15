/**
 * Premium Intro Sequence Component
 * Quick 3-second punchy animation
 * 
 * Timeline:
 * 0-1200ms: Fast mosaic tiles reveal
 * 1200-1800ms: Quick left slide to black
 * 1800-1900ms: Brief pause
 * 1900-2500ms: "25 Million Views. And Counting."
 * 2500-3000ms: Final reveal
 */

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntroState } from './useIntroState'
import './intro.css'

// Import project thumbnails for mosaic
import CoinbaseThumbnail from '../../assets/CoinbaseThumbnail.webp'
import LoopsWP from '../../assets/LoopsWP.webp'
import kwthmb from '../../assets/kwthmb.webp'
import JheneThmb from '../../assets/JheneThmb.webp'
import Ozonethmb1 from '../../assets/Ozonethmb1.webp'
import ososthmb from '../../assets/ososthmb.webp'
import cfathmb from '../../assets/cfathmb.webp'
import Rectangle75 from '../../assets/Rectangle+75.webp'
import Artboard1 from '../../assets/Artboard+1.webp'
import ravieIcon from '../../assets/ravie-icon.png'
import ravieLogo from '../../assets/Ravielogo1.png'

// Timeline constants (in ms) - Quick 3 second intro
const TIMELINE = {
  total: 3000,                              // 3s total - fast and punchy
  preroll: { start: 0, end: 0 },           // Skip word cycle
  mosaic: { start: 0, end: 1200 },         // 1.2s for quick mosaic reveal
  leftSlide: { start: 1200, end: 1800 },   // 0.6s for quick slide
  pause: { start: 1800, end: 1900 },       // 0.1s brief pause
  secondary: { start: 1900, end: 2500 },   // 0.6s for text (no time for delayed "And Counting")
  reveal: { start: 2500, end: 3000 }       // 0.5s for final reveal
}

const STAGGER_DELAY = 70 // ms between each tile (much faster for 3s total)

// Word cycle configuration - optimized for readability
const WORD_CYCLE_CONFIG = {
  prefixes: ["create", "build", "launch", "move", "inspire"],
  colors: [
    "linear-gradient(135deg, #FF006E 0%, #FF4D8F 100%)",  // Pink-red for "create"
    "linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)",  // Cyan-blue for "build"
    "linear-gradient(135deg, #FFD600 0%, #FF9900 100%)",  // Yellow-orange for "launch"
    "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",  // Purple for "move"
    "linear-gradient(135deg, #10B981 0%, #34D399 100%)"   // Green for "inspire"
  ],
  perWordMs: 1000,     // 1 second per word for comfortable reading
  startDelayMs: 800    // 0.8s initial pause to set the mood
}

// Inline WordCycle component for pre-roll
function WordCycle({ prefixes, perWordMs, startDelayMs, isVisible, currentTime }) {
  if (!isVisible) return null
  
  // Calculate which word should be showing
  const elapsedTime = currentTime
  
  // During delay, show nothing
  if (elapsedTime < startDelayMs) {
    return null
  }
  
  // Time since words started showing
  const timeInWords = elapsedTime - startDelayMs
  
  // Which word? (0-indexed)
  const wordIndex = Math.floor(timeInWords / perWordMs)
  
  // Special handling: keep "move" (last word) visible for extra 500ms
  const isLastWord = wordIndex === prefixes.length - 1
  const extraTimeForLast = 500 // Extra time for "move" to linger
  
  // If we've shown all words, check if we should still show "move"
  if (wordIndex >= prefixes.length) {
    // Check if we're still within the extra time for "move"
    const timePastLastWord = timeInWords - (prefixes.length * perWordMs)
    if (timePastLastWord < extraTimeForLast) {
      // Keep showing "inspire"
      const currentPrefix = prefixes[prefixes.length - 1]
      return (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 40,
            pointerEvents: 'none',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-hidden="true"
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1200px'
          }}>
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '2px',
              height: 'clamp(5rem, 12vw, 8rem)',
              background: 'linear-gradient(180deg, transparent 0%, var(--color-ravie-red) 50%, transparent 100%)',
              opacity: 0.6
            }} />
            
            <img 
              src={ravieLogo} 
              alt="Ravie.co" 
              style={{
                position: 'absolute',
                left: '52%',
                top: '50%',
                transform: 'translateY(-50%)',
                height: 'clamp(3rem, 7vw, 5rem)',
                width: 'auto',
                opacity: 0.95,
                marginLeft: '3rem'
              }}
            />
            
            <div style={{
              position: 'absolute',
              right: '52%',
              top: '50%',
              transform: 'translateY(-50%)',
              marginRight: '3rem',
              textAlign: 'right'
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(4rem, 10vw, 7rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, var(--color-ravie-red) 0%, var(--color-ravie-purple) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block'
              }}>
                {currentPrefix}
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
  
  const currentPrefix = prefixes[wordIndex]
  
  // Are we in the fade out phase?
  const isFadingOut = false // Simplified - just cut to next word
  
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 40,
        pointerEvents: 'none',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-hidden="true"
    >
      {/* Static container for line and logo */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1200px'
      }}>
        {/* Vertical separator line - absolutely positioned center */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '2px',
          height: 'clamp(5rem, 12vw, 8rem)',
          background: 'linear-gradient(180deg, transparent 0%, var(--color-ravie-red) 50%, transparent 100%)',
          opacity: 0.6
        }} />
        
        {/* Logo - absolutely positioned right */}
        <img 
          src={ravieLogo} 
          alt="Ravie.co" 
          style={{
            position: 'absolute',
            left: '52%',
            top: '50%',
            transform: 'translateY(-50%)',
            height: 'clamp(3rem, 7vw, 5rem)',
            width: 'auto',
            opacity: 0.95,
            marginLeft: '3rem'
          }}
        />
        
        {/* Word container - absolutely positioned left */}
        <div style={{
          position: 'absolute',
          right: '52%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '3rem',
          textAlign: 'right'
        }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentPrefix}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ 
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(4rem, 10vw, 7rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, var(--color-ravie-red) 0%, var(--color-ravie-purple) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block'
              }}
            >
              {currentPrefix}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

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

  // Mosaic tiles configuration (5x3 grid - perfect checkerboard)
  // Pattern: M=Media, B=Black
  // Row 0: M B M B M
  // Row 1: B M B M B  
  // Row 2: M B M B M
  const tiles = [
    // Row 0
    { id: 1, src: CoinbaseThumbnail, row: 0, col: 0 },  // M
    { id: 2, row: 0, col: 1, isBlack: true },           // B
    { id: 3, src: kwthmb, row: 0, col: 2 },            // M
    { id: 4, row: 0, col: 3, isBlack: true },          // B
    { id: 5, src: LoopsWP, row: 0, col: 4 },           // M
    // Row 1  
    { id: 6, row: 1, col: 0, isBlack: true },          // B
    { id: 7, src: JheneThmb, row: 1, col: 1 },         // M
    { id: 8, row: 1, col: 2, isBlack: true },          // B
    { id: 9, src: Artboard1, row: 1, col: 3 },         // M (replaced logo with Artboard1)
    { id: 10, row: 1, col: 4, isBlack: true },         // B
    // Row 2
    { id: 11, src: ososthmb, row: 2, col: 0 },         // M
    { id: 12, row: 2, col: 1, isBlack: true },         // B
    { id: 13, src: cfathmb, row: 2, col: 2 },          // M
    { id: 14, row: 2, col: 3, isBlack: true },         // B
    { id: 15, src: Rectangle75, row: 2, col: 4 }        // M (changed from Ozonethmb1)
  ]

  // Calculate tile index for L→R sweep (row-major order)
  const getTileIndex = (row, col) => row * 5 + col

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
  // No headline phase anymore
  const headlineVisible = false
  const headlineRaised = false
  const headlineExiting = false
  const mosaicVisible = currentTime >= TIMELINE.mosaic.start
  const leftHalfSliding = currentTime >= TIMELINE.leftSlide.start
  const isPaused = currentTime >= TIMELINE.pause.start && currentTime < TIMELINE.secondary.start
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
        {/* Skip button removed per user request */}

        {/* Pre-roll: Word cycle - TEMPORARILY DISABLED */}
        {/* {!isReducedMotion && (
          <WordCycle
            prefixes={WORD_CYCLE_CONFIG.prefixes}
            perWordMs={WORD_CYCLE_CONFIG.perWordMs}
            startDelayMs={WORD_CYCLE_CONFIG.startDelayMs}
            isVisible={prerollVisible}
            currentTime={currentTime - TIMELINE.preroll.start}
          />
        )} */}

        {/* Phase 1: Headline - TEMPORARILY DISABLED */}
        {/* {headlineVisible && (
          <motion.div
            className="intro-headline-container"
            initial={{ opacity: 0, y: 16 }}
            animate={{ 
              opacity: 1,
              y: headlineRaised ? 0 : 16
            }}
            transition={{ 
              opacity: { duration: 0.6 },
              y: { duration: 0.6 },
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <h1 className="intro-headline">
              We create <span className="intro-headline-em">cult</span> followings
            </h1>
          </motion.div>
        )} */}

        {/* Phase 2-3: Mosaic Grid */}
        {mosaicVisible && (
          <>
            <div className="intro-mosaic">
              {tiles.map((tile) => {
              const tileIndex = getTileIndex(tile.row, tile.col)
              const tileStartTime = TIMELINE.mosaic.start + (tileIndex * STAGGER_DELAY)
              const isTileVisible = currentTime >= tileStartTime
              
              // When sliding: hide everything except media tiles in left column
              const isLeftColumn = tile.col === 0
              const isLeftMediaTile = isLeftColumn && !tile.isBlack
              const shouldHide = leftHalfSliding && !isLeftMediaTile

              return (
                <motion.div
                  key={tile.id}
                  className={`intro-tile intro-tile-${tile.row}-${tile.col}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{
                    opacity: shouldHide ? 0 : (isTileVisible ? 1 : 0),
                    scale: isTileVisible ? 1 : 0.98,
                    clipPath: isTileVisible 
                      ? 'inset(0% 0% 0% 0%)' 
                      : 'inset(0% 100% 0% 0%)'
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.4 },
                    clipPath: { 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }
                  }}
                >
                  {tile.isBlack ? (
                    <div className="intro-tile-black" />
                  ) : tile.isLogo ? (
                    <div className="intro-tile-logo">
                      <img src={tile.src} alt="Ravie" />
                    </div>
                  ) : (
                    <img src={tile.src} alt="" loading="eager" />
                  )}
                </motion.div>
              )
            })}
            </div>
            
            {/* Black overlay for right side - covers everything except left column */}
            <motion.div
              className="intro-right-overlay"
              initial={{ x: '100%' }}
              animate={{ 
                x: leftHalfSliding ? 0 : '100%'
              }}
              transition={{ 
                duration: 0.5,  // Quick slide for 3s total
                ease: [0.43, 0.13, 0.23, 0.96]  // Faster start, slower end
              }}
              style={{
                position: 'absolute',
                left: 'calc(20% + 2px)', // Account for grid gap
                top: 0,
                width: 'calc(80% - 2px)',
                height: '100%',
                background: '#000',
                pointerEvents: 'none',
                zIndex: 15
              }}
            />
          </>
        )}

        {/* Phase 3: Secondary copy - 25 Million Views */}
        <motion.div
          className="intro-secondary-bold"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: secondaryVisible ? 1 : 0
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{
            position: 'absolute',
            left: '35%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '50%',
            zIndex: 20
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            color: '#fff',
            textAlign: 'left',
            margin: 0
          }}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3,
                delay: 0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ display: 'block' }}
            >
              <span style={{ color: 'var(--color-ravie-red)' }}>25 Million</span> Views.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: secondaryVisible ? 1 : 0, y: secondaryVisible ? 0 : 15 }}
              transition={{ 
                duration: 0.3,
                delay: 0.2, // Minimal delay for 3s total
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ 
                display: 'block',
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                marginTop: '0.5rem',
                opacity: 0.9
              }}
            >
              And Counting.
            </motion.span>
          </h2>
        </motion.div>

        {/* Debug progress bar (optional) */}
        {process.env.NODE_ENV === 'development' && (
          <div 
            className="intro-progress" 
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: `${(currentTime / TIMELINE.total) * 100}%`,
              height: '2px',
              background: 'var(--color-ravie-red)',
              zIndex: 10000
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}