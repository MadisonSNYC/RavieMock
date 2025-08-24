import { useRef, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import InteractiveTimeline from '../components/InteractiveTimeline'
import ProcessVisualization from '../components/ProcessVisualization'
import RelatedProjectsCarousel from '../components/RelatedProjectsCarousel'
import ScrollReveal from '../components/ScrollReveal'
import MetricCard from '../components/MetricCard'
import FloatingNavigation from '../components/FloatingNavigation'
import ProjectHero from '../components/ProjectHero'
import ProjectEndCTA from '../components/ProjectEndCTA'
import useScrollSpy from '../hooks/useScrollSpy'

/**
 * ProjectPageContent Component
 * Main content component for individual project pages
 * @param {Object} props
 * @param {Object} props.project - Project data object
 * @returns {JSX.Element}
 */
export default function ProjectPageContent({ project }) {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  
  // Section refs for scroll spy
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const deliverablesRef = useRef(null)
  const processRef = useRef(null)
  const resultsRef = useRef(null)
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3])
  const progressBar = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  // Team members who worked on this project
  const teamMembers = useMemo(() => [
    { id: 1, name: "Austin Bauwens", role: "Creative Director", image: "/Assts/Ravie Logos/Vector.png" },
    { id: 2, name: "Noah Wilde", role: "Lead Developer", image: "/Assts/Ravie Logos/Vector.png" },
    { id: 3, name: "Madison", role: "Motion Designer", image: "/Assts/Ravie Logos/Vector.png" }
  ], [])

  // Memoize section navigation configuration
  const sectionNav = useMemo(() => [
    { id: 'hero', label: 'Top', ref: heroRef },
    { id: 'about', label: 'About', ref: aboutRef },
    { id: 'deliverables', label: 'Deliverables', ref: deliverablesRef },
    { id: 'process', label: 'Process', ref: processRef },
    { id: 'results', label: 'Results', ref: resultsRef }
  ], [])
  
  // Use custom scroll spy hook
  const activeSection = useScrollSpy(sectionNav)
  
  // Memoize scroll handler
  const scrollToSection = useCallback((sectionRef) => {
    sectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 z-50 origin-left"
        style={{ scaleX: progressBar }}
      />
      
      {/* Floating Dots Navigation */}
      <FloatingNavigation 
        sections={sectionNav}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Project Page Sub-Header - Sticky Below Main Navigation */}
      <div className="sticky top-20 left-0 right-0 z-30 backdrop-blur-md bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/work')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Work</span>
            </button>
            <div className="h-4 w-px bg-white/20" />
            <p className="text-white/50 text-sm">{project.client} • {project.category}</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <ProjectHero 
        project={project}
        heroRef={heroRef}
        heroY={heroY}
        heroOpacity={heroOpacity}
      />

      {/* Results Section with Animated Metrics - Overlapping hero gradient */}
      <div ref={resultsRef} className="relative z-10 -mt-8 bg-gradient-to-b from-transparent to-black w-full px-10 md:px-20 lg:px-44 pt-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Compact horizontal glowing border container */}
          <div className="relative p-4 md:p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-400/20 shadow-[0_0_20px_rgba(156,163,175,0.2)]">
            {/* Subtle grey/white neon glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-400/5 via-white/5 to-gray-400/5 blur-xl" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                {/* Title - smaller and inline */}
                <ScrollReveal>
                  <h2 className="text-xl md:text-2xl text-white font-light whitespace-nowrap">
                    Impact & Results
                  </h2>
                </ScrollReveal>
                
                {/* Metrics - horizontal layout */}
                <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-8 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl md:text-3xl font-light text-white">250%</span>
                    <span className="text-xs text-white font-medium">Increase in<br/>engagement</span>
                  </div>
                  <div className="w-px h-12 bg-white/10 hidden md:block" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl md:text-3xl font-light text-white">3M+</span>
                    <span className="text-xs text-white font-medium">Video<br/>views</span>
                  </div>
                  <div className="w-px h-12 bg-white/10 hidden md:block" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl md:text-3xl font-light text-white">45%</span>
                    <span className="text-xs text-white font-medium">Conversion<br/>rate boost</span>
                  </div>
                </div>
                
                {/* Compact testimonial */}
                <div className="md:max-w-xs lg:max-w-sm hidden lg:block">
                  <p className="text-sm text-white/80 italic">
                    "Their creative vision delivered results beyond expectations."
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    — {project.clientName || "Marketing Director"}, {project.client}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Tags Section */}
      <section className="relative z-10 bg-black py-12 border-t border-white/10">
        <div className="w-full px-10 md:px-20 lg:px-44">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Service Tags */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-white/40 text-xs uppercase tracking-widest min-w-[80px]">Services</span>
                <div className="flex flex-wrap gap-2">
                  {(project.services || ['Product Launch', 'Brand Design']).map((service, index) => (
                    <motion.span
                      key={service}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 text-xs text-white/70 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      {service}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Industry Tags */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-white/40 text-xs uppercase tracking-widest min-w-[80px]">Industry</span>
                <div className="flex flex-wrap gap-2">
                  {(project.industries || ['Entertainment', 'Web3 & AI']).map((industry, index) => (
                    <motion.span
                      key={industry}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 text-xs text-white/70 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      {industry}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="relative z-10 bg-black">
        {/* About This Project */}
        <div ref={aboutRef} className="w-full px-10 md:px-20 lg:px-44 py-20">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl text-white font-light mb-8">
                About this project
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-white/60 uppercase text-sm mb-4">The Challenge</h3>
                  <p className="text-white/80 leading-relaxed">
                    {project.challenge || "The client needed a fresh perspective to connect with their audience and stand out in a competitive market."}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/60 uppercase text-sm mb-4">Our Approach</h3>
                  <p className="text-white/80 leading-relaxed">
                    {project.approach || "We crafted a comprehensive visual strategy that balanced bold creativity with strategic business objectives."}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Team Credits */}
        <div className="w-full px-10 md:px-20 lg:px-44 py-20 border-t border-white/10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-white font-light mb-12">
              Project Team
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 0.1}>
                <Link
                  to="/about"
                  className="group block p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 overflow-hidden">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-white group-hover:text-purple-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-white/60 text-sm">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 group-hover:text-purple-400 transition-colors">
                    View full team →
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Project End CTA */}
        <ProjectEndCTA projectTitle={project.title} />

        {/* Related Projects Carousel with CTA */}
        <RelatedProjectsCarousel currentProject={project} />
      </section>
    </div>
  )
}