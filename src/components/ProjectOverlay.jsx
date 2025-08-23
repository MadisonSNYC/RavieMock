import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Play, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProjectOverlay({ project, isOpen, onClose }) {
  const navigate = useNavigate()
  
  if (!project) return null
  
  const handleViewFullProject = () => {
    navigate(`/work/${project.id}`)
    onClose()
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Background Blur */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
          
          {/* Overlay Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
            >
              <X size={20} />
            </button>
            
            {/* Project Image/Video */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              {project.video ? (
                <div className="relative w-full h-full">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Project Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm">
                  {project.category}
                </span>
              </div>
            </div>
            
            {/* Project Details */}
            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl text-white font-light mb-2">
                  {project.title}
                </h2>
                <p className="text-white/60 text-lg">
                  {project.client} • {project.year || '2024'}
                </p>
              </div>
              
              {/* Description */}
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {project.description}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Industry</p>
                  <p className="text-white font-medium">{project.industry}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Metrics</p>
                  <p className="text-white font-medium">{project.metrics}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Duration</p>
                  <p className="text-white font-medium">{project.duration || '8 weeks'}</p>
                </div>
              </div>
              
              {/* Technologies Used */}
              {project.technologies && (
                <div className="mb-8">
                  <h3 className="text-white/60 text-sm uppercase mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white/80 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleViewFullProject}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-2xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
                >
                  View Full Case Study
                  <ArrowRight size={18} />
                </motion.button>
                
                {project.url && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    Live Project
                    <ExternalLink size={18} />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}