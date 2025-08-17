import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { VideoPreview, VideoPreviewHandle } from './VideoPreview'
import { useReducedMotionContext } from '../../providers/ReducedMotionProvider'

export interface Project {
  id: string
  title: string
  client?: string
  categories: string[]
  slug: string
  posterSrc: string
  previewSrc: string
  durationSec?: number
}

export interface ProjectCardProps {
  project: Project
}

/**
 * Individual project card with video preview
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const videoRef = useRef<VideoPreviewHandle>(null)
  const { prefersReducedMotion } = useReducedMotionContext()
  
  const handleMouseEnter = () => {
    if (!prefersReducedMotion) {
      videoRef.current?.play()
    }
  }
  
  const handleMouseLeave = () => {
    videoRef.current?.pause()
  }
  
  const handleFocus = () => {
    if (!prefersReducedMotion) {
      videoRef.current?.play()
    }
  }
  
  const handleBlur = () => {
    videoRef.current?.pause()
  }

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 }
  }

  return (
    <motion.article
      className="group relative flex flex-col gap-3 focus-within:outline-none"
      initial={prefersReducedMotion ? false : cardVariants.initial}
      whileInView={prefersReducedMotion ? false : cardVariants.animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link
        to={`/portfolio/${project.slug}`}
        className="relative block overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label={project.title}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div className="aspect-video bg-gray-900">
          <VideoPreview
            ref={videoRef}
            posterSrc={project.posterSrc}
            previewSrc={project.previewSrc}
            autoPlayAllowed={!prefersReducedMotion}
            className="w-full h-full"
          />
        </div>
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Link>
      
      {/* Project info */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-lg font-medium text-white">
          {project.title}
        </h3>
        {project.client && (
          <p className="text-sm text-gray-400">
            {project.client}
          </p>
        )}
        {project.categories.length > 0 && (
          <p className="text-xs text-gray-500">
            {project.categories.join(' · ')}
          </p>
        )}
      </div>
    </motion.article>
  )
}

export default ProjectCard