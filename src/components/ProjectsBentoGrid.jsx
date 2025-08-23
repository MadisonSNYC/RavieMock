/**
 * ProjectsBentoGrid Component - Refactored
 * Main container for the bento grid layout
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './bento/SectionHeader'
import BentoGridItem from './bento/BentoGridItem'
import ViewAllCard from './bento/ViewAllCard'
import BackgroundOrbs from './bento/BackgroundOrbs'
import BentoCard from './bento/BentoCard'
import { bentoLayout, getAnimationDelay } from './bento/bentoConfig'

export default function ProjectsBentoGrid() {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <section className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="w-full px-10 md:px-20 lg:px-44">
        
        <SectionHeader />

        {/* Desktop Bento Grid */}
        <DesktopGrid 
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
        />

        {/* Mobile/Tablet Layout */}
        <MobileGrid 
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
        />
      </div>

      <BackgroundOrbs />
    </section>
  )
}

/**
 * Desktop Grid Layout
 */
function DesktopGrid({ hoveredCard, setHoveredCard }) {
  // Define specific items for desktop layout with exact positioning
  const desktopItems = [
    { ...bentoLayout[0], delay: 0 },      // coinbase
    { ...bentoLayout[1], delay: 0.1 },    // loops
    { ...bentoLayout[2], delay: 0.15 },   // kw
    { ...bentoLayout[3], delay: 0.2 },    // jhene
    { ...bentoLayout[4], delay: 0.25 },   // ozone
    { ...bentoLayout[5], delay: 0.3 },    // osos
    { ...bentoLayout[6], delay: 0.35 },   // amex
    { ...bentoLayout[7], delay: 0.4 }     // soho
  ]

  return (
    <div className="hidden lg:grid grid-cols-5 grid-rows-4 gap-3 h-[600px]">
      {desktopItems.map((item) => (
        <BentoGridItem
          key={item.id}
          item={item}
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
          animationDelay={item.delay}
        />
      ))}
      
      <ViewAllCard animationDelay={0.45} />
    </div>
  )
}

/**
 * Mobile Grid Layout
 */
function MobileGrid({ hoveredCard, setHoveredCard }) {
  return (
    <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-4">
      {bentoLayout.map((item, index) => (
        <motion.div
          key={item.id}
          className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
            item.id === 'coinbase' ? 'col-span-2 row-span-2' :
            item.id === 'loops' || item.id === 'osos' ? 'col-span-2' :
            'col-span-1'
          } aspect-square md:aspect-auto`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, delay: getAnimationDelay(index) }}
          viewport={{ once: true }}
        >
          <BentoCard 
            project={item.project}
            gradient={item.gradient}
            isHovered={false}
            size={item.size}
          />
        </motion.div>
      ))}
    </div>
  )
}