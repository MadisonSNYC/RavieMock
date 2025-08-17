import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PersistentCTA() {
  const [showCTA, setShowCTA] = useState(false)
  const navigate = useNavigate()
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Check if user has already interacted with CTA
    const hasInteractedBefore = localStorage.getItem('hasInteractedWithCTA')
    if (hasInteractedBefore) {
      setHasInteracted(true)
      return
    }

    let scrollTimer
    let viewTimer

    const checkScrollThreshold = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Show CTA after scrolling 50% of the page or after 30 seconds
      const scrollThreshold = (documentHeight - windowHeight) * 0.5
      
      if (scrolled > scrollThreshold && !hasInteracted) {
        setShowCTA(true)
      }
    }

    // Show after 30 seconds if not shown by scroll
    viewTimer = setTimeout(() => {
      if (!hasInteracted && !showCTA) {
        setShowCTA(true)
      }
    }, 30000)

    // Listen to scroll events
    window.addEventListener('scroll', checkScrollThreshold)

    return () => {
      window.removeEventListener('scroll', checkScrollThreshold)
      clearTimeout(viewTimer)
      clearTimeout(scrollTimer)
    }
  }, [hasInteracted, showCTA])

  const handleDismiss = () => {
    setShowCTA(false)
    setHasInteracted(true)
    localStorage.setItem('hasInteractedWithCTA', 'true')
    
    // Reset after 24 hours
    setTimeout(() => {
      localStorage.removeItem('hasInteractedWithCTA')
    }, 24 * 60 * 60 * 1000)
  }

  const handleOpenForm = () => {
    navigate('/contact')
    setShowCTA(false)
    setHasInteracted(true)
    localStorage.setItem('hasInteractedWithCTA', 'true')
  }

  if (hasInteracted || !showCTA) return null

  return (
    <>
      <AnimatePresence>
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.5 
            }}
            className="fixed bottom-6 right-6 z-40 max-w-sm"
          >
            <div className="relative">
              {/* Floating notification card */}
              <div className="bg-[#1A1A1A]/95 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 shadow-2xl shadow-black/50">
                {/* Close button */}
                <button
                  onClick={handleDismiss}
                  className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Content */}
                <div className="pr-6">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-neon-blue" />
                    </motion.div>
                    <h3 className="text-white font-semibold text-sm">
                      Have an idea brewing?
                    </h3>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    Let's chat about your project. Our team is ready to collaborate and bring your vision to life.
                  </p>

                  <div className="flex gap-3">
                    <motion.button
                      onClick={handleOpenForm}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-vivid-purple rounded-lg text-black text-sm font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Let's Talk
                    </motion.button>
                    
                    <button
                      onClick={handleDismiss}
                      className="px-4 py-2 text-white/60 hover:text-white/80 text-sm transition-colors"
                    >
                      Maybe later
                    </button>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-vivid-purple/5 rounded-2xl -z-10" />
              </div>

              {/* Subtle pulse animation for the card */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-vivid-purple/10 rounded-2xl -z-20"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}