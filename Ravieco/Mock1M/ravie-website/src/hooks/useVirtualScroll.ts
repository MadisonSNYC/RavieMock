import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, MotionValue } from 'framer-motion'

type Opts = {
  friction?: number
  maxVelocity?: number
}

export interface UseVirtualScrollReturn {
  scrollY: MotionValue<number>
  velocity: MotionValue<number>
}

export function useVirtualScroll(el: React.RefObject<HTMLElement>, opts: Opts = {}): UseVirtualScrollReturn {
  const friction = opts.friction ?? 0.08
  const maxVelocity = opts.maxVelocity ?? 120
  
  const raw = useMotionValue(0)
  const smooth = useSpring(raw, {
    stiffness: 100,
    damping: 30,
    mass: 1
  })
  
  const velocityRef = useRef(0)
  const targetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  
  useEffect(() => {
    const node = el.current
    if (!node) return
    
    // Virtual scroll physics
    const updateScroll = () => {
      const delta = targetRef.current - raw.get()
      const force = delta * friction
      velocityRef.current += force
      velocityRef.current *= 0.95 // damping
      
      // Clamp velocity
      velocityRef.current = Math.max(-maxVelocity, Math.min(maxVelocity, velocityRef.current))
      
      const current = raw.get() + velocityRef.current
      raw.set(current)
      
      // Continue animation if velocity is significant
      if (Math.abs(velocityRef.current) > 0.01) {
        rafRef.current = requestAnimationFrame(updateScroll)
      }
    }
    
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()  // Stop event bubbling to be extra safe
      
      // Update target based on wheel delta
      targetRef.current += e.deltaY
      
      // Start animation if not running
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateScroll)
      }
    }
    
    const onKeyDown = (e: KeyboardEvent) => {
      const step = 100
      switch(e.key) {
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          targetRef.current -= e.key === 'PageUp' ? step * 5 : step
          if (!rafRef.current) rafRef.current = requestAnimationFrame(updateScroll)
          break
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          targetRef.current += e.key === 'PageDown' ? step * 5 : step
          if (!rafRef.current) rafRef.current = requestAnimationFrame(updateScroll)
          break
        case 'Home':
          e.preventDefault()
          targetRef.current = 0
          if (!rafRef.current) rafRef.current = requestAnimationFrame(updateScroll)
          break
        case 'End':
          e.preventDefault()
          targetRef.current = 10000 // Large value for "end"
          if (!rafRef.current) rafRef.current = requestAnimationFrame(updateScroll)
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
      e.stopPropagation()  // Stop event bubbling
      const deltaY = touchStartY - e.touches[0].clientY
      targetRef.current += deltaY * 2
      touchStartY = e.touches[0].clientY
      
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateScroll)
      }
    }
    
    // Add listeners
    node.addEventListener('wheel', onWheel, { passive: false })
    node.addEventListener('keydown', onKeyDown)
    node.addEventListener('touchstart', onTouchStart, { passive: true })
    node.addEventListener('touchmove', onTouchMove, { passive: false })
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      node.removeEventListener('wheel', onWheel)
      node.removeEventListener('keydown', onKeyDown)
      node.removeEventListener('touchstart', onTouchStart)
      node.removeEventListener('touchmove', onTouchMove)
    }
  }, [el, raw, friction, maxVelocity])
  
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