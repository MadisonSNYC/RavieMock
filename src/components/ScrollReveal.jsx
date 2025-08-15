import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * ScrollReveal Component
 * Animates children elements when they come into viewport
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elements to animate
 * @param {number} props.delay - Animation delay in seconds
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export default function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.2 
  })
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.4, 0, 0.2, 1] 
      }}
    >
      {children}
    </motion.div>
  )
}