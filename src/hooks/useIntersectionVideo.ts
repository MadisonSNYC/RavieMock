import { useEffect, useRef, useState, RefObject } from 'react'

export type UseIntersectionVideoOpts = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  onEnter?: () => void
  onLeave?: () => void
}

/**
 * Hook to track element intersection for video loading
 * @param opts Configuration options for IntersectionObserver
 * @returns Object with ref and intersection state
 */
export function useIntersectionVideo<T extends HTMLElement>(
  opts?: UseIntersectionVideoOpts
): { ref: RefObject<T>; isIntersecting: boolean } {
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  
  const {
    root = null,
    rootMargin = '200px 0px',
    threshold = 0.25,
    onEnter,
    onLeave
  } = opts || {}

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasIntersecting = isIntersecting
          const nowIntersecting = entry.isIntersecting
          
          setIsIntersecting(nowIntersecting)
          
          // Call callbacks on state change
          if (!wasIntersecting && nowIntersecting) {
            onEnter?.()
          } else if (wasIntersecting && !nowIntersecting) {
            onLeave?.()
          }
        })
      },
      {
        root,
        rootMargin,
        threshold
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [root, rootMargin, threshold, onEnter, onLeave, isIntersecting])

  return { ref, isIntersecting }
}

export default useIntersectionVideo