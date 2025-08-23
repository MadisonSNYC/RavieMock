import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react'
import { useIntersectionVideo } from '../../hooks/useIntersectionVideo'
import { claim, release } from '../../lib/previewController'

export interface VideoPreviewProps {
  posterSrc: string
  previewSrc: string
  autoPlayAllowed?: boolean
  className?: string
  freeOnLeave?: boolean
}

export interface VideoPreviewHandle {
  play: () => void
  pause: () => void
}

/**
 * Video preview component with robust hover/focus autoplay
 * Guarantees src attach on interaction with single-active guard
 */
export const VideoPreview = forwardRef<VideoPreviewHandle, VideoPreviewProps>(
  ({ posterSrc, previewSrc, autoPlayAllowed = true, className = '', freeOnLeave = true }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    
    // IntersectionObserver for assistive lazy loading
    const { ref: intersectionRef, isIntersecting } = useIntersectionVideo<HTMLDivElement>({
      rootMargin: '200px 0px',
      threshold: 0.25,
      onEnter: () => {
        // Attach source when entering viewport
        if (autoPlayAllowed && videoRef.current && !videoRef.current.src) {
          videoRef.current.src = previewSrc
          videoRef.current.load()
        }
      },
      onLeave: () => {
        // Pause when leaving viewport
        safePause()
      }
    })

    // iOS-specific attributes for reliable playback
    useEffect(() => {
      const v = videoRef.current
      if (!v) return
      
      v.setAttribute('webkit-playsinline', '')
      // @ts-expect-error - iOS specific property
      if ('disablePictureInPicture' in v) {
        v.disablePictureInPicture = true
      }
    }, [])

    // Helper: Ensure video source is loaded
    const ensureSrc = () => {
      const v = videoRef.current
      if (!v) return
      if (!v.src) {
        v.src = previewSrc
        v.load()
      }
    }

    // Helper: Try to play video with error handling
    const tryPlay = async () => {
      const v = videoRef.current
      if (!v) return
      try {
        await v.play()
      } catch {
        // Silently handle autoplay errors
      }
    }

    // Helper: Safely pause video
    const safePause = () => {
      const v = videoRef.current
      if (v) {
        try {
          v.pause()
        } catch {}
      }
    }

    // Handle interaction enter (hover/focus)
    const onEnter = () => {
      if (!autoPlayAllowed || !videoRef.current) return
      
      ensureSrc()
      claim(videoRef.current)
      void tryPlay()
    }

    // Handle interaction leave (blur/mouse leave)
    const onLeave = () => {
      const v = videoRef.current
      if (!v) return
      
      safePause()
      release(v)
      
      if (freeOnLeave) {
        setTimeout(() => {
          const video = videoRef.current
          if (!video) return
          // Only clear if not actively hovered or focused
          if (!video.matches(':hover') && document.activeElement !== video) {
            video.removeAttribute('src')
            video.load()
          }
        }, 250)
      }
    }

    // Imperative handle for parent control
    useImperativeHandle(ref, () => ({
      play: () => {
        if (!autoPlayAllowed) return
        ensureSrc()
        claim(videoRef.current!)
        void tryPlay()
      },
      pause: () => {
        safePause()
        if (videoRef.current) {
          release(videoRef.current)
        }
      }
    }))

    return (
      <div
        ref={intersectionRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        className={`relative overflow-hidden rounded-2xl bg-black ${className}`}
      >
        {/* Poster fallback */}
        <img
          src={posterSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Video element */}
        {autoPlayAllowed && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="relative w-full h-full object-cover"
            poster={posterSrc}
          />
        )}
      </div>
    )
  }
)

VideoPreview.displayName = 'VideoPreview'

export default VideoPreview