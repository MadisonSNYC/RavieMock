import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as React from 'react'
import { 
  Sparkles, 
  Layers, 
  Palette, 
  Video, 
  Music, 
  Monitor,
  ArrowRight,
  Zap
} from 'lucide-react'

export default function ProcessVisualization() {
  const [activeStep, setActiveStep] = useState(0)
  
  const processSteps = [
    {
      id: 1,
      title: "Ideation",
      description: "Creative brainstorming and concept exploration",
      icon: Sparkles,
      color: "from-purple-500 to-indigo-500",
      details: [
        "Workshop sessions with stakeholders",
        "Competitive analysis & market research",
        "Initial creative concepts & mood boards"
      ]
    },
    {
      id: 2,
      title: "Design",
      description: "Visual development and style refinement",
      icon: Palette,
      color: "from-indigo-500 to-blue-500",
      details: [
        "Style frames & visual direction",
        "Typography & color systems",
        "Motion design language"
      ]
    },
    {
      id: 3,
      title: "Production",
      description: "Bringing concepts to life with precision",
      icon: Video,
      color: "from-blue-500 to-cyan-500",
      details: [
        "3D modeling & animation",
        "Live action filming",
        "Visual effects & compositing"
      ]
    },
    {
      id: 4,
      title: "Post-Production",
      description: "Polishing every detail to perfection",
      icon: Layers,
      color: "from-cyan-500 to-teal-500",
      details: [
        "Color grading & correction",
        "Motion graphics integration",
        "Final compositing & rendering"
      ]
    },
    {
      id: 5,
      title: "Audio",
      description: "Creating immersive soundscapes",
      icon: Music,
      color: "from-teal-500 to-green-500",
      details: [
        "Sound design & foley",
        "Music composition & licensing",
        "Audio mixing & mastering"
      ]
    },
    {
      id: 6,
      title: "Delivery",
      description: "Optimized for every platform",
      icon: Monitor,
      color: "from-green-500 to-emerald-500",
      details: [
        "Multi-platform exports",
        "Technical specifications",
        "Launch support & optimization"
      ]
    }
  ]
  
  return (
    <div className="relative">
      {/* Process Flow */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {processSteps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === activeStep
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 z-0">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500/50 to-pink-500/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  />
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveStep(index)}
                className={`
                  relative w-full p-4 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-gradient-to-br ' + step.color + ' shadow-2xl shadow-purple-500/25' 
                    : 'bg-white/5 hover:bg-white/10'
                  }
                  backdrop-blur-md border
                  ${isActive ? 'border-white/30' : 'border-white/10'}
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${isActive ? 'bg-white/20' : 'bg-white/10'}
                  `}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">{step.title}</span>
                </div>
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            </motion.div>
          )
        })}
      </div>
      
      {/* Step Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className={`
            p-8 rounded-2xl
            bg-gradient-to-br ${processSteps[activeStep].color}
            bg-opacity-10 backdrop-blur-md
            border border-white/20
          `}>
            <div className="flex items-start gap-6">
              <div className={`
                w-16 h-16 rounded-xl flex items-center justify-center
                bg-gradient-to-br ${processSteps[activeStep].color}
              `}>
                {React.createElement(processSteps[activeStep].icon, { 
                  size: 32, 
                  className: "text-white" 
                })}
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl text-white font-light mb-2">
                  {processSteps[activeStep].title}
                </h3>
                <p className="text-white/80 mb-6">
                  {processSteps[activeStep].description}
                </p>
                
                <div className="space-y-3">
                  {processSteps[activeStep].details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <Zap size={16} className="text-purple-400" />
                      <span className="text-white/90">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Next Step Hint */}
              {activeStep < processSteps.length - 1 && (
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <span className="text-sm">Next</span>
                  <ArrowRight size={16} />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}