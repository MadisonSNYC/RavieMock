import React from 'react'

/**
 * Grid Gallery Component
 * Minimal implementation to fix missing import
 */

interface GridGalleryProps {
  project?: any
  tiles?: any[]
}

export const GridGallery: React.FC<GridGalleryProps> = ({ project, tiles }) => {
  const displayTiles = tiles || project?.tiles || []
  
  return (
    <div className="grid-gallery" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      padding: '1rem'
    }}>
      {displayTiles.map((tile: any, index: number) => (
        <div key={index} className="grid-tile" style={{
          aspectRatio: '1',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {tile.type === 'image' && tile.data?.src ? (
            <img src={tile.data.src} alt={tile.data.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div>{tile.type || 'Tile'} {index + 1}</div>
          )}
        </div>
      ))}
    </div>
  )
}