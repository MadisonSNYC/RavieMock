import { motion } from 'framer-motion'
import { Play, Mail } from 'lucide-react'
import { heroContent } from '../../data/site-content'

/**
 * Main content for hero section including headline, subtitle, and CTAs
 */
export default function HeroContent() {
  const { headline, subtitle, cta } = heroContent

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-5xl"
    >
      {/* Main Headline with high contrast serif */}
      <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
        {headline.line1}{' '}
        <motion.span 
          className="italic text-[#00D4FF] inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {headline.emphasis1}
        </motion.span>
        <br />
        <motion.span 
          className="italic text-[#00D4FF] inline-block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {headline.emphasis2}
        </motion.span>{' '}
        {headline.line2}
      </h1>

      {/* Subtext */}
      <motion.p
        className="text-lg md:text-xl text-white/70 max-w-2xl mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {subtitle}
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {/* Watch Reel Button */}
        <motion.button
          className="group relative px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] rounded-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          
          <span className="relative flex items-center gap-3 text-white font-semibold">
            <Play className="w-5 h-5 fill-white" />
            {cta.primary.text}
          </span>
          
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Email CTA */}
        <motion.a
          href={cta.secondary.action}
          className="group px-8 py-4 border-2 border-white/20 rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center gap-3 text-white font-semibold">
            <Mail className="w-5 h-5" />
            {cta.secondary.text}
          </span>
        </motion.a>
      </motion.div>
    </motion.div>
  )
}