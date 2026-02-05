'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { X, Filter, Users, Target, Globe, Sparkles, Award, Zap } from 'lucide-react'
import Faculty1 from '../components/assets/images/faculty1.jpeg'
import p1 from '../components/assets/images/p1.jpeg'
import p2 from '../components/assets/images/p2.jpeg'
import p3 from '../components/assets/images/p3.jpeg'
import p4 from '../components/assets/images/p4.jpeg'
import p5 from '../components/assets/images/p5.jpeg'
import p6 from '../components/assets/images/p6.jpeg'

const gridItems = [
  {
    id: 1,
    type: 'faculty',
    title: 'Dr. Abdelbasit Ayoub',
    role: 'Lead Facilitator',
    image: p1,
    description: 'A seasoned leadership scholar and practitioner with decades of experience working with leaders in complex, high-pressure environments.',
    categories: ['expertise', 'wisdom', 'faculty'],
    stats: { years: 25, programs: 150, regions: 15 }
  },
  {
    id: 2,
    type: 'event',
    title: 'Global Leadership Summit',
    location: 'Dubai',
    image: p2,
    description: 'Annual gathering of global leaders focusing on transformational leadership and strategic innovation.',
    categories: ['global', 'impact', 'events'],
    stats: { participants: 500, countries: 45, sessions: 30 }
  },
  {
    id: 3,
    type: 'faculty',
    title: 'Dr. Owen Fernandes',
    role: 'Co-Facilitator',
    image: p3,
    description: 'Brings over three decades of global experience in leadership development and executive coaching.',
    categories: ['coaching', 'faculty', 'experience'],
    stats: { years: 30, executives: 2000, continents: 5 }
  },
  {
    id: 4,
    type: 'event',
    title: 'Executive Immersion',
    location: 'Swiss Alps',
    image: p4,
    description: 'High-altitude leadership retreat focusing on clarity, vision, and peak performance.',
    categories: ['immersion', 'events', 'transformation'],
    stats: { altitude: '2800m', duration: '5 days', capacity: 40 }
  },
  {
    id: 5,
    type: 'impact',
    title: 'Transformational Journey',
    location: 'Global',
    image: p5,
    description: 'Measuring the impact of leadership development across organizations and cultures.',
    categories: ['impact', 'results', 'metrics'],
    stats: { growth: '87%', retention: '94%', satisfaction: '98%' }
  },
  {
    id: 6,
    type: 'methodology',
    title: 'Proven Methodology',
    location: 'Research-Based',
    image: p6,
    description: 'Evidence-based approach combining neuroscience, psychology, and leadership theory.',
    categories: ['methodology', 'research', 'faculty'],
    stats: { studies: 50, frameworks: 12, applications: '1000+' }
  }
]

const categories = [
  { id: 'all', label: 'All Experiences', icon: <Globe size={18} /> },
  { id: 'faculty', label: 'Our Faculty', icon: <Users size={18} /> },
  { id: 'events', label: 'Past Events', icon: <Target size={18} /> },
  { id: 'impact', label: 'Impact Stories', icon: <Sparkles size={18} /> },
  { id: 'methodology', label: 'Methodology', icon: <Award size={18} /> }
]

type MousePosition = { x: number; y: number }

