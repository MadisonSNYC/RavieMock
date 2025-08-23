import React, { useMemo, useEffect, useRef, useState } from 'react'
import { MasonryColumn } from './MasonryColumn'
import { Project, ProjectCard } from './ProjectCard'
import { useReducedMotionContext } from '../../providers/ReducedMotionProvider'
import { useVirtualScroll } from '../../hooks/useVirtualScroll'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { SpotlightProvider } from './SpotlightContext'
// CustomCursor component removed - was missing

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
  
  // Use virtual scroll for smooth, responsive scrolling
  const { scrollY } = useVirtualScroll(scrollRef, {
    friction: 0.15,
    maxVelocity: 60
  })

  // Update viewport height on resize
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Distribute projects round-robin across 3 columns
  const columns = useMemo(() => {
    // Force 3 columns for desktop grid
    const numColumns = 3
    
    // Initialize columns array
    const cols: Project[][] = [[], [], []]
    
    // Round-robin distribution
    projects.forEach((project, index) => {
      cols[index % numColumns].push(project)
    })
    
    return cols
  }, [projects])

  // Direction policy: mobile = all down, desktop = alternating counter-scroll
  const directionsMobile: Array<'up' | 'down'> = ['down', 'down', 'down']
  const directionsDesktop: Array<'up' | 'down'> = ['up', 'down', 'up']
  const directions = isMobile ? directionsMobile : directionsDesktop
  
  // Reduced speed for calmer, smoother motion
  const desktopSpeed = 0.25
  const mobileSpeed = 0.2
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
        style={{ height: computedScrollLength }}
        tabIndex={0}
        role="region"
        aria-label="Portfolio projects"
      >
        <div
          ref={viewportRef}
          className="portfolio-viewport w-full"
        >
          <SpotlightProvider>
            <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4 h-full w-full bg-black">
              {columns.map((columnProjects, index) => (
                <div
                  key={`column-${index}`}
                  className="relative h-full overflow-hidden"
                >
                  {columnProjects.length > 0 && (
                    <MasonryColumn
                      items={columnProjects}
                      direction={directions[index]}
                      speed={columnSpeed}
                      viewportHeight={viewportHeight}
                      scrollY={scrollY}
                      phase={index * 0.33} // Stagger columns by 1/3 tile each
                      onHeightMeasured={(height) => {
                        // Set scroll length based on column height
                        if (!scrollLength && height > 0) {
                          // Use 1.5x height for smoother scrolling
                          setScrollLength(Math.max(height * 1.5, viewportHeight * 3))
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
      {/* CustomCursor was removed - component was missing */}
    </section>
  )
}

export default GridViewport