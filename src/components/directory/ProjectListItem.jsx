import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Eye } from 'lucide-react'

/**
 * Individual project item in the directory list
 * @param {Object} props
 * @param {Object} props.project - Project data
 * @param {string} props.thumbnail - Thumbnail image source
 * @param {number} props.index - Item index for animation
 * @param {Function} props.onClick - Click handler for closing directory
 */
export default function ProjectListItem({ project, thumbnail, index, onClick }) {
  return (
    <Link 
      to={`/work/${project.id}`}
      onClick={onClick}
      className="block group"
    >
      <motion.div
        whileHover={{ x: 4 }}
        className="relative p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex-shrink-0">
            <img 
              src={thumbnail || project.image || '/ravie-icon.png'}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Tier indicator */}
            {project.tier === 1 && (
              <div className="absolute top-2 left-2 w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium mb-1 truncate group-hover:text-neon-blue transition-colors">
              {project.title}
            </h3>
            <p className="text-white/40 text-xs mb-2">
              {project.client} • {project.category}
            </p>
            {/* Tags */}
            <div className="flex items-center gap-2">
              {project.metrics && (
                <span className="flex items-center gap-1 text-xs text-white/30">
                  <Eye className="w-3 h-3" />
                  {project.metrics}
                </span>
              )}
              {project.featured && (
                <span className="px-2 py-0.5 text-xs bg-neon-blue/10 text-neon-blue rounded-full">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Arrow */}
          <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-neon-blue transition-colors flex-shrink-0" />
        </div>
      </motion.div>
    </Link>
  )
}