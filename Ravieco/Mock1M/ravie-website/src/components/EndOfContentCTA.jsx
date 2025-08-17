import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function EndOfContentCTA({ 
  variant = 'default', 
  title = "Ready to start your project?",
  subtitle = "Let's discuss how we can bring your vision to life.",
  className = ""
}) {
  const navigate = useNavigate()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    default: {
      bgGradient: "from-purple-900/10 to-pink-900/10",
      borderColor: "border-purple-500/20",
      iconBg: "from-purple-500/20 to-pink-500/20",
      buttonGradient: "from-purple-500 to-pink-500"
    },
    minimal: {
      bgGradient: "from-white/5 to-white/10",
      borderColor: "border-white/10",
      iconBg: "from-white/10 to-white/20",
      buttonGradient: "from-white/20 to-white/30"
    },
    bold: {
      bgGradient: "from-purple-600/20 to-pink-600/20",
      borderColor: "border-purple-400/30",
      iconBg: "from-purple-400/30 to-pink-400/30",
      buttonGradient: "from-purple-600 to-pink-600"
    }
  }

  const style = variants[variant] || variants.default

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative overflow-hidden ${className}`}
      >
        {/* Elegant Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.bgGradient} opacity-50`} />
        
        {/* Content Container */}
        <div className={`relative backdrop-blur-sm border ${style.borderColor} rounded-3xl p-8 md:p-12`}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-2xl" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${style.iconBg} border ${style.borderColor}`}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              {title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/60 mb-8 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/contact')}
                className={`group inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r ${style.buttonGradient} rounded-full text-white font-semibold hover:shadow-xl transition-all duration-300`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="mailto:work@ravie.co"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all"
              >
                <span>Email Directly</span>
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-6 mt-8 text-white/40 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Response within 24h
              </span>
              <span>•</span>
              <span>No commitment required</span>
              <span>•</span>
              <span>100% confidential</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}