export const validContactForm = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  company: 'Tech Corp',
  service: 'brand-films',
  budget: '50-100k',
  message: 'We need help with our brand film for Q2 launch.'
}

export const invalidContactForm = {
  name: '',
  email: 'invalid-email',
  company: '',
  service: '',
  budget: '',
  message: 'Short'
}

export const contactFormFactory = (overrides = {}) => ({
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  service: 'brand-films',
  budget: '25-50k',
  message: 'This is a test message that is long enough.',
  ...overrides
})