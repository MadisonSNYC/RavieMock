/**
 * MosaicGrid Component
 * Handles the checkerboard grid animation with project thumbnails
 */

import { motion } from 'framer-motion'
import { MOSAIC_TILES, TIMELINE, STAGGER_DELAY } from './constants'

// Calculate tile index for L→R sweep (row-major order)
const getTileIndex = (row, col) => row * 5 + col

export default function MosaicGrid({ currentTime, leftHalfSliding }) {
  return (
    <>
      <div className="intro-mosaic">
        {MOSAIC_TILES.map((tile) => {
          const tileIndex = getTileIndex(tile.row, tile.col)
          const tileStartTime = TIMELINE.mosaic.start + (tileIndex * STAGGER_DELAY)
          const isTileVisible = currentTime >= tileStartTime
          
          // When sliding: hide everything except media tiles in left column
          const isLeftColumn = tile.col === 0
          const isLeftMediaTile = isLeftColumn && !tile.isBlack
          const shouldHide = leftHalfSliding && !isLeftMediaTile

          return (
            <motion.div
              key={tile.id}
              className={`intro-tile intro-tile-${tile.row}-${tile.col}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{
                opacity: shouldHide ? 0 : (isTileVisible ? 1 : 0),
                scale: isTileVisible ? 1 : 0.98,
                clipPath: isTileVisible 
                  ? 'inset(0% 0% 0% 0%)' 
                  : 'inset(0% 100% 0% 0%)'
              }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 },
                clipPath: { 
                  duration: 0.5, 
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }
              }}
            >
              {tile.isBlack ? (
                <div className="intro-tile-black" />
              ) : tile.isLogo ? (
                <div className="intro-tile-logo">
                  <img src={tile.src} alt="Ravie" />
                </div>
              ) : (
                <img src={tile.src} alt="" loading="eager" />
              )}
            </motion.div>
          )
        })}
      </div>
      
      {/* Black overlay for right side - covers everything except left column */}
      <motion.div
        className="intro-right-overlay"
        initial={{ x: '100%' }}
        animate={{ 
          x: leftHalfSliding ? 0 : '100%'
        }}
        transition={{ 
          duration: 0.5,  // Quick slide for 3s total
          ease: [0.43, 0.13, 0.23, 0.96]  // Faster start, slower end
        }}
        style={{
          position: 'absolute',
          left: 'calc(20% + 2px)', // Account for grid gap
          top: 0,
          width: 'calc(80% - 2px)',
          height: '100%',
          background: '#000',
          pointerEvents: 'none',
          zIndex: 15
        }}
      />
    </>
  )
}