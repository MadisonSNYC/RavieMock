import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Linkedin, Twitter, Github, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../data/projects'
import { thumbnailMap } from '../data/thumbnails'

/**
 * TeamMemberOverlay Component
 * Modal overlay displaying team member details
 * @param {Object} props
 * @param {Object|null} props.member - Team member object or null if closed
 * @param {Function} props.onClose - Callback to close overlay
 * @returns {JSX.Element|null}
 */
export default function TeamMemberOverlay({ member, onClose }) {
  if (!member) return null
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="relative max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            aria-label="Close overlay"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 overflow-hidden">
              <img 
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="text-2xl text-white mb-2">{member.name}</h3>
              <p className="text-white/60">{member.role}</p>
            </div>
          </div>
          
          <p className="text-white/80 leading-relaxed">
            {member.bio || `A talented creative professional who brings unique perspective and expertise to every project. 
            Their dedication to excellence and innovative thinking consistently delivers outstanding results for our clients.`}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}