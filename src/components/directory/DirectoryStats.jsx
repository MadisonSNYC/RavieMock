import { projectDirectoryContent } from '../../data/site-content'

/**
 * Statistics footer for the project directory
 */
export default function DirectoryStats() {
  const { stats } = projectDirectoryContent
  
  return (
    <div className="p-6 border-t border-white/10 mt-auto">
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="heading-sans text-lg font-bold text-white">
            {stats.projects}
          </div>
          <div className="body-sans text-xs text-white/60">Projects</div>
        </div>
        <div>
          <div className="heading-sans text-lg font-bold text-white">
            {stats.totalViews}
          </div>
          <div className="body-sans text-xs text-white/60">Total Views</div>
        </div>
      </div>
    </div>
  )
}