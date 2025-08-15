import FeaturedProjectCard from './FeaturedProjectCard'
import CoinbaseThumbnail from '../../assets/CoinbaseThumbnail.webp'

export default function CoinbaseFeature({ isHovered, onHover }) {
  const project = {
    id: 'coinbase',
    title: 'Coinbase OnChain Vision',
    client: 'Coinbase',
    metrics: '2.5M+ Views',
    tags: [
      { label: 'Launch Film', bgColor: 'bg-[#00D4FF]/20', textColor: 'text-[#00D4FF]', borderColor: 'border-[#00D4FF]/30' },
      { label: 'Crypto', bgColor: 'bg-[#8B5CF6]/20', textColor: 'text-[#8B5CF6]', borderColor: 'border-[#8B5CF6]/30' }
    ]
  }

  return (
    <FeaturedProjectCard
      project={project}
      thumbnail={CoinbaseThumbnail}
      layoutClass="col-span-2 lg:col-span-3 row-span-2"
      delay={0}
      isHovered={isHovered}
      onHover={onHover}
    >
      {/* Colorful abstract overlay for premium feel */}
      <div className="absolute inset-0 mix-blend-overlay opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#00D4FF] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#8B5CF6] to-transparent rounded-full blur-3xl" />
      </div>
    </FeaturedProjectCard>
  )
}