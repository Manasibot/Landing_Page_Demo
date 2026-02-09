'use client'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Twitter, Youtube, Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ProfileCardProps {
  name?: string
  title?: string
  description?: string
  imageUrl?: string | StaticImageData
  linkedinUrl?: string
  twitterUrl?: string
  youtubeUrl?: string
  className?: string
  /** Set to false to hide social links row (e.g. for faculty profiles) */
  showSocial?: boolean
  /** When true, photo is on the right and info box on the left (for alternating layout) */
  reverse?: boolean
}

export function ProfileCard(props: ProfileCardProps) {
  const {
    name = 'Michael Chen',
    title = 'Senior Software Engineer, Cloud Infrastructure',
    description = 'Michael Chen is a seasoned software engineer at TechFlow Solutions with over 8 years of experience building scalable cloud infrastructure and microservices. He specializes in DevOps automation and leads the platform engineering team that serves millions of users daily.',
    imageUrl = 'https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    linkedinUrl = '#',
    twitterUrl = '#',
    youtubeUrl = '#',
    className,
    showSocial = true,
    reverse = false,
  } = props

  const socialIcons = [
    {
      icon: Linkedin,
      url: linkedinUrl,
      label: 'LinkedIn',
      hoverClass: 'hover:bg-[#0A66C2] hover:shadow-lg hover:shadow-[#0A66C2]/25',
    },
    {
      icon: Twitter,
      url: twitterUrl,
      label: 'Twitter',
      hoverClass: 'hover:bg-[#1DA1F2] hover:shadow-lg hover:shadow-[#1DA1F2]/25',
    },
    {
      icon: Youtube,
      url: youtubeUrl,
      label: 'YouTube',
      hoverClass: 'hover:bg-[#FF0000] hover:shadow-lg hover:shadow-[#FF0000]/25',
    },
  ]

  const imageSrc = typeof imageUrl === 'string' ? imageUrl : imageUrl
  const imageWidth = typeof imageUrl === 'string' ? 470 : imageUrl.width ?? 470
  const imageHeight = typeof imageUrl === 'string' ? 470 : imageUrl.height ?? 470

  return (
    <div className={cn('w-full max-w-5xl mx-auto px-4', className)}>
      {/* Desktop */}
      <div className={cn('hidden md:flex relative items-center', reverse && 'flex-row-reverse')}>
        {/* Square Image */}
        <div className="w-[470px] h-[470px] rounded-3xl overflow-hidden bg-dark-700 flex-shrink-0 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={name}
            width={imageWidth}
            height={imageHeight}
            className="w-full h-full object-cover"
            draggable={false}
            priority
          />
        </div>
        {/* Overlapping Card */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'bg-dark-800 border border-dark-700 rounded-3xl shadow-2xl px-8 py-5 z-10 max-w-xl flex-1',
            reverse ? 'mr-[-80px]' : 'ml-[-80px]'
          )}
        >
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-dark-100 font-serif mb-1">
              {name}
            </h2>
            <p className="text-sm font-medium text-primary-400">
              {title}
            </p>
          </div>
          <p className="text-dark-200 text-base leading-relaxed mb-5">
            {description}
          </p>
          {showSocial && (
            <div className="flex gap-4">
              {socialIcons.map(({ icon: Icon, url, label, hoverClass }) => (
                <Link
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-out',
                    'bg-gradient-to-br from-primary-500 to-primary-700',
                    'shadow-md shadow-primary-900/30',
                    'hover:scale-110 hover:shadow-xl',
                    'active:scale-95',
                    hoverClass
                  )}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-dark-950 shrink-0 drop-shadow-[0_0_0.5px_rgba(0,0,0,0.4)] [stroke-linejoin:round] [stroke-linecap:round]" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Mobile: always image first then info (same layout for all profiles) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="md:hidden max-w-sm mx-auto text-center bg-transparent"
      >
        {/* Square Mobile Image */}
        <div className="w-full aspect-square bg-dark-700 rounded-3xl overflow-hidden flex items-center justify-center mb-6">
          <Image
            src={imageSrc}
            alt={name}
            width={typeof imageUrl === 'string' ? 400 : imageUrl.width ?? 400}
            height={typeof imageUrl === 'string' ? 400 : imageUrl.height ?? 400}
            className="w-full h-full object-cover"
            draggable={false}
            priority
          />
        </div>
        <div className="px-4">
          <h2 className="text-xl font-bold text-dark-100 font-serif mb-1">
            {name}
          </h2>
          <p className="text-sm font-medium text-primary-400 mb-2">
            {title}
          </p>
          <p className="text-dark-200 text-sm leading-relaxed mb-4">
            {description}
          </p>
          {showSocial && (
            <div className="flex justify-center gap-4">
              {socialIcons.map(({ icon: Icon, url, label, hoverClass }) => (
                <Link
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-out',
                    'bg-gradient-to-br from-primary-500 to-primary-700',
                    'shadow-md shadow-primary-900/30',
                    'active:scale-95',
                    hoverClass
                  )}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-dark-950 shrink-0 drop-shadow-[0_0_0.5px_rgba(0,0,0,0.4)] [stroke-linejoin:round] [stroke-linecap:round]" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
