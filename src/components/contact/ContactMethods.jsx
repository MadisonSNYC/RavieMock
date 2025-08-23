/**
 * ContactMethods Component
 * Displays contact method cards
 */

import { motion } from 'framer-motion'
import { contactMethods } from './contactConfig'

export default function ContactMethods() {
  return (
    <div>
      <h2 className="heading-h3 font-ui text-white mb-8">Other ways to reach us</h2>
      <div className="grid gap-4">
        {contactMethods.map((method, index) => (
          <motion.a
            key={method.label}
            href={method.href}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`block p-6 rounded-2xl border transition-all duration-300 ${
              method.primary 
                ? 'bg-gradient-to-br from-neon-blue/10 to-vivid-purple/10 border-neon-blue/30 hover:border-neon-blue/50' 
                : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                method.primary 
                  ? 'bg-gradient-to-br from-neon-blue to-vivid-purple' 
                  : 'bg-white/10'
              }`}>
                <method.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-ui font-semibold text-white mb-1">{method.label}</h3>
                <p className="text-neon-blue font-medium mb-1">{method.value}</p>
                <p className="caption-text">{method.description}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}