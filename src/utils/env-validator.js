/**
 * Environment Variable Validator
 * Ensures all required environment variables are present and valid
 * Provides fallbacks and meaningful error messages
 */

import logger from '../services/logger'

// Define environment variable schema
const ENV_SCHEMA = {
  // Core Configuration
  NODE_ENV: {
    required: false,
    default: 'production',
    validate: (value) => ['development', 'production', 'test'].includes(value),
    description: 'Application environment'
  },
  
  // Security Configuration
  VITE_CSP_REPORT_URI: {
    required: false,
    default: null,
    validate: (value) => !value || value.startsWith('https://'),
    description: 'CSP violation report endpoint'
  },
  
  VITE_ALLOWED_ORIGINS: {
    required: false,
    default: 'https://ravie.co,https://www.ravie.co',
    validate: (value) => {
      if (!value) return true
      const origins = value.split(',')
      return origins.every(origin => origin.startsWith('http'))
    },
    description: 'Comma-separated list of allowed CORS origins'
  },
  
  // Rate Limiting
  VITE_RATE_LIMIT_MAX_REQUESTS: {
    required: false,
    default: '100',
    validate: (value) => !value || (!isNaN(value) && parseInt(value) > 0),
    description: 'Maximum requests per window'
  },
  
  VITE_RATE_LIMIT_WINDOW_MS: {
    required: false,
    default: '900000', // 15 minutes
    validate: (value) => !value || (!isNaN(value) && parseInt(value) > 0),
    description: 'Rate limit window in milliseconds'
  },
  
  // API Configuration
  VITE_API_URL: {
    required: false,
    default: null,
    validate: (value) => !value || value.startsWith('http'),
    description: 'Backend API URL'
  },
  
  // Analytics
  VITE_ANALYTICS_ID: {
    required: false,
    default: null,
    validate: (value) => true, // Any string is valid
    description: 'Analytics tracking ID'
  }
}

class EnvironmentValidator {
  constructor() {
    this.errors = []
    this.warnings = []
    this.validated = {}
  }

  /**
   * Validate all environment variables
   * @returns {Object} Validation result with errors and warnings
   */
  validate() {
    this.errors = []
    this.warnings = []
    this.validated = {}

    // Check for Vite environment
    const isVite = typeof import.meta !== 'undefined' && import.meta.env
    const env = isVite ? import.meta.env : process.env

    for (const [key, config] of Object.entries(ENV_SCHEMA)) {
      const value = env[key]
      
      // Check if required but missing
      if (config.required && !value) {
        this.errors.push({
          key,
          message: `Required environment variable ${key} is not set`,
          description: config.description
        })
        continue
      }

      // Use default if not provided
      const finalValue = value || config.default
      
      // Skip validation if no value and not required
      if (!finalValue && !config.required) {
        this.validated[key] = null
        continue
      }

      // Validate the value
      if (finalValue && config.validate && !config.validate(finalValue)) {
        this.errors.push({
          key,
          message: `Invalid value for ${key}: ${finalValue}`,
          description: config.description
        })
        continue
      }

      // Store validated value
      this.validated[key] = finalValue

      // Add warning for missing optional variables in production
      if (!value && !config.required && env.NODE_ENV === 'production') {
        this.warnings.push({
          key,
          message: `Optional variable ${key} not set, using default: ${config.default}`,
          description: config.description
        })
      }
    }

    return {
      isValid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      values: this.validated
    }
  }

  /**
   * Get a validated environment variable
   * @param {string} key - Environment variable key
   * @returns {string|null} The validated value or null
   */
  get(key) {
    if (!(key in this.validated)) {
      logger.warn(`Accessing unvalidated environment variable: ${key}`)
      return null
    }
    return this.validated[key]
  }

  /**
   * Get all validated environment variables
   * @returns {Object} All validated values
   */
  getAll() {
    return { ...this.validated }
  }

  /**
   * Check if running in development mode
   * @returns {boolean}
   */
  isDevelopment() {
    return this.validated.NODE_ENV === 'development'
  }

  /**
   * Check if running in production mode
   * @returns {boolean}
   */
  isProduction() {
    return this.validated.NODE_ENV === 'production'
  }

  /**
   * Check if running in test mode
   * @returns {boolean}
   */
  isTest() {
    return this.validated.NODE_ENV === 'test'
  }

  /**
   * Log validation results
   */
  logResults() {
    if (this.errors.length > 0) {
      if (logger && logger.error) {
        logger.error('Environment validation failed', { errors: this.errors })
      }
      this.errors.forEach(error => {
        console.error(`❌ ${error.message}`)
        console.error(`   ${error.description}`)
      })
    }

    if (this.warnings.length > 0) {
      if (logger && logger.warn) {
        logger.warn('Environment validation warnings', { warnings: this.warnings })
      }
      if (this.isDevelopment()) {
        this.warnings.forEach(warning => {
          console.warn(`⚠️  ${warning.message}`)
        })
      }
    }

    if (this.errors.length === 0) {
      if (logger && logger.info) {
        logger.info('Environment validation successful', {
          validatedCount: Object.keys(this.validated).length
        })
      }
    }
  }
}

// Create singleton instance
const envValidator = new EnvironmentValidator()

// Validate on module load
const validationResult = envValidator.validate()

// Log results in development
if (import.meta.env?.DEV || process.env?.NODE_ENV === 'development') {
  envValidator.logResults()
}

// Throw error if validation fails in production
if (!validationResult.isValid && envValidator.isProduction()) {
  const errorMessages = validationResult.errors.map(e => e.message).join('\n')
  throw new Error(`Environment validation failed:\n${errorMessages}`)
}

// Export validated environment variables
export const env = envValidator.getAll()

// Export validator instance for advanced usage
export default envValidator

// Export convenience functions
export const isDevelopment = () => envValidator.isDevelopment()
export const isProduction = () => envValidator.isProduction()
export const isTest = () => envValidator.isTest()
export const getEnv = (key) => envValidator.get(key)