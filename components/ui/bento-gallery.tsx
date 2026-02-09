"use client"

import React, { useRef, useState, useEffect } from "react"
import Image, { type StaticImageData } from "next/image"
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  AnimatePresence,
  animate,
} from "framer-motion"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export type ImageItem = {
  id: number | string
  title: string
  desc: string
  url: string | StaticImageData
  span: string
}

export interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[]
  title: string
  description: string
  label?: string
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

function getImageSrc(url: string | StaticImageData): string {
  return typeof url === "string" ? url : url.src
}

const ImageModal = ({
  item,
  onClose,
}: {
  item: ImageItem
  onClose: () => void
}) => {
  const src = getImageSrc(item.url)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={item.title}
          className="h-auto max-h-[90vh] w-full rounded-lg object-contain"
        />
      </motion.div>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
        aria-label="Close image view"
      >
        <X size={24} />
      </button>
    </motion.div>
  )
}

const MARQUEE_DURATION = 120

function BentoGridRow({
  imageItems,
  copyIndex,
  selectedItem,
  setSelectedItem,
  containerVariants,
  itemVariants,
}: {
  imageItems: ImageItem[]
  copyIndex: number
  selectedItem: ImageItem | null
  setSelectedItem: (item: ImageItem | null) => void
  containerVariants: typeof containerVariants
  itemVariants: typeof itemVariants
}) {
  return (
    <motion.div
      className="grid auto-cols-[minmax(15rem,1fr)] auto-rows-[minmax(15rem,1fr)] grid-flow-col gap-4 w-max shrink-0"
      variants={containerVariants}
      initial="visible"
      animate="visible"
    >
      {imageItems.map((item) => {
        if (!item?.url) return null
        const isStatic = typeof item.url !== "string"
        return (
          <motion.div
            key={`${copyIndex}-${item.id}`}
            variants={itemVariants}
            className={cn(
              "group relative flex h-full min-h-[15rem] w-full min-w-[15rem] cursor-pointer items-end overflow-hidden rounded-xl border border-dark-700 bg-dark-800 p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg hover:border-primary-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950",
              item.span,
            )}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setSelectedItem(item)}
            onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title}`}
          >
            {isStatic ? (
              <Image
                src={item.url as StaticImageData}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 15rem, 15rem"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <img
                src={getImageSrc(item.url)}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* Image captions (commented out)
            <div className="relative z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/80">{item.desc}</p>
            </div>
            */}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

const InteractiveImageBentoGallery: React.FC<
  InteractiveImageBentoGalleryProps
> = ({ imageItems, title, description, label }) => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null)
  const [loopWidth, setLoopWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const loopRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  useEffect(() => {
    const measure = () => {
      if (loopRef.current) {
        const width = loopRef.current.offsetWidth
        setLoopWidth(width + 16)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (loopRef.current) ro.observe(loopRef.current)
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("resize", measure)
      ro.disconnect()
    }
  }, [imageItems])

  useEffect(() => {
    if (loopWidth <= 0) return
    const controls = animate(x, -loopWidth, {
      duration: MARQUEE_DURATION,
      repeat: Infinity,
      ease: "linear",
    })
    return () => controls.stop()
  }, [loopWidth, x])

  return (
    <section
      ref={targetRef}
      className="relative w-full overflow-hidden bg-dark-800 py-16 sm:py-24"
    >
      <motion.div
        style={{ opacity, y }}
        className="container-custom mx-auto px-4 text-center"
      >
        {label && (
          <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            {label}
          </span>
        )}
        <h2 className="heading-lg text-dark-100 sm:text-4xl">
          {title}
        </h2>
        <div className="divider-gradient max-w-xs mx-auto my-4" />
        <p className="mx-auto max-w-2xl text-lg text-dark-300">
          {description}
        </p>
      </motion.div>

      <div
        ref={containerRef}
        className="relative mt-12 w-full overflow-hidden"
      >
        <motion.div
          className="flex gap-4 pl-4 md:pl-8"
          style={{ x }}
        >
          <div ref={loopRef}>
            <BentoGridRow
              imageItems={imageItems}
              copyIndex={0}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </div>
          <BentoGridRow
            imageItems={imageItems}
            copyIndex={1}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default InteractiveImageBentoGallery
