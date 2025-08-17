import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { MessageSquare, X, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SmartCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const navigate = useNavigate()
  const [hasInteracted, setHasInteracted] = useState(false)
  const pulseIntervalRef = useRef(null)
  const timeOnPageRef = useRef(0)
  const scrollDepthRef = useRef(0)

  useEffect(() => {
    // Check if user has dismissed CTA this session
    const dismissed = sessionStorage.getItem('ctaDismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
      return
    }

    // Track time on page
    const timeInterval = setInterval(() => {
      timeOnPageRef.current += 1
      
      // Show after 30 seconds on page if user has scrolled
      if (timeOnPageRef.current >= 30 && scrollDepthRef.current > 20 && !isDismissed) {
        setIsVisible(true)
      }
    }, 1000)

    // Track scroll depth and engagement
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      scrollDepthRef.current = scrolled

      // Contextual triggers based on engagement
      // Show after 40% scroll depth and 10 seconds on page
      if (scrolled > 40 && timeOnPageRef.current >= 10 && !isDismissed) {
        setIsVisible(true)
      }

      // Hide if user scrolls to very top (likely looking for navigation)
      if (window.scrollY < 100 && isVisible) {
        setIsVisible(false)
      }

      // Show prominently near bottom of page (last 10%)
      if (scrolled > 90 && !isDismissed) {
        setIsVisible(true)
        setHasInteracted(true)
      }
    }

    // Track user interactions (clicks, hovers on project cards)
    const handleInteraction = (e) => {
      const target = e.target
      const isProjectCard = target.closest('[data-project-card]')
      const isNavLink = target.closest('nav a')
      
      if (isProjectCard || isNavLink) {
        setHasInteracted(true)
        
        // Show CTA after viewing 2-3 projects
        const projectViews = parseInt(sessionStorage.getItem('projectViews') || '0')
        sessionStorage.setItem('projectViews', (projectViews + 1).toString())
        
        if (projectViews >= 2 && !isDismissed) {
          setTimeout(() => setIsVisible(true), 2000) // Delay to not interrupt
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleInteraction)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleInteraction)
      clearInterval(timeInterval)
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current)
      }
    }
  }, [isDismissed, isVisible])

  // Gentle pulse animation every 10 seconds
  useEffect(() => {
    if (isVisible && !pulseIntervalRef.current) {
      pulseIntervalRef.current = setInterval(() => {
        const element = document.getElementById('smart-cta-button')
        if (element) {
          element.classList.add('animate-gentle-pulse')
          setTimeout(() => {
            element.classList.remove('animate-gentle-pulse')
          }, 1000)
        }
      }, 10000)
    }

    return () => {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current)
        pulseIntervalRef.current = null
      }
    }
  }, [isVisible])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem('ctaDismissed', 'true')
  }

  const handleOpenForm = () => {
    navigate('/contact')
    setIsVisible(false)
  }

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <>
      <AnimatePresence>
        {isVisible && !isDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            transition={{ 
              type: prefersReducedMotion ? 'tween' : 'spring',
              damping: 30,
              stiffness: 200,
              duration: prefersReducedMotion ? 0.2 : 0.4
            }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 max-w-sm"
          >
            {/* Elegant Glassmorphic Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                {/* Dismiss Button */}
                <button
                  onClick={handleDismiss}
                  className="absolute -top-2 -right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 hover:bg-black/80 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-3 h-3 text-white/60 hover:text-white" />
                </button>

                {/* Content */}
                <div className="space-y-3">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm leading-tight">
                        {hasInteracted 
                          ? "Love what you see?"
                          : "Ready to create something amazing?"
                        }
                      </h3>
                      <p className="text-white/50 text-xs mt-0.5">
                        Let's discuss your project
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    id="smart-cta-button"
                    onClick={handleOpenForm}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all group"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Start a Conversation</span>
                    {!prefersReducedMotion && (
                      <motion.span
                        className="inline-block ml-1"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          ease: "easeInOut"
                        }}
                      >
                        →
                      </motion.span>
                    )}
                  </button>

                  {/* Trust Indicator */}
                  <p className="text-white/30 text-xs text-center">
                    Quick 2-min chat • No spam
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}