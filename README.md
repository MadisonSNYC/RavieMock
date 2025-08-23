# Ravie - Premium Motion Design Portfolio

A modern, high-performance portfolio website showcasing premium motion design and creative work for luxury brands.

## Overview

Ravie is a sophisticated portfolio platform built with React and Vite, featuring smooth animations, responsive design, and an elegant user experience. The site showcases work for prestigious clients including Coinbase, Loops, Keller Williams, and more.

## Features

- **Animated Intro Sequence** - Engaging loading animation with brand reveal
- **Dynamic Hero Section** - Full-screen hero with animated backgrounds and smooth transitions
- **Project Showcase** - Bento grid layout with featured projects and interactive cards
- **Project Directory** - Comprehensive project listing with filtering capabilities
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Performance Optimized** - Fast loading times with code splitting and lazy loading
- **Smooth Animations** - Framer Motion powered animations throughout

## Tech Stack

- **Framework:** React 19.1
- **Build Tool:** Vite 7.1
- **Styling:** Tailwind CSS 4.1
- **Animations:** Framer Motion 12.15
- **Routing:** React Router DOM 7.6
- **Icons:** Lucide React
- **Testing:** Vitest

## Installation

1. Clone the repository:
```bash
git clone https://github.com/MadisonSNYC/RavieMock 
cd ravie-website
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your settings
```

4. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage report

## Testing

The project includes a comprehensive test suite with 127 tests covering:

- **Unit Tests** - Component logic, hooks, and utilities
- **Integration Tests** - User flows and component interactions  
- **Security Tests** - Input validation, CSP, and sanitization
- **Performance Tests** - Render times and optimization checks

### Current Test Status
- **Total Tests:** 127
- **Passing:** 126 (99.2%)
- **Skipped:** 1 (0.8%)
- **Failing:** 0 (0%)
- **Last Updated:** August 17, 2025

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test validation.test.js
```

### Test Coverage

- **Components**: ~70% coverage
- **Utilities**: ~85% coverage
- **Security**: 100% coverage
- **Integration**: Full critical path coverage

## Project Structure

```
ravie-website/
├── src/
│   ├── assets/          # Images, logos, and media files
│   ├── components/      # Reusable React components
│   │   ├── hero/       # Hero section components
│   │   ├── intro/      # Intro animation components
│   │   ├── projects/   # Project showcase components
│   │   └── directory/  # Project directory components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── constants/      # App constants
│   ├── data/          # Static data (projects, etc.)
│   └── services/      # API and external services
├── public/            # Static public assets
├── dist/             # Production build output
└── __tests__/        # Test files
    ├── components/   # Component tests
    ├── hooks/       # Hook tests
    ├── utils/       # Utility tests
    ├── integration/ # Integration tests
    ├── security/    # Security tests
    └── performance/ # Performance tests
```

## Key Components

### HomePage (`src/pages/HomePage.jsx`)
Main landing page with hero, projects showcase, and about section.

### IntroSequence (`src/components/intro/IntroSequence.jsx`)
Animated loading sequence that plays on first visit.

### ProjectsBentoGrid (`src/components/ProjectsBentoGrid.jsx`)
Grid layout showcasing featured projects with hover effects.

### ProjectDirectory (`src/components/ProjectDirectory.jsx`)
Comprehensive project listing with search and filter capabilities.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_APP_TITLE=Ravie
VITE_API_URL=your_api_url_here
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Features

### Implemented Security Measures
- **Environment Variable Validation** - All env vars validated at startup
- **Content Security Policy (CSP)** - Comprehensive CSP headers
- **Input Validation** - All form inputs validated and sanitized
- **URL Security** - Protection against open redirects and malicious URLs
- **Rate Limiting** - Built-in rate limiter for API protection
- **XSS Protection** - Input sanitization and secure rendering
- **CORS Configuration** - Dynamic origin validation
- **Error Handling** - Comprehensive error handling for all async operations

### Security Configuration
See `.env.example` for available security configuration options.

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## Deployment

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/MadisonSNYC/RVM1)

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MadisonSNYC/RVM1)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.

## Contact

For inquiries about the portfolio or potential collaborations, please reach out through the contact form on the website.

## Acknowledgments

- Design and Development by Ravie
- Built with React and Vite
- Animations powered by Framer Motion
- Icons by Lucide React

---

© 2025 Ravie. All rights reserved.