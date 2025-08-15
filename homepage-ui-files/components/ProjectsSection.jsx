import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getAllProjects } from '../data/projects'

// Featured project components
import CoinbaseFeature from './projects/CoinbaseFeature'
import LoopsFeature from './projects/LoopsFeature'
import KellerWilliamsFeature from './projects/KellerWilliamsFeature'
import CompactProjectCard from './projects/CompactProjectCard'

// Thumbnail imports for compact cards
import JheneThmb from '../assets/JheneThmb.webp'
import Ozonethmb1 from '../assets/Ozonethmb1.webp'
import ososthmb from '../assets/ososthmb.webp'
import { thumbnailMap } from '../data/thumbnails'

// Compact project configurations
const compactProjects = [
  {
    id: 'jhene',
    title: 'Coachella 2024: Jhené Aiko',
    category: 'Concert Visuals',
    tagStyle: 'bg-[#8B5CF6]/20 text-[#8B5CF6]',
    hoverColor: 'bg-gradient-to-t from-[#8B5CF6]/20 to-transparent',
    thumbnail: JheneThmb
  },
  {
    id: 'ozone',
    title: 'Ozone.pro',
    subtitle: 'SaaS Platform',
    category: 'Brand Identity',
    tagStyle: 'bg-[#00D4FF]/20 text-[#00D4FF]',
    hoverColor: 'bg-[#00D4FF]/10',
    thumbnail: Ozonethmb1,
    overlay: (
      <div className="grid grid-cols-3 gap-2 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-2 bg-[#00D4FF]/30 rounded-full" />
        ))}
      </div>
    )
  },
  {
    id: 'osos',
    title: 'OSOS',
    subtitle: 'Minimalist Fashion',
    category: 'Brand Campaign',
    bgStyle: 'light',
    tagStyle: 'bg-black/10 text-black',
    hoverColor: 'bg-black/5',
    thumbnail: ososthmb
  }
]

export default function ProjectsSection() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const projects = getAllProjects()

  return (
    <section className="relative bg-[#0a0a0a] px-8 py-32">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
            Selected Work
          </h2>
          <p className="text-white/60 text-lg max-w-2xl">
            Premium motion design for the world's most innovative brands
          </p>
        </motion.div>

        {/* 6-Column Responsive Grid System */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
          
          {/* Featured Projects */}
          <CoinbaseFeature 
            isHovered={hoveredCard === 'coinbase'} 
            onHover={setHoveredCard} 
          />
          
          <LoopsFeature 
            isHovered={hoveredCard === 'loops'} 
            onHover={setHoveredCard} 
          />
          
          <KellerWilliamsFeature 
            isHovered={hoveredCard === 'kw'} 
            onHover={setHoveredCard} 
          />

          {/* Compact Project Cards */}
          {compactProjects.map((project, index) => (
            <CompactProjectCard
              key={project.id}
              project={project}
              thumbnail={project.thumbnail}
              delay={0.2 + index * 0.05}
            />
          ))}

          {/* Additional projects from data */}
          {projects.slice(6, 9).map((project, index) => (
            <CompactProjectCard
              key={project.id}
              project={{
                ...project,
                tagStyle: 'bg-white/10 text-white/80',
                hoverColor: 'bg-white/5'
              }}
              thumbnail={thumbnailMap[project.thumbnail]}
              delay={0.35 + index * 0.05}
            />
          ))}
        </div>

        {/* View All Work CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-semibold">View All Work</span>
            <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Background depth elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00D4FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}