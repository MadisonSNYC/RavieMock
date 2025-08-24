import { Link, useLocation } from 'react-router-dom'

/**
 * Frosted Glass Header inspired by modern e-commerce design
 * Features: sticky positioning, backdrop blur, clean layout
 */
export default function HeaderFrosted() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <>
      <style>{`
        /* Import Sharp Font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        /* Frosted Glass Header */
        .header-frosted {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          z-index: 100;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .header-frosted::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            rgba(107, 70, 255, 0.05) 0%, 
            transparent 50%, 
            rgba(157, 78, 221, 0.05) 100%
          );
          pointer-events: none;
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          height: 100%;
        }

        /* Left Navigation */
        .nav-left {
          display: flex;
          gap: 40px;
          justify-self: start;
        }

        /* Center Branding */
        .brand-center {
          justify-self: center;
        }

        .brand-link {
          text-decoration: none;
          display: inline-block;
        }

        .brand-text {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          font-feature-settings: 'ss01' on, 'cv01' on;
        }

        .brand-text:hover {
          color: #00D4FF;
          letter-spacing: 0.02em;
        }

        /* Right Utilities */
        .nav-right {
          display: flex;
          gap: 32px;
          justify-self: end;
          align-items: center;
        }

        /* Navigation Links */
        .nav-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.025em;
          text-transform: uppercase;
          position: relative;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          padding: 8px 0;
          font-feature-settings: 'ss01' on;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #00D4FF, #6B46FF);
          transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: #00D4FF;
        }

        .nav-link.active::after {
          width: 100%;
        }

        /* Contact CTA Button */
        .contact-cta {
          background: linear-gradient(135deg, #6B46FF, #00D4FF);
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
          font-feature-settings: 'ss01' on;
        }

        .contact-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(107, 70, 255, 0.3);
          filter: brightness(1.1);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .header-container {
            padding: 0 24px;
          }
          
          .nav-left,
          .nav-right {
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .header-frosted {
            height: 64px;
          }
          
          .header-container {
            padding: 0 16px;
            grid-template-columns: 1fr;
            justify-items: center;
          }
          
          .nav-left {
            display: none;
          }
          
          .nav-right {
            display: none;
          }
          
          .brand-center {
            justify-self: center;
          }
          
          .brand-text {
            font-size: 20px;
          }
        }

        /* Mobile Menu Toggle (for future enhancement) */
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
          padding: 8px;
        }

        @media (max-width: 768px) {
          .header-container {
            grid-template-columns: auto 1fr auto;
          }
          
          .mobile-toggle {
            display: block;
          }
          
          .brand-center {
            justify-self: center;
          }
        }
      `}</style>

      <header className="header-frosted" role="banner">
        <div className="header-container">
          {/* Left Navigation */}
          <nav className="nav-left" role="navigation" aria-label="Main navigation">
            <Link 
              to="/work" 
              className={`nav-link ${isActive('/work') ? 'active' : ''}`}
            >
              Work
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
          </nav>

          {/* Center Branding */}
          <div className="brand-center">
            <Link to="/" className="brand-link" aria-label="Ravie - Home">
              <img 
                src="/Assts/Ravie Logos/Vector.png" 
                alt="Ravie" 
                className="h-8 object-contain"
                style={{ filter: 'brightness(1.2)' }}
              />
            </Link>
          </div>

          {/* Right Utilities */}
          <div className="nav-right">
            <Link 
              to="/contact" 
              className="contact-cta"
              aria-label="Contact Ravie"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile Menu Toggle (for future) */}
          <button className="mobile-toggle" aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </header>
    </>
  )
}