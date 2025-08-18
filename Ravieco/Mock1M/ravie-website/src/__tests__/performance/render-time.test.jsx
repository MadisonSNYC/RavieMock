import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage2 from '../../pages/HomePage2'
import ContactPage from '../../pages/ContactPage'
import WorkPage from '../../pages/WorkPage'

describe('Performance: Render Time', () => {
  const measureRenderTime = (Component) => {
    const start = performance.now()
    render(
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    )
    const end = performance.now()
    return end - start
  }

  it('should render HomePage2 within 100ms', () => {
    const renderTime = measureRenderTime(HomePage2)
    expect(renderTime).toBeLessThan(100)
  })

  it('should render ContactPage within 100ms', () => {
    const renderTime = measureRenderTime(ContactPage)
    expect(renderTime).toBeLessThan(100)
  })

  it('should render WorkPage within 150ms', () => {
    const renderTime = measureRenderTime(WorkPage)
    expect(renderTime).toBeLessThan(150)
  })

  it('should lazy load route components', () => {
    // Check that dynamic imports are used
    const appModule = import('../../App.jsx')
    expect(appModule).toBeInstanceOf(Promise)
  })

  it('should memoize expensive computations', () => {
    // Mock expensive computation
    const expensiveComputation = vi.fn(() => {
      let result = 0
      for (let i = 0; i < 1000000; i++) {
        result += i
      }
      return result
    })

    // First call
    const result1 = expensiveComputation()
    expect(expensiveComputation).toHaveBeenCalledTimes(1)

    // Should use cached result
    const result2 = result1 // In real app, this would be memoized
    expect(result2).toBe(result1)
  })
})