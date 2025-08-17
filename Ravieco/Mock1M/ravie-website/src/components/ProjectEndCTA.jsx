import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'

export default function ProjectEndCTA({ projectTitle = "this project" }) {
  const navigate = useNavigate()

  return (
    <>
      <section className="relative py-20 px-10 md:px-20 lg:px-44 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Inspired by {projectTitle}?
              </h2>
              
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how we can bring your vision to life with the same level of creativity and attention to detail.
              </p>

              {/* Contact Button - Styled to match the grey/white neon theme */}
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => navigate('/contact')}
                  className="group relative px-8 py-4 rounded-xl bg-black/40 backdrop-blur-sm border border-gray-400/30 hover:border-white/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-400/0 via-white/5 to-gray-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Button content */}
                  <div className="relative flex items-center gap-3">
                    <Mail className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                    <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors">
                      Start Your Project
                    </span>
                    <motion.span
                      className="inline-block text-white/60 group-hover:text-white transition-colors"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      →
                    </motion.span>
                  </div>
                  
                  {/* Subtle shadow glow on hover */}
                  <div className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(156,163,175,0)] group-hover:shadow-[0_0_20px_rgba(156,163,175,0.3)] transition-shadow duration-300" />
                </button>
              </motion.div>

              <motion.p 
                className="text-white/40 text-sm mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Response within 24 hours • No commitment required
              </motion.p>
            </div>
          </ScrollReveal>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-vivid-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl" />
      </section>
    </>
  )
}