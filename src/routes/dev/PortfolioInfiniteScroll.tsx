import { useEffect, useState } from 'react'
import { PROJECTS_DATA } from '../../data/projectsData'
import { ProjectHeader } from '../../components/portfolio/ProjectHeader'
import { GridGallery } from '../../components/portfolio/GridGallery'
import ThreeDFoldGalleryLight from '../../components/portfolio/ThreeDFoldGalleryLight'
import { SpotlightProvider } from '../../components/portfolio/SpotlightContext'
import '../../components/portfolio/styles/portfolio-layout.css'
import '../../components/portfolio/styles/gallery-3d.css'
import '../../components/portfolio/styles/tiles.css'


export default function PortfolioInfiniteScroll() {
  const [currentProject, setCurrentProject] = useState(PROJECTS_DATA[0])
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'fold' | 'grid'>('fold')

  // Body class toggle for footer hide/show
  useEffect(() => {
    document.body.classList.add('portfolio-infinite-active');
    return () => document.body.classList.remove('portfolio-infinite-active');
  }, []);

  // Reduced-motion fallback
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setViewMode('grid');
    }
  }, []);

  const switchProject = (index: number) => {
    setActiveProjectIndex(index)
    setCurrentProject(PROJECTS_DATA[index])
  }

  return (
    <SpotlightProvider>
      <div className="portfolio-wrapper">
        <div className="portfolio-container">
          
          {/* Left Sidebar */}
          <aside className="project-sidebar">
            <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>Projects</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {PROJECTS_DATA.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => switchProject(index)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: activeProjectIndex === index ? '#00D4FF' : 'transparent',
                    color: activeProjectIndex === index ? '#000' : '#fff',
                    border: '1px solid ' + (activeProjectIndex === index ? '#00D4FF' : '#333'),
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s'
                  }}
                >
                  {project.title}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="main-content">
            {/* Project Header with Title and Toggle */}
            <ProjectHeader
              title={currentProject.title}
              viewMode={viewMode}
              onViewChange={setViewMode}
            />

            {/* Conditional Rendering based on view mode */}
            <div style={{ marginTop: '2rem' }}>
              {viewMode === 'fold' ? (
                <ThreeDFoldGalleryLight key={currentProject.id} project={currentProject} />
              ) : (
                <GridGallery project={currentProject} />
              )}
            </div>

            {/* Bottom Info Section */}
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              background: '#111',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Project Information</h3>
              <p style={{ color: '#999', lineHeight: 1.6 }}>
                {currentProject.description}
              </p>
              {currentProject.tiles && (
                <div style={{ marginTop: '1rem', color: '#666' }}>
                  {currentProject.tiles.length} tiles in this project
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SpotlightProvider>
  )
}