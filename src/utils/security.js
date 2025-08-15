/**
 * Security utilities for the application
 * Implements defense-in-depth security measures
 */

import logger from '../services/logger'

/**
 * Content Security Policy configuration
 * @returns {string} CSP header value
 */
export function getCSPHeader() {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://vitals.vercel-insights.com",
    "media-src 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ]

  // Add report URI if configured
  const reportUri = import.meta.env.VITE_CSP_REPORT_URI
  if (reportUri) {
    directives.push(`report-uri ${reportUri}`)
  }

  return directives.join('; ')
}

/**
 * Security headers configuration
 * @returns {Object} Security headers
 */
export function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': getCSPHeader()
  }
}

/**
 * Rate limiting implementation
 */
class RateLimiter {
  constructor(maxRequests = 100, windowMs = 900000) {
    this.maxRequests = parseInt(import.meta.env.VITE_RATE_LIMIT_MAX_REQUESTS) || maxRequests
    this.windowMs = parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW_MS) || windowMs
    this.requests = new Map()
  }

  /**
   * Check if request should be allowed
   * @param {string} identifier - Unique identifier (IP, user ID, etc.)
   * @returns {Object} Rate limit result
   */
  checkLimit(identifier) {
    try {
      if (!identifier) {
        return { 
          allowed: false, 
          remaining: 0,
          resetTime: null,
          error: 'Identifier required' 
        }
      }

      const now = Date.now()
      const userRequests = this.requests.get(identifier) || []
      
      // Clean old requests
      const validRequests = userRequests.filter(
        timestamp => now - timestamp < this.windowMs
      )

      if (validRequests.length >= this.maxRequests) {
        const oldestRequest = Math.min(...validRequests)
        const resetTime = new Date(oldestRequest + this.windowMs)
        
        logger.warn('Rate limit exceeded', { 
          identifier,
          requests: validRequests.length,
          maxRequests: this.maxRequests
        })

        return { 
          allowed: false, 
          remaining: 0,
          resetTime,
          error: 'Rate limit exceeded' 
        }
      }

      // Add current request
      validRequests.push(now)
      this.requests.set(identifier, validRequests)

      // Clean up old identifiers periodically
      if (this.requests.size > 1000) {
        this.cleanup()
      }

      return { 
        allowed: true, 
        remaining: this.maxRequests - validRequests.length,
        resetTime: null,
        error: null
      }
    } catch (error) {
      logger.error('Rate limiter error', { error: error.message })
      return { 
        allowed: true, // Fail open to prevent DoS
        remaining: 0,
        resetTime: null,
        error: 'Rate limiter error' 
      }
    }
  }

  /**
   * Clean up old entries
   */
  cleanup() {
    const now = Date.now()
    for (const [identifier, requests] of this.requests.entries()) {
      const validRequests = requests.filter(
        timestamp => now - timestamp < this.windowMs
      )
      
      if (validRequests.length === 0) {
        this.requests.delete(identifier)
      } else {
        this.requests.set(identifier, validRequests)
      }
    }
  }

  /**
   * Reset rate limit for identifier
   * @param {string} identifier - Unique identifier
   */
  reset(identifier) {
    this.requests.delete(identifier)
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter()

/**
 * Secure random token generation
 * @param {number} length - Token length
 * @returns {string} Secure random token
 */
export function generateSecureToken(length = 32) {
  try {
    const array = new Uint8Array(length)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  } catch (error) {
    logger.error('Token generation error', { error: error.message })
    throw new Error('Failed to generate secure token')
  }
}

/**
 * Hash sensitive data (client-side only, for comparison)
 * @param {string} data - Data to hash
 * @returns {Promise<string>} Hashed data
 */
export async function hashData(data) {
  try {
    if (!data || typeof data !== 'string') {
      throw new Error('Invalid data for hashing')
    }

    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
  } catch (error) {
    logger.error('Hashing error', { error: error.message })
    throw new Error('Failed to hash data')
  }
}

/**
 * Verify origin for CORS
 * @param {string} origin - Request origin
 * @returns {boolean} Whether origin is allowed
 */
export function isAllowedOrigin(origin) {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ravie.co',
    'https://www.ravie.co'
  ]

  // Add custom allowed origins from env
  const customOrigins = import.meta.env.VITE_ALLOWED_ORIGINS
  if (customOrigins) {
    allowedOrigins.push(...customOrigins.split(',').map(o => o.trim()))
  }

  return allowedOrigins.includes(origin)
}

/**
 * Sanitize user input for display
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
export function sanitizeForDisplay(input) {
  if (!input || typeof input !== 'string') {
    return ''
  }

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Check for common security issues in URLs
 * @param {string} url - URL to check
 * @returns {Object} Security check result
 */
export function checkURLSecurity(url) {
  try {
    if (!url || typeof url !== 'string') {
      return { safe: false, reason: 'Invalid URL' }
    }

    const dangerous = [
      'javascript:',
      'data:',
      'vbscript:',
      'file:',
      'about:',
      'chrome:',
      'chrome-extension:'
    ]

    const lowerUrl = url.toLowerCase().trim()
    
    for (const protocol of dangerous) {
      if (lowerUrl.startsWith(protocol)) {
        logger.warn('Dangerous URL protocol detected', { url, protocol })
        return { safe: false, reason: `Dangerous protocol: ${protocol}` }
      }
    }

    try {
      const urlObj = new URL(url)
      
      // Check for suspicious patterns in the entire URL
      if (url.includes('@') && !url.startsWith('mailto:')) {
        return { safe: false, reason: 'Suspicious hostname' }
      }

      // Check for IP addresses (optional, depending on requirements)
      const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/
      if (ipRegex.test(urlObj.hostname)) {
        logger.info('IP address detected in URL', { url })
        // You might want to allow or block this based on requirements
      }

      return { safe: true, reason: null }
    } catch {
      return { safe: false, reason: 'Invalid URL format' }
    }
  } catch (error) {
    logger.error('URL security check error', { error: error.message })
    return { safe: false, reason: 'Security check failed' }
  }
}

export default {
  getSecurityHeaders,
  rateLimiter,
  generateSecureToken,
  hashData,
  isAllowedOrigin,
  sanitizeForDisplay,
  checkURLSecurity
}