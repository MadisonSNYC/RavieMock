import { useEffect, useState } from 'react'
import { PROJECTS_DATA } from '../../data/projectsData'
import { ProjectSidebar } from '../../components/portfolio/ProjectSidebar'
import { ProjectHeader } from '../../components/portfolio/ProjectHeader'
import { ProjectInfo } from '../../components/portfolio/ProjectInfo'
import { GridGallery } from '../../components/portfolio/GridGallery'
import ThreeDFoldGalleryLight from '../../components/portfolio/ThreeDFoldGalleryLight'
import './../../components/portfolio/styles/portfolio-layout.css'
import './../../components/portfolio/styles/gallery-3d.css'
import './../../components/portfolio/styles/tiles.css'

export default function PortfolioInfiniteScrollFixed() {
  const [currentProject, setCurrentProject] = useState(PROJECTS_DATA[0])
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'fold' | 'grid'>('fold')

  useEffect(() => {
    // Hide footer
    document.body.classList.add('portfolio-infinite-active');
    const footer = document.querySelector('footer');
    if (footer) {
      (footer as HTMLElement).style.display = 'none';
    }
    
    return () => {
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

  // If no data, show error
  if (!PROJECTS_DATA || PROJECTS_DATA.length === 0) {
    return (
      <div style={{ padding: '2rem', color: 'white', background: '#000', minHeight: '100vh' }}>
        <h1>No Projects Available</h1>
        <p>PROJECTS_DATA is empty or not loading</p>
      </div>
    )
  }

  // If no current project, show error
  if (!currentProject) {
    return (
      <div style={{ padding: '2rem', color: 'white', background: '#000', minHeight: '100vh' }}>
        <h1>No Current Project</h1>
        <p>Current project is not defined</p>
      </div>
    )
  }

  return (
    <div className="portfolio-wrapper" style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div className="portfolio-container">
        
        {/* Sidebar */}
        <ProjectSidebar 
          projects={PROJECTS_DATA}
          activeIndex={activeProjectIndex}
          onProjectSelect={switchProject}
        />

        {/* Main Content */}
        <main className="main-content" style={{ flex: 1, padding: '2rem' }}>
          
          {/* Header */}
          <ProjectHeader
            title={currentProject.title || 'Untitled'}
            viewMode={viewMode}
            onViewChange={setViewMode}
          />

          {/* Gallery Display */}
          <div style={{ marginTop: '2rem', minHeight: '400px' }}>
            {viewMode === 'fold' ? (
              <div>
                <h3>3D Fold View</h3>
                <ThreeDFoldGalleryLight project={currentProject} />
              </div>
            ) : (
              <div>
                <h3>Grid View</h3>
                <GridGallery project={currentProject} />
              </div>
            )}
          </div>

          {/* Project Info */}
          <div style={{ marginTop: '2rem' }}>
            <ProjectInfo project={currentProject} />
          </div>

        </main>
      </div>
    </div>
  )
}