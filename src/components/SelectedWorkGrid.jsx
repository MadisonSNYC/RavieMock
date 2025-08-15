import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import { thumbnailMap } from '../data/thumbnails'

export default function SelectedWorkGrid() {
  // Get specific projects for the grid
  const coinbase = projects.find(p => p.id === 'coinbase')
  const loops = projects.find(p => p.id === 'loops')
  const jheneAiko = projects.find(p => p.id === 'jhene-aiko')
  const kellerWilliams = projects.find(p => p.id === 'keller-williams')
  const ozone = projects.find(p => p.id === 'ozone')
  const osos = projects.find(p => p.id === 'osos')

  return (
    <section className="relative bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="w-full px-10 md:px-20 lg:px-44">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
            Selected Work
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto">
            Premium motion design for the world's most innovative brands
          </p>
        </motion.div>

        {/* Tetris Bento Grid - Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-3 auto-rows-[140px] max-w-5xl mx-auto">
          
          {/* Row 1-2: Coinbase (2x2) + KW (1x2) + Jhene (1x1) */}
          {/* Coinbase - Large Feature (2x2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0 }}
            viewport={{ once: true }}
            className="col-span-2 row-span-2"
          >
            <Link 
              to={`/work/${coinbase?.id}`}
              className="relative h-full block overflow-hidden rounded-2xl group"
            >
              <img 
                src={thumbnailMap[coinbase?.thumbnail]} 
                alt={coinbase?.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-light mb-1">{coinbase?.title}</h3>
                <p className="text-white/60 text-sm">{coinbase?.category}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Keller Williams - Tall (1x2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.05 }}
            viewport={{ once: true }}
            className="col-span-1 row-span-2"
          >
            <Link 
              to={`/work/${kellerWilliams?.id}`}
              className="relative h-full block overflow-hidden rounded-2xl group"
            >
              <img 
                src={thumbnailMap[kellerWilliams?.thumbnail]} 
                alt={kellerWilliams?.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent" />
              <div className="absolute bottom-6 left-4 right-4">
                <h3 className="text-white text-lg font-light leading-tight">{kellerWilliams?.title}</h3>
                <p className="text-white/60 text-xs mt-1">{kellerWilliams?.metrics}</p>
              </div>
            </Link>
          </motion.div>

          {/* Jhené Aiko - Square (1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-1 row-span-1"
          >
            <Link 
              to={`/work/${jheneAiko?.id}`}
              className="relative h-full block overflow-hidden rounded-2xl group"
            >
              <img 
                src={thumbnailMap[jheneAiko?.thumbnail]} 
                alt={jheneAiko?.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <h3 className="text-white text-sm font-light text-center">{jheneAiko?.title}</h3>
              </div>
            </Link>
          </motion.div>

          {/* View All Projects - CTA Tile (1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.15 }}
            viewport={{ once: true }}
            className="col-span-1 row-span-1"
          >
            <Link 
              to="/work"
              className="relative h-full flex flex-col items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl group hover:bg-white/[0.06] hover:border-white/20 transition-all duration-150"
            >
              <span className="text-white text-sm font-light mb-2">View All</span>
              <span className="text-white text-lg font-light mb-2">Projects</span>
              <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-150" />
            </Link>
          </motion.div>

          {/* Row 3: Loops (2x1) + Ozone (1x1) + OSOS (1x1) */}
          {/* Loops - Wide (2x1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-2 row-span-1"
          >
            <Link 
              to={`/work/${loops?.id}`}
              className="relative h-full block overflow-hidden rounded-2xl group"
            >
              <img 
                src={thumbnailMap[loops?.thumbnail]} 
                alt={loops?.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-pink-900/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-xl font-light">{loops?.title}</h3>
                  <p className="text-white/60 text-xs mt-1">{loops?.metrics}</p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Ozone - Square (1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.25 }}
            viewport={{ once: true }}
            className="col-span-1 row-span-1"
          >
            <Link 
              to={`/work/${ozone?.id}`}
              className="relative h-full block overflow-hidden rounded-2xl group"
            >
              <img 
                src={thumbnailMap[ozone?.thumbnail]} 
                alt={ozone?.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 to-blue-900/60" />
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <h3 className="text-white text-sm font-light text-center">{ozone?.title}</h3>
              </div>
            </Link>
          </motion.div>

          {/* OSOS - Square (1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-1 row-span-1"
          >
            <Link 
              to={`/work/${osos?.id}`}
              className="relative h-full block overflow-hidden rounded-2xl group"
            >
              <img 
                src={thumbnailMap[osos?.thumbnail]} 
                alt={osos?.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <h3 className="text-white text-sm font-light text-center">{osos?.title}</h3>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Mobile/Tablet Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:hidden max-w-3xl mx-auto">
          {[coinbase, loops, jheneAiko, kellerWilliams, ozone, osos].map((project, index) => (
            project && (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/work/${project.id}`}
                  className="relative aspect-square block overflow-hidden rounded-xl group"
                >
                  <img 
                    src={thumbnailMap[project.thumbnail]} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-sm font-light">{project.title}</h3>
                    <p className="text-white/60 text-xs">{project.category}</p>
                  </div>
                </Link>
              </motion.div>
            )
          ))}
          
          {/* View All Projects - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/work"
              className="relative aspect-square flex flex-col items-center justify-center bg-white/[0.03] border border-white/10 rounded-xl group hover:bg-white/[0.06] hover:border-white/20 transition-all duration-150"
            >
              <span className="text-white text-sm font-light mb-1">View All</span>
              <span className="text-white text-base font-light mb-2">Projects</span>
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-150" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}