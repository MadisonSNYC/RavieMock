/**
 * Custom hook for project filtering logic
 * Eliminates duplicate code between WorkPage and ProjectDirectory
 * Implements validation and security checks
 */

import { useState, useMemo, useCallback } from 'react'
import { validateText } from '../utils/validation'
import logger from '../services/logger'

/**
 * Hook for managing project filters with validation
 * @param {Array} projects - Array of project objects
 * @param {Object} options - Configuration options
 * @returns {Object} Filter state and handlers
 */
export function useProjectFilters(projects = [], options = {}) {
  const {
    initialCategory = 'All',
    initialIndustry = 'All',
    enableSearch = false,
    maxSearchLength = 100
  } = options

  // Validate initial values
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const validation = validateText(initialCategory, { 
      maxLength: 50, 
      required: false 
    })
    return validation.isValid ? validation.sanitized : 'All'
  })

  const [selectedIndustry, setSelectedIndustry] = useState(() => {
    const validation = validateText(initialIndustry, { 
      maxLength: 50, 
      required: false 
    })
    return validation.isValid ? validation.sanitized : 'All'
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [filterError, setFilterError] = useState(null)

  // Extract unique categories and industries with validation
  const categories = useMemo(() => {
    try {
      const uniqueCategories = new Set(['All'])
      
      projects.forEach(project => {
        if (project?.category) {
          const validation = validateText(project.category, { 
            maxLength: 50, 
            required: false 
          })
          if (validation.isValid && validation.sanitized) {
            uniqueCategories.add(validation.sanitized)
          }
        }
      })
      
      return Array.from(uniqueCategories)
    } catch (error) {
      logger.error('Error extracting categories', { error: error.message })
      return ['All']
    }
  }, [projects])

  const industries = useMemo(() => {
    try {
      const uniqueIndustries = new Set(['All'])
      
      projects.forEach(project => {
        if (project?.industry) {
          const validation = validateText(project.industry, { 
            maxLength: 50, 
            required: false 
          })
          if (validation.isValid && validation.sanitized) {
            uniqueIndustries.add(validation.sanitized)
          }
        }
      })
      
      return Array.from(uniqueIndustries)
    } catch (error) {
      logger.error('Error extracting industries', { error: error.message })
      return ['All']
    }
  }, [projects])

  // Filter projects with validation and error handling
  const filteredProjects = useMemo(() => {
    try {
      if (!Array.isArray(projects)) {
        logger.warn('Invalid projects array provided to filter')
        return []
      }

      return projects.filter(project => {
        if (!project) return false

        // Category filter
        const categoryMatch = selectedCategory === 'All' || 
          project.category === selectedCategory

        // Industry filter
        const industryMatch = selectedIndustry === 'All' || 
          project.industry === selectedIndustry

        // Search filter (if enabled)
        let searchMatch = true
        if (enableSearch && searchQuery) {
          const query = searchQuery.toLowerCase()
          searchMatch = (
            project.title?.toLowerCase().includes(query) ||
            project.description?.toLowerCase().includes(query) ||
            project.category?.toLowerCase().includes(query) ||
            project.industry?.toLowerCase().includes(query)
          )
        }

        return categoryMatch && industryMatch && searchMatch
      })
    } catch (error) {
      logger.error('Error filtering projects', { 
        error: error.message,
        selectedCategory,
        selectedIndustry
      })
      setFilterError('Failed to filter projects. Please try again.')
      return []
    }
  }, [projects, selectedCategory, selectedIndustry, searchQuery, enableSearch])

  // Handlers with validation
  const handleCategoryChange = useCallback((category) => {
    try {
      const validation = validateText(category, { 
        maxLength: 50, 
        required: false 
      })
      
      if (validation.isValid) {
        setSelectedCategory(validation.sanitized || 'All')
        setFilterError(null)
        
        logger.info('Category filter changed', { 
          category: validation.sanitized 
        })
      } else {
        setFilterError(validation.error)
      }
    } catch (error) {
      logger.error('Error changing category', { error: error.message })
      setFilterError('Failed to change category')
    }
  }, [])

  const handleIndustryChange = useCallback((industry) => {
    try {
      const validation = validateText(industry, { 
        maxLength: 50, 
        required: false 
      })
      
      if (validation.isValid) {
        setSelectedIndustry(validation.sanitized || 'All')
        setFilterError(null)
        
        logger.info('Industry filter changed', { 
          industry: validation.sanitized 
        })
      } else {
        setFilterError(validation.error)
      }
    } catch (error) {
      logger.error('Error changing industry', { error: error.message })
      setFilterError('Failed to change industry')
    }
  }, [])

  const handleSearchChange = useCallback((query) => {
    try {
      if (!enableSearch) return

      const validation = validateText(query, { 
        maxLength: maxSearchLength, 
        required: false,
        allowSpecialChars: false
      })
      
      if (validation.isValid) {
        setSearchQuery(validation.sanitized || '')
        setFilterError(null)
      } else {
        setFilterError(validation.error)
      }
    } catch (error) {
      logger.error('Error changing search query', { error: error.message })
      setFilterError('Failed to search')
    }
  }, [enableSearch, maxSearchLength])

  const resetFilters = useCallback(() => {
    setSelectedCategory('All')
    setSelectedIndustry('All')
    setSearchQuery('')
    setFilterError(null)
    
    logger.info('Filters reset')
  }, [])

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (selectedCategory !== 'All') count++
    if (selectedIndustry !== 'All') count++
    if (searchQuery) count++
    return count
  }, [selectedCategory, selectedIndustry, searchQuery])

  return {
    // State
    selectedCategory,
    selectedIndustry,
    searchQuery,
    filterError,
    
    // Data
    categories,
    industries,
    filteredProjects,
    activeFilterCount,
    
    // Handlers
    handleCategoryChange,
    handleIndustryChange,
    handleSearchChange,
    resetFilters,
    
    // Utilities
    isFiltered: activeFilterCount > 0,
    resultCount: filteredProjects.length,
    totalCount: projects.length
  }
}

export default useProjectFilters