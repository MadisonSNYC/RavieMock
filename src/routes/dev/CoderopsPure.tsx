import { useEffect, useRef } from 'react'
import '../../styles/dev.css'

export default function CoderopsPure() {
  const stateRef = useRef({
    targetScroll: 0,
    currentScroll: 0,
    maxScroll: -2000 // Default max scroll
  })

  useEffect(() => {
    console.log('🚀 Initializing Codrops 3D Folding...')
    
    // Get DOM elements
    const wrapper = document.getElementById("fold-effect")
    const folds = Array.from(document.getElementsByClassName("fold"))
    const baseContent = document.getElementById("base-content")

    if (!wrapper || !folds.length || !baseContent) {
      console.error('Missing elements')
      return
    }

    // Clone content into each fold
    folds.forEach((fold, i) => {
      const copyContent = baseContent.cloneNode(true) as HTMLElement
      copyContent.id = ""
      copyContent.classList.add('cloned-content')
      
      const sizeFixEle = document.createElement("div")
      sizeFixEle.classList.add("fold-size-fix")
      
      const scroller = document.createElement("div")
      scroller.classList.add("fold-scroller")
      
      sizeFixEle.appendChild(scroller)
      fold.appendChild(sizeFixEle)
      scroller.appendChild(copyContent)
    })

    // Update scroll position
    const updateScroll = (scrollValue: number) => {
      const scrollers = document.querySelectorAll('.fold-scroller .cloned-content')
      scrollers.forEach((scroller) => {
        (scroller as HTMLElement).style.transform = `translateX(${scrollValue}px)`
      })
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      const state = stateRef.current
      
      // Clamp target scroll
      state.targetScroll = Math.max(state.maxScroll, Math.min(0, state.targetScroll))
      
      // Smooth interpolation
      const diff = state.targetScroll - state.currentScroll
      state.currentScroll += diff * 0.1
      
      // Update DOM
      updateScroll(state.currentScroll)
      
      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Wheel handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const state = stateRef.current
      state.targetScroll -= e.deltaY * 0.5
      console.log('Wheel:', state.targetScroll)
    }

    // Mouse drag
    let isDragging = false
    let startX = 0
    let startScroll = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      startX = e.clientX
      startScroll = stateRef.current.targetScroll
      document.body.style.cursor = 'grabbing'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const diff = e.clientX - startX
      stateRef.current.targetScroll = startScroll + diff * 2
    }

    const handleMouseUp = () => {
      isDragging = false
      document.body.style.cursor = 'grab'
    }

    // Add listeners
    wrapper.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    // Calculate actual max scroll after images load
    setTimeout(() => {
      const content = document.querySelector('.cloned-content') as HTMLElement
      if (content) {
        const contentWidth = content.scrollWidth
        const viewWidth = window.innerWidth * 0.4 // 40vw fold width
        stateRef.current.maxScroll = -(contentWidth - viewWidth)
        console.log('Content width:', contentWidth, 'Max scroll:', stateRef.current.maxScroll)
      }
    }, 500)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      wrapper.removeEventListener('wheel', handleWheel)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div style={{ height: '100vh', overflow: 'hidden', background: '#000' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          overflow: hidden !important;
          height: 100vh;
          cursor: grab;
        }
        
        body:active {
          cursor: grabbing;
        }
        
        .content {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }
        
        .fold-content, .cloned-content {
          display: flex;
          height: 100%;
          flex-direction: row;
          width: max-content;
          align-items: center;
          gap: 0;
        }
        
        .screen {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
        }
        
        .wrapper-3d {
          position: relative;
          perspective: 50vw;
          transform-style: preserve-3d;
          height: 50vh;
          width: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .fold {
          overflow: hidden;
          width: 40vw;
          height: 50vh;
          will-change: transform;
          background: #1a1a1a;
          position: absolute;
          top: 0;
          right: 30%;
        }
        
        .fold-before {
          transform-origin: right center;
        }
        
        .fold-main {
          transform-origin: center center;
        }
        
        .fold-before-1 {
          transform: translate3d(-100%, 0, 0) rotateY(-35deg);
        }
        
        .fold-before-2 {
          transform: translate3d(-100%, 0, 0) rotateY(-35deg) 
                     translate3d(-100%, 0, 0) rotateY(35deg);
        }
        
        .fold-before-3 {
          transform: translate3d(-100%, 0, 0) rotateY(-35deg) 
                     translate3d(-100%, 0, 0) rotateY(35deg) 
                     translate3d(-100%, 0, 0) rotateY(110deg);
        }
        
        .fold-before-1::after {
          content: '';
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.3));
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        
        .fold-scroller {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .fold-size-fix {
          width: 100%;
          height: 100%;
        }
        
        /* Offset each fold's content */
        .fold-main .cloned-content {
          transform: translateX(-200%);
        }
        
        .fold-before-1 .cloned-content {
          transform: translateX(-100%);
        }
        
        .fold-before-2 .cloned-content {
          transform: translateX(0%);
        }
        
        .fold-before-3 .cloned-content {
          transform: translateX(100%);
        }
        
        .content__img {
          height: 50vh;
          width: auto;
          display: block;
          object-fit: cover;
        }
        
        .content__title {
          position: absolute;
          bottom: 40px;
          left: 40px;
          color: white;
          font-size: 2rem;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
          z-index: 10;
          pointer-events: none;
        }
        
        .controls {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1000;
          background: rgba(0,0,0,0.8);
          padding: 20px;
          border-radius: 10px;
          color: white;
        }
        
        .test-btn {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
          font-size: 14px;
        }
        
        .test-btn:hover {
          background: #45a049;
        }
      `}</style>

      {/* Controls */}
      <div className="controls">
        <h3>3D Folding Gallery</h3>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>Scroll • Drag • Click buttons</p>
        <button 
          className="test-btn"
          onClick={() => {
            const state = stateRef.current
            state.targetScroll -= 200
            console.log('Manual scroll to:', state.targetScroll)
          }}
        >
          ← Scroll Left
        </button>
        <button 
          className="test-btn"
          onClick={() => {
            const state = stateRef.current
            state.targetScroll += 200
            console.log('Manual scroll to:', state.targetScroll)
          }}
          style={{ marginLeft: '10px' }}
        >
          Scroll Right →
        </button>
        <button 
          className="test-btn"
          onClick={() => {
            stateRef.current.targetScroll = 0
            console.log('Reset scroll')
          }}
          style={{ display: 'block', marginTop: '10px', width: '100%' }}
        >
          Reset
        </button>
      </div>

      {/* Hidden base content */}
      <div className="content">
        <div className="fold-content" id="base-content">
          <div style={{ position: 'relative' }}>
            <img className="content__img" src="https://picsum.photos/600/800?random=1" alt="1" />
            <h3 className="content__title">Project Alpha</h3>
          </div>
          <div style={{ position: 'relative' }}>
            <img className="content__img" src="https://picsum.photos/600/800?random=2" alt="2" />
            <h3 className="content__title">Project Beta</h3>
          </div>
          <div style={{ position: 'relative' }}>
            <img className="content__img" src="https://picsum.photos/600/800?random=3" alt="3" />
            <h3 className="content__title">Project Gamma</h3>
          </div>
          <div style={{ position: 'relative' }}>
            <img className="content__img" src="https://picsum.photos/600/800?random=4" alt="4" />
            <h3 className="content__title">Project Delta</h3>
          </div>
          <div style={{ position: 'relative' }}>
            <img className="content__img" src="https://picsum.photos/600/800?random=5" alt="5" />
            <h3 className="content__title">Project Epsilon</h3>
          </div>
          <div style={{ position: 'relative' }}>
            <img className="content__img" src="https://picsum.photos/600/800?random=6" alt="6" />
            <h3 className="content__title">Project Zeta</h3>
          </div>
        </div>
      </div>

      {/* 3D Fold Structure */}
      <div className="screen" id="fold-effect">
        <div className="wrapper-3d">
          <div className="fold fold-before fold-before-3"></div>
          <div className="fold fold-before fold-before-2"></div>
          <div className="fold fold-before fold-before-1"></div>
          <div className="fold fold-main"></div>
        </div>
      </div>
    </div>
  )
}