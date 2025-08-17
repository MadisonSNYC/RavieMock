import { useState, useCallback } from 'react'

export interface InfiniteWrapReturn {
  offset: number
  setOffset: (value: number) => void
  wrappedOffset: number
  wrapY: (y: number, height: number) => number
}

/**
 * Linear interpolation utility
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Wrap offset to keep within [-H, 0) range
 */
export function wrapOffset(y: number, H: number): number {
  // Keep y in [-H, 0)
  if (H <= 0) return 0
  let wrapped = y
  while (wrapped <= -H) wrapped += H
  while (wrapped > 0) wrapped -= H
  return wrapped
}

/**
 * Hook for infinite wrap math utilities
 * Handles seamless infinite scrolling with modulo wrapping
 */
export function useInfiniteWrap(
  length: number,
  itemHeight: number
): InfiniteWrapReturn {
  const [offset, setOffset] = useState(0)
  const contentHeight = length * itemHeight

  // Calculate wrapped offset with modulo arithmetic
  const wrappedOffset = wrapOffset(offset, contentHeight)

  // Pure wrap function for external use
  const wrapY = useCallback((y: number, height: number): number => {
    return wrapOffset(y, height)
  }, [])

  return {
    offset,
    setOffset,
    wrappedOffset,
    wrapY
  }
}

/**
 * Utility function for wrapping with hysteresis
 * Prevents visual jumps at boundaries
 */
export function wrapWithHysteresis(
  offset: number,
  height: number,
  margin = 50
): { wrapped: number; jumped: boolean } {
  const upperBound = -height + margin
  const lowerBound = -margin

  if (offset < upperBound) {
    return { wrapped: offset + height, jumped: true }
  } else if (offset > lowerBound) {
    return { wrapped: offset - height, jumped: true }
  }

  return { wrapped: offset, jumped: false }
}

/**
 * Calculate threshold for wrap triggering
 */
export function calculateWrapThreshold(
  height: number,
  margin = 0
): { upper: number; lower: number } {
  return {
    upper: -height + margin,
    lower: -margin
  }
}