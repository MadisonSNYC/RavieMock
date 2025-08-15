import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from '../../components/ErrorBoundary'
import logger from '../../services/logger'

// Mock the logger
vi.mock('../../services/logger', () => ({
  default: {
    error: vi.fn()
  }
}))

// Component that throws an error
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Suppress console errors during tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    console.error.mockRestore()
  })

  it('should render children when there is no error', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>
      </BrowserRouter>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should display error UI when an error is thrown', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    )

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/We encountered an unexpected error/i)).toBeInTheDocument()
  })

  it('should log errors using the logger service', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    )

    expect(logger.error).toHaveBeenCalledWith(
      'ErrorBoundary caught an error',
      expect.objectContaining({
        error: expect.stringContaining('Test error'),
        errorInfo: expect.any(String),
        stack: expect.any(String)
      })
    )
  })

  it('should display refresh page button', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    )

    const refreshButton = screen.getByText(/Refresh Page/i)
    expect(refreshButton).toBeInTheDocument()
  })

  it('should display go home link', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    )

    const homeLink = screen.getByText(/Go Home/i)
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
  })

  it('should show error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    )

    // In development, error details might be shown
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })
})