'use client'

import { motion } from 'framer-motion'
import { MotionSection, MotionDiv, fadeInUp, staggerContainer, staggerItem } from './ui/motion'
import { Users, TrendingUp, Compass, CheckCircle } from 'lucide-react'

const audiences = [
  {
    icon: Users,
    title: 'Senior Leaders & Executives',
    description: 'Those in positions of significant organizational influence and responsibility.',
  },
  {
    icon: TrendingUp,
    title: 'Leaders Stepping Up',
    description: 'Professionals moving into roles of greater scope and consequence.',
  },
  {
    icon: Compass,
    title: 'Managers in Complexity',
    description: 'Leaders operating in uncertain, high-stakes environments daily.',
  },
]

const requirements = [
  'Remain composed when others are unsettled',
  'Decide when information is incomplete',
  'Lead people through uncertainty and pressure',
]

export default function WhoIsFor() {
  return (
    <MotionSection
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-800/50" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <MotionDiv variants={fadeInUp}>
            <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Is This For You?
            </span>
            <h2 className="text-sm sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold tracking-tight text-dark-100 mb-6 whitespace-nowrap">
              Who This Experience Is For
            </h2>
            <div className="divider-gradient max-w-xs mb-8" />

            <p className="text-xl text-dark-300 mb-8 leading-relaxed">
              This experience is designed for leaders whose roles carry{' '}
              <span className="text-primary-400">visibility</span>,{' '}
              <span className="text-primary-400">consequence</span>, and{' '}
              <span className="text-primary-400">responsibility</span>.
            </p>

            {/* Audience cards */}
            <div className="space-y-4">
              {audiences.map((audience, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="flex items-start gap-4 p-4 card-glass-hover"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-600/10 border border-primary-600/30 flex items-center justify-center">
                    <audience.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-100 mb-1">{audience.title}</h3>
                    <p className="text-dark-400 text-sm">{audience.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </MotionDiv>

          {/* Right column */}
          <MotionDiv variants={fadeInUp}>
            <div className="card-glass p-8 md:p-10 border-primary-600/20">
              <h3 className="text-xl font-serif text-dark-100 mb-6">
                If your role requires you to:
              </h3>

              <div className="space-y-4 mb-8">
                {requirements.map((req, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="text-dark-200">{req}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-dark-700/50">
                <p className="text-lg text-dark-300 font-serif italic leading-relaxed">
                  This work will feel familiar—
                  <span className="text-primary-400"> and challenging.</span>
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  )
}