export default function MagneticNarrativeGrid() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isGridInteractive, setIsGridInteractive] = useState(true)
  const [explodeMode, setExplodeMode] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const selectedItem = selectedId ? gridItems.find(item => item.id === selectedId) : null

  // Handle mouse movement for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current || !isGridInteractive) return
      
      const rect = gridRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isGridInteractive])

  // Calculate distance and angle for magnetic effect
  const getMagneticStyle = (index: number, total: number) => {
    if (!isGridInteractive || explodeMode) return { transform: 'none' }

    const itemWidth = 350 // Approximate card width
    const itemHeight = 400 // Approximate card height
    const cols = 3 // Number of columns
    
    const row = Math.floor(index / cols)
    const col = index % cols
    
    // Calculate card center position
    const cardCenterX = col * itemWidth + itemWidth / 2
    const cardCenterY = row * itemHeight + itemHeight / 2
    
    // Distance from mouse to card center
    const dx = mousePosition.x - cardCenterX
    const dy = mousePosition.y - cardCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Magnetic effect radius
    const effectRadius = 200
    
    if (distance < effectRadius) {
      // Repel effect when mouse is close
      const strength = (1 - distance / effectRadius) * 0.1
      const angle = Math.atan2(dy, dx)
      
      return {
        transform: `translate(${Math.cos(angle) * strength * 30}px, ${Math.sin(angle) * strength * 30}px) rotate3d(${dy / 100}, ${-dx / 100}, 0, ${strength * 3}deg)`,
        scale: 1 + strength * 0.05,
        transition: 'transform 0.3s ease-out'
      }
    }
    
    return { transform: 'none', transition: 'transform 0.5s ease-out' }
  }

  // Calculate explode positions
  const getExplodePosition = (index: number, total: number) => {
    if (!explodeMode) return {}

    const angle = (index * (360 / total)) * (Math.PI / 180)
    const radius = 500 // Explosion radius
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rotate: Math.random() * 360,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  }

  const handleExplodeToggle = () => {
    setExplodeMode(!explodeMode)
  }

  const filteredItems = activeFilter === 'all' 
    ? gridItems 
    : gridItems.filter(item => item.categories.includes(activeFilter))

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'faculty': return 'from-primary-500/20 to-primary-600/10 border-primary-500/30'
      case 'event': return 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30'
      case 'impact': return 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30'
      case 'methodology': return 'from-violet-500/20 to-violet-600/10 border-violet-500/30'
      default: return 'from-dark-800/50 to-dark-700/30 border-dark-700/50'
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'faculty': return '👨‍🏫'
      case 'event': return '🎯'
      case 'impact': return '✨'
      case 'methodology': return '🧠'
      default: return '📊'
    }
  }

  return (
    <section className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          
          
          <h2 className="heading-lg text-dark-100 mb-6">
            <span className="text-primary-400">Leadership</span> in Action
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Explore our world of transformational leadership through an interactive narrative journey
          </p>
        </div>

   

        {/* Magnetic & Explode Grid */}
        <div 
          ref={gridRef}
          className="relative min-h-[800px]"
          onMouseEnter={() => !explodeMode && setIsGridInteractive(true)}
          onMouseLeave={() => !explodeMode && setIsGridInteractive(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={explodeMode ? 'explode' : 'grid'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`grid ${explodeMode ? 'fixed inset-0 pointer-events-none' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}`}
            >
              {filteredItems.map((item, index) => {
                const magneticStyle = getMagneticStyle(index, filteredItems.length)
                const explodeStyle = getExplodePosition(index, filteredItems.length)
                
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={explodeMode ? {
                      opacity: 0,
                      x: 0,
                      y: 0,
                      scale: 0.5
                    } : {
                      opacity: 0,
                      scale: 0.9
                    }}
                    animate={explodeMode ? {
                      opacity: 1,
                      ...explodeStyle,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        duration: 0.8
                      }
                    } : {
                      opacity: 1,
                      scale: 1,
                      transition: { 
                        duration: 0.4, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.3 }
                    }}
                    style={explodeMode ? {} : magneticStyle}
                    className={`relative ${explodeMode ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}
                  >
                    {/* Card */}
                    <motion.div
                      whileHover={{ 
                        y: explodeMode ? 0 : -8,
                        scale: explodeMode ? 1.15 : 1.02,
                        transition: { duration: 0.3 }
                      }}
                      className={`card-glass overflow-hidden rounded-3xl border cursor-pointer h-full ${
                        selectedId === item.id 
                          ? 'ring-2 ring-primary-500/50' 
                          : ''
                      } ${getTypeColor(item.type)} ${explodeMode ? 'w-64 h-64' : ''}`}
                      onClick={() => setSelectedId(item.id)}
                    >
                      {/* Image Container */}
                      <div className={`relative overflow-hidden ${explodeMode ? 'h-32' : 'h-56'}`}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes={explodeMode ? "256px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                        
                      
                      </div>

                      {/* Content */}
                      <div className={`p-4 ${explodeMode ? 'text-center' : ''}`}>
                        <div className="mb-3">
                          <h3 className={`font-serif font-bold text-dark-100 mb-2 ${explodeMode ? 'text-lg' : 'text-xl'}`}>
                            {item.title}
                          </h3>
                          <div className={`flex items-center gap-2 ${explodeMode ? 'justify-center' : ''} text-sm text-dark-400 mb-2`}>
                            {item.type === 'faculty' ? (
                              <span className="text-primary-500 font-medium">{item.role}</span>
                            ) : (
                              <span className="text-dark-300">{item.location}</span>
                            )}
                          </div>
                        </div>

                        {!explodeMode && (
                          <>
                            <p className="text-dark-300 text-sm leading-relaxed mb-4 line-clamp-2">
                              {item.description}
                            </p>

                            
                          </>
                        )}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Explode Background Effect */}
          {explodeMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-b from-dark-950/90 via-dark-900/80 to-dark-950/90 backdrop-blur-sm pointer-events-none z-0"
            />
          )}

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-serif font-bold text-dark-100 mb-3">
                No items found
              </h3>
              <p className="text-dark-300">
                Try selecting a different category to explore
              </p>
            </motion.div>
          )}
        </div>

       
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-dark-950/90 backdrop-blur-md z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl z-50 p-4"
            >
              <div className={`card-glass p-8 rounded-3xl overflow-hidden ${getTypeColor(selectedItem.type)}`}>
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 bg-dark-800/50 hover:bg-dark-800 text-white p-2 rounded-full z-10 backdrop-blur-sm"
                >
                  <X size={20} />
                </button>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Image */}
                  <div className="relative h-64 lg:h-[400px] rounded-2xl overflow-hidden">
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{getTypeIcon(selectedItem.type)}</span>
                      <div>
                        <h3 className="text-3xl font-serif font-bold text-dark-100 mb-1">
                          {selectedItem.title}
                        </h3>
                        {selectedItem.type === 'faculty' ? (
                          <span className="text-primary-500 font-medium">{selectedItem.role}</span>
                        ) : (
                          <span className="text-dark-300">{selectedItem.location}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-dark-200 text-lg leading-relaxed mb-8">
                      {selectedItem.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8 p-4 rounded-2xl bg-dark-800/30">
                      {Object.entries(selectedItem.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">
                            {typeof value === 'number' && value > 100 ? `${value}+` : value}
                          </div>
                          <div className="text-xs text-dark-400 uppercase tracking-wider">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.categories.map(cat => (
                        <span 
                          key={cat} 
                          className="px-3 py-1.5 text-sm rounded-full bg-dark-800/50 text-dark-300"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Explode Mode Controls */}
      {explodeMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-dark-700/50">
            <div className="text-white font-medium">
              Explode Mode Active
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-dark-300">Hover cards to enlarge</span>
              <span className="animate-pulse">✨</span>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}