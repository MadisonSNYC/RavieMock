# FirstFrame-Style Portfolio Implementation Plan

## 0) Executive Summary

We're implementing a video-heavy portfolio experience inspired by FirstFrame's corporate aesthetic, featuring hover-to-play video previews, pointer-driven micro-interactions, smooth scroll reveals, and sophisticated page transitions. The system prioritizes performance (Lighthouse ≥95, FCP <1.5s, LCP <2.5s) while maintaining accessibility standards including full keyboard navigation parity and prefers-reduced-motion support. Built on React 19 + Vite + Tailwind + Framer Motion, the architecture emphasizes lazy-loading strategies, GPU-accelerated transforms, and intelligent media management to deliver a premium experience across all breakpoints (375-1920px).

**Out of scope:** CMS migration/integration, full case-study authoring UI, e-commerce features, multi-language support, advanced analytics dashboard, user authentication, comment system.

## 1) Success Criteria & Budgets

### Performance
- **FCP:** < 1.5s (desktop), < 2.5s (mobile 4G)
- **LCP:** < 2.5s (desktop), < 3.5s (mobile 4G)
- **CLS:** < 0.1 (all devices)
- **INP:** < 200ms (desktop), < 300ms (mobile)
- **Bundle size:** Portfolio route JS < 150KB gzipped
- **Lazy-load strategy:** Poster images on viewport entry -100px, videos on hover/focus only
- **Max concurrent videos:** 1 playing at any time

### Accessibility
- Full keyboard navigation parity with hover effects
- Visible focus states (2px outline minimum)
- ARIA labels for all interactive elements
- prefers-reduced-motion: no autoplay, static posters, simplified transitions
- Screen reader announcement for state changes
- Color contrast ≥ 4.5:1 for all text overlays

### Responsiveness
- **375px:** Single column, 100vw cards, 60px spacing
- **414px:** Single column, refined padding
- **768px:** 2-column grid, hover effects enabled
- **1024px:** 3-column grid, custom cursor active
- **1440px:** 4-column grid, full micro-interactions
- **1920px:** 4-5 column grid, max-width container
- **Touch targets:** Minimum 44x44px on all touch devices

### QA Gates
- Each phase must pass Lighthouse audit
- Manual keyboard navigation test required
- Screen reader compatibility check
- Cross-browser visual regression tests

## 2) Architecture Overview (React/Vite/Tailwind/Framer Motion)

```
┌─────────────────────────────────────────────────────────────┐
│                      App Shell (Vite)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Portfolio Route (Code-Split)             │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │ ProjectGrid │──│ ProjectCard  │──│VideoPreview│ │   │
│  │  └──────┬──────┘  └──────┬───────┘  └─────┬──────┘ │   │
│  │         │                 │                 │        │   │
│  │  ┌──────▼───────────────────────────────────▼─────┐ │   │
│  │  │        IntersectionObserver + rAF Loop         │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  │                                                       │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │CustomCursor │  │ AnimatePresence│ │ Three.js  │ │   │
│  │  │  (Desktop)  │  │  (Transitions) │ │ (Optional) │ │   │
│  │  └─────────────┘  └──────────────┘  └────────────┘ │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Reduced Motion Provider (Context)           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Data Flow:** Project metadata (JSON) → Grid component → Cards with IO hooks → Video preview on hover/focus → Cursor overlay tracking pointer → Page transitions via Framer Motion layoutId

**Key Integration Points:**
- IntersectionObserver: Poster lazy-loading, video src injection, scroll-based pause
- requestAnimationFrame: Custom cursor smoothing, text scramble effect
- Framer Motion: whileInView reveals, AnimatePresence transitions, layoutId shared elements
- Three.js (optional): Canvas overlay for shader transitions, WebGL sphere backgrounds

## 3) Component & File Map (planned)

```typescript
// Core Portfolio Components
src/components/portfolio/ProjectGrid.tsx
  // Responsive grid container, handles layout breakpoints, manages active video state
  // Props: projects: Project[], columns?: ResponsiveColumns, gap?: number

