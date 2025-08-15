import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, X, Linkedin, Twitter, Github, Globe, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { getAllProjects } from '../data/projects'
import { thumbnailMap } from '../data/thumbnails'

export default function MeetTheTeam() {
  const [selectedTeamMember, setSelectedTeamMember] = useState(null)
  const scrollContainerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Enhanced team data structure with CMS-ready fields
  const prominentTeam = [
    { 
      id: 'noah-wilde',
      name: "Noah Wilde", 
      role: "Chief Innovation Officer",
      title: "Co-Founder & CIO",
      bio: "Technology innovator pushing the boundaries of digital experiences. Noah specializes in bridging the gap between creative vision and technical execution, bringing 10+ years of experience in creative technology.",
      personalNote: "Passionate about generative art and the intersection of code and creativity. When not coding, you'll find me exploring new dimensions in digital art.",
      philosophy: "Innovation happens when art meets technology.",
      image: "/ravie-icon.png",
      silhouette: "/silhouette-noah.svg",
      realPhoto: "/team/noah.jpg",
      linkedin: "https://linkedin.com/in/noahwilde",
      twitter: "https://twitter.com/noahwilde",
      github: "https://github.com/noahwilde",
      email: "noah@ravie.co",
      projects: [
        { name: "Jhené Aiko", slug: "jhene-aiko" },
        { name: "Ozone", slug: "ozone" },
        { name: "Chick-fil-A Campaign", slug: "chick-fil-a" }
      ],
      skills: ["Development", "3D", "Creative Tech", "WebGL", "React"],
      yearsAtRavie: 8,
      featured: true
    },
    { 
      id: 'austin-bauwens',
      name: "Austin Bauwens", 
      role: "Chief Operations Officer",
      title: "Co-Founder & COO",
      bio: "Visionary leader with 10+ years driving operational excellence and strategic growth. Austin believes in the power of design to transform businesses and create lasting impact across industries.",
      personalNote: "When not crafting strategies, you'll find me exploring new coffee roasters or hiking mountain trails with my camera.",
      philosophy: "Great design is invisible until it needs to be seen.",
      image: "/ravie-icon.png",
      silhouette: "/silhouette-austin.svg",
      realPhoto: "/team/austin.jpg",
      linkedin: "https://linkedin.com/in/austinbauwens",
      twitter: "https://twitter.com/austinbauwens",
      email: "austin@ravie.co",
      projects: [
        { name: "Coinbase", slug: "coinbase" },
        { name: "Loops", slug: "loops" },
        { name: "Keller Williams", slug: "keller-williams" }
      ],
      skills: ["Strategy", "Operations", "Brand Development", "Business Growth"],
      yearsAtRavie: 8,
      featured: true
    }
  ]

  const horizontalTeam = [
    { 
      id: 'sam-essanoussi',
      name: "Sam Essanoussi", 
      role: "Creative Director",
      bio: "Brand storyteller crafting compelling narratives that resonate.",
      image: "/ravie-icon.png",
      projects: [
        { name: "OSOS Campaign", slug: "osos" }, 
        { name: "Coinbase: OnChain Vision", slug: "coinbase" }
      ]
    },
    { 
      id: 'will-taylor',
      name: "Will Taylor", 
      role: "Creative Director",
      bio: "Product design expert creating intuitive and beautiful user experiences.",
      image: "/ravie-icon.png",
      projects: [
        { name: "Keller Williams Conference", slug: "keller-williams" }
      ]
    },
    { 
      id: 'jackson-redford',
      name: "Jackson Redford", 
      role: "Executive Producer",
      bio: "Production leader ensuring every project exceeds expectations.",
      image: "/ravie-icon.png",
      projects: [
        { name: "Ravie Loops", slug: "loops" }
      ]
    },
    { 
      id: 'tom-anderson',
      name: "Tom Anderson", 
      role: "Motion Designer",
      bio: "Motion artist bringing stories to life through animation.",
      image: "/ravie-icon.png",
      projects: [
        { name: "Jhené Aiko", slug: "jhene-aiko" }
      ]
    },
    { 
      id: 'andre-martinez',
      name: "Andre Martinez", 
      role: "3D Artist",
      bio: "3D specialist creating immersive digital experiences.",
      image: "/ravie-icon.png",
      projects: [
        { name: "Ozone.pro Brand Film", slug: "ozone" }
      ]
    },
    { 
      id: 'connor-blake',
      name: "Connor Blake", 
      role: "Developer",
      bio: "Full-stack developer building robust digital solutions.",
      image: "/ravie-icon.png",
      projects: [
        { name: "Keller Williams Conference", slug: "keller-williams" }
      ]
    },
    { 
      id: 'olivia-chen',
      name: "Olivia Chen", 
      role: "Brand Strategist",
      bio: "Strategic thinker shaping brand narratives and market positioning.",
      image: "/ravie-icon.png",
      projects: [
        { name: "OSOS Campaign", slug: "osos" }
      ]
    },
    { 
      id: 'anne-wilson',
      name: "Anne Wilson", 
      role: "Project Manager",
      bio: "Operations expert keeping projects on track and clients happy.",
      image: "/ravie-icon.png",
      projects: [
        { name: "Coinbase: OnChain Vision", slug: "coinbase" }
      ]
    }
  ]

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedTeamMember) {
        setSelectedTeamMember(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedTeamMember])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedTeamMember) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedTeamMember])

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Background gradient animation */}
      <motion.div 
        className="fixed inset-0 opacity-50"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
      </motion.div>

      {/* Phase 1: Main Layout Grid */}
      <section className="relative z-10 pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Two-column layout: Heading left, Cards right */}
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12 mb-20">
            
            {/* Phase 1: "Meet the People" Heading */}
            <ScrollReveal>
              <div className="flex flex-col justify-center">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                  Meet the
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    People
                  </span>
                </h1>
                <p className="text-white/60 mt-6 text-lg">
                  The creative minds and strategic thinkers behind Ravie's award-winning work
                </p>
              </div>
            </ScrollReveal>

            {/* Phase 1: Prominent Cards for Noah and Austin */}
            <div className="grid md:grid-cols-2 gap-6">
              {prominentTeam.map((member, index) => (
                <ScrollReveal key={member.id} delay={index * 0.1}>
                  <motion.button
                    onClick={() => setSelectedTeamMember(member)}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group h-full text-left"
                    aria-label={`View ${member.name}'s profile`}
                  >
                    {/* Phase 2: Frosted Glass Card */}
                    <div className="relative h-full rounded-2xl overflow-hidden">
                      {/* Glassmorphism layers */}
                      <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                      <div className="absolute inset-0 border border-white/[0.08] rounded-2xl" />
                      
                      {/* Content */}
                      <div className="relative p-8 h-full flex flex-col">
                        {/* Silhouette Image */}
                        <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                          <img 
                            src={member.image}
                            alt=""
                            className="w-full h-full object-cover opacity-40 filter contrast-150 brightness-0 invert"
                            style={{ mixBlendMode: 'screen' }}
                          />
                          {/* Hover overlay */}
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

                      {/* Phase 2: Hover Effects */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] via-transparent to-pink-500/[0.05]" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
                      </div>
                    </div>
                  </motion.button>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Phase 1: Horizontal Scroll for Remaining Team */}
          <ScrollReveal>
            <div className="relative">
              {/* Section Header */}
              <div className="flex justify-between items-baseline mb-8">
                <h2 className="text-3xl font-light text-white">Our Team</h2>
                <p className="text-white/40 text-sm">Scroll to explore →</p>
              </div>

              {/* Horizontal Scroll Container */}
              <div className="relative">
                {/* Fade edges for scroll indication */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
                
                <div 
                  ref={scrollContainerRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollBehavior: 'smooth' }}
                  role="list"
                >
                  {horizontalTeam.map((member, index) => (
                    <motion.button
                      key={member.id}
                      onClick={() => setSelectedTeamMember(member)}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="min-w-[250px] group"
                      role="listitem"
                      aria-label={`View ${member.name}'s profile`}
                    >
                      {/* Phase 2: Frosted Glass Card for Scroll Items */}
                      <div className="relative h-full rounded-xl overflow-hidden">
                        {/* Glassmorphism */}
                        <div className="absolute inset-0 bg-[#1A1A1A]/30 backdrop-blur-md" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                        <div className="absolute inset-0 border border-white/[0.05] rounded-xl" />
                        
                        {/* Content */}
                        <div className="relative p-6">
                          {/* Silhouette */}
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                            <img 
                              src={member.image}
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
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Phase 3: Glassmorphic Profile Popup Overlay */}
      <AnimatePresence>
        {selectedTeamMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-8"
            onClick={() => setSelectedTeamMember(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-title"
          >
            {/* Background blur */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            
            {/* Modal Content */}
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
                    onClick={() => setSelectedTeamMember(null)}
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
                        src={selectedTeamMember.image}
                        alt=""
                        className="w-full h-full object-cover opacity-60 filter contrast-150 brightness-0 invert"
                        style={{ mixBlendMode: 'screen' }}
                      />
                      {selectedTeamMember.realPhoto && (
                        <img 
                          src={selectedTeamMember.realPhoto}
                          alt={selectedTeamMember.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-500"
                        />
                      )}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1">
                      <h3 id="profile-title" className="text-4xl font-semibold text-white mb-2">
                        {selectedTeamMember.name}
                      </h3>
                      <p className="text-2xl text-purple-400 mb-2">
                        {selectedTeamMember.title || selectedTeamMember.role}
                      </p>
                      {selectedTeamMember.yearsAtRavie && (
                        <p className="text-white/60 mb-6">{selectedTeamMember.yearsAtRavie} years at Ravie</p>
                      )}
                      
                      {/* Philosophy Quote */}
                      {selectedTeamMember.philosophy && (
                        <blockquote className="italic text-white/70 text-lg border-l-2 border-purple-400 pl-4">
                          "{selectedTeamMember.philosophy}"
                        </blockquote>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-10">
                    <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">About</h4>
                    <p className="text-white/80 leading-relaxed text-lg">
                      {selectedTeamMember.bio}
                    </p>
                  </div>

                  {/* Personal Note */}
                  {selectedTeamMember.personalNote && (
                    <div className="mb-10">
                      <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">Personal Note</h4>
                      <p className="text-white/70 leading-relaxed">
                        {selectedTeamMember.personalNote}
                      </p>
                    </div>
                  )}

                  {/* Skills */}
                  {selectedTeamMember.skills && (
                    <div className="mb-10">
                      <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">Expertise</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedTeamMember.skills.map((skill, i) => (
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

                  {/* Projects */}
                  {selectedTeamMember.projects && selectedTeamMember.projects.length > 0 && (
                    <div className="mb-10">
                      <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">Projects Contributed</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedTeamMember.projects.map((project, i) => {
                          // Get the actual project data from projects.js
                          const allProjects = getAllProjects();
                          console.log('All projects:', allProjects.map(p => p.id));
                          console.log('Looking for slug:', project.slug);
                          
                          const projectData = allProjects.find(p => p.id === project.slug);
                          console.log('Found project data:', projectData);
                          console.log('Project thumbnail field:', projectData?.thumbnail);
                          console.log('ThumbnailMap:', thumbnailMap);
                          
                          // Use direct path or thumbnailMap
                          const thumbnailPath = projectData ? 
                            (thumbnailMap[projectData.thumbnail] || `/Thumbs/${projectData.thumbnail}`) : 
                            null;
                          console.log('Final thumbnail path:', thumbnailPath);
                          
                          return (
                            <Link
                              key={i}
                              to={`/work/${project.slug || project.name.toLowerCase().replace(' ', '-')}`}
                              className="group relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                            >
                              {/* Project Thumbnail */}
                              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                                {thumbnailPath ? (
                                  <img 
                                    src={thumbnailPath}
                                    alt={project.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <img 
                                      src="/ravie-icon.png"
                                      alt={project.name}
                                      className="w-12 h-12 opacity-20"
                                    />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                              </div>
                              
                              {/* Project Name */}
                              <div className="p-4 relative">
                                <span className="text-white/80 group-hover:text-white transition-colors font-medium">
                                  {project.name || project}
                                </span>
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
                    {selectedTeamMember.linkedin && (
                      <a 
                        href={selectedTeamMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group"
                        aria-label="LinkedIn profile"
                      >
                        <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                      </a>
                    )}
                    {selectedTeamMember.twitter && (
                      <a 
                        href={selectedTeamMember.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group"
                        aria-label="Twitter profile"
                      >
                        <Twitter className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                      </a>
                    )}
                    {selectedTeamMember.github && (
                      <a 
                        href={selectedTeamMember.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group"
                        aria-label="GitHub profile"
                      >
                        <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                      </a>
                    )}
                    {selectedTeamMember.email && (
                      <a 
                        href={`mailto:${selectedTeamMember.email}`}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}