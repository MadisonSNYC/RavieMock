/**
 * CSRF Protection Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { csrfProtection, generateSecureToken } from '../../utils/security'

describe('CSRF Protection', () => {
  beforeEach(() => {
    // Clear all tokens before each test
    csrfProtection.tokens.clear()
  })

  describe('generateToken', () => {
    it('should generate a token for valid session ID', () => {
      const sessionId = 'test-session-123'
      const token = csrfProtection.generateToken(sessionId)
      
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.length).toBe(64) // 32 bytes = 64 hex chars
    })

    it('should throw error for missing session ID', () => {
      expect(() => csrfProtection.generateToken()).toThrow('Failed to generate CSRF token')
      expect(() => csrfProtection.generateToken(null)).toThrow('Failed to generate CSRF token')
      expect(() => csrfProtection.generateToken('')).toThrow('Failed to generate CSRF token')
    })

    it('should generate different tokens for different sessions', () => {
      const token1 = csrfProtection.generateToken('session1')
      const token2 = csrfProtection.generateToken('session2')
      
      expect(token1).not.toBe(token2)
    })
  })

  describe('validateToken', () => {
    it('should validate a correct token', () => {
      const sessionId = 'test-session'
      const token = csrfProtection.generateToken(sessionId)
      
      const result = csrfProtection.validateToken(sessionId, token)
      
      expect(result.valid).toBe(true)
      expect(result.error).toBeNull()
    })

    it('should reject missing session ID or token', () => {
      const sessionId = 'test-session'
      const token = csrfProtection.generateToken(sessionId)
      
      expect(csrfProtection.validateToken(null, token).valid).toBe(false)
      expect(csrfProtection.validateToken(sessionId, null).valid).toBe(false)
      expect(csrfProtection.validateToken(null, null).valid).toBe(false)
    })

    it('should reject invalid token', () => {
      const sessionId = 'test-session'
      csrfProtection.generateToken(sessionId)
      
      const result = csrfProtection.validateToken(sessionId, 'invalid-token')
      
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Invalid token')
    })

    it('should reject token from different session', () => {
      const token1 = csrfProtection.generateToken('session1')
      const result = csrfProtection.validateToken('session2', token1)
      
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Invalid or expired token')
    })

    it('should reject already used token', () => {
      const sessionId = 'test-session'
      const token = csrfProtection.generateToken(sessionId)
      
      // First validation should succeed
      const result1 = csrfProtection.validateToken(sessionId, token)
      expect(result1.valid).toBe(true)
      
      // Second validation should fail (token already used)
      const result2 = csrfProtection.validateToken(sessionId, token)
      expect(result2.valid).toBe(false)
      expect(result2.error).toBe('Token already used')
    })

    it('should reject expired token', () => {
      const sessionId = 'test-session'
      const token = csrfProtection.generateToken(sessionId)
      
      // Manually expire the token
      const tokenData = csrfProtection.tokens.get(sessionId)
      tokenData.createdAt = Date.now() - (csrfProtection.tokenLifetime + 1000)
      csrfProtection.tokens.set(sessionId, tokenData)
      
      const result = csrfProtection.validateToken(sessionId, token)
      
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Token expired')
    })
  })

  describe('refreshToken', () => {
    it('should generate new token for session', () => {
      const sessionId = 'test-session'
      const token1 = csrfProtection.generateToken(sessionId)
      const token2 = csrfProtection.refreshToken(sessionId)
      
      expect(token2).toBeDefined()
      expect(token2).not.toBe(token1)
      
      // Old token should be invalid
      const result1 = csrfProtection.validateToken(sessionId, token1)
      expect(result1.valid).toBe(false)
      
      // New token should be valid
      const result2 = csrfProtection.validateToken(sessionId, token2)
      expect(result2.valid).toBe(true)
    })
  })

  describe('getToken', () => {
    it('should return token for valid session', () => {
      const sessionId = 'test-session'
      const token = csrfProtection.generateToken(sessionId)
      
      const retrieved = csrfProtection.getToken(sessionId)
      
      expect(retrieved).toBe(token)
    })

    it('should return null for non-existent session', () => {
      const retrieved = csrfProtection.getToken('non-existent')
      
      expect(retrieved).toBeNull()
    })

    it('should return null for expired token', () => {
      const sessionId = 'test-session'
      csrfProtection.generateToken(sessionId)
      
      // Manually expire the token
      const tokenData = csrfProtection.tokens.get(sessionId)
      tokenData.createdAt = Date.now() - (csrfProtection.tokenLifetime + 1000)
      csrfProtection.tokens.set(sessionId, tokenData)
      
      const retrieved = csrfProtection.getToken(sessionId)
      
      expect(retrieved).toBeNull()
    })
  })

  describe('cleanupExpiredTokens', () => {
    it('should remove expired tokens', () => {
      // Create some tokens
      const session1 = 'session1'
      const session2 = 'session2'
      const session3 = 'session3'
      
      csrfProtection.generateToken(session1)
      csrfProtection.generateToken(session2)
      csrfProtection.generateToken(session3)
      
      // Expire first two tokens
      const token1 = csrfProtection.tokens.get(session1)
      const token2 = csrfProtection.tokens.get(session2)
      token1.createdAt = Date.now() - (csrfProtection.tokenLifetime + 1000)
      token2.createdAt = Date.now() - (csrfProtection.tokenLifetime + 1000)
      csrfProtection.tokens.set(session1, token1)
      csrfProtection.tokens.set(session2, token2)
      
      expect(csrfProtection.tokens.size).toBe(3)
      
      csrfProtection.cleanupExpiredTokens()
      
      expect(csrfProtection.tokens.size).toBe(1)
      expect(csrfProtection.tokens.has(session3)).toBe(true)
      expect(csrfProtection.tokens.has(session1)).toBe(false)
      expect(csrfProtection.tokens.has(session2)).toBe(false)
    })
  })
})