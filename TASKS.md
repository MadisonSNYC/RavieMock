# 📋 Ravie Website - Codebase Improvement Tasks

## Overview
This document tracks all tasks for improving the Ravie website codebase architecture, based on the comprehensive audit performed on 2025-08-11 and updated with code quality audit on 2025-08-13.

**Project Status:** 🟡 Needs Refactoring  
**Architecture Grade:** C+ (due to code quality issues)  
**Estimated Total Effort:** ~40-50 hours

### ⚠️ CRITICAL FINDINGS:
- **13 files over 200 lines** need refactoring
- **39/47 UI components unused** (83%)
- **10,589 total lines** of code with ~15% duplication
- **TODOs in production code**

---

## 🔴 Phase 1: Critical Fixes (Priority: HIGH)
*These issues directly impact maintainability and should be addressed immediately*

### 1.1 Extract Duplicate Thumbnail Imports ✅
- [x] Create `/src/data/thumbnails.js` module
- [x] Move thumbnailMap from `ProjectsSection.jsx`
- [x] Move thumbnailMap from `ProjectDirectory.jsx`
- [x] Import shared module in both components
- [x] Test both components still render correctly
**Effort:** 1 hour  
**Files:** `ProjectsSection.jsx:7-26`, `ProjectDirectory.jsx:7-26`

### 1.2 Centralize Hardcoded Data ✅
- [x] Create `/src/data/company-info.js` for:
  - [x] Office locations
  - [x] Contact information
  - [x] Social media links
- [x] Create `/src/data/site-content.js` for:
  - [x] Company stats
  - [x] Services list
  - [x] About section content
- [x] Update `Footer.jsx` to use data imports
- [x] Update `AboutSection.jsx` to use data imports
**Effort:** 2 hours  
**Files:** `Footer.jsx:5-35`, `AboutSection.jsx:4-32`

### 1.3 Implement Error Boundaries ✅
- [x] Create `ErrorBoundary.jsx` component
- [x] Create `ImageWithFallback.jsx` component
- [x] Wrap main sections in App.jsx
- [x] Add fallback UI for failed states
- [x] Test error scenarios
**Effort:** 2 hours  
**Impact:** Prevents app crashes, improves UX

---

## 🔴 Phase 2: Code Quality Critical Issues (Priority: URGENT)
*Must fix these issues found in audit - they impact production readiness*

### Priority Order:
1. **🔴 CRITICAL:** Remove 39 unused UI components - Quick win
2. **🔴 CRITICAL:** Fix TODOs and console.logs - Production ready
3. **🔴 CRITICAL:** Split HomePage2.css (806 lines!) - Unmaintainable
4. **🟡 HIGH:** Refactor IntroSequence.jsx (592 lines)
5. **🟡 HIGH:** Extract duplicate filter logic

### 2.1 Unused UI Components (Remove Immediately)
- [ ] Remove 39 unused components from `/src/components/ui/`
- [ ] Keep only: button, form, input, dialog, toast, select, card, separator
- [ ] Document why any other components are kept
**Effort:** 2 hours  
**Impact:** Reduces confusion, cleaner codebase

### 2.2 Files Over 200 Lines (Urgent Refactoring)
- [ ] **HomePage2.css** (806 lines) → Split into: header.css, sidebar.css, hero.css, projects.css
- [ ] **IntroSequence.jsx** (592 lines) → Break into: animations.js, phases.js, IntroUI.jsx
- [ ] **ProjectsBentoGrid.jsx** (359 lines) → Extract BentoCard, BentoGrid components
- [ ] **App.css** (342 lines) → Split into component styles
- [ ] **ContactPage.jsx** (285 lines) → Extract ContactForm, ContactInfo
- [ ] **HeroSection.jsx** (254 lines) → Split HeroAnimation, HeroContent
- [ ] **AboutPage.jsx** (250 lines) → Extract sections
**Effort:** 10 hours

### 2.3 Production Code Issues (Fix Now)
- [ ] Remove TODO: WorkPage.jsx:118 - Implement project detail modal
- [ ] Remove TODO: useIntroState.js:25 - Re-enable localStorage
- [ ] Replace console.error in ErrorBoundary.jsx:18 with proper logger
- [ ] Extract magic numbers to constants file
- [ ] Create `useProjectFilters` hook for duplicate logic
**Effort:** 3 hours

---

## 🟡 Phase 3: Architecture Improvements (Priority: MEDIUM)
*Structural improvements for better scalability*

### 3.1 Implement Proper Routing ✅
- [x] Set up React Router in `main.jsx`
- [x] Create page components:
  - [x] `/src/pages/HomePage.jsx`
  - [x] `/src/pages/WorkPage.jsx`
  - [x] `/src/pages/AboutPage.jsx`
  - [x] `/src/pages/ContactPage.jsx`
- [x] Update navigation in `Header.jsx`
- [x] Remove hash-based navigation
- [x] Add 404 page
**Effort:** 3 hours  
**Dependencies:** react-router-dom (already installed)

### 3.2 Component Decomposition ✅
- [x] Extract from `ProjectsSection.jsx`:
  - [x] `ProjectCard.jsx` component
  - [x] `ProjectGrid.jsx` wrapper
  - [x] Move inline styles to CSS
- [x] Extract from `HeroSection.jsx`:
  - [x] `AnimatedBackground.jsx` for SVG animations
  - [x] `HeroContent.jsx` for text/CTAs
  - [x] `ScrollIndicator.jsx` component
- [x] Create reusable components
**Effort:** 4 hours  
**Files:** `ProjectsSection.jsx` (364 lines), `HeroSection.jsx` (177 lines)