src/components/portfolio/ProjectCard.tsx
  // Individual project card with poster, metadata overlay, hover/focus handlers
  // Props: project: Project, isActive: boolean, onActivate: () => void, priority?: boolean
  // TypeScript: interface ProjectCardProps { project: Project; isActive: boolean; onActivate: () => void; priority?: boolean; }

src/components/portfolio/VideoPreview.tsx  
  // Lazy-loaded video component with IO-driven source injection and playback control
  // Props: posterSrc: string, videoSrc: string, isPlaying: boolean, onLoadStart?: () => void
  // TypeScript: interface VideoPreviewProps { posterSrc: string; videoSrc: string; isPlaying: boolean; onLoadStart?: () => void; onError?: () => void; }

src/components/portfolio/CustomCursor.tsx
  // GPU-accelerated custom cursor with magnetic attraction and state variants
  // Props: isHovering: boolean, cursorText?: string, magnetStrength?: number

src/components/portfolio/NextProjectLink.tsx
  // Smart prefetch component for adjacent project navigation
  // Props: projectSlug: string, direction: 'prev' | 'next', prefetch?: boolean

// Custom Hooks
src/hooks/useIntersectionVideo.ts
  // Manages video source injection and cleanup based on viewport visibility
  // Returns: { ref, isVisible, visibilityRatio }

src/hooks/useInfiniteLoopScroll.ts
  // Optional P2: Handles infinite scroll loop with midpoint jump
  // Returns: { containerRef, handleScroll, duplicatedItems }

src/hooks/useReducedMotion.ts
  // Detects and provides prefers-reduced-motion state
  // Returns: { prefersReducedMotion, forcedMotion }

// Providers & Context
src/providers/ReducedMotionProvider.tsx
  // Global provider for motion preferences with override capability
  // Provides: { prefersReducedMotion, setForcedMotion, motionSettings }

// Styles
src/styles/portfolio.css
  // Custom utilities for aspect-ratios, GPU transforms, focus states beyond Tailwind

// Routes (adjust to your routing convention)
src/routes/portfolio/index.tsx
  // Main portfolio grid page with filtering and search
  
src/routes/portfolio/[slug].tsx
  // Individual project detail page with case study content

// Performance Utilities
src/lib/perf/web-vitals.ts
  // Web Vitals measurement and reporting utilities
```

## 4) Data Model & Content Contract

### Project Interface
```typescript
interface Project {
  id: string;                    // Unique identifier
  title: string;                  // Display title (max 60 chars)
  client: string;                 // Client name
  categories: string[];           // Tags for filtering
  posterSrc: string;              // Static image path (WebP/AVIF)
  previewSrc: string;             // Video path (MP4/WebM)
  duration?: number;              // Preview video duration in seconds
  slug: string;                   // URL-safe project identifier
  palette?: ColorPalette;         // Optional dominant colors
  year?: number;                  // Project year
  featured?: boolean;             // Priority loading flag
}

interface ColorPalette {
  primary: string;                // Hex color
  secondary: string;              // Hex color
  accent?: string;                // Optional accent
}
```

### Data Sources
- **Short-term:** Local JSON file at `src/data/projects.json`
- **Long-term:** Headless CMS integration (Sanity/Contentful/Strapi)

### Asset Naming Conventions
```
public/
  portfolio/
    posters/
      project-slug-poster.webp     (1920x1080)
      project-slug-poster.avif     (1920x1080)
      project-slug-poster.jpg      (fallback)
    previews/
      project-slug-preview.mp4     (720p, 10-15s, <2MB)
      project-slug-preview.webm    (alternative format)
    thumbnails/
      project-slug-thumb.webp      (400x300)
