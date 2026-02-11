'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import LogoImg from './assets/logo/ah logo.png'

const navLinks = [
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#journey', label: 'The Journey' },
  { href: '#faculty', label: 'Faculty' },
  { href: '#details', label: 'Details' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-dark-900/95 backdrop-blur-xl border-b border-dark-700'
            : 'bg-transparent'
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="https://ascendhigher.ae/" target="_blank" rel="noopener noreferrer" className="flex items-center group mt-2">
              <Image
                src={LogoImg}
                alt="Ascend Higher"
                width={480}
                height={180}
                className="h-32 w-auto object-contain sm:h-36"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-dark-200 hover:text-primary-500 text-sm font-medium tracking-wide transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <a href="#invitation" className="btn-primary text-sm py-3 px-6">
                Request Invitation
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-dark-200 hover:text-primary-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav className="relative pt-24 px-6">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-dark-200 hover:text-primary-500 text-2xl font-serif tracking-wide transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#invitation"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary mt-4 text-center"
                >
                  Request Invitation
                </motion.a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
