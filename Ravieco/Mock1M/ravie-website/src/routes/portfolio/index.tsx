import React from 'react'
import { ReducedMotionProvider } from '../../providers/ReducedMotionProvider'
import { GridViewport } from '../../components/portfolio/GridViewport'
import projectsData from '../../data/projects.json'

/**
 * Portfolio page showcasing all projects with counter-scrolling grid
 */
export function PortfolioPage() {
  return (
    <ReducedMotionProvider>
      <GridViewport projects={projectsData} />
    </ReducedMotionProvider>
  )
}

export default PortfolioPage