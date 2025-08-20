import './App.css'
import { lazy, Suspense, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HeaderMinimal from './components/HeaderMinimal'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import { IntroSequence } from './components/intro'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const WorkPage = lazy(() => import('./pages/WorkPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AboutPageNew = lazy(() => import('./pages/AboutPageNew'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const ProjectDirectory = lazy(() => import('./components/ProjectDirectory'))
const PortfolioPage = lazy(() => import('./routes/portfolio/index'))
const ProjectDetailPage = lazy(() => import('./routes/project/ProjectDetailPage'))
const FoldTest = lazy(() => import('./routes/dev/FoldTest'))
const FoldStrict = lazy(() => import('./routes/dev/FoldStrict'))
const CoderopsPure = lazy(() => import('./routes/dev/CoderopsPure'))
const CodropsWorking = lazy(() => import('./routes/dev/CodropsWorking'))
const Working3DFold = lazy(() => import('./routes/dev/Working3DFold'))
const Complete3DFoldAnalysis = lazy(() => import('./routes/dev/Complete3DFoldAnalysis'))
const Working3DFoldWithAnalysis = lazy(() => import('./routes/dev/Working3DFoldWithAnalysis'))
const Reversed3DFoldTemplate = lazy(() => import('./routes/dev/Reversed3DFoldTemplate'))
const Reversed3DFoldTemplateFixed = lazy(() => import('./routes/dev/Reversed3DFoldTemplateFixed'))
const Reversed3DFoldStatic = lazy(() => import('./routes/dev/Reversed3DFoldStatic'))
const Reversed3DFoldEnhanced = lazy(() => import('./routes/dev/Reversed3DFoldEnhanced'))
const Reversed3DFoldClean = lazy(() => import('./routes/dev/Reversed3DFoldClean'))
const ProjectGalleryComplete = lazy(() => import('./routes/dev/ProjectGalleryComplete'))
const Cohesive3DPortfolio = lazy(() => import('./routes/dev/Cohesive3DPortfolio'))
const Portfolio3DLight = lazy(() => import('./routes/dev/Portfolio3DLight'))
const PortfolioInfiniteScroll = lazy(() => import('./routes/dev/PortfolioInfiniteScroll'))
const Backup3DLight = lazy(() => import('./routes/dev/backup-3d-light'))

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-white/60">Loading...</p>
    </div>
  </div>
)

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const location = useLocation()

  return (
    <ErrorBoundary fallbackMessage="The application encountered an error. Please refresh the page to continue.">
      {/* Intro Sequence Overlay - Commented out for debugging */}
      {/* <IntroSequence onComplete={() => setIntroComplete(true)} /> */}
      
      {/* Main App Content */}
      <div className="min-h-screen bg-black" id="main-content" tabIndex={-1}>
        <ScrollToTop />
        <HeaderMinimal />
        {/* Project Directory Sidebar - Temporarily Hidden */}
        {/* <Suspense fallback={<div className="w-12 h-12" />}>
          <ProjectDirectory />
        </Suspense> */}
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<PortfolioPage />} />
              <Route path="/:slug" element={<PortfolioPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:id" element={<ProjectPage />} />
              <Route path="/project/:slug" element={<ProjectDetailPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:slug" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPageNew />} />
              <Route path="/about-old" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/dev/foldtest" element={<FoldTest />} />
              <Route path="/dev/foldstrict" element={<FoldStrict />} />
              <Route path="/dev/codrops" element={<CoderopsPure />} />
              <Route path="/dev/working" element={<CodropsWorking />} />
              <Route path="/dev/3dfold" element={<Working3DFold />} />
              <Route path="/dev/analysis" element={<Complete3DFoldAnalysis />} />
              <Route path="/dev/combined" element={<Working3DFoldWithAnalysis />} />
              <Route path="/dev/reversed" element={<Reversed3DFoldTemplate />} />
              <Route path="/dev/reversed-fixed" element={<Reversed3DFoldTemplateFixed />} />
              <Route path="/dev/reversed-static" element={<Reversed3DFoldStatic />} />
              <Route path="/dev/reversed-enhanced" element={<Reversed3DFoldEnhanced />} />
              <Route path="/dev/reversed-clean" element={<Reversed3DFoldClean />} />
              <Route path="/dev/gallery-complete" element={<ProjectGalleryComplete />} />
              <Route path="/dev/cohesive" element={<Cohesive3DPortfolio />} />
              <Route path="/dev/portfolio-light" element={<Portfolio3DLight />} />
              <Route path="/dev/portfolio-infinite" element={<PortfolioInfiniteScroll />} />
              <Route path="/dev/backup-3d-light" element={<Backup3DLight />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
