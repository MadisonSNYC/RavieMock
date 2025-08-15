import { motion } from 'framer-motion'
import { ArrowLeft, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../data/projects'
import ProjectGrid from '../components/ProjectGrid'
import ErrorBoundary from '../components/ErrorBoundary'
import EndOfContentCTA from '../components/EndOfContentCTA'
import { checkURLSecurity } from '../utils/security'
import logger from '../services/logger'
import { useProjectFilters } from '../hooks/useProjectFilters'

export default function WorkPage() {
  const allProjects = getAllProjects()
  
  // Use the shared filter hook
  const {
    selectedCategory,
    selectedIndustry,
    categories,
    industries,
    filteredProjects,
    handleCategoryChange,
    handleIndustryChange,
    filterError,
    resultCount,
    totalCount
  } = useProjectFilters(allProjects)

  return (
    <ErrorBoundary fallbackMessage="Failed to load the work page. Please refresh.">
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="body-sans">Back to Home</span>
            </Link>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Our Work
            </h1>
            <p className="body-sans text-xl text-white/60 max-w-3xl">
              Premium motion design and creative campaigns for the world's most innovative brands.
              From launch films to brand identities, we craft experiences that resonate.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-white/60" />
              <span className="heading-sans text-white font-semibold">Filter Projects</span>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="body-sans text-white/60 text-sm mb-3 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[#00D4FF] text-black'
                        : 'glass border-white/20 text-white/60 hover:border-[#00D4FF] hover:text-[#00D4FF]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="body-sans text-white/60 text-sm mb-3 block">Industry</label>
              <div className="flex flex-wrap gap-2">
                {industries.map(industry => (
                  <button
                    key={industry}
                    onClick={() => handleIndustryChange(industry)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedIndustry === industry
                        ? 'bg-[#8B5CF6] text-white'
                        : 'glass border-white/20 text-white/60 hover:border-[#8B5CF6] hover:text-[#8B5CF6]'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="body-sans text-white/40 text-sm">
              Showing {resultCount} of {totalCount} projects
            </div>
            
            {filterError && (
              <div className="text-red-500 text-sm mt-2">
                {filterError}
              </div>
            )}
          </motion.div>

          {/* Projects Grid */}
          <ProjectGrid 
            projects={filteredProjects}
            layout="grid"
            onProjectClick={(project) => {
              // Validate and navigate to project's external link if available
              if (project.href) {
                const urlCheck = checkURLSecurity(project.href)
                
                if (urlCheck.safe) {
                  window.open(project.href, '_blank', 'noopener,noreferrer')
                  logger.info('Project link opened', { 
                    projectId: project.id,
                    projectTitle: project.title 
                  })
                } else {
                  logger.warn('Unsafe project URL blocked', {
                    projectId: project.id,
                    reason: urlCheck.reason
                  })
                  // Optionally show user-friendly error message
                  console.error('Unable to open project link')
                }
              }
            }}
          />

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <button
                onClick={() => {
                  handleCategoryChange('All')
                  handleIndustryChange('All')
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
          
          {/* End of Content CTA - Only show when projects are visible */}
          {filteredProjects.length > 0 && (
            <div className="mt-20">
              <EndOfContentCTA 
                variant="minimal"
                title="Didn't find what you're looking for?"
                subtitle="We'd love to discuss your specific needs and create something unique for you."
              />
            </div>
          )}
        </div>

        {/* Background Elements */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#00D4FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </ErrorBoundary>
  )
}