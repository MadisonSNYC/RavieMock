import { motion } from 'framer-motion'
import ImageWithFallback from '../ImageWithFallback'

/**
 * Compact project card for grid layout
 * @param {Object} props
 * @param {Object} props.project - Project data
 * @param {string} props.thumbnail - Thumbnail image
 * @param {number} props.delay - Animation delay
 * @param {string} props.className - Additional classes
 */
export default function CompactProjectCard({ project, thumbnail, delay = 0, className = '' }) {
  const isLightBg = project.bgStyle === 'light'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`col-span-2 row-span-1 group relative overflow-hidden rounded-2xl cursor-pointer ${
        isLightBg ? 'bg-white' : 'bg-gradient-to-br from-gray-900 to-black'
      } ${className}`}
    >
      <ImageWithFallback
        src={thumbnail}
        alt={project.title}
        className={`w-full h-full object-cover ${project.opacity || 'opacity-80'}`}
        lazy={true}
      />
      
      <div className={`absolute inset-0 bg-gradient-to-t ${
        isLightBg ? 'from-white/90' : 'from-black/80'
      } to-transparent`} />
      
      {/* Optional tech overlay */}
      {project.overlay && (
        <div className="absolute inset-0 opacity-20">
          {project.overlay}
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className={`px-2 py-1 ${
          project.tagStyle || 'bg-white/10 text-white/80'
        } rounded-full text-xs font-medium`}>
          {project.category}
        </span>
        <h3 className={`text-lg font-bold ${
          isLightBg ? 'text-black' : 'text-white'
        } mt-2`}>
          {project.title}
        </h3>
        {project.subtitle && (
          <p className={`${
            isLightBg ? 'text-gray-600' : 'text-white/60'
          } text-sm`}>
            {project.subtitle}
          </p>
        )}
        {project.metrics && (
          <p className="text-[#00D4FF] text-sm font-medium">{project.metrics}</p>
        )}
      </div>
      
      <div className={`absolute inset-0 ${
        project.hoverColor || 'bg-white/5'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </motion.div>
  )
}