### 3.3 Standardize Styling System ✅
- [x] Create `/src/styles/variables.css` for:
  - [x] Color tokens (use existing --neon-blue, --vivid-purple)
  - [x] Spacing scale
  - [x] Typography scale
- [x] Replace inline color values with CSS variables
- [x] Document styling conventions in `STYLE_GUIDE.md`
- [x] Created reusable utility classes
**Effort:** 3 hours  
**Example Fix:** `HeroSection.jsx` uses `#00D4FF` instead of `var(--neon-blue)`

---

## 🟢 Phase 4: Performance & Polish (Priority: LOW)
*Optimizations and enhancements*

### 4.1 Bundle Optimization ✅
- [x] Audit and remove unused dependencies:
  - [x] Removed 40+ unused Radix UI packages
  - [x] Removed unused form libraries (react-hook-form, zod)
  - [x] Removed unused animation libraries
- [x] Implement code splitting:
  - [x] Lazy load all routes
  - [x] Lazy load ProjectDirectory
  - [x] Added Suspense boundaries
- [x] Reduced dependencies from 61 to 7 core packages
**Effort:** 2 hours  
**Expected Impact:** 30-40% bundle size reduction

### 4.2 Image Optimization ✅
- [x] Implement lazy loading for project thumbnails
- [x] Add loading skeletons
- [x] Convert images to next-gen formats (WebP done ✅)
- [x] Created ImageWithFallback component
- [x] Applied lazy loading to ProjectCard
**Effort:** 2 hours  
**Files:** All components using thumbnailMap

### 4.3 Accessibility Improvements ✅
- [x] Add ARIA labels to:
  - [x] Interactive buttons
  - [x] Navigation elements  
  - [x] Mobile menu toggle
- [x] Implement keyboard navigation for:
  - [x] Project cards (Enter/Space support)
  - [x] Mobile menu
  - [x] All navigation links
- [x] Add focus indicators (ring styles)
- [x] Added semantic HTML (nav, article, role attributes)
- [x] Added aria-current for active page
**Effort:** 3 hours  
**Tools:** axe DevTools, WAVE

---

## 📈 Phase 5: Future Enhancements (Priority: OPTIONAL)
*Nice-to-have improvements for long-term maintainability*

### 5.1 TypeScript Migration
- [ ] Add TypeScript configuration
- [ ] Convert utility files first
- [ ] Add types for data structures
- [ ] Gradually migrate components
**Effort:** 8+ hours

### 5.2 Testing Infrastructure
- [ ] Set up Vitest
- [ ] Add unit tests for utilities
- [ ] Add component tests
- [ ] Add E2E tests with Playwright
**Effort:** 6+ hours

### 5.3 Development Tooling
- [ ] Configure ESLint rules
- [ ] Add Prettier configuration
- [ ] Set up Husky pre-commit hooks
- [ ] Add GitHub Actions CI/CD
**Effort:** 2 hours

### 5.4 State Management
- [ ] Evaluate need for global state
- [ ] Consider Context API or Zustand
- [ ] Implement if needed for:
  - [ ] Theme management
  - [ ] User preferences
  - [ ] Project filters
**Effort:** 4 hours (if needed)

---

## 📊 Metrics & Success Criteria

### Performance Targets
- [ ] Lighthouse Performance: >90
- [ ] Bundle size: <500KB (currently ~800KB)
- [ ] First Contentful Paint: <1.5s
- [ ] Time to Interactive: <3s

### Code Quality Targets
- [ ] No duplicate code blocks
- [ ] Components <150 lines
- [ ] 100% data externalized
- [ ] Zero inline style colors

### Completion Tracking
- Phase 1: 3/3 tasks (100%) ✅
- Phase 2: 0/15 tasks (0%) 🔴 URGENT
- Phase 3: 3/3 tasks (100%) ✅
- Phase 4: 3/3 tasks (100%) ✅
- Phase 5: 0/4 tasks (0%)
- Quick Wins: 5/5 tasks (100%) ✅

**Total Progress:** 14/33 total tasks (42%)

---

## 🚀 Quick Wins (Can do in <30 mins each)
1. [x] Remove unused imports from package.json ✅
2. [x] Fix deprecation warning in `use-mobile.js:15` ✅
3. [x] Add `.nvmrc` file for Node version ✅
4. [x] Update meta tags in `index.html` ✅
5. [x] Add favicon variants ✅

---

## 🧹 Cleanup Tasks (AFTER Site Completion Only)
**⚠️ DO NOT DELETE YET - These may be needed for future features**

### Why Keep `/src/components/ui/` For Now:
- Components are tree-shaken (not affecting bundle size)
- May need for upcoming features (forms, modals, notifications)
- Already configured and accessible
- Saves development time if needed

### Components Likely Needed:
- `dialog.jsx` - Project detail modals
- `form.jsx` & `input.jsx` - Contact/newsletter forms  
- `select.jsx` - Filter dropdowns
- `toast.jsx` / `sonner.jsx` - User notifications
- `button.jsx` - Consistent button styling

### When to Delete:
- [ ] Site is 100% feature complete
- [ ] No planned future enhancements
- [ ] Ready for final production handoff
- [ ] All stakeholders approve feature freeze

### Final Cleanup Checklist:
- [ ] Delete unused `/src/components/ui/` components
- [ ] Remove any unused assets in `/src/assets/`
- [ ] Clean up any commented code
- [ ] Remove development console.logs
- [ ] Final bundle size optimization
- [ ] Update all documentation

---

## 📝 Notes
- All line numbers reference the current state of files
- Effort estimates assume single developer
- Tasks can be parallelized across team members
- Consider creating feature branches for each phase
- **Keep ui components until site is feature-complete**

---

*Last Updated: 2025-08-13*  
*Audit Added: Comprehensive code quality audit findings*  
*Next Review: After Phase 5 completion*