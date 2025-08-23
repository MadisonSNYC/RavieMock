// Real Ravie.co projects data
export const projects = [
  {
    id: 'coinbase',
    title: 'Coinbase: OnChain Vision',
    client: 'Coinbase',
    description: 'Pioneering a new way for audiences to engage with creators, we showed the world how.',
    category: 'Launch Film',
    industry: 'Crypto',
    metrics: '2.5M+ Views',
    url: 'https://ravie.co/the-work/coinbase',
    thumbnail: 'CoinbaseThumbnail.webp',
    size: 'large', // Takes up 2x2 space in bento grid
    tier: 1,
    featured: true
  },
  {
    id: 'loops',
    title: 'Ravie Loops',
    client: 'Internal',
    description: 'We\'ve made one short almost every week for 2 years. Here they are 25 Million Views Later.',
    category: 'Social Content',
    industry: 'Marketing',
    metrics: '25M+ Views',
    url: 'https://ravie.co/the-work/loops',
    thumbnail: 'LoopsWP.webp',
    size: 'wide', // Takes up 2x1 space
    tier: 1,
    featured: true
  },
  {
    id: 'keller-williams',
    title: 'Keller Williams Conference',
    client: 'Keller Williams',
    description: 'A titan of the real estate industry. Here\'s how we energized their agents.',
    category: 'Event Visuals',
    industry: 'Real Estate',
    metrics: '27k+ Attendees',
    url: 'https://ravie.co/the-work/kw',
    thumbnail: 'kwthmb.webp',
    size: 'tall', // Takes up 1x2 space
    tier: 1,
    featured: true
  },
  {
    id: 'jhene-aiko',
    title: 'Coachella 2024: Jhené Aiko',
    client: 'Coachella',
    description: 'Concert visuals for Jhené Aiko\'s Coachella performance.',
    category: 'Concert Visuals',
    industry: 'Entertainment',
    metrics: 'Live Event',
    url: 'https://ravie.co/the-work/jheneaiko',
    thumbnail: 'JheneThmb.webp',
    size: 'normal',
    tier: 1,
    featured: true
  },
  {
    id: 'ozone',
    title: 'Ozone.pro Brand Film',
    client: 'Ozone.pro',
    description: 'Brand identity and launch campaign for the SaaS platform.',
    category: 'Brand Identity',
    industry: 'SaaS',
    metrics: 'Brand Launch',
    url: 'https://ravie.co/the-work/ozone',
    thumbnail: 'Ozonethmb1.webp',
    size: 'normal',
    tier: 1,
    featured: true
  },
  {
    id: 'osos',
    title: 'OSOS Campaign',
    client: 'OSOS',
    description: 'Creative campaign for OSOS brand.',
    category: 'Brand Campaign',
    industry: 'Fashion',
    metrics: 'Campaign Launch',
    url: 'https://ravie.co/the-work/osos',
    thumbnail: 'ososthmb.webp',
    size: 'normal',
    tier: 2,
    featured: false
  },
  {
    id: 'chick-fil-a',
    title: 'Chick-fil-A Campaign',
    client: 'Chick-fil-A',
    description: 'Marketing campaign for Chick-fil-A.',
    category: 'Marketing',
    industry: 'Food & Beverage',
    metrics: 'National Campaign',
    url: 'https://ravie.co/the-work/cfa',
    thumbnail: 'cfathmb.webp',
    size: 'normal',
    tier: 2,
    featured: false
  },
  {
    id: 'space-and-time',
    title: 'Space & Time AI Launch',
    client: 'Space & Time',
    description: 'Product launch campaign for AI platform.',
    category: 'Product Launch',
    industry: 'AI',
    metrics: '250k+ Views',
    url: 'https://ravie.co/the-work/spaceandtime',
    thumbnail: 'Rectangle+75.webp',
    size: 'normal',
    tier: 2,
    featured: false
  },
  {
    id: 'publix',
    title: 'Club Publix How-To Series',
    client: 'Publix',
    description: 'Educational content series for Club Publix.',
    category: 'Educational Content',
    industry: 'Retail',
    metrics: 'Content Series',
    url: 'https://ravie.co/the-work/publix',
    thumbnail: 'image.png',
    size: 'normal',
    tier: 2,
    featured: false
  },
  {
    id: 'crunchyroll',
    title: 'Crunchyroll Campaign',
    client: 'Crunchyroll',
    description: 'Marketing campaign for anime streaming platform.',
    category: 'Marketing',
    industry: 'Entertainment',
    metrics: 'Streaming Campaign',
    url: 'https://ravie.co/the-work/crunchyroll',
    thumbnail: 'image.png',
    size: 'normal',
    tier: 2,
    featured: false
  },
  {
    id: 'grow',
    title: 'Grow Campaign',
    client: 'Grow',
    description: 'Brand campaign for Grow platform.',
    category: 'Brand Campaign',
    industry: 'SaaS',
    metrics: 'Platform Launch',
    url: 'https://ravie.co/the-work/grow',
    thumbnail: 'image.png',
    size: 'normal',
    tier: 3,
    featured: false
  },
  {
    id: 'gameplan',
    title: 'GamePlan Campaign',
    client: 'GamePlan',
    description: 'Marketing campaign for GamePlan platform.',
    category: 'Marketing',
    industry: 'Sports Tech',
    metrics: 'Campaign Launch',
    url: 'https://ravie.co/the-work/gameplan',
    thumbnail: 'image.png',
    size: 'normal',
    tier: 3,
    featured: false
  }
]

// Filter functions for different views
export const getFeaturedProjects = () => projects.filter(p => p.featured)
export const getTier1Projects = () => projects.filter(p => p.tier === 1)
export const getAllProjects = () => projects
export const getProjectsByCategory = (category) => projects.filter(p => p.category === category)
export const getProjectsByIndustry = (industry) => projects.filter(p => p.industry === industry)