```

## 5) Interaction Design Specs

### Hover/Tap Video Preview
- **Desktop:** Play on mouseenter, pause on mouseleave
- **Mobile:** Play on tap, pause on scroll-out or second tap
- **Attributes:** muted, loop, playsinline, disablePictureInPicture
- **Preload policy:** `none` by default, `metadata` on viewport entry
- **Pause triggers:** Blur, scroll-out (>50% hidden), route change
- **Loading states:** Skeleton → Poster → Video (crossfade transition)

### Pointer Micro-interactions
- **Custom crosshair:** GPU-accelerated transform: translate3d()
- **Magnetic effect:** 20px attraction radius on interactive elements
- **Text scramble:** Random character replacement on hover (200ms duration)
- **Performance:** Single RAF loop for all cursor updates
- **Touch devices:** Completely disabled, pointer-events: none

### Scroll Reveals
```typescript
// Framer Motion patterns
whileInView={{ opacity: 1, y: 0 }}
initial={{ opacity: 0, y: 20 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.6, ease: "easeOut" }}
```
- **Strategy:** IntersectionObserver with 10% threshold
- **Stagger:** 50ms delay between grid items
- **Performance:** Max 10 simultaneous animations

### Page Transitions
- **Grid → Detail:** Framer Motion layoutId shared element (300ms)
- **Detail → Grid:** Reverse animation with scale preservation
- **Reduced motion fallback:** Simple opacity fade (200ms)
- **Route prefetch:** Next/previous project data on idle

### Infinite Loop List (Optional P2)
- **Strategy:** Duplicate items at 150% scroll position
- **Jump point:** Reset to 50% when reaching 25% or 75%
- **Smooth jump:** Disable pointer-events during reset
- **React keys:** Unique keys with index suffix to avoid reconciliation

## 6) Performance Strategy

### Loading Order
1. Critical CSS (Tailwind base + components)
2. React hydration with priority components
3. Defer non-critical JS (analytics, optional features)
4. Route-level code-splitting via React.lazy()
5. Poster images on viewport approach
6. Video sources on interaction only

### Media Optimization
- **Posters:** WebP (primary), AVIF (modern), JPEG (fallback)
  - Sizes: 1920x1080 (desktop), 800x600 (mobile)
  - Quality: 85 for WebP/JPEG, 80 for AVIF
- **Videos:** MP4 h.264 baseline, 720p max, 1-2Mbps bitrate
  - Duration: 10-15 seconds max
  - No audio track to reduce size
- **Cache headers:** `Cache-Control: public, max-age=31536000, immutable`

### Tailwind Optimizations
```css
/* GPU-accelerated transforms only */
.portfolio-card {
  @apply transform-gpu will-change-transform;
  transform: translate3d(0, 0, 0); /* Force GPU layer */
}

/* Aspect ratio utilities */
.aspect-portfolio {
  @apply aspect-w-16 aspect-h-9;
}
```

### Performance Hints
- `<link rel="preload">` for hero poster
- `<link rel="prefetch">` for next route chunk
- `requestIdleCallback` for background data warming
- `will-change: transform` on animated elements only during animation

### Bundle Budgets
- Portfolio route JS: < 150KB gzipped
- Portfolio CSS: < 30KB gzipped
- Max concurrent videos: 1 (enforce via state manager)
- Image lazy-load offset: 100px below fold

## 7) Accessibility Plan

### Keyboard Navigation
- **Tab order:** Logical grid flow, skip-to-content link
- **Enter/Space:** Trigger video preview on cards
- **Escape:** Pause any playing video, close modals
- **Arrow keys:** Navigate grid (optional enhancement)
- **Focus trap:** Modal/detail view focus management

### ARIA Implementation
```html
<article 
  role="article"
  aria-label="Project: {title}"
  aria-describedby="project-{id}-desc"
>
  <div role="img" aria-label="{title} preview">
    <video aria-hidden="true" />
  </div>
  <h3 id="project-{id}-title">{title}</h3>
  <p id="project-{id}-desc" class="sr-only">
    {title} for {client}. Categories: {categories.join(', ')}
  </p>
</article>
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  /* No autoplay */
  .video-preview { display: none; }
  .poster-image { display: block; }
  
  /* Simplified transitions */
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color & Contrast
- Text overlays: min 4.5:1 contrast ratio
- Focus indicators: 3px solid outline, AA compliant colors
- Error states: Not solely color-dependent
- Loading states: Accessible progress indicators

## 8) Phased Implementation Plan

### P0 — Planning & Scaffolds (docs only)
- [ ] Confirm React Router v6 or Tanstack Router setup
- [ ] Lock data model interfaces in TypeScript
- [ ] Define performance budgets in monitoring config
- [ ] Document breakpoint system in Tailwind config
- **Acceptance:** task.md reviewed and approved; TypeScript interfaces defined

