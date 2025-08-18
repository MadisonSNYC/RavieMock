import { describe, it, expect, vi } from 'vitest'
import {
  validateEmail,
  validateText,
  validateURL,
  validateNumber,
  validateFile
} from '../../utils/validation'

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    // VAL-001: Email validation with XSS prevention
    it('should validate correct email formats', () => {
      const validEmails = [
        'user@example.com',
        'test.user+tag@domain.co.uk',
        'name123@sub.domain.org'
      ]
      
      validEmails.forEach(email => {
        const result = validateEmail(email)
        expect(result.isValid).toBe(true)
        expect(result.sanitized).toBe(email.toLowerCase())
      })
    })

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        '',
        'notanemail',
        '@domain.com',
        'user@',
        'user@.com',
        'user@domain',
        'user @domain.com',
        '<script>alert("xss")</script>@domain.com'
      ]
      
      invalidEmails.forEach(email => {
        const result = validateEmail(email)
        expect(result.isValid).toBe(false)
        expect(result.error).toBeDefined()
      })
    })

    it('should handle boundary cases', () => {
      // Maximum length email (254 chars total)
      const longEmail = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(61)
      expect(validateEmail(longEmail).isValid).toBe(true)
      
      // Just over maximum
      const tooLongEmail = longEmail + 'x'
      expect(validateEmail(tooLongEmail).isValid).toBe(false)
    })

    it('should sanitize and normalize emails', () => {
      const result = validateEmail('  User.Name@EXAMPLE.COM  ')
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe('user.name@example.com')
    })
  })

  describe('validateText', () => {
    // VAL-002: Text validation with sanitization
    it('should validate text within length limits', () => {
      const result = validateText('Valid text content', { minLength: 1, maxLength: 100 })
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe('Valid text content')
    })

    it('should reject text outside length limits', () => {
      expect(validateText('', { minLength: 1, maxLength: 100 }).isValid).toBe(false)
      expect(validateText('x'.repeat(101), { minLength: 1, maxLength: 100 }).isValid).toBe(false)
    })

    it('should sanitize HTML and script tags', () => {
      const maliciousText = 'Hello <script>alert("xss")</script> World'
      const result = validateText(maliciousText, { minLength: 1, maxLength: 100 })
      expect(result.isValid).toBe(true)
      expect(result.sanitized).not.toContain('<script>')
      expect(result.sanitized).not.toContain('</script>')
    })

    it('should handle exact boundary lengths', () => {
      const exactMin = validateText('x', { minLength: 1, maxLength: 100 })
      expect(exactMin.isValid).toBe(true)
      
      const exactMax = validateText('x'.repeat(100), { minLength: 1, maxLength: 100 })
      expect(exactMax.isValid).toBe(true)
    })

    it('should preserve unicode characters', () => {
      const unicodeText = 'Hello 世界 🌍 émojis'
      const result = validateText(unicodeText, { minLength: 1, maxLength: 100, allowSpecialChars: true })
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe(unicodeText)
    })
  })

  describe('validateURL', () => {
    it('should validate correct URLs', () => {
      const validURLs = [
        'https://example.com',
        'http://sub.domain.org/path',
        'https://example.com:8080/path?query=value#hash'
      ]
      
      validURLs.forEach(url => {
        expect(validateURL(url).isValid).toBe(true)
      })
    })

    it('should reject dangerous protocols', () => {
      const dangerousURLs = [
        'javascript:alert(1)',
        'data:text/html,<script>alert(1)</script>',
        'vbscript:msgbox',
        'file:///etc/passwd'
      ]
      
      dangerousURLs.forEach(url => {
        expect(validateURL(url).isValid).toBe(false)
      })
    })
  })

  describe('validateNumber', () => {
    it('should validate numbers within range', () => {
      expect(validateNumber(5, { min: 1, max: 10 }).isValid).toBe(true)
      expect(validateNumber(1, { min: 1, max: 10 }).isValid).toBe(true)
      expect(validateNumber(10, { min: 1, max: 10 }).isValid).toBe(true)
    })

    it('should reject numbers outside range', () => {
      expect(validateNumber(0, { min: 1, max: 10 }).isValid).toBe(false)
      expect(validateNumber(11, { min: 1, max: 10 }).isValid).toBe(false)
      expect(validateNumber(NaN, { min: 1, max: 10 }).isValid).toBe(false)
    })

    it('should handle floating point numbers', () => {
      expect(validateNumber(5.5, { min: 1, max: 10 }).isValid).toBe(true)
      expect(validateNumber(0.9999, { min: 1, max: 10 }).isValid).toBe(false)
    })
  })

  describe('validateFile', () => {
    it('should validate files within size and type limits', () => {
      // Create a proper File object
      const mockFile = new File(['test content'], 'test.jpg', {
        type: 'image/jpeg'
      })
      // Override size property for testing
      Object.defineProperty(mockFile, 'size', {
        value: 5 * 1024 * 1024, // 5MB
        writable: false
      })
      
      const result = validateFile(mockFile, { maxSize: 10 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/png'] })
      expect(result.isValid).toBe(true)
    })

    it('should reject oversized files', () => {
      // Create a proper File object
      const mockFile = new File(['test content'], 'large.jpg', {
        type: 'image/jpeg'
      })
      // Override size property for testing
      Object.defineProperty(mockFile, 'size', {
        value: 11 * 1024 * 1024, // 11MB
        writable: false
      })
      
      const result = validateFile(mockFile, { maxSize: 10 * 1024 * 1024, allowedTypes: ['image/jpeg'] })
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('size')
    })

    it('should reject invalid file types', () => {
      // Create a proper File object
      const mockFile = new File(['test content'], 'virus.exe', {
        type: 'application/x-executable'
      })
      // Override size property for testing
      Object.defineProperty(mockFile, 'size', {
        value: 1024,
        writable: false
      })
      
      const result = validateFile(mockFile, { maxSize: 10 * 1024 * 1024, allowedTypes: ['image/jpeg'] })
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('type')
    })
  })
})