import React from 'react'

/**
 * Tile Templates for 3D Gallery
 * Minimal implementation to fix missing import
 */

interface TileProps {
  data: any
}

// Image tile component
const ImageTile = ({ data }: TileProps) => (
  <div className="tile-image" style={{ width: '100%', height: '100%' }}>
    <img 
      src={data.src || '/placeholder.jpg'} 
      alt={data.alt || 'Project image'}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
)

// Video tile component  
const VideoTile = ({ data }: TileProps) => (
  <div className="tile-video" style={{ width: '100%', height: '100%' }}>
    <video 
      src={data.src || ''}
      autoPlay
      muted
      loop
      playsInline
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
)

// Text tile component
const TextTile = ({ data }: TileProps) => (
  <div className="tile-text" style={{ 
    width: '100%', 
    height: '100%', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f5f5f5'
  }}>
    <div>
      <h3>{data.title || 'Title'}</h3>
      <p>{data.description || 'Description'}</p>
    </div>
  </div>
)

// Export tile templates map
export const TileTemplates = {
  image: ImageTile,
  video: VideoTile,
  text: TextTile,
  // Add more tile types as needed
  default: ImageTile
}