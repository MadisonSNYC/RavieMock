import { useState } from 'react'
import { IntroSequence } from '../components/intro'
import HeroSectionV2 from '../components/HeroSectionV2'
import SelectedWorkGrid from '../components/SelectedWorkGrid'
import AboutSectionExact from '../components/AboutSectionExact'
import ErrorBoundary from '../components/ErrorBoundary'
import EndOfContentCTA from '../components/EndOfContentCTA'

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {/* Intro Sequence - 4 seconds */}
      <IntroSequence onComplete={() => setIntroComplete(true)} />

      <ErrorBoundary fallbackMessage="Failed to load the hero section. Please refresh the page.">
        <HeroSectionV2 />
      </ErrorBoundary>
      
      <ErrorBoundary fallbackMessage="Failed to load projects. Please check your connection and refresh.">
        <SelectedWorkGrid />
      </ErrorBoundary>
      
      <ErrorBoundary fallbackMessage="Failed to load the about section. Please refresh the page.">
        <AboutSectionExact />
      </ErrorBoundary>

      {/* Elegant End-of-Content CTA - V2 Spacing */}
      <div className="w-full px-10 md:px-20 lg:px-44 py-24">
        <EndOfContentCTA 
          variant="default"
          title="Impressed by our work?"
          subtitle="Let's collaborate to create something extraordinary for your brand."
        />
      </div>
    </>
  )
}