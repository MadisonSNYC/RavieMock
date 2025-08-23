import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { thumbnailMap } from '../data/thumbnails'

export default function HeroSection() {
  const canvasRef = useRef(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Create flowing blue lines animation
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
      {/* Animated flowing lines background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
        style={{ filter: 'blur(1px)' }}
      />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Main Headline */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-8 leading-[1.1] tracking-tight">
              We create{' '}
              <motion.span 
                className="italic font-normal"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                cult
              </motion.span>
              <br />
              followings for brands
            </h1>

            {/* Subtext */}
            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              A creative agency focused on scaling brands
              <br />
              through strategy and design.
            </motion.p>
          </motion.div>

          {/* Compact Project Showcase Grid - Bento Style */}
          <motion.div
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {/* Selected Work Label */}
            <motion.p 
              className="text-white/50 text-sm font-light mb-4 tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Selected Work
            </motion.p>
            
            {/* Bento Grid Container */}
            <div className="grid grid-cols-6 gap-2 auto-rows-[120px]">
              {/* Large featured project - Coinbase (3x2) */}
              <div className="col-span-3 row-span-2 relative overflow-hidden rounded-lg group cursor-pointer">
                <img 
                  src={thumbnailMap['coinbase-rebrand']} 
                  alt="Coinbase"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-white text-lg font-light">COINBASE</h3>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider">Brand Identity</p>
                </div>
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>

              {/* Medium - Loops (2x1) */}
              <div className="col-span-2 row-span-1 relative overflow-hidden rounded-lg group cursor-pointer">
                <img 
                  src={thumbnailMap['loops-campaign']} 
                  alt="Loops"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 to-orange-800/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-sm font-light tracking-wide">LOOPS</h3>
                </div>
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>

              {/* Small - Jhene (1x1) */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg group cursor-pointer">
                <img 
                  src={thumbnailMap['jhene-aiko']} 
                  alt="Jhene Aiko"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <h3 className="text-white text-[10px] font-light text-center leading-tight">JHENE<br/>AIKO</h3>
                </div>
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>

              {/* Small - KW (1x1) */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg group cursor-pointer">
                <img 
                  src={thumbnailMap['keller-williams']} 
                  alt="Keller Williams"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-orange-400/30" />
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <h3 className="text-white text-[10px] font-medium text-center leading-tight">KELLER<br/>WILLIAMS</h3>
                </div>
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>

              {/* Medium - OSO (2x1) */}
              <div className="col-span-2 row-span-1 relative overflow-hidden rounded-lg group cursor-pointer">
                <img 
                  src={thumbnailMap['oso-nyc']} 
                  alt="OSO NYC"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gray-900/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-sm font-light tracking-wide">OSO NYC</h3>
                </div>
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>

              {/* More Projects (2x2) */}
              <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg group cursor-pointer">
                <img 
                  src={thumbnailMap['spotify-campaign']} 
                  alt="Spotify"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-white text-base font-light">SPOTIFY</h3>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider">Campaign</p>
                </div>
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>

              {/* Small tile (1x1) */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg group cursor-pointer bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white text-2xl font-light">+12</p>
                    <p className="text-white/60 text-[9px] uppercase tracking-wider mt-1">More</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>

              {/* CTA Card (3x1) */}
              <div className="col-span-3 row-span-1 relative overflow-hidden rounded-lg group cursor-pointer bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-md border border-white/5">
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <p className="text-white text-sm font-light">
                    Let's build something great together
                  </p>
                  <motion.span 
                    className="text-white/60 text-xl"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}