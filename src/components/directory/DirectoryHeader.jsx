import { ChevronLeft } from 'lucide-react'

/**
 * Header for the project directory sidebar
 * @param {Object} props
 * @param {Function} props.onClose - Close handler
 */
export default function DirectoryHeader({ onClose }) {
  return (
    <div className="p-6 border-b border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="heading-sans text-xl font-bold text-white">
          Project Directory
        </h2>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Close directory"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Current Time */}
      <div className="body-sans text-sm text-white/60">
        {new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  )
}