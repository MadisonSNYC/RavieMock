/**
 * Application-wide constants
 * Centralizes magic numbers and configuration values
 * All values are validated and documented
 */

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

export const ANIMATION = {
  // Durations in milliseconds
  DURATION: {
    INSTANT: 0,
    FAST: 200,
    BASE: 400,
    SLOW: 600,
    VERY_SLOW: 1000,
    INTRO_PHASE: 2000,
    INTRO_TOTAL: 6000
  },
  
  // Easing functions
  EASING: {
    LINEAR: 'linear',
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
    SMOOTH: 'cubic-bezier(0.23, 1, 0.32, 1)',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  // Delays
  DELAY: {
    NONE: 0,
    SHORT: 100,
    MEDIUM: 200,
    LONG: 400,
    STAGGER: 50 // For staggered animations
  }
}

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================

export const LAYOUT = {
  // Breakpoints (in pixels)
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    LAPTOP: 1024,
    DESKTOP: 1280,
    WIDE: 1536
  },
  
  // Spacing (in pixels or rem)
  SPACING: {
    XS: 8,
    SM: 16,
    MD: 24,
    LG: 32,
    XL: 48,
    XXL: 64,
    XXXL: 96
  },
  
  // Container widths
  CONTAINER: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1400,
    FULL: '100%'
  },
  
  // Z-index layers
  Z_INDEX: {
    BACKGROUND: -1,
    BASE: 0,
    DROPDOWN: 10,
    STICKY: 50,
    HEADER: 100,
    OVERLAY: 500,
    MODAL: 1000,
    POPOVER: 1100,
    TOOLTIP: 1200,
    TOAST: 1300,
    MAX: 9999
  }
}

// ============================================================================
// FORM CONSTANTS
// ============================================================================

export const FORM = {
  // Input limits
  INPUT: {
    NAME_MIN: 2,
    NAME_MAX: 100,
    EMAIL_MAX: 254,
    MESSAGE_MIN: 10,
    MESSAGE_MAX: 1000,
    COMPANY_MAX: 100,
    PHONE_MAX: 20,
    URL_MAX: 2000
  },
  
  // File upload
  FILE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.ms-excel'],
    MAX_FILES: 10
  },
  
  // Validation patterns
  PATTERNS: {
    EMAIL: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    PHONE: /^[\d\s\-\+\(\)]+$/,
    URL: /^https?:\/\/.+/,
    ALPHANUMERIC: /^[a-zA-Z0-9]+$/
  }
}

// ============================================================================
// API CONSTANTS
// ============================================================================

export const API = {
  // Timeouts (in milliseconds)
  TIMEOUT: {
    SHORT: 5000,
    DEFAULT: 30000,
    LONG: 60000,
    UPLOAD: 120000
  },
  
  // Rate limiting
  RATE_LIMIT: {
    MAX_REQUESTS: 100,
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000
  },
  
  // HTTP status codes
  STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    RATE_LIMITED: 429,
    SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  }
}

// ============================================================================
// STORAGE CONSTANTS
// ============================================================================

export const STORAGE = {
  // LocalStorage keys
  KEYS: {
    INTRO_LAST_SHOWN: 'ravie_intro_last_shown',
    USER_PREFERENCES: 'ravie_user_preferences',
    THEME: 'ravie_theme',
    LANGUAGE: 'ravie_language',
    CONSENT: 'ravie_cookie_consent'
  },
  
  // Cache durations (in milliseconds)
  CACHE: {
    SHORT: 5 * 60 * 1000, // 5 minutes
    MEDIUM: 15 * 60 * 1000, // 15 minutes
    LONG: 60 * 60 * 1000, // 1 hour
    DAY: 24 * 60 * 60 * 1000, // 24 hours
    WEEK: 7 * 24 * 60 * 60 * 1000 // 1 week
  },
  
  // Size limits
  LIMITS: {
    MAX_STORAGE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_ITEM_SIZE: 1 * 1024 * 1024 // 1MB
  }
}

