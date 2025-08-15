import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useIntroState from '../../../components/intro/useIntroState'

describe('useIntroState', () => {
  const STORAGE_KEY = 'ravie_intro_last_shown'
  const COOLDOWN_MS = 24 * 60 * 60 * 1000 // 24 hours

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear()
    vi.clearAllMocks()
    
    // Mock Date.now
    vi.spyOn(Date, 'now')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should play intro on first visit', () => {
    // No localStorage entry exists
    localStorage.getItem.mockReturnValue(null)
    Date.now.mockReturnValue(1000000)

    const { result } = renderHook(() => useIntroState())

    expect(result.current.shouldPlay).toBe(true)
    expect(result.current.hasPlayed).toBe(false)
  })

  it('should not play intro if shown recently', () => {
    // Set last shown to 1 hour ago
    const oneHourAgo = Date.now() - (60 * 60 * 1000)
    localStorage.getItem.mockReturnValue(oneHourAgo.toString())
    Date.now.mockReturnValue(Date.now())

    const { result } = renderHook(() => useIntroState())

    expect(result.current.shouldPlay).toBe(false)
  })

  it('should play intro if cooldown period has passed', () => {
    // Set last shown to 25 hours ago
    const twentyFiveHoursAgo = 1000000 - (25 * 60 * 60 * 1000)
    localStorage.getItem.mockReturnValue(twentyFiveHoursAgo.toString())
    Date.now.mockReturnValue(1000000)

    const { result } = renderHook(() => useIntroState())

    expect(result.current.shouldPlay).toBe(true)
  })

  it('should handle skip functionality', () => {
    localStorage.getItem.mockReturnValue(null)
    Date.now.mockReturnValue(1000000)

    const { result } = renderHook(() => useIntroState())

    expect(result.current.shouldPlay).toBe(true)

    act(() => {
      result.current.handleSkip()
    })

    expect(result.current.shouldPlay).toBe(false)
    expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, '1000000')
  })

  it('should handle complete functionality', () => {
    localStorage.getItem.mockReturnValue(null)
    Date.now.mockReturnValue(1000000)

    const { result } = renderHook(() => useIntroState())

    act(() => {
      result.current.handleComplete()
    })

    expect(result.current.hasPlayed).toBe(true)
    expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, '1000000')
  })

  it('should respect reduced motion preference', () => {
    // Mock matchMedia to return reduced motion preference
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const { result } = renderHook(() => useIntroState())

    expect(result.current.isReducedMotion).toBe(true)
    expect(result.current.shouldPlay).toBe(false)
  })

  it('should handle localStorage parsing errors gracefully', () => {
    // Set invalid localStorage value
    localStorage.getItem.mockReturnValue('invalid-number')
    Date.now.mockReturnValue(1000000)

    // Should not throw and should default to playing
    const { result } = renderHook(() => useIntroState())

    expect(result.current.shouldPlay).toBe(true)
  })

  it('should update localStorage when intro completes', () => {
    localStorage.getItem.mockReturnValue(null)
    const currentTime = 1000000
    Date.now.mockReturnValue(currentTime)

    const { result } = renderHook(() => useIntroState())

    act(() => {
      result.current.handleComplete()
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      currentTime.toString()
    )
  })

  it('should not play intro if localStorage indicates recent play', () => {
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000)
    localStorage.getItem.mockReturnValue(fiveMinutesAgo.toString())

    const { result } = renderHook(() => useIntroState())

    expect(result.current.shouldPlay).toBe(false)
  })
})