### P1 — Core Grid + Video Preview (desktop + mobile MVP)
- [ ] Create ProjectGrid with responsive columns
- [ ] Implement ProjectCard with poster lazy-loading  
- [ ] Build VideoPreview with IO-driven playback
- [ ] Add useIntersectionVideo hook
- [ ] Configure basic Framer Motion reveals
- [ ] Add mock projects.json with 12+ items
- **Acceptance:** 
  - FCP < 1.5s on desktop (Lighthouse)
  - Videos play on hover/focus
  - Keyboard navigation functional
  - Mobile layout correct at 375/768/1024

### P2 — Micro-interactions & Navigation Polish  
- [ ] Implement CustomCursor with magnetic effect
- [ ] Add text-scramble utility (reduced-motion aware)
- [ ] Create AnimatePresence page transitions
- [ ] Add layoutId shared elements
- [ ] Build NextProjectLink with prefetch
- [ ] Optional: useInfiniteLoopScroll implementation
- **Acceptance:**
  - Cursor runs at 60fps (Performance monitor)
  - Transitions feel smooth
  - Reduced-motion fallbacks work
  - No layout shift during transitions

### P3 — Performance Hardening & A11y QA
- [ ] Implement route-level code splitting
- [ ] Convert images to WebP/AVIF
- [ ] Optimize video bitrates (<2MB per file)
- [ ] Add Web Vitals monitoring
- [ ] Complete ARIA labeling
- [ ] Full keyboard navigation test
- [ ] Screen reader compatibility check
- **Acceptance:**
  - Lighthouse ≥ 95 all categories
  - CLS < 0.1 on all devices
  - NVDA/JAWS navigation successful
  - axe-core reports 0 violations

### P4 — Three.js Enhancements (optional)
- [ ] Add shader transition effects
- [ ] Implement WebGL sphere background
- [ ] Create device capability detection
- [ ] Add performance fallbacks
- **Acceptance:**
  - No FPS drops below 30
  - Graceful degradation on low-end devices
  - Disabled for reduced-motion users

## 9) Risks & Mitigations

### Risk: Autoplay Policy Blocks (iOS Safari)
- **Impact:** Videos won't play automatically
- **Mitigation:** 
  - Always include muted + playsinline attributes
  - Add tap-to-play affordance with play icon overlay
  - Test on real iOS devices, not just simulators

### Risk: Infinite Scroll Performance
- **Impact:** Jank during scroll reset, memory leaks
- **Mitigation:**
  - Use virtual scrolling library (react-window) if >50 items
  - Implement scroll position caching
  - Add maximum item limit (100)

### Risk: Safari CSS Filter Performance  
- **Impact:** Dropped frames on blur/backdrop filters
- **Mitigation:**
  - Limit filters to small surfaces only
  - Use static blurred images as fallback
  - Detect Safari and reduce filter complexity

### Risk: Network Latency for Videos
- **Impact:** Long wait before preview plays
- **Mitigation:**
  - Show loading skeleton
  - Implement adaptive bitrate selection
  - Preload metadata on viewport approach

## 10) Test Plan

### Device Matrix
- **iOS:** Safari on iPhone 12/13/14 (iOS 15+)
- **Android:** Chrome on Pixel 6/7, Samsung S22
- **Desktop:** Chrome/Safari/Firefox/Edge (latest 2 versions)
- **Tablets:** iPad Safari, Android Chrome

### Network Profiles
- Fast 3G (1.6 Mbps down, 750 Kbps up)
- Slow 4G (3 Mbps down, 1.5 Mbps up)  
- WiFi (30 Mbps down)

### Performance Testing
```bash
# Lighthouse CI configuration
lighthouse https://site.com/portfolio \
  --throttling.cpuSlowdownMultiplier=4 \
  --preset=desktop \
  --output=json \
  --output-path=./lighthouse-report.json
```

### Accessibility Testing
- axe-core automated scans
- NVDA (Windows) manual testing
- VoiceOver (macOS/iOS) manual testing
- Keyboard-only navigation check

## 11) Metrics & Telemetry (optional)

