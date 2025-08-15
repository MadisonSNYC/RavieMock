import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, MapPin, Users, Award, Globe, Zap } from 'lucide-react'
import { companyInfo, offices, socialLinks } from '../data/company-info'
import { companyStats, services } from '../data/site-content'
import ErrorBoundary from '../components/ErrorBoundary'

export default function AboutPage() {
  return (
    <ErrorBoundary fallbackMessage="Failed to load the about page. Please refresh.">
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="body-sans">Back to Home</span>
            </Link>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              About {companyInfo.name}
            </h1>
            <p className="body-sans text-xl text-white/60 max-w-3xl">
              {companyInfo.extendedDescription}
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="glass-dark rounded-3xl p-8 md:p-12">
              <h2 className="heading-sans text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="body-sans text-white/70 text-lg leading-relaxed mb-6">
                {companyInfo.tagline}. We believe that great design isn't just about aesthetics—it's about 
                creating emotional connections between brands and their audiences. Our work combines 
                strategic thinking with creative excellence to deliver results that matter.
              </p>
              <p className="body-sans text-white/70 text-lg leading-relaxed">
                Specializing in {companyInfo.specialties.join(', ')}, we partner with forward-thinking 
                companies to transform their vision into compelling visual narratives that drive engagement 
                and growth.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="heading-sans text-3xl font-bold text-white mb-8 text-center">
              By the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 glass rounded-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-10 h-10 text-[#00D4FF]" />
                  </div>
                  <div className="heading-sans text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="body-sans text-white/60">
                    {stat.label}
                  </div>
                  <div className="body-sans text-white/40 text-sm mt-1">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="heading-sans text-3xl font-bold text-white mb-8 text-center">
              What We Do
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-dark rounded-3xl p-8 hover-lift group"
                >
                  <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center ${
                    service.color === 'neon-blue' ? 'bg-[#00D4FF]/20' : 'bg-[#8B5CF6]/20'
                  }`}>
                    <div className={`w-7 h-7 rounded-full ${
                      service.color === 'neon-blue' ? 'bg-[#00D4FF]' : 'bg-[#8B5CF6]'
                    }`} />
                  </div>
                  
                  <h3 className="heading-sans text-2xl font-bold text-white mb-4 group-hover:text-[#00D4FF] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="body-sans text-white/70 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Service Capabilities */}
                  <div className="space-y-2">
                    {service.capabilities.map((capability, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          service.color === 'neon-blue' ? 'bg-[#00D4FF]' : 'bg-[#8B5CF6]'
                        }`} />
                        <span className="body-sans text-white/60 text-sm">{capability}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team/Culture Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="glass-dark rounded-3xl p-8 md:p-12 text-center">
              <h2 className="heading-sans text-3xl font-bold text-white mb-6">Our Culture</h2>
              <p className="body-sans text-white/70 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                We're a purposefully small team of passionate creators who believe in the power of 
                design to transform businesses. Our collaborative approach ensures that every project 
                receives the attention and creativity it deserves.
              </p>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 glass rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Offices Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-sans text-3xl font-bold text-white mb-8 text-center">
              Our Offices
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={office.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-dark rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-[#00D4FF]" />
                    <h3 className="heading-sans text-2xl font-bold text-white">
                      {office.city}
                    </h3>
                  </div>
                  
                  <div className="body-sans text-white/60 mb-6">
                    <p>{office.address}</p>
                    <p>{office.zipcode}</p>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="heading-sans font-semibold text-white mb-2">
                      {office.contact.name}
                    </p>
                    <p className="body-sans text-sm text-white/60 mb-4">
                      {office.contact.title}
                    </p>
                    
                    <div className="space-y-2">
                      <a 
                        href={`mailto:${office.contact.email}`}
                        className="flex items-center gap-2 body-sans text-[#00D4FF] hover:text-[#8B5CF6] transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {office.contact.email}
                      </a>
                      <a 
                        href={`tel:${office.contact.phone}`}
                        className="body-sans text-white/60 hover:text-white transition-colors block"
                      >
                        {office.contact.phone}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-[#00D4FF]/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </ErrorBoundary>
  )
}