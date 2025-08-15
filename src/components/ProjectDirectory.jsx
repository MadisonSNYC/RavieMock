import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Search, X, Filter } from 'lucide-react'
import { getAllProjects } from '../data/projects'
import { thumbnailMap } from '../data/thumbnails'

// Directory components
import DirectoryHeader from './directory/DirectoryHeader'
import DirectoryAbout from './directory/DirectoryAbout'
import DirectoryFilters from './directory/DirectoryFilters'
import ProjectListItem from './directory/ProjectListItem'
import DirectoryStats from './directory/DirectoryStats'

// Service and Industry filters
const serviceFilters = [
  'All Services',
  'LIVE EXPERIENTIAL',
  'BRAND FILMS',
  'PRODUCT MARKETING',
  'SOCIAL MEDIA',
  'BRAND DESIGN',
  'INTERACTIVE / WEB',
  'STRATEGY'
]

const industryFilters = [
  'All Industries',
  'Web3 & AI',
  'Entertainment',
  'Real Estate',
  'SaaS',
  'Fashion',
  'Food & Beverage',
  'Retail',
  'Sports Tech'
]

export default function ProjectDirectory({ onClose, autoOpen = false }) {
  const [isOpen, setIsOpen] = useState(autoOpen)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState('All Services')
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries')
  const [showFilters, setShowFilters] = useState(true)
  const projects = getAllProjects()

  // Filter projects based on search and selections
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search filter
      const searchMatch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase())

      // Service filter
      const serviceMatch = selectedService === 'All Services' || 
        project.services?.includes(selectedService)

      // Industry filter
      const industryMatch = selectedIndustry === 'All Industries' || 
        project.industries?.includes(selectedIndustry.replace(' & ', ' & '))

      return searchMatch && serviceMatch && industryMatch
    })
  }, [projects, searchQuery, selectedService, selectedIndustry])

  const handleClose = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedService('All Services')
    setSelectedIndustry('All Industries')
  }

  const hasActiveFilters = searchQuery || selectedService !== 'All Services' || selectedIndustry !== 'All Industries'

  return (
    <>
      {/* Toggle Button - Only visible when sidebar is closed */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed left-3 top-1/2 z-50 bg-[#1a1a1a]/90 backdrop-blur-xl rounded-lg px-2 py-4 hover:scale-105 transition-all duration-300 border border-white/10 hover:border-neon-blue/30 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open project directory"
          aria-expanded={false}
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <div className="flex flex-col items-center gap-2">
            {/* Vertical Text */}
            <span className="text-white/80 text-[10px] font-semibold tracking-wider uppercase group-hover:text-neon-blue transition-colors">
              PROJECT DIRECTORY
            </span>
            
            {/* Arrow Icon */}
            <ChevronRight className="w-3 h-3 text-white/60 group-hover:text-neon-blue transition-colors" />
          </div>
        </motion.button>
      )}

      {/* Directory Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Sidebar and Button Container - Moves as one unit */}
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -500, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full flex z-50"
            >
              {/* Sidebar Panel */}
              <div className="w-[450px] bg-[#0a0a0a]/95 backdrop-blur-2xl border-r border-white/10 overflow-hidden flex flex-col"
                role="dialog"
                aria-label="Project Directory"
              >
                
              {/* Header with Search */}
              <div className="p-6 border-b border-white/10">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white">Project Directory</h2>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:bg-white/[0.05] focus:border-neon-blue/30 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded"
                    >
                      <X className="w-3 h-3 text-white/40" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Section */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filters</span>
                    <motion.div
                      animate={{ rotate: showFilters ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </button>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-neon-blue hover:text-vivid-purple transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 overflow-hidden"
                    >
                      {/* Service Filter */}
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">
                          Services
                        </label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full p-2 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-blue/30 transition-colors"
                        >
                          {serviceFilters.map(service => (
                            <option key={service} value={service} className="bg-[#1a1a1a]">
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Industry Filter */}
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">
                          Industries
                        </label>
                        <select
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                          className="w-full p-2 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-blue/30 transition-colors"
                        >
                          {industryFilters.map(industry => (
                            <option key={industry} value={industry} className="bg-[#1a1a1a]">
                              {industry}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Projects List */}
              <div className="flex-grow overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white/80">
                      {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
                    </h3>
                  </div>

                  {filteredProjects.length > 0 ? (
                    <div className="space-y-3">
                      {filteredProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <ProjectListItem
                            project={project}
                            thumbnail={thumbnailMap[project.thumbnail]}
                            index={index}
                            onClick={handleClose}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-white/40 mb-2">No projects found</p>
                      <button
                        onClick={clearFilters}
                        className="text-sm text-neon-blue hover:text-vivid-purple transition-colors"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Stats */}
              <div className="p-6 border-t border-white/10 bg-[#0a0a0a]/50">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-neon-blue">50+</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-vivid-purple">25M+</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">8+</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Years</div>
                  </div>
                </div>
              </div>
              </div>
              
              {/* Toggle Button - Part of the same container */}
              <button
                onClick={handleClose}
                className="h-fit self-center bg-[#1a1a1a]/90 backdrop-blur-xl rounded-r-lg px-2 py-4 hover:scale-105 transition-all duration-300 border border-l-0 border-white/10 hover:border-neon-blue/30 group"
                aria-label="Close project directory"
                aria-expanded={true}
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                <div className="flex flex-col items-center gap-2">
                  {/* Vertical Text */}
                  <span className="text-white/80 text-[10px] font-semibold tracking-wider uppercase group-hover:text-neon-blue transition-colors">
                    PROJECT DIRECTORY
                  </span>
                  
                  {/* Arrow Icon */}
                  <ChevronLeft className="w-3 h-3 text-white/60 group-hover:text-neon-blue transition-colors" />
                </div>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}