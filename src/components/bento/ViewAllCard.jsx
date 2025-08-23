/**
 * ViewAllCard Component
 * CTA card for viewing all work
 */

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ViewAllCard({ animationDelay = 0 }) {
  return (
    <motion.div
      className="col-span-2 row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15, delay: animationDelay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-white text-2xl font-bold mb-2">View All Work</h3>
          <p className="text-white/60 mb-4">Explore our complete portfolio</p>
          <ArrowUpRight className="w-8 h-8 text-[#00D4FF] mx-auto group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  )
}