/**
 * BackgroundOrbs Component
 * Decorative gradient orbs for visual depth
 */

export default function BackgroundOrbs() {
  return (
    <>
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[800px] h-[800px] bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
    </>
  )
}