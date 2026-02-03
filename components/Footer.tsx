'use client'

import { motion } from 'framer-motion'
import { Globe } from '@/components/ui/globe'

const navLinks = [
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#journey', label: 'The Journey' },
  { href: '#faculty', label: 'Faculty' },
  { href: '#details', label: 'Details' },
  { href: '#faq', label: 'FAQ' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden py-8 border-t border-dark-800/50">
      {/* Globe background - anchored to bottom, show full upper 180° (top hemisphere) */}
      <div className="absolute inset-0 flex justify-center items-end overflow-hidden">
        <div className="relative w-full max-w-[600px] aspect-[2/1] overflow-hidden">
          <Globe
            className="absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-none aspect-square min-w-full min-h-full"
            config={{ mapBrightness: 0.7 }}
          />
        </div>
      </div>
      {/* Semi-transparent overlay so earth is visible but content readable */}
      <div className="absolute inset-0 bg-dark-950/80 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4 group"
          >
            <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-900/20 group-hover:shadow-primary-500/20 transition-shadow duration-300">
              <span className="text-dark-950 font-serif font-bold text-2xl">L</span>
            </div>
            <div className="text-left">
              <span className="text-dark-50 font-serif text-2xl font-semibold tracking-tight block leading-tight">
                Leading Under Pressure
              </span>
              <span className="text-dark-400 text-xs font-medium tracking-[0.2em] uppercase mt-1 block">
                Executive Leadership Experience
              </span>
            </div>
          </motion.a>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-5 md:gap-8 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-dark-300 hover:text-primary-400 text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Event info */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 mb-4 px-3 py-2 rounded-lg bg-dark-900/30 border border-dark-700/30 backdrop-blur-sm">
            <span className="text-dark-200 font-medium">Dubai</span>
            <span className="text-primary-500/60 text-sm">·</span>
            <span className="text-dark-200 font-medium">April 20–24, 2026</span>
            <span className="text-primary-500/60 text-sm">·</span>
            <span className="text-dark-300 text-sm">By Invitation Only</span>
          </div>

          {/* Divider */}
          <div className="divider-gradient w-full max-w-sm mb-4" />

          {/* Copyright & Credits */}
          <div className="space-y-1">
            <p className="text-dark-400 text-sm tracking-wide">
              © {new Date().getFullYear()} Leading Under Pressure. All rights reserved.
            </p>
            <p className="text-dark-500 text-xs tracking-widest uppercase">
              Led by Dr. Abdelbasit Ayoub & Dr. Owen Fernandes
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
