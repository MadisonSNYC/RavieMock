import './App.css'
import { lazy, Suspense, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HeaderAdvanced from './components/HeaderAdvanced'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import SmartCTA from './components/SmartCTA'
import ScrollToTop from './components/ScrollToTop'
import PersistentCTA from './components/PersistentCTA'
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
        <HeaderAdvanced />
        <Suspense fallback={<div className="w-12 h-12" />}>
          <ProjectDirectory />
        </Suspense>
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:slug" element={<PortfolioPage />} />
              <Route path="/work/:id" element={<ProjectPage />} />
              <Route path="/project/:slug" element={<ProjectDetailPage />} />
              <Route path="/about" element={<AboutPageNew />} />
              <Route path="/about-old" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/dev/foldtest" element={<FoldTest />} />
              <Route path="/dev/foldstrict" element={<FoldStrict />} />
              <Route path="/dev/codrops" element={<CoderopsPure />} />
              <Route path="/dev/working" element={<CodropsWorking />} />
              <Route path="/dev/3dfold" element={<Working3DFold />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        {location.pathname !== '/contact' && <SmartCTA />}
        {location.pathname !== '/contact' && <PersistentCTA />}
      </div>
    </ErrorBoundary>
  )
}

export default App
