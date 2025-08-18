/**
 * SectionHeader Component
 * Header for the bento grid section
 */

import { motion } from 'framer-motion'

export default function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
        Selected Work
      </h2>
      <p className="text-white/60 text-base md:text-lg max-w-3xl">
        Premium motion design for the world's most innovative brands
      </p>
    </motion.div>
  )
}