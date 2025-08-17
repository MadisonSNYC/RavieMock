import { motion } from 'framer-motion'

/**
 * ProjectHero Component
 * Hero section for project pages
 * @param {Object} props
 * @param {Object} props.project - Project data
 * @param {Object} props.heroRef - Ref for scroll tracking
 * @param {Object} props.heroY - Y transform value
 * @param {Object} props.heroOpacity - Opacity transform value
 * @returns {JSX.Element}
 */
export default function ProjectHero({ project, heroRef, heroY, heroOpacity }) {
  return (
    <motion.section 
      ref={heroRef}
      style={{ y: heroY, opacity: heroOpacity }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        {project.video && project.videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster={project.image}
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={project.image || "/Thumbs/JheneThmb.webp"}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
      </div>

      {/* Hero Content with Subtle Neon Glass Card */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6">
        {/* Subtle Neon Glass Background Card */}
        <div className="absolute inset-0 -m-8">
          {/* Glass Panel */}
          <div className="relative h-full bg-white/[0.02] backdrop-blur-xl border border-neon-blue/20 rounded-3xl shadow-2xl">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/[0.03] via-transparent to-neon-blue/[0.01] rounded-3xl" />
            
            {/* Border glow effect - very subtle */}
            <div className="absolute inset-0 rounded-3xl shadow-[0_0_40px_rgba(0,212,255,0.08),inset_0_0_40px_rgba(0,212,255,0.04)]" />
            
            {/* Professional edge enhancement */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/[0.05] ring-inset" />
            
            {/* Minimal ambient light particles */}
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.02, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-neon-blue/30 rounded-full blur-sm"
            />
            <motion.div
              animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.03, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-neon-blue/20 rounded-full blur-sm"
            />
          </div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 py-12"
        >
          <p className="text-sm uppercase tracking-widest mb-4 text-white/60">
            {project.category} • {project.year}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            {project.tagline || project.description}
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}