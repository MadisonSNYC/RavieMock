import { useEffect, useRef, useState } from 'react'

export default function Working3DFold() {
  const scrollPositionRef = useRef(0)
  const [debugInfo, setDebugInfo] = useState({ position: 0, max: 0 })

  useEffect(() => {
    console.log('🚀 Initializing 3D Accordion Gallery...')
    
    // Wait for DOM
    setTimeout(() => {
      const wrapper = document.getElementById("fold-wrapper")
      if (!wrapper) {
        console.error('No wrapper found')
        return
      }

      // Get all content containers
      const contentContainers = wrapper.querySelectorAll('.fold-content-inner')
      if (contentContainers.length === 0) {
        console.error('No content containers found')
        return
      }

      // Calculate max scroll based on content
      const firstContent = contentContainers[0] as HTMLElement
      const contentWidth = firstContent.scrollWidth
      const viewportWidth = window.innerWidth * 0.4 // Each fold is 40vw
      const maxScroll = Math.max(0, contentWidth - viewportWidth)
      
      console.log('📏 Content setup:', {
        contentWidth,
        viewportWidth,
        maxScroll,
        containers: contentContainers.length
      })

      setDebugInfo({ position: 0, max: maxScroll })

      // Animation variables
      let currentScroll = 0
      let targetScroll = 0
      let animationFrame: number

      // Update all fold contents with new scroll position
      const updateScroll = (position: number) => {
        contentContainers.forEach((container) => {
          (container as HTMLElement).style.transform = `translateX(${-position}px)`
        })
        scrollPositionRef.current = position
        setDebugInfo(prev => ({ ...prev, position: Math.round(position) }))
      }

      // Smooth animation loop
      const animate = () => {
        // Clamp target
        targetScroll = Math.max(0, Math.min(maxScroll, targetScroll))
        
        // Smooth interpolation
        const diff = targetScroll - currentScroll
        if (Math.abs(diff) > 0.1) {
          currentScroll += diff * 0.12
          updateScroll(currentScroll)
        }
        
        animationFrame = requestAnimationFrame(animate)
      }

      // Start animation
      animate()

      // Control handlers
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        targetScroll += e.deltaY * 0.5
        console.log('🎡 Wheel scroll:', targetScroll)
      }

      // Mouse drag
      let isDragging = false
      let dragStart = 0
      let scrollStart = 0

      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true
        dragStart = e.clientX
        scrollStart = targetScroll
        wrapper.style.cursor = 'grabbing'
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        const diff = dragStart - e.clientX
        targetScroll = scrollStart + diff
      }

      const handleMouseUp = () => {
        isDragging = false
        wrapper.style.cursor = 'grab'
      }

      // Button controls
      window.handlePrevious = () => {
        targetScroll = Math.max(0, targetScroll - 300)
        console.log('⬅️ Previous:', targetScroll)
      }

      window.handleNext = () => {
        targetScroll = Math.min(maxScroll, targetScroll + 300)
        console.log('➡️ Next:', targetScroll)
      }

      window.handleReset = () => {
        targetScroll = 0
        console.log('🔄 Reset')
      }

      // Attach event listeners
      wrapper.addEventListener('wheel', handleWheel, { passive: false })
      wrapper.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)

      // Cleanup
      return () => {
        cancelAnimationFrame(animationFrame)
        wrapper.removeEventListener('wheel', handleWheel)
        wrapper.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }, 100)
  }, [])

  return (
    <div style={{ 
      height: '100vh', 
      overflow: 'hidden', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow: hidden;
        }
        
        #fold-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 60vh;
          perspective: 100vw;
          transform-style: preserve-3d;
          cursor: grab;
        }
        
        .fold-panel {
          position: absolute;
          width: 40vw;
          height: 60vh;
          overflow: hidden;
          top: 0;
          background: #f0f0f0;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        
        /* 3D positioning for each panel */
        .fold-panel-0 {
          right: 30%;
          transform: translate3d(0, 0, 0);
          z-index: 4;
        }
        
        .fold-panel-1 {
          right: 30%;
          transform-origin: right center;
          transform: translate3d(-100%, 0, 0) rotateY(-30deg);
          z-index: 3;
        }
        
        .fold-panel-2 {
          right: 30%;
          transform-origin: right center;
          transform: translate3d(-100%, 0, 0) rotateY(-30deg) 
                     translate3d(-100%, 0, 0) rotateY(30deg);
          z-index: 2;
        }
        
        .fold-panel-3 {
          right: 30%;
          transform-origin: right center;
          transform: translate3d(-100%, 0, 0) rotateY(-30deg) 
                     translate3d(-100%, 0, 0) rotateY(30deg)
                     translate3d(-100%, 0, 0) rotateY(90deg);
          z-index: 1;
          opacity: 0.7;
        }
        
        /* Content positioning offsets */
        .fold-content-inner {
          display: flex;
          height: 100%;
          width: max-content;
          transition: none;
          will-change: transform;
        }
        
        .fold-panel-0 .fold-content-inner {
          margin-left: 0;
        }
        
        .fold-panel-1 .fold-content-inner {
          margin-left: -40vw;
        }
        
        .fold-panel-2 .fold-content-inner {
          margin-left: -80vw;
        }
        
        .fold-panel-3 .fold-content-inner {
          margin-left: -120vw;
        }
        
        /* Content items */
        .content-item {
          width: 40vw;
          height: 60vh;
          position: relative;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .content-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .content-item.text-slide {
          background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
          padding: 3rem;
          flex-direction: column;
          text-align: center;
        }
        
        .content-item h2 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #333;
        }
        
        .content-item p {
          font-size: 1.2rem;
          color: #666;
          max-width: 80%;
          line-height: 1.6;
        }
        
        .project-title {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          color: white;
          font-size: 2.5rem;
          font-weight: bold;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.7);
          z-index: 10;
        }
        
        /* Controls */
        .controls-panel {
          position: fixed;
          top: 2rem;
          left: 2rem;
          background: rgba(0,0,0,0.8);
          padding: 1.5rem;
          border-radius: 10px;
          color: white;
          z-index: 1000;
        }
        
        .control-btn {
          padding: 10px 20px;
          margin: 5px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }
        
        .control-btn:hover {
          transform: scale(1.05);
        }
        
        .btn-prev {
          background: #4CAF50;
          color: white;
        }
        
        .btn-next {
          background: #2196F3;
          color: white;
        }
        
        .btn-reset {
          background: #f44336;
          color: white;
          display: block;
          width: calc(100% - 10px);
        }
        
        .debug-info {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.3);
          font-size: 12px;
          font-family: monospace;
        }
      `}</style>

      {/* Controls */}
      <div className="controls-panel">
        <h3 style={{ margin: '0 0 1rem 0' }}>3D Accordion Controls</h3>
        <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '1rem' }}>
          Status: Ready • Position: {debugInfo.position}px
        </div>
        <div>
          <button 
            className="control-btn btn-prev"
            onClick={() => window.handlePrevious?.()}
          >
            ← Previous
          </button>
          <button 
            className="control-btn btn-next"
            onClick={() => window.handleNext?.()}
          >
            Next →
          </button>
        </div>
        <button 
          className="control-btn btn-reset"
          onClick={() => window.handleReset?.()}
        >
          Reset
        </button>
        <div className="debug-info">
          <div>Position: {debugInfo.position}px</div>
          <div>Max: {debugInfo.max}px</div>
        </div>
      </div>

      {/* 3D Fold Structure */}
      <div id="fold-wrapper">
        {[0, 1, 2, 3].map(index => (
          <div key={index} className={`fold-panel fold-panel-${index}`}>
            <div className="fold-content-inner">
              {/* Project 1 - Specter Berlin */}
              <div className="content-item">
                <img src="https://picsum.photos/800/600?random=1" alt="Specter Berlin" />
                <div className="project-title">SPECTER BERLIN</div>
              </div>
              
              {/* Text slide about project */}
              <div className="content-item text-slide">
                <h2>About Specter</h2>
                <p>
                  A revolutionary fashion platform connecting Berlin's underground 
                  culture with cutting-edge streetwear design. Featuring work from 
                  emerging artists and established brands.
                </p>
              </div>
              
              {/* Project 2 */}
              <div className="content-item">
                <img src="https://picsum.photos/800/600?random=2" alt="Project 2" />
                <div className="project-title">URBAN LANDSCAPES</div>
              </div>
              
              {/* Text slide */}
              <div className="content-item text-slide">
                <h2>Sustainable Design</h2>
                <p>
                  Exploring the intersection of renewable energy and modern infrastructure. 
                  Wind turbines meet highway aesthetics in this groundbreaking project.
                </p>
              </div>
              
              {/* Project 3 */}
              <div className="content-item">
                <img src="https://picsum.photos/800/600?random=3" alt="Project 3" />
                <div className="project-title">OCEAN HORIZONS</div>
              </div>
              
              {/* More content... */}
              <div className="content-item text-slide">
                <h2>Maritime Excellence</h2>
                <p>
                  Capturing the essence of coastal living through innovative 
                  architectural design and sustainable materials.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '30px',
        fontSize: '14px'
      }}>
        3D Accordion Gallery - Click buttons to navigate through images
      </div>
    </div>
  )
}

// TypeScript declaration for window methods
declare global {
  interface Window {
    handlePrevious?: () => void
    handleNext?: () => void
    handleReset?: () => void
  }
}