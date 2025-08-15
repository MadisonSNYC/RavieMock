import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import ravieLogo from '../assets/Ravielogo1.png'

export default function HeaderAdvanced() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isCompact, setIsCompact] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()
  const previousPathRef = useRef(location.pathname)
  const isInitialMount = useRef(true)

  // Navigation items
  const navItems = [
    { path: '/work', label: 'WORK' },
    { path: '/#about', label: 'ABOUT', isAnchor: true },
    { path: '/#team', label: 'TEAM', isAnchor: true },
    { path: '/contact', label: 'CONTACT' }
  ]

  // Handle scroll behavior for sticky header
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest
    const scrollingDown = currentScrollY > lastScrollY.current
    const scrolledPastHero = currentScrollY > 100

    // Hide on scroll down, show on scroll up
    if (currentScrollY > 50) {
      setIsVisible(!scrollingDown)
    } else {
      setIsVisible(true)
    }

    // Compact mode after scrolling past hero
    setIsCompact(scrolledPastHero)
    
    lastScrollY.current = currentScrollY
  })

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Handle page transitions
  useEffect(() => {
    // Skip transition on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    
    if (location.pathname !== previousPathRef.current) {
      setIsTransitioning(true)
      previousPathRef.current = location.pathname
      
      // Auto-hide transition after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 700) // Total animation duration (1 second total)
      
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  const isActive = (path) => location.pathname === path

  const handleNavClick = (e, item) => {
    if (item.isAnchor) {
      e.preventDefault()
      // Extract the anchor ID from the path (e.g., '/#about' -> 'about')
      const anchorId = item.path.split('#')[1]
      
      if (location.pathname !== '/') {
        // Navigate to home first, then scroll
        navigate('/')
        setTimeout(() => {
          const element = document.getElementById(anchorId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        // Already on home, just scroll
        const element = document.getElementById(anchorId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          height: isCompact ? 60 : 80
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10"
        role="banner"
      >
        <div className="h-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="h-full flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="relative group"
              aria-label="Ravie - Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <img 
                  src={ravieLogo} 
                  alt="Ravie" 
                  className={`${isCompact ? 'h-7' : 'h-9'} w-auto transition-all duration-300`}
                />
                {/* Logo hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-blue to-vivid-purple opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                item.isAnchor ? (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item)}
                    className="relative group cursor-pointer"
                  >
                    <span className="nav-label text-xs tracking-[0.2em] transition-colors duration-300 text-white/70 hover:text-white">
                      {item.label}
                    </span>
                    {/* Hover underline effect */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-neon-blue to-vivid-purple"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative group"
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    <span className={`nav-label text-xs tracking-[0.2em] transition-colors duration-300 ${
                      isActive(item.path) 
                        ? 'text-neon-blue' 
                        : 'text-white/70 hover:text-white'
                    }`}>
                      {item.label}
                    </span>
                    {/* Hover underline effect */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-neon-blue to-vivid-purple"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Active indicator */}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-neon-blue"
                      />
                    )}
                  </Link>
                )
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {/* Animated Hamburger */}
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={isMenuOpen ? { 
                    rotate: 45, 
                    y: 9,
                    backgroundColor: '#00D4FF'
                  } : { 
                    rotate: 0, 
                    y: 0,
                    backgroundColor: '#ffffff'
                  }}
                  transition={{ duration: 0.3 }}
                  className="block w-full h-0.5 origin-center"
                />
                <motion.span
                  animate={isMenuOpen ? { 
                    opacity: 0,
                    scaleX: 0
                  } : { 
                    opacity: 1,
                    scaleX: 1
                  }}
                  transition={{ duration: 0.3 }}
                  className="block w-full h-0.5 bg-white"
                />
                <motion.span
                  animate={isMenuOpen ? { 
                    rotate: -45, 
                    y: -9,
                    backgroundColor: '#00D4FF'
                  } : { 
                    rotate: 0, 
                    y: 0,
                    backgroundColor: '#ffffff'
                  }}
                  transition={{ duration: 0.3 }}
                  className="block w-full h-0.5 origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Glassmorphism Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-2xl z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-45 flex items-center justify-center"
            >
              <nav className="relative text-center" role="navigation" aria-label="Mobile navigation">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    className="mb-8"
                  >
                    {item.isAnchor ? (
                      <a
                        href={item.path}
                        onClick={(e) => {
                          handleNavClick(e, item)
                          setIsMenuOpen(false)
                        }}
                        className="group relative inline-block cursor-pointer"
                      >
                        <span className="text-4xl md:text-5xl font-display font-bold tracking-tight transition-all duration-300 text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-neon-blue hover:to-vivid-purple">
                          {item.label}
                        </span>
                        {/* 3D hover effect */}
                        <motion.div
                          className="absolute inset-0 -z-10"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1.1, opacity: 0.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-full h-full bg-gradient-to-r from-neon-blue to-vivid-purple blur-2xl" />
                        </motion.div>
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="group relative inline-block"
                      >
                        <span className={`text-4xl md:text-5xl font-display font-bold tracking-tight transition-all duration-300 ${
                          isActive(item.path) 
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-vivid-purple' 
                            : 'text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-neon-blue hover:to-vivid-purple'
                        }`}>
                          {item.label}
                        </span>
                        {/* 3D hover effect */}
                        <motion.div
                          className="absolute inset-0 -z-10"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1.1, opacity: 0.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-full h-full bg-gradient-to-r from-neon-blue to-vivid-purple blur-2xl" />
                        </motion.div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Transition - Subtle Glassmorphic Logo */}
      {/* <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Transparent Overlay - Just for blur backdrop */}
            {/* <motion.div
              key={`overlay-${location.pathname}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-0 bg-transparent z-50 pointer-events-none"
            /> */}
            
            {/* Glassmorphic Logo Container */}
            {/* <motion.div
              key={`logo-${location.pathname}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeOut",
                delay: 0.05
              }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            > */}
              {/* Circular Glassmorphic Background */}
              {/* <div className="relative"> */}
                {/* Transparent Blur Circle */}
                {/* <div className="absolute inset-0 w-[160px] h-[160px] rounded-full bg-transparent backdrop-blur-[10px]" /> */}
                
                {/* Subtle Border */}
                {/* <div className="absolute inset-0 w-[160px] h-[160px] rounded-full border border-white/[0.08]" /> */}
                
                {/* Logo */}
                {/* <div className="relative w-[160px] h-[160px] flex items-center justify-center">
                  <motion.img
                    src="/Ravieiconlogo2.png"
                    alt="Loading"
                    className="w-[120px] h-auto opacity-90"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence> */}
    </>
  )
}