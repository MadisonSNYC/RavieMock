import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import useContactForm from '../../hooks/useContactForm'

// Mock logger outside of describe block
vi.mock('../../services/logger', () => ({
  default: {
    log: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn()
  }
}))

// Mock security utilities
vi.mock('../../utils/security', () => ({
  checkURLSecurity: vi.fn(() => ({ safe: true, reason: null })),
  csrfProtection: {
    generateToken: vi.fn(() => 'mock-csrf-token'),
    validateToken: vi.fn(() => ({ valid: true, error: null }))
  },
  generateSecureToken: vi.fn(() => 'mock-session-id')
}))

describe('useContactForm Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock sessionStorage
    const mockSessionStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    }
    Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage, writable: true })
  })

  // HOOK-001: Form state management
  it('should initialize with empty form state', () => {
    const { result } = renderHook(() => useContactForm())
    
    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      company: '',
      service: '',
      budget: '',
      message: ''
    })
    expect(result.current.errors).toEqual({})
    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.isSubmitted).toBe(false)
  })

  it('should update form fields', () => {
    const { result } = renderHook(() => useContactForm())
    
    act(() => {
      result.current.handleInputChange({
        target: { name: 'name', value: 'John Doe' }
      })
    })
    
    expect(result.current.formData.name).toBe('John Doe')
  })

  it('should clear errors when user types', () => {
    const { result } = renderHook(() => useContactForm())
    
    // Set initial error
    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() })
    })
    
    expect(result.current.errors.name).toBeDefined()
    
    // Type in field
    act(() => {
      result.current.handleInputChange({
        target: { name: 'name', value: 'J' }
      })
    })
    
    expect(result.current.errors.name).toBeNull()
  })

  // HOOK-002: Form validation
  it('should validate required fields', async () => {
    const { result } = renderHook(() => useContactForm())
    
    const preventDefault = vi.fn()
    await act(async () => {
      await result.current.handleSubmit({ preventDefault })
    })
    
    expect(preventDefault).toHaveBeenCalled()
    expect(result.current.errors.name).toBeDefined()
    expect(result.current.errors.email).toBeDefined()
    expect(result.current.errors.message).toBeDefined()
  })

  it('should validate email format', async () => {
    const { result } = renderHook(() => useContactForm())
    
    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'invalid-email' }
      })
    })
    
    const preventDefault = vi.fn()
    await act(async () => {
      await result.current.handleSubmit({ preventDefault })
    })
    
    expect(result.current.errors.email).toBe('Invalid email format')
  })

  it('should validate message length', async () => {
    const { result } = renderHook(() => useContactForm())
    
    act(() => {
      result.current.handleInputChange({
        target: { name: 'message', value: 'Short' }
      })
    })
    
    const preventDefault = vi.fn()
    await act(async () => {
      await result.current.handleSubmit({ preventDefault })
    })
    
    expect(result.current.errors.message).toContain('at least 10')
  })

  // HOOK-003: Form submission
  it('should handle successful submission', async () => {
    const { result } = renderHook(() => useContactForm())
    
    // Fill valid form
    act(() => {
      result.current.handleInputChange({
        target: { name: 'name', value: 'John Doe' }
      })
      result.current.handleInputChange({
        target: { name: 'email', value: 'john@example.com' }
      })
      result.current.handleInputChange({
        target: { name: 'message', value: 'This is a test message' }
      })
    })
    
    const originalLocation = window.location.href
    const preventDefault = vi.fn()
    
    await act(async () => {
      await result.current.handleSubmit({ preventDefault })
    })
    
    await waitFor(() => {
      expect(result.current.isSubmitted).toBe(true)
    })
  })

  it('should reset form', () => {
    const { result } = renderHook(() => useContactForm())
    
    // Set some data
    act(() => {
      result.current.handleInputChange({
        target: { name: 'name', value: 'John' }
      })
    })
    
    expect(result.current.formData.name).toBe('John')
    
    // Reset
    act(() => {
      result.current.resetForm()
    })
    
    expect(result.current.formData.name).toBe('')
    expect(result.current.isSubmitted).toBe(false)
  })
})