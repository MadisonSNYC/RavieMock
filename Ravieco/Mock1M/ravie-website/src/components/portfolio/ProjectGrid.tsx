import React from 'react'
import { ProjectCard, Project } from './ProjectCard'

export interface ProjectGridProps {
  projects: Project[]
}

/**
 * Responsive grid layout for project cards
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  )
}

export default ProjectGrid