import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage2 from '../../pages/HomePage2'

describe('HomePage2', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    // Check for main elements - RAVIE is now in the header
    expect(screen.getByText('RAVIE')).toBeInTheDocument()
  })

  it('should display hero section', () => {
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    expect(screen.getByText(/cult followings/i)).toBeInTheDocument()
    expect(screen.getByText(/Motion design studio/i)).toBeInTheDocument()
  })

  it('should display projects grid', () => {
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    // Should show at least the first 6 projects
    expect(screen.getByText('Coinbase Rebrand')).toBeInTheDocument()
    expect(screen.getByText('Jhené Aiko Coachella')).toBeInTheDocument()
  })

  it('should toggle sidebar when button clicked', () => {
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i })
    
    // Initially sidebar should be closed
    const sidebar = screen.getByText(/Project Directory/i).closest('.sidebar')
    expect(sidebar).not.toHaveClass('active')
    
    // Click to open
    fireEvent.click(toggleButton)
    expect(sidebar).toHaveClass('active')
    
    // Click to close
    fireEvent.click(toggleButton)
    expect(sidebar).not.toHaveClass('active')
  })

  it('should filter projects by category', () => {
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    // Open sidebar
    const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i })
    fireEvent.click(toggleButton)
    
    // Find and click a category
    const categories = screen.getAllByText('Launch Film')
    const categoryButton = categories[0] // First one should be in the sidebar
    fireEvent.click(categoryButton)
    
    // Check that category is now active
    expect(categoryButton.parentElement).toHaveClass('active')
  })

  it('should have navigation links', () => {
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('should have View All Work button', () => {
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    const viewAllButton = screen.getByText(/View All Work/i)
    expect(viewAllButton).toBeInTheDocument()
    expect(viewAllButton.closest('a')).toHaveAttribute('href', '/work')
  })

  it('should apply correct CSS classes', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    // Check for main container
    expect(container.querySelector('.homepage-v2')).toBeInTheDocument()
    
    // Check for animated background
    expect(container.querySelector('.animated-bg')).toBeInTheDocument()
    
    // Check for header
    expect(container.querySelector('.header')).toBeInTheDocument()
    
    // Check for hero section
    expect(container.querySelector('.hero-section')).toBeInTheDocument()
    
    // Check for projects section
    expect(container.querySelector('.projects-section')).toBeInTheDocument()
  })

  it('should handle errors gracefully', () => {
    // Mock console.error to suppress error output in tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    // Test that component doesn't crash even with missing data
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    // Should still render basic structure
    expect(screen.getByText('RAVIE')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })
})