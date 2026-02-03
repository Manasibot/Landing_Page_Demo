'use client'

import { motion } from 'framer-motion'
import { MotionSection, MotionDiv, fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from './ui/motion'
import { Brain, Target, Rocket } from 'lucide-react'

const phases = [
  {
    icon: Brain,
    label: 'ASSESS',
    title: 'Awareness Through Observation',
    description: 'Pressure reveals patterns—often quietly, but decisively. Leaders gain visibility into how stress affects their thinking, emotional regulation, decision-making, and presence.',
    detail: 'This phase builds awareness through live leadership simulations and real-time observation, making behavior visible—not theoretical.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    icon: Target,
    label: 'ALIGN',
    title: 'Intentional Response',
    description: 'Awareness alone is not enough. Leaders learn to align their responses with the reality of the situation, the expectations of the role, and the emotional state of those they lead.',
    detail: 'Alignment is where leadership becomes intentional rather than habitual.',
    color: 'from-primary-500 to-amber-500',
    bgColor: 'bg-primary-500/10',
    borderColor: 'border-primary-500/30',
  },
  {
    icon: Rocket,
    label: 'ASCEND',
    title: 'Conscious Leadership',
    description: 'As leaders learn to pause, regulate, and choose consciously, leadership ascends. Not through more effort—but through greater inner capacity.',
    detail: 'Leaders lead with calm visibility, credibility under pressure, clarity in uncertainty, and conscious choice when it matters most.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
]

export default function Philosophy() {
  return (
    <MotionSection
      id="philosophy"
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
      
      <div className="container-custom relative z-10">
        {/* Section header */}
        <MotionDiv variants={fadeInUp} className="text-center mb-20">
          <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            The Framework
          </span>
          <h2 className="heading-lg text-dark-100 mb-6">
            The Core Philosophy
          </h2>
          <p className="text-xl text-dark-300 font-serif max-w-2xl mx-auto">
            At the heart of this experience is a simple but demanding progression.
          </p>
          <div className="divider-gradient max-w-xs mx-auto mt-8" />
        </MotionDiv>

        {/* Framework visualization */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-500/30 via-primary-500/30 to-purple-500/30 -translate-y-1/2" />

          {/* Phases */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {phases.map((phase, index) => (
              <MotionDiv
                key={phase.label}
                variants={index === 0 ? fadeInLeft : index === 2 ? fadeInRight : fadeInUp}
                className="relative"
              >
                {/* Card */}
                <div className={`card-glass-hover p-8 h-full border ${phase.borderColor}`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-lg ${phase.bgColor} border ${phase.borderColor} flex items-center justify-center mb-6`}>
                    <phase.icon className="w-8 h-8 text-dark-100" />
                  </div>

                  {/* Label */}
                  <div className={`inline-flex items-center gap-2 mb-4`}>
                    <span className={`text-2xl font-serif font-bold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                      {phase.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-dark-100 mb-4">
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-dark-300 leading-relaxed mb-4">
                    {phase.description}
                  </p>

                  {/* Detail */}
                  <p className="text-dark-400 text-sm leading-relaxed italic">
                    {phase.detail}
                  </p>
                </div>

                {/* Arrow for desktop */}
                {index < phases.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 w-12 h-12 items-center justify-center z-10">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-primary-500 text-2xl"
                    >
                      →
                    </motion.div>
                  </div>
                )}
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <MotionDiv variants={fadeInUp} className="mt-20 text-center">
          <div className="inline-block card-glass p-8 md:p-12">
            <p className="text-xl md:text-2xl text-dark-200 font-serif leading-relaxed max-w-3xl">
              "Leadership ascends not through more effort—
              <br className="hidden md:block" />
              <span className="text-gradient"> but through greater inner capacity."</span>
            </p>
          </div>
        </MotionDiv>

        {/* Section end line */}
        <div className="divider-gradient w-full max-w-4xl mx-auto mt-20" />
      </div>
    </MotionSection>
  )
}
