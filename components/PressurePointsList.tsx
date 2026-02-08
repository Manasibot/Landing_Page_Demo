'use client'

import { motion } from 'framer-motion'
import { MotionDiv, staggerContainer, staggerItem } from './ui/motion'

const pressurePoints = [
  'When stakes are high',
  'When information is incomplete',
  'When emotions influence judgment',
  'When others look to you for certainty',
]

/** Timeline-style list in one box: numbered circles (1–4) with theme gold, connected by a vertical line. */
export default function PressurePointsList() {
  return (
    <div className="card-glass rounded-lg border border-dark-700/50 p-6 md:p-8">
      <MotionDiv
        variants={staggerContainer}
        className="relative flex flex-col"
      >
        {pressurePoints.map((point, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="flex gap-4"
          >
            {/* Left: numbered circle + vertical connector line */}
            <div className="flex flex-col items-center pt-0.5">
              <div
                className="font-serif flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-dark-950 shadow-md shadow-primary-900/30"
                aria-hidden
              >
                {index + 1}
              </div>
              {index < pressurePoints.length - 1 && (
                <div className="w-0.5 flex-1 min-h-[16px] bg-primary-500" />
              )}
            </div>

            {/* Right: text (no per-item box) */}
            <div className="flex-1 pb-6 flex items-center">
              <span className="font-serif text-lg md:text-xl text-dark-200 leading-relaxed">{point}</span>
            </div>
          </motion.div>
        ))}
      </MotionDiv>
    </div>
  )
}
