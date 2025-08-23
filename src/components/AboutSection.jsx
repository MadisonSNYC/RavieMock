import { motion } from 'framer-motion'
import { companyStats, services, aboutContent } from '../data/site-content'
import { companyInfo } from '../data/company-info'

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-card">
      <div className="w-full px-10 md:px-20 lg:px-44">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-sans text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {aboutContent.headline}
          </h2>
          <p className="body-sans text-base md:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            {companyInfo.extendedDescription}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, delay: 0.05 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {companyStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 glass rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-150">
                <stat.icon className="w-8 h-8 text-neon-blue" />
              </div>
              <div className="heading-sans text-2xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="body-sans text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: index * 0.02 }}
              viewport={{ once: true }}
              className="glass-dark rounded-3xl p-8 hover-lift group"
            >
              <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center ${
                service.color === 'neon-blue' ? 'bg-neon-blue/20' : 'bg-vivid-purple/20'
              }`}>
                <div className={`w-6 h-6 rounded-full ${
                  service.color === 'neon-blue' ? 'bg-neon-blue' : 'bg-vivid-purple'
                }`}></div>
              </div>
              
              <h3 className="heading-sans text-xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">
                {service.title}
              </h3>
              
              <p className="body-sans text-white/70 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, delay: 0.08 }}
          viewport={{ once: true }}
          className="text-center glass-dark rounded-3xl p-8"
        >
          <h3 className="heading-sans text-2xl md:text-3xl font-bold text-white mb-6">
            {aboutContent.cta.headline}
          </h3>
          <p className="body-sans text-base text-white/60 mb-8 max-w-2xl mx-auto">
            {aboutContent.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href={`mailto:${aboutContent.cta.email}`}
              className="body-sans text-neon-blue hover:text-vivid-purple transition-colors text-lg font-medium"
            >
              {aboutContent.cta.email}
            </a>
            <button className="bg-gradient-to-r from-neon-blue to-vivid-purple text-black px-8 py-4 rounded-full heading-sans font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-150">
              {aboutContent.cta.primaryButton}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-vivid-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl"></div>
    </section>
  )
}

