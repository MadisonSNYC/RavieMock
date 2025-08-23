import { useEffect, useRef, useCallback } from 'react'
import { useMotionValue, MotionValue } from 'framer-motion'
import { wrapOffset, lerp } from './useInfiniteWrap'

export interface UseCounterScrollOptions {
  direction: 'up' | 'down'
  speed?: number
  viewportHeight: number
  contentHeight: number
  enabled?: boolean
}

export interface UseCounterScrollReturn {
  y: MotionValue<number>
  currentY: number
  reset: () => void
}

/**
 * Hook for counter-scrolling column behavior with smooth inertial scrolling
 * Uses target/actual model with lerp for smooth 60fps animation
 */
export function useCounterScroll({
  direction,
  speed = 1,
  viewportHeight,
  contentHeight,
  enabled = true
}: UseCounterScrollOptions): UseCounterScrollReturn {
  const y = useMotionValue(0)
  const target = useRef(0)  // Raw scroll intent accumulator
  const rafId = useRef<number | null>(null)
  const touchStartY = useRef(0)

  // Direction multiplier: up = -1, down = +1
  const directionMultiplier = direction === 'up' ? -1 : 1

  // Smooth animation loop with lerp
  const animate = useCallback(() => {
    if (!enabled) {
      rafId.current = null
      return
    }

    // Get current value
    const current = y.get()
    
    // Lerp toward target with smoothing factor
    const k = 0.12  // Lower = smoother
    const smoothed = lerp(current, target.current, k)
    
    // Apply wrap to keep in [-H, 0) range
    const wrapped = wrapOffset(smoothed, contentHeight)
    
    // Update motion value
    y.set(wrapped)

    // Continue animation if not at target
    if (Math.abs(target.current - current) > 0.01) {
      rafId.current = requestAnimationFrame(animate)
    } else {
      rafId.current = null
    }
  }, [enabled, contentHeight, y])

  // Handle wheel events with normalized deltas
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!enabled) return

    // Normalize delta and clamp to prevent spikes
    let dy = e.deltaY
    dy = Math.max(-50, Math.min(50, dy))  // Clamp to [-50, 50]
    
    // Apply direction and speed
    dy *= directionMultiplier * speed

    // Update target
    target.current += dy
    
    // Apply wrap to target to prevent unbounded growth
    target.current = wrapOffset(target.current, contentHeight)

    // Start animation if not running
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate)
    }
  }, [enabled, speed, directionMultiplier, contentHeight, animate])

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return
    touchStartY.current = e.touches[0].clientY
  }, [enabled])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enabled) return

    const touchDelta = touchStartY.current - e.touches[0].clientY
    touchStartY.current = e.touches[0].clientY

    // Normalize and apply touch delta
    let dy = Math.max(-50, Math.min(50, touchDelta))
    dy *= directionMultiplier * speed
    
    target.current += dy
    target.current = wrapOffset(target.current, contentHeight)

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate)
    }
  }, [enabled, speed, directionMultiplier, contentHeight, animate])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return
    
    let dy = 0
    if (e.key === 'ArrowUp') dy = -30
    else if (e.key === 'ArrowDown') dy = 30
    else if (e.key === 'PageUp') dy = -100
    else if (e.key === 'PageDown') dy = 100
    else return

    dy *= directionMultiplier * speed
    target.current += dy
    target.current = wrapOffset(target.current, contentHeight)

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate)
    }
  }, [enabled, speed, directionMultiplier, contentHeight, animate])

  // Reset function
  const reset = useCallback(() => {
    target.current = 0
    y.set(0)
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [y])

  // Set up event listeners
  useEffect(() => {
    if (!enabled) return

    // Use passive listeners where possible for better performance
    const wheelOptions = { passive: true }
    const touchOptions = { passive: true }
    
    window.addEventListener('wheel', handleWheel, wheelOptions)
    window.addEventListener('touchstart', handleTouchStart, touchOptions)
    window.addEventListener('touchmove', handleTouchMove, touchOptions)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [enabled, handleWheel, handleTouchStart, handleTouchMove, handleKeyDown])

  return {
    y,
    currentY: y.get(),
    reset
  }
}