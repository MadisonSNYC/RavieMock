import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function FloatingCard({ children, className, animate = true, ...props }) {
  const floatingAnimation = animate ? {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}

  return (
    <motion.div
      animate={floatingAnimation}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)"
      }}
      className={cn(
        "backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}