import { motion } from 'framer-motion'
import FloatingCard from './FloatingCard'

export default function TeamMemberCard({ name, role, image }) {
  return (
    <FloatingCard className="w-full max-w-sm p-6" animate={false}>
      <motion.div 
        className="flex items-center gap-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-xl font-medium">
                {name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <motion.div 
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(139, 92, 246, 0)",
                "0 0 0 8px rgba(139, 92, 246, 0.3)",
                "0 0 0 0 rgba(139, 92, 246, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        <div>
          <h3 className="text-white font-medium text-lg">{name}</h3>
          <p className="text-white/70 text-sm">{role}</p>
        </div>
      </motion.div>
    </FloatingCard>
  )
}