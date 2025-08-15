import { motion } from 'framer-motion'
import { ArrowRight, Linkedin, Twitter, Github, Mail, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../data/projects'
import { thumbnailMap } from '../data/thumbnails'

/**
 * Reusable Team Member Template Component
 * Can be used for team member cards and profile modals
 * 
 * @param {Object} props
 * @param {Object} props.member - Team member data object
 * @param {string} props.variant - 'card' | 'modal' | 'compact'
 * @param {Function} props.onClick - Click handler for card variant
 * @param {Function} props.onClose - Close handler for modal variant
 */
export default function TeamMemberTemplate({ member, variant = 'card', onClick, onClose }) {
  // Get project data with thumbnails
  const getProjectWithThumbnail = (projectRef) => {
    const projectData = getAllProjects().find(p => p.id === projectRef.slug);
    return {
      ...projectRef,
      thumbnail: projectData ? thumbnailMap[projectData.thumbnail] : null,
      data: projectData
    };
  };

  // Card variant - for grid display
  if (variant === 'card') {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="relative group h-full text-left w-full"
        aria-label={`View ${member.name}'s profile`}
      >
        <div className="relative h-full rounded-2xl overflow-hidden">
          {/* Glassmorphism layers */}
          <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
          <div className="absolute inset-0 border border-white/[0.08] rounded-2xl" />
          
          {/* Content */}
          <div className="relative p-8 h-full flex flex-col">
            {/* Profile Image */}
            <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <img 
                src={member.image || '/ravie-icon.png'}
                alt=""
                className="w-full h-full object-cover opacity-40 filter contrast-150 brightness-0 invert"
                style={{ mixBlendMode: 'screen' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {member.name}
              </h3>
              <p className="text-white/60 mb-4">{member.role}</p>
              <p className="text-white/40 text-sm mb-6 line-clamp-2">{member.bio}</p>
              
              {/* View Profile CTA */}
              <div className="flex items-center gap-2 text-purple-400">
                <span className="text-sm font-medium">View Full Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Hover Effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] via-transparent to-pink-500/[0.05]" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
          </div>
        </div>
      </motion.button>
    );
  }

  // Compact variant - for horizontal scroll
  if (variant === 'compact') {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05, y: -5 }}
        className="min-w-[250px] group"
        aria-label={`View ${member.name}'s profile`}
      >
        <div className="relative h-full rounded-xl overflow-hidden">
          {/* Glassmorphism */}
          <div className="absolute inset-0 bg-[#1A1A1A]/30 backdrop-blur-md" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-xl" />
          
          {/* Content */}
          <div className="relative p-6">
            {/* Profile Image */}
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <img 
                src={member.image || '/ravie-icon.png'}
                alt=""
                className="w-full h-full object-cover opacity-40 filter contrast-150 brightness-0 invert"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
            
            <h3 className="text-white text-lg font-medium mb-1 group-hover:text-purple-400 transition-colors">
              {member.name}
            </h3>
            <p className="text-white/50 text-sm">{member.role}</p>
          </div>

          {/* Hover effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] to-pink-500/[0.03]" />
          </div>
        </div>
      </motion.button>
    );
  }

  // Modal variant - full profile view
  if (variant === 'modal') {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Multi-layer glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute inset-0 border border-white/10 rounded-3xl" />
        
        {/* Scrollable Content */}
        <div className="relative z-10 h-full overflow-y-auto scrollbar-hide">
          <div className="p-8 md:p-12">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group z-20"
              aria-label="Close profile"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              {/* Enhanced Profile Image */}
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0">
                <img 
                  src={member.image || '/ravie-icon.png'}
                  alt=""
                  className="w-full h-full object-cover opacity-60 filter contrast-150 brightness-0 invert"
                  style={{ mixBlendMode: 'screen' }}
                />
                {member.realPhoto && (
                  <img 
                    src={member.realPhoto}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-500"
                  />
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h3 className="text-4xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-2xl text-purple-400 mb-2">
                  {member.title || member.role}
                </p>
                {member.yearsAtRavie && (
                  <p className="text-white/60 mb-6">{member.yearsAtRavie} years at Ravie</p>
                )}
                
                {/* Philosophy Quote */}
                {member.philosophy && (
                  <blockquote className="italic text-white/70 text-lg border-l-2 border-purple-400 pl-4">
                    "{member.philosophy}"
                  </blockquote>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mb-10">
              <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">About</h4>
              <p className="text-white/80 leading-relaxed text-lg">
                {member.bio}
              </p>
            </div>

            {/* Personal Note */}
            {member.personalNote && (
              <div className="mb-10">
                <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">Personal Note</h4>
                <p className="text-white/70 leading-relaxed">
                  {member.personalNote}
                </p>
              </div>
            )}

            {/* Skills */}
            {member.skills && (
              <div className="mb-10">
                <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">Expertise</h4>
                <div className="flex flex-wrap gap-3">
                  {member.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 text-white/80 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects with Thumbnails */}
            {member.projects && member.projects.length > 0 && (
              <div className="mb-10">
                <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">Featured Projects</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {member.projects.map((project, i) => {
                    const projectWithThumbnail = getProjectWithThumbnail(project);
                    
                    return (
                      <Link
                        key={i}
                        to={`/work/${project.slug || project.name.toLowerCase().replace(' ', '-')}`}
                        className="group relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                      >
                        {/* Project Thumbnail */}
                        {projectWithThumbnail.thumbnail && (
                          <div className="aspect-video relative overflow-hidden">
                            <img 
                              src={projectWithThumbnail.thumbnail}
                              alt={project.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          </div>
                        )}
                        
                        {/* Project Name & Metrics */}
                        <div className="p-4 relative">
                          <span className="text-white/80 group-hover:text-white transition-colors font-medium block">
                            {project.name || project}
                          </span>
                          {projectWithThumbnail.data?.metrics && (
                            <span className="text-purple-400 text-xs mt-1 block">
                              {projectWithThumbnail.data.metrics}
                            </span>
                          )}
                          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/60 absolute top-4 right-4 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="flex gap-4">
              {member.linkedin && (
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              )}
              {member.twitter && (
                <a 
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group"
                  aria-label="Twitter profile"
                >
                  <Twitter className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              )}
              {member.github && (
                <a 
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group"
                  aria-label="GitHub profile"
                >
                  <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              )}
              {member.email && (
                <a 
                  href={`mailto:${member.email}`}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group"
                  aria-label="Email contact"
                >
                  <Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}