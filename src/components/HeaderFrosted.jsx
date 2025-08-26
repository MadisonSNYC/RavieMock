import { Link, useLocation } from 'react-router-dom'

/**
 * Modular Glassmorphism Header with Segmented Block Architecture
 * Combines frosted glass aesthetic with Drake Hotel-inspired modular layout
 */
export default function HeaderFrosted() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <>
      <style>{`
        /* Modular Header Container */
        .header-modular {
          position: fixed;
          top: 20px;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 0 24px;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header-segments {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          gap: 12px;
          align-items: center;
          height: 65px;
        }

        /* Individual Glass Segments */
        .segment {
          height: 100%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .segment::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            transparent 50%,
            rgba(255, 255, 255, 0.02) 100%
          );
          pointer-events: none;
        }

        /* Logo Segment */
        .segment-logo {
          width: 200px;
          padding: 0 24px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          height: 100%;
        }

        .logo-image {
          height: 32px;
          width: auto;
          filter: brightness(0) invert(1);
          opacity: 0.95;
          transition: all 300ms ease;
        }

        .logo-link:hover .logo-image {
          opacity: 1;
          transform: scale(1.05);
        }

        .logo-text {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #ffffff;
          text-transform: uppercase;
        }

        /* Navigation Segments */
        .segment-nav {
          padding: 0 28px;
          min-width: 120px;
          cursor: pointer;
        }

        .segment-nav:hover {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .segment-nav.active {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          display: block;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        /* CTA Segment */
        .segment-cta {
          padding: 0 32px;
          min-width: 140px;
          background: linear-gradient(135deg, 
            rgba(107, 70, 255, 0.2), 
            rgba(0, 212, 255, 0.2)
          );
          border: 1px solid rgba(107, 70, 255, 0.3);
          margin-left: auto;
        }

        .segment-cta:hover {
          background: linear-gradient(135deg, 
            rgba(107, 70, 255, 0.3), 
            rgba(0, 212, 255, 0.3)
          );
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 40px rgba(107, 70, 255, 0.25);
          border-color: rgba(107, 70, 255, 0.4);
        }

        .cta-link {
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        /* Mobile Menu Toggle */
        .mobile-toggle {
          display: none;
          width: 65px;
          height: 65px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          transition: all 300ms ease;
          margin-left: auto;
        }

        .mobile-toggle:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .segment-nav {
            padding: 0 20px;
            min-width: 100px;
          }
          
          .segment-logo {
            width: 180px;
            padding: 0 20px;
          }
        }

        @media (max-width: 968px) {
          .header-modular {
            top: 10px;
            padding: 0 16px;
          }

          .header-segments {
            height: 60px;
          }

          .segment-nav {
            min-width: 90px;
            padding: 0 16px;
          }

          .nav-link,
          .cta-link {
            font-size: 13px;
          }

          .segment-logo {
            width: 160px;
          }

          .logo-image {
            height: 28px;
          }
        }

        @media (max-width: 768px) {
          .header-modular {
            top: 0;
            padding: 16px;
          }

          .header-segments {
            height: 56px;
          }

          .segment-logo {
            width: auto;
            padding: 0 20px;
            flex: 1;
          }

          .segment-nav,
          .segment-cta {
            display: none;
          }

          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
          }

          .logo-text {
            display: none;
          }
        }

        /* Browser Fallbacks */
        @supports not (backdrop-filter: blur(12px)) {
          .segment {
            background: rgba(20, 20, 20, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .segment-nav:hover,
          .segment-nav.active {
            background: rgba(30, 30, 30, 0.95);
          }

          .segment-cta {
            background: linear-gradient(135deg, 
              rgba(107, 70, 255, 0.9), 
              rgba(0, 212, 255, 0.9)
            );
          }
        }

        /* Accessibility Focus States */
        .segment:focus-within {
          outline: 2px solid rgba(0, 212, 255, 0.5);
          outline-offset: 2px;
        }

        .nav-link:focus,
        .cta-link:focus,
        .logo-link:focus {
          outline: none;
        }
      `}</style>

      <header className="header-modular" role="banner">
        <div className="header-segments">
          {/* Logo Segment */}
          <div className="segment segment-logo">
            <Link to="/" className="logo-link" aria-label="Ravie - Home">
              <img 
                src="/Assts/Ravie Logos/Vector.png" 
                alt="Ravie" 
                className="logo-image"
              />
              <span className="logo-text">Ravie</span>
            </Link>
          </div>

          {/* Navigation Segments */}
          <div className={`segment segment-nav ${isActive('/') ? 'active' : ''}`}>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </div>

          <div className={`segment segment-nav ${isActive('/work') ? 'active' : ''}`}>
            <Link to="/work" className="nav-link">
              Work
            </Link>
          </div>

          <div className={`segment segment-nav ${isActive('/about') ? 'active' : ''}`}>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </div>

          <div className={`segment segment-nav ${isActive('/contact') ? 'active' : ''}`}>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </div>

          {/* CTA Segment */}
          <div className="segment segment-cta">
            <Link to="/contact" className="cta-link">
              Let's Talk
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </header>
    </>
  )
}