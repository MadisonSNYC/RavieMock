import { motion } from 'framer-motion'
import { Mail, MapPin, ExternalLink } from 'lucide-react'
import ravieLogo from '../assets/ravie-logo.webp'
import { offices, socialLinks, companyInfo, footerLinks } from '../data/company-info'

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-white/10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={ravieLogo} 
                alt="Ravie.co" 
                className="w-10 h-10 object-contain"
              />
              <span className="heading-sans text-2xl font-bold text-white">
                Ravie.co
              </span>
            </div>
            
            <p className="body-sans text-white/60 mb-8 leading-relaxed">
              {companyInfo.tagline}. {companyInfo.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Office Locations */}
          {offices.map((office, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-dark rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-neon-blue" />
                <h3 className="heading-sans text-xl font-bold text-white">
                  {office.city}
                </h3>
              </div>
              
              <div className="body-sans text-white/60 mb-6">
                <p>{office.address}</p>
                <p>{office.zipcode}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="heading-sans font-semibold text-white mb-1">
                  {office.contact.name}
                </p>
                <p className="body-sans text-sm text-white/60 mb-3">
                  {office.contact.title}
                </p>
                
                <div className="space-y-2">
                  <a 
                    href={`mailto:${office.contact.email}`}
                    className="flex items-center gap-2 body-sans text-neon-blue hover:text-vivid-purple transition-colors"
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

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="body-sans text-white/40 text-sm">
              {footerLinks.copyright}
            </div>
            
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="body-sans text-white/40 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-2 body-sans text-white/40 text-sm">
                <span>Made with</span>
                <span className="text-red-400">♥</span>
                <span>in NC & NYC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-vivid-purple/5 rounded-full blur-3xl"></div>
    </footer>
  )
}

