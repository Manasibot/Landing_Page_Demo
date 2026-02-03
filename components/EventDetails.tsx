'use client'

import { motion } from 'framer-motion'
import { MotionSection, MotionDiv, fadeInUp, staggerContainer } from './ui/motion'
import { MapPin, Calendar, Users, Lock } from 'lucide-react'

const details = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Dubai',
    description: 'United Arab Emirates',
  },
  {
    icon: Calendar,
    label: 'Dates',
    value: 'April 20–24, 2026',
    description: '5-Day Immersive Experience',
  },
  {
    icon: Users,
    label: 'Format',
    value: 'Immersive, In-Person',
    description: 'Small, selective cohort',
  },
  {
    icon: Lock,
    label: 'Participation',
    value: 'By Invitation',
    description: 'Selective application process',
  },
]

export default function EventDetails() {
  return (
    <MotionSection
      id="details"
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/30 to-dark-950" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <MotionDiv variants={fadeInUp} className="text-center mb-16">
          <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            Logistics
          </span>
          <h2 className="heading-lg text-dark-100 mb-6">
            Event Details
          </h2>
          <div className="divider-gradient max-w-xs mx-auto" />
        </MotionDiv>

        {/* Details grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {details.map((detail, index) => (
            <MotionDiv
              key={index}
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="card-glass-hover p-8 text-center h-full"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-primary-600/10 border border-primary-600/30 flex items-center justify-center mx-auto mb-5">
                  <detail.icon className="w-7 h-7 text-primary-500" />
                </div>

                {/* Label */}
                <span className="text-dark-500 text-xs tracking-[0.15em] uppercase block mb-2">
                  {detail.label}
                </span>

                {/* Value */}
                <h3 className="text-xl font-serif font-semibold text-dark-100 mb-2">
                  {detail.value}
                </h3>

                {/* Description */}
                <p className="text-dark-400 text-sm">
                  {detail.description}
                </p>
              </motion.div>
            </MotionDiv>
          ))}
        </div>

        {/* Section end line */}
        <div className="divider-gradient w-full max-w-5xl mx-auto mt-20" />
      </div>
    </MotionSection>
  )
}
