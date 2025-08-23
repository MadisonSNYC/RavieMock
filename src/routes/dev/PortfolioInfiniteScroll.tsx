import { useEffect, useRef, useState } from 'react'
import { PROJECTS_DATA, ProjectData } from '../../data/projectsData'
import { ProjectHeader } from '../../components/portfolio/ProjectHeader'
import { ProjectGrid } from '../../components/portfolio/ProjectGrid'
import ThreeDFoldGalleryLight from '../../components/portfolio/ThreeDFoldGalleryLight'
import { SpotlightProvider } from '../../components/portfolio/SpotlightContext'
import './../../components/portfolio/styles/portfolio-layout.css'
import './../../components/portfolio/styles/gallery-3d.css'
import './../../components/portfolio/styles/tiles.css'


export default function PortfolioInfiniteScroll() {
  const [currentProject, setCurrentProject] = useState(PROJECTS_DATA[0])
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'fold' | 'grid'>('fold')

  // Add this useEffect to your PortfolioInfiniteScroll component
  useEffect(() => {
    // Hide the main app footer when this page loads
    document.body.classList.add('portfolio-infinite-active');
    
    // Get the main app footer and hide it
    const footer = document.querySelector('footer');
    if (footer) {
      (footer as HTMLElement).style.display = 'none';
    }
    
    return () => {
      // Show footer again when leaving this page
      document.body.classList.remove('portfolio-infinite-active');
      if (footer) {
        (footer as HTMLElement).style.display = '';
      }
    };
  }, []);

  const switchProject = (index: number) => {
    setActiveProjectIndex(index)
    setCurrentProject(PROJECTS_DATA[index])
  }

  return (
    <SpotlightProvider>
      <div className="portfolio-wrapper" style={{ 
        minHeight: '100vh', 
        background: '#000',
        paddingTop: '80px' 
      }}>

        {/* Main grouped container */}
        <div className="portfolio-container" style={{
          display: 'flex',
          gap: '2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          
          {/* Left Sidebar */}
          <aside style={{
            width: '250px',
            background: '#111',
            padding: '2rem',
            borderRadius: '8px',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
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
          <main style={{ flex: 1 }}>
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
                /* Grid View */
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1rem'
                }}>
                  {currentProject.tiles?.map((tile: any, index: number) => (
                    <div key={index} style={{
                      aspectRatio: '1',
                      background: '#222',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666'
                    }}>
                      Tile {index + 1}
                    </div>
                  ))}
                </div>
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