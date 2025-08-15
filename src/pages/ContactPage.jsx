import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageSquare, Sparkles, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
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
      window.location.href = mailtoLink
      
      setIsSubmitted(true)
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      label: "Email Us",
      value: "hello@ravie.co",
      description: "For new projects and inquiries",
      href: "mailto:hello@ravie.co",
      primary: true
    },
    {
      icon: Mail,
      label: "Business Development",
      value: "business@ravie.co", 
      description: "For partnerships and collaborations",
      href: "mailto:business@ravie.co"
    },
    {
      icon: Phone,
      label: "Give Us a Call",
      value: "(555) 123-RAVIE",
      description: "Monday - Friday, 9am - 6pm PST",
      href: "tel:+15551237284"
    },
    {
      icon: MapPin,
      label: "Visit Our Studio",
      value: "Los Angeles, CA",
      description: "Available for in-person meetings",
      href: "#"
    }
  ]

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Coming soon"
    },
    {
      question: "What's your minimum project budget?",
      answer: "Coming soon"
    },
    {
      question: "Do you work with startups?",
      answer: "Coming soon"
    },
    {
      question: "Can you work remotely?",
      answer: "Coming soon"
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Contact Form Section - Main Focus */}
      <section className="relative pt-32 pb-20 px-10 md:px-20 lg:px-44">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section - Compact */}
          <div className="relative py-12 mb-16">
            {/* Frosted Glass Background for Hero Top Section */}
            <div className="absolute inset-0 bg-gray-600/20 backdrop-blur-xl border border-white/10 rounded-2xl m-2">
              {/* Additional frosted glass layers */}
              <div className="absolute inset-0 bg-white/[0.03] rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 via-transparent to-gray-600/10 rounded-2xl" />
            </div>
            
            {/* Subtle Glass Background with Neon Glow */}
            <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden">
              {/* Glass Panel */}
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-neon-blue/20 rounded-2xl shadow-xl">
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/[0.03] via-transparent to-neon-blue/[0.01] rounded-2xl" />
                
                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(0,212,255,0.08),inset_0_0_30px_rgba(0,212,255,0.03)]" />
              </div>
              
              {/* Professional edge enhancement */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.05] ring-inset" />
            </div>

            {/* Content Container - Compact */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              {/* Ravie Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <img 
                  src="/src/assets/Ravielogo1.png" 
                  alt="Ravie Logo" 
                  className="h-8 mx-auto object-contain"
                />
              </motion.div>

              {/* Main Headlines - Using Typography System */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-display font-display text-white">
                  Ready to take your brand to the next level?
                </h1>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="heading-h2 font-ui text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-vivid-purple"
                >
                  Let's get to work.
                </motion.h2>
              </motion.div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-vivid-purple rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="heading-h3 font-ui text-white">Send us a message</h2>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="heading-h3 font-ui text-white mb-4">Thank you!</h3>
                    <p className="body-text mb-2">We've received your message and are excited about your project.</p>
                    <p className="caption-text">We'll get back to you within 1 business day.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="caption-text mb-2 block uppercase tracking-wider">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full p-4 bg-white/[0.03] backdrop-blur-md border rounded-2xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 ${
                            errors.name ? 'border-red-500' : 'border-white/20 focus:border-neon-blue focus:bg-white/[0.05]'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label className="caption-text mb-2 block uppercase tracking-wider">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full p-4 bg-white/[0.03] backdrop-blur-md border rounded-2xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 ${
                            errors.email ? 'border-red-500' : 'border-white/20 focus:border-neon-blue focus:bg-white/[0.05]'
                          }`}
                          placeholder="john@company.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="caption-text mb-2 block uppercase tracking-wider">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white/[0.03] backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-neon-blue focus:bg-white/[0.05] transition-all duration-300"
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="caption-text mb-2 block uppercase tracking-wider">Service Interested In</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/[0.03] backdrop-blur-md border border-white/20 rounded-2xl text-white focus:outline-none focus:border-neon-blue focus:bg-white/[0.05] transition-all duration-300"
                        >
                          <option value="">Select a service</option>
                          <option value="brand-films">Brand Films</option>
                          <option value="product-marketing">Product Marketing</option>
                          <option value="social-media">Social Media</option>
                          <option value="brand-design">Brand Design</option>
                          <option value="interactive-web">Interactive / Web</option>
                          <option value="live-experiential">Live Experiential</option>
                          <option value="strategy">Strategy</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="caption-text mb-2 block uppercase tracking-wider">Budget Range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/[0.03] backdrop-blur-md border border-white/20 rounded-2xl text-white focus:outline-none focus:border-neon-blue focus:bg-white/[0.05] transition-all duration-300"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-25k">Under $25k</option>
                          <option value="25k-50k">$25k - $50k</option>
                          <option value="50k-100k">$50k - $100k</option>
                          <option value="100k-250k">$100k - $250k</option>
                          <option value="250k-plus">$250k+</option>
                          <option value="discuss">Let's discuss</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="caption-text mb-2 block uppercase tracking-wider">Tell us about your project *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={`w-full p-4 bg-white/[0.03] backdrop-blur-md border rounded-2xl text-white placeholder-white/40 focus:outline-none resize-none transition-all duration-300 ${
                          errors.message ? 'border-red-500' : 'border-white/20 focus:border-neon-blue focus:bg-white/[0.05]'
                        }`}
                        placeholder="Describe your project, goals, timeline, or any specific requirements..."
                      />
                      {errors.message && <p className="text-red-400 text-sm mt-2">{errors.message}</p>}
                    </div>

                    {errors.submit && (
                      <p className="text-red-400 text-sm">{errors.submit}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                        isSubmitting 
                          ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-neon-blue to-vivid-purple text-black hover:shadow-lg hover:shadow-neon-blue/25 hover:scale-105'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-h2 font-ui text-white mb-8">
                  Multiple Ways to Connect
                </h2>
                <p className="body-text mb-8">
                  Choose the method that works best for you. We're here and ready to discuss your project.
                </p>
              </div>

              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon
                  return (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      className={`group relative block p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                        method.primary 
                          ? 'bg-gradient-to-br from-neon-blue/10 to-vivid-purple/10 border-2 border-neon-blue/30' 
                          : 'bg-white/[0.02] backdrop-blur-md border border-white/10 hover:border-neon-blue/30'
                      }`}
                      whileHover={{ y: -4 }}
                    >
                      {method.primary && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-neon-blue to-vivid-purple text-black text-xs font-bold px-3 py-1 rounded-full">
                          Recommended
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          method.primary 
                            ? 'bg-gradient-to-br from-neon-blue/20 to-vivid-purple/20' 
                            : 'bg-white/10'
                        }`}>
                          <Icon className={`w-6 h-6 ${method.primary ? 'text-neon-blue' : 'text-white/70'}`} />
                        </div>
                        
                        <div>
                          <h3 className="font-ui font-semibold text-white mb-1 group-hover:text-neon-blue transition-colors">
                            {method.label}
                          </h3>
                          <p className={`font-medium text-sm mb-1 ${method.primary ? 'text-neon-blue' : 'text-white/90'}`}>
                            {method.value}
                          </p>
                          <p className="text-white/60 text-xs">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  )
                })}
                
                {/* Office Information from Footer */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="nav-label text-white mb-6">Our Offices</h3>
                  <div className="space-y-6">
                    <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-neon-blue" />
                        <h4 className="font-ui font-semibold text-white">Raleigh, NC</h4>
                      </div>
                      <div className="mono-text text-white/60 mb-4">
                        <p>150 Fayetteville St Ste 300</p>
                        <p>Raleigh, NC 27601</p>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-white font-semibold mb-1">Austin Bauwens</p>
                        <p className="text-white/60 text-sm mb-3">Co-Founder, Chief Operations Officer</p>
                        <div className="space-y-2">
                          <a href="mailto:austin@ravie.co" className="flex items-center gap-2 text-neon-blue hover:text-vivid-purple transition-colors text-sm">
                            <Mail className="w-4 h-4" />
                            austin@ravie.co
                          </a>
                          <a href="tel:+19192498201" className="text-white/60 hover:text-white transition-colors text-sm block">
                            +1-919-249-8201
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-vivid-purple" />
                        <h4 className="font-ui font-semibold text-white">NYC</h4>
                      </div>
                      <div className="mono-text text-white/60 mb-4">
                        <p>108 Stanton St</p>
                        <p>New York, NY 10002</p>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-white font-semibold mb-1">Noah Wilde</p>
                        <p className="text-white/60 text-sm mb-3">Co-Founder, Chief Innovation Officer</p>
                        <div className="space-y-2">
                          <a href="mailto:noah@ravie.co" className="flex items-center gap-2 text-neon-blue hover:text-vivid-purple transition-colors text-sm">
                            <Mail className="w-4 h-4" />
                            noah@ravie.co
                          </a>
                          <a href="tel:+19292434691" className="text-white/60 hover:text-white transition-colors text-sm block">
                            +1-929-243-4691
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-10 md:px-20 lg:px-44 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-h2 font-ui text-white mb-16 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/10 hover:border-neon-blue/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-ui font-semibold text-white mb-3 text-lg">
                  {faq.question}
                </h3>
                <p className="body-text-small">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-10 md:px-20 lg:px-44 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-md rounded-3xl p-12 border border-white/10">
            <h2 className="heading-h2 font-ui text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="body-text mb-8">
              The best way to understand if we're a good fit is to have a conversation. 
              No pressure, just an honest discussion about your goals and how we might help.
            </p>
            
            <a
              href="mailto:hello@ravie.co"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-neon-blue to-vivid-purple rounded-2xl text-black cta-text hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              Email Us Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}