import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ProjectsBentoGrid from '../components/ProjectsBentoGrid'
import AboutSection from '../components/AboutSection'
import ProjectDirectory from '../components/ProjectDirectory'
import ErrorBoundary from '../components/ErrorBoundary'

export default function HomePage() {
  const [showDirectory, setShowDirectory] = useState(false)

  // Auto-show directory after page loads, then auto-close after 2 seconds
  useEffect(() => {
    // Small delay to let the page render first
    const showTimer = setTimeout(() => {
      setShowDirectory(true)
    }, 500)

    // Auto-close after 2.5 seconds total (500ms delay + 2000ms display)
    const hideTimer = setTimeout(() => {
      setShowDirectory(false)
    }, 2500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <>
      <ErrorBoundary fallbackMessage="Failed to load the hero section. Please refresh the page.">
        <HeroSection />
      </ErrorBoundary>
      
      <ErrorBoundary fallbackMessage="Failed to load projects. Please check your connection and refresh.">
        <ProjectsBentoGrid />
      </ErrorBoundary>
      
      <ErrorBoundary fallbackMessage="Failed to load the about section. Please refresh the page.">
        <AboutSection />
      </ErrorBoundary>

      {/* Auto-opening Project Directory */}
      {showDirectory && (
        <ProjectDirectory 
          autoOpen={true}
          onClose={() => setShowDirectory(false)} 
        />
      )}
    </>
  )
}