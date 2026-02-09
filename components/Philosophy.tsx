'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MotionSection, MotionDiv, fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from './ui/motion'
import { Brain, Target, Rocket, Sparkles, Zap, Eye, Scan, Focus, RocketIcon, ArrowDown } from 'lucide-react'
import AssessImg from './assets/images/p1.jpeg'
import AlignImg from './assets/images/p2.jpeg'
import AscendImg from './assets/images/p3.jpeg'

const phases = [
  {
    icon: Brain,
    label: 'ASSESS',
    title: 'Awareness Through Observation',
    description: 'Pressure reveals patterns—often quietly, but decisively. Leaders gain visibility into how stress affects their thinking, emotional regulation, decision-making, and presence.',
    detail: 'This phase builds awareness through live leadership simulations and real-time observation, making behavior visible—not theoretical.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    revealIcon: Eye,
    image: AssessImg,
  },
  {
    icon: Target,
    label: 'ALIGN',
    title: 'Intentional Response',
    description: 'Awareness alone is not enough. Leaders learn to align their responses with the reality of the situation, the expectations of the role, and the emotional state of those they lead.',
    detail: 'Alignment is where leadership becomes intentional rather than habitual.',
    color: 'from-primary-500 to-amber-500',
    bgColor: 'bg-primary-500/10',
    borderColor: 'border-primary-500/30',
    revealIcon: Zap,
    image: AlignImg,
  },
  {
    icon: Rocket,
    label: 'ASCEND',
    title: 'Conscious Leadership',
    description: 'As leaders learn to pause, regulate, and choose consciously, leadership ascends. Not through more effort—but through greater inner capacity.',
    detail: 'Leaders lead with calm visibility, credibility under pressure, clarity in uncertainty, and conscious choice when it matters most.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    revealIcon: Sparkles,
    image: AscendImg,
  },
]

