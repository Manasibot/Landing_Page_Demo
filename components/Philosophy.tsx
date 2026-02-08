'use client'

import { Brain, Target, Rocket } from 'lucide-react'
import { StickyScroll } from '@/components/ui/sticky-scroll'
import { MotionSection, MotionDiv, fadeInUp, staggerContainer } from './ui/motion'

const phaseCards = [
  {
    label: 'ASSESS',
    subtitle: 'Awareness Through Observation',
    icon: Brain,
    cardClass: 'card-glass-hover border-blue-500/30',
    iconBg: 'bg-blue-500/10 border-blue-500/30',
    labelGradient: 'from-blue-500 to-cyan-500',
  },
  {
    label: 'ALIGN',
    subtitle: 'Intentional Response',
    icon: Target,
    cardClass: 'card-glass-hover border-primary-500/30',
    iconBg: 'bg-primary-500/10 border-primary-500/30',
    labelGradient: 'from-primary-500 to-amber-500',
  },
  {
    label: 'ASCEND',
    subtitle: 'Conscious Leadership',
    icon: Rocket,
    cardClass: 'card-glass-hover border-purple-500/30',
    iconBg: 'bg-purple-500/10 border-purple-500/30',
    labelGradient: 'from-purple-500 to-pink-500',
  },
]

const philosophyContent = [
  {
    title: 'ASSESS — Awareness Through Observation',
    description:
      'Pressure reveals patterns—often quietly, but decisively. Leaders gain visibility into how stress affects their thinking, emotional regulation, decision-making, and presence. This phase builds awareness through live leadership simulations and real-time observation, making behavior visible—not theoretical.',
    content: (() => {
      const Icon = phaseCards[0].icon
      const p = phaseCards[0]
      return (
        <div className={`flex h-full w-full flex-col justify-center rounded-xl border p-6 ${p.cardClass}`}>
          <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg border ${p.iconBg}`}>
            <Icon className="h-7 w-7 text-dark-100" strokeWidth={1.5} />
          </div>
          <span className={`font-serif text-xl font-bold bg-gradient-to-r ${p.labelGradient} bg-clip-text text-transparent`}>
            {p.label}
          </span>
          <p className="mt-2 text-sm text-dark-300">{p.subtitle}</p>
        </div>
      )
    })(),
  },
  {
    title: 'ALIGN — Intentional Response',
    description:
      'Awareness alone is not enough. Leaders learn to align their responses with the reality of the situation, the expectations of the role, and the emotional state of those they lead. Alignment is where leadership becomes intentional rather than habitual.',
    content: (() => {
      const Icon = phaseCards[1].icon
      const p = phaseCards[1]
      return (
        <div className={`flex h-full w-full flex-col justify-center rounded-xl border p-6 ${p.cardClass}`}>
          <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg border ${p.iconBg}`}>
            <Icon className="h-7 w-7 text-dark-100" strokeWidth={1.5} />
          </div>
          <span className={`font-serif text-xl font-bold bg-gradient-to-r ${p.labelGradient} bg-clip-text text-transparent`}>
            {p.label}
          </span>
          <p className="mt-2 text-sm text-dark-300">{p.subtitle}</p>
        </div>
      )
    })(),
  },
  {
    title: 'ASCEND — Conscious Leadership',
    description:
      'As leaders learn to pause, regulate, and choose consciously, leadership ascends. Not through more effort—but through greater inner capacity. Leaders lead with calm visibility, credibility under pressure, clarity in uncertainty, and conscious choice when it matters most.',
    content: (() => {
      const Icon = phaseCards[2].icon
      const p = phaseCards[2]
      return (
        <div className={`flex h-full w-full flex-col justify-center rounded-xl border p-6 ${p.cardClass}`}>
          <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg border ${p.iconBg}`}>
            <Icon className="h-7 w-7 text-dark-100" strokeWidth={1.5} />
          </div>
          <span className={`font-serif text-xl font-bold bg-gradient-to-r ${p.labelGradient} bg-clip-text text-transparent`}>
            {p.label}
          </span>
          <p className="mt-2 text-sm text-dark-300">{p.subtitle}</p>
        </div>
      )
    })(),
  },
]

export default function Philosophy() {
  return (
    <MotionSection
      id="philosophy"
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dark-950" />
      <div className="container-custom relative z-10">
        <MotionDiv variants={fadeInUp} className="text-center mb-12">
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

        <StickyScroll content={philosophyContent} />

        <MotionDiv variants={fadeInUp} className="mt-20 text-center">
          <div className="inline-block card-glass p-8 md:p-12">
            <p className="text-xl md:text-2xl text-dark-200 font-serif leading-relaxed max-w-3xl">
              "Leadership ascends not through more effort—
              <br className="hidden md:block" />
              <span className="text-primary-400"> but through greater inner capacity."</span>
            </p>
          </div>
        </MotionDiv>
        <div className="divider-gradient w-full max-w-4xl mx-auto mt-20" />
      </div>
    </MotionSection>
  )
}
