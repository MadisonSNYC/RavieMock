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

export default function Reversed3DFoldStatic() {
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
      },
      {
        type: 'gallery',
        data: {
          images: [
            'https://picsum.photos/400/300?random=4',
            'https://picsum.photos/400/300?random=5',
            'https://picsum.photos/400/300?random=6',
            'https://picsum.photos/400/300?random=7'
          ]
        }
      }
    ]
  })

  const scrollPositionRef = useRef(0)
  const [currentTileIndex, setCurrentTileIndex] = useState(0)

  useEffect(() => {
    console.log('🚀 Initializing Static 3D Fold')
    
    setTimeout(() => {
      const wrapper = document.getElementById("fold-wrapper-reversed")
      if (!wrapper) return

      const panels = wrapper.querySelectorAll('.fold-panel-reversed')
      const totalTiles = currentProject.tiles.length
      const scrollPerTile = 600 // Pixels to scroll for each tile transition

      let currentScroll = 0
      let targetScroll = 0
      let animationFrame: number

      const updateScroll = (position: number) => {
        // Calculate which set of tiles should be visible
        const tileSetIndex = Math.floor(position / scrollPerTile)
        
        // Update all panels to scroll horizontally together
        panels.forEach((panel) => {
          const content = panel.querySelector('.fold-content-reversed') as HTMLElement
          if (content) {
            // Simple horizontal scroll - all panels move together
            content.style.transform = `translateX(${-position}px)`
          }
        })
        
        scrollPositionRef.current = position
        setCurrentTileIndex(Math.min(tileSetIndex, totalTiles - 4))
      }

      const animate = () => {
        const maxScroll = Math.max(0, (totalTiles - 4) * scrollPerTile)
        targetScroll = Math.max(0, Math.min(maxScroll, targetScroll))
        
        const diff = targetScroll - currentScroll
        if (Math.abs(diff) > 0.1) {
          currentScroll += diff * 0.12
          updateScroll(currentScroll)
        }
        animationFrame = requestAnimationFrame(animate)
      }

      animate()

      // Navigation
      window.nextTile = () => {
        targetScroll += scrollPerTile
      }

      window.prevTile = () => {
        targetScroll -= scrollPerTile
      }

      window.navigateToTile = (index: number) => {
        targetScroll = index * scrollPerTile
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
        
        /* AGGRESSIVE FOLD - Back to original angles */
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
        
        /* Content container - now holds ALL tiles in a row */
        .fold-content-reversed {
          display: flex;
          height: 100%;
          width: max-content;
          position: relative;
          will-change: transform;
          transition: none;
        }
        
        /* Each panel shows different tiles based on offset */
        .fold-panel-reversed-0 .fold-content-reversed {
          margin-left: 0;
        }
        
        .fold-panel-reversed-1 .fold-content-reversed {
          margin-left: -45vw;
        }
        
        .fold-panel-reversed-2 .fold-content-reversed {
          margin-left: -90vw;
        }
        
        .fold-panel-reversed-3 .fold-content-reversed {
          margin-left: -135vw;
        }
        
        .tile-wrapper {
          width: 45vw;
          height: 70vh;
          flex-shrink: 0;
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
          font-size: 3.5rem;
          font-weight: bold;
          margin: 0;
        }
        
        .hero-subtitle {
          font-size: 1.3rem;
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
          font-size: 1.2rem;
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
        
        /* Navigation */
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
        
        /* Debug */
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
        }
      `}</style>

      {/* 3D Fold Structure - Each panel shows FIXED tiles */}
      <div id="fold-wrapper-reversed">
        {[0, 1, 2, 3].map(panelIndex => (
          <div key={panelIndex} className={`fold-panel-reversed fold-panel-reversed-${panelIndex}`}>
            <div className="fold-content-reversed">
              {/* All tiles in a row - each panel shows different portion */}
              {currentProject.tiles.map((tile, tileIndex) => (
                <div key={tileIndex} className="tile-wrapper">
                  {TileTemplates[tile.type]({ data: tile.data })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="tile-nav">
        <button onClick={() => window.prevTile?.()}>← Previous</button>
        <span style={{ margin: '0 20px', color: 'white' }}>
          Viewing tiles {currentTileIndex + 1}-{Math.min(currentTileIndex + 4, currentProject.tiles.length)} of {currentProject.tiles.length}
        </span>
        <button onClick={() => window.nextTile?.()}>Next →</button>
      </div>

      {/* Debug */}
      <div className="debug-panel">
        <h3>🔧 Debug</h3>
        <div>Scroll: {Math.round(scrollPositionRef.current)}px</div>
        <div>Current set: {currentTileIndex}</div>
        <div>Total tiles: {currentProject.tiles.length}</div>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    navigateToTile?: (index: number) => void
    nextTile?: () => void
    prevTile?: () => void
  }
}