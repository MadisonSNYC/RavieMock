import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Custom render function that includes providers
export const renderWithRouter = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

// Mock localStorage
export const mockLocalStorage = () => {
  const store = {}
  
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      Object.keys(store).forEach(key => delete store[key])
    }
  }
}

// Mock intersection observer
export const mockIntersectionObserver = () => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback, options) {
      this.callback = callback
      this.options = options
    }
    
    observe() {
      return null
    }
    
    unobserve() {
      return null
    }
    
    disconnect() {
      return null
    }
  }
}

// Mock matchMedia
export const mockMatchMedia = (matches = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// Wait for animations to complete
export const waitForAnimation = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Mock fetch for API calls
export const mockFetch = (response, status = 200) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response))
    })
  )
}

// Create mock file
export const createMockFile = (name = 'test.jpg', size = 1024, type = 'image/jpeg') => {
  const file = new File([''], name, { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

// Mock scroll
export const mockScroll = (x = 0, y = 0) => {
  window.scrollTo = vi.fn()
  window.scrollX = x
  window.scrollY = y
  window.pageXOffset = x
  window.pageYOffset = y
}

// Deterministic random for tests
export const mockRandom = (value = 0.5) => {
  const originalRandom = Math.random
  Math.random = () => value
  return () => {
    Math.random = originalRandom
  }
}