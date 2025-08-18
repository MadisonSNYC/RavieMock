import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '../../components/contact/ContactForm'

describe('ContactForm Component', () => {
  const defaultProps = {
    formData: {
      name: '',
      email: '',
      company: '',
      service: '',
      budget: '',
      message: ''
    },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    handleInputChange: vi.fn(),
    handleSubmit: vi.fn()
  }

  // COMP-001: Form rendering
  it('should render all form fields', () => {
    render(<ContactForm {...defaultProps} />)
    
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service interested in/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/budget range/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project details/i)).toBeInTheDocument()
  })

  it('should display field values', () => {
    const props = {
      ...defaultProps,
      formData: {
        ...defaultProps.formData,
        name: 'John Doe',
        email: 'john@example.com'
      }
    }
    
    render(<ContactForm {...props} />)
    
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
  })

  it('should display validation errors', () => {
    const props = {
      ...defaultProps,
      errors: {
        name: 'Name is required',
        email: 'Invalid email format'
      }
    }
    
    render(<ContactForm {...props} />)
    
    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Invalid email format')).toBeInTheDocument()
  })

  // COMP-002: User interactions
  it('should call handleInputChange on field change', () => {
    const handleInputChange = vi.fn()
    const props = { ...defaultProps, handleInputChange }
    
    render(<ContactForm {...props} />)
    
    const nameInput = screen.getByLabelText(/your name/i)
    fireEvent.change(nameInput, { target: { value: 'Jane' } })
    
    expect(handleInputChange).toHaveBeenCalled()
  })

  it('should call handleSubmit on form submission', () => {
    const handleSubmit = vi.fn(e => e.preventDefault())
    const props = { ...defaultProps, handleSubmit }
    
    render(<ContactForm {...props} />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    expect(handleSubmit).toHaveBeenCalled()
  })

  // COMP-003: Loading and success states
  it('should show loading state when submitting', () => {
    const props = { ...defaultProps, isSubmitting: true }
    
    render(<ContactForm {...props} />)
    
    expect(screen.getByText(/sending/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should show success message when submitted', () => {
    const props = { ...defaultProps, isSubmitted: true }
    
    render(<ContactForm {...props} />)
    
    expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    expect(screen.getByText(/we'll get back to you/i)).toBeInTheDocument()
  })

  it('should render service dropdown options', () => {
    render(<ContactForm {...defaultProps} />)
    
    const serviceSelect = screen.getByLabelText(/service interested in/i)
    
    // Check that select contains the expected options
    expect(serviceSelect).toHaveTextContent('Brand Films')
    expect(serviceSelect).toHaveTextContent('Social Media')
    expect(serviceSelect.querySelector('option[value="brand-films"]')).toBeInTheDocument()
    expect(serviceSelect.querySelector('option[value="social-media"]')).toBeInTheDocument()
  })

  it('should render budget dropdown options', () => {
    render(<ContactForm {...defaultProps} />)
    
    const budgetSelect = screen.getByLabelText(/budget range/i)
    
    // Check that select contains the expected options
    expect(budgetSelect).toHaveTextContent('$10,000 - $25,000')
    expect(budgetSelect).toHaveTextContent('$250,000+')
    expect(budgetSelect.querySelector('option[value="10-25k"]')).toBeInTheDocument()
    expect(budgetSelect.querySelector('option[value="250k+"]')).toBeInTheDocument()
  })
})