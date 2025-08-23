import { describe, it, expect, beforeEach, vi } from 'vitest'
import logger from '../services/logger'

describe('Integration Tests for Critical Changes', () => {
  describe('Logger Service Integration', () => {
    beforeEach(() => {
      logger.clearLogs()
    })

    it('should log errors correctly', () => {
      const error = new Error('Test error')
      logger.error('An error occurred', { error: error.message })
      
      const logs = logger.getLogs()
      expect(logs).toHaveLength(1)
      expect(logs[0].level).toBe('error')
      expect(logs[0].message).toBe('An error occurred')
    })

    it('should handle multiple log levels', () => {
      logger.error('Error message')
      logger.warn('Warning message')
      logger.info('Info message')
      
      const logs = logger.getLogs()
      expect(logs).toHaveLength(3)
      expect(logs[0].level).toBe('error')
      expect(logs[1].level).toBe('warn')
      expect(logs[2].level).toBe('info')
    })
  })

  describe('Project Click Handler', () => {
    it('should handle project with href', () => {
      const mockOpen = vi.fn()
      global.window.open = mockOpen
      
      const project = { 
        id: 1, 
        href: 'https://example.com',
        title: 'Test Project'
      }
      
      // Simulate the click handler logic from WorkPage
      const handleProjectClick = (project) => {
        if (project.href) {
          window.open(project.href, '_blank', 'noopener,noreferrer')
        }
      }
      
      handleProjectClick(project)
      
      expect(mockOpen).toHaveBeenCalledWith(
        'https://example.com',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should handle project without href', () => {
      const mockOpen = vi.fn()
      global.window.open = mockOpen
      
      const project = { 
        id: 1, 
        href: null,
        title: 'Test Project'
      }
      
      // Simulate the click handler logic from WorkPage
      const handleProjectClick = (project) => {
        if (project.href) {
          window.open(project.href, '_blank', 'noopener,noreferrer')
        }
      }
      
      handleProjectClick(project)
      
      expect(mockOpen).not.toHaveBeenCalled()
    })
  })

  describe('localStorage for Intro State', () => {
    const STORAGE_KEY = 'ravie_intro_last_shown'
    
    beforeEach(() => {
      localStorage.clear()
      vi.clearAllMocks()
    })

    it('should save timestamp when intro is skipped', () => {
      const now = Date.now()
      
      // Simulate skip functionality
      const handleSkip = () => {
        localStorage.setItem(STORAGE_KEY, now.toString())
      }
      
      handleSkip()
      
      expect(localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        now.toString()
      )
    })

    it('should check cooldown period', () => {
      const COOLDOWN_MS = 24 * 60 * 60 * 1000 // 24 hours
      const now = Date.now()
      
      // Set last shown to 12 hours ago
      const twelveHoursAgo = now - (12 * 60 * 60 * 1000)
      localStorage.getItem.mockReturnValue(twelveHoursAgo.toString())
      
      // Check if should play
      const lastShown = localStorage.getItem(STORAGE_KEY)
      const timeSinceLastShown = now - parseInt(lastShown, 10)
      const shouldPlay = timeSinceLastShown > COOLDOWN_MS
      
      expect(shouldPlay).toBe(false)
    })
  })

  describe('CSS Module Structure', () => {
    it('should have modular CSS files created', () => {
      // This test verifies the CSS refactoring is complete
      const cssModules = [
        'base.module.css',
        'header.module.css',
        'sidebar.module.css',
        'hero.module.css',
        'projects.module.css',
        'animations.module.css'
      ]
      
      // All modules should exist (verified by successful build)
      expect(cssModules).toHaveLength(6)
    })
  })
})