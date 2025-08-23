import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, Check, Clock, Target } from 'lucide-react'

export default function InteractiveTimeline({ phases = [] }) {
  const [activePhase, setActivePhase] = useState(0)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  const defaultPhases = phases.length > 0 ? phases : [
    {
      id: 1,
      name: "Discovery & Research",
      duration: "Week 1-2",
      status: "completed",
      description: "Deep dive into brand identity, target audience analysis, and creative exploration.",
      deliverables: ["Brand audit", "Mood boards", "Creative brief"],
      icon: Target
    },
    {
      id: 2,
      name: "Concept Development",
      duration: "Week 3-4",
      status: "completed",
      description: "Developing multiple creative concepts and refining the chosen direction.",
      deliverables: ["3 concept presentations", "Style frames", "Animation tests"],
      icon: Clock
    },
    {
      id: 3,
      name: "Production",
      duration: "Week 5-8",
      status: "completed",
      description: "Full production including filming, animation, and post-production.",
      deliverables: ["Raw footage", "Animation sequences", "Sound design"],
      icon: Calendar
    },
    {
      id: 4,
      name: "Delivery & Launch",
      duration: "Week 9",
      status: "completed",
      description: "Final delivery, platform optimization, and launch support.",
      deliverables: ["Final masters", "Platform variants", "Launch assets"],
      icon: Check
    }
  ]

  return (
    <div ref={containerRef} className="relative py-20">
      {/* Background Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/10">
        <motion.div 
          className="w-full bg-gradient-to-b from-purple-500 to-pink-500"
          style={{ height: `${lineProgress}%` }}
        />
      </div>
      
      {/* Timeline Items */}
      <div className="relative space-y-24">
        {defaultPhases.map((phase, index) => {
          const Icon = phase.icon || Check
          const isActive = index === activePhase
          const isCompleted = phase.status === 'completed'
          
          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'
              }`}
            >
              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setActivePhase(index)}
                className={`
                  p-8 rounded-2xl cursor-pointer transition-all
                  ${isActive 
                    ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/50' 
                    : 'bg-white/5 border-white/10'
                  }
                  backdrop-blur-md border
                `}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${isCompleted 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                      : 'bg-white/10'
                    }
                  `}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-medium">{phase.name}</h3>
                    <p className="text-white/60 text-sm">{phase.duration}</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-4">{phase.description}</p>
                
                {isActive && phase.deliverables && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-white/60 text-sm uppercase mb-2">Deliverables</h4>
                    <ul className="space-y-1">
                      {phase.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                          <div className="w-1 h-1 bg-purple-400 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Center Node */}
              <div className="hidden md:flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`
                    relative w-16 h-16 rounded-full flex items-center justify-center
                    ${isCompleted 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                      : 'bg-white/10'
                    }
                  `}
                >
                  <span className="text-white font-bold">{index + 1}</span>
                  
                  {/* Pulse Effect for Active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-purple-500/30"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}