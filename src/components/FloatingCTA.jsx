import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { MessageSquare, X, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const navigate = useNavigate()
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Show CTA after scrolling down 500px
      if (currentScrollY > 500) {
        setIsVisible(true)
      }

      // Auto-minimize when scrolling up
      if (currentScrollY < lastScrollY && currentScrollY > 500) {
        setIsMinimized(false)
      }

      // Show prominently near bottom of page
      if (currentScrollY + windowHeight >= documentHeight - 200) {
        setIsMinimized(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <>
      <AnimatePresence>
        {isVisible && !showForm && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: isMinimized ? 0.9 : 1
            }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300,
              duration: 0.3
            }}
            className={`
              fixed z-40 transition-all duration-300
              ${isMinimized 
                ? 'bottom-4 right-4' 
                : 'bottom-8 right-8 md:bottom-12 md:right-12'
              }
            `}
          >
            <div className="relative">
              {/* Floating Button - Mobile */}
              <button
                onClick={() => navigate('/contact')}
                className={`
                  md:hidden relative group
                  ${isMinimized ? 'p-3' : 'p-4'}
                  rounded-full bg-gradient-to-r from-purple-500 to-pink-500
                  shadow-2xl hover:shadow-purple-500/50 transition-all
                  ${!prefersReducedMotion && 'animate-float'}
                `}
                aria-label="Open contact form"
              >
                <MessageSquare className={`${isMinimized ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
                {!isMinimized && (
                  <span className="absolute -top-2 -right-2 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                )}
              </button>

              {/* Floating Panel - Desktop */}
              <div className={`
                hidden md:block relative
                ${isMinimized ? 'scale-90' : 'scale-100'}
                transition-transform duration-300
              `}>
                {/* Glassmorphism Panel */}
                <div className="frosted-contact-panel rounded-3xl p-6 pr-8 min-w-[320px]">
                  {/* Close/Minimize Button */}
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="absolute -top-2 -right-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Minimize"
                  >
                    <X className="w-3 h-3 text-white/60" />
                  </button>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight">
                          Let's build something great together
                        </h3>
                        <p className="text-white/60 text-sm mt-1">
                          Ready to start your project?
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/contact')}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all group"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Let's Talk</span>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5,
                          ease: "easeInOut"
                        }}
                      >
                        →
                      </motion.span>
                    </button>

                    <p className="text-white/40 text-xs text-center">
                      Response within 24 hours
                    </p>
                  </div>
                </div>

                {/* Animated Background Glow */}
                {!prefersReducedMotion && (
                  <div className="absolute inset-0 -z-10 rounded-3xl animate-glow opacity-50" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}