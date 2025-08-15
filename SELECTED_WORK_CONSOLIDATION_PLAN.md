# Selected Work Sections Consolidation Plan

## Current State Analysis

### 1. HeroSection.jsx - First "Selected Work" (Line 131)
**Location**: Inside HeroSection component
**Structure**: Compact bento grid with 6 tiles
**Grid**: `grid-cols-6 gap-2 auto-rows-[120px]`
**Projects Displayed**:
- Coinbase (3x2 - large)
- Loops (2x1 - medium)
- Jhené Aiko (1x1 - small)
- Keller Williams (1x1 - small)
- OSO NYC (2x1 - medium)
- (Empty cell 1x1)

**Issues**:
- Static thumbnailMap references (e.g., 'coinbase-rebrand', 'loops-campaign')
- No routing/links to actual project pages
- Hard-coded project data

### 2. ProjectsBentoGrid.jsx - Second "Selected Work" (Line 83)
**Location**: Separate component called from HomePage
**Structure**: Larger, more complex bento grid
**Grid**: `grid-cols-5 grid-rows-4 gap-3 h-[600px]`
**Projects Displayed**:
- Coinbase
- Loops
- Keller Williams
- Jhené Aiko
- Ozone
- OSOS
- Amex
- Soho

**Features**:
- Uses BentoCard component
- Has hover states and animations
- Pulls from projects data file
- Has proper routing capability

## Implementation Plan

### Phase 1: Update HeroSection Grid with Routing
1. Import `Link` from react-router-dom
2. Import actual projects data
3. Wrap each tile in Link component
4. Add proper project URLs

### Phase 2: Fix Thumbnail References
1. Update thumbnailMap keys to match actual project thumbnails:
   - 'coinbase-rebrand' → 'CoinbaseThumbnail.webp'
   - 'loops-campaign' → 'LoopsWP.webp'
   - 'jhene-aiko' → 'JheneThmb.webp'
   - 'keller-williams' → 'kwthmb.webp'
   - 'oso-nyc' → 'ososthmb.webp'

### Phase 3: Remove ProjectsBentoGrid
1. Remove `<ProjectsBentoGrid />` component from HomePage.jsx
2. Keep the component file for potential future use
3. Update imports in HomePage.jsx

### Phase 4: Enhance Remaining Section
1. Add project data integration
2. Ensure all links route to `/work/{project.id}`
3. Add hover effects for better UX
4. Verify responsive behavior

## Code Changes Required

### 1. HeroSection.jsx Updates
```jsx
// Add imports
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

// Update each tile to include Link wrapper
<Link to="/work/coinbase" className="col-span-3 row-span-2 relative overflow-hidden rounded-lg group cursor-pointer">
  {/* existing tile content */}
</Link>
```

### 2. HomePage.jsx Changes
```jsx
// Remove ProjectsBentoGrid import
// import ProjectsBentoGrid from '../components/ProjectsBentoGrid'

// Remove component usage
// <ProjectsBentoGrid />
```

### 3. Thumbnail Mapping Fixes
```jsx
// Update thumbnail references
src={thumbnailMap['CoinbaseThumbnail.webp']}  // was 'coinbase-rebrand'
src={thumbnailMap['LoopsWP.webp']}             // was 'loops-campaign'
src={thumbnailMap['JheneThmb.webp']}           // was 'jhene-aiko'
src={thumbnailMap['kwthmb.webp']}              // was 'keller-williams'
src={thumbnailMap['ososthmb.webp']}            // was 'oso-nyc'
```

## Benefits of Consolidation
1. **Reduced Redundancy**: Single "Selected Work" section
2. **Cleaner UX**: No duplicate content
3. **Better Performance**: Less components to render
4. **Consistent Design**: One unified grid layout
5. **Easier Maintenance**: Single source of truth for featured projects

## Testing Checklist
- [ ] All project tiles link to correct pages
- [ ] Thumbnails display correctly
- [ ] Hover effects work
- [ ] Responsive layout maintained
- [ ] No console errors
- [ ] Page loads faster without duplicate section

## Final Structure
```
HomePage
├── HeroSection (with integrated Selected Work grid)
│   ├── Hero content
│   └── Selected Work bento grid (6 tiles with routing)
├── AboutSection
└── EndOfContentCTA
```

## Next Steps Priority
1. Implement routing in HeroSection tiles ✅
2. Fix thumbnail references ✅
3. Remove ProjectsBentoGrid from HomePage ✅
4. Test all links and hover states ✅
5. Verify responsive behavior ✅