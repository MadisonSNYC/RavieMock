import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ravieIcon from '../assets/ravie-icon.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent" role="banner">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-black rounded-sm"
            aria-label="Ravie - Home"
          >
            <img 
              src={ravieIcon} 
              alt="Ravie" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12" role="navigation" aria-label="Main navigation">
            <Link 
              to="/v2" 
              className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-black rounded-sm px-2 py-1 ${
                isActive('/v2') ? 'text-[#00D4FF]' : 'text-white/90 hover:text-white'
              }`}
              aria-current={isActive('/v2') ? 'page' : undefined}
            >
              HM2
            </Link>
            <Link 
              to="/work" 
              className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-black rounded-sm px-2 py-1 ${
                isActive('/work') ? 'text-[#00D4FF]' : 'text-white/90 hover:text-white'
              }`}
              aria-current={isActive('/work') ? 'page' : undefined}
            >
              Work
            </Link>
            <Link 
              to="/about" 
              className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-black rounded-sm px-2 py-1 ${
                isActive('/about') ? 'text-[#00D4FF]' : 'text-white/90 hover:text-white'
              }`}
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-black rounded-sm px-2 py-1 ${
                isActive('/contact') ? 'text-[#00D4FF]' : 'text-white/90 hover:text-white'
              }`}
              aria-current={isActive('/contact') ? 'page' : undefined}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu */}
          <button
            className="md:hidden text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-black rounded-sm p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav id="mobile-navigation" className="md:hidden mt-6 pb-6" role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/v2" 
                className={`text-sm transition-colors ${
                  isActive('/v2') ? 'text-[#00D4FF]' : 'text-white/90 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                HM2
              </Link>
              <Link 
                to="/work" 
                className={`text-sm transition-colors ${
                  isActive('/work') ? 'text-[#00D4FF]' : 'text-white/90 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Work
              </Link>
              <Link 
                to="/about" 
                className={`text-sm transition-colors ${
                  isActive('/about') ? 'text-[#00D4FF]' : 'text-white/90 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm transition-colors ${
                  isActive('/contact') ? 'text-[#00D4FF]' : 'text-white/90 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

