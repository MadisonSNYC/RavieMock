import { useState, useEffect } from 'react'
import { Image as ImageIcon } from 'lucide-react'

/**
 * Image component with fallback support and loading states
 * @param {Object} props
 * @param {string} props.src - Primary image source
 * @param {string} props.fallbackSrc - Fallback image source
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - CSS classes
 * @param {boolean} props.lazy - Enable lazy loading
 * @param {Function} props.onLoad - Callback when image loads
 * @param {Function} props.onError - Callback when image fails
 */
export default function ImageWithFallback({ 
  src, 
  fallbackSrc, 
  alt, 
  className = '',
  lazy = true,
  onLoad,
  onError,
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
    setIsLoading(true)
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    if (onLoad) onLoad()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    
    // Try fallback image if provided
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(false)
      setIsLoading(true)
    }
    
    if (onError) onError()
  }

  // If no fallback and error occurred, show error state
  if (hasError && (!fallbackSrc || imgSrc === fallbackSrc)) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-900 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="text-center p-4">
          <ImageIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Image unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent animate-shimmer" />
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}

// Add shimmer animation to your CSS or Tailwind config
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }
// .animate-shimmer {
//   animation: shimmer 2s infinite;
// }