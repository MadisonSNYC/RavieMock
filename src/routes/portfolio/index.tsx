import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ReducedMotionProvider, useReducedMotionContext } from '../../providers/ReducedMotionProvider'
import { GridViewport } from '../../components/portfolio/GridViewport'
import TransitionLayer from '../../components/portfolio/TransitionLayer'
import { useModalRoute } from '../../hooks/useModalRoute'
import projectsData from '../../data/projects.json'
import '../../styles/portfolio.css' // ensure same-origin ESM import exists
// Temporary test import - remove after verification
import '../../utils/test-transitions.js'

const CRITICAL_CSS = `
:root { --tile-scale: 0.48; --nav-height: 64px; }
.portfolio-scroll { height: calc(100vh - var(--nav-height, 0px)); overflow: hidden; touch-action: none; -webkit-overflow-scrolling: touch; }
.portfolio-viewport { position: sticky; top: var(--nav-height, 0px); height: calc(100vh - var(--nav-height, 0px)); overflow: hidden; }
.portfolio-grid { width: 100vw; height: 100%; }
.portfolio-tile { height: calc((100vh - var(--nav-height, 0px)) * var(--tile-scale, 0.48)); }
.portfolio-card, .portfolio-card .spotlight-content, .portfolio-card video, .portfolio-card img, .portfolio-card canvas { border-radius: 0 !important; }
article[data-muted="true"] .spotlight-content { filter: grayscale(1) brightness(0.85) contrast(1.08); transition: filter 100ms ease; will-change: filter; }
@media (prefers-reduced-motion: reduce) { article[data-muted="true"] .spotlight-content { transition: none; } }
`;

function quarantineForeignStyles() {
  const currentOrigin = location.origin;
  const suspects = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  for (const link of suspects) {
    try {
      const href = link.getAttribute('href') || (link as HTMLLinkElement).href;
      if (!href) continue;
      const url = new URL(href, location.href);
      const sameOrigin = url.origin === currentOrigin;
      if (!sameOrigin) {
        // Disable/remove foreign stylesheet to satisfy CSP
        link.setAttribute('data-disabled-by-portfolio', 'true');
        (link as HTMLLinkElement).disabled = true;
        link.parentNode?.removeChild(link);
        // eslint-disable-next-line no-console
        console.warn('[portfolio] removed foreign stylesheet due to CSP:', url.href);
      }
    } catch {}
  }
}

function ensureCriticalStyles() {
  const id = 'portfolio-critical-inline';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = CRITICAL_CSS;
  document.head.appendChild(style);
}

/**
 * Portfolio page component with modal route support
 */
function PortfolioContent() {
  const location = useLocation()
  const { slug, close } = useModalRoute()
  const { prefersReducedMotion } = useReducedMotionContext()
  
  // Check if we have a background location (modal is open)
  const state = location.state as { background?: Location } | undefined
  const backgroundLocation = state?.background
  
  return (
    <>
      {/* Grid view - use background location if modal is open */}
      <GridViewport projects={projectsData} />
      
      {/* Modal overlay */}
      <TransitionLayer
        projects={projectsData}
        slug={slug}
        onClose={close}
        prefersReducedMotion={prefersReducedMotion}
      />
    </>
  )
}

/**
 * Portfolio page showcasing all projects with counter-scrolling grid
 */
export function PortfolioPage() {
  useEffect(() => {
    // First, quarantine any non-same-origin stylesheets (different port breaks CSP)
    quarantineForeignStyles();
    // Always inline the critical rules so layout can't collapse if a stylesheet is blocked
    ensureCriticalStyles();
    // Add cinematic tiles class for scaling
    document.body.classList.add('cinematic-tiles');
    // Add to both <html> and <body> so any accidental overflow won't show a bar
    document.documentElement.classList.add('no-scrollbars');
    document.body.classList.add('no-scrollbars');
    
    return () => {
      document.body.classList.remove('cinematic-tiles');
      document.documentElement.classList.remove('no-scrollbars');
      document.body.classList.remove('no-scrollbars');
      const el = document.getElementById('portfolio-critical-inline');
      if (el) el.remove();
    };
  }, []);
  
  return (
    <ReducedMotionProvider>
      <PortfolioContent />
    </ReducedMotionProvider>
  )
}

export default PortfolioPage