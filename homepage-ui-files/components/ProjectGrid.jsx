import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

/**
 * Grid layout for displaying project cards
 * @param {Object} props
 * @param {Array} props.projects - Array of project objects
 * @param {string} props.layout - Grid layout type: 'grid' | 'masonry' | 'list'
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onProjectClick - Handler for project clicks
 */
export default function ProjectGrid({ 
  projects = [], 
  layout = 'grid', 
  className = '',
  onProjectClick 
}) {
  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center py-20"
      >
        <p className="body-sans text-white/60 text-lg mb-4">
          No projects found.
        </p>
      </motion.div>
    )
  }

  const getGridClass = () => {
    switch (layout) {
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8'
      case 'list':
        return 'flex flex-col gap-6'
      case 'grid':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`${getGridClass()} ${className}`}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          onClick={() => onProjectClick && onProjectClick(project)}
          className={layout === 'masonry' ? 'break-inside-avoid' : ''}
        />
      ))}
    </motion.div>
  )
}