'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MotionSection, MotionDiv, fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from './ui/motion'
import Image from 'next/image'
import Faculty1 from '../components/assets/images/faculty1.jpeg'
import Faculty2 from '../components/assets/images/faculty2.jpeg'
import Faculty3 from '../components/assets/images/faculty3.jpeg'

const faculty = [
  {
    name: 'Dr. Abdelbasit Ayoub',
    role: 'Lead Facilitator',
    image: Faculty1,
    bio: 'A seasoned leadership scholar and practitioner with decades of experience working with leaders in complex, high-pressure environments across regions and cultures. His work sits at the intersection of leadership psychology, decision-making under pressure, and human behavior.',
    highlight: 'Known for his calm authority and depth of insight, Dr. Ayoub creates learning environments that are both intellectually rigorous and psychologically safe.',
    style: 'His facilitation style is reflective, precise, and deeply human—grounded in real-world leadership realities rather than abstract theory.',
  },
  {
    name: 'Dr. Owen Fernandes',
    role: 'Co-Facilitator',
    image: Faculty2,
    bio: 'Brings over three decades of global experience in leadership development, executive coaching, and organizational capability building across the Middle East, Europe, and Asia. His work focuses on inner leadership capacity.',
    highlight: 'With a strong foundation in psychometrics, experiential learning, and reflective practice, Dr. Owen translates deep insight into practical leadership awareness.',
    style: 'His facilitation style blends clarity, warmth, and challenge—supporting leaders to move from automatic reaction to conscious choice.',
  },
]

export default function Faculty() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <MotionSection
      id="faculty"
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary-500/5"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-400/10"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <MotionDiv variants={fadeInUp} className="text-center mb-0">
          <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            Your Guides
          </span>
          <h2 className="heading-lg text-dark-100 mb-6">
            Faculty & <span className="text-primary-400">Facilitation</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Together, they bring over <span className="text-primary-400">50 years</span> of global leadership
            development experience.
          </p>
        </MotionDiv>

        {/* Circular Layout with Three Circles */}
        <div className="relative min-h-[600px] flex items-center justify-center mb-16">

          {/* Outer Large Circle Container */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-[800px] h-[800px] rounded-full border border-primary-500/10"
          />

          {/* Animated Connecting Rings */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-[700px] h-[700px] rounded-full border border-primary-500/5"
          />

          {/* Center Circle (Faculty3) */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-30"
          >
            {/* Outer Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-8 bg-primary-500/30 rounded-full blur-xl"
            />

            {/* Main Circle */}
            <div className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-primary-500/40 shadow-2xl">
              <Image
                src={Faculty3}
                alt="Center Faculty"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 300px, 350px"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent" />
            </div>

            {/* Animated Rings */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -inset-12 border border-primary-500/15 rounded-full"
            />
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -inset-20 border border-primary-400/10 rounded-full"
            />
          </motion.div>

          {/* Removed Connecting Lines since only center circle remains */}

          {/* Active Indicator for Faculty Details Selection */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-[380px] h-[380px] md:w-[420px] md:h-[420px] rounded-full border-2 border-primary-500/30 pointer-events-none z-20"
          />
        </div>

        {/* Faculty Details Panel (Below Circles) */}
        <MotionDiv variants={fadeInUp}>
          <div className="max-w-9xl mx-auto -mt-10">
            <div className="grid lg:grid-cols-2 gap-8">
              {faculty.map((person, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1, // Always fully visible
                    y: 0
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-glass p-8 cursor-pointer transition-all duration-500 relative pt-24 border-primary-500/30 hover:scale-[1.02] hover:border-primary-500/50"
                  onClick={() => setActiveIndex(index)}
                 >
                  {/* Faculty Circle on Top Border */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 -mt-20">
                    {/* Outer Glow - Always active */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -inset-4 bg-primary-500/20 rounded-full blur-md"
                    />

                    {/* Main Circle */}
                    <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden border-4 border-primary-500/30 shadow-lg group -mt-54" >
                      <Image
                        src={person.image}
                        alt={person.name}
                        
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="620px"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/40 to-transparent" />

                    </div>

                    {/* Animated Ring - Always rotating */}
                    <motion.div
                      animate={{
                        rotate: index === 0 ? 360 : -360,
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute -inset-4 border border-primary-500/20 rounded-full"
                    />
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6 relative z-20">
                    <h3 className="text-2xl font-serif font-semibold text-dark-100 mb-1 relative z-30">
                      {person.name}
                    </h3>
                    <span className="text-primary-500 font-medium relative z-30">
                      {person.role}
                    </span>
                  </div>

                  <p className="text-dark-300 leading-relaxed mb-4">
                    {person.bio}
                  </p>

                  <p className="text-dark-200 leading-relaxed mb-4">
                    {person.highlight}
                  </p>

                  <p className="text-dark-400 italic text-sm leading-relaxed">
                    {person.style}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </MotionDiv>

        {/* Center Faculty Details */}
        {/* <MotionDiv
          variants={fadeInUp}
          className="max-w-3xl mx-auto mt-20"
        >
          <div className="card-glass p-8 text-center">
            <h3 className="text-2xl font-serif font-semibold text-dark-100 mb-4">
              Collaborative Excellence
            </h3>
            <p className="text-dark-300 leading-relaxed mb-4">
              Our faculty members work in seamless collaboration, bringing complementary perspectives
              and methodologies to create a rich, multi-dimensional learning experience. Each session
              benefits from their combined expertise and shared commitment to leadership excellence.
            </p>
            <p className="text-primary-400 font-medium">
              Tap on either faculty member's circle above to view their individual profile
            </p>
          </div>
        </MotionDiv> */}
      </div>
    </MotionSection>
  )
}