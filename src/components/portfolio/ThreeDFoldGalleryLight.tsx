import React, { useEffect, useRef, useState } from 'react'
import { ProjectData } from "../../data/projectsData"
import { TileTemplates } from "./TileTemplates"

/**
 * Dynamic Light 3D fold - using exact logic from Portfolio3DLight
 * Forward-only infinite scroll, starts at first tile
 */
export default function ThreeDFoldGalleryLight({ project }: { project: ProjectData }) {
  const scrollPositionRef = useRef(0)
  const [currentTileIndex, setCurrentTileIndex] = useState(0)

  // Initialize 3D fold effect - EXACT logic from Portfolio3DLight
  useEffect(() => {
    console.log('🎯 Initializing Light 3D Gallery')
    
    setTimeout(() => {
      const wrapper = document.getElementById("fold-wrapper-light")
      if (!wrapper) return

      const panels = wrapper.querySelectorAll('.fold-panel-light')
      const totalTiles = project.tiles.length
      const scrollPerTile = 600

      let currentScroll = 0
      let targetScroll = 0
      let animationFrame: number

      const updateScroll = (position: number) => {
        panels.forEach((panel) => {
          const content = panel.querySelector('.fold-content-light') as HTMLElement
          if (content) {
            content.style.transform = `translateX(${-position}px)`
          }
        })
        
        scrollPositionRef.current = position
        // For infinite scroll, calculate current index with modulo
        const rawIndex = Math.floor(position / scrollPerTile)
        setCurrentTileIndex(rawIndex % totalTiles)
      }

      const animate = () => {
        // For infinite scroll, don't limit the max scroll
        targetScroll = Math.max(0, targetScroll)
        
        const diff = targetScroll - currentScroll
        if (Math.abs(diff) > 0.1) {
          currentScroll += diff * 0.12
          updateScroll(currentScroll)
        }
        animationFrame = requestAnimationFrame(animate)
      }

      animate()

      window.nextTile = () => {
        targetScroll += scrollPerTile
      }

      window.prevTile = () => {
        targetScroll = Math.max(0, targetScroll - scrollPerTile)
      }

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        targetScroll += e.deltaY * 0.5
      }

      wrapper.addEventListener('wheel', handleWheel, { passive: false })

      return () => {
        cancelAnimationFrame(animationFrame)
        wrapper.removeEventListener('wheel', handleWheel)
      }
    }, 100)
  }, [project])

  return (
    <div className="gallery-section">
      <style>{`
        /* === Light 3D Gallery CSS from Portfolio3DLight === */
        
        /* Gallery viewport container */
        .gallery-viewport-light {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        #fold-wrapper-light {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 85%;
          perspective: 100vw;
          transform-style: preserve-3d;
        }
        
        /* 3D fold panels */
        .fold-panel-light {
          position: absolute;
          width: 45vw;
          height: 100%;
          overflow: hidden;
          top: 0;
          left: 0;
          background: #fff;
          box-shadow: 
            0 10px 30px rgba(0,0,0,0.15),
            0 5px 10px rgba(0,0,0,0.1);
          border: none;
        }
        
        .fold-content-light {
          display: flex;
          height: 100%;
          width: max-content;
          will-change: transform;
          transition: none;
        }
        
        .tile-wrapper {
          width: 45vw;
          height: 100%;
          flex-shrink: 0;
          display: flex;
        }
        
        /* CLEAN DEPTH - Z-axis layering */
        .fold-panel-light-0 {
          transform: translate3d(0, 0, 100px) scale(1.02);
          z-index: 4;
          box-shadow: 0 15px 40px rgba(0,0,0,0.18);
        }
        
        .fold-panel-light-1 {
          transform-origin: left center;
          transform: translate3d(100%, 0, 50px) rotateY(35deg) scale(1);
          z-index: 3;
          box-shadow: 0 12px 30px rgba(0,0,0,0.14);
        }
        
        .fold-panel-light-2 {
          transform-origin: left center;
          transform: translate3d(100%, 0, 0px) rotateY(35deg) 
                     translate3d(100%, 0, -50px) rotateY(-35deg) scale(0.98);
          z-index: 2;
          box-shadow: 0 8px 20px rgba(0,0,0,0.11);
        }
        
        .fold-panel-light-3 {
          transform-origin: left center;
          transform: translate3d(100%, 0, -100px) rotateY(35deg) 
                     translate3d(100%, 0, -100px) rotateY(-35deg)
                     translate3d(100%, 0, -150px) rotateY(-70deg) scale(0.96);
          z-index: 1;
          opacity: 0.85;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }
        
        /* Each panel shows different tiles based on offset */
        .fold-panel-light-0 .fold-content-light { margin-left: 0; }
        .fold-panel-light-1 .fold-content-light { margin-left: -45vw; }
        .fold-panel-light-2 .fold-content-light { margin-left: -90vw; }
        .fold-panel-light-3 .fold-content-light { margin-left: -135vw; }
        
        /* Gallery Controls */
        .gallery-controls {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255,255,255,0.95);
          padding: 12px 24px;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .control-btn {
          padding: 10px 20px;
          background: #000;
          color: #fff;
          border: none;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .control-btn:hover {
          background: #333;
        }
        
        .control-info {
          font-size: 11px;
          color: #666;
          letter-spacing: 0.05em;
        }
      `}</style>

      <div className="gallery-viewport-light">
        <div id="fold-wrapper-light">
          {[0, 1, 2, 3].map(panelIndex => (
            <div key={panelIndex} className={`fold-panel-light fold-panel-light-${panelIndex}`}>
              <div className="fold-content-light">
                {/* Repeat tiles for infinite scroll */}
                {[...Array(20)].flatMap((_, repeatIndex) => 
                  project.tiles.map((tile, tileIndex) => (
                    <div key={`${repeatIndex}-${tileIndex}`} className="tile-wrapper">
                      {TileTemplates[tile.type as keyof typeof TileTemplates]({ data: tile.data })}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Controls inside viewport */}
        <div className="gallery-controls">
          <button className="control-btn" onClick={() => window.prevTile?.()}>
            ← PREVIOUS
          </button>
          <span className="control-info">
            Viewing tiles {currentTileIndex + 1}-{Math.min(currentTileIndex + 4, project.tiles.length)} of {project.tiles.length}
          </span>
          <button className="control-btn" onClick={() => window.nextTile?.()}>
            NEXT →
          </button>
        </div>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    nextTile?: () => void
    prevTile?: () => void
  }
}