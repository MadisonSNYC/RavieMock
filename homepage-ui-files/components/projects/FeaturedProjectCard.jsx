import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import ImageWithFallback from '../ImageWithFallback'

/**
 * Featured project card with custom layout and hover effects
 * @param {Object} props
 * @param {Object} props.project - Project data
 * @param {string} props.thumbnail - Thumbnail image source
 * @param {string} props.layoutClass - Grid layout classes
 * @param {number} props.delay - Animation delay
 * @param {Function} props.onHover - Hover callback
 * @param {boolean} props.isHovered - Hover state
 * @param {React.ReactNode} props.children - Custom content overlay
 */
export default function FeaturedProjectCard({ 
  project,
  thumbnail,
  layoutClass = '',
  delay = 0,
  onHover,
  isHovered = false,
  children
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${layoutClass}`}
      onMouseEnter={() => onHover && onHover(project.id)}
      onMouseLeave={() => onHover && onHover(null)}
    >
      {/* Glassmorphism base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#8B5CF6]/10 backdrop-blur-sm" />
      
      {/* Project Image */}
      <ImageWithFallback
        src={thumbnail}
        alt={project.title}
        className="w-full h-full object-cover"
        lazy={true}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Custom content overlay if provided */}
      {children}
      
      {/* Play Button - Premium glass effect */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
        initial={false}
        animate={isHovered ? { scale: 1 } : { scale: 0.8 }}
      >
        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </motion.div>
      
      {/* Project Info */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        {/* Category Pills */}
        {project.tags && (
          <div className="flex items-center gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className={`px-3 py-1 ${tag.bgColor} ${tag.textColor} rounded-full text-xs font-medium backdrop-blur-sm border ${tag.borderColor}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
        
        <h3 className="text-3xl font-bold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-white/70 mb-3">{project.client}</p>
        {project.metrics && (
          <p className="text-[#00D4FF] font-semibold">{project.metrics}</p>
        )}
      </div>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-t from-[#00D4FF]/20 to-transparent`} />
      </div>
    </motion.div>
  )
}