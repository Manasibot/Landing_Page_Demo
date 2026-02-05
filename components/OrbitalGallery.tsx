'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Faculty1 from '../components/assets/images/faculty1.jpeg'
import p1 from '../components/assets/images/p1.jpeg'
import p2 from '../components/assets/images/p2.jpeg'
import p3 from '../components/assets/images/p3.jpeg'
import p4 from '../components/assets/images/p4.jpeg'
import p5 from '../components/assets/images/p5.jpeg'
import p6 from '../components/assets/images/p6.jpeg'



const orbitalItems = [
    {
        id: 1,
        type: 'faculty',
        title: 'Dr. Abdelbasit Ayoub',
        role: 'Lead Facilitator',
        image: p1,
        description: 'Delivering keynote on leadership psychology',
        category: 'Expertise'
    },
    {
        id: 2,
        type: 'event',
        title: 'Leadership Retreat',
        location: 'Swiss Alps',
        image: p2,
        description: 'Annual executive retreat in mountain setting',
        category: 'Immersion'
    },
    {
        id: 3,
        type: 'faculty',
        title: 'Dr. Owen Fernandes',
        role: 'Co-Facilitator',
        image: p3,
        description: 'One-on-one coaching session',
        category: 'Personalized'
    },
    {
        id: 4,
        type: 'event',
        title: 'Workshop Series',
        location: 'Dubai',
        image: p4,
        description: 'Interactive leadership workshop',
        category: 'Engagement'
    },
    {
        id: 5,
        type: 'event',
        title: 'Global Forum',
        location: 'Singapore',
        image: p5,
        description: 'International leadership forum',
        category: 'Global'
    },
    {
        id: 6,
        type: 'faculty',
        title: 'Masterclass',
        location: 'London',
        image: p6,
        description: 'Advanced leadership techniques',
        category: 'Mastery'
    }
]

