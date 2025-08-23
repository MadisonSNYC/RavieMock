import { motion } from 'framer-motion'
import FloatingCard from './FloatingCard'

export default function ProjectInfo({ project }) {
  return (
    <FloatingCard className="p-6 h-full" animate={false}>
      <h3 className="text-white font-medium text-lg mb-4">PROJECT INFORMATION</h3>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-white/80 text-sm leading-relaxed">
          {project.description || `A concert film of ${project.title}'s performance at ${project.event || 'the venue'} 2024. 
          Showcasing captivating live show and heartfelt connection with the audience, 
          the project was captured with dynamic camerawork and a vibrant visual identity.`}
        </p>
        
        {project.details && (
          <div className="pt-3 border-t border-white/10 space-y-2">
            {Object.entries(project.details).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-white/60 capitalize">{key}:</span>
                <span className="text-white/80">{value}</span>
              </div>
            ))}
          </div>
        )}
        
        {project.technologies && (
          <div className="pt-3 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </FloatingCard>
  )
}