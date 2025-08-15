/**
 * Input validation utilities
 * All user inputs must be validated through these functions
 */

/**
 * Validates and sanitizes email addresses
 * @param {string} email - Email to validate
 * @returns {Object} Validation result
 */
export function validateEmail(email) {
  try {
    if (!email || typeof email !== 'string') {
      return { 
        isValid: false, 
        error: 'Email is required',
        sanitized: null 
      }
    }

    const trimmed = email.trim().toLowerCase()
    
    // Length validation
    if (trimmed.length > 254) {
      return { 
        isValid: false, 
        error: 'Email is too long',
        sanitized: null 
      }
    }

    // Pattern validation - RFC 5322 simplified
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
    
    if (!emailRegex.test(trimmed)) {
      return { 
        isValid: false, 
        error: 'Invalid email format',
        sanitized: null 
      }
    }

    return { 
      isValid: true, 
      error: null,
      sanitized: trimmed 
    }
  } catch (error) {
    console.error('Email validation error:', error)
    return { 
      isValid: false, 
      error: 'Validation error occurred',
      sanitized: null 
    }
  }
}

/**
 * Validates and sanitizes text input
 * @param {string} text - Text to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export function validateText(text, options = {}) {
  const {
    minLength = 1,
    maxLength = 1000,
    required = true,
    allowSpecialChars = false,
    fieldName = 'Field'
  } = options

  try {
    if (!text || typeof text !== 'string') {
      if (required) {
        return { 
          isValid: false, 
          error: `${fieldName} is required`,
          sanitized: null 
        }
      }
      return { 
        isValid: true, 
        error: null,
        sanitized: '' 
      }
    }

    // Remove potential XSS vectors
    let sanitized = text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim()

    // Length validation
    if (sanitized.length < minLength) {
      return { 
        isValid: false, 
        error: `${fieldName} must be at least ${minLength} characters`,
        sanitized: null 
      }
    }

    if (sanitized.length > maxLength) {
      return { 
        isValid: false, 
        error: `${fieldName} must be less than ${maxLength} characters`,
        sanitized: null 
      }
    }

    // Special characters validation
    if (!allowSpecialChars) {
      sanitized = sanitized.replace(/[^\w\s\-.,!?'"]/gi, '')
    }

    return { 
      isValid: true, 
      error: null,
      sanitized 
    }
  } catch (error) {
    console.error('Text validation error:', error)
    return { 
      isValid: false, 
      error: 'Validation error occurred',
      sanitized: null 
    }
  }
}

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {Object} Validation result
 */
export function validateURL(url) {
  try {
    if (!url || typeof url !== 'string') {
      return { 
        isValid: false, 
        error: 'URL is required',
        sanitized: null 
      }
    }

    const trimmed = url.trim()

    // Prevent javascript: and data: URLs
    if (trimmed.match(/^(javascript|data):/i)) {
      return { 
        isValid: false, 
        error: 'Invalid URL protocol',
        sanitized: null 
      }
    }

    try {
      const urlObject = new URL(trimmed)
      
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(urlObject.protocol)) {
        return { 
          isValid: false, 
          error: 'Only HTTP/HTTPS URLs allowed',
          sanitized: null 
        }
      }

      return { 
        isValid: true, 
        error: null,
        sanitized: urlObject.href 
      }
    } catch {
      return { 
        isValid: false, 
        error: 'Invalid URL format',
        sanitized: null 
      }
    }
  } catch (error) {
    console.error('URL validation error:', error)
    return { 
      isValid: false, 
      error: 'Validation error occurred',
      sanitized: null 
    }
  }
}

/**
 * Validates numeric input
 * @param {any} value - Value to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export function validateNumber(value, options = {}) {
  const {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    integer = false,
    required = true,
    fieldName = 'Number'
  } = options

  try {
    if (value === null || value === undefined || value === '') {
      if (required) {
        return { 
          isValid: false, 
          error: `${fieldName} is required`,
          sanitized: null 
        }
      }
      return { 
        isValid: true, 
        error: null,
        sanitized: null 
      }
    }

    const num = Number(value)

    if (isNaN(num)) {
      return { 
        isValid: false, 
        error: `${fieldName} must be a valid number`,
        sanitized: null 
      }
    }

    if (integer && !Number.isInteger(num)) {
      return { 
        isValid: false, 
        error: `${fieldName} must be a whole number`,
        sanitized: null 
      }
    }

    if (num < min) {
      return { 
        isValid: false, 
        error: `${fieldName} must be at least ${min}`,
        sanitized: null 
      }
    }

    if (num > max) {
      return { 
        isValid: false, 
        error: `${fieldName} must be at most ${max}`,
        sanitized: null 
      }
    }

    return { 
      isValid: true, 
      error: null,
      sanitized: num 
    }
  } catch (error) {
    console.error('Number validation error:', error)
    return { 
      isValid: false, 
      error: 'Validation error occurred',
      sanitized: null 
    }
  }
}

/**
 * Sanitizes HTML content to prevent XSS
 * @param {string} html - HTML to sanitize
 * @returns {string} Sanitized HTML
 */
export function sanitizeHTML(html) {
  if (!html || typeof html !== 'string') {
    return ''
  }

  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Validates file upload
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export function validateFile(file, options = {}) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = [],
    required = true
  } = options

  try {
    if (!file) {
      if (required) {
        return { 
          isValid: false, 
          error: 'File is required',
          sanitized: null 
        }
      }
      return { 
        isValid: true, 
        error: null,
        sanitized: null 
      }
    }

    if (!(file instanceof File)) {
      return { 
        isValid: false, 
        error: 'Invalid file object',
        sanitized: null 
      }
    }

    // Size validation
    if (file.size > maxSize) {
      return { 
        isValid: false, 
        error: `File size must be less than ${maxSize / 1024 / 1024}MB`,
        sanitized: null 
      }
    }

    // Type validation
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        error: `File type must be one of: ${allowedTypes.join(', ')}`,
        sanitized: null 
      }
    }

    // Check for executable files
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.ps1', '.app']
    const fileName = file.name.toLowerCase()
    if (dangerousExtensions.some(ext => fileName.endsWith(ext))) {
      return { 
        isValid: false, 
        error: 'Executable files are not allowed',
        sanitized: null 
      }
    }

    return { 
      isValid: true, 
      error: null,
      sanitized: file 
    }
  } catch (error) {
    console.error('File validation error:', error)
    return { 
      isValid: false, 
      error: 'Validation error occurred',
      sanitized: null 
    }
  }
}