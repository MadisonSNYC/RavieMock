import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, X, Maximize2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSectionV2() {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const fullscreenVideoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Toggle video mute/unmute
  const toggleMute = () => {
    const activeVideo = isFullscreen ? fullscreenVideoRef.current : videoRef.current
    if (activeVideo) {
      activeVideo.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Open fullscreen overlay
  const openFullscreen = () => {
    setIsFullscreen(true)
    // Sync video time when opening fullscreen
    if (videoRef.current && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.currentTime = videoRef.current.currentTime
      fullscreenVideoRef.current.muted = isMuted
    }
  }

  // Close fullscreen overlay
  const closeFullscreen = () => {
    setIsFullscreen(false)
    // Sync video time when closing fullscreen
    if (videoRef.current && fullscreenVideoRef.current) {
      videoRef.current.currentTime = fullscreenVideoRef.current.currentTime
    }
  }

  // Autoplay video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay prevented:', err)
      })
    }
  }, [])

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        closeFullscreen()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isFullscreen])

  // Keep the animated flowing blue lines from original
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    let animationId
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawWave = (offset, amplitude, frequency, alpha) => {
      ctx.beginPath()
      ctx.strokeStyle = `rgba(0, 100, 255, ${alpha})`
      ctx.lineWidth = 2
      
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + 
          Math.sin((x * frequency + time + offset) * 0.01) * amplitude +
          Math.sin((x * frequency * 0.5 + time * 1.5 + offset) * 0.01) * amplitude * 0.5
        
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw multiple flowing lines
      drawWave(0, 150, 0.5, 0.3)
      drawWave(100, 120, 0.7, 0.25)
      drawWave(200, 180, 0.3, 0.2)
      drawWave(300, 100, 0.9, 0.25)
      
      time += 1
      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()
    
    window.addEventListener('resize', resize)
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Animated flowing lines background - preserved from original */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
        style={{ filter: 'blur(1px)' }}
      />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />

      {/* Main Content - HomePage2 Style */}
      <div className="relative z-10 w-full">
        <div className="w-full px-10 md:px-20 lg:px-44 py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-[1.1] tracking-tight">
                We create{' '}
                <motion.span 
                  className="bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05, duration: 0.15 }}
                >
                  cult followings
                </motion.span>
                {' '}for brands
              </h1>
              
              <motion.p
                className="text-base md:text-lg text-white/60 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.15 }}
              >
                Motion design studio specializing in launch films, brand identity, and digital experiences
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.15 }}
              >
                <Link 
                  to="/work"
                  className="px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#00D4FF]/25 transition-all duration-150"
                >
                  View Our Work
                </Link>
                <Link 
                  to="/contact"
                  className="px-6 py-3 border border-white/20 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-150"
                >
                  Start a Project
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Video/Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.15 }}
              className="relative"
            >
              <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/10 group hover:border-white/20 transition-all duration-150">
                {/* Video Element */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/Thumbs/JheneThmb.webp"
                  playsInline
                  autoPlay
                  muted={isMuted}
                  loop
                >
                  <source src="/Ravie/ravie_reel_2024_-_h (1080p).mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#8B5CF6]/10 pointer-events-none" />
                
                {/* Video Controls - Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="flex items-center justify-between">
                    {/* Video Title */}
                    <div className="pointer-events-none">
                      <p className="text-white text-sm font-medium">Ravie Reel 2024</p>
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Expand Button */}
                      <button
                        onClick={openFullscreen}
                        className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-150 group"
                        aria-label="Expand video"
                      >
                        <Maximize2 className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                      </button>
                      
                      {/* Mute/Unmute Button */}
                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-150 group"
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <>
            {/* Blurred Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-50"
              onClick={closeFullscreen}
            />
            
            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-8"
            >
              <div className="relative w-full max-w-6xl mx-auto">
                {/* Close Button */}
                <button
                  onClick={closeFullscreen}
                  className="absolute -top-12 right-0 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors group"
                  aria-label="Close fullscreen"
                >
                  <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
                </button>
                
                {/* Video Player */}
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                  <video
                    ref={fullscreenVideoRef}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    muted={isMuted}
                    loop
                  >
                    <source src="/Ravie/ravie_reel_2024_-_h (1080p).mp4" type="video/mp4" />
                  </video>
                </div>
                
                {/* Video Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-center"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Ravie Reel 2024</h3>
                  <p className="text-white/60">Our latest brand showcase featuring award-winning motion design work</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}