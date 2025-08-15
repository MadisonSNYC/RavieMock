import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectPageContent from './ProjectPageContent'

export default function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const foundProject = projects.find(p => p.id === id)
    if (foundProject) {
      setProject(foundProject)
      // Adapt page colors to project brand
      document.documentElement.style.setProperty('--project-accent', foundProject.brandColor || '#8B5CF6')
    } else {
      navigate('/work')
    }
    
    // Set mounted after initial render
    setMounted(true)
    
    return () => {
      document.documentElement.style.removeProperty('--project-accent')
    }
  }, [id, navigate])

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white"
        >
          Loading project...
        </motion.div>
      </div>
    )
  }

  // Only render content after component is mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white"
        >
          Loading...
        </motion.div>
      </div>
    )
  }

  return <ProjectPageContent project={project} />
}