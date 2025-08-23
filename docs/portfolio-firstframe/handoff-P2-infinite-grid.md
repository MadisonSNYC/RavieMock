# P2 Handoff — Infinite 2×2 Portfolio Grid (Counter-Scrolling Columns)

This document specifies the implementation of a FirstFrame-style infinite portfolio grid featuring counter-scrolling columns with seamless vertical loops, hover-activated video previews, custom cursor interactions, and smooth shared-element transitions. The system maintains 60fps performance while ensuring full accessibility compliance including keyboard navigation parity and reduced-motion fallbacks, targeting Lighthouse scores ≥95 with strict Core Web Vitals budgets (FCP <1.5s, LCP <2.5s, CLS <0.1).

## 1) Visual & Interaction Spec (Authoritative)

### Layout Structure
- **Desktop (≥1024px):** Fixed 2×2 grid viewport, 4 columns total
- **Tablet (768-1023px):** 2×2 grid, 2 columns
- **Mobile (<768px):** Single column stack, standard scroll

### Counter-Scrolling Columns
**Motion Pattern:**
- **Columns 1 & 3:** Content translates upward as user scrolls down (negative translateY)
- **Columns 2 & 4:** Content translates downward as user scrolls down (positive translateY)
- **Speed ratio:** 1:1 with scroll delta, adjustable via speed multiplier (default 0.8)
- **Motion type:** Continuous, infinite, no dead-ends or bounce

### Infinite Loop Behavior
**Implementation:**
- Each column contains duplicated content: [A...N] + [A...N] (2× height)
- When translateY crosses threshold: instant modulo wrap with no visual jump
- Upper threshold: `if (translateY <= -columnHeight) translateY += columnHeight`
- Lower threshold: `if (translateY >= 0) translateY -= columnHeight`
- Transform applied via GPU-accelerated `translate3d(0, translateY, 0)`

### Hover/Focus Previews
- **Trigger:** mouseenter/focus starts playback, mouseleave/blur pauses
- **Constraints:** Maximum 1 video playing simultaneously across all cards
- **Attributes:** muted, loop, playsInline, preload="metadata"
- **Loading:** Lazy via IntersectionObserver with 200px margin
- **Memory:** Clear src 250ms after leave if not re-entered

### Reduced Motion Behavior
- Counter-scrolling disabled → static grid layout
- Video autoplay disabled → static posters only
- Text scramble disabled → immediate text display
- Custom cursor disabled → default system cursor
- Transitions simplified → opacity fades only

### Pointer Micro-interactions (Desktop)
- **Custom crosshair:** 20×20px, follows mouse with 0.15s ease
- **Magnetic attraction:** 15px radius on interactive elements
- **Text scramble:** Random character replacement, 300ms duration
- **Performance:** Single RAF loop, GPU transforms only
- **Touch detection:** Complete disable on `('ontouchstart' in window)`

### Shared-Element Transition
- **Method:** Framer Motion layoutId between grid card and detail hero
- **Duration:** 400ms with ease-out curve
- **Elements:** Image/video container morphs position and scale
- **Fallback:** Simple opacity crossfade for reduced-motion

## 2) Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PortfolioPage (Route)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               GridViewport (Controller)              │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │                                                      │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │  │ Column 1 │ │ Column 2 │ │ Column 3 │ │ Column 4 │    │
│  │  │    ↑     │ │    ↓     │ │    ↑     │ │    ↓     │    │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘    │
│  │       │            │            │            │       │    │
│  │  ┌────▼────────────▼────────────▼────────────▼─────┐    │
│  │  │          CounterScrollColumn × 4                │    │
│  │  │    (Owns: wrap logic, translateY, IO observe)   │    │
│  │  └──────────────────────────────────────────────────┘    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────────┐    │
│  │  │           ProjectCard (Interactive)              │    │
│  │  │    (VideoPreview + Hover/Focus handlers)        │    │
│  │  └──────────────────────────────────────────────────┘    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  CustomCursor          TransitionController         │    │
│  │  (Desktop only)        (AnimatePresence wrapper)    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

