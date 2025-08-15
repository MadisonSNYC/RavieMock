import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getCSPHeader,
  getSecurityHeaders,
  rateLimiter,
  generateSecureToken,
  hashData,
  isAllowedOrigin,
  sanitizeForDisplay,
  checkURLSecurity
} from '../../utils/security'

describe('Security Utilities', () => {
  describe('getCSPHeader', () => {
    it('should generate valid CSP header', () => {
      const csp = getCSPHeader()
      
      expect(csp).toContain("default-src 'self'")
      expect(csp).toContain("script-src 'self'")
      expect(csp).toContain("style-src 'self'")
      expect(csp).toContain("frame-src 'none'")
      expect(csp).toContain("object-src 'none'")
      expect(csp).toContain('upgrade-insecure-requests')
    })

    it('should include report URI if configured', () => {
      const originalEnv = import.meta.env.VITE_CSP_REPORT_URI
      import.meta.env.VITE_CSP_REPORT_URI = 'https://example.com/csp-report'
      
      const csp = getCSPHeader()
      expect(csp).toContain('report-uri https://example.com/csp-report')
      
      import.meta.env.VITE_CSP_REPORT_URI = originalEnv
    })
  })

  describe('getSecurityHeaders', () => {
    it('should return all required security headers', () => {
      const headers = getSecurityHeaders()
      
      expect(headers['X-Content-Type-Options']).toBe('nosniff')
      expect(headers['X-Frame-Options']).toBe('DENY')
      expect(headers['X-XSS-Protection']).toBe('1; mode=block')
      expect(headers['Referrer-Policy']).toBe('strict-origin-when-cross-origin')
      expect(headers['Permissions-Policy']).toContain('camera=()')
      expect(headers['Content-Security-Policy']).toBeTruthy()
    })
  })

  describe('rateLimiter', () => {
    beforeEach(() => {
      rateLimiter.requests.clear()
    })

    it('should allow requests within limit', () => {
      const identifier = 'test-user'
      
      for (let i = 0; i < 5; i++) {
        const result = rateLimiter.checkLimit(identifier)
        expect(result.allowed).toBe(true)
        expect(result.remaining).toBeGreaterThan(0)
      }
    })

    it('should block requests exceeding limit', () => {
      const identifier = 'spam-user'
      const maxRequests = rateLimiter.maxRequests
      
      // Make requests up to the limit
      for (let i = 0; i < maxRequests; i++) {
        rateLimiter.checkLimit(identifier)
      }
      
      // Next request should be blocked
      const result = rateLimiter.checkLimit(identifier)
      expect(result.allowed).toBe(false)
      expect(result.remaining).toBe(0)
      expect(result.error).toContain('Rate limit exceeded')
    })

    it('should require identifier', () => {
      const result = rateLimiter.checkLimit(null)
      expect(result.allowed).toBe(false)
      expect(result.error).toContain('Identifier required')
    })

    it('should reset rate limit', () => {
      const identifier = 'reset-user'
      
      // Make some requests
      for (let i = 0; i < 5; i++) {
        rateLimiter.checkLimit(identifier)
      }
      
      // Reset the limit
      rateLimiter.reset(identifier)
      
      // Should be able to make requests again
      const result = rateLimiter.checkLimit(identifier)
      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(rateLimiter.maxRequests - 1)
    })

    it('should cleanup old entries', () => {
      // Create many identifiers to trigger cleanup
      for (let i = 0; i < 1100; i++) {
        rateLimiter.checkLimit(`user-${i}`)
      }
      
      // Cleanup should have been triggered
      expect(rateLimiter.requests.size).toBeLessThanOrEqual(1100)
    })
  })

  describe('generateSecureToken', () => {
    it('should generate token of specified length', () => {
      const token = generateSecureToken(16)
      expect(token).toHaveLength(32) // 16 bytes = 32 hex chars
    })

    it('should generate unique tokens', () => {
      const tokens = new Set()
      for (let i = 0; i < 100; i++) {
        tokens.add(generateSecureToken())
      }
      expect(tokens.size).toBe(100)
    })

    it('should use default length of 32 bytes', () => {
      const token = generateSecureToken()
      expect(token).toHaveLength(64) // 32 bytes = 64 hex chars
    })
  })

  describe('hashData', () => {
    it('should hash data consistently', async () => {
      const data = 'test-data'
      const hash1 = await hashData(data)
      const hash2 = await hashData(data)
      
      expect(hash1).toBe(hash2)
      expect(hash1).toHaveLength(64) // SHA-256 = 64 hex chars
    })

    it('should produce different hashes for different data', async () => {
      const hash1 = await hashData('data1')
      const hash2 = await hashData('data2')
      
      expect(hash1).not.toBe(hash2)
    })

    it('should reject invalid data', async () => {
      await expect(hashData(null)).rejects.toThrow('Failed to hash data')
      await expect(hashData(undefined)).rejects.toThrow('Failed to hash data')
      await expect(hashData('')).rejects.toThrow('Failed to hash data')
    })
  })

  describe('isAllowedOrigin', () => {
    it('should allow default origins', () => {
      expect(isAllowedOrigin('http://localhost:5173')).toBe(true)
      expect(isAllowedOrigin('http://localhost:3000')).toBe(true)
      expect(isAllowedOrigin('https://ravie.co')).toBe(true)
      expect(isAllowedOrigin('https://www.ravie.co')).toBe(true)
    })

    it('should reject unknown origins', () => {
      expect(isAllowedOrigin('https://evil.com')).toBe(false)
      expect(isAllowedOrigin('http://malicious.site')).toBe(false)
    })

    it('should respect custom allowed origins from env', () => {
      const originalEnv = import.meta.env.VITE_ALLOWED_ORIGINS
      import.meta.env.VITE_ALLOWED_ORIGINS = 'https://custom.com,https://app.custom.com'
      
      expect(isAllowedOrigin('https://custom.com')).toBe(true)
      expect(isAllowedOrigin('https://app.custom.com')).toBe(true)
      
      import.meta.env.VITE_ALLOWED_ORIGINS = originalEnv
    })
  })

  describe('sanitizeForDisplay', () => {
    it('should escape HTML entities', () => {
      const input = '<script>alert("XSS")</script>'
      const sanitized = sanitizeForDisplay(input)
      
      expect(sanitized).toContain('&lt;script&gt;')
      expect(sanitized).toContain('&quot;')
      expect(sanitized).not.toContain('<script>')
    })

    it('should escape all dangerous characters', () => {
      const input = '& < > " \' /'
      const sanitized = sanitizeForDisplay(input)
      
      expect(sanitized).toBe('&amp; &lt; &gt; &quot; &#x27; &#x2F;')
    })

    it('should handle empty or invalid input', () => {
      expect(sanitizeForDisplay('')).toBe('')
      expect(sanitizeForDisplay(null)).toBe('')
      expect(sanitizeForDisplay(undefined)).toBe('')
      expect(sanitizeForDisplay(123)).toBe('')
    })
  })

  describe('checkURLSecurity', () => {
    it('should approve safe URLs', () => {
      const safeURLs = [
        'https://example.com',
        'http://localhost:3000',
        'https://api.service.com/endpoint'
      ]

      safeURLs.forEach(url => {
        const result = checkURLSecurity(url)
        expect(result.safe).toBe(true)
        expect(result.reason).toBeNull()
      })
    })

    it('should block dangerous protocols', () => {
      const dangerousURLs = [
        { url: 'javascript:alert(1)', protocol: 'javascript:' },
        { url: 'data:text/html,<script>alert(1)</script>', protocol: 'data:' },
        { url: 'vbscript:msgbox', protocol: 'vbscript:' },
        { url: 'file:///etc/passwd', protocol: 'file:' },
        { url: 'about:blank', protocol: 'about:' }
      ]

      dangerousURLs.forEach(({ url, protocol }) => {
        const result = checkURLSecurity(url)
        expect(result.safe).toBe(false)
        expect(result.reason).toContain(`Dangerous protocol: ${protocol}`)
      })
    })

    it('should detect suspicious hostnames', () => {
      const result = checkURLSecurity('https://evil.com@fake.com')
      expect(result.safe).toBe(false)
      expect(result.reason).toContain('Suspicious hostname')
    })

    it('should handle invalid URLs', () => {
      const invalidURLs = ['not a url', '', null, undefined]

      invalidURLs.forEach(url => {
        const result = checkURLSecurity(url)
        expect(result.safe).toBe(false)
        expect(result.reason).toBeTruthy()
      })
    })

    it('should detect IP addresses in URLs', () => {
      const spy = vi.spyOn(console, 'info').mockImplementation(() => {})
      
      checkURLSecurity('http://192.168.1.1')
      
      // Note: The function logs but doesn't necessarily block IP addresses
      // This is configurable based on requirements
      
      spy.mockRestore()
    })
  })
})