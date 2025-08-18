import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, MotionValue } from 'framer-motion'

type Opts = {
  stiffness?: number
  damping?: number
  /** set false to disable infinite loop behavior (debug) */
  rebase?: boolean
  /** how wide the safe band is around the center (0..1). 0.5 => rebase when in outer 25% bands */
  band?: number
}

export interface UseScrollDriverReturn {
  scrollY: MotionValue<number>
  velocity: MotionValue<number>
}

export function useScrollDriver(opts: Opts = {}): UseScrollDriverReturn {
  const raw = useMotionValue(0) // virtual raw scroll (physical Y + baseOffset)
  const smooth = useSpring(raw, {
    stiffness: opts.stiffness ?? 120,
    damping: opts.damping ?? 28,
    mass: 1,
  })

  const baseOffset = useRef(0)     // we add this to physical Y to make virtual Y monotonic
  const anch = useRef(0)           // center anchor within the page height
  const rebasing = useRef(false)
  const band = Math.min(Math.max(opts.band ?? 0.5, 0.1), 0.9) // clamp

  useEffect(() => {
    const recalc = () => {
      const doc = document.documentElement
      const max = Math.max(0, doc.scrollHeight - window.innerHeight)
      // center anchor (middle of the available scroll range)
      anch.current = max * 0.5
    }

    const onScroll = () => {
      const doc = document.documentElement
      const max = Math.max(0, doc.scrollHeight - window.innerHeight)
      const y = window.scrollY || window.pageYOffset || 0

      if (max <= 0) {
        raw.set(baseOffset.current)
        return
      }

      if (!rebasing.current && opts.rebase !== false && max > 0) {
        // Calculate safe zone bounds
        const low = max * (0.5 - band * 0.5)
        const high = max * (0.5 + band * 0.5)

        // Check if we're outside the safe zone
        if (y < low || y > high) {
          rebasing.current = true
          const delta = y - anch.current
          baseOffset.current += delta
          
          // Jump the window back to center
          window.scrollTo(0, anch.current)
          
          // Allow next rebase after a frame
          requestAnimationFrame(() => {
            rebasing.current = false
          })
          return
        }
      }

      // Set virtual scroll (physical + accumulated offset)
      raw.set(y + baseOffset.current)
    }

    // Initialize
    recalc()
    onScroll()

    // Listen to scroll and resize
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', recalc, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', recalc)
    }
  }, [raw, opts.rebase, band])

  // Velocity calculation
  const velocity = useMotionValue(0)
  
  useEffect(() => {
    let prevValue = smooth.get()
    const unsubscribe = smooth.on('change', (latest) => {
      velocity.set(latest - prevValue)
      prevValue = latest
    })
    return unsubscribe
  }, [smooth, velocity])

  return { scrollY: smooth, velocity }
}

// Export the old interface for compatibility
export interface UseScrollDriverOptions extends Opts {}