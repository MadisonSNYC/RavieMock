/**
 * ContactPage Component - Refactored
 * Main contact page using modular components
 */

import useContactForm from '../hooks/useContactForm'
import ContactHero from '../components/contact/ContactHero'
import ContactForm from '../components/contact/ContactForm'
import ContactMethods from '../components/contact/ContactMethods'

export default function ContactPage() {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit
  } = useContactForm()

  return (
    <div className="min-h-screen bg-black">
      {/* Contact Form Section - Main Focus */}
      <section className="relative pt-32 pb-20 px-10 md:px-20 lg:px-44">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section - Compact */}
          <ContactHero />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm
                formData={formData}
                errors={errors}
                isSubmitting={isSubmitting}
                isSubmitted={isSubmitted}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            </div>

            {/* Contact Methods */}
            <div className="lg:pl-8">
              <ContactMethods />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}