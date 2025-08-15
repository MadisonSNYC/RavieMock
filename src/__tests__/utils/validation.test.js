import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validateText,
  validateURL,
  validateNumber,
  sanitizeHTML,
  validateFile
} from '../../utils/validation'

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@company.co.uk',
        'first+last@domain.org',
        'test123@test-domain.com'
      ]

      validEmails.forEach(email => {
        const result = validateEmail(email)
        expect(result.isValid).toBe(true)
        expect(result.error).toBeNull()
        expect(result.sanitized).toBe(email.toLowerCase())
      })
    })

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        '',
        'notanemail',
        '@example.com',
        'test@',
        'test@.com',
        'test @example.com',
        'test@example..com',
        null,
        undefined,
        123
      ]

      invalidEmails.forEach(email => {
        const result = validateEmail(email)
        expect(result.isValid).toBe(false)
        expect(result.error).toBeTruthy()
        expect(result.sanitized).toBeNull()
      })
    })

    it('should reject emails longer than 254 characters', () => {
      const longEmail = 'a'.repeat(250) + '@test.com'
      const result = validateEmail(longEmail)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('too long')
    })
  })

  describe('validateText', () => {
    it('should validate and sanitize text input', () => {
      const result = validateText('Hello World', { minLength: 5, maxLength: 20 })
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe('Hello World')
    })

    it('should remove XSS vectors', () => {
      const maliciousInputs = [
        '<script>alert("XSS")</script>Hello',
        'Hello<iframe src="evil.com"></iframe>',
        'javascript:alert(1)',
        'onclick=alert(1) Hello'
      ]

      maliciousInputs.forEach(input => {
        const result = validateText(input, { minLength: 1 })
        expect(result.isValid).toBe(true)
        expect(result.sanitized).not.toContain('<script')
        expect(result.sanitized).not.toContain('<iframe')
        expect(result.sanitized).not.toContain('javascript:')
        expect(result.sanitized).not.toContain('onclick=')
      })
    })

    it('should enforce length constraints', () => {
      const shortText = validateText('Hi', { minLength: 5 })
      expect(shortText.isValid).toBe(false)
      expect(shortText.error).toContain('at least 5')

      const longText = validateText('a'.repeat(101), { maxLength: 100 })
      expect(longText.isValid).toBe(false)
      expect(longText.error).toContain('less than 100')
    })

    it('should handle optional fields', () => {
      const result = validateText('', { required: false })
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe('')
    })

    it('should remove special characters when not allowed', () => {
      const result = validateText('Hello@#$World!', { allowSpecialChars: false })
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe('HelloWorld!')
    })
  })

  describe('validateURL', () => {
    it('should validate correct URLs', () => {
      const validURLs = [
        'https://example.com',
        'http://localhost:3000',
        'https://sub.domain.com/path?query=value',
        'https://example.com:8080/path'
      ]

      validURLs.forEach(url => {
        const result = validateURL(url)
        expect(result.isValid).toBe(true)
        expect(result.error).toBeNull()
        expect(result.sanitized).toBeTruthy()
      })
    })

    it('should reject dangerous protocols', () => {
      const dangerousURLs = [
        'javascript:alert(1)',
        'data:text/html,<script>alert(1)</script>',
        'file:///etc/passwd',
        'about:blank',
        'vbscript:alert(1)'
      ]

      dangerousURLs.forEach(url => {
        const result = validateURL(url)
        expect(result.isValid).toBe(false)
        expect(result.error).toBeTruthy()
      })
    })

    it('should only allow HTTP/HTTPS protocols', () => {
      const result = validateURL('ftp://example.com')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('HTTP/HTTPS')
    })

    it('should handle invalid URL formats', () => {
      const invalidURLs = ['not a url', 'http://', '://example.com', null, undefined]

      invalidURLs.forEach(url => {
        const result = validateURL(url)
        expect(result.isValid).toBe(false)
        expect(result.error).toBeTruthy()
      })
    })
  })

  describe('validateNumber', () => {
    it('should validate numbers within range', () => {
      const result = validateNumber(50, { min: 0, max: 100 })
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe(50)
    })

    it('should convert string numbers', () => {
      const result = validateNumber('42', { min: 0, max: 100 })
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe(42)
    })

    it('should enforce integer constraint', () => {
      const result = validateNumber(3.14, { integer: true })
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('whole number')
    })

    it('should enforce min/max constraints', () => {
      const tooSmall = validateNumber(-5, { min: 0 })
      expect(tooSmall.isValid).toBe(false)
      expect(tooSmall.error).toContain('at least 0')

      const tooBig = validateNumber(150, { max: 100 })
      expect(tooBig.isValid).toBe(false)
      expect(tooBig.error).toContain('at most 100')
    })

    it('should handle optional numbers', () => {
      const result = validateNumber(null, { required: false })
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBeNull()
    })

    it('should reject non-numeric values', () => {
      const result = validateNumber('not a number')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('valid number')
    })
  })

  describe('sanitizeHTML', () => {
    it('should escape HTML entities', () => {
      const html = '<script>alert("XSS")</script>'
      const sanitized = sanitizeHTML(html)
      
      expect(sanitized).not.toContain('<')
      expect(sanitized).not.toContain('>')
      expect(sanitized).toContain('&lt;')
      expect(sanitized).toContain('&gt;')
    })

    it('should escape quotes and slashes', () => {
      const html = '"quotes" and \'apostrophes\' and /slashes/'
      const sanitized = sanitizeHTML(html)
      
      expect(sanitized).toContain('&quot;')
      expect(sanitized).toContain('&#x27;')
      expect(sanitized).toContain('&#x2F;')
    })

    it('should handle empty or invalid input', () => {
      expect(sanitizeHTML('')).toBe('')
      expect(sanitizeHTML(null)).toBe('')
      expect(sanitizeHTML(undefined)).toBe('')
      expect(sanitizeHTML(123)).toBe('')
    })
  })

  describe('validateFile', () => {
    it('should validate file size', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' })
      Object.defineProperty(file, 'size', { value: 1024 }) // 1KB

      const result = validateFile(file, { maxSize: 2048 })
      expect(result.isValid).toBe(true)
    })

    it('should reject oversized files', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' })
      Object.defineProperty(file, 'size', { value: 10 * 1024 * 1024 }) // 10MB

      const result = validateFile(file, { maxSize: 5 * 1024 * 1024 })
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('5MB')
    })

    it('should validate file types', () => {
      const imageFile = new File([''], 'image.png', { type: 'image/png' })
      
      const validResult = validateFile(imageFile, { 
        allowedTypes: ['image/png', 'image/jpeg'] 
      })
      expect(validResult.isValid).toBe(true)

      const invalidResult = validateFile(imageFile, { 
        allowedTypes: ['application/pdf'] 
      })
      expect(invalidResult.isValid).toBe(false)
      expect(invalidResult.error).toContain('must be one of')
    })

    it('should reject executable files', () => {
      const dangerousFiles = [
        new File([''], 'virus.exe'),
        new File([''], 'script.bat'),
        new File([''], 'command.sh'),
        new File([''], 'script.ps1')
      ]

      dangerousFiles.forEach(file => {
        const result = validateFile(file)
        expect(result.isValid).toBe(false)
        expect(result.error).toContain('Executable files')
      })
    })

    it('should handle optional files', () => {
      const result = validateFile(null, { required: false })
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBeNull()
    })

    it('should reject invalid file objects', () => {
      const result = validateFile('not a file')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Invalid file object')
    })
  })
})