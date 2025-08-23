import { useState } from 'react'
import { Play, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './HomePage2-fixed.css'

const HomePage2 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Launch Film', 'Social Content', 'Event Visuals', 'Brand Identity', 'Concert Visuals']
  
  const projects = [
    { id: 1, title: 'Coinbase Rebrand', description: 'Complete visual identity overhaul' },
    { id: 2, title: 'Jhené Aiko Coachella', description: 'Concert visuals and stage design' },
    { id: 3, title: 'Nike Air Max', description: 'Product launch campaign' },
    { id: 4, title: 'Spotify Wrapped', description: 'Social media campaign' },
    { id: 5, title: 'Apple Event', description: 'Keynote motion graphics' },
    { id: 6, title: 'Tesla Model S', description: 'Launch film production' },
    { id: 7, title: 'Meta Connect', description: 'Event visual identity' },
    { id: 8, title: 'Google I/O', description: 'Conference branding' },
    { id: 9, title: 'Adobe MAX', description: 'Creative conference visuals' },
    { id: 10, title: 'Coachella 2024', description: 'Festival motion graphics' },
    { id: 11, title: 'Grammy Awards', description: 'Broadcast graphics package' },
    { id: 12, title: 'Netflix Originals', description: 'Title sequence design' }
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="homepage-v2">
      {/* Background Gradient Animation Layer */}
      <div className="background-gradient" />

      {/* Header Navigation */}
      <header className="header-nav">
        <div className="header-container">
          <div className="logo">
            <span className="logo-text">ravie.co</span>
          </div>
          <nav className="nav-menu">
            <Link to="/work" className="nav-link">Projects</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Project Directory Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-content">
          {/* Directory Header */}
          <div className="directory-header">
            <h2 className="directory-title">Project Directory</h2>
            <span className="date-stamp">{new Date().toLocaleDateString()}</span>
          </div>

          {/* About Section */}
          <div className="about-section">
            <h3 className="section-heading">About us</h3>
            <p className="about-text">
              We create cult followings for brands. A creative agency focused on motion design, 
              brand identity, and digital experiences.
            </p>
          </div>

          {/* Categories Filter */}
          <div className="categories-section">
            <h3 className="section-heading">Categories</h3>
            <div className="categories-tags">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-tag ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects List */}
          <div className="projects-list-section">
            <h3 className="section-heading">Projects ({projects.length})</h3>
            <div className="projects-list">
              {projects.map(project => (
                <div key={project.id} className="project-list-item">
                  <div className="project-thumbnail" />
                  <div className="project-info">
                    <h4 className="project-title">{project.title}</h4>
                    <p className="project-description">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Directory Toggle Button */}
      <button 
        className={`toggle-button ${sidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle project directory"
      >
        <ChevronRight className="toggle-icon" />
      </button>

      {/* Header */}
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo-link">
            <h1 className="logo">RAVIE</h1>
          </Link>
          <nav className="nav">
            <Link to="/work" className="nav-link">Work</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-grid">
              {/* Left Column - Content */}
              <div className="hero-content">
                <h1 className="hero-headline">
                  We create <span className="gradient-text">cult followings</span> for brands
                </h1>
                <p className="hero-subheading">
                  Motion design studio specializing in launch films, brand identity, and digital experiences
                </p>
              </div>

              {/* Right Column - Video Placeholder */}
              <div className="hero-video">
                <div className="video-placeholder">
                  <button className="play-button">
                    <Play className="play-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="projects-section">
          <div className="projects-container">
            <div className="projects-grid">
              {/* Display first 6 projects */}
              {projects.slice(0, 6).map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-card-content">
                    <div className="project-gradient" />
                    <div className="project-info">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* 1 Empty Card */}
              <div className="project-card empty">
                <div className="project-card-content" />
              </div>
            </div>

            {/* View All Projects Button */}
            <div className="view-all-container">
              <Link to="/work" className="view-all-button">
                View All Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage2