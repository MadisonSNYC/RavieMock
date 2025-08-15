import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Play, Pause, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Linkedin, Twitter, Globe, X, Mail, Github, Award, Star, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import { getAllProjects } from '../data/projects'

export default function AboutSectionExact() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [selectedTeamMember, setSelectedTeamMember] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const videoRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const servicesScrollRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const allProjects = getAllProjects()
  
  // Filter projects by selected service
  const filteredProjects = useMemo(() => {
    if (!selectedService) return []
    return allProjects.filter(project => 
      project.services && project.services.includes(selectedService.filterTag)
    )
  }, [selectedService, allProjects])

  // Scroll functions for services
  const scrollLeft = () => {
    if (servicesScrollRef.current) {
      servicesScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (servicesScrollRef.current) {
      servicesScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  // Enhanced team data for prominent members
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
        { name: "Jhene Aiko", slug: "jhene-aiko" },
        { name: "Ozone", slug: "ozone" },
        { name: "CFA", slug: "cfa" }
      ],
      skills: ["Development", "3D", "Creative Tech", "WebGL", "React"],
      yearsAtRavie: 8
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
      yearsAtRavie: 8
    }
  ]

  // Additional team members for horizontal scroll
  const additionalTeam = [
    { 
      id: 'sam-essanoussi',
      name: "Sam Essanoussi", 
      role: "Creative Director",
      bio: "Brand storyteller crafting compelling narratives that resonate.",
      image: "/ravie-icon.png",
      projects: [{ name: "Osos", slug: "osos" }, { name: "Coinbase", slug: "coinbase" }]
    },
    { 
      id: 'will-taylor',
      name: "Will Taylor", 
      role: "Creative Director",
      bio: "Product design expert creating intuitive and beautiful user experiences.",
      image: "/ravie-icon.png",
      projects: [{ name: "Keller Williams", slug: "keller-williams" }]
    },
    { 
      id: 'jackson-redford',
      name: "Jackson Redford", 
      role: "Executive Producer",
      bio: "Production leader ensuring every project exceeds expectations.",
      image: "/ravie-icon.png",
      projects: [{ name: "Loops", slug: "loops" }]
    },
    { 
      id: 'tom-anderson',
      name: "Tom Anderson", 
      role: "Motion Designer",
      bio: "Motion artist bringing stories to life through animation.",
      image: "/ravie-icon.png",
      projects: [{ name: "Jhene Aiko", slug: "jhene-aiko" }]
    },
    { 
      id: 'andre-martinez',
      name: "Andre Martinez", 
      role: "3D Artist",
      bio: "3D specialist creating immersive digital experiences.",
      image: "/ravie-icon.png",
      projects: [{ name: "Ozone", slug: "ozone" }]
    },
    { 
      id: 'connor-blake',
      name: "Connor Blake", 
      role: "Developer",
      bio: "Full-stack developer building robust digital solutions.",
      image: "/ravie-icon.png",
      projects: [{ name: "Keller Williams", slug: "keller-williams" }]
    },
    { 
      id: 'olivia-chen',
      name: "Olivia Chen", 
      role: "Brand Strategist",
      bio: "Strategic thinker shaping brand narratives and market positioning.",
      image: "/ravie-icon.png",
      projects: [{ name: "Osos", slug: "osos" }]
    },
    { 
      id: 'anne-wilson',
      name: "Anne Wilson", 
      role: "Project Manager",
      bio: "Operations expert keeping projects on track and clients happy.",
      image: "/ravie-icon.png",
      projects: [{ name: "Coinbase", slug: "coinbase" }]
    }
  ]

  const services = [
    { 
      id: 'live-experiential', 
      title: 'LIVE EXPERIENTIAL',
      blurb: 'Delivering unforgettable, transfixing experiences through high-impact event visuals and large-scale installations, including Coachella stage visuals',
      filterTag: 'LIVE EXPERIENTIAL'
    },
    { 
      id: 'brand-films', 
      title: 'BRAND FILMS',
      blurb: 'Helping brands introduce or re-introduce themselves with style, building long-term video asset libraries for cohesive brand language',
      filterTag: 'BRAND FILMS'
    },
    { 
      id: 'product-marketing', 
      title: 'PRODUCT MARKETING',
      blurb: 'Simplifying complex bleeding-edge tech into digestible, consumer-friendly messaging and campaigns, turning products into \'no-brainer\' purchases',
      filterTag: 'PRODUCT MARKETING'
    },
    { 
      id: 'social-media', 
      title: 'SOCIAL MEDIA',
      blurb: 'Meeting audiences on LinkedIn, Instagram, Twitter, and TikTok with content that generates millions of views and grows brand followers',
      filterTag: 'SOCIAL MEDIA'
    },
    { 
      id: 'brand-design', 
      title: 'BRAND DESIGN',
      blurb: 'Taking a holistic approach to brand voice and style, ensuring consistent, alluring, and enticing expression across all platforms and touchpoints',
      filterTag: 'BRAND DESIGN'
    },
    { 
      id: 'interactive-web', 
      title: 'INTERACTIVE / WEB',
      blurb: 'Creating engaging web experiences and product interfaces using animation frameworks like Rive and Lottie for consistent, immersive user journeys',
      filterTag: 'INTERACTIVE / WEB'
    },
    { 
      id: 'strategy', 
      title: 'STRATEGY',
      blurb: 'Providing data-driven insights that inform creative decisions, encompassing market research, competitive analysis, user research, and content strategy',
      filterTag: 'STRATEGY'
    }
  ]

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

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
    <div id="about-section" className="relative bg-[#0A0A0A] overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </motion.div>

      {/* 1. Hero Section with Video - Original Design */}
      <section id="about" className="relative py-24 px-10 md:px-20 lg:px-44 scroll-mt-20">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Where Bold Design
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Meets Strategic Marketing
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 mb-12">
                For tech innovators ready to transform their vision into market leadership
              </p>

              {/* Animated Metrics - More Compact */}
              <div className="flex gap-12">
                {[
                  { number: "50+", label: "Projects" },
                  { number: "8", label: "Years" },
                  { number: "100%", label: "Passion" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-purple-400">{stat.number}</div>
                    <div className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Video Section with 9:16 Aspect Ratio */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Video Container with 9:16 Aspect Ratio - More Compact */}
              <div className="relative mx-auto max-w-xs">
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  {/* Video Element */}
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    poster="/ravie-poster.jpg"
                  >
                    <source src="/ravie-showreel.mp4" type="video/mp4" />
                  </video>

                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Play/Pause Button */}
                  <button
                    onClick={toggleVideo}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
                    aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />
                </div>

                {/* Removed floating elements for cleaner look */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 3. Services Section - Title-Only with Click-to-Reveal */}
      <section className="relative py-24">
        <div className="w-full">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 text-center">
              What We Do
            </h2>
          </ScrollReveal>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-full border border-white/10 hover:border-neon-blue/30 flex items-center justify-center group transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-neon-blue transition-colors" />
            </button>
            
            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-full border border-white/10 hover:border-neon-blue/30 flex items-center justify-center group transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-neon-blue transition-colors" />
            </button>

            {/* Services Cards Container */}
            <div className="px-10 md:px-20 lg:px-44">
              <div 
                ref={servicesScrollRef}
                className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide pb-6" 
                style={{ scrollBehavior: 'smooth' }}
              >
                {services.map((service, index) => (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => setSelectedService(service)}
                    className="flex-shrink-0 w-[calc(33.333%-16px)] min-w-[280px] max-w-[400px] group relative"
                  >
                    {/* Card Container */}
                    <div className="relative h-[180px] md:h-[200px] rounded-2xl overflow-hidden">
                      {/* Glassmorphism Card Background */}
                      <div className="absolute inset-0 bg-[#1a1a1a]/30 backdrop-blur-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                      <div className="absolute inset-0 border border-white/[0.05] rounded-2xl" />
                      
                      {/* Title - Always Visible */}
                      <div className="relative h-full flex items-center justify-center p-8">
                        <h3 className="text-white text-2xl md:text-3xl font-bold tracking-[0.2em] text-center">
                          {service.title}
                        </h3>
                      </div>

                      {/* Subtle Hover Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8"
          >
            <p className="text-white/30 text-sm tracking-widest uppercase">Click to explore</p>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section - Moved from HomePage */}
      <section id="our-approach" className="relative py-24 overflow-hidden">
        <div className="w-full px-10 md:px-20 lg:px-44">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="heading-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Approach
            </h2>
          </motion.div>

          {/* Approach Content Sections */}
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            {[
              {
                headline: "Creative Vision Meets Business Results",
                description: "Ravie creates cult followings for brands. We don't just create visuals; we are the best fit to ensure that your customers are fans first; massively increasing brand trust and conversion rates as a result. Our approach is holistic, aligning creative work with business KPIs, whether it's supporting fundraises or increasing conversion rates. We are innovators for innovators, bringing cutting-edge creativity to tech and fintech products."
              },
              {
                headline: "Innovation Through Collaboration",
                description: "We are extremely nimble. As one of the most efficient creative teams around, we retain flexibility to slot seamlessly into existing creative teams bolstering production and quality. Our process emphasizes collaboration and transparency, ensuring your feedback is heard and implemented, helping bold ideas become beloved brands."
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-neon-blue/30 transition-all duration-300">
                  <h3 className="heading-sans text-2xl font-bold text-white mb-6">
                    {section.headline}
                  </h3>
                  <p className="body-sans text-base text-white/80 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Differentiators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="heading-sans text-2xl md:text-3xl font-bold text-white text-center mb-12">
              Key Differentiators
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Zap,
                emoji: "🚀",
                title: "Nimble & Efficient",
                description: "We are extremely nimble and one of the most efficient creative teams around, able to slot seamlessly into existing creative teams. We ensure quick turnaround times for projects, demonstrating operational flexibility and scalability."
              },
              {
                icon: Star,
                emoji: "✨",
                title: "Premium Craftsmanship",
                description: "Our approach ensures a consistent, alluring, and enticing expression across all platforms and touchpoints, with a focus on high craftsmanship and meticulous execution. Our work is an industry staple trusted by startups to Fortune 500 brands."
              },
              {
                icon: Award,
                emoji: "💡",
                title: "Cutting-Edge Innovation",
                description: "We are innovators for innovators, specializing in motion design, 3D and interactive media. We utilize Rive, Lottie, and other animation frameworks for web, and stay ahead in AI and Web3, always exploring \"what's next\"."
              },
              {
                icon: Globe,
                emoji: "🎯",
                title: "Tangible Business Impact",
                description: "We deliver measurable business impact by directly addressing client needs like increased conversion rates or successful fundraises. Our projects have achieved 25 million organic views and grown followings by 200K followers in 2 months, proving our results-driven approach."
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <button className="w-full text-left group">
                    <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-neon-blue/30 hover:bg-card/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-blue/10">
                      <div className="flex items-start gap-4">
                        {/* Icon Container */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-vivid-purple/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-neon-blue" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <h4 className="heading-sans text-lg font-bold text-white group-hover:text-neon-blue transition-colors duration-300 mb-3">
                            {item.title}
                          </h4>
                          <p className="body-sans text-sm text-white/70 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="glass-card p-12 rounded-3xl border border-white/10">
              <h3 className="heading-sans text-2xl md:text-3xl font-bold text-white mb-6">
                Ready to Create Something Extraordinary?
              </h3>
              <p className="body-sans text-base text-white/70 mb-8 max-w-2xl mx-auto">
                Let's discuss how our approach can transform your brand and drive measurable results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-vivid-purple text-black rounded-full heading-sans font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
                  Start a Project
                </button>
                <button className="px-8 py-4 border border-white/20 text-white rounded-full heading-sans font-semibold hover:bg-white/10 transition-all duration-300">
                  View Our Work
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-vivid-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl"></div>
      </section>

      {/* 4. Team Section (Meet the People) - EXACT COPY */}
      <section id="team" className="relative py-24 px-10 md:px-20 lg:px-44 scroll-mt-20">
        <div className="w-full">
          {/* 50/50 Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            
            {/* Left Column - Team Heading (50% width) */}
            <ScrollReveal>
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Meet the
                  <br />
                  People
                </h2>
                <p className="text-white/60 text-base mt-4">
                  The creative minds behind Ravie's award-winning work
                </p>
              </div>
            </ScrollReveal>

            {/* Right Column - Founder Cards Stacked Vertically (50% width) */}
            <div className="flex flex-col gap-4">
              {prominentTeam.map((member, index) => (
                <ScrollReveal key={member.id} delay={index * 0.1}>
                  <motion.button
                    onClick={() => setSelectedTeamMember(member)}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -4,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group w-full text-left focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-black rounded-xl"
                    aria-label={`View ${member.name}'s profile`}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Enhanced Frosted Glass Card */}
                    <div className="relative h-[120px] rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-neon-blue/10">
                      {/* Glassmorphism Background */}
                      <div className="absolute inset-0 bg-[#1A1A1A]/30 backdrop-blur-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                      
                      {/* Enhanced Border with Hover Glow */}
                      <div className="absolute inset-0 border border-white/[0.08] rounded-xl group-hover:border-neon-blue/30 group-hover:shadow-inner transition-all duration-300" />
                      
                      {/* Subtle Inner Glow on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative p-5 h-full flex items-center gap-4">
                        {/* Enhanced Profile Image */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex-shrink-0">
                          <img 
                            src={member.image}
                            alt=""
                            className="w-full h-full object-cover opacity-40 filter contrast-150 brightness-0 invert transition-all duration-300 group-hover:opacity-60 group-hover:scale-105"
                            style={{ mixBlendMode: 'screen' }}
                          />
                          {/* Enhanced Hover Glow */}
                          <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          <div className="absolute inset-0 border border-transparent group-hover:border-neon-blue/20 rounded-lg transition-all duration-300" />
                        </div>

                        {/* Minimal Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-neon-blue transition-colors duration-300">
                            {member.name}
                          </h3>
                          <p className="text-white/60 text-sm mb-3 group-hover:text-white/80 transition-colors duration-300">{member.role}</p>
                          
                          <div className="flex items-center gap-1 text-neon-blue group-hover:text-vivid-purple transition-colors duration-300">
                            <span className="text-xs font-medium">View Full Profile</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>

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

          {/* Horizontal Scroll for Remaining Team */}
          <ScrollReveal>
            <div className="relative">
              <div className="flex justify-between items-baseline mb-8">
                <h3 className="text-3xl font-light text-white">Our Team</h3>
                <p className="text-white/40 text-sm">Scroll to explore →</p>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
                
                <div 
                  ref={scrollContainerRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollBehavior: 'smooth' }}
                  role="list"
                >
                  {additionalTeam.map((member, index) => (
                    <motion.button
                      key={member.id}
                      onClick={() => setSelectedTeamMember(member)}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        scale: 1.03, 
                        y: -8,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="min-w-[250px] group focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-black rounded-xl"
                      role="listitem"
                      aria-label={`View ${member.name}'s profile`}
                      tabIndex={0}
                    >
                      {/* Enhanced Frosted Glass Card */}
                      <div className="relative h-full rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-neon-blue/10">
                        {/* Enhanced Glassmorphism Background */}
                        <div className="absolute inset-0 bg-[#1A1A1A]/30 backdrop-blur-2xl" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                        
                        {/* Enhanced Border with Hover Glow */}
                        <div className="absolute inset-0 border border-white/[0.08] rounded-xl group-hover:border-neon-blue/30 transition-all duration-300" />
                        
                        {/* Subtle Inner Glow on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative p-6">
                          {/* Enhanced Profile Image */}
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 relative">
                            <img 
                              src={member.image}
                              alt=""
                              className="w-full h-full object-cover opacity-40 filter contrast-150 brightness-0 invert transition-all duration-300 group-hover:opacity-60 group-hover:scale-105"
                              style={{ mixBlendMode: 'screen' }}
                            />
                            {/* Enhanced Image Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
                            <div className="absolute inset-0 border border-transparent group-hover:border-neon-blue/30 rounded-full transition-all duration-300" />
                          </div>
                          
                          <h4 className="text-white text-lg font-medium mb-1 group-hover:text-neon-blue transition-colors duration-300">
                            {member.name}
                          </h4>
                          <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors duration-300">{member.role}</p>
                        </div>

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

      {/* Team Member Profile Modal - EXACT COPY */}
      <AnimatePresence>
        {selectedTeamMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedTeamMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="bg-[#1A1A1A]/90 backdrop-blur-2xl rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto border border-white/10 shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="team-member-name"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTeamMember(null)}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
                aria-label="Close profile"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Enhanced Profile Header */}
              <div className="flex items-start gap-8 mb-10">
                <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-neon-blue/10 to-vivid-purple/10 flex-shrink-0">
                  <img 
                    src={selectedTeamMember.image}
                    alt=""
                    className="w-full h-full object-cover opacity-50 filter contrast-150 brightness-0 invert"
                    style={{ mixBlendMode: 'screen' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 via-vivid-purple/20 to-transparent" />
                  <div className="absolute inset-0 border border-neon-blue/20 rounded-2xl" />
                </div>
                
                <div className="flex-1">
                  <h3 id="team-member-name" className="text-4xl font-bold text-white mb-3">{selectedTeamMember.name}</h3>
                  <p className="text-neon-blue font-semibold text-lg mb-4">{selectedTeamMember.title || selectedTeamMember.role}</p>
                  <p className="text-white/80 leading-relaxed text-lg mb-4">{selectedTeamMember.bio}</p>
                  
                  {selectedTeamMember.personalNote && (
                    <blockquote className="text-white/60 italic border-l-2 border-neon-blue/30 pl-6 bg-white/[0.02] p-4 rounded-r-xl mb-6">
                      "{selectedTeamMember.personalNote}"
                    </blockquote>
                  )}
                  
                </div>
              </div>

              {/* Two Column Content Layout */}
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Left Column: Skills & Expertise */}
                <div className="space-y-6">
                  {/* Skills */}
                  {selectedTeamMember.skills && (
                    <div>
                      <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTeamMember.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-neon-blue/10 text-neon-blue rounded-full text-sm border border-neon-blue/20 hover:bg-neon-blue/20 transition-colors duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Projects Contributed */}
                <div className="space-y-6">
                  {selectedTeamMember.projects && selectedTeamMember.projects.length > 0 && (
                    <div>
                      <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">Projects Contributed</h4>
                      <div className="space-y-3">
                        {selectedTeamMember.projects.map((project, index) => (
                          <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              to={`/work/${project.slug}`}
                              className="group relative block p-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-black"
                              onClick={() => setSelectedTeamMember(null)}
                              aria-label={`View ${project.name} project details`}
                            >
                              {/* Enhanced Glassmorphism Background */}
                              <div className="absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-xl" />
                              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                              
                              {/* Enhanced Border with Hover Glow */}
                              <div className="absolute inset-0 border border-white/[0.08] rounded-xl group-hover:border-neon-blue/40 group-hover:shadow-lg group-hover:shadow-neon-blue/10 transition-all duration-300" />
                              
                              {/* Subtle Inner Glow on Hover */}
                              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/[0.02] to-vivid-purple/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              {/* Content with Thumbnail */}
                              <div className="relative flex items-center gap-3">
                                {/* Project Thumbnail */}
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex-shrink-0">
                                  <img 
                                    src="/ravie-icon.png"
                                    alt={project.name}
                                    className="w-full h-full object-cover opacity-60 filter contrast-150 brightness-0 invert transition-all duration-300 group-hover:opacity-80 group-hover:scale-105"
                                    style={{ mixBlendMode: 'screen' }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                </div>
                                
                                {/* Project Name */}
                                <span className="text-white/90 font-medium group-hover:text-neon-blue transition-colors duration-300 flex-1">
                                  {project.name}
                                </span>
                                
                                {/* Arrow */}
                                <ArrowRight className="w-4 h-4 text-white/30 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-neon-blue transition-all duration-300 flex-shrink-0" />
                              </div>
                              
                              {/* Bottom Glow Line */}
                              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                {selectedTeamMember.linkedin && (
                  <a
                    href={selectedTeamMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {selectedTeamMember.twitter && (
                  <a
                    href={selectedTeamMember.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Twitter profile"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {selectedTeamMember.github && (
                  <a
                    href={selectedTeamMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="GitHub profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {selectedTeamMember.email && (
                  <a
                    href={`mailto:${selectedTeamMember.email}`}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Email contact"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                
                {selectedTeamMember.yearsAtRavie && (
                  <span className="ml-auto text-white/40 text-sm">
                    {selectedTeamMember.yearsAtRavie} years at Ravie
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Modal Popup - Glassmorphic Overlay */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="bg-[#1A1A1A]/90 backdrop-blur-xl rounded-3xl p-8 max-w-5xl w-full max-h-[80vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Close service details"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Column 1: Service Blurb */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedService.title}</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-vivid-purple rounded-full mb-6"></div>
                  </div>
                  
                  <p className="text-white/80 leading-relaxed text-lg">
                    {selectedService.blurb}
                  </p>

                  {/* Service Features/Details */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                      <span className="text-white/60 text-sm">Premium Quality Execution</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-vivid-purple rounded-full"></div>
                      <span className="text-white/60 text-sm">Cutting-Edge Technology</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                      <span className="text-white/60 text-sm">Results-Driven Approach</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/work?service=${encodeURIComponent(selectedService.filterTag)}`}
                    onClick={() => setSelectedService(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-vivid-purple text-black rounded-full font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105 mt-6"
                  >
                    View All {selectedService.title} Projects
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Column 2: Tagged Projects */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Related Projects</h3>
                  
                  {filteredProjects.length > 0 ? (
                    <div className="space-y-4">
                      {filteredProjects.slice(0, 4).map((project) => (
                        <Link
                          key={project.id}
                          to={`/work/${project.id}`}
                          onClick={() => setSelectedService(null)}
                          className="block group"
                        >
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-neon-blue/30 transition-all duration-300"
                          >
                            {/* Project Thumbnail */}
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex-shrink-0">
                              <img 
                                src={project.image || project.thumbnail || '/ravie-icon.png'}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Project Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium mb-1 truncate group-hover:text-neon-blue transition-colors">
                                {project.title}
                              </h4>
                              <p className="text-white/40 text-sm">
                                {project.client} • {project.category}
                              </p>
                              {project.metrics && (
                                <p className="text-white/30 text-xs mt-1">
                                  {project.metrics}
                                </p>
                              )}
                            </div>

                            {/* Arrow Icon */}
                            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-neon-blue transition-colors flex-shrink-0" />
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                      <p className="text-white/40">No projects available for this service yet.</p>
                    </div>
                  )}

                  {filteredProjects.length > 4 && (
                    <Link
                      to={`/work?service=${encodeURIComponent(selectedService.filterTag)}`}
                      onClick={() => setSelectedService(null)}
                      className="block mt-4 text-center text-neon-blue hover:text-vivid-purple transition-colors text-sm"
                    >
                      View all {filteredProjects.length} projects →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}