export default function OrbitalGallery() {
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [rotation, setRotation] = useState(0)

    const selectedItem = selectedId ? orbitalItems.find(item => item.id === selectedId) : null

    // Auto-rotation effect
    useEffect(() => {
        if (isPaused || selectedId) return

        const interval = setInterval(() => {
            setRotation(prev => (prev + 0.5) % 360)
        }, 50)

        return () => clearInterval(interval)
    }, [isPaused, selectedId])

    const getPosition = (index: number, total: number) => {
        const radius = 280 // Orbit radius
        const angle = (index * (360 / total) + rotation) * (Math.PI / 180)

        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        }
    }

    return (
        <section className="section-padding bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden min-h-screen">
            {/* Animated space background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
                        initial={{
                            x: Math.random() * 100 + 'vw',
                            y: Math.random() * 100 + 'vh',
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="container-custom relative z-10">
                <div className="text-center mb-20">
                    {/* <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            Cosmic Impact
          </span> */}
                    <h2 className="heading-lg text-dark-100 mb-6">
                        A Universe of <span className="text-primary-400">Leadership</span>
                    </h2>
                    <p className="text-xl text-dark-300 max-w-3xl mx-auto mb-8">
                        Explore our galaxy of transformational experiences
                    </p>
                    {/* <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-500"></div>
              <span className="text-sm text-dark-300">Faculty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
              <span className="text-sm text-dark-300">Events</span>
            </div>
          </div> */}
                </div>

                {/* Main Orbital System */}
                <div
                    className="relative h-[700px] flex items-center justify-center"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => !selectedId && setIsPaused(false)}
                >
                    {/* Central Sun */}
                    <div className="absolute w-48 h-48">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: 360,
                            }}
                            transition={{
                                scale: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                },
                                rotate: {
                                    duration: 40,
                                    repeat: Infinity,
                                    ease: "linear"
                                }
                            }}
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 via-primary-400/10 to-primary-500/20 blur-xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-4 rounded-full bg-gradient-to-r from-primary-500/30 to-primary-600/20 blur-lg"
                        />
                        <div className="absolute inset-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                            {/* <div className="text-center">
                <span className="text-white text-sm font-medium block mb-1">Explore</span>
                <span className="text-white/80 text-xs">Orbital View</span>
              </div> */}
                        </div>
                    </div>

                    {/* Orbiting Planets */}
                    {orbitalItems.map((item, index) => {
                        const position = getPosition(index, orbitalItems.length)
                        const isSelected = selectedId === item.id

                        return (
                            <motion.div
                                key={item.id}
                                initial={false}
                                animate={{
                                    x: position.x,
                                    y: position.y,
                                    scale: isSelected ? 1.3 : isPaused ? 1.1 : 1,
                                    opacity: selectedId ? (isSelected ? 1 : 0.3) : 1,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20
                                }}
                                className={`absolute cursor-pointer z-20 ${item.type === 'faculty'
                                    ? 'border-2 border-primary-500/50'
                                    : 'border-2 border-cyan-500/50'
                                    } rounded-full overflow-hidden shadow-2xl`}
                                style={{
                                    width: isSelected ? '180px' : '220px',
                                    height: isSelected ? '180px' : '220px',
                                }}
                                onClick={() => setSelectedId(isSelected ? null : item.id)}
                                onHoverStart={() => setIsPaused(true)}
                                onHoverEnd={() => !selectedId && setIsPaused(false)}
                            >
                                {/* Planet Glow */}
                                <motion.div
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className={`absolute -inset-4 rounded-full blur-lg ${item.type === 'faculty'
                                        ? 'bg-primary-500/30'
                                        : 'bg-cyan-500/30'
                                        }`}
                                />

                                {/* Planet Image */}
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 220px, 180px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />

                                    {/* Planet Label */}
                                    {/* <div className="absolute bottom-2 left-0 right-0 text-center">
                    <div className={`inline-block px-3 py-1 rounded-full backdrop-blur-sm ${
                      item.type === 'faculty' 
                        ? 'bg-primary-500/20' 
                        : 'bg-cyan-500/20'
                    }`}>
                      <span className="text-white text-xs font-medium">
                        {item.type === 'faculty' ? item.role : item.location}
                      </span>
                    </div>
                  </div> */}
                                </div>

                                {/* Orbital Ring */}
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className={`absolute -inset-6 border rounded-full ${item.type === 'faculty'
                                        ? 'border-primary-500/20'
                                        : 'border-cyan-500/20'
                                        }`}
                                />
                            </motion.div>
                        )
                    })}

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {orbitalItems.map((item, index) => {
                            const position = getPosition(index, orbitalItems.length)
                            return (
                                <motion.line
                                    key={`line-${item.id}`}
                                    x1="50%"
                                    y1="50%"
                                    x2={`calc(50% + ${position.x}px)`}
                                    y2={`calc(50% + ${position.y}px)`}
                                    stroke="url(#gradient-line)"
                                    strokeWidth="1"
                                    strokeDasharray="4,4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                />
                            )
                        })}
                        <defs>
                            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgb(139 92 246 / 0.3)" />
                                <stop offset="100%" stopColor="rgb(139 92 246 / 0.1)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Selected Item Details Modal */}
                <AnimatePresence>
                    {selectedItem && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-40"
                            />

                            {/* Modal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-50 p-4"
                            >
                                <div className={`card-glass p-8 rounded-3xl overflow-hidden ${selectedItem.type === 'faculty'
                                    ? 'border-primary-500/30'
                                    : 'border-cyan-500/30'
                                    }`}>
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-6 right-6 bg-dark-800/50 hover:bg-dark-800 text-white p-2 rounded-full z-10"
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                                        {/* Image */}
                                        <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden">
                                            <Image
                                                src={selectedItem.image}
                                                alt={selectedItem.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                                            <div className="absolute top-4 left-4">
                                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${selectedItem.type === 'faculty'
                                                    ? 'bg-primary-500/20 text-primary-300'
                                                    : 'bg-cyan-500/20 text-cyan-300'
                                                    }`}>
                                                    {selectedItem.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <h3 className="text-3xl font-serif font-bold text-dark-100 mb-3">
                                                {selectedItem.title}
                                            </h3>

                                            <div className="mb-6">
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${selectedItem.type === 'faculty'
                                                    ? 'bg-primary-500/10 text-primary-400'
                                                    : 'bg-cyan-500/10 text-cyan-400'
                                                    }`}>
                                                    {selectedItem.type === 'faculty' ? '👨‍🏫 Faculty' : '🎯 Event'}
                                                </span>
                                                {selectedItem.type === 'faculty' && (
                                                    <span className="ml-3 text-dark-300">{selectedItem.role}</span>
                                                )}
                                            </div>

                                            <p className="text-dark-200 text-lg leading-relaxed mb-6">
                                                {selectedItem.description}
                                            </p>

                                            <div className="pt-6 border-t border-dark-800/50">
                                                <p className="text-dark-400 text-sm">
                                                    {selectedItem.type === 'faculty'
                                                        ? 'Tap another orbiting item to explore more'
                                                        : 'Click on faculty members to learn about our experts'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Instructions */}
                {/* <div className="text-center mt-20">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-dark-800/30 backdrop-blur-sm rounded-2xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center">
                                <span className="text-primary-400">👆</span>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-medium">Hover to pause orbit</p>
                                <p className="text-dark-400 text-sm">Explore items freely</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center">
                                <span className="text-primary-400">🖱️</span>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-medium">Click to focus</p>
                                <p className="text-dark-400 text-sm">View detailed information</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center">
                                <span className="text-primary-400">✨</span>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-medium">Purple = Faculty</p>
                                <p className="text-dark-400 text-sm">Cyan = Events</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    )
}