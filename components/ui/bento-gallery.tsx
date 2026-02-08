"use client"

import React, { useRef, useState, useEffect } from "react"
import Image, { type StaticImageData } from "next/image"
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

export type ImageItem = {
  id: number | string
  title: string
  desc: string
  url: string | StaticImageData
  span: string
  /** LinkedIn post URL (or any link). Opens in new tab on click. Defaults to linkedin.com if omitted. */
  linkUrl?: string
}

export interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[]
  title: string
  description: string
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
}

const DEFAULT_LINK_URL = "https://www.linkedin.com"

const SCROLL_SPEED = 0.4

const InteractiveImageBentoGallery: React.FC<
  InteractiveImageBentoGalleryProps
> = ({ imageItems, title, description }) => {
  const [scrollWidth, setScrollWidth] = useState(0)
  const isDraggingRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const duplicatedItems = [...imageItems, ...imageItems]

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const total = trackRef.current.scrollWidth
        setScrollWidth(total / 2)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("resize", measure)
      ro.disconnect()
    }
  }, [imageItems.length])

  useEffect(() => {
    if (scrollWidth <= 0) return
    let raf = 0
    const tick = () => {
      if (!isDraggingRef.current) {
        const next = x.get() - SCROLL_SPEED
        x.set(next <= -scrollWidth ? 0 : next)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [scrollWidth, x])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  return (
    <section
      ref={targetRef}
      className="relative w-full overflow-hidden bg-dark-950 pt-8 pb-16 sm:pt-12 sm:pb-24"
    >
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="font-serif text-3xl font-bold tracking-tight text-dark-100 sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-400">
          {description}
        </p>
      </motion.div>

      <div
        ref={containerRef}
        className="relative mt-12 w-full overflow-hidden"
      >
        <motion.div
          className="flex w-max cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -scrollWidth, right: 0 }}
          dragElastic={0.05}
          onDragStart={() => { isDraggingRef.current = true }}
          onDragEnd={() => { isDraggingRef.current = false }}
        >
          <motion.div
            ref={trackRef}
            className="grid auto-cols-[minmax(15rem,1fr)] grid-flow-col gap-4 px-4 md:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {duplicatedItems.map((item, index) => {
              // When linkUrl is set, image links to it (e.g. LinkedIn); when omitted, no redirect on click
              const href = item.linkUrl ?? undefined
              const wrapperClassName = cn(
                "group relative flex h-full min-h-[15rem] w-full min-w-[15rem] cursor-pointer items-end overflow-hidden rounded-xl border border-dark-700 bg-dark-800 p-4 shadow-lg shadow-dark-950/50 transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950",
                item.span,
              )
              const commonProps = {
                key: `${item.id}-${index}`,
                variants: itemVariants,
                className: wrapperClassName,
                whileHover: { scale: 1.02 },
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }
              return href ? (
              <motion.a
                {...commonProps}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} – open in new tab`}
              >
                {typeof item.url === "string" ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 15rem, 15rem"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-dark-900/80 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                  <ExternalLink className="h-4 w-4 text-white" strokeWidth={2} />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{item.desc}</p>
                </div>
              </motion.a>
              ) : (
              <motion.div {...commonProps} aria-label={item.title}>
                {typeof item.url === "string" ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 15rem, 15rem"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-dark-900/80 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                  <ExternalLink className="h-4 w-4 text-white" strokeWidth={2} />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{item.desc}</p>
                </div>
              </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveImageBentoGallery
