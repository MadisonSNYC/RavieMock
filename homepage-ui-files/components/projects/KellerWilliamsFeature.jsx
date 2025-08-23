import { motion } from 'framer-motion'
import kwthmb from '../../assets/kwthmb.webp'

export default function KellerWilliamsFeature({ isHovered, onHover }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      viewport={{ once: true }}
      className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl cursor-pointer"
      onMouseEnter={() => onHover('kw')}
      onMouseLeave={() => onHover(null)}
    >
      {/* Red Geometric Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800">
        {/* Geometric Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
          <pattern id="geo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <polygon points="50,0 100,50 50,100 0,50" fill="white" />
            <rect x="25" y="25" width="50" height="50" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#geo)" />
        </svg>
      </div>
      
      {/* Image Overlay */}
      <img
        src={kwthmb}
        alt="Keller Williams Conference"
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-70"
      />
      
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium backdrop-blur-sm">
            Event Visuals
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">Keller Williams</h3>
        <p className="text-white/80 text-sm mb-2">Conference 2024</p>
        <p className="text-white font-semibold">27k+ Attendees</p>
      </div>
      
      {/* Hover Effect */}
      <motion.div 
        className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.div>
  )
}