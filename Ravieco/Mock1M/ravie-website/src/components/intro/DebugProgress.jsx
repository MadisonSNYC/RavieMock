/**
 * DebugProgress Component
 * Shows timeline progress in development mode
 */

export default function DebugProgress({ currentTime, totalTime }) {
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div 
      className="intro-progress" 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: `${(currentTime / totalTime) * 100}%`,
        height: '2px',
        background: 'var(--color-ravie-red)',
        zIndex: 10000
      }}
    />
  )
}