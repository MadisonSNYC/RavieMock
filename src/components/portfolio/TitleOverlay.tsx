import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionContext } from '../../providers/ReducedMotionProvider'
// TextScramble functions removed - file was missing
const scrambleTo = (element: HTMLElement, text: string, options: any) => {
  element.textContent = text // Simple fallback
}
const isTouch = () => 'ontouchstart' in window

type Props = {
  title: string
  client?: string
  categories?: string[]
  // controlled visibility; parent drives this from hover/focus
  show: boolean
  // optional: smaller default on mobile
  compact?: boolean
  className?: string
}

/**
 * Animated title overlay for project cards
 * Shows project info with gradient scrim on hover/focus
 */
export default function TitleOverlay({
  title,
  client,
  categories = [],
  show,
  compact,
  className = ''
}: Props) {
  const { prefersReducedMotion } = useReducedMotionContext()
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  // Apply scramble effect on show (desktop only, not reduced motion)
  useEffect(() => {
    if (!show) return
    if (isTouch() || prefersReducedMotion) return
    if (titleRef.current) {
      scrambleTo(titleRef.current, title, { duration: 220 })
    }
  }, [show, title, prefersReducedMotion])
  
  const base =
    "pointer-events-none absolute inset-0 flex items-end p-3 sm:p-4 lg:p-5 text-white"
  const scrim =
    "absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent"

  // Simple fade without y-axis movement to prevent bounce
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <div className={`${base} ${className}`}>
      <div className={scrim} aria-hidden="true" />
      <motion.div
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={variants}
        transition={{ 
          duration: prefersReducedMotion ? 0 : 0.2, 
          ease: "easeOut"
        }}
        className="relative z-10 max-w-[90%]"
        style={{ willChange: prefersReducedMotion ? "auto" : "opacity" }}
      >
        {/* Meta row */}
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/80">
          {client ? (
            <span className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur">
              {client}
            </span>
          ) : null}
          {categories.slice(0, 2).map((c) => (
            <span key={c} className="px-2 py-0.5 rounded-md bg-white/10">
              {c}
            </span>
          ))}
          {/* Play hint */}
          <span className="ml-auto hidden sm:inline px-2 py-0.5 rounded-md bg-white/10">
            PLAY
          </span>
        </div>
        {/* Title */}
        <h3
          ref={titleRef}
          className={`font-semibold leading-tight drop-shadow ${
            compact
              ? "text-base sm:text-lg"
              : "text-2xl sm:text-3xl lg:text-5xl"
          }`}
        >
          {title}
        </h3>
      </motion.div>
    </div>
  )
}