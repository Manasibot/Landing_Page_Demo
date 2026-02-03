'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionSection, MotionDiv, fadeInUp, staggerContainer } from './ui/motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'Is this a training program or a workshop?',
    answer: 'No. Leading Under Pressure is an immersive leadership experience, not a traditional training or workshop. It focuses on how leaders think, decide, and show up under pressure, rather than on tools, models, or techniques alone.',
  },
  {
    question: 'Who typically participates in this experience?',
    answer: 'Participants are leaders whose roles carry real responsibility and consequence. This includes senior leaders, executives, and managers operating in complex environments—where decisions matter, uncertainty is constant, and leadership presence is closely observed.',
  },
  {
    question: 'Do I need prior leadership training or coaching experience?',
    answer: 'No prior training is required. What matters is readiness—the willingness to examine how you lead under pressure and to engage in reflective, experiential work.',
  },
  {
    question: 'What makes this experience different from other leadership programs?',
    answer: 'Most leadership development focuses on what leaders should do. This experience focuses on: what leaders actually do under pressure, how inner patterns influence leadership behavior, and how conscious choice replaces automatic reaction. A defining element is the use of live leadership simulations, where leadership behavior becomes visible in real time—not theoretical.',
  },
  {
    question: 'Will there be assessments or evaluations?',
    answer: 'Yes—though not in the traditional sense. Leaders receive real-time observational insight through simulations, reflection, and facilitated dialogue. The emphasis is on self-awareness and integration, not scoring or judgment.',
  },
  {
    question: 'Is this experience confidential?',
    answer: 'Absolutely. The environment is designed to be psychologically safe, respectful, and confidential, allowing leaders to engage honestly without concern for exposure or comparison.',
  },
  {
    question: 'What is the group size?',
    answer: 'Cohorts are intentionally small and selective. This ensures: depth of engagement, quality dialogue, individual attention, and meaningful peer learning.',
  },
  {
    question: 'Why is participation by invitation or selective application?',
    answer: 'Because the depth of this work requires: readiness, maturity, and openness to reflection. Selective participation protects the quality of the experience for everyone involved.',
  },
  {
    question: 'Is this relevant across industries and cultures?',
    answer: 'Yes. The experience focuses on human leadership patterns under pressure, which transcend industry, function, and geography. Facilitation is grounded in extensive cross-cultural leadership work.',
  },
  {
    question: 'What outcomes can leaders expect?',
    answer: 'Leaders often report: greater clarity and calm under pressure, improved decision-making in uncertainty, stronger leadership presence and credibility, increased awareness of personal leadership patterns, and the ability to choose consciously rather than react habitually. Outcomes are experienced and embodied, not merely learned.',
  },
]

function FAQItem({ faq, isOpen, onClick }: { faq: typeof faqs[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      initial={false}
      className={cn(
        'border-b border-dark-800/50 transition-colors',
        isOpen && 'border-primary-600/30'
      )}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className={cn(
          'text-lg font-medium transition-colors pr-4',
          isOpen ? 'text-primary-400' : 'text-dark-200 group-hover:text-dark-100'
        )}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors',
            isOpen ? 'bg-primary-600/20 text-primary-400' : 'bg-dark-800/50 text-dark-400'
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-dark-400 leading-relaxed pb-6 pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const leftFaqs = faqs.slice(0, 5)
const rightFaqs = faqs.slice(5, 10)

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <MotionSection
      id="faq"
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <MotionDiv variants={fadeInUp} className="text-center mb-16">
          <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            Questions
          </span>
          <h2 className="heading-lg text-dark-100 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="divider-gradient max-w-xs mx-auto" />
        </MotionDiv>

        {/* FAQ list - 5 left, 5 right */}
        <MotionDiv variants={fadeInUp} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left column */}
            <div className="card-glass p-6 md:p-10">
              {leftFaqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
            {/* Right column */}
            <div className="card-glass p-6 md:p-10">
              {rightFaqs.map((faq, index) => (
                <FAQItem
                  key={index + 5}
                  faq={faq}
                  isOpen={openIndex === index + 5}
                  onClick={() => setOpenIndex(openIndex === index + 5 ? null : index + 5)}
                />
              ))}
            </div>
          </div>
        </MotionDiv>

        {/* Bottom CTA */}
        <MotionDiv variants={fadeInUp} className="text-center mt-12">
          <p className="text-dark-400 mb-6">
            Have more questions? Ready to explore participation?
          </p>
          <a href="#invitation" className="btn-secondary">
            Request an Invitation
          </a>
        </MotionDiv>
      </div>
    </MotionSection>
  )
}
