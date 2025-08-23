import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Animation */}
          <div className="relative mb-8">
            <motion.div
              className="text-[150px] md:text-[200px] font-bold text-white/10 leading-none"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(0,212,255,0.5)',
                  '0 0 40px rgba(139,92,246,0.5)',
                  '0 0 20px rgba(0,212,255,0.5)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              404
            </motion.div>
            
            {/* Glitch effect overlay */}
            <motion.div
              className="absolute inset-0 text-[150px] md:text-[200px] font-bold leading-none"
              style={{
                background: 'linear-gradient(90deg, #00D4FF, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [-2, 2, -2]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              404
            </motion.div>
          </div>

          {/* Error Message */}
          <h1 className="heading-sans text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="body-sans text-white/60 text-lg mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-[#00D4FF]/25 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Suggestion Links */}
          <div className="mt-12 pt-12 border-t border-white/10">
            <p className="body-sans text-white/40 text-sm mb-4">Maybe you were looking for:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/work" className="text-[#00D4FF] hover:text-[#8B5CF6] transition-colors">
                Our Work
              </Link>
              <span className="text-white/20">•</span>
              <Link to="/about" className="text-[#00D4FF] hover:text-[#8B5CF6] transition-colors">
                About Us
              </Link>
              <span className="text-white/20">•</span>
              <Link to="/contact" className="text-[#00D4FF] hover:text-[#8B5CF6] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  )
}