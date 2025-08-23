import { useEffect, useState } from 'react'

export default function CodropsWorking() {
  const [scrollPos, setScrollPos] = useState(0)
  const [debugInfo, setDebugInfo] = useState('Ready')

  useEffect(() => {
    // Prevent default scrolling
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Manual scroll functions
  const scrollLeft = () => {
    const newPos = Math.min(0, scrollPos + 200)
    setScrollPos(newPos)
    setDebugInfo(`Scrolled to: ${newPos}px`)
  }

  const scrollRight = () => {
    const newPos = Math.max(-1600, scrollPos - 200)
    setScrollPos(newPos)
    setDebugInfo(`Scrolled to: ${newPos}px`)
  }

  const reset = () => {
    setScrollPos(0)
    setDebugInfo('Reset to start')
  }

  // Images for content
  const images = [
    'https://picsum.photos/400/600?random=1',
    'https://picsum.photos/400/600?random=2',
    'https://picsum.photos/400/600?random=3',
    'https://picsum.photos/400/600?random=4',
    'https://picsum.photos/400/600?random=5',
    'https://picsum.photos/400/600?random=6',
  ]

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: '#000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Debug Panel */}
      <div style={{
        position: 'fixed',
        top: 20,
        left: 20,
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: 20,
        borderRadius: 10,
        zIndex: 1000,
        minWidth: 250,
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h2 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>3D Accordion Controls</h2>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#0f0' }}>
          Status: {debugInfo}
        </p>
        <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#888' }}>
          Position: {scrollPos}px
        </p>
        
        <button onClick={scrollLeft} style={{
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: 5,
          cursor: 'pointer',
          marginRight: 10,
          fontSize: '14px'
        }}>
          ← Previous
        </button>
        
        <button onClick={scrollRight} style={{
          background: '#2196F3',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: 5,
          cursor: 'pointer',
          marginRight: 10,
          fontSize: '14px'
        }}>
          Next →
        </button>
        
        <button onClick={reset} style={{
          background: '#f44336',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: 5,
          cursor: 'pointer',
          marginTop: 10,
          display: 'block',
          width: '100%',
          fontSize: '14px'
        }}>
          Reset
        </button>
      </div>

      {/* 3D Accordion Container */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        perspective: '2000px',
        width: '100%',
        height: '500px',
      }}>
        {/* Content Strip - Hidden but used as source */}
        <div style={{
          position: 'absolute',
          width: '3000px',
          height: '500px',
          display: 'flex',
          opacity: 0,
          pointerEvents: 'none'
        }}>
          {images.map((img, i) => (
            <img key={i} src={img} alt={`Content ${i}`} style={{ width: '400px', height: '100%', objectFit: 'cover' }} />
          ))}
        </div>

        {/* Accordion Folds */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}>
          {/* Main Panel (rightmost, front) */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '500px',
            right: '20%',
            transformStyle: 'preserve-3d',
            transform: 'rotateY(0deg)',
            transformOrigin: 'center center',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: `url(${images[0]}) center/cover`,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              position: 'relative',
              transform: `translateX(${scrollPos * 2}px)`,
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <div style={{
                position: 'absolute',
                width: '2400px',
                height: '100%',
                display: 'flex',
                transform: `translateX(${scrollPos}px)`,
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                {images.map((img, i) => (
                  <img key={i} src={img} alt={`Panel ${i}`} style={{ 
                    width: '400px', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'brightness(1.1) contrast(1.1)'
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* Fold 1 (connected to main) */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '500px',
            right: '20%',
            transformStyle: 'preserve-3d',
            transform: 'translateX(-400px) rotateY(-30deg)',
            transformOrigin: 'right center',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: '#222',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                width: '2400px',
                height: '100%',
                display: 'flex',
                transform: `translateX(${scrollPos - 400}px)`,
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'brightness(0.8)',
              }}>
                {images.map((img, i) => (
                  <img key={i} src={img} alt={`Fold1 ${i}`} style={{ 
                    width: '400px', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* Fold 2 (connected to fold 1) */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '500px',
            right: '20%',
            transformStyle: 'preserve-3d',
            transform: 'translateX(-400px) rotateY(-30deg) translateX(-400px) rotateY(30deg)',
            transformOrigin: 'right center',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: '#333',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.7)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                width: '2400px',
                height: '100%',
                display: 'flex',
                transform: `translateX(${scrollPos - 800}px)`,
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'brightness(0.6)',
              }}>
                {images.map((img, i) => (
                  <img key={i} src={img} alt={`Fold2 ${i}`} style={{ 
                    width: '400px', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* Fold 3 (connected to fold 2) */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '500px',
            right: '20%',
            transformStyle: 'preserve-3d',
            transform: 'translateX(-400px) rotateY(-30deg) translateX(-400px) rotateY(30deg) translateX(-400px) rotateY(-60deg)',
            transformOrigin: 'right center',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: '#444',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.9)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                width: '2400px',
                height: '100%',
                display: 'flex',
                transform: `translateX(${scrollPos - 1200}px)`,
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'brightness(0.4)',
              }}>
                {images.map((img, i) => (
                  <img key={i} src={img} alt={`Fold3 ${i}`} style={{ 
                    width: '400px', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '15px 30px',
        borderRadius: 30,
        fontSize: '14px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        3D Accordion Gallery - Click buttons to navigate through images
      </div>
    </div>
  )
}