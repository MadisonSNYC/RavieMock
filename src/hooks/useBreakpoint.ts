import { useEffect, useState } from 'react'

/**
 * Hook for responsive breakpoint detection via matchMedia
 * @param query Media query string, defaults to mobile breakpoint
 * @returns Boolean indicating if the media query matches
 */
export function useBreakpoint(query = '(max-width: 640px)'): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return
    
    const m = window.matchMedia(query)
    const onChange = () => setMatches(!!m.matches)
    
    // Set initial value
    onChange()
    
    // Add listener (handle legacy API)
    if (m.addEventListener) {
      m.addEventListener('change', onChange)
    } else {
      // @ts-ignore - Legacy API
      m.addListener(onChange)
    }
    
    return () => {
      if (m.removeEventListener) {
        m.removeEventListener('change', onChange)
      } else {
        // @ts-ignore - Legacy API
        m.removeListener(onChange)
      }
    }
  }, [query])
  
  return matches
}