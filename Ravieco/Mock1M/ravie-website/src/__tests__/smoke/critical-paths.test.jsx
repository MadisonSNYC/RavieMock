import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../../App'
import ErrorBoundary from '../../components/ErrorBoundary'

describe('Smoke Tests: Critical Paths', () => {
  it('should render the app without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    expect(container).toBeInTheDocument()
  })

  it('should have main navigation links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // Check for main nav items - case insensitive search
    const workLinks = screen.getAllByText(/work/i)
    expect(workLinks.length).toBeGreaterThan(0)
    
    const aboutLinks = screen.getAllByText(/about/i)
    expect(aboutLinks.length).toBeGreaterThan(0)
    
    const contactLinks = screen.getAllByText(/contact/i)
    expect(contactLinks.length).toBeGreaterThan(0)
  })

  it('should have footer present', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // Check for footer content
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('should handle error boundaries', () => {
    // Component that throws
    const ThrowError = () => {
      throw new Error('Test error')
    }
    
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const { container } = render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </BrowserRouter>
    )
    
    // Should show fallback UI
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })
})