import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'

export interface UseScrollDriverOptions {
  stiffness?: number
  damping?: number
}

export interface UseScrollDriverReturn {
  scrollY: MotionValue<number>
  velocity: MotionValue<number>
}

/**
 * Hook that tracks native scroll with spring smoothing
 * Provides smooth, accessible scroll-driven animations
 */
export function useScrollDriver(opts?: UseScrollDriverOptions): UseScrollDriverReturn {
  // Raw scrollY as a motion value
  const raw = useMotionValue(0)

  useEffect(() => {
    const onScroll = () => raw.set(window.scrollY || window.pageYOffset || 0)
    onScroll() // Set initial value
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [raw])

  // Smooth with a spring for "inertia" feel
  const smooth = useSpring(raw, {
    stiffness: opts?.stiffness ?? 120,
    damping: opts?.damping ?? 28,
    mass: 1
  })

  // Also expose a normalized velocity if needed later
  const vel = useTransform(smooth, (v, prev) => (v - (prev ?? 0)))

  return { scrollY: smooth, velocity: vel }
}