/**
 * SecondaryContent Component
 * Displays the "25 Million Views. And Counting." message with logo
 */

import { motion } from 'framer-motion'
import { LOGOS } from './constants'

export default function SecondaryContent({ isVisible }) {
  return (
    <motion.div
      className="intro-secondary-bold"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0
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
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 15 }}
          transition={{ 
            duration: 0.4,
            delay: 0.3, // Slightly more delay for 5s total
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
      
      {/* Ravie Logo */}
      <motion.img
        src={LOGOS.raviePublic}
        alt="Ravie"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20
        }}
        transition={{ 
          duration: 0.5,
          delay: 0.6, // Show after text appears
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{
          marginTop: '2.5rem',
          height: 'clamp(3rem, 6vw, 5rem)',
          width: 'auto',
          display: 'block'
        }}
      />
    </motion.div>
  )
}