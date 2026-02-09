'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MotionSection, MotionDiv, fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from './ui/motion'
import { ArrowRight } from 'lucide-react'

const days = [
  {
    id: 1,
    day: 1,
    title: 'Pressure & Awareness',
    description: 'Understanding how pressure shapes behavior and decision-making.',
    focus: 'Foundation',
    // Deep ocean pressure / depth imagery
    imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    day: 2,
    title: 'Emotional Regulation & Presence',
    description: 'Leading without emotional suppression or loss of authority.',
    focus: 'Regulation',
    // Calm zen stones / balance imagery
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 3,
    day: 3,
    title: 'Decision-Making Under Stress',
    description: 'Clarity when information is incomplete and time is scarce.',
    focus: 'Decisions',
    // Chess pieces / strategic decision imagery
    imageUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: 4,
    day: 4,
    title: 'Leadership Alignment',
    description: 'Adapting leadership stance to context, people, and responsibility.',
    focus: 'Alignment',
    // Compass / navigation alignment imagery
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 5,
    day: 5,
    title: 'Conscious Leadership Choice',
    description: 'Sustaining calm, credibility, and clarity beyond the experience.',
    focus: 'Integration',
    // Sunrise / new horizon / clarity imagery
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1974&auto=format&fit=crop',
  },
]

interface AccordionItemProps {
  item: typeof days[0]
  isActive: boolean
  onMouseEnter: () => void
}

function AccordionItem({ item, isActive, onMouseEnter }: AccordionItemProps) {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out border border-dark-700/50
        ${isActive ? 'w-[320px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { 
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = 'https://placehold.co/400x450/1e293b/d4a012?text=Day+' + item.day
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/30" />

      {/* Day number badge - always visible */}
      <div 
        className={`
          absolute top-4 transition-all duration-500 ease-in-out
          ${isActive ? 'left-4' : 'left-1/2 -translate-x-1/2'}
        `}
      >
        <div className="w-10 h-10 rounded-full bg-primary-600/90 border border-primary-500 flex items-center justify-center">
          <span className="text-dark-950 font-serif font-bold text-sm">
            {item.day}
          </span>
        </div>
      </div>

      {/* Content when active */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 p-6
          transition-all duration-500 ease-in-out
          ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        {/* Focus tag */}
        <span className="inline-block px-3 py-1 bg-primary-600/20 border border-primary-600/40 rounded-full text-primary-400 text-xs font-medium mb-3">
          {item.focus}
        </span>
        
        {/* Title */}
        <h3 className="text-xl font-serif font-semibold text-dark-100 mb-2">
          {item.title}
        </h3>
        
        {/* Description */}
        <p className="text-dark-300 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Vertical title when inactive - centered width-wise, at bottom of bar */}
      <span
        className={`
          absolute text-dark-300 font-semibold whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
        style={{
          writingMode: 'vertical-rl',
          left: '50%',
          bottom: 'calc(1rem + 2%)',
          fontSize: 'calc(1rem + 4pt)',
          transform: isActive ? 'none' : 'translate(-50%, 0) rotate(180deg)',
        }}
      >
        Day {item.day}
      </span>
    </div>
  )
}

export default function Journey() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleItemHover = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <MotionSection
      id="journey"
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/30 to-dark-900" />

      <div className="container-custom relative z-10">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Side: Text Content */}
          <MotionDiv variants={fadeInLeft} className="w-full lg:w-1/2 text-center lg:text-left">
            <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              The Experience
            </span>
            <h2 className="heading-lg text-dark-100 mb-6">
              The 5-Day Leadership Journey
            </h2>
            <p className="text-xl text-dark-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Each day deepens the leader's capacity to remain conscious under pressure.
            </p>
            
            {/* Additional info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                <span className="text-dark-400">Live leadership simulations</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                <span className="text-dark-400">Real-time observation & reflection</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                <span className="text-dark-400">Guided peer dialogue</span>
              </div>
            </div>

            {/* Event details badge */}
            <div className="inline-flex flex-wrap items-center gap-3 px-6 py-3 card-glass border-primary-600/30 text-sm">
              <span className="text-dark-300">April 20–24, 2026</span>
              <span className="text-primary-600">•</span>
              <span className="text-dark-300">Dubai</span>
              <span className="text-primary-600">•</span>
              <span className="text-dark-300">In-Person</span>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#invitation"
                className="btn-primary inline-flex items-center gap-2"
              >
                Request an Invitation
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </MotionDiv>

          {/* Right Side: Image Accordion */}
          <MotionDiv variants={fadeInRight} className="w-full lg:w-1/2">
            {/* Desktop Accordion */}
            <div className="hidden md:flex flex-row items-center justify-center lg:justify-end gap-3">
              {days.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>

            {/* Mobile View - Stacked Cards */}
            <div className="md:hidden space-y-4">
              {days.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="relative h-40 rounded-xl overflow-hidden border border-dark-700/50"
                >
                  {/* Background Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/70 to-dark-900/50" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary-600/90 border border-primary-500 flex items-center justify-center">
                        <span className="text-dark-950 font-serif font-bold text-sm">
                          {item.day}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-primary-600/20 border border-primary-600/40 rounded-full text-primary-400 text-xs font-medium">
                        {item.focus}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-dark-100 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-dark-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </MotionDiv>
        </div>

        {/* Section end line */}
        <div className="divider-gradient w-full max-w-6xl mx-auto mt-20" />
      </div>
    </MotionSection>
  )
}
