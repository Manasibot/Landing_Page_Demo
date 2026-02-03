'use client'

import { motion } from 'framer-motion'
import { MotionSection, MotionDiv, fadeInUp, staggerContainer, staggerItem } from './ui/motion'
import { Zap, Eye, Clock, Heart, Users } from 'lucide-react'

const highlights = [
  {
    icon: Zap,
    title: 'Live Leadership Simulations',
    description: 'Realistic, high-pressure scenarios where behavior—not intention—is revealed.',
  },
  {
    icon: Eye,
    title: 'Real-Time Observation & Reflection',
    description: 'Insight grounded in what leaders actually do under pressure.',
  },
  {
    icon: Clock,
    title: 'Decision-Making Under Stress',
    description: 'Learning to slow down without losing authority or momentum.',
  },
  {
    icon: Heart,
    title: 'Emotional Regulation & Leadership Presence',
    description: 'Calm, clarity, and credibility—felt by others, not announced.',
  },
  {
    icon: Users,
    title: 'Guided Reflection & Peer Dialogue',
    description: 'Integrating insight into real leadership contexts, not just the room.',
  },
]

export default function WhatMakesDifferent() {
  return (
    <MotionSection
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section header */}
        <MotionDiv variants={fadeInUp} className="text-center mb-16">
          <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            The Difference
          </span>
          <h2 className="heading-lg text-dark-100 mb-6">
            What Makes This Experience Different
          </h2>
          <div className="divider-gradient max-w-xs mx-auto mb-8" />
        </MotionDiv>

        {/* Not statements */}
        <MotionDiv variants={fadeInUp} className="max-w-3xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            {[
              'This is not a tools-based workshop.',
              'It is not motivational training.',
              'It is not leadership theory delivered in slides.',
            ].map((text, index) => (
              <div key={index} className="p-4 border border-dark-700/50 rounded-lg">
                <p className="text-dark-400 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* Highlights grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group card-glass-hover p-8"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-primary-600/10 border border-primary-600/30 flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
                <highlight.icon className="w-7 h-7 text-primary-500" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-dark-100 mb-3 group-hover:text-primary-400 transition-colors">
                {highlight.title}
              </h3>

              {/* Description */}
              <p className="text-dark-400 leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}

          {/* Summary card */}
          <motion.div
            variants={staggerItem}
            className="md:col-span-2 lg:col-span-1 card-glass p-8 bg-gradient-to-br from-primary-600/10 to-transparent border-primary-600/30"
          >
            <p className="text-lg text-dark-200 font-serif leading-relaxed">
              This is leadership development that is{' '}
              <span className="text-primary-400 font-semibold">experienced</span>,{' '}
              <span className="text-primary-400 font-semibold">observed</span>, and{' '}
              <span className="text-primary-400 font-semibold">integrated</span>.
            </p>
          </motion.div>
        </div>

        {/* Section end line */}
        <div className="divider-gradient w-full max-w-6xl mx-auto mt-20" />
      </div>
    </MotionSection>
  )
}
