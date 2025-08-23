import { projectDirectoryContent } from '../../data/site-content'

/**
 * About section for the project directory
 */
export default function DirectoryAbout() {
  const { aboutUs } = projectDirectoryContent
  
  return (
    <div className="p-6 border-b border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="heading-sans text-sm font-semibold text-white/80">
          {aboutUs.title}
        </h3>
        <span className="body-sans text-xs text-neon-blue cursor-pointer hover:text-vivid-purple transition-colors">
          Show More
        </span>
      </div>
      <p className="body-sans text-sm text-white/60 leading-relaxed">
        {aboutUs.description}
      </p>
    </div>
  )
}