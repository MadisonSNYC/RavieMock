import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for scroll spy functionality
 * Tracks which section is currently in view
 * @param {Array} sections - Array of section objects with id and ref
 * @param {Object} options - Configuration options
 * @returns {string} - Active section ID
 */
export default function useScrollSpy(sections, options = {}) {
  const { 
    offset = 0.5, // Position in viewport to trigger (0.5 = center)
    throttleMs = 100 // Throttle scroll events
  } = options
  
  const [activeSection, setActiveSection] = useState(
    sections.length > 0 ? sections[0].id : ''
  )
  
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight * offset
    
    for (const section of sections) {
      if (section.ref.current) {
        const { offsetTop, offsetHeight } = section.ref.current
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id)
          break
        }
      }
    }
  }, [sections, offset])
  
  useEffect(() => {
    let timeoutId = null
    
    const throttledScroll = () => {
      if (timeoutId) return
      
      timeoutId = setTimeout(() => {
        handleScroll()
        timeoutId = null
      }, throttleMs)
    }
    
    window.addEventListener('scroll', throttledScroll)
    handleScroll() // Check initial position
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [handleScroll, throttleMs])
  
  return activeSection
}