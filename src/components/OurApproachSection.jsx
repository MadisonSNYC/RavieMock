import { motion } from 'framer-motion'
import { Zap, Sparkles, Lightbulb, Target } from 'lucide-react'

const approachContent = {
  title: "Our Approach",
  sections: [
    {
      headline: "Creative Vision Meets Business Results",
      description: "Ravie creates cult followings for brands. We don't just create visuals; we are the best fit to ensure that your customers are fans first; massively increasing brand trust and conversion rates as a result. Our approach is holistic, aligning creative work with business KPIs, whether it's supporting fundraises or increasing conversion rates. We are innovators for innovators, bringing cutting-edge creativity to tech and fintech products."
    },
    {
      headline: "Innovation Through Collaboration",
      description: "We are extremely nimble. As one of the most efficient creative teams around, we retain flexibility to slot seamlessly into existing creative teams bolstering production and quality. Our process emphasizes collaboration and transparency, ensuring your feedback is heard and implemented, helping bold ideas become beloved brands."
    }
  ],
  differentiators: [
    {
      icon: Zap,
      emoji: "🚀",
      title: "Nimble & Efficient",
      description: "We are extremely nimble and one of the most efficient creative teams around, able to slot seamlessly into existing creative teams. We ensure quick turnaround times for projects, demonstrating operational flexibility and scalability."
    },
    {
      icon: Sparkles,
      emoji: "✨",
      title: "Premium Craftsmanship",
      description: "Our approach ensures a consistent, alluring, and enticing expression across all platforms and touchpoints, with a focus on high craftsmanship and meticulous execution. Our work is an industry staple trusted by startups to Fortune 500 brands."
    },
    {
      icon: Lightbulb,
      emoji: "💡",
      title: "Cutting-Edge Innovation",
      description: "We are innovators for innovators, specializing in motion design, 3D and interactive media. We utilize Rive, Lottie, and other animation frameworks for web, and stay ahead in AI and Web3, always exploring \"what's next\"."
    },
    {
      icon: Target,
      emoji: "🎯",
      title: "Tangible Business Impact",
      description: "We deliver measurable business impact by directly addressing client needs like increased conversion rates or successful fundraises. Our projects have achieved 25 million organic views and grown followings by 200K followers in 2 months, proving our results-driven approach."
    }
  ]
}

export default function OurApproachSection() {
  return (
    <section id="our-approach" className="relative py-24 bg-background overflow-hidden">
      <div className="w-full px-10 md:px-20 lg:px-44">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {approachContent.title}
          </h2>
        </motion.div>

        {/* Approach Content Sections */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {approachContent.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-neon-blue/30 transition-all duration-300">
                <h3 className="heading-sans text-2xl font-bold text-white mb-6">
                  {section.headline}
                </h3>
                <p className="body-sans text-base text-white/80 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="heading-sans text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Key Differentiators
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approachContent.differentiators.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <button className="w-full text-left group">
                  <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-neon-blue/30 hover:bg-card/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-blue/10">
                    <div className="flex items-start gap-4">
                      {/* Icon Container */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-vivid-purple/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-neon-blue" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="heading-sans text-lg font-bold text-white group-hover:text-neon-blue transition-colors duration-300 mb-3">
                          {item.title}
                        </h4>
                        <p className="body-sans text-sm text-white/70 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass-card p-12 rounded-3xl border border-white/10">
            <h3 className="heading-sans text-2xl md:text-3xl font-bold text-white mb-6">
              Ready to Create Something Extraordinary?
            </h3>
            <p className="body-sans text-base text-white/70 mb-8 max-w-2xl mx-auto">
              Let's discuss how our approach can transform your brand and drive measurable results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-vivid-purple text-black rounded-full heading-sans font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
                Start a Project
              </button>
              <button className="px-8 py-4 border border-white/20 text-white rounded-full heading-sans font-semibold hover:bg-white/10 transition-all duration-300">
                View Our Work
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-vivid-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl"></div>
    </section>
  )
}