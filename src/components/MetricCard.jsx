import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * MetricCard Component
 * Displays an animated metric with counting animation
 * @param {Object} props
 * @param {string} props.value - Metric value (e.g., "250%", "3M+")
 * @param {string} props.label - Metric description
 * @param {number} props.delay - Animation delay in seconds
 * @returns {JSX.Element}
 */
export default function MetricCard({ value, label, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState('0')
  
  const animateValue = useCallback(() => {
    const numericValue = parseInt(value)
    if (!isNaN(numericValue)) {
      const suffix = value.replace(/[0-9]/g, '')
      const duration = 1500 // Animation duration in ms
      const steps = 50
      const increment = numericValue / steps
      const stepDuration = duration / steps
      
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current) + suffix)
        }
      }, stepDuration)
      
      return () => clearInterval(timer)
    } else {
      setDisplayValue(value)
    }
  }, [value])
  
  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(animateValue, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, delay, animateValue])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
        {displayValue}
      </div>
      <div className="text-white/60">{label}</div>
    </motion.div>
  )
}