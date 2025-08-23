import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import { thumbnailMap } from '../data/thumbnails'
import { projects } from '../data/projects'

export default function ProjectsBentoGrid() {
  const [hoveredCard, setHoveredCard] = useState(null)

  // Bento grid layout configuration - each item has specific grid positions
  const bentoLayout = [
    {
      id: 'coinbase',
      gridArea: 'coinbase', // 2x2 large card
      className: 'col-span-2 row-span-2',
      project: projects.find(p => p.id === 'coinbase'),
      gradient: 'from-[#00D4FF]/80 via-[#8B5CF6]/60 to-transparent'
    },
    {
      id: 'loops',
      gridArea: 'loops', // 2x1 wide card
      className: 'col-span-2 row-span-1',
      project: projects.find(p => p.id === 'loops'),
      gradient: 'from-[#8B5CF6]/80 to-transparent'
    },
    {
      id: 'kw',
      gridArea: 'kw', // 1x2 tall card
      className: 'col-span-1 row-span-2',
      project: projects.find(p => p.id === 'keller-williams'),
      gradient: 'from-red-600/80 to-transparent'
    },
    {
      id: 'jhene',
      gridArea: 'jhene', // 1x1 square
      className: 'col-span-1 row-span-1',
      project: projects.find(p => p.id === 'jhene-aiko'),
      gradient: 'from-purple-600/80 to-transparent'
    },
    {
      id: 'ozone',
      gridArea: 'ozone', // 1x1 square
      className: 'col-span-1 row-span-1',
      project: projects.find(p => p.id === 'ozone'),
      gradient: 'from-cyan-500/80 to-transparent'
    },
    {
      id: 'osos',
      gridArea: 'osos', // 2x1 wide card
      className: 'col-span-2 row-span-1',
      project: projects.find(p => p.id === 'osos'),
      gradient: 'from-gray-600/80 to-transparent'
    },
    {
      id: 'amex',
      gridArea: 'amex', // 1x1 square
      className: 'col-span-1 row-span-1',
      project: projects.find(p => p.id === 'amex'),
      gradient: 'from-blue-600/80 to-transparent'
    },
    {
      id: 'soho',
      gridArea: 'soho', // 1x1 square
      className: 'col-span-1 row-span-1',
      project: projects.find(p => p.id === 'soho'),
      gradient: 'from-orange-600/80 to-transparent'
    }
  ]

  return (
    <section className="relative bg-[#0a0a0a] px-8 py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Selected Work
          </h2>
          <p className="text-white/60 text-xl max-w-3xl">
            Premium motion design for the world's most innovative brands
          </p>
        </motion.div>

        {/* Cohesive Bento Grid - Desktop */}
        <div className="hidden lg:grid grid-cols-5 grid-rows-4 gap-4 h-[800px]">
          
          {/* Row 1-2: Coinbase (2x2) + Loops (2x1) + KW (1x2) */}
          <motion.div
            className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredCard('coinbase')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <BentoCard 
              project={bentoLayout[0].project}
              gradient={bentoLayout[0].gradient}
              isHovered={hoveredCard === 'coinbase'}
              size="large"
            />
          </motion.div>

          <motion.div
            className="col-span-2 row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredCard('loops')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <BentoCard 
              project={bentoLayout[1].project}
              gradient={bentoLayout[1].gradient}
              isHovered={hoveredCard === 'loops'}
              size="wide"
            />
          </motion.div>

          <motion.div
            className="col-span-1 row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredCard('kw')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <BentoCard 
              project={bentoLayout[2].project}
              gradient={bentoLayout[2].gradient}
              isHovered={hoveredCard === 'kw'}
              size="tall"
            />
          </motion.div>

          {/* Row 2: Jhene + Ozone under Loops */}
          <motion.div
            className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredCard('jhene')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <BentoCard 
              project={bentoLayout[3].project}
              gradient={bentoLayout[3].gradient}
              isHovered={hoveredCard === 'jhene'}
            />
          </motion.div>

          <motion.div
            className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredCard('ozone')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <BentoCard 
              project={bentoLayout[4].project}
              gradient={bentoLayout[4].gradient}
              isHovered={hoveredCard === 'ozone'}
            />
          </motion.div>

          {/* Row 3: OSOS (2x1) + AMEX + SOHO + Extra space */}
          <motion.div
            className="col-span-2 row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredCard('osos')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <BentoCard 
              project={bentoLayout[5].project}
              gradient={bentoLayout[5].gradient}
              isHovered={hoveredCard === 'osos'}
              size="wide"
            />
          </motion.div>

          <motion.div
            className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredCard('amex')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <BentoCard 
              project={bentoLayout[6].project}
              gradient={bentoLayout[6].gradient}
              isHovered={hoveredCard === 'amex'}
            />
          </motion.div>

          <motion.div
            className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredCard('soho')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <BentoCard 
              project={bentoLayout[7].project}
              gradient={bentoLayout[7].gradient}
              isHovered={hoveredCard === 'soho'}
            />
          </motion.div>

          {/* Row 4: View All Work CTA Card */}
          <motion.div
            className="col-span-2 row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
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
        </div>

        {/* Mobile/Tablet Layout */}
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
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BentoCard 
                project={item.project}
                gradient={item.gradient}
                isHovered={false}
                size={item.id === 'coinbase' ? 'large' : item.id === 'loops' || item.id === 'osos' ? 'wide' : 'normal'}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[800px] h-[800px] bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}

// Individual Bento Card Component
function BentoCard({ project, gradient, isHovered, size = 'normal' }) {
  if (!project) return null

  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={thumbnailMap[project.thumbnail]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-end">
        {/* Play button for video projects */}
        {project.category === 'Launch Film' && size === 'large' && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </motion.div>
        )}

        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white/90 border border-white/20">
            {project.category}
          </span>
        </div>

        {/* Title and Metrics */}
        <motion.div
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className={`text-white font-bold mb-1 ${
            size === 'large' ? 'text-3xl' : size === 'wide' ? 'text-2xl' : 'text-xl'
          }`}>
            {project.title}
          </h3>
          {project.client && (
            <p className="text-white/70 text-sm mb-2">{project.client}</p>
          )}
          {project.metrics && (
            <div className="flex items-center gap-2">
              <span className="text-[#00D4FF] text-sm font-semibold">
                {project.metrics}
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}