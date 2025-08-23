import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Project } from './ProjectCard'

type Props = {
  project: Project
  onClose: () => void
  prefersReducedMotion: boolean
}

export default function ProjectDetailOverlay({ 
  project, 
  onClose, 
  prefersReducedMotion 
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Focus trap entry
    closeRef.current?.focus()
    
    const onKey = (e: KeyboardEvent) => { 
      if (e.key === 'Escape') onClose() 
    }
    
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const backdrop = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }

  return (
    <motion.div
      className="fixed inset-0 z-[60]"
      aria-modal="true"
      role="dialog"
      aria-label={`${project.title} details`}
      {...backdrop}
      transition={{ duration: prefersReducedMotion ? 0.12 : 0.24 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Panel (centered) */}
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
        <motion.article
          className="relative w-full max-w-6xl bg-black text-white overflow-hidden"
          layoutId={`card-${project.id}`}
        >
          {/* Shared media */}
          <motion.div 
            layoutId={`media-${project.id}`} 
            className="w-full h-[60vh] bg-black overflow-hidden"
          >
            <video
              src={project.previewSrc} 
              poster={project.posterSrc}
              muted 
              loop 
              playsInline 
              autoPlay
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Shared title */}
          <motion.header
            layoutId={`title-${project.id}`}
            className="p-4 sm:p-6 border-t border-white/10"
          >
            <h1 className="text-2xl sm:text-3xl font-semibold">{project.title}</h1>
            {project.client ? (
              <p className="text-white/70 mt-1">{project.client}</p>
            ) : null}
          </motion.header>

          {/* Body copy */}
          <section className="p-4 sm:p-6 space-y-3 text-sm sm:text-base text-white/80">
            <p>{project.description ?? 'Project description coming soon.'}</p>
            
            {/* Categories */}
            {project.categories && project.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.categories.map((cat, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 text-xs border border-white/20 text-white/60"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Close button */}
          <button
            ref={closeRef}
            onClick={onClose}
            className={clsx(
              "absolute top-2 right-2 sm:top-4 sm:right-4",
              "rounded-none border border-white/30 px-3 py-1 text-sm",
              "hover:bg-white hover:text-black transition",
              "focus:outline-none focus:ring-2 focus:ring-white/50"
            )}
            aria-label="Close project details"
          >
            Close
          </button>
        </motion.article>
      </div>
    </motion.div>
  )
}