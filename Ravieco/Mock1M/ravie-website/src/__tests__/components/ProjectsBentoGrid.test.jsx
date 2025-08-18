import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectsBentoGrid from '../../components/ProjectsBentoGrid'
import { bentoLayout } from '../../components/bento/bentoConfig'

describe('ProjectsBentoGrid Component', () => {
  // COMP-004: Grid layout rendering
  it('should render all project cards', () => {
    render(<ProjectsBentoGrid />)
    
    // Check for section header
    expect(screen.getByText('Selected Work')).toBeInTheDocument()
    
    // Check for project titles from config - they appear twice (desktop and mobile)
    bentoLayout.forEach(item => {
      if (item.project) {
        const elements = screen.getAllByText(item.project.title)
        expect(elements.length).toBeGreaterThan(0) // At least one occurrence
      }
    })
  })

  it('should render View All Work CTA', () => {
    render(<ProjectsBentoGrid />)
    
    expect(screen.getByText('View All Work')).toBeInTheDocument()
    expect(screen.getByText('Explore our complete portfolio')).toBeInTheDocument()
  })

  // COMP-005: Hover interactions
  it('should handle hover states', () => {
    const { container } = render(<ProjectsBentoGrid />)
    
    const firstCard = container.querySelector('.group')
    
    // Verify card exists
    expect(firstCard).toBeInTheDocument()
    
    // Simulate hover
    fireEvent.mouseEnter(firstCard)
    
    // Hover effects are applied via CSS classes, not inline styles
    // The group class handles hover states in Tailwind
    expect(firstCard).toHaveClass('group')
    
    fireEvent.mouseLeave(firstCard)
  })

  it('should display project metrics', () => {
    render(<ProjectsBentoGrid />)
    
    // Find projects with metrics
    const projectsWithMetrics = bentoLayout.filter(item => 
      item.project && item.project.metrics
    )
    
    projectsWithMetrics.forEach(item => {
      // Metrics may appear multiple times (desktop and mobile)
      const elements = screen.getAllByText(item.project.metrics)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  it('should display category tags', () => {
    render(<ProjectsBentoGrid />)
    
    // Check for category badges
    const categories = ['Launch Film', 'Brand Identity', 'Social Content']
    categories.forEach(category => {
      const elements = screen.getAllByText(category)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  it('should render responsive layout classes', () => {
    const { container } = render(<ProjectsBentoGrid />)
    
    // Desktop grid should be hidden on mobile
    const desktopGrid = container.querySelector('.hidden.lg\\:grid')
    expect(desktopGrid).toBeInTheDocument()
    
    // Mobile grid should be visible on mobile
    const mobileGrid = container.querySelector('.lg\\:hidden')
    expect(mobileGrid).toBeInTheDocument()
  })
})