// ============================================================================
// PERFORMANCE CONSTANTS
// ============================================================================

export const PERFORMANCE = {
  // Debounce and throttle delays
  DEBOUNCE: {
    SEARCH: 300,
    RESIZE: 150,
    SCROLL: 100,
    INPUT: 500
  },
  
  // Lazy loading
  LAZY_LOAD: {
    ROOT_MARGIN: '50px',
    THRESHOLD: 0.1,
    DELAY: 100
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 100,
    INITIAL_LOAD: 6
  },
  
  // Performance budgets
  BUDGETS: {
    FCP: 2000, // First Contentful Paint
    LCP: 2500, // Largest Contentful Paint
    FID: 100, // First Input Delay
    CLS: 0.1, // Cumulative Layout Shift
    TTI: 3500 // Time to Interactive
  }
}

// ============================================================================
// SECURITY CONSTANTS
// ============================================================================

export const SECURITY = {
  // Session
  SESSION: {
    TIMEOUT: 30 * 60 * 1000, // 30 minutes
    WARNING_TIME: 5 * 60 * 1000, // 5 minutes before timeout
    REFRESH_INTERVAL: 5 * 60 * 1000 // 5 minutes
  },
  
  // Password requirements
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true
  },
  
  // Token
  TOKEN: {
    LENGTH: 32,
    EXPIRY: 60 * 60 * 1000, // 1 hour
    REFRESH_EXPIRY: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}

// ============================================================================
// UI CONSTANTS
// ============================================================================

export const UI = {
  // Toast notifications
  TOAST: {
    DURATION: 5000,
    POSITION: 'bottom-right',
    MAX_VISIBLE: 3
  },
  
  // Modal
  MODAL: {
    ANIMATION_DURATION: 300,
    BACKDROP_OPACITY: 0.5,
    MAX_WIDTH: 600
  },
  
  // Tooltips
  TOOLTIP: {
    DELAY: 500,
    OFFSET: 8,
    MAX_WIDTH: 250
  },
  
  // Loading states
  LOADING: {
    MIN_DISPLAY_TIME: 500,
    SKELETON_ANIMATION_DURATION: 1500
  }
}

// ============================================================================
// BUSINESS CONSTANTS
// ============================================================================

export const BUSINESS = {
  // Project categories
  CATEGORIES: [
    'Launch Film',
    'Social Content',
    'Event Visuals',
    'Brand Identity',
    'Concert Visuals',
    'Commercial',
    'Music Video'
  ],
  
  // Industries
  INDUSTRIES: [
    'Technology',
    'Entertainment',
    'Fashion',
    'Finance',
    'Healthcare',
    'Education',
    'Retail'
  ],
  
  // Budget ranges
  BUDGET_RANGES: [
    { label: 'Under $10k', value: '0-10000' },
    { label: '$10k - $25k', value: '10000-25000' },
    { label: '$25k - $50k', value: '25000-50000' },
    { label: '$50k - $100k', value: '50000-100000' },
    { label: 'Over $100k', value: '100000+' }
  ]
}

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURES = {
  ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
  ENABLE_DEBUG_MODE: process.env.NODE_ENV === 'development',
  ENABLE_INTRO_ANIMATION: true,
  ENABLE_PERFORMANCE_MONITORING: true,
  ENABLE_ERROR_REPORTING: true,
  ENABLE_A11Y_FEATURES: true,
  ENABLE_EXPERIMENTAL: false
}

// Freeze all objects to prevent accidental mutations
Object.freeze(ANIMATION)
Object.freeze(LAYOUT)
Object.freeze(FORM)
Object.freeze(API)
Object.freeze(STORAGE)
Object.freeze(PERFORMANCE)
Object.freeze(SECURITY)
Object.freeze(UI)
Object.freeze(BUSINESS)
Object.freeze(FEATURES)

export default {
  ANIMATION,
  LAYOUT,
  FORM,
  API,
  STORAGE,
  PERFORMANCE,
  SECURITY,
  UI,
  BUSINESS,
  FEATURES
}