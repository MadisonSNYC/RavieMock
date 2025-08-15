import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Linkedin, Twitter, Globe, X, Mail, Github, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutSectionHomepage() {
  const [selectedTeamMember, setSelectedTeamMember] = useState(null)

  // Team data with early 2000s silhouette style
  const prominentTeam = [
    { 
      id: 'noah-wilde',
      name: "Noah Wilde", 
      role: "Chief Innovation Officer",
      title: "Co-Founder & CIO",
      bio: "Technology innovator pushing the boundaries of digital experiences. Noah specializes in bridging the gap between creative vision and technical execution, bringing 10+ years of experience in creative technology.",
      personalNote: "Passionate about generative art and the intersection of code and creativity.",
      philosophy: "Innovation happens when art meets technology.",
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
      personalNote: "Great design is invisible until it needs to be seen.",
      philosophy: "Great design is invisible until it needs to be seen.",
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

  const additionalTeam = [
    { 
      id: 'sam-essanoussi',
      name: "Sam Essanoussi", 
      role: "Creative Director",
      bio: "Brand storyteller crafting compelling narratives that resonate."
    },
    { 
      id: 'will-taylor',
      name: "Will Taylor", 
      role: "Creative Director",
      bio: "Product design expert creating intuitive and beautiful user experiences."
    },
    { 
      id: 'jackson-redford',
      name: "Jackson Redford", 
      role: "Executive Producer",
      bio: "Production leader ensuring every project exceeds expectations."
    }
  ]

  return (
    <section id="about-section" className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="w-full px-10 md:px-20 lg:px-44">
        
        {/* Section 1: Our Approach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">Our Approach</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div 
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <div className="text-white/40 text-xl mb-4">01</div>
              <h3 className="text-xl text-white mb-3">Discover</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                We dive deep into your brand's essence, understanding your vision and goals to create authentic connections.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <div className="text-white/40 text-xl mb-4">02</div>
              <h3 className="text-xl text-white mb-3">Design</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Crafting visually stunning experiences that captivate audiences and leave lasting impressions.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <div className="text-white/40 text-xl mb-4">03</div>
              <h3 className="text-xl text-white mb-3">Deliver</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Executing with precision to ensure your vision comes to life exactly as imagined, on time and on budget.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Section 2: Meet the People */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Left: Heading */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                Meet the People
              </h2>
              <p className="text-white/60 text-base mb-8">
                A collective of creative minds pushing the boundaries of what's possible in motion design and brand storytelling.
              </p>
            </div>

            {/* Right: Founder Cards - Compact Business Card Style */}
            <div className="space-y-4">
              {prominentTeam.map((member) => (
                <motion.div
                  key={member.id}
                  className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-4 h-[120px] flex items-center gap-4 cursor-pointer group hover:bg-white/[0.06] transition-all duration-150"
                  onClick={() => setSelectedTeamMember(member)}
                  whileHover={{ x: 10 }}
                >
                  {/* Silhouette Avatar */}
                  <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="w-16 h-16 bg-white/10 rounded-full" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-lg text-white font-light">{member.name}</h3>
                    <p className="text-sm text-white/40 mb-3">{member.title}</p>
                    <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-150">
                      View Full Profile →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Team - Horizontal List */}
          <div className="mt-16">
            <h3 className="text-xl text-white/60 mb-6 text-center">Our Team</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {additionalTeam.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full mx-auto mb-2" />
                  <p className="text-sm text-white/80">{member.name}</p>
                  <p className="text-xs text-white/40">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 3: CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          viewport={{ once: true }}
          className="text-center py-16 bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl"
        >
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Ready to Create Something Extraordinary?
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with award-winning motion design.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#00D4FF]/25 transition-all duration-150"
          >
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Team Member Profile Modal */}
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
              transition={{ duration: 0.15 }}
              className="bg-white/[0.08] backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTeamMember(null)}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Profile Content */}
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/10 rounded-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-white font-light mb-1">{selectedTeamMember.name}</h3>
                  <p className="text-white/60 mb-4">{selectedTeamMember.title}</p>
                  <p className="text-white/80 leading-relaxed mb-4">{selectedTeamMember.bio}</p>
                  <p className="text-white/60 italic">{selectedTeamMember.philosophy}</p>
                </div>
              </div>

              {/* Projects */}
              {selectedTeamMember.projects && (
                <div className="mb-6">
                  <h4 className="text-white/60 text-sm mb-3">Project Credits</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeamMember.projects.map((project) => (
                      <Link
                        key={project.slug}
                        to={`/work/${project.slug}`}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 hover:bg-white/20 transition-colors"
                        onClick={() => setSelectedTeamMember(null)}
                      >
                        {project.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="flex gap-4">
                {selectedTeamMember.linkedin && (
                  <a href={selectedTeamMember.linkedin} target="_blank" rel="noopener noreferrer"
                     className="text-white/60 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {selectedTeamMember.twitter && (
                  <a href={selectedTeamMember.twitter} target="_blank" rel="noopener noreferrer"
                     className="text-white/60 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {selectedTeamMember.github && (
                  <a href={selectedTeamMember.github} target="_blank" rel="noopener noreferrer"
                     className="text-white/60 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {selectedTeamMember.email && (
                  <a href={`mailto:${selectedTeamMember.email}`}
                     className="text-white/60 hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}