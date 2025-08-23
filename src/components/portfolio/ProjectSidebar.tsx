import React from 'react'

/**
 * Project Sidebar Component
 * Minimal implementation to fix missing import
 */

interface ProjectSidebarProps {
  projects?: any[]
  activeIndex?: number
  onProjectSelect?: (index: number) => void
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ 
  projects = [], 
  activeIndex = 0, 
  onProjectSelect 
}) => {
  return (
    <div className="project-sidebar" style={{
      width: '250px',
      height: '100%',
      backgroundColor: '#f8f8f8',
      padding: '1rem',
      borderRight: '1px solid #e0e0e0'
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Projects</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((project: any, index: number) => (
          <li 
            key={index}
            onClick={() => onProjectSelect?.(index)}
            style={{
              padding: '0.5rem',
              cursor: 'pointer',
              backgroundColor: activeIndex === index ? '#e0e0e0' : 'transparent',
              marginBottom: '0.5rem'
            }}
          >
            {project.title || `Project ${index + 1}`}
          </li>
        ))}
      </ul>
    </div>
  )
}