export default function Philosophy() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const revealAnimations = [
    {
      // ASSESS - Brain/Scanning animation
      label: {
        initial: { scale: 1, opacity: 1 },
        animate: { 
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1],
          transition: { duration: 1.5 }
        }
      },
      title: {
        initial: { x: -20, opacity: 0 },
        animate: { 
          x: 0,
          opacity: 1,
          transition: { duration: 0.8, ease: "easeOut" }
        }
      },
      content: {
        initial: { height: 0, opacity: 0 },
        animate: { 
          height: "auto",
          opacity: 1,
          transition: { 
            duration: 0.8,
            ease: [0.04, 0.62, 0.23, 0.98]
          }
        },
        exit: {
          height: 0,
          opacity: 0,
          transition: { duration: 0.5 }
        }
      }
    },
    {
      // ALIGN - Target/Focus animation
      label: {
        initial: { scale: 1, opacity: 1 },
        animate: { 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
          transition: { duration: 1 }
        }
      },
      title: {
        initial: { y: -10, opacity: 0 },
        animate: { 
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, type: "spring", stiffness: 200 }
        }
      },
      content: {
        initial: { scale: 0.95, opacity: 0 },
        animate: { 
          scale: 1,
          opacity: 1,
          transition: { 
            duration: 0.7,
            ease: "backOut"
          }
        },
        exit: {
          scale: 0.95,
          opacity: 0,
          transition: { duration: 0.4 }
        }
      }
    },
    {
      // ASCEND - Rocket/Launch animation
      label: {
        initial: { scale: 1, opacity: 1 },
        animate: { 
          y: [0, -5, 0],
          scale: [1, 1.15, 1],
          transition: { duration: 1.2 }
        }
      },
      title: {
        initial: { y: 20, opacity: 0 },
        animate: { 
          y: 0,
          opacity: 1,
          transition: { duration: 0.7, ease: "circOut" }
        }
      },
      content: {
        initial: { y: 20, opacity: 0 },
        animate: { 
          y: 0,
          opacity: 1,
          transition: { 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }
        },
        exit: {
          y: 20,
          opacity: 0,
          transition: { duration: 0.4 }
        }
      }
    }
  ]

  const handlePhaseClick = (index: number) => {
    // If clicking an already expanded card, close it
    if (expandedPhase === index) {
      setExpandedPhase(null)
    } else {
      // Otherwise, expand the clicked card and close any others
      setExpandedPhase(index)
    }
  }

  const handleCloseAll = () => {
    setExpandedPhase(null)
  }

  // Close any open card only after the philosophy section has been fully scrolled past
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight

      const completelyAboveViewport = rect.bottom <= 0
      const completelyBelowViewport = rect.top >= viewportHeight

      if (completelyAboveViewport || completelyBelowViewport) {
        setExpandedPhase((current) => (current !== null ? null : current))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <MotionSection
      id="philosophy"
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
      
      {/* Close overlay when expanded */}
      {expandedPhase !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark-950/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={handleCloseAll}
        />
      )}

      <div
        ref={sectionRef}
        className="container-custom relative z-10"
        // Close any open card when clicking anywhere outside a card within this section
        onClick={() => {
          if (expandedPhase !== null) handleCloseAll()
        }}
      >
        {/* Section header */}
        <MotionDiv variants={fadeInUp} className="text-center mb-20">
          <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            The Framework
          </span>
          <h2 className="heading-lg text-dark-100 mb-6">
            The Core Philosophy
          </h2>
          <p className="text-xl text-dark-300 font-serif max-w-2xl mx-auto">
            At the heart of this experience is a simple but demanding progression.
          </p>
          <div className="divider-gradient max-w-xs mx-auto mt-8" />
        </MotionDiv>

        {/* Framework visualization */}
        <div className="relative max-w-6xl mx-auto">
          {/* Phases */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {phases.map((phase, index) => {
              const isExpanded = expandedPhase === index
              const isAnyExpanded = expandedPhase !== null
              const animation = revealAnimations[index]

              return (
                <MotionDiv
                  key={phase.label}
                  variants={index === 0 ? fadeInLeft : index === 2 ? fadeInRight : fadeInUp}
                  className={`relative group ${isExpanded ? 'z-30' : 'z-10'}`}
                >
                  {/* Card */}
                  <motion.div
                    layout
                    transition={{
                      layout: { duration: 0.45, ease: [0.25, 0.8, 0.4, 1] },
                    }}
                    whileHover={!isAnyExpanded ? { scale: 1.02 } : {}}
                    whileTap={!isAnyExpanded ? { scale: 0.98 } : {}}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePhaseClick(index)
                    }}
                    className={`card-glass-hover p-8 border transition-all duration-300 overflow-hidden relative ${
                      isExpanded
                        ? `${phase.borderColor} ring-2 ring-offset-2 ring-offset-dark-900 cursor-default`
                        : isAnyExpanded
                        ? 'border-dark-800 opacity-60 cursor-pointer hover:opacity-80'
                        : `${phase.borderColor} cursor-pointer`
                    }`}
                  >
                    {/* Full-card philosophical background image */}
                    {phase.image && (
                      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
                        <Image
                          src={phase.image}
                          alt={phase.title}
                          className="w-full h-full object-cover opacity-60"
                          sizes="(min-width: 1024px) 480px, 100vw"
                          priority={index === 0}
                        />
                        {/* Dark overlay to keep text legible, but lighter for more image visibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-dark-950/55 to-dark-950/75" />
                      </div>
                    )}
                    {/* ASSESS - Brain Scanning Background */}
                    {index === 0 && (
                      <div className="absolute inset-0 opacity-30">
                        {/* Brain wave grid */}
                        <div className="absolute inset-0">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                              style={{
                                top: `${(i + 1) * 12.5}%`,
                                animation: `brain-wave ${2 + i * 0.3}s ease-in-out infinite`,
                                animationDelay: `${i * 0.2}s`,
                              }}
                            />
                          ))}
                          
                          {/* Scanning effect */}
                          {isExpanded && (
                            <div className="absolute inset-0 overflow-hidden">
                              <div 
                                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                                style={{
                                  animation: `scanning 4s linear infinite`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ALIGN - Target Focus Background */}
                    {index === 1 && (
                      <div className="absolute inset-0 opacity-30 overflow-hidden">
                        {/* Concentric circles */}
                        {[1, 1.5, 2, 2.5].map((scale, i) => (
                          <div
                            key={i}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-amber-500/20 rounded-full"
                            style={{
                              width: `${scale * 60}%`,
                              height: `${scale * 60}%`,
                              animation: isExpanded ? `pulse ${3 + i * 0.5}s ease-in-out infinite` : 'none',
                              animationDelay: `${i * 0.3}s`,
                            }}
                          />
                        ))}
                        
                        {/* Focus lines */}
                        <div className="absolute inset-0">
                          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
                          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                          
                          {/* Pulsing dot */}
                          {isExpanded && (
                            <div 
                              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary-500/40 to-amber-500/40"
                              style={{
                                animation: `pulse-dot 1.5s ease-in-out infinite`,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {/* ASCEND - Rocket Launch Background */}
                    {index === 2 && (
                      <div className="absolute inset-0 opacity-30 overflow-hidden">
                        {/* Launch particles */}
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full bg-gradient-to-b from-purple-500/30 to-pink-500/30"
                            style={{
                              width: `${Math.random() * 6 + 2}px`,
                              height: `${Math.random() * 6 + 2}px`,
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animation: isExpanded ? `launch-particle ${1.5 + Math.random() * 2}s linear infinite` : 'none',
                              animationDelay: `${Math.random() * 2}s`,
                            }}
                          />
                        ))}
                        
                        {/* Rocket trail */}
                        {isExpanded && (
                          <div 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-1 h-1/2 bg-gradient-to-b from-purple-500/40 via-pink-500/30 to-transparent"
                            style={{
                              animation: `trail-glow 2s ease-in-out infinite`,
                            }}
                          />
                        )}
                        
                        {/* Star field */}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={`star-${i}`}
                            className="absolute w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            style={{
                              left: `${10 + i * 12}%`,
                              top: `${20 + i * 8}%`,
                              animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                              animationDelay: `${i * 0.3}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Content Container */}
                    <div className="relative z-10">
                      {/* Top section with icon and label */}
                      <div className="flex items-start justify-between mb-6">
                        {/* Icon */}
                        <motion.div
                          animate={isExpanded ? animation.label.animate : {}}
                          className={`relative w-16 h-16 rounded-lg ${phase.bgColor} border ${phase.borderColor} flex items-center justify-center transition-colors duration-300 ${isExpanded ? 'bg-opacity-20' : ''}`}
                        >
                          <phase.icon className="w-8 h-8 text-dark-100" />
                          
                          {/* Icon glow effect when expanded */}
                          {isExpanded && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1.5, opacity: 0.3 }}
                              className={`absolute inset-0 rounded-lg bg-gradient-to-r ${phase.color}`}
                            />
                          )}
                        </motion.div>

                        {/* Reveal icon */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`relative w-10 h-10 rounded-full ${phase.bgColor} border ${phase.borderColor} flex items-center justify-center`}
                        >
                          <phase.revealIcon className="w-5 h-5 text-dark-300" />
                          {isExpanded && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1.5, opacity: 0.2 }}
                              className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color}`}
                            />
                          )}
                        </motion.div>
                      </div>

                      {/* Label */}
                      <motion.div
                        animate={isExpanded ? animation.label.animate : {}}
                        className="mb-3"
                      >
                        <div className="inline-flex items-center gap-2">
                          <span className={`text-2xl font-serif font-bold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                            {phase.label}
                          </span>
                          {isExpanded && (
                            <>
                              {index === 0 && <Scan className="w-5 h-5 text-blue-500 animate-pulse" />}
                              {index === 1 && <Focus className="w-5 h-5 text-amber-500 animate-pulse" />}
                              {index === 2 && <RocketIcon className="w-5 h-5 text-purple-500 animate-bounce" />}
                            </>
                          )}
                        </div>
                      </motion.div>

                      {/* Title */}
                      <AnimatePresence mode="wait">
                        {isExpanded && (
                          <motion.h3
                            key={`title-${index}`}
                            variants={animation.title}
                            initial="initial"
                            animate="animate"
                            className="text-xl font-semibold text-dark-100 mb-4"
                          >
                            {phase.title}
                          </motion.h3>
                        )}
                      </AnimatePresence>

                      {/* Description and Detail - Animated Reveal */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            key={`content-${index}`}
                            variants={animation.content}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="overflow-hidden"
                          >
                            {/* Reveal indicator */}
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className={`h-0.5 bg-gradient-to-r ${phase.color} mb-3`}
                            />

                            {/* Description */}
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                              className="text-dark-300 leading-relaxed mb-4"
                            >
                              {phase.description}
                            </motion.p>

                            {/* Detail */}
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5, duration: 0.5 }}
                              className="text-dark-400 text-sm leading-relaxed italic"
                            >
                              {phase.detail}
                            </motion.p>

                            {/* Close hint (only when this is the only interaction) */}
                            {!isAnyExpanded && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-6 pt-4 border-t border-dark-800"
                              >
                                <p className="text-xs text-dark-500 text-center">
                                  Click again to close
                                </p>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Hint when not expanded – subtle scroll/expand indicator */}
                      {!isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 flex justify-center"
                        >
                          <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                            className="flex flex-col items-center text-dark-500"
                          >
                            <span className="text-[10px] uppercase tracking-[0.25em] mb-1">
                              Explore
                            </span>
                            <ArrowDown className="w-4 h-4" />
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </MotionDiv>
              )
            })}
          </div>

        </div>

        {/* Bottom quote */}
        <MotionDiv variants={fadeInUp} className="mt-20 text-center">
          <div className="inline-block card-glass p-8 md:p-12">
            <p className="text-xl md:text-2xl text-dark-200 font-serif leading-relaxed max-w-3xl">
              "Leadership ascends not through more effort—
              <br className="hidden md:block" />
              <span className="text-gradient"> but through greater inner capacity."</span>
            </p>
          </div>
        </MotionDiv>

        {/* Section end line */}
        <div className="divider-gradient w-full max-w-4xl mx-auto mt-20" />
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes brain-wave {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes scanning {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.05); }
        }
        
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
        }
        
        @keyframes launch-particle {
          0% {
            transform: translateY(100px) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes trail-glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </MotionSection>
  )
}