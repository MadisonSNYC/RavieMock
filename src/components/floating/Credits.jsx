import { motion } from 'framer-motion'
import FloatingCard from './FloatingCard'

export default function Credits({ artist, agency, year, additionalCredits = [] }) {
  return (
    <FloatingCard className="p-6 h-full" animate={false}>
      <h3 className="text-white font-medium text-lg mb-4">CREDITS</h3>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Artist:</span>
            <span className="text-white/90">{artist}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Agency:</span>
            <span className="text-white/90">{agency}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Year:</span>
            <span className="text-white/90">{year}</span>
          </div>
        </div>
        
        {additionalCredits.length > 0 && (
          <div className="pt-3 border-t border-white/10 space-y-2">
            {additionalCredits.map((credit, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-white/60">{credit.role}:</span>
                <span className="text-white/90">{credit.name}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </FloatingCard>
  )
}