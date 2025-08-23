/**
 * BentoGridItem Component
 * Wrapper for individual bento grid items with animations
 */

import { motion } from 'framer-motion'
import BentoCard from './BentoCard'

export default function BentoGridItem({ 
  item, 
  index, 
  hoveredCard, 
  setHoveredCard,
  animationDelay = 0
}) {
  return (
    <motion.div
      className={`${item.className} relative group cursor-pointer overflow-hidden rounded-2xl`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15, delay: animationDelay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setHoveredCard(item.id)}
      onHoverEnd={() => setHoveredCard(null)}
    >
      <BentoCard 
        project={item.project}
        gradient={item.gradient}
        isHovered={hoveredCard === item.id}
        size={item.size}
      />
    </motion.div>
  )
}