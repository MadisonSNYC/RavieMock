import React, { useRef, useEffect, useState } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { wrapOffset } from '../../hooks/useInfiniteWrap'
import { ProjectCard, Project } from './ProjectCard'
import { useReducedMotionContext } from '../../providers/ReducedMotionProvider'

export interface CounterScrollColumnProps {
  items: Project[]
  direction: 'up' | 'down'
  speed?: number
  viewportHeight: number
  scrollY: MotionValue<number>
  phase?: number // 0..1 of tile height, default 0
  onHeightMeasured?: (height: number) => void
}

/**
 * Column component that scrolls based on native page scroll
 * Renders duplicated content for seamless looping
 */
export function CounterScrollColumn({
  items,
  direction,
  speed = 0.6,
  viewportHeight,
  scrollY,
  phase = 0,
  onHeightMeasured
}: CounterScrollColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotionContext()
  const [contentHeight, setContentHeight] = useState(0)
  const [tileScale, setTileScale] = useState(0.5)
  
  // Get tile scale from CSS variable
  useEffect(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--tile-scale');
    const val = parseFloat(raw) || 0.5;
    setTileScale(val);
  }, []);
  
  const tileHeightPx = Math.max(0, viewportHeight * tileScale);

  // Measure actual content height after render
  useEffect(() => {
    if (!contentRef.current) return
    
    const measureHeight = () => {
      const firstList = contentRef.current?.querySelector('.column-list')
      if (firstList) {
        const height = firstList.scrollHeight
        setContentHeight(height)
        onHeightMeasured?.(height)
      }
    }

    // Create ResizeObserver for dynamic height changes
    const resizeObserver = new ResizeObserver(measureHeight)
    const firstList = contentRef.current?.querySelector('.column-list')
    if (firstList) {
      resizeObserver.observe(firstList)
    }

    // Initial measure after images load
    measureHeight()
    const timer = setTimeout(measureHeight, 500)
    
    return () => {
      resizeObserver.disconnect()
      clearTimeout(timer)
    }
  }, [items, onHeightMeasured])

  // Direction sign: up = -1, down = +1
  const sign = direction === 'up' ? -1 : 1
  
  // Transform scrollY to column offset
  const baseOffset = useTransform(scrollY, (sy) => sign * sy * speed)
  
  // Apply phase offset (e.g., 0.5 for half a tile)
  const phasedOffset = useTransform(baseOffset, (v) => v + phase * tileHeightPx)
  
  // Wrap into [-H, 0) range
  const wrappedOffset = useTransform(phasedOffset, (v) => {
    if (contentHeight <= 0) return 0
    return wrapOffset(v % contentHeight, contentHeight)
  })

  // IntersectionObserver for lazy loading videos
  useEffect(() => {
    if (!columnRef.current) return

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '200px 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('video') as HTMLVideoElement
        if (!video) return

        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
          // Attach source if not present
          if (!video.src && video.dataset.src) {
            video.src = video.dataset.src
          }
        } else if (!entry.isIntersecting) {
          // Schedule cleanup
          setTimeout(() => {
            if (!video.matches(':hover') && !video.matches(':focus-within')) {
              video.src = ''
              video.load() // Free memory
            }
          }, 250)
        }
      })
    }, observerOptions)

    // Observe all cards in this column
    const cards = columnRef.current.querySelectorAll('article')
    cards.forEach(card => observer.observe(card))

    return () => {
      cards.forEach(card => observer.unobserve(card))
      observer.disconnect()
    }
  }, [items])

  // Static layout for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="relative h-full overflow-hidden" ref={columnRef}>
        <div className="">
          {items.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    )
  }

  // Counter-scrolling layout driven by native scroll
  return (
    <div className="relative h-full overflow-hidden" ref={columnRef}>
      <motion.div
        ref={contentRef}
        className="relative overflow-hidden will-change-transform"
        style={{
          y: wrappedOffset
        }}
      >
        {/* First set of items */}
        <div className="column-list">
          {items.map((project) => (
            <ProjectCard key={`${project.id}-1`} project={project} />
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="column-list">
          {items.map((project) => (
            <ProjectCard key={`${project.id}-2`} project={project} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default CounterScrollColumn