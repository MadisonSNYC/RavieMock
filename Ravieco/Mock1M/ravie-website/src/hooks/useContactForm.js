/**
 * useContactForm Hook
 * Handles contact form state, validation, and submission
 */

import { useState, useEffect } from 'react'
import { validateEmail, validateText } from '../utils/validation'
import { checkURLSecurity, csrfProtection, generateSecureToken } from '../utils/security'
import logger from '../services/logger'

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: ''
}

export default function useContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [csrfToken, setCsrfToken] = useState(null)
  const [sessionId, setSessionId] = useState(null)

  // Initialize CSRF protection on mount
  useEffect(() => {
    // Generate or retrieve session ID
    let sid = sessionStorage.getItem('sessionId')
    if (!sid) {
      sid = generateSecureToken(16)
      sessionStorage.setItem('sessionId', sid)
    }
    setSessionId(sid)

    // Generate CSRF token for this session
    const token = csrfProtection.generateToken(sid)
    setCsrfToken(token)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Validate name
    const nameValidation = validateText(formData.name, {
      minLength: 1,
      maxLength: 100,
      fieldName: 'Name'
    })
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error || 'Name is required'
    }
    
    // Validate email
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error || 'Valid email is required'
    }
    
    // Validate message
    const messageValidation = validateText(formData.message, {
      minLength: 10,
      maxLength: 1000,
      fieldName: 'Message'
    })
    if (!messageValidation.isValid) {
      newErrors.message = messageValidation.error || 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      logger.log('Form validation failed', { errors })
      return
    }

    // Validate CSRF token
    if (!csrfToken || !sessionId) {
      logger.error('CSRF token missing')
      setErrors({ submit: 'Security token missing. Please refresh the page.' })
      return
    }

    const csrfValidation = csrfProtection.validateToken(sessionId, csrfToken)
    if (!csrfValidation.valid) {
      logger.error('CSRF validation failed', { error: csrfValidation.error })
      setErrors({ submit: 'Security validation failed. Please refresh the page and try again.' })
      
      // Generate new token for retry
      const newToken = csrfProtection.generateToken(sessionId)
      setCsrfToken(newToken)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create mailto link
      const subject = `Project Inquiry from ${formData.name}`
      const body = `Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Service: ${formData.service}
Budget: ${formData.budget}

Message:
${formData.message}`
      
      const mailtoLink = `mailto:hello@ravie.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      
      // Validate URL before redirect (mailto is safe but validate anyway)
      const urlCheck = checkURLSecurity(mailtoLink)
      if (!urlCheck.safe && !mailtoLink.startsWith('mailto:')) {
        throw new Error(`Invalid redirect URL: ${urlCheck.reason}`)
      }
      
      window.location.href = mailtoLink
      
      logger.log('Contact form submitted successfully', { formData })
      setIsSubmitted(true)
    } catch (error) {
      logger.error('Contact form submission failed', error)
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE)
    setErrors({})
    setIsSubmitted(false)
    setIsSubmitting(false)
  }

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    csrfToken,
    handleInputChange,
    handleSubmit,
    resetForm
  }
}