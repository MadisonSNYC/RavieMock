import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ContactPage from '../../pages/ContactPage'

describe('Contact Flow Integration', () => {
  const renderPage = () => {
    return render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>
    )
  }

  it('should complete full contact form flow', async () => {
    renderPage()
    
    // Fill out form
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'Jane Smith' }
    })
    
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'jane@company.com' }
    })
    
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: 'Tech Corp' }
    })
    
    fireEvent.change(screen.getByLabelText(/service interested in/i), {
      target: { value: 'brand-films' }
    })
    
    fireEvent.change(screen.getByLabelText(/budget range/i), {
      target: { value: '50-100k' }
    })
    
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: 'We need a brand film for our product launch next quarter.' }
    })
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    // Check loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument()
    
    // Wait for success
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('should show validation errors for invalid submission', async () => {
    renderPage()
    
    // Submit without filling fields
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })
  })

  it('should clear errors when user corrects input', async () => {
    renderPage()
    
    // Submit empty form
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    // Verify error appears
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
    
    // Start typing in name field
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'J' }
    })
    
    // Error should disappear
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument()
  })
})