import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Play, Pause, ArrowRight, Linkedin, Twitter, Globe, X, Mail, Github, Award, Star, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

export default function AboutPageNew() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [selectedTeamMember, setSelectedTeamMember] = useState(null)
  const videoRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

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
    { id: 'branding', title: 'BRANDING' },
    { id: 'web-design', title: 'WEB DESIGN' },
    { id: 'strategy', title: 'STRATEGY' },
    { id: 'motion', title: 'MOTION' },
    { id: 'development', title: 'DEVELOPMENT' }
  ]

  const awards = [
    { year: "2024", title: "Webby Award", category: "Best Visual Design" },
    { year: "2024", title: "FWA Site of the Day", category: "Innovation" },
    { year: "2023", title: "Awwwards", category: "Site of the Year Nominee" },
    { year: "2023", title: "CSS Design Awards", category: "Best UI Design" }
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
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </motion.div>

      {/* 1. Hero Section with Video - Original Design */}
      <section className="relative py-24 px-10 md:px-20 lg:px-44">
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

      {/* 2. Our Approach / Mission Section */}
      <section className="relative py-24 px-10 md:px-20 lg:px-44">
        <div className="w-full">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Philosophy Content */}
              <div>
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                  Our Approach
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-purple-400 mb-3">
                      Creative Vision Meets Business Results
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      We don't just create beautiful designs – we engineer experiences that drive measurable business impact. Every pixel, every interaction, every strategy is purposefully crafted to achieve your goals.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-purple-400 mb-3">
                      Innovators for Innovators
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      We speak the language of tech. From startups to enterprise, we understand the unique challenges of digital transformation and the pace of innovation required to lead markets.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Brand Personality */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { trait: "Bold", icon: <Zap className="w-6 h-6" />, desc: "Fearless in our creative approach" },
                    { trait: "Innovative", icon: <Star className="w-6 h-6" />, desc: "Always pushing boundaries" },
                    { trait: "Expert", icon: <Award className="w-6 h-6" />, desc: "Masters of our craft" },
                    { trait: "Empathic", icon: <Globe className="w-6 h-6" />, desc: "Understanding your vision" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.trait}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                    >
                      <div className="text-purple-400 mb-3">{item.icon}</div>
                      <h4 className="text-xl font-semibold text-white mb-2">{item.trait}</h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Services Section (What We Do) - Ultra Minimalist */}
      <section className="relative py-24 px-10 md:px-20 lg:px-44">
        <div className="w-full">
          <ScrollReveal>
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Services</h2>
              <div className="h-px bg-white/20 flex-1" />
            </div>
          </ScrollReveal>

          {/* Horizontal Scrolling Services */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            
            <div 
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[200px] md:min-w-[240px]"
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group cursor-pointer h-full"
                  >
                    <div className="relative h-40 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-white/[0.05] backdrop-blur-[20px]" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                      <div className="absolute inset-0 rounded-3xl border border-white/[0.1]" />
                      
                      <div className="relative h-full flex items-center justify-center p-8">
                        <h3 className="text-xl md:text-2xl font-bold text-white/90 tracking-wider text-center group-hover:text-white transition-all duration-150">
                          {service.title}
                        </h3>
                      </div>

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.08] via-transparent to-blue-500/[0.08]" />
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team Section (Meet the People) */}
      <section className="relative py-24 px-10 md:px-20 lg:px-44">
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
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative group w-full text-left"
                    aria-label={`View ${member.name}'s profile`}
                  >
                    {/* Compact Business Card Style */}
                    <div className="relative h-[120px] rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                      <div className="absolute inset-0 border border-white/[0.08] rounded-xl" />
                      
                      <div className="relative p-5 h-full flex items-center gap-4">
                        {/* Small Profile Image */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex-shrink-0">
                          <img 
                            src={member.image}
                            alt=""
                            className="w-full h-full object-cover opacity-40 filter contrast-150 brightness-0 invert"
                            style={{ mixBlendMode: 'screen' }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>

                        {/* Minimal Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                            {member.name}
                          </h3>
                          <p className="text-white/60 text-sm mb-3">{member.role}</p>
                          
                          <div className="flex items-center gap-1 text-purple-400">
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
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="min-w-[250px] group"
                      role="listitem"
                      aria-label={`View ${member.name}'s profile`}
                    >
                      <div className="relative h-full rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-[#1A1A1A]/30 backdrop-blur-md" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                        <div className="absolute inset-0 border border-white/[0.05] rounded-xl" />
                        
                        <div className="relative p-6">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                            <img 
                              src={member.image}
                              alt=""
                              className="w-full h-full object-cover opacity-40 filter contrast-150 brightness-0 invert"
                              style={{ mixBlendMode: 'screen' }}
                            />
                          </div>
                          
                          <h4 className="text-white text-lg font-medium mb-1 group-hover:text-purple-400 transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-white/50 text-sm">{member.role}</p>
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

      {/* 5. Awards & Recognition Section */}
      <section className="relative py-24 px-10 md:px-20 lg:px-44">
        <div className="w-full">
          <ScrollReveal>
            <div className="flex items-baseline gap-4 mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-white">Recognition</h2>
              <div className="h-px bg-white/20 flex-1" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="text-purple-400 text-2xl font-bold mb-2">{award.year}</div>
                  <h4 className="text-white font-semibold mb-1">{award.title}</h4>
                  <p className="text-white/60 text-sm">{award.category}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action Section */}
      <section className="relative py-24 px-10 md:px-20 lg:px-44">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="relative p-8 rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl" />
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-3xl" />
              <div className="absolute inset-0 border border-white/[0.05] rounded-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Let's Create Something Extraordinary
                </h2>
                <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">
                  Ready to transform your vision into reality? Let's discuss how we can help you lead your market.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-150 group"
                  >
                    <span>Let's Talk</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="mailto:work@ravie.co"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all duration-150"
                  >
                    <Mail className="w-5 h-5" />
                    <span>work@ravie.co</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team Member Profile Overlay */}
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-3xl" />
              <div className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute inset-0 border border-white/10 rounded-3xl" />
              
              <div className="relative z-10 h-full overflow-y-auto scrollbar-hide">
                <div className="p-8 md:p-12">
                  <button
                    onClick={() => setSelectedTeamMember(null)}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group z-20"
                    aria-label="Close profile"
                  >
                    <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
                  </button>

                  <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0">
                      <img 
                        src={selectedTeamMember.image}
                        alt=""
                        className="w-full h-full object-cover opacity-60 filter contrast-150 brightness-0 invert"
                        style={{ mixBlendMode: 'screen' }}
                      />
                    </div>

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
                      
                      {selectedTeamMember.philosophy && (
                        <blockquote className="italic text-white/70 text-lg border-l-2 border-purple-400 pl-4">
                          "{selectedTeamMember.philosophy}"
                        </blockquote>
                      )}
                    </div>
                  </div>

                  <div className="mb-10">
                    <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">About</h4>
                    <p className="text-white/80 leading-relaxed text-lg">
                      {selectedTeamMember.bio}
                    </p>
                  </div>

                  {selectedTeamMember.personalNote && (
                    <div className="mb-10">
                      <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">Personal Note</h4>
                      <p className="text-white/70 leading-relaxed">
                        {selectedTeamMember.personalNote}
                      </p>
                    </div>
                  )}

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

                  {selectedTeamMember.projects && selectedTeamMember.projects.length > 0 && (
                    <div className="mb-10">
                      <h4 className="text-white/60 text-sm uppercase tracking-wider mb-4">Featured Projects</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedTeamMember.projects.map((project, i) => (
                          <Link
                            key={i}
                            to={`/work/${project.slug || project.name?.toLowerCase().replace(' ', '-') || project.toLowerCase().replace(' ', '-')}`}
                            className="group relative rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 hover:bg-white/10 transition-all"
                          >
                            <span className="text-white/80 group-hover:text-white transition-colors">
                              {project.name || project}
                            </span>
                            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/60 absolute top-4 right-4 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

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