'use client'

import { motion } from 'framer-motion'
import { MotionSection, MotionDiv, fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from './ui/motion'

const faculty = [
  {
    name: 'Dr. Abdelbasit Ayoub',
    role: 'Lead Facilitator',
    image: null,
    bio: 'A seasoned leadership scholar and practitioner with decades of experience working with leaders in complex, high-pressure environments across regions and cultures. His work sits at the intersection of leadership psychology, decision-making under pressure, and human behavior.',
    highlight: 'Known for his calm authority and depth of insight, Dr. Ayoub creates learning environments that are both intellectually rigorous and psychologically safe.',
    style: 'His facilitation style is reflective, precise, and deeply human—grounded in real-world leadership realities rather than abstract theory.',
  },
  {
    name: 'Dr. Owen Fernandes',
    role: 'Co-Facilitator',
    image: null,
    bio: 'Brings over three decades of global experience in leadership development, executive coaching, and organizational capability building across the Middle East, Europe, and Asia. His work focuses on inner leadership capacity.',
    highlight: 'With a strong foundation in psychometrics, experiential learning, and reflective practice, Dr. Owen translates deep insight into practical leadership awareness.',
    style: 'His facilitation style blends clarity, warmth, and challenge—supporting leaders to move from automatic reaction to conscious choice.',
  },
]

const facilitationElements = [
  'Psychological depth',
  'Cross-cultural leadership insight',
  'Simulation-based observation',
  'Reflective dialogue and integration',
]

export default function Faculty() {
  return (
    <MotionSection
      id="faculty"
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-950 to-dark-950" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <MotionDiv variants={fadeInUp} className="text-center mb-20">
          <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            Your Guides
          </span>
          <h2 className="heading-lg text-dark-100 mb-6">
            Faculty & Facilitation
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Together, they bring over <span className="text-primary-400">50 years</span> of global leadership 
            development experience, working with leaders across cultures, industries, and high-pressure environments.
          </p>
          <div className="divider-gradient max-w-xs mx-auto mt-8" />
        </MotionDiv>

        {/* Faculty cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {faculty.map((person, index) => (
            <MotionDiv
              key={person.name}
              variants={index === 0 ? fadeInLeft : fadeInRight}
            >
              <div className="card-glass-hover p-8 md:p-10 h-full">
                {/* Header */}
                <div className="flex items-start gap-6 mb-6">
                  {/* Avatar placeholder */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br from-primary-600/30 to-primary-700/10 border border-primary-600/30 flex items-center justify-center">
                    <span className="text-3xl font-serif font-bold text-primary-400">
                      {person.name.split(' ').slice(-1)[0][0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-semibold text-dark-100 mb-1">
                      {person.name}
                    </h3>
                    <span className="text-primary-500 font-medium">{person.role}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-dark-300 leading-relaxed mb-4">
                  {person.bio}
                </p>

                {/* Highlight */}
                <p className="text-dark-200 leading-relaxed mb-4">
                  {person.highlight}
                </p>

                {/* Style */}
                <p className="text-dark-400 italic text-sm leading-relaxed">
                  {person.style}
                </p>
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* Facilitation approach */}
        <MotionDiv variants={fadeInUp}>
          <div className="card-glass p-8 md:p-12 text-center max-w-4xl mx-auto border-primary-600/20">
            <p className="text-lg text-dark-300 mb-8">
              The facilitation blends:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {facilitationElements.map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-dark-800/30 rounded-lg border border-dark-700/50"
                >
                  <span className="text-dark-200 text-sm">{element}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-8 text-xl text-dark-200 font-serif">
              This is leadership development grounded in{' '}
              <span className="text-primary-400">experience</span>,{' '}
              <span className="text-primary-400">observation</span>, and{' '}
              <span className="text-primary-400">conscious change</span>.
            </p>
          </div>
        </MotionDiv>

        {/* Section end line */}
        <div className="divider-gradient w-full max-w-6xl mx-auto mt-20" />
      </div>
    </MotionSection>
  )
}
