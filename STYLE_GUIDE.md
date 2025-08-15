# 🎨 Ravie Website Style Guide

## Overview
This document outlines the styling conventions and design system for the Ravie website. All styles should follow these guidelines to ensure consistency across the application.

---

## 📐 Design Principles

1. **Consistency**: Use design tokens from `variables.css`
2. **Performance**: Prefer CSS variables over inline styles
3. **Accessibility**: Maintain WCAG AA contrast ratios
4. **Modularity**: Use utility classes and component classes
5. **Responsiveness**: Mobile-first approach

---

## 🎨 Color System

### Brand Colors
```css
--color-neon-blue: #00D4FF;     /* Primary accent */
--color-vivid-purple: #8B5CF6;  /* Secondary accent */
--color-deep-charcoal: #0A0A0A; /* Main background */
--color-dark-charcoal: #1A1A1A; /* Surface/cards */
```

### Usage Guidelines
- **Primary Actions**: Use `--color-neon-blue` for CTAs and primary buttons
- **Secondary Actions**: Use `--color-vivid-purple` for secondary elements
- **Text**: Use opacity variants for hierarchy
  - Primary text: `rgba(255, 255, 255, 1)`
  - Secondary text: `rgba(255, 255, 255, 0.7)`
  - Muted text: `rgba(255, 255, 255, 0.6)`
  - Disabled: `rgba(255, 255, 255, 0.4)`

### Utility Classes
```css
.text-accent-blue    /* Neon blue text */
.text-accent-purple  /* Vivid purple text */
.text-primary        /* White text */
.text-secondary      /* 70% white */
.text-muted          /* 60% white */
.text-disabled       /* 40% white */
```

---

## 📏 Spacing System

### Scale
```css
--space-xs: 0.25rem;   /* 4px - Tight spacing */
--space-sm: 0.5rem;    /* 8px - Small elements */
--space-md: 1rem;      /* 16px - Default spacing */
--space-lg: 1.5rem;    /* 24px - Section spacing */
--space-xl: 2rem;      /* 32px - Large spacing */
--space-2xl: 3rem;     /* 48px - Section gaps */
--space-3xl: 4rem;     /* 64px - Large sections */
```

### Usage
- **Component padding**: Use `--space-md` to `--space-xl`
- **Section spacing**: Use `--space-3xl` to `--space-5xl`
- **Inline spacing**: Use `--space-xs` to `--space-sm`

---

## 🔤 Typography

### Font Families
```css
--font-serif: 'Playfair Display', Georgia, serif;  /* Headlines */
--font-sans: 'Inter', system-ui, sans-serif;       /* Body text */
```

### Type Scale
```css
/* Headlines (serif) */
.text-8xl  /* 96px - Hero headlines */
.text-7xl  /* 72px - Page titles */
.text-6xl  /* 60px - Section titles */
.text-5xl  /* 48px - Large headings */

/* Body text (sans) */
.text-xl   /* 20px - Large body */
.text-lg   /* 18px - Emphasized body */
.text-base /* 16px - Default body */
.text-sm   /* 14px - Small text */
.text-xs   /* 12px - Captions */
```

### Usage Examples
```jsx
// Hero headline
<h1 className="font-serif text-6xl md:text-7xl lg:text-8xl">

// Section title
<h2 className="font-serif text-4xl md:text-5xl">

// Body text
<p className="text-lg text-secondary">

// Caption
<span className="text-xs text-muted">
```

---

## 🧩 Component Patterns

### Buttons

#### Primary Button
```jsx
<button className="btn-primary">
  Watch Reel
</button>
```

#### Secondary Button
```jsx
<button className="btn-secondary">
  Learn More
</button>
```

### Cards
```jsx
<div className="glass-dark rounded-2xl p-6">
  <!-- Content -->
</div>
```

### Glass Effects
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 🎭 Animation Guidelines

### Transitions
```css
--transition-fast: 150ms ease;   /* Hover states */
--transition-base: 300ms ease;   /* Default transitions */
--transition-slow: 500ms ease;   /* Page transitions */
```

### Common Animations
```css
/* Hover lift effect */
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Scale on hover */
.hover-scale:hover {
  transform: scale(1.05);
}

/* Glow effect */
.hover-glow:hover {
  box-shadow: var(--shadow-glow-blue);
}
```

---

## 📱 Responsive Design

### Breakpoints
```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

### Mobile-First Approach
```jsx
// Start with mobile styles, add larger screens
<div className="text-3xl md:text-4xl lg:text-5xl">
```

---

## ♿ Accessibility

### Focus States
All interactive elements must have visible focus states:
```css
.focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-background), 
              0 0 0 4px var(--color-primary);
}
```

### Color Contrast
- Normal text: Minimum 4.5:1 contrast ratio
- Large text: Minimum 3:1 contrast ratio
- Use `text-secondary` (70% opacity) for less important text
- Never go below `text-disabled` (40% opacity) for visible text

---

## 🚫 Anti-Patterns to Avoid

1. **Don't use inline color values**
   ```jsx
   // ❌ Bad
   <div style={{ color: '#00D4FF' }}>
   
   // ✅ Good
   <div className="text-accent-blue">
   ```

2. **Don't use arbitrary values**
   ```jsx
   // ❌ Bad
   <div className="p-[23px]">
   
   // ✅ Good
   <div className="p-6">
   ```

3. **Don't mix styling approaches**
   ```jsx
   // ❌ Bad - mixing Tailwind with inline styles
   <div className="text-white" style={{ opacity: 0.7 }}>
   
   // ✅ Good - use utility class
   <div className="text-secondary">
   ```

---

## 📝 CSS Variable Usage

Always prefer CSS variables for:
- Colors
- Spacing
- Typography sizes
- Border radius
- Transitions
- Shadows

Example:
```css
/* Instead of hardcoding */
.component {
  padding: 24px;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
}

/* Use variables */
.component {
  padding: var(--space-lg);
  color: var(--color-text-secondary);
  border-radius: var(--radius-xl);
}
```

---

## 🔧 Maintenance

1. **Adding new colors**: Add to `variables.css` first
2. **New components**: Create reusable classes in `App.css`
3. **Animations**: Define in `@keyframes` and reference by name
4. **Responsive**: Use Tailwind breakpoint prefixes consistently

---

*Last Updated: 2025-08-11*