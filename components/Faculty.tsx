'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MotionSection, MotionDiv, fadeInUp, staggerContainer } from './ui/motion'
import { ProfileCard } from '@/components/ui/profile-card'
import Faculty1 from './assets/images/faculty1.jpeg'
import Faculty2 from './assets/images/faculty2.jpeg'

const faculty = [
  {
    name: 'Dr. Abdelbasit Ayoub',
    role: 'Lead Facilitator',
    image: Faculty1,
    description:
      'A seasoned leadership scholar and practitioner with decades of experience working with leaders in complex, high-pressure environments across regions and cultures. His work sits at the intersection of leadership psychology, decision-making under pressure, and human behavior. Known for his calm authority and depth of insight, Dr. Ayoub creates learning environments that are both intellectually rigorous and psychologically safe. His facilitation style is reflective, precise, and deeply human—grounded in real-world leadership realities rather than abstract theory.',
  },
  {
    name: 'Dr. Owen Fernandes',
    role: 'Co-Facilitator',
    image: Faculty2,
    description:
      'Brings over three decades of global experience in leadership development, executive coaching, and organizational capability building across the Middle East, Europe, and Asia. His work focuses on inner leadership capacity. With a strong foundation in psychometrics, experiential learning, and reflective practice, Dr. Owen translates deep insight into practical leadership awareness. His facilitation style blends clarity, warmth, and challenge—supporting leaders to move from automatic reaction to conscious choice.',
  },
]

const fadeTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
}

export default function Faculty() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const person = faculty[currentIndex]
  const isHoveringRef = useRef(false)
  const lastAdvanceTimeRef = useRef(Date.now())

  const goPrev = () => {
    setCurrentIndex((i) => (i === 0 ? faculty.length - 1 : i - 1))
  }
  const goNext = () => {
    setCurrentIndex((i) => (i === faculty.length - 1 ? 0 : i + 1))
  }

  useEffect(() => {
    const id = setInterval(() => {
      if (!isHoveringRef.current && Date.now() - lastAdvanceTimeRef.current >= 5000) {
        goNext()
        lastAdvanceTimeRef.current = Date.now()
      }
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const handleMouseLeave = () => {
    isHoveringRef.current = false
    goNext()
    lastAdvanceTimeRef.current = Date.now()
  }

  return (
    <MotionSection
      id="faculty"
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary-500/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-400/10"
        />
      </div>

      <div className="container-custom relative z-10 pb-12">
        {/* Section header */}
        <MotionDiv variants={fadeInUp} className="text-center mb-16">
          <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            Your Guides
          </span>
          <h2 className="heading-lg text-dark-100 mb-6">
            Faculty & <span className="text-primary-400">Facilitation</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Together, they bring over{' '}
            <span className="text-primary-400">50 years</span> of global
            leadership development experience.
          </p>
        </MotionDiv>

        {/* Scrollable profile with fade */}
        <div className="relative min-h-[520px] flex flex-col items-center justify-center">
          <div
            className="w-full flex justify-center"
            onMouseEnter={() => { isHoveringRef.current = true }}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                {...fadeTransition}
                className="w-full flex justify-center"
              >
                <ProfileCard
                name={person.name}
                title={person.role}
                description={person.description}
                imageUrl={person.image}
                showSocial={true}
                reverse={currentIndex === 1}
                className="max-w-none px-0 max-w-5xl mx-auto"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom left & right navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-between items-center mt-8 w-full max-w-5xl mx-auto px-4"
        >
            <motion.button
              type="button"
              onClick={goPrev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-dark-800/90 border border-dark-600 text-primary-400 hover:text-primary-300 hover:border-primary-500/50 backdrop-blur-sm transition-colors shadow-lg"
              aria-label="Previous profile"
            >
              <ChevronLeft className="w-7 h-7" />
            </motion.button>
            <span className="text-dark-400 text-sm font-medium tabular-nums">
              {currentIndex + 1} / {faculty.length}
            </span>
            <motion.button
              type="button"
              onClick={goNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-dark-800/90 border border-dark-600 text-primary-400 hover:text-primary-300 hover:border-primary-500/50 backdrop-blur-sm transition-colors shadow-lg"
              aria-label="Next profile"
            >
              <ChevronRight className="w-7 h-7" />
            </motion.button>
        </motion.div>

        <div className="divider-gradient w-full max-w-5xl mx-auto mt-10" />
      </div>
    </MotionSection>
  )
}
