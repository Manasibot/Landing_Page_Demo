'use client'

import { motion } from 'framer-motion'
import { MotionSection, MotionDiv, fadeInUp, staggerContainer, staggerItem } from './ui/motion'

const pressurePoints = [
  'When stakes are high',
  'When information is incomplete',
  'When emotions influence judgment',
  'When others look to you for certainty',
]

const outcomes = [
  'See what pressure truly reveals in them',
  'Choose how they lead under stress',
  'Build inner capacity—not just outer competence',
]

export default function WhyExists() {
  return (
    <MotionSection
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-600/30 to-transparent" />
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <MotionDiv variants={fadeInUp} className="text-center mb-16">
            <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              The Purpose
            </span>
            <h2 className="heading-lg text-dark-100 mb-6">
              Why Leading Under Pressure Exists
            </h2>
            <div className="divider-gradient max-w-xs mx-auto" />
          </MotionDiv>

          {/* Opening statement */}
          <MotionDiv variants={fadeInUp} className="mb-16">
            <div className="card-glass p-8 md:p-12">
              <p className="text-xl md:text-2xl text-dark-200 font-serif leading-relaxed text-center">
                Most leadership development works well—
                <span className="text-primary-400"> when conditions are controlled.</span>
              </p>
              <p className="text-lg text-dark-400 mt-6 text-center">
                But leadership itself is revealed elsewhere:
              </p>
            </div>
          </MotionDiv>

          {/* Pressure points */}
          <MotionDiv variants={staggerContainer} className="grid gap-4 mb-16">
            {pressurePoints.map((point, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex items-center gap-4 py-2.5 px-4 md:py-3 md:px-5 card-glass-hover"
              >
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-500" />
                <span className="text-lg md:text-xl text-dark-200">{point}</span>
              </motion.div>
            ))}
          </MotionDiv>

          {/* Key statement */}
          <MotionDiv variants={fadeInUp} className="text-center mb-16">
            <div className="relative inline-block">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -inset-4 bg-gradient-to-r from-transparent via-primary-600/10 to-transparent"
              />
              <p className="relative text-2xl md:text-3xl lg:text-4xl font-serif text-dark-100 leading-relaxed">
                Pressure does not create leadership.
                <br />
                <span className="text-gradient">It reveals it.</span>
              </p>
            </div>
          </MotionDiv>

          {/* Outcomes */}
          <MotionDiv variants={fadeInUp}>
            <p className="text-dark-400 text-lg mb-8 text-center">
              This experience exists to help leaders:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="card-glass-hover p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-600/10 border border-primary-600/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-500 font-serif font-bold">{index + 1}</span>
                  </div>
                  <p className="text-dark-200 leading-relaxed">{outcome}</p>
                </motion.div>
              ))}
            </div>
          </MotionDiv>

          {/* Section end line */}
          <div className="divider-gradient w-full max-w-4xl mx-auto mt-16" />
        </div>
      </div>
    </MotionSection>
  )
}