### Development Metrics
```typescript
// Web Vitals logging
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${metric.name}]`, metric.value);
  }
  // Future: Send to analytics endpoint
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Production Monitoring (Future)
- Sentry for error tracking
- Custom RUM for video play rates
- Heatmap for interaction patterns

## 12) Tailwind & Styling Notes

### Custom Utilities
```css
/* portfolio.css */
@layer utilities {
  .aspect-portfolio {
    aspect-ratio: 16/9;
  }
  
  .focus-ring {
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .motion-safe-transform {
      @apply transform-gpu transition-transform;
    }
  }
  
  .will-change-optimized {
    will-change: transform, opacity;
  }
}
```

### Responsive Utilities
```javascript
// tailwind.config.js extensions
module.exports = {
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '414px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
        '2xl': '1920px',
      },
      animation: {
        'text-scramble': 'scramble 0.2s ease-out',
      }
    }
  }
}
```

## 13) Backlog & Nice-to-Haves

### Phase 5+ Enhancements
- Hover-sensitive color grading with CSS filters
- Automatic palette extraction using Canvas API
- Drag-to-scroll horizontal carousel sections
- CMS adapter layer for Sanity/Contentful
- View transition API when browser support improves
- WebGL particle effects on scroll
- Advanced filtering with URL state persistence
- Project comparison mode
- Collaborative commenting system
- Analytics dashboard for portfolio performance

## 14) Next Prompts (for step-by-step execution)

### Prompt 1: Initial Scaffolding
"Implement P1 scaffolds from docs/portfolio-firstframe/task.md. Create these files with minimal TypeScript skeletons:
- src/components/portfolio/ProjectGrid.tsx
- src/components/portfolio/ProjectCard.tsx  
- src/components/portfolio/VideoPreview.tsx
- src/hooks/useIntersectionVideo.ts
- src/data/projects.json (12 mock entries)
Use only Tailwind utilities, no custom CSS yet. Include TypeScript interfaces from section 4."

### Prompt 2: Video Preview System
"Implement the VideoPreview component and useIntersectionVideo hook from task.md section 5. Add:
- Intersection Observer for viewport detection
- Muted autoplay with hover/focus triggers
- Poster fallback with lazy loading
- Pause on scroll-out or blur
Test with mock data and verify no CLS."

### Prompt 3: Custom Cursor & Micro-interactions
"Add CustomCursor and text-scramble effect from task.md section 5:
- GPU-accelerated cursor with magnetic attraction
- Text scramble on hover (200ms, gated by reduced-motion)
- Wire into ProjectCard component
- Desktop-only with touch detection
Verify 60fps in Performance tab."

### Prompt 4: Page Transitions
"Implement grid→detail transitions from task.md section 5:
- Framer Motion AnimatePresence wrapper
- layoutId shared elements between grid and detail
- Smooth scale/position transitions (300ms)
- Reduced-motion opacity fallback
- Route prefetching for next/prev projects"

### Prompt 5: Performance Audit
"Run performance checks per task.md section 6:
- Execute Lighthouse audit (desktop + mobile)
- Measure Web Vitals (FCP, LCP, CLS, INP)
- Check bundle sizes
- Verify lazy-loading offsets
Output results to docs/portfolio-firstframe/perf-report.md with recommendations."

### Prompt 6: Accessibility Audit
"Complete accessibility audit from task.md section 7:
- Test keyboard navigation flow
- Verify ARIA labels and roles
- Check focus states visibility
- Test with screen reader (NVDA/JAWS)
- Validate reduced-motion fallbacks
Document findings in docs/portfolio-firstframe/a11y-report.md"

### Prompt 7: Responsive Testing
"Test all breakpoints from task.md section 1:
- 375px: Single column, verify touch targets
- 768px: 2-column grid transition
- 1024px: 3-column with cursor active
- 1440px: 4-column layout
- Check CLS during resize
Fix any issues and document in PR."

### Prompt 8: Production Optimizations
"Apply final optimizations from task.md section 6:
- Convert images to WebP/AVIF
- Optimize video bitrates to <2MB
- Add cache headers configuration
- Implement prefetch hints
- Set up route code-splitting
Verify Lighthouse still ≥95."

---

*Document Version: 1.0*  
*Last Updated: [Current Date]*  
*Next Review: After P1 Implementation*