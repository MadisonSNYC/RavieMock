import React, { useEffect } from 'react'
import { ReducedMotionProvider } from '../../providers/ReducedMotionProvider'
import { SmoothGrid } from '../../components/homepage/SmoothGrid'
import projectsData from '../../data/projects.json'
import '../../styles/homepage.css'

/**
 * New Homepage - Single column portfolio with atmospheric effects
 * Based on portfolio structure but with single-column layout
 */
export function HomePage() {
  useEffect(() => {
    // Add homepage-specific body classes for styling
    const bodyClasses = ['homepage-single-column']
    const htmlClasses = ['homepage-active']
    
    bodyClasses.forEach(cls => document.body.classList.add(cls))
    htmlClasses.forEach(cls => document.documentElement.classList.add(cls))
    
    // Cleanup function to prevent memory leaks
    return () => {
      bodyClasses.forEach(cls => document.body.classList.remove(cls))
      htmlClasses.forEach(cls => document.documentElement.classList.remove(cls))
    }
  }, [])

  return (
    <ReducedMotionProvider>
      <div className="homepage-container">
        <SmoothGrid projects={projectsData} />
      </div>
    </ReducedMotionProvider>
  )
}

export default HomePage