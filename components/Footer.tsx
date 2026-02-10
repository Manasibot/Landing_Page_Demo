'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import FooterBg from './assets/dubai/footer.jpg'
import LogoImg from './assets/logo/logo.png'

const navLinks = [
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#journey', label: 'The Journey' },
  { href: '#faculty', label: 'Faculty' },
  { href: '#details', label: 'Details' },
  { href: '#faq', label: 'FAQ' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden py-8 border-t border-dark-700">
      {/* Dubai footer background image – same treatment as EventDetails */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          <Image
            src={FooterBg}
            alt="Dubai skyline at night"
            fill
            priority
            className="object-cover object-[center_88%] blur-[1.5px]"
          />
          {/* Dark gradient overlay for legibility, matching EventDetails style */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/50 to-dark-900/70" />
        </div>
      </div>

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
            {/* Logo encircled with golden border and blurred background */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full border border-primary-500 bg-dark-900/40 backdrop-blur-md">
              <Image
                src={LogoImg}
                alt="Leading Under Pressure logo"
                width={64}
                height={64}
                className="w-[3.25rem] h-[3.25rem] object-contain"
                priority
              />
            </div>
            <div className="text-left">
              <span className="text-dark-50 font-serif text-2xl font-semibold tracking-tight block leading-tight">
                Leading Under Pressure
              </span>
              <span className="text-dark-300 text-xs font-medium tracking-[0.2em] uppercase mt-1 block">
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
                className="text-dark-200 hover:text-primary-400 text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Event info */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 mb-4 px-4 py-2 rounded-full bg-dark-800/50 border border-dark-600 backdrop-blur-sm">
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
            <p className="text-dark-300 text-sm tracking-wide">
              © {new Date().getFullYear()} Leading Under Pressure. All rights reserved.
            </p>
            <p className="text-primary-500 text-xs tracking-widest uppercase">
              Led by Dr. Abdelbasit Ayoub & Dr. Owen Fernandes
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
