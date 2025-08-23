import { motion } from 'framer-motion'
import { Eye, ExternalLink } from 'lucide-react'

/**
 * Individual project item in the directory list
 * @param {Object} props
 * @param {Object} props.project - Project data
 * @param {string} props.thumbnail - Thumbnail image source
 * @param {number} props.index - Item index for animation
 */
export default function ProjectListItem({ project, thumbnail, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
    >
      {/* Project Thumbnail */}
      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Tier indicator */}
        {project.tier === 1 && (
          <div className="absolute top-1 left-1 w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
        )}
      </div>

      {/* Project Info */}
      <div className="flex-1 min-w-0">
        <h4 className="heading-sans text-sm font-semibold text-white group-hover:text-neon-blue transition-colors truncate">
          {project.title}
        </h4>
        <p className="body-sans text-xs text-white/60 mb-2 line-clamp-2">
          {project.description}
        </p>
        
        {/* Metrics */}
        <div className="flex items-center gap-3 text-xs text-white/40">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{project.metrics}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-vivid-purple/60" />
            <span>{project.industry}</span>
          </div>
        </div>
      </div>

      {/* External Link */}
      <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
    </motion.div>
  )
}