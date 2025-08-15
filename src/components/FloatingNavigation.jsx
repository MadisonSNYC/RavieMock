import { motion } from 'framer-motion'

/**
 * FloatingNavigation Component
 * Floating dots navigation for section scrolling
 * @param {Object} props
 * @param {Array} props.sections - Array of section objects
 * @param {string} props.activeSection - Currently active section ID
 * @param {Function} props.onSectionClick - Callback when section is clicked
 * @returns {JSX.Element}
 */
export default function FloatingNavigation({ sections, activeSection, onSectionClick }) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <nav className="flex flex-col gap-4" aria-label="Page sections">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            onClick={() => onSectionClick(section.ref)}
            className="group flex items-center gap-3 justify-end"
            aria-label={`Navigate to ${section.label}`}
            aria-current={activeSection === section.id ? 'true' : 'false'}
          >
            <span className={`text-xs transition-all ${
              activeSection === section.id 
                ? 'text-white opacity-100 translate-x-0' 
                : 'text-white/60 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
            }`}>
              {section.label}
            </span>
            <div 
              className={`w-2 h-2 rounded-full transition-all ${
                activeSection === section.id 
                  ? 'bg-purple-500 scale-150' 
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              role="presentation"
            />
          </motion.button>
        ))}
      </nav>
    </div>
  )
}