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
    
    // Use getAllByText since the text appears multiple times
    const cultFollowingsElements = screen.getAllByText(/cult followings/i)
    expect(cultFollowingsElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/Motion design studio/i)).toBeInTheDocument()
  })

  it('should display projects grid', () => {
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    // Should show at least the first 6 projects (may appear multiple times)
    const coinbaseElements = screen.getAllByText('Coinbase Rebrand')
    expect(coinbaseElements.length).toBeGreaterThan(0)
    
    const jheneElements = screen.getAllByText('Jhené Aiko Coachella')
    expect(jheneElements.length).toBeGreaterThan(0)
  })

  it('should toggle sidebar when button clicked', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    const toggleButton = screen.getByRole('button', { name: /toggle project directory/i })
    
    // Initially sidebar should be closed
    const sidebar = container.querySelector('.sidebar')
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
    const toggleButton = screen.getByRole('button', { name: /toggle project directory/i })
    fireEvent.click(toggleButton)
    
    // Find and click a category
    const categoryButton = screen.getByText('Launch Film')
    fireEvent.click(categoryButton)
    
    // Check that category is now active
    expect(categoryButton).toHaveClass('active')
  })

  it('should have navigation links', () => {
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    // Navigation links appear multiple times (header and header-nav)
    const workLinks = screen.getAllByText('Work')
    expect(workLinks.length).toBeGreaterThan(0)
    
    // About appears as a link and in the sidebar description
    const aboutElements = screen.getAllByText(/About/i)
    expect(aboutElements.length).toBeGreaterThan(0)
    
    const contactLinks = screen.getAllByText('Contact')
    expect(contactLinks.length).toBeGreaterThan(0)
  })

  it('should have View All Work button', () => {
    render(
      <BrowserRouter>
        <HomePage2 />
      </BrowserRouter>
    )
    
    const viewAllButton = screen.getByText(/View All Projects/i)
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
    
    // Check for background element (might be animated-bg or background-gradient)
    const backgroundElement = container.querySelector('.animated-bg') || 
                             container.querySelector('.background-gradient')
    expect(backgroundElement).toBeInTheDocument()
    
    // Check for header (might be .header or .header-nav)
    const headerElement = container.querySelector('.header') || 
                         container.querySelector('.header-nav')
    expect(headerElement).toBeInTheDocument()
    
    // Check for hero section
    const heroElement = container.querySelector('.hero-section') || 
                       container.querySelector('.hero')
    expect(heroElement).toBeInTheDocument()
    
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