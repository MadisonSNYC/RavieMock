import { describe, it, expect, vi, beforeEach } from 'vitest'
import logger from '../../services/logger'

describe('Logger Service', () => {
  beforeEach(() => {
    // Clear logs before each test
    logger.clearLogs()
    // Reset console mocks
    vi.clearAllMocks()
  })

  describe('log levels', () => {
    it('should log error messages', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      logger.error('Test error', { code: 500 })
      
      expect(consoleSpy).toHaveBeenCalled()
      const logs = logger.getLogs()
      expect(logs).toHaveLength(1)
      expect(logs[0].level).toBe('error')
      expect(logs[0].message).toBe('Test error')
      expect(logs[0].data).toEqual({ code: 500 })
      
      consoleSpy.mockRestore()
    })

    it('should log warning messages', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      logger.warn('Test warning', { type: 'deprecation' })
      
      expect(consoleSpy).toHaveBeenCalled()
      const logs = logger.getLogs()
      expect(logs).toHaveLength(1)
      expect(logs[0].level).toBe('warn')
      expect(logs[0].message).toBe('Test warning')
      
      consoleSpy.mockRestore()
    })

    it('should log info messages', () => {
      const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
      
      logger.info('Test info', { user: 'test' })
      
      expect(consoleSpy).toHaveBeenCalled()
      const logs = logger.getLogs()
      expect(logs).toHaveLength(1)
      expect(logs[0].level).toBe('info')
      expect(logs[0].message).toBe('Test info')
      
      consoleSpy.mockRestore()
    })

    it('should log debug messages in development', () => {
      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
      
      logger.debug('Test debug', { verbose: true })
      
      // Debug logs are only shown in development
      if (logger.isDevelopment) {
        expect(consoleSpy).toHaveBeenCalled()
      }
      
      consoleSpy.mockRestore()
    })
  })

  describe('log management', () => {
    it('should store multiple logs', () => {
      logger.error('Error 1')
      logger.warn('Warning 1')
      logger.info('Info 1')
      
      const logs = logger.getLogs()
      expect(logs).toHaveLength(3)
    })

    it('should clear logs', () => {
      logger.error('Error 1')
      logger.warn('Warning 1')
      
      expect(logger.getLogs()).toHaveLength(2)
      
      logger.clearLogs()
      
      expect(logger.getLogs()).toHaveLength(0)
    })

    it('should include timestamp in logs', () => {
      logger.info('Test message')
      
      const logs = logger.getLogs()
      expect(logs[0].timestamp).toBeDefined()
      expect(new Date(logs[0].timestamp)).toBeInstanceOf(Date)
    })
  })
})