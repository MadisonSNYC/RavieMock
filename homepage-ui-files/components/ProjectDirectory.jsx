import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { getAllProjects } from '../data/projects'
import { thumbnailMap } from '../data/thumbnails'

// Directory components
import DirectoryHeader from './directory/DirectoryHeader'
import DirectoryAbout from './directory/DirectoryAbout'
import DirectoryFilters from './directory/DirectoryFilters'
import ProjectListItem from './directory/ProjectListItem'
import DirectoryStats from './directory/DirectoryStats'

const categories = ['All', 'Launch Film', 'Social Content', 'Event Visuals', 'Brand Identity', 'Concert Visuals']

export default function ProjectDirectory({ onClose, autoOpen = false }) {
  const [isOpen, setIsOpen] = useState(autoOpen)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const projects = getAllProjects()

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  const handleClose = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => isOpen ? handleClose() : setIsOpen(true)}
        className="fixed top-1/2 left-4 z-50 glass-dark backdrop-blur-md rounded-full p-3 hover:scale-110 transition-all duration-300 border border-white/10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close project directory' : 'Open project directory'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5 text-white" />
        ) : (
          <ChevronRight className="w-5 h-5 text-white" />
        )}
      </motion.button>

      {/* Directory Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-96 glass-dark backdrop-blur-xl border-r border-white/10 z-50 overflow-y-auto flex flex-col"
              role="dialog"
              aria-label="Project Directory"
            >
              {/* Header */}
              <DirectoryHeader onClose={() => setIsOpen(false)} />

              {/* About Section */}
              <DirectoryAbout />

              {/* Category Filters */}
              <DirectoryFilters 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Projects List */}
              <div className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="heading-sans text-sm font-semibold text-white/80">
                    Projects ({filteredProjects.length})
                  </h3>
                  <span className="body-sans text-xs text-neon-blue cursor-pointer hover:text-vivid-purple transition-colors">
                    Show More
                  </span>
                </div>

                <div className="space-y-4">
                  {filteredProjects.map((project, index) => (
                    <ProjectListItem
                      key={project.id}
                      project={project}
                      thumbnail={thumbnailMap[project.thumbnail]}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Footer Stats */}
              <DirectoryStats />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}