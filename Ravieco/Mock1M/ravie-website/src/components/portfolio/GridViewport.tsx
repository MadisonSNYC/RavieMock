import React, { useMemo, useEffect, useRef, useState } from 'react'
import { CounterScrollColumn } from './CounterScrollColumn'
import { Project, ProjectCard } from './ProjectCard'
import { useReducedMotionContext } from '../../providers/ReducedMotionProvider'
import { useVirtualScroll } from '../../hooks/useVirtualScroll'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { SpotlightProvider } from './SpotlightContext'

export interface GridViewportProps {
  projects: Project[]
  speed?: number
}

/**
 * 2×2 grid viewport with native scroll-driven counter-scrolling columns
 * Uses sticky positioning for smooth, accessible scrolling
 */
export function GridViewport({ projects, speed = 0.6 }: GridViewportProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotionContext()
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  )
  const [scrollLength, setScrollLength] = useState<number | null>(null)
  
  // Check for mobile breakpoint
  const isMobile = useBreakpoint('(max-width: 640px)')
  
  // Use virtual scroll for instant response
  const { scrollY } = useVirtualScroll(scrollRef, {
    friction: 0.08,
    maxVelocity: 120
  })

  // Update viewport height on resize
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Distribute projects round-robin across 2 columns only
  const columns = useMemo(() => {
    // Force 2 columns for desktop 2×2 grid
    const numColumns = 2
    
    // Initialize columns array
    const cols: Project[][] = [[], []]
    
    // Round-robin distribution
    projects.forEach((project, index) => {
      cols[index % numColumns].push(project)
    })
    
    return cols
  }, [projects])

  // Direction policy: mobile = both down, desktop = counter-scroll
  const directionsMobile: Array<'up' | 'down'> = ['down', 'down']
  const directionsDesktop: Array<'up' | 'down'> = ['up', 'down']
  const directions = isMobile ? directionsMobile : directionsDesktop
  
  // Speed adjustment for calmer motion
  const desktopSpeed = 0.5
  const mobileSpeed = 0.35
  const columnSpeed = isMobile ? mobileSpeed : desktopSpeed

  // Mobile single column fallback for very small screens
  const isSingleColumn = typeof window !== 'undefined' && window.innerWidth < 480

  if (isSingleColumn) {
    return (
      <div className="min-h-screen">
        <div className="space-y-4 px-4">
          {projects.map((project) => (
            <div key={project.id} className="aspect-video">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Calculate scroll length based on column height
  const computedScrollLength = scrollLength || '200vh'

  // Desktop/Tablet sticky viewport layout
  return (
    <section className="relative p-0 m-0 bg-black">
      <div
        ref={scrollRef}
        className="portfolio-scroll w-full"
        tabIndex={0}
        role="region"
        aria-label="Portfolio projects"
      >
        <div
          ref={viewportRef}
          className="portfolio-viewport w-full"
        >
          <SpotlightProvider>
            <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-px h-full w-full bg-black">
              {columns.map((columnProjects, index) => (
                <div
                  key={`column-${index}`}
                  className="relative h-full overflow-hidden"
                >
                  {columnProjects.length > 0 && (
                    <CounterScrollColumn
                      items={columnProjects}
                      direction={directions[index]}
                      speed={columnSpeed}
                      viewportHeight={viewportHeight}
                      scrollY={scrollY}
                      phase={index === 0 ? 0 : 0.5} // Stagger right column by half tile
                      onHeightMeasured={(height) => {
                        // Set scroll length based on column height
                        if (!scrollLength && height > 0) {
                          setScrollLength(height * 2) // 2x for good scroll range
                        }
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </SpotlightProvider>
        </div>
      </div>
    </section>
  )
}

export default GridViewport