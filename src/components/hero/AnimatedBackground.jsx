import { motion } from 'framer-motion'

/**
 * Animated background with flowing curves and gradient effects for hero sections
 */
export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" fill="none">
        {/* Multiple flowing curves for depth */}
        <motion.path
          d="M-100,200 Q400,50 700,250 T1500,200"
          stroke="#00D4FF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M-200,400 Q300,200 800,350 T1600,300"
          stroke="#00D4FF"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 3.5, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M100,600 Q500,400 900,550 T1400,500"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.25 }}
          transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Organic blob shapes for modern feel */}
        <motion.circle
          cx="200"
          cy="300"
          r="150"
          fill="url(#blueGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.circle
          cx="1200"
          cy="500"
          r="200"
          fill="#8B5CF6"
          opacity="0.08"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 3, delay: 1 }}
        />
      </svg>
      
      {/* Additional depth with gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
    </div>
  )
}