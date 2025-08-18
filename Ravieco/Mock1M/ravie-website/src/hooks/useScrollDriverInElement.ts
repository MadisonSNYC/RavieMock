import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, MotionValue } from 'framer-motion'

type Opts = {
  stiffness?: number
  damping?: number
  rebase?: boolean
  band?: number // 0..1; e.g. 0.5 means rebase when outside center 50%
}

export interface UseScrollDriverInElementReturn {
  scrollY: MotionValue<number>
  velocity: MotionValue<number>
}

export function useScrollDriverInElement(el: React.RefObject<HTMLElement>, opts: Opts = {}): UseScrollDriverInElementReturn {
  const raw = useMotionValue(0)
  const smooth = useSpring(raw, {
    stiffness: opts.stiffness ?? 100,
    damping: opts.damping ?? 40,
    mass: 1
  })
  const baseOffset = useRef(0)
  const anchor = useRef(0)
  const rebasing = useRef(false)
  const band = Math.min(Math.max(opts.band ?? 0.6, 0.1), 0.95)

  useEffect(() => {
    const node = el.current
    if (!node) return

    const recalc = () => {
      const max = Math.max(0, node.scrollHeight - node.clientHeight)
      anchor.current = max * 0.5
    }

    const onScroll = () => {
      const node = el.current
      if (!node) return
      const max = Math.max(0, node.scrollHeight - node.clientHeight)
      const y = node.scrollTop

      if (max <= 0) { 
        raw.set(baseOffset.current)
        return 
      }

      if (!rebasing.current && opts.rebase !== false) {
        const lower = max * (0.5 - band * 0.5)
        const upper = max * (0.5 + band * 0.5)
        if (y < lower || y > upper) {
          rebasing.current = true
          const delta = y - anchor.current
          baseOffset.current += delta
          node.scrollTo({ top: anchor.current }) // instant
          requestAnimationFrame(() => {
            rebasing.current = false
            raw.set(anchor.current + baseOffset.current)
          })
          return
        }
      }
      raw.set(y + baseOffset.current)
    }

    recalc()
    onScroll()

    node.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', recalc, { passive: true })

    return () => {
      node.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', recalc)
    }
  }, [el, raw, opts.rebase, band])

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