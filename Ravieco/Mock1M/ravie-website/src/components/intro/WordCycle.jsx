/**
 * WordCycle Component
 * Animates through a series of words during the pre-roll phase
 */

import { motion, AnimatePresence } from 'framer-motion'
import ravieLogo from '../../assets/Ravielogo1.png'

export default function WordCycle({ prefixes, perWordMs, startDelayMs, isVisible, currentTime }) {
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
  
  // Special handling: keep last word visible for extra 500ms
  const extraTimeForLast = 500 // Extra time for last word to linger
  
  // If we've shown all words, check if we should still show the last one
  if (wordIndex >= prefixes.length) {
    // Check if we're still within the extra time for last word
    const timePastLastWord = timeInWords - (prefixes.length * perWordMs)
    if (timePastLastWord < extraTimeForLast) {
      // Keep showing last word
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