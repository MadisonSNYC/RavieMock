import React from 'react'
import { AnimatePresence } from 'framer-motion'
import ProjectDetailOverlay from './ProjectDetailOverlay'
import { Project } from './ProjectCard'

type Props = {
  projects: Project[]
  slug: string | undefined
  onClose: () => void
  prefersReducedMotion: boolean
}

export default function TransitionLayer({ 
  projects, 
  slug, 
  onClose, 
  prefersReducedMotion 
}: Props) {
  const project = slug ? projects.find(p => p.slug === slug) : undefined
  
  return (
    <AnimatePresence mode="wait" custom={prefersReducedMotion}>
      {project ? (
        <ProjectDetailOverlay
          key={project.id}
          project={project}
          onClose={onClose}
          prefersReducedMotion={prefersReducedMotion}
        />
      ) : null}
    </AnimatePresence>
  )
}