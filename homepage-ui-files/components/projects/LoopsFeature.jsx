import { motion } from 'framer-motion'
import LoopsWP from '../../assets/LoopsWP.webp'

export default function LoopsFeature({ isHovered, onHover }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="col-span-2 lg:col-span-3 row-span-1 group relative overflow-hidden rounded-2xl cursor-pointer"
      onMouseEnter={() => onHover('loops')}
      onMouseLeave={() => onHover(null)}
    >
      {/* Mosaic Grid Background */}
      <div className="absolute inset-0 grid grid-cols-4 gap-0.5 bg-black">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900">
            <img
              src={LoopsWP}
              alt=""
              className="w-full h-full object-cover opacity-60"
              style={{ objectPosition: `${(i % 4) * 25}% ${Math.floor(i / 4) * 50}%` }}
            />
          </div>
        ))}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex items-center">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium backdrop-blur-sm">
              Social Content
            </span>
            <span className="px-3 py-1 bg-[#00D4FF]/20 text-[#00D4FF] rounded-full text-xs font-medium">
              25M+ Views
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Ravie Loops</h3>
          <p className="text-white/70">Internal Project</p>
        </div>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/10 to-[#8B5CF6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}