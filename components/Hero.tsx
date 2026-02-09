'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Lock, ArrowDown } from 'lucide-react'
import { ImagesSlider } from '@/components/ui/images-slider'
import { TypewriterEffectCycling } from '@/components/ui/typewriter-effect'

const HERO_SLIDER_IMAGES = [
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ================= BACKGROUND SLIDESHOW ================= */}
      <div className="absolute inset-0 -z-30">
        <ImagesSlider
          images={HERO_SLIDER_IMAGES}
          overlay={true}
          overlayClassName="bg-gradient-to-b from-dark-900/40 via-dark-900/70 to-dark-900"
          className="h-full w-full"
          autoplay={true}
          direction="right"
        >
          <></>
        </ImagesSlider>
      </div>

      {/* ================= ANIMATED GRADIENT ORBS ================= */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary-500/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-gradient-radial from-primary-700/15 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* ================= GRID PATTERN OVERLAY ================= */}
      <div
        className="absolute inset-0 opacity-[0.02] -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,160,18,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,160,18,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 container-custom text-center px-4 py-32">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="heading-xl mb-8"
        >
          <span className="block text-dark-50">Leading Under</span>
          <span className="block text-gradient glow-text mt-2">
            Pressure
          </span>
        </motion.h1>

        {/* Tagline – typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl lg:text-3xl text-dark-200 font-serif italic max-w-3xl mx-auto mb-6"
        >
          <TypewriterEffectCycling
            className="!font-normal italic font-serif text-xl md:text-2xl lg:text-3xl text-dark-200 max-w-3xl mx-auto text-center"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-dark-200 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          An immersive leadership experience for leaders who operate where
          decisions carry real consequence—and who want to lead with clarity,
          composure, and conscious choice when it matters most.
        </motion.p>

        {/* Executive Leadership Experience + Event details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium tracking-wide">
              Executive Leadership Experience
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-dark-200">
              <MapPin className="w-5 h-5 text-primary-500" />
              <span className="font-medium">Dubai</span>
            </div>
            <div className="flex items-center gap-2 text-dark-200">
              <Calendar className="w-5 h-5 text-primary-500" />
              <span className="font-medium">April 20–24, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-dark-200">
              <Lock className="w-5 h-5 text-primary-500" />
              <span className="font-medium">By Invitation Only</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a href="#invitation" className="btn-primary">
            Request an Invitation
          </a>
          <a href="#philosophy" className="btn-secondary">
            Explore the Experience
          </a>
        </motion.div>
      </div>

      {/* ================= BOTTOM DIVIDER ================= */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="divider-gradient w-full" />
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-dark-300"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

    </section>
  )
}
