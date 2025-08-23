import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ProjectCard, Project } from '../portfolio/ProjectCard'
import { SpotlightProvider } from '../portfolio/SpotlightContext'
import { useReducedMotionContext } from '../../providers/ReducedMotionProvider'

interface SmoothGridProps {
  projects: Project[]
}

/**
 * Single-column homepage grid with physics-based scrolling and atmospheric effects
 */
export function SmoothGrid({ projects }: SmoothGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotionContext()
  
  // Physics-based scroll progress with spring animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // This effect is redundant - already handled in parent HomePage component
  // Removing to prevent duplicate class additions and improve performance

  return (
    <SpotlightProvider>
      <div ref={containerRef} className="homepage-scroll-container">
        
        {/* Single column project grid */}
        <div className="homepage-grid-wrapper">
          <div className="homepage-single-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="homepage-project-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.8,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                  ease: [0.23, 1, 0.32, 1]
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Atmospheric smoke layers */}
        <div className="homepage-atmosphere">
          <div className="smoke-layer smoke-layer-1"></div>
          <div className="smoke-layer smoke-layer-2"></div>
          <div className="smoke-layer smoke-layer-3"></div>
          <div className="smoke-layer smoke-layer-4"></div>
        </div>
      </div>
    </SpotlightProvider>
  )
}