State Management:
- Scroll offset: GridViewport state (lifted)
- Video playing: Global ref/context to enforce single-play
- Cursor position: Local RAF loop in CustomCursor
- Reduced motion: Context provider (existing)
```

## 3) Component/API Blueprint

### `src/components/portfolio/GridViewport.tsx`
```typescript
interface GridViewportProps {
  projects: Project[]
  columns?: 2 | 4  // Responsive default based on viewport
  speed?: number    // Scroll speed multiplier (0.5-1.5)
  reversePattern?: boolean[]  // [up, down, up, down]
  gap?: number      // Gap between columns in px
}
// Manages scroll listener, distributes projects to columns, syncs offsets
```

### `src/components/portfolio/CounterScrollColumn.tsx`
```typescript
interface CounterScrollColumnProps {
  items: Project[]
  direction: 'up' | 'down'
  speed: number
  scrollOffset: number  // From parent GridViewport
  viewportHeight: number
  onVideoPlay?: (id: string) => void  // For single-play guard
}
// Handles infinite wrap, applies translateY, manages IO for its cards
```

### `src/components/portfolio/ProjectCard.tsx` (enhanced)
```typescript
interface ProjectCardProps {
  project: Project
  isPlaying?: boolean
  onPlay?: () => void
  onPause?: () => void
  onHover?: (hovering: boolean) => void  // For cursor text
  enableScramble?: boolean
}
// Existing + hooks for cursor/scramble coordination
```

### `src/components/portfolio/CustomCursor.tsx`
```typescript
interface CustomCursorProps {
  text?: string           // Display text near cursor
  magnetTargets?: string  // Selector for magnetic elements
  disabled?: boolean      // For reduced motion
}
// GPU-accelerated custom cursor, pointer-events: none
```

### `src/components/portfolio/NextProjectLink.tsx`
```typescript
interface NextProjectLinkProps {
  currentSlug: string
  direction: 'prev' | 'next'
  prefetch?: boolean
  className?: string
}
// Smart navigation with prefetch and transition prep
```

### `src/hooks/useCounterScroll.ts`
```typescript
interface UseCounterScrollReturn {
  scrollY: number
  setScrollY: (y: number) => void
  bindWheel: (e: WheelEvent) => void
  bindTouch: (e: TouchEvent) => void
  onRafTick: (callback: (delta: number) => void) => void
}
// Unified scroll handling with RAF optimization
```

### `src/hooks/useInfiniteWrap.ts`
```typescript
interface UseInfiniteWrapReturn {
  wrapY: (y: number, height: number) => number
  measureHeight: (ref: RefObject<HTMLElement>) => number
  calculateThreshold: (height: number, margin?: number) => number
}
// Math utilities for seamless infinite scrolling
```

### `src/hooks/usePlayPreviewOnHover.ts`
```typescript
interface UsePlayPreviewReturn {
  playingId: string | null
  play: (id: string) => void
  pause: () => void
  isPlaying: (id: string) => boolean
}
// Centralized single-play guard across all cards
```

## 4) Data Contract

### Enhanced Project Interface
```typescript
interface Project {
  id: string
  title: string
  client?: string
  categories: string[]
  slug: string
  posterSrc: string      // WebP/AVIF, 1920×1080
  previewSrc: string     // MP4, 720p, <2MB, 5-10s
  durationSec?: number
  palette?: {
    primary: string      // Hex color for theming
    secondary: string
    accent?: string
  }
  priority?: number      // 0-10 for load order
  column?: number        // Optional fixed column assignment
}
```

### Column Distribution Strategy
```javascript
// Round-robin with visual weight balancing
function distributeToColumns(projects: Project[], numColumns: number) {
  const columns = Array(numColumns).fill(null).map(() => [])
  const weights = new Array(numColumns).fill(0)
  
  projects.forEach((project, i) => {
    // Find column with minimum weight
    const minWeight = Math.min(...weights)
    const targetColumn = weights.indexOf(minWeight)
    
    columns[targetColumn].push(project)
    weights[targetColumn] += project.priority || 1
  })
  
  return columns
}
```

### Asset Specifications
- **Posters:** 1920×1080 WebP (primary), AVIF (modern), JPEG (fallback)
- **Previews:** 1280×720 MP4, h.264 baseline, 1-2Mbps, 5-10s max
- **Cache:** `Cache-Control: public, max-age=31536000, immutable`

## 5) Algorithms & Math (Detailed)

### Counter-Scroll Translation
```javascript
// Per-column offset calculation
function updateColumnOffset(column, scrollDelta, speed, direction) {
  const sign = direction === 'up' ? -1 : 1
  column.targetY += sign * scrollDelta * speed
  
  // Smooth lerp (or use Framer Motion)
  const k = 0.1  // Lerp factor
  column.currentY = lerp(column.currentY, column.targetY, k)
  
  // Apply wrap
  column.currentY = wrapInfinite(column.currentY, column.height)
  
  return column.currentY
}

