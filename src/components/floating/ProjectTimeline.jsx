import { motion } from 'framer-motion'
import FloatingCard from './FloatingCard'

export default function ProjectTimeline({ phases }) {
  return (
    <FloatingCard className="w-full p-6" animate={false}>
      <h3 className="text-white font-medium text-lg mb-6">Project timeline</h3>
      
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center gap-3">
              {/* Phase Indicator */}
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${
                  phase.status === 'completed' 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                    : 'bg-white/30'
                }`} />
                {index < phases.length - 1 && (
                  <div className={`absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-8 ${
                    phase.status === 'completed' 
                      ? 'bg-gradient-to-b from-purple-400/50 to-transparent' 
                      : 'bg-white/20'
                  }`} />
                )}
              </div>
              
              {/* Phase Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">
                    Phase {index + 1}: {phase.name}
                  </span>
                  {phase.status === 'completed' && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-purple-400 text-xs"
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
                
                {/* Progress Bar */}
                <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: phase.status === 'completed' ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </FloatingCard>
  )
}