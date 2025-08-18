/**
 * Security utilities for the application
 * Implements defense-in-depth security measures
 */

import logger from '../services/logger'
import { getEnv } from './env-validator'

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
  const reportUri = getEnv('VITE_CSP_REPORT_URI')
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
 * Rate limiting implementation with automatic cleanup
 */
class RateLimiter {
  constructor(maxRequests = 100, windowMs = 900000) {
    this.maxRequests = parseInt(getEnv('VITE_RATE_LIMIT_MAX_REQUESTS')) || maxRequests
    this.windowMs = parseInt(getEnv('VITE_RATE_LIMIT_WINDOW_MS')) || windowMs
    this.requests = new Map()
    this.lastCleanup = Date.now()
    this.cleanupInterval = Math.min(windowMs / 2, 60000) // Cleanup every minute or half window
    this.maxMapSize = 500 // Lower threshold for cleanup
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
      
      // Perform time-based cleanup
      if (now - this.lastCleanup > this.cleanupInterval) {
        this.cleanup()
      }
      
      const userRequests = this.requests.get(identifier) || []
      
      // Clean old requests for this user
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

      // Emergency cleanup if map gets too large
      if (this.requests.size > this.maxMapSize) {
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
    let cleaned = 0
    
    for (const [identifier, requests] of this.requests.entries()) {
      const validRequests = requests.filter(
        timestamp => now - timestamp < this.windowMs
      )
      
      if (validRequests.length === 0) {
        this.requests.delete(identifier)
        cleaned++
      } else if (validRequests.length !== requests.length) {
        // Update with cleaned array to save memory
        this.requests.set(identifier, validRequests)
      }
    }
    
    this.lastCleanup = now
    
    if (cleaned > 0) {
      logger.debug('Rate limiter cleanup', { 
        entriesRemoved: cleaned, 
        remainingEntries: this.requests.size 
      })
    }
  }

  /**
   * Reset rate limit for identifier
   * @param {string} identifier - Unique identifier
   */
  reset(identifier) {
    this.requests.delete(identifier)
  }
  
  /**
   * Get current memory usage stats
   * @returns {Object} Memory stats
   */
  getStats() {
    let totalRequests = 0
    for (const requests of this.requests.values()) {
      totalRequests += requests.length
    }
    
    return {
      identifiers: this.requests.size,
      totalRequests,
      lastCleanup: new Date(this.lastCleanup),
      nextCleanup: new Date(this.lastCleanup + this.cleanupInterval)
    }
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter()

/**
 * CSRF Protection implementation
 */
class CSRFProtection {
  constructor() {
    this.tokens = new Map()
    this.tokenLifetime = 3600000 // 1 hour
    this.tokenLength = 32
  }

  /**
   * Generate a new CSRF token for a session
   * @param {string} sessionId - Session identifier
   * @returns {string} CSRF token
   */
  generateToken(sessionId) {
    try {
      if (!sessionId) {
        throw new Error('Session ID required for CSRF token')
      }

      // Generate secure random token
      const token = generateSecureToken(this.tokenLength)
      
      // Store token with timestamp
      this.tokens.set(sessionId, {
        token,
        createdAt: Date.now(),
        used: false
      })

      // Clean old tokens
      this.cleanupExpiredTokens()

      logger.debug('CSRF token generated', { sessionId })
      return token
    } catch (error) {
      logger.error('CSRF token generation failed', { error: error.message })
      throw new Error('Failed to generate CSRF token')
    }
  }

  /**
   * Validate a CSRF token
   * @param {string} sessionId - Session identifier
   * @param {string} token - Token to validate
   * @returns {Object} Validation result
   */
  validateToken(sessionId, token) {
    try {
      if (!sessionId || !token) {
        return {
          valid: false,
          error: 'Missing session ID or token'
        }
      }

      const tokenData = this.tokens.get(sessionId)
      
      if (!tokenData) {
        logger.warn('CSRF validation failed - token not found', { sessionId })
        return {
          valid: false,
          error: 'Invalid or expired token'
        }
      }

      // Check if token matches
      if (tokenData.token !== token) {
        logger.warn('CSRF validation failed - token mismatch', { sessionId })
        return {
          valid: false,
          error: 'Invalid token'
        }
      }

      // Check if token is expired
      const now = Date.now()
      if (now - tokenData.createdAt > this.tokenLifetime) {
        this.tokens.delete(sessionId)
        logger.warn('CSRF validation failed - token expired', { sessionId })
        return {
          valid: false,
          error: 'Token expired'
        }
      }

      // Check if token was already used (for single-use tokens)
      if (tokenData.used) {
        logger.warn('CSRF validation failed - token already used', { sessionId })
        return {
          valid: false,
          error: 'Token already used'
        }
      }

      // Mark token as used (optional - remove for multi-use tokens)
      tokenData.used = true
      this.tokens.set(sessionId, tokenData)

      return {
        valid: true,
        error: null
      }
    } catch (error) {
      logger.error('CSRF validation error', { error: error.message })
      return {
        valid: false,
        error: 'Validation error'
      }
    }
  }

  /**
   * Refresh a token for a session
   * @param {string} sessionId - Session identifier
   * @returns {string} New CSRF token
   */
  refreshToken(sessionId) {
    this.tokens.delete(sessionId)
    return this.generateToken(sessionId)
  }

  /**
   * Clean up expired tokens
   */
  cleanupExpiredTokens() {
    const now = Date.now()
    let cleaned = 0

    for (const [sessionId, tokenData] of this.tokens.entries()) {
      if (now - tokenData.createdAt > this.tokenLifetime) {
        this.tokens.delete(sessionId)
        cleaned++
      }
    }

    if (cleaned > 0) {
      logger.debug('CSRF tokens cleaned', { count: cleaned })
    }
  }

  /**
   * Get token for session (if exists and valid)
   * @param {string} sessionId - Session identifier
   * @returns {string|null} Token or null
   */
  getToken(sessionId) {
    const tokenData = this.tokens.get(sessionId)
    if (!tokenData) return null

    const now = Date.now()
    if (now - tokenData.createdAt > this.tokenLifetime) {
      this.tokens.delete(sessionId)
      return null
    }

    return tokenData.token
  }
}

// Export singleton instance
export const csrfProtection = new CSRFProtection()

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
  const allowedOrigins = []

  // Get allowed origins from environment variable
  const configuredOrigins = getEnv('VITE_ALLOWED_ORIGINS')
  if (configuredOrigins) {
    allowedOrigins.push(...configuredOrigins.split(',').map(o => o.trim()))
  }

  // Add localhost origins in development only
  const nodeEnv = getEnv('NODE_ENV')
  if (nodeEnv === 'development' || nodeEnv === 'test') {
    allowedOrigins.push('http://localhost:5173')
    allowedOrigins.push('http://localhost:3000')
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

    // Special handling for mailto: links
    if (lowerUrl.startsWith('mailto:')) {
      // Validate mailto link structure
      if (!url.match(/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+/)) {
        return { safe: false, reason: 'Invalid mailto format' }
      }
      return { safe: true, reason: null }
    }

    try {
      const urlObj = new URL(url)
      
      // Check for suspicious patterns in the entire URL
      if (url.includes('@')) {
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
  csrfProtection,
  generateSecureToken,
  hashData,
  isAllowedOrigin,
  sanitizeForDisplay,
  checkURLSecurity
}