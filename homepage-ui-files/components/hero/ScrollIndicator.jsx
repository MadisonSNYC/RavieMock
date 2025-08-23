import { motion } from 'framer-motion'

/**
 * Animated scroll indicator for hero sections
 * @param {Object} props
 * @param {string} props.text - Text to display (default: "Scroll")
 * @param {string} props.className - Additional CSS classes
 */
export default function ScrollIndicator({ text = "Scroll", className = "" }) {
  return (
    <motion.div
      className={`absolute bottom-10 left-8 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-white/40 text-xs uppercase tracking-widest">{text}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </motion.div>
  )
}