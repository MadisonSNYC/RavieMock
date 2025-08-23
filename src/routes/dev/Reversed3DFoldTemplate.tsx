import { useEffect, useRef, useState } from 'react'

// Define tile types and their templates
type TileType = 'hero' | 'summary' | 'video' | 'image' | 'stats' | 'quote' | 'gallery'

interface TileContent {
  type: TileType
  data: any
}

interface ProjectData {
  id: string
  name: string
  client: string
  tiles: TileContent[]
}

// Tile Template Components
const TileTemplates = {
  hero: ({ data }: { data: any }) => (
    <div className="tile-hero">
      <img src={data.image} alt={data.title} className="hero-bg" />
      <div className="hero-overlay">
        <h1 className="hero-title">{data.title}</h1>
        <p className="hero-subtitle">{data.subtitle}</p>
      </div>
    </div>
  ),
  
  summary: ({ data }: { data: any }) => (
    <div className="tile-summary">
      <div className="summary-content">
        <h2>{data.title}</h2>
        <p className="summary-text">{data.description}</p>
        <div className="summary-tags">
          {data.tags?.map((tag: string, i: number) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="summary-indicator">★</div>
    </div>
  ),
  
  video: ({ data }: { data: any }) => (
    <div className="tile-video">
      <video 
        src={data.url} 
        poster={data.poster}
        loop 
        muted 
        autoPlay
        className="video-content"
      />
      <div className="video-overlay">
        <div className="video-title">{data.title}</div>
        <div className="video-indicator">▶</div>
      </div>
    </div>
  ),
  
  image: ({ data }: { data: any }) => (
    <div className="tile-image">
      <img src={data.url} alt={data.caption} className="image-content" />
      <div className="image-caption">{data.caption}</div>
      <div className="image-indicator">△</div>
    </div>
  ),
  
  stats: ({ data }: { data: any }) => (
    <div className="tile-stats">
      <h3>{data.title}</h3>
      <div className="stats-grid">
        {data.stats?.map((stat: any, i: number) => (
          <div key={i} className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  
  quote: ({ data }: { data: any }) => (
    <div className="tile-quote">
      <blockquote>"{data.text}"</blockquote>
      <cite>— {data.author}, {data.role}</cite>
    </div>
  ),
  
  gallery: ({ data }: { data: any }) => (
    <div className="tile-gallery">
      <div className="gallery-grid">
        {data.images?.map((img: string, i: number) => (
          <img key={i} src={img} alt={`Gallery ${i}`} className="gallery-item" />
        ))}
      </div>
      <div className="gallery-indicator">◉</div>
    </div>
  )
}

export default function Reversed3DFoldTemplate() {
  const [currentProject] = useState<ProjectData>({
    id: 'specter-berlin',
    name: 'SPECTER BERLIN',
    client: 'Specter Fashion Group',
    tiles: [
      {
        type: 'hero',
        data: {
          title: 'SPECTER BERLIN',
          subtitle: 'Revolutionary Fashion Platform',
          image: 'https://picsum.photos/800/600?random=1'
        }
      },
      {
        type: 'summary',
        data: {
          title: 'Project Overview',
          description: 'A revolutionary fashion platform connecting Berlin\'s underground culture with cutting-edge streetwear design. We created a complete brand identity and digital experience.',
          tags: ['Branding', 'Web Design', 'Motion', 'Strategy']
        }
      },
      {
        type: 'video',
        data: {
          title: 'Brand Film',
          url: 'https://example.com/video.mp4',
          poster: 'https://picsum.photos/800/600?random=2'
        }
      },
      {
        type: 'image',
        data: {
          url: 'https://picsum.photos/800/600?random=3',
          caption: 'Campaign Photography'
        }
      },
      {
        type: 'stats',
        data: {
          title: 'Project Impact',
          stats: [
            { value: '340%', label: 'Engagement Increase' },
            { value: '2.5M', label: 'Social Reach' },
            { value: '48hr', label: 'Sellout Time' },
            { value: '97%', label: 'Brand Recall' }
          ]
        }
      },
      {
        type: 'quote',
        data: {
          text: 'Ravie transformed our vision into a cultural movement. The results exceeded every expectation.',
          author: 'Marcus Klein',
          role: 'Creative Director, Specter'
        }
      }
    ]
  })

  const scrollPositionRef = useRef(0)
  const [debugInfo, setDebugInfo] = useState({ 
    position: 0, 
    max: 0,
    currentTile: 0,
    visibleTiles: [] as number[]
  })

  useEffect(() => {
    console.log('🚀 Initializing Reversed 3D Fold Template')
    
    setTimeout(() => {
      const wrapper = document.getElementById("fold-wrapper-reversed")
      if (!wrapper) return

      const panels = wrapper.querySelectorAll('.fold-panel-reversed')
      const tilesPerPanel = currentProject.tiles.length
      const maxScroll = (tilesPerPanel - 1) * 400 // 400px per tile transition

      let currentScroll = 0
      let targetScroll = 0
      let animationFrame: number

      const updateScroll = (position: number) => {
        panels.forEach((panel, panelIndex) => {
          const content = panel.querySelector('.fold-content-reversed') as HTMLElement
          if (content) {
            // Each panel shows a different tile based on scroll
            const tileOffset = Math.floor(position / 400)
            const tileIndex = (tileOffset + panelIndex) % tilesPerPanel
            
            // Update which tile is shown
            const tiles = content.querySelectorAll('.tile-wrapper')
            tiles.forEach((tile, i) => {
              (tile as HTMLElement).style.display = i === tileIndex ? 'flex' : 'none'
            })
            
            // Smooth position within tile
            const innerOffset = position % 400
            content.style.transform = `translateX(${-innerOffset}px)`
          }
        })
        
        scrollPositionRef.current = position
        setDebugInfo(prev => ({
          ...prev,
          position: Math.round(position),
          currentTile: Math.floor(position / 400),
          visibleTiles: [0, 1, 2, 3].map(i => 
            (Math.floor(position / 400) + i) % tilesPerPanel
          )
        }))
      }

      const animate = () => {
        targetScroll = Math.max(0, Math.min(maxScroll, targetScroll))
        const diff = targetScroll - currentScroll
        if (Math.abs(diff) > 0.1) {
          currentScroll += diff * 0.15
          updateScroll(currentScroll)
        }
        animationFrame = requestAnimationFrame(animate)
      }

      animate()

      // Navigation functions
      window.navigateToTile = (tileIndex: number) => {
        targetScroll = tileIndex * 400
      }

      window.nextTile = () => {
        const currentTile = Math.floor(targetScroll / 400)
        targetScroll = Math.min(maxScroll, (currentTile + 1) * 400)
      }

      window.prevTile = () => {
        const currentTile = Math.floor(targetScroll / 400)
        targetScroll = Math.max(0, (currentTile - 1) * 400)
      }

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        targetScroll += e.deltaY * 0.5
      }

      wrapper.addEventListener('wheel', handleWheel, { passive: false })

      setDebugInfo(prev => ({ ...prev, max: maxScroll }))

      return () => {
        cancelAnimationFrame(animationFrame)
        wrapper.removeEventListener('wheel', handleWheel)
      }
    }, 100)
  }, [currentProject])

  return (
    <div style={{ 
      height: '100vh', 
      overflow: 'hidden', 
      background: '#0a0a0a',
      position: 'relative'
    }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        
        #fold-wrapper-reversed {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 70vh;
          perspective: 120vw;
          transform-style: preserve-3d;
        }
        
        .fold-panel-reversed {
          position: absolute;
          width: 45vw;
          height: 70vh;
          overflow: hidden;
          top: 0;
          left: 0;
          background: #fff;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        
        /* Reversed fold directions - panels fold to the LEFT */
        .fold-panel-reversed-0 {
          transform: translate3d(0, 0, 0);
          z-index: 4;
        }
        
        .fold-panel-reversed-1 {
          transform-origin: left center;
          transform: translate3d(100%, 0, 0) rotateY(30deg);
          z-index: 3;
        }
        
        .fold-panel-reversed-2 {
          transform-origin: left center;
          transform: translate3d(100%, 0, 0) rotateY(30deg) 
                     translate3d(100%, 0, 0) rotateY(-30deg);
          z-index: 2;
        }
        
        .fold-panel-reversed-3 {
          transform-origin: left center;
          transform: translate3d(100%, 0, 0) rotateY(30deg) 
                     translate3d(100%, 0, 0) rotateY(-30deg)
                     translate3d(100%, 0, 0) rotateY(-90deg);
          z-index: 1;
          opacity: 0.8;
        }
        
        .fold-content-reversed {
          display: flex;
          height: 100%;
          width: 100%;
          position: relative;
          will-change: transform;
        }
        
        .tile-wrapper {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
        }
        
        /* Tile Template Styles */
        .tile-hero {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .hero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 4rem;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: white;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: bold;
          margin: 0;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          opacity: 0.9;
          margin-top: 1rem;
        }
        
        .tile-summary {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        
        .summary-content h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #333;
        }
        
        .summary-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #666;
          margin-bottom: 2rem;
        }
        
        .summary-tags {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .tag {
          padding: 0.5rem 1rem;
          background: #333;
          color: white;
          border-radius: 20px;
          font-size: 0.9rem;
        }
        
        .summary-indicator {
          position: absolute;
          top: 3rem;
          right: 3rem;
          font-size: 3rem;
          color: #333;
          opacity: 0.2;
        }
        
        .tile-video {
          width: 100%;
          height: 100%;
          position: relative;
          background: #000;
        }
        
        .video-content {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .video-overlay {
          position: absolute;
          bottom: 3rem;
          left: 3rem;
          color: white;
        }
        
        .video-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .video-indicator {
          font-size: 2rem;
          opacity: 0.8;
        }
        
        .tile-image {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .image-content {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-caption {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          color: white;
          font-size: 1.2rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }
        
        .image-indicator {
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-size: 2rem;
          color: white;
          opacity: 0.5;
        }
        
        .tile-stats {
          width: 100%;
          height: 100%;
          background: #1a1a1a;
          color: white;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .tile-stats h3 {
          font-size: 2rem;
          margin-bottom: 3rem;
          opacity: 0.9;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-value {
          font-size: 3rem;
          font-weight: bold;
          color: #4CAF50;
        }
        
        .stat-label {
          font-size: 1rem;
          opacity: 0.7;
          margin-top: 0.5rem;
        }
        
        .tile-quote {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        
        .tile-quote blockquote {
          font-size: 2rem;
          line-height: 1.6;
          margin: 0 0 2rem 0;
          max-width: 80%;
        }
        
        .tile-quote cite {
          font-size: 1.2rem;
          opacity: 0.9;
        }
        
        .tile-gallery {
          width: 100%;
          height: 100%;
          position: relative;
          background: #f0f0f0;
          padding: 2rem;
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          height: 100%;
        }
        
        .gallery-item {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
        
        .gallery-indicator {
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-size: 2rem;
          color: #333;
          opacity: 0.3;
        }
        
        /* Controls */
        .tile-nav {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.9);
          padding: 1.5rem 2rem;
          border-radius: 15px;
          display: flex;
          gap: 1rem;
          align-items: center;
          z-index: 100;
        }
        
        .tile-nav button {
          padding: 10px 20px;
          background: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .tile-nav button:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .tile-dots {
          display: flex;
          gap: 8px;
          margin: 0 20px;
        }
        
        .tile-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .tile-dot.active {
          background: white;
          transform: scale(1.5);
        }
        
        /* Debug Panel */
        .debug-panel {
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: rgba(0,0,0,0.9);
          color: white;
          padding: 1.5rem;
          border-radius: 10px;
          font-family: monospace;
          font-size: 12px;
          min-width: 200px;
        }
        
        .debug-panel h3 {
          margin: 0 0 1rem 0;
          font-size: 14px;
        }
        
        .debug-panel div {
          margin: 5px 0;
          opacity: 0.8;
        }
      `}</style>

      {/* 3D Fold Structure - REVERSED */}
      <div id="fold-wrapper-reversed">
        {[0, 1, 2, 3].map(panelIndex => (
          <div key={panelIndex} className={`fold-panel-reversed fold-panel-reversed-${panelIndex}`}>
            <div className="fold-content-reversed">
              {currentProject.tiles.map((tile, tileIndex) => (
                <div 
                  key={tileIndex} 
                  className="tile-wrapper"
                  style={{ display: tileIndex === panelIndex ? 'flex' : 'none' }}
                >
                  {TileTemplates[tile.type]({ data: tile.data })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="tile-nav">
        <button onClick={() => window.prevTile?.()}>← Previous</button>
        
        <div className="tile-dots">
          {currentProject.tiles.map((_, index) => (
            <div 
              key={index}
              className={`tile-dot ${index === debugInfo.currentTile ? 'active' : ''}`}
              onClick={() => window.navigateToTile?.(index)}
            />
          ))}
        </div>
        
        <button onClick={() => window.nextTile?.()}>Next →</button>
      </div>

      {/* Debug Panel */}
      <div className="debug-panel">
        <h3>🔧 Debug Info</h3>
        <div>Position: {debugInfo.position}px</div>
        <div>Current Tile: {debugInfo.currentTile + 1}/{currentProject.tiles.length}</div>
        <div>Tile Type: {currentProject.tiles[debugInfo.currentTile]?.type}</div>
        <div>Visible in panels: {debugInfo.visibleTiles.join(', ')}</div>
      </div>
    </div>
  )
}

// TypeScript declarations
declare global {
  interface Window {
    navigateToTile?: (index: number) => void
    nextTile?: () => void
    prevTile?: () => void
  }
}