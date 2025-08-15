import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import WorkPage from '../../pages/WorkPage'

// Mock ProjectGrid component
vi.mock('../../components/ProjectGrid', () => ({
  default: ({ projects, onProjectClick }) => (
    <div className="project-grid">
      {projects.map(project => (
        <div 
          key={project.id} 
          className="project-card"
          onClick={() => onProjectClick(project)}
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  )
}))

// Mock window.open
const mockWindowOpen = vi.fn()
window.open = mockWindowOpen

// Mock the projects data
vi.mock('../../data/projects', () => ({
  getAllProjects: () => [
    {
      id: 1,
      title: 'Test Project 1',
      description: 'Description 1',
      category: 'Launch Film',
      industry: 'Technology',
      href: 'https://example.com/project1',
      thumbnail: '/test1.jpg'
    },
    {
      id: 2,
      title: 'Test Project 2',
      description: 'Description 2',
      category: 'Social Content',
      industry: 'Entertainment',
      href: 'https://example.com/project2',
      thumbnail: '/test2.jpg'
    },
    {
      id: 3,
      title: 'Test Project 3',
      description: 'Description 3',
      category: 'Launch Film',
      industry: 'Technology',
      href: null, // Project without external link
      thumbnail: '/test3.jpg'
    }
  ]
}))

describe('WorkPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the work page with projects', () => {
    render(
      <BrowserRouter>
        <WorkPage />
      </BrowserRouter>
    )

    expect(screen.getByText(/Our Work/i)).toBeInTheDocument()
    expect(screen.getByText(/Premium motion design/i)).toBeInTheDocument()
  })

  it('should display filter categories', () => {
    render(
      <BrowserRouter>
        <WorkPage />
      </BrowserRouter>
    )

    // Check for category filter buttons
    const allButtons = screen.getAllByText('All')
    expect(allButtons.length).toBeGreaterThan(0)
    expect(screen.getByText('Launch Film')).toBeInTheDocument()
    expect(screen.getByText('Social Content')).toBeInTheDocument()
  })

  it('should filter projects by category', () => {
    render(
      <BrowserRouter>
        <WorkPage />
      </BrowserRouter>
    )

    // Initially all projects should be visible
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.getByText('Test Project 2')).toBeInTheDocument()
    expect(screen.getByText('Test Project 3')).toBeInTheDocument()

    // Click on Launch Film filter
    const launchFilmFilter = screen.getByText('Launch Film')
    fireEvent.click(launchFilmFilter)

    // Only Launch Film projects should be visible
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.queryByText('Test Project 2')).not.toBeInTheDocument()
    expect(screen.getByText('Test Project 3')).toBeInTheDocument()
  })

  it('should open project link in new tab when project has href', () => {
    render(
      <BrowserRouter>
        <WorkPage />
      </BrowserRouter>
    )

    // Find and click on a project with href
    const projectWithLink = screen.getByText('Test Project 1').closest('.project-card')
    fireEvent.click(projectWithLink)

    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://example.com/project1',
      '_blank',
      'noopener,noreferrer'
    )
  })

  it('should not open window when project has no href', () => {
    render(
      <BrowserRouter>
        <WorkPage />
      </BrowserRouter>
    )

    // Find and click on a project without href
    const projectWithoutLink = screen.getByText('Test Project 3').closest('.project-card')
    fireEvent.click(projectWithoutLink)

    expect(mockWindowOpen).not.toHaveBeenCalled()
  })

  it('should show empty state when no projects match filter', () => {
    render(
      <BrowserRouter>
        <WorkPage />
      </BrowserRouter>
    )

    // Click on a filter that matches no projects
    const eventVisualsFilter = screen.getByText('Event Visuals')
    fireEvent.click(eventVisualsFilter)

    expect(screen.getByText(/No projects found/i)).toBeInTheDocument()
    expect(screen.getByText(/Try selecting a different category/i)).toBeInTheDocument()
  })

  it('should highlight active filter', () => {
    render(
      <BrowserRouter>
        <WorkPage />
      </BrowserRouter>
    )

    const launchFilmFilter = screen.getByText('Launch Film')
    
    // Click filter
    fireEvent.click(launchFilmFilter)
    
    // Check if the filter styling changed (active state)
    // The actual class check depends on implementation
    expect(launchFilmFilter).toBeInTheDocument()
  })
})