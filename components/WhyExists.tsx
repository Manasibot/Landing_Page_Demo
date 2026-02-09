'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { MotionSection, MotionDiv, fadeInUp, staggerContainer, staggerItem } from './ui/motion'

const pressureListContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.35,
    },
  },
}

const pressureListItem: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const pressureListNumber: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

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
  const [pressureListKey, setPressureListKey] = useState(0)
  return (
    <MotionSection
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

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

          {/* Opening statement + pressure points in one purple box */}
          <MotionDiv variants={fadeInUp} className="mb-16">
            <div className="card-glass p-8 md:p-12 bg-[#932063]/25">
              <p className="text-xl md:text-2xl text-dark-200 font-serif leading-relaxed text-center">
                Most leadership development works well—
                <span className="text-primary-400"> when conditions are controlled.</span>
              </p>
              <p className="text-lg text-dark-400 mt-6 text-center">
                But leadership itself is revealed elsewhere:
              </p>
              <div className="divider-gradient max-w-xs mx-auto mt-6" />
              {/* Numbered list: gold circles + vertical line (animated – re-runs on every visit) */}
              <motion.div
                key={pressureListKey}
                variants={pressureListContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-50px' }}
                onViewportLeave={() => setPressureListKey((k) => k + 1)}
                className="relative flex flex-col mt-8 max-w-xl mx-auto"
              >
                {pressurePoints.map((point, index) => (
                  <motion.div
                    key={index}
                    variants={pressureListItem}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center pt-0.5">
                      <motion.div
                        variants={pressureListNumber}
                        className="font-serif flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-dark-950 shadow-md shadow-primary-900/30"
                        aria-hidden
                      >
                        {index + 1}
                      </motion.div>
                      {index < pressurePoints.length - 1 && (
                        <div className="w-0.5 flex-1 min-h-[16px] bg-primary-500" />
                      )}
                    </div>
                    <div className="flex-1 pb-6 flex items-center">
                      <span className="font-serif text-lg md:text-xl text-dark-200 leading-relaxed">{point}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
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
