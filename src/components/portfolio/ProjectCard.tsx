import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { VideoPreview, VideoPreviewHandle } from './VideoPreview'
import TitleOverlay from './TitleOverlay'
import { useReducedMotionContext } from '../../providers/ReducedMotionProvider'
import { useSpotlight } from './SpotlightContext'

const HOVER_DELAY_MS = 100

export interface Project {
  id: string
  title: string
  client?: string
  categories: string[]
  slug: string
  posterSrc: string
  previewSrc: string
  durationSec?: number
  description?: string
}

export interface ProjectCardProps {
  project: Project
}

/**
 * Individual project card with video preview and title overlay
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const location = useLocation()
  const videoRef = useRef<VideoPreviewHandle>(null)
  const { prefersReducedMotion } = useReducedMotionContext()
  const { activeId, setActiveId } = useSpotlight()
  const [active, setActive] = useState(false)
  const isActive = activeId === project.id
  const isMuted = activeId !== null && !isActive
  
  const hoverTimer = useRef<number | null>(null)
  const [pointerInside, setPointerInside] = useState(false)
  
  const activate = () => {
    setActive(true)
    setActiveId(project.id)
    if (!prefersReducedMotion) {
      videoRef.current?.play()
    }
  }
  
  const deactivate = () => {
    setActive(false)
    setActiveId(null)
    videoRef.current?.pause()
  }
  
  // POINTER handlers (delayed)
  const handlePointerEnter = () => {
    setPointerInside(true)
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => {
      activate()
    }, HOVER_DELAY_MS)
  }
  
  const handlePointerLeave = () => {
    setPointerInside(false)
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current)
    deactivate()
  }
  
  // KEYBOARD handlers (instant)
  const handleFocus = () => activate()
  const handleBlur = () => deactivate()

  return (
    <article
      data-muted={isMuted ? 'true' : 'false'}
      className="portfolio-card group relative h-full"
    >
      <Link
        to={`/portfolio/${project.slug}`}
        state={{ background: location }}
        className="block relative w-full h-full overflow-hidden rounded-none"
        aria-label={project.title}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div className="w-full h-full">
          <div className="spotlight-content w-full h-full">
            <VideoPreview
              ref={videoRef}
              posterSrc={project.posterSrc}
              previewSrc={project.previewSrc}
              autoPlayAllowed={!prefersReducedMotion}
              className="w-full h-full rounded-none object-cover"
            />
          </div>
          
          <div>
            <TitleOverlay
              title={project.title}
              client={project.client}
              categories={project.categories}
              show={active}
              compact={true}
              className=""
            />
          </div>
        </div>
      </Link>
      
      {/* Visible focus ring for a11y */}
      <div className="pointer-events-none absolute inset-0 rounded-none ring-0 group-focus-within:ring-2 group-focus-within:ring-white/70" />
    </article>
  )
}

export default ProjectCard