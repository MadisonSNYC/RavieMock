/**
 * Hook to manage intro sequence state
 * - Checks localStorage for previous views
 * - Handles reduced motion preferences  
 * - Provides completion tracking
 */

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'ravie_intro_seen'
const COOLDOWN_MS = 24 * 60 * 60 * 1000 // 24 hours

export function useIntroState() {
  const [shouldPlay, setShouldPlay] = useState(true) // Changed to true for testing
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsReducedMotion(prefersReducedMotion)

    // Check localStorage to determine if intro should play
    const lastShown = localStorage.getItem(STORAGE_KEY)
    const now = Date.now()
    
    if (!lastShown) {
      setShouldPlay(true)
    } else {
      const timeSinceLastShown = now - parseInt(lastShown, 10)
      setShouldPlay(timeSinceLastShown > COOLDOWN_MS)
    }
  }, [])

  const markAsCompleted = () => {
    // TEMPORARY: Disabled localStorage for testing
    // localStorage.setItem(STORAGE_KEY, Date.now().toString())
    setShouldPlay(false)
  }

  return {
    shouldPlay,
    markAsCompleted,
    isReducedMotion
  }
}