/**
 * ContactForm Component
 * Main contact form with all fields
 */

import { motion } from 'framer-motion'
import { MessageSquare, Send, CheckCircle } from 'lucide-react'
import FormField from './FormField'
import { serviceOptions, budgetOptions } from './contactConfig'

export default function ContactForm({ 
  formData, 
  errors, 
  isSubmitting, 
  isSubmitted, 
  handleInputChange, 
  handleSubmit 
}) {
  return (
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
            <FormField
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              placeholder="John Doe"
              required
              maxLength={100}
            />
            
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="john@company.com"
              required
              maxLength={254}
            />
          </div>

          <FormField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Your company name"
            maxLength={200}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Service Interested In"
              name="service"
              type="select"
              value={formData.service}
              onChange={handleInputChange}
              options={serviceOptions}
            />
            
            <FormField
              label="Budget Range"
              name="budget"
              type="select"
              value={formData.budget}
              onChange={handleInputChange}
              options={budgetOptions}
            />
          </div>

          <FormField
            label="Project Details"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleInputChange}
            error={errors.message}
            placeholder="Tell us about your project..."
            required
            maxLength={2000}
          />

          {errors.submit && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-neon-blue to-vivid-purple p-4 font-ui font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-vivid-purple to-neon-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </form>
      )}
    </div>
  )
}