import React, { useEffect } from 'react'
import { ReducedMotionProvider } from '../../providers/ReducedMotionProvider'
import { GridViewport } from './GridViewport'
import projectsJson from '../../data/projects.json'
import '../../styles/portfolio.css'

/**
 * Work page adapter for GridViewport
 * Uses the same infinite scroll system as portfolio but for /work route
 */
export default function WorkGridViewport() {
  const projects = Array.isArray(projectsJson) ? projectsJson : []
  
  useEffect(() => {
    // Apply the same CSS classes as portfolio route for proper scrolling
    document.body.classList.add('cinematic-tiles')
    document.documentElement.classList.add('no-scrollbars')
    document.body.classList.add('no-scrollbars')
    
    // Ensure critical styles are applied
    const id = 'work-grid-viewport-critical'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = `
        :root { --tile-scale: 0.48; --nav-height: 64px; }
        .portfolio-scroll { height: calc(100vh - var(--nav-height, 0px)); overflow: hidden; touch-action: none; }
        .portfolio-viewport { position: sticky; top: var(--nav-height, 0px); height: calc(100vh - var(--nav-height, 0px)); overflow: hidden; }
        .portfolio-grid { width: 100vw; height: 100%; }
        .portfolio-tile { height: calc((100vh - var(--nav-height, 0px)) * var(--tile-scale, 0.48)); }
      `
      document.head.appendChild(style)
    }
    
    return () => {
      document.body.classList.remove('cinematic-tiles')
      document.documentElement.classList.remove('no-scrollbars')
      document.body.classList.remove('no-scrollbars')
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [])
  
  return (
    <ReducedMotionProvider>
      <GridViewport projects={projects} speed={0.6} />
    </ReducedMotionProvider>
  )
}