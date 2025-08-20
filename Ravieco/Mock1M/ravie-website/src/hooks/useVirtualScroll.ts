import { useEffect, useRef } from 'react'
import { useMotionValue, MotionValue } from 'framer-motion'

type Opts = {
  friction?: number
  maxVelocity?: number
}

export interface UseVirtualScrollReturn {
  scrollY: MotionValue<number>
  velocity: MotionValue<number>
}

export function useVirtualScroll(el: React.RefObject<HTMLElement>, opts: Opts = {}): UseVirtualScrollReturn {
  const friction = opts.friction ?? 0.15
  const maxVelocity = opts.maxVelocity ?? 80
  
  const raw = useMotionValue(0)
  // Use direct motion value instead of spring to avoid bounce
  const smooth = useMotionValue(0)
  
  const targetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const isScrollingRef = useRef(false)
  
  useEffect(() => {
    const node = el.current
    if (!node) return
    
    // Smooth lerp-based scroll without spring bounce
    const updateScroll = () => {
      const current = smooth.get()
      const target = targetRef.current
      
      // Simple lerp for smooth animation without bounce
      const diff = target - current
      const step = diff * friction
      
      // Update smooth value
      const newValue = current + step
      smooth.set(newValue)
      raw.set(newValue)
      
      // Continue if still moving
      if (Math.abs(diff) > 0.1 && isScrollingRef.current) {
        rafRef.current = requestAnimationFrame(updateScroll)
      } else {
        rafRef.current = null
        isScrollingRef.current = false
      }
    }
    
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      // Normalize wheel delta for consistent scrolling
      const normalized = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaY
      
      // Update target with normalized delta
      targetRef.current += normalized
      
      // Mark as scrolling
      isScrollingRef.current = true
      
      // Always restart animation on new input
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(updateScroll)
    }
    
    const onKeyDown = (e: KeyboardEvent) => {
      const step = 100
      switch(e.key) {
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          targetRef.current -= e.key === 'PageUp' ? step * 5 : step
          isScrollingRef.current = true
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(updateScroll)
          break
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          targetRef.current += e.key === 'PageDown' ? step * 5 : step
          isScrollingRef.current = true
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(updateScroll)
          break
        case 'Home':
          e.preventDefault()
          targetRef.current = 0
          isScrollingRef.current = true
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(updateScroll)
          break
        case 'End':
          e.preventDefault()
          targetRef.current = 10000 // Large value for "end"
          isScrollingRef.current = true
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(updateScroll)
          break
      }
    }
    
    // Touch support
    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const deltaY = touchStartY - e.touches[0].clientY
      targetRef.current += deltaY * 2
      touchStartY = e.touches[0].clientY
      
      isScrollingRef.current = true
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(updateScroll)
    }
    
    // Add listeners
    node.addEventListener('wheel', onWheel, { passive: false })
    node.addEventListener('keydown', onKeyDown)
    node.addEventListener('touchstart', onTouchStart, { passive: true })
    node.addEventListener('touchmove', onTouchMove, { passive: false })
    
    return () => {
      isScrollingRef.current = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      node.removeEventListener('wheel', onWheel)
      node.removeEventListener('keydown', onKeyDown)
      node.removeEventListener('touchstart', onTouchStart)
      node.removeEventListener('touchmove', onTouchMove)
    }
  }, [el, raw, friction, maxVelocity])
  
  // Simple velocity tracking
  const velocity = useMotionValue(0)
  
  return { scrollY: smooth, velocity }
}