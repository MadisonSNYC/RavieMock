/**
 * Performance monitoring utilities
 * Tracks Web Vitals and application performance metrics
 * Implements security-first approach to data collection
 */

import logger from '../services/logger'
import { PERFORMANCE, FEATURES } from '../constants'

/**
 * Performance monitor class
 * Collects and reports performance metrics
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map()
    this.observers = new Map()
    this.isEnabled = FEATURES.ENABLE_PERFORMANCE_MONITORING
    this.reportQueue = []
    this.reportInterval = null
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    if (!this.isEnabled) {
      logger.info('Performance monitoring disabled')
      return
    }

    try {
      // Monitor Web Vitals
      this.observeWebVitals()
      
      // Monitor resource timing
      this.observeResources()
      
      // Monitor long tasks
      this.observeLongTasks()
      
      // Start reporting interval
      this.startReporting()
      
      logger.info('Performance monitoring initialized')
    } catch (error) {
      logger.error('Failed to initialize performance monitoring', {
        error: error.message
      })
    }
  }

  /**
   * Observe Web Vitals metrics
   */
  observeWebVitals() {
    try {
      // First Contentful Paint (FCP)
      this.observePaintTiming('first-contentful-paint', 'FCP')
      
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          this.recordMetric('LCP', lastEntry.renderTime || lastEntry.loadTime)
        })
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.set('lcp', lcpObserver)
      }
      
      // First Input Delay (FID)
      if ('PerformanceObserver' in window) {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach(entry => {
            this.recordMetric('FID', entry.processingStart - entry.startTime)
          })
        })
        
        fidObserver.observe({ entryTypes: ['first-input'] })
        this.observers.set('fid', fidObserver)
      }
      
      // Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
              this.recordMetric('CLS', clsValue)
            }
          })
        })
        
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.set('cls', clsObserver)
      }
      
      // Time to Interactive (TTI) - simplified measurement
      window.addEventListener('load', () => {
        setTimeout(() => {
          const tti = performance.now()
          this.recordMetric('TTI', tti)
        }, 0)
      })
    } catch (error) {
      logger.error('Failed to observe Web Vitals', {
        error: error.message
      })
    }
  }

  /**
   * Observe paint timing metrics
   */
  observePaintTiming(metricName, label) {
    try {
      const paintEntries = performance.getEntriesByType('paint')
      const metric = paintEntries.find(entry => entry.name === metricName)
      
      if (metric) {
        this.recordMetric(label, metric.startTime)
      }
    } catch (error) {
      logger.error('Failed to observe paint timing', {
        error: error.message,
        metric: metricName
      })
    }
  }

  /**
   * Observe resource loading performance
   */
  observeResources() {
    try {
      if ('PerformanceObserver' in window) {
        const resourceObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            // Only track significant resources
            if (entry.duration > 100) {
              this.recordResourceTiming(entry)
            }
          })
        })
        
        resourceObserver.observe({ entryTypes: ['resource'] })
        this.observers.set('resource', resourceObserver)
      }
    } catch (error) {
      logger.error('Failed to observe resources', {
        error: error.message
      })
    }
  }

  /**
   * Observe long tasks that block the main thread
   */
  observeLongTasks() {
    try {
      if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            this.recordMetric('LongTask', entry.duration, {
              startTime: entry.startTime,
              attribution: entry.attribution
            })
            
            // Log warning for very long tasks
            if (entry.duration > 100) {
              logger.warn('Long task detected', {
                duration: entry.duration,
                startTime: entry.startTime
              })
            }
          })
        })
        
        longTaskObserver.observe({ entryTypes: ['longtask'] })
        this.observers.set('longtask', longTaskObserver)
      }
    } catch (error) {
      logger.error('Failed to observe long tasks', {
        error: error.message
      })
    }
  }

  /**
   * Record a performance metric
   */
  recordMetric(name, value, metadata = {}) {
    try {
      const metric = {
        name,
        value: Math.round(value * 100) / 100, // Round to 2 decimal places
        timestamp: Date.now(),
        url: window.location.pathname,
        ...metadata
      }
      
      // Store metric
      this.metrics.set(name, metric)
      
      // Check against performance budgets
      this.checkBudget(name, value)
      
      // Add to report queue
      this.reportQueue.push(metric)
      
      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${name}: ${metric.value}ms`)
      }
    } catch (error) {
      logger.error('Failed to record metric', {
        error: error.message,
        metric: name
      })
    }
  }

  /**
   * Record resource timing
   */
  recordResourceTiming(entry) {
    try {
      const resourceMetric = {
        name: entry.name.split('/').pop() || 'unknown',
        type: entry.initiatorType,
        duration: Math.round(entry.duration),
        size: entry.transferSize || 0,
        cached: entry.transferSize === 0
      }
      
      // Only log slow resources
      if (resourceMetric.duration > 500) {
        logger.info('Slow resource detected', resourceMetric)
      }
    } catch (error) {
      logger.error('Failed to record resource timing', {
        error: error.message
      })
    }
  }

  /**
   * Check metric against performance budget
   */
  checkBudget(metricName, value) {
    try {
      const budget = PERFORMANCE.BUDGETS[metricName]
      
      if (budget && value > budget) {
        logger.warn('Performance budget exceeded', {
          metric: metricName,
          value: Math.round(value),
          budget,
          exceeded: Math.round(value - budget)
        })
      }
    } catch (error) {
      logger.error('Failed to check performance budget', {
        error: error.message
      })
    }
  }

  /**
   * Start periodic reporting
   */
  startReporting() {
    // Report every 30 seconds if there are metrics
    this.reportInterval = setInterval(() => {
      if (this.reportQueue.length > 0) {
        this.sendReport()
      }
    }, 30000)
  }

  /**
   * Send performance report
   */
  sendReport() {
    try {
      if (this.reportQueue.length === 0) return
      
      const report = {
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        metrics: [...this.reportQueue],
        summary: this.getSummary()
      }
      
      // Log report (in production, this would send to analytics service)
      logger.info('Performance report', {
        summary: report.summary,
        metricsCount: report.metrics.length
      })
      
      // Clear the queue
      this.reportQueue = []
    } catch (error) {
      logger.error('Failed to send performance report', {
        error: error.message
      })
    }
  }

  /**
   * Get performance summary
   */
  getSummary() {
    const summary = {}
    
    for (const [name, metric] of this.metrics) {
      summary[name] = metric.value
    }
    
    return summary
  }

  /**
   * Get current metrics
   */
  getMetrics() {
    return Object.fromEntries(this.metrics)
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.metrics.clear()
    this.reportQueue = []
  }

  /**
   * Cleanup observers
   */
  cleanup() {
    try {
      // Disconnect all observers
      for (const observer of this.observers.values()) {
        observer.disconnect()
      }
      this.observers.clear()
      
      // Clear reporting interval
      if (this.reportInterval) {
        clearInterval(this.reportInterval)
        this.reportInterval = null
      }
      
      // Send final report
      if (this.reportQueue.length > 0) {
        this.sendReport()
      }
      
      logger.info('Performance monitoring cleaned up')
    } catch (error) {
      logger.error('Failed to cleanup performance monitoring', {
        error: error.message
      })
    }
  }

  /**
   * Measure function execution time
   */
  measureFunction(name, fn) {
    return async (...args) => {
      const startTime = performance.now()
      
      try {
        const result = await fn(...args)
        const duration = performance.now() - startTime
        
        this.recordMetric(`Function:${name}`, duration)
        
        return result
      } catch (error) {
        const duration = performance.now() - startTime
        
        this.recordMetric(`Function:${name}:Error`, duration)
        
        throw error
      }
    }
  }

  /**
   * Create a custom performance mark
   */
  mark(name) {
    try {
      performance.mark(name)
    } catch (error) {
      logger.error('Failed to create performance mark', {
        error: error.message,
        mark: name
      })
    }
  }

  /**
   * Measure between two marks
   */
  measure(name, startMark, endMark) {
    try {
      performance.measure(name, startMark, endMark)
      const measure = performance.getEntriesByName(name, 'measure')[0]
      
      if (measure) {
        this.recordMetric(`Measure:${name}`, measure.duration)
      }
    } catch (error) {
      logger.error('Failed to measure performance', {
        error: error.message,
        measure: name
      })
    }
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor()

// Initialize on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    performanceMonitor.init()
  })
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    performanceMonitor.cleanup()
  })
}

export default performanceMonitor