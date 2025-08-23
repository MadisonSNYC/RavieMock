/**
 * BentoCard Component
 * Individual card within the bento grid
 */

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { thumbnailMap } from '../../data/thumbnails'

export default function BentoCard({ project, gradient, isHovered, size = 'normal' }) {
  if (!project) return null

  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={thumbnailMap[project.thumbnail]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-end">
        {/* Play button for video projects */}
        {project.category === 'Launch Film' && size === 'large' && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </motion.div>
        )}

        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white/90 border border-white/20">
            {project.category}
          </span>
        </div>

        {/* Title and Metrics */}
        <motion.div
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <h3 className={`text-white font-bold mb-1 ${
            size === 'large' ? 'text-3xl' : size === 'wide' ? 'text-2xl' : 'text-xl'
          }`}>
            {project.title}
          </h3>
          {project.client && (
            <p className="text-white/70 text-sm mb-2">{project.client}</p>
          )}
          {project.metrics && (
            <div className="flex items-center gap-2">
              <span className="text-[#00D4FF] text-sm font-semibold">
                {project.metrics}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}