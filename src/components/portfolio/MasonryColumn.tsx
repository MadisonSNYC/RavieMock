import React, { useRef, useEffect, useState } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { wrapOffset } from '../../hooks/useInfiniteWrap'
import { ProjectCard, Project } from './ProjectCard'
import { useReducedMotionContext } from '../../providers/ReducedMotionProvider'

export interface MasonryColumnProps {
  items: Project[]
  direction: 'up' | 'down'
  speed?: number
  viewportHeight: number
  scrollY: MotionValue<number>
  phase?: number
  onHeightMeasured?: (height: number) => void
}

// Removed varying heights - now using consistent aspect ratio

export function MasonryColumn({
  items,
  direction,
  speed = 0.6,
  viewportHeight,
  scrollY,
  phase = 0,
  onHeightMeasured
}: MasonryColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotionContext()
  const [contentHeight, setContentHeight] = useState(0)
  
  // Measure actual content height after render
  useEffect(() => {
    if (!contentRef.current) return
    
    const measureHeight = () => {
      const firstList = contentRef.current?.querySelector('.masonry-list')
      if (firstList) {
        const height = firstList.scrollHeight
        setContentHeight(height)
        onHeightMeasured?.(height)
      }
    }

    const resizeObserver = new ResizeObserver(measureHeight)
    const firstList = contentRef.current?.querySelector('.masonry-list')
    if (firstList) {
      resizeObserver.observe(firstList)
    }

    measureHeight()
    const timer = setTimeout(measureHeight, 500)
    
    return () => {
      resizeObserver.disconnect()
      clearTimeout(timer)
    }
  }, [items, onHeightMeasured])

  // Simple linear transform without complex wrapping
  const sign = direction === 'up' ? -1 : 1
  
  // Direct transform without chaining to reduce complexity
  const columnOffset = useTransform(scrollY, (sy) => {
    if (contentHeight <= 0) return 0
    
    // Calculate offset with direction and speed
    const baseOffset = sign * sy * speed
    const phaseOffset = phase * viewportHeight * 0.2
    let offset = baseOffset + phaseOffset
    
    // Simple modulo wrap for infinite scroll
    offset = offset % (contentHeight || 1)
    if (offset > 0) offset -= contentHeight
    
    return offset
  })

  // IntersectionObserver for lazy loading
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
          if (!video.src && video.dataset.src) {
            video.src = video.dataset.src
          }
        } else if (!entry.isIntersecting) {
          setTimeout(() => {
            if (!video.matches(':hover') && !video.matches(':focus-within')) {
              video.src = ''
              video.load()
            }
          }, 250)
        }
      })
    }, observerOptions)

    const cards = columnRef.current.querySelectorAll('article')
    cards.forEach(card => observer.observe(card))

    return () => {
      cards.forEach(card => observer.unobserve(card))
      observer.disconnect()
    }
  }, [items])

  if (prefersReducedMotion) {
    return (
      <div className="relative h-full overflow-hidden" ref={columnRef}>
        <div className="masonry-list space-y-3">
          {items.map((project) => (
            <div key={project.id} className="aspect-video overflow-hidden border-2 border-white">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full overflow-hidden" ref={columnRef}>
      <motion.div
        ref={contentRef}
        className="relative overflow-hidden will-change-transform"
        style={{
          y: columnOffset,
          willChange: 'transform'
        }}
      >
        {/* Triple sets for smoother infinite scroll */}
        {[0, 1, 2].map((setIndex) => (
          <div key={`set-${setIndex}`} className="masonry-list space-y-3">
            {items.map((project) => (
              <div 
                key={`${project.id}-${setIndex}`} 
                className="portfolio-tile aspect-video overflow-hidden"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default MasonryColumn