function lerp(start, end, factor) {
  return start + (end - start) * factor
}
```

### Infinite Wrap Logic
```javascript
function wrapInfinite(offset, columnHeight) {
  // Modulo wrap at boundaries
  if (offset <= -columnHeight) {
    return offset + columnHeight
  } else if (offset >= 0) {
    return offset - columnHeight
  }
  return offset
}

// Column rendering with duplication
function renderInfiniteColumn(items, offset) {
  return (
    <div 
      className="column-content"
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: 'transform'
      }}
    >
      {/* First set */}
      {items.map(item => <ProjectCard key={item.id} />)}
      {/* Duplicate set for seamless loop */}
      {items.map(item => <ProjectCard key={`${item.id}-dup`} />)}
    </div>
  )
}
```

### Intersection Observer Strategy
```javascript
// Attach/detach video sources based on visibility
const observerOptions = {
  root: null,
  rootMargin: '200px 0px',  // Preload margin
  threshold: [0, 0.25, 0.5, 0.75, 1.0]
}

function handleIntersection(entries) {
  entries.forEach(entry => {
    const video = entry.target.querySelector('video')
    
    if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
      // Attach source if not present
      if (!video.src && video.dataset.src) {
        video.src = video.dataset.src
      }
    } else if (!entry.isIntersecting) {
      // Schedule cleanup
      setTimeout(() => {
        if (!isHovered(video)) {
          video.src = ''
          video.load()  // Free memory
        }
      }, 250)
    }
  })
}
```

### Single-Play Guard
```javascript
class VideoPlayManager {
  constructor() {
    this.currentPlaying = null
  }
  
  play(videoId, videoElement) {
    // Pause previous if different
    if (this.currentPlaying && this.currentPlaying.id !== videoId) {
      this.currentPlaying.element.pause()
    }
    
    // Play new
    this.currentPlaying = { id: videoId, element: videoElement }
    videoElement.play().catch(() => {})
  }
  
  pause() {
    if (this.currentPlaying) {
      this.currentPlaying.element.pause()
      this.currentPlaying = null
    }
  }
}
```

## 6) Performance Plan

### GPU Optimization
- All animations via `transform` and `opacity` only
- Pre-apply `will-change: transform` on scroll containers
- Use `translate3d()` to force GPU layers
- Avoid `filter` on large surfaces

### Scroll Performance
```javascript
// Debounced wheel handler
let rafId = null
let scrollDelta = 0

function handleWheel(e) {
  e.preventDefault()
  scrollDelta += e.deltaY
  
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      updateColumns(scrollDelta)
      scrollDelta = 0
      rafId = null
    })
  }
}

// Passive listeners where possible
element.addEventListener('wheel', handleWheel, { passive: false })
element.addEventListener('touchmove', handleTouch, { passive: true })
```

### Memory Management
- Maximum 1 video element with active src at any time
- Detach sources 250ms after leaving viewport
- Use `loading="lazy"` on poster images
- Limit IntersectionObserver to 20 targets max

### Bundle Budgets
- Portfolio route JS: ≤170KB gzipped
- Portfolio CSS: ≤40KB gzipped  
- Runtime memory: ≤150MB including videos
- Main thread task: ≤10ms per frame

## 7) Accessibility Plan

### Reduced Motion Implementation
```css
/* Tailwind utilities */
@media (prefers-reduced-motion: reduce) {
  .motion-safe\:translate-y-0 {
    transform: none !important;
  }
  
  .motion-reduce\:transition-none {
    transition: none !important;
  }
}
```

```javascript
// Component gating
const { prefersReducedMotion } = useReducedMotion()

if (prefersReducedMotion) {
  // Static grid, no counter-scroll
  return <StaticGrid projects={projects} />
}
```

### Keyboard Navigation
- **Tab order:** Logical left-to-right, top-to-bottom
- **Focus triggers:** Same as hover (video play)
- **Blur behavior:** Same as mouseleave (video pause)
- **Focus indicators:** 2px white ring with offset
- **Skip links:** "Skip to main content" for grid

### Screen Reader Support
```html
<article 
  role="article"
  aria-label={`${project.title} by ${project.client}`}
>
  <h3 id={`project-${project.id}`}>{project.title}</h3>
  <div role="img" aria-labelledby={`project-${project.id}`}>
    <video aria-hidden="true" />
  </div>
</article>

<!-- Custom cursor -->
<div aria-hidden="true" className="custom-cursor" />
```

### Touch Targets
- Minimum 44×44px hit areas on all interactive elements
- 8px minimum spacing between targets
- Hover effects gracefully degrade to tap

## 8) Implementation Phases & Acceptance Criteria

### P2-A — Counter-Scroll Columns (Desktop)
**Tasks:**
- [ ] Create GridViewport component with scroll handling
- [ ] Implement CounterScrollColumn with infinite wrap
- [ ] Build useCounterScroll and useInfiniteWrap hooks
- [ ] Add responsive column logic (4/2/1)

**Acceptance Criteria:**
- Smooth opposing motion at 60fps (Performance monitor shows <16ms frames)
- Seamless wrap with no visual jumps (scroll 60s continuously)
- No CLS during column measurements
- Reduced-motion shows static grid

### P2-B — Hover/Focus Integration & Single-Play Guard
**Tasks:**
- [ ] Integrate video previews with moving columns
- [ ] Implement usePlayPreviewOnHover with single-play
- [ ] Ensure IO still gates src attachment
- [ ] Add memory cleanup on leave

**Acceptance Criteria:**
- Hover/focus plays video within 100ms
- Blur/leave pauses immediately
- Only one video playing at any time
- Memory stable after 5min interaction

### P2-C — Custom Cursor + Text Scramble (Desktop-Only)
**Tasks:**
- [ ] Create CustomCursor component
- [ ] Add text scramble utility
- [ ] Wire into ProjectCard hover states
- [ ] Gate by reduced motion and touch

**Acceptance Criteria:**
- Cursor doesn't block pointer events
- Scramble completes in 300ms
- CPU usage <5% during cursor movement
- Completely disabled on touch devices

### P3 — Shared-Element Grid→Detail Transition
**Tasks:**
- [ ] Add layoutId to ProjectCards
- [ ] Create detail page with AnimatePresence
- [ ] Implement NextProjectLink with prefetch
- [ ] Add fallback for reduced motion

**Acceptance Criteria:**
- Seamless morph animation (400ms)
- Back navigation restores scroll position
- No layout shift during transition
- Reduced motion uses fade (200ms)

## 9) Risks & Mitigations

### Risk: Safari Performance Issues
- **Impact:** Dropped frames on filter/blur effects
- **Mitigation:** Detect Safari, reduce filter complexity, use static blurred images

### Risk: iOS Autoplay Blocking
- **Impact:** Videos won't play automatically
- **Mitigation:** Always include muted + playsInline, add play icon overlay

### Risk: Float Drift in Long Sessions
- **Impact:** Accumulating rounding errors in positions
- **Mitigation:** Rebase to 0 every 1000px scroll, use integer math

### Risk: IntersectionObserver Thrashing
- **Impact:** Rapid attach/detach causing flicker
- **Mitigation:** Add 200ms hysteresis, batch observer callbacks

## 10) QA/Test Checklist

### Reduced Motion Testing
- [ ] Enable `prefers-reduced-motion: reduce` in DevTools
- [ ] Verify columns don't counter-scroll
- [ ] Confirm videos don't autoplay
- [ ] Check cursor reverts to default
- [ ] Ensure transitions use simple fades

### Infinite Wrap Testing
- [ ] Scroll continuously for 60 seconds
- [ ] No visible jumps or artifacts
- [ ] Offsets wrap correctly at boundaries
- [ ] Memory usage remains stable

### Video Attachment Testing
- [ ] Open Network tab, filter by Media
- [ ] Scroll through grid slowly
- [ ] Videos load only when near viewport
- [ ] Videos detach after leaving view
- [ ] Maximum 1-2 concurrent video requests

### Performance Testing
- [ ] Open Performance panel
- [ ] Record while scrolling vigorously
- [ ] Main thread tasks <10ms
- [ ] 60fps maintained (no red bars)
- [ ] No memory leaks after 5min

### Keyboard Navigation Testing
- [ ] Tab through all cards
- [ ] Video plays on focus
- [ ] Video pauses on blur
- [ ] Focus ring clearly visible
- [ ] Escape key stops video

### Mobile Testing
- [ ] iPhone 12 simulator
- [ ] Android Pixel 6 simulator
- [ ] Tap to play videos
- [ ] Hit targets ≥44px
- [ ] No horizontal scroll

### Lighthouse Testing
- [ ] Run on /portfolio route
- [ ] Desktop score ≥95
- [ ] FCP <1.5s, LCP <2.5s
- [ ] CLS <0.1
- [ ] Check bundle sizes match budgets

## 11) Concrete Next Prompts

### Prompt 1: P2-A Implementation
```
Implement P2-A from docs/portfolio-firstframe/handoff-P2-infinite-grid.md:
- Create GridViewport component with 4-column layout (2 on tablet, 1 mobile)
- Build CounterScrollColumn with infinite wrap logic (duplicate content, modulo wrap)
- Implement useCounterScroll hook with RAF-optimized scroll handling
- Add useInfiniteWrap for wrap math helpers
- Wire up opposing column motion (1&3 up, 2&4 down)
- Ensure reduced-motion shows static grid
- No cursor or transitions yet
```

### Prompt 2: P2-B Integration
```
Implement P2-B from docs/portfolio-firstframe/handoff-P2-infinite-grid.md:
- Integrate existing VideoPreview into moving columns
- Create usePlayPreviewOnHover hook with single-play guard
- Ensure IntersectionObserver still gates video src attachment
- Add 250ms cleanup timeout on leave
- Test hover/focus triggers with column motion
- Verify only one video plays at a time
- Check memory stability
```

### Prompt 3: P2-C Cursor & Scramble
```
Implement P2-C from docs/portfolio-firstframe/handoff-P2-infinite-grid.md:
- Create CustomCursor component (GPU transforms, pointer-events: none)
- Add text scramble effect (300ms duration, random chars)
- Wire into ProjectCard hover states
- Gate entirely by reduced-motion and touch detection
- Add magnetic attraction within 15px of cards
- Ensure cursor doesn't block any interactions
- Verify <5% CPU usage during movement
```

## 12) Appendix

### Wrap Math Pseudocode
```javascript
// Infinite wrap with hysteresis
function wrapWithHysteresis(offset, height, margin = 50) {
  const upperBound = -height + margin
  const lowerBound = -margin
  
  if (offset < upperBound) {
    return { wrapped: offset + height, jumped: true }
  } else if (offset > lowerBound) {
    return { wrapped: offset - height, jumped: true }
  }
  
  return { wrapped: offset, jumped: false }
}
```

### RAF Loop with Lerp
```javascript
let rafId = null
let currentY = 0
let targetY = 0

function animate() {
  // Lerp toward target
  currentY += (targetY - currentY) * 0.1
  
  // Apply to DOM
  element.style.transform = `translate3d(0, ${currentY}px, 0)`
  
  // Continue if not at target
  if (Math.abs(targetY - currentY) > 0.01) {
    rafId = requestAnimationFrame(animate)
  } else {
    rafId = null
  }
}

function scrollTo(y) {
  targetY = y
  if (!rafId) {
    rafId = requestAnimationFrame(animate)
  }
}
```

### Single-Play Guard Pattern
```javascript
const videoManager = useRef(null)

function handleVideoPlay(id, element) {
  if (!videoManager.current) {
    videoManager.current = new VideoPlayManager()
  }
  
  videoManager.current.play(id, element)
}

// In component
onMouseEnter={() => handleVideoPlay(project.id, videoRef.current)}
onMouseLeave={() => videoManager.current?.pause()}
```

### Tailwind Utilities
```css
/* Custom utilities for portfolio */
@layer utilities {
  .will-change-transform {
    will-change: transform;
  }
  
  .motion-safe\:animate-scroll {
    @apply motion-safe:will-change-transform;
  }
  
  .motion-reduce\:static {
    @apply motion-reduce:transform-none motion-reduce:transition-none;
  }
  
  .pointer-events-passthrough {
    pointer-events: none;
  }
  
  .aspect-portfolio {
    aspect-ratio: 16 / 9;
  }
}
```

### Future P4 Considerations (Three.js)
- Shader transitions between routes (gated by GPU tier)
- WebGL sphere background (disabled on mobile/reduced-motion)
- Particle effects on scroll (max 100 particles)
- Device detection via `renderer.capabilities`

---

*Document Version: 1.0*  
*Created: [Current Date]*  
*P1 Status: Complete + Hardened*  
*Next Phase: P2-A Counter-Scroll Implementation*