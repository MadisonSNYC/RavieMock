/**
 * IntroSequence Constants
 * Centralized configuration for the intro animation sequence
 */

// Timeline constants (in ms) - 5 second intro
export const TIMELINE = {
  total: 5000,                              // 5s total
  preroll: { start: 0, end: 0 },           // Skip word cycle
  mosaic: { start: 0, end: 1600 },         // 1.6s for mosaic reveal
  leftSlide: { start: 1600, end: 2400 },   // 0.8s for slide
  pause: { start: 2400, end: 2500 },       // 0.1s brief pause
  secondary: { start: 2500, end: 4400 },   // 1.9s for text with "And Counting" and logo
  reveal: { start: 4400, end: 5000 }       // 0.6s for final reveal
}

export const STAGGER_DELAY = 90 // ms between each tile

// Word cycle configuration - optimized for readability
export const WORD_CYCLE_CONFIG = {
  prefixes: ["create", "build", "launch", "move", "inspire"],
  colors: [
    "linear-gradient(135deg, #FF006E 0%, #FF4D8F 100%)",  // Pink-red for "create"
    "linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)",  // Cyan-blue for "build"
    "linear-gradient(135deg, #FFD600 0%, #FF9900 100%)",  // Yellow-orange for "launch"
    "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",  // Purple for "move"
    "linear-gradient(135deg, #10B981 0%, #34D399 100%)"   // Green for "inspire"
  ],
  perWordMs: 1000,     // 1 second per word for comfortable reading
  startDelayMs: 800    // 0.8s initial pause to set the mood
}

// Thumbnail paths
export const THUMBNAILS = {
  coinbase: '/Thumbs/CoinbaseThumbnail.webp',
  loops: '/Thumbs/Loopsthumb.webp',
  kw: '/Thumbs/kwthmb.webp',
  jhene: '/Thumbs/JheneThmb.webp',
  ozone: '/Thumbs/Ozonethmb1.webp',
  osos: '/Thumbs/ososthmb.webp',
  cfa: '/Thumbs/cfathmb.webp',
  publix: '/Thumbs/Pubthmb.webp',
  crunchyroll: '/Thumbs/crunchyrollthmb.webp',
  gameplan: '/Thumbs/gameplanthmb.webp',
  grow: '/Thumbs/growThmb.webp',
  stt: '/Thumbs/s&tthmb.webp'
}

// Logo paths
export const LOGOS = {
  ravieAsset: '/Assts/Ravie Logos/Group 3.png',
  raviePublic: '/Assts/Ravie Logos/Group 3.png'
}

// Mosaic tiles configuration (5x3 grid - perfect checkerboard)
// Pattern: M=Media, B=Black
export const MOSAIC_TILES = [
  // Row 0
  { id: 1, src: THUMBNAILS.coinbase, row: 0, col: 0 },  // M
  { id: 2, row: 0, col: 1, isBlack: true },             // B
  { id: 3, src: THUMBNAILS.kw, row: 0, col: 2 },        // M
  { id: 4, row: 0, col: 3, isBlack: true },             // B
  { id: 5, src: THUMBNAILS.loops, row: 0, col: 4 },     // M
  // Row 1  
  { id: 6, row: 1, col: 0, isBlack: true },             // B
  { id: 7, src: THUMBNAILS.jhene, row: 1, col: 1 },     // M
  { id: 8, row: 1, col: 2, isBlack: true },             // B
  { id: 9, src: THUMBNAILS.crunchyroll, row: 1, col: 3 }, // M
  { id: 10, row: 1, col: 4, isBlack: true },            // B
  // Row 2
  { id: 11, src: THUMBNAILS.osos, row: 2, col: 0 },     // M
  { id: 12, row: 2, col: 1, isBlack: true },            // B
  { id: 13, src: THUMBNAILS.cfa, row: 2, col: 2 },      // M
  { id: 14, row: 2, col: 3, isBlack: true },            // B
  { id: 15, src: THUMBNAILS.publix, row: 2, col: 4 }    // M
]