/**
 * ContactHero Component
 * Hero section for the contact page
 */

import { motion } from 'framer-motion'

export default function ContactHero() {
  return (
    <div className="relative py-12 mb-16">
      {/* Frosted Glass Background for Hero Top Section */}
      <div className="absolute inset-0 bg-gray-600/20 backdrop-blur-xl border border-white/10 rounded-2xl m-2">
        {/* Additional frosted glass layers */}
        <div className="absolute inset-0 bg-white/[0.03] rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 via-transparent to-gray-600/10 rounded-2xl" />
      </div>
      
      {/* Subtle Glass Background with Neon Glow */}
      <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden">
        {/* Glass Panel */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-neon-blue/20 rounded-2xl shadow-xl">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/[0.03] via-transparent to-neon-blue/[0.01] rounded-2xl" />
          
          {/* Border glow effect */}
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(0,212,255,0.08),inset_0_0_30px_rgba(0,212,255,0.03)]" />
        </div>
        
        {/* Professional edge enhancement */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.05] ring-inset" />
      </div>

      {/* Content Container - Compact */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Ravie Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <img 
            src="/src/assets/Ravielogo1.png" 
            alt="Ravie Logo" 
            className="h-8 mx-auto object-contain"
          />
        </motion.div>

        {/* Main Headlines - Using Typography System */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-display font-display text-white">
            Ready to take your brand to the next level?
          </h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="heading-h2 font-ui text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-vivid-purple"
          >
            Let's get to work.
          </motion.h2>
        </motion.div>
      </div>
    </div>
  )
}