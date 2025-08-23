import { motion } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { thumbnailMap } from '../data/thumbnails'
import ImageWithFallback from './ImageWithFallback'

/**
 * Individual project card component with hover effects and animations
 * @param {Object} props
 * @param {Object} props.project - Project data object
 * @param {number} props.index - Index for stagger animation
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 */
export default function ProjectCard({ project, index = 0, className = '', onClick }) {
  const projectUrl = `/work/${project.id}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className={className}
    >
      <Link 
        to={projectUrl}
        className="group relative overflow-hidden rounded-2xl cursor-pointer glass-dark backdrop-blur-sm block"
        onClick={onClick}
        aria-label={`View ${project.title} project details`}
        data-project-card="true"
      >
        {/* Project Image */}
        <div className="aspect-video relative overflow-hidden bg-gray-900">
        <ImageWithFallback
          src={thumbnailMap[project.thumbnail]}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          lazy={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Play Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-[#00D4FF]/20 text-[#00D4FF] rounded-full text-xs font-medium">
            {project.category}
          </span>
          <span className="px-2 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-full text-xs font-medium">
            {project.industry}
          </span>
        </div>
        
        {/* Title & Client */}
        <h3 className="heading-sans text-xl font-bold text-white mb-2 group-hover:text-[#00D4FF] transition-colors">
          {project.title}
        </h3>
        <p className="body-sans text-white/60 text-sm mb-3">
          {project.client}
        </p>
        
        {/* Description */}
        <p className="body-sans text-white/50 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Metrics & Link */}
        <div className="flex items-center justify-between">
          {project.metrics && (
            <span className="text-[#00D4FF] font-semibold text-sm">
              {project.metrics}
            </span>
          )}
          <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
        </div>
      </div>
      </Link>
    </motion.article>
  )
}