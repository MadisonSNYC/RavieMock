import React, { createContext, useContext, ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ReducedMotionContextValue {
  prefersReducedMotion: boolean
}

const ReducedMotionContext = createContext<ReducedMotionContextValue | undefined>(undefined)

interface ReducedMotionProviderProps {
  children: ReactNode
}

/**
 * Provider for reduced motion preference
 */
export function ReducedMotionProvider({ children }: ReducedMotionProviderProps) {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  )
}

/**
 * Hook to access reduced motion context
 */
export function useReducedMotionContext() {
  const context = useContext(ReducedMotionContext)
  
  if (context === undefined) {
    throw new Error('useReducedMotionContext must be used within a ReducedMotionProvider')
  }
  
  return context
}

export default ReducedMotionProvider