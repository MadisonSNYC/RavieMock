import React from 'react'

/**
 * Project Info Component
 * Minimal implementation to fix missing import
 */

interface ProjectInfoProps {
  project?: any
  title?: string
  description?: string
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({ project, title, description }) => {
  const displayTitle = title || project?.title || 'Untitled Project'
  const displayDescription = description || project?.description || 'No description available'
  
  return (
    <div className="project-info" style={{
      padding: '2rem',
      maxWidth: '600px'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>{displayTitle}</h2>
      <p style={{ color: '#666', lineHeight: '1.6' }}>{displayDescription}</p>
      {project?.details && (
        <div style={{ marginTop: '2rem' }}>
          {Object.entries(project.details).map(([key, value]: [string, any]) => (
            <div key={key} style={{ marginBottom: '0.5rem' }}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}