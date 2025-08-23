/**
 * Category filter buttons for the project directory
 * @param {Object} props
 * @param {Array} props.categories - Available categories
 * @param {string} props.selectedCategory - Currently selected category
 * @param {Function} props.onCategoryChange - Category change handler
 */
export default function DirectoryFilters({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="p-6 border-b border-white/10">
      <h3 className="heading-sans text-sm font-semibold text-white/80 mb-3">
        Categories
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-neon-blue text-black'
                : 'glass border-white/20 text-white/60 hover:border-neon-blue hover:text-neon-blue'
            }`}
            aria-label={`Filter by ${category}`}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}