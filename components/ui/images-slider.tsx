"use client"

import { cn } from "@/lib/utils"
import {
  motion,
  useMotionValue,
  useTransform,
  animate as motionAnimate,
} from "framer-motion"
import React, { useEffect, useState, useRef } from "react"
import { flushSync } from "react-dom"

const SLIDE_DURATION = 4.5
const AUTOPLAY_INTERVAL = 8000

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "right",
  showDivider = true,
}: {
  images: string[]
  children: React.ReactNode
  overlay?: boolean
  overlayClassName?: string
  className?: string
  autoplay?: boolean
  direction?: "up" | "down" | "left" | "right"
  /** Show a vertical line at the split (before-and-after style). Default true. */
  showDivider?: boolean
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  /** Current transition direction: only left-to-right (no alternating right-to-left) */
  const wipeLtr = direction === "right" || direction === "down"
  const isTransitioningRef = useRef(false)

  const split = useMotionValue(0)
  const isHorizontal = direction === "left" || direction === "right"

  const len = loadedImages.length
  const nextIndex = len > 0 ? (currentIndex + 1) % len : 0
  const areImagesLoaded = len > 0

  // Motion-value-driven clip paths and divider (no React re-renders per frame = smooth)
  const currentClip = useTransform(split, (s) => {
    if (s <= 0) return "inset(0 0 0 0)"
    if (s >= 100) return "inset(0 100% 0 0)"
    if (isHorizontal) {
      return wipeLtr ? `inset(0 0 0 ${s}%)` : `inset(0 ${100 - s}% 0 0)`
    }
    return wipeLtr ? `inset(0 0 ${s}% 0)` : `inset(${100 - s}% 0 0 0)`
  })
  const nextClip = useTransform(split, (s) => {
    if (s <= 0) return "inset(0 100% 0 0)"
    if (s >= 100) return "inset(0 0 0 0)"
    if (isHorizontal) {
      return wipeLtr ? `inset(0 ${100 - s}% 0 0)` : `inset(0 0 0 ${s}%)`
    }
    return wipeLtr ? `inset(${100 - s}% 0 0 0)` : `inset(0 0 ${100 - s}% 0)`
  })
  const dividerLeft = useTransform(split, (s) => (isHorizontal ? `${s}%` : "0"))
  const dividerTop = useTransform(split, (s) => (isHorizontal ? "0" : `${s}%`))
  const dividerOpacity = useTransform(split, (s) => (s > 0 && s < 100 ? 1 : 0))

  // Wipe transition: left-to-right only (direction from prop, no alternating)
  const runSplitTransition = () => {
    if (len <= 1 || isTransitioningRef.current) return
    isTransitioningRef.current = true
    const start = wipeLtr ? 0 : 100
    const end = wipeLtr ? 100 : 0
    split.set(start)

    motionAnimate(split, end, {
      duration: SLIDE_DURATION,
      ease: [0.33, 1, 0.68, 1],
      onComplete: () => {
        flushSync(() => setCurrentIndex((prev) => (prev + 1) % len))
        split.set(0)
        isTransitioningRef.current = false
      },
    })
  }

  useEffect(() => {
    const loadPromises = images.map((src) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve(src)
        img.onerror = reject
      })
    })
    Promise.all(loadPromises)
      .then(setLoadedImages)
      .catch((e) => console.error("Failed to load images", e))
  }, [images])

  // Autoplay: after interval, run split transition (not instant index change)
  useEffect(() => {
    if (!areImagesLoaded || len <= 1 || !autoplay) return
    const id = setInterval(runSplitTransition, AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [areImagesLoaded, len, autoplay])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") runSplitTransition()
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 < 0 ? len - 1 : prev - 1))
        split.set(0)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [len])

  if (!areImagesLoaded || len === 0) {
    return (
      <div className={cn("overflow-hidden h-full w-full relative", className)}>
        {children}
        {overlay && (
          <div
            className={cn(
              "absolute inset-0 bg-black/60 z-40 pointer-events-none",
              overlayClassName
            )}
          />
        )}
      </div>
    )
  }

  // Single image: no split
  if (len === 1) {
    return (
      <div
        className={cn(
          "overflow-hidden h-full w-full relative flex items-center justify-center",
          className
        )}
      >
        <img
          src={loadedImages[0]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {children}
        {overlay && (
          <div
            className={cn(
              "absolute inset-0 bg-black/60 z-40 pointer-events-none",
              overlayClassName
            )}
          />
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
    >
      {/* Current image (before): clipped to one side */}
      <motion.div
        className="absolute inset-0 z-0 will-change-[clip-path]"
        style={{ clipPath: currentClip, backfaceVisibility: "hidden" as const }}
      >
        <img
          src={loadedImages[currentIndex]}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Next image (after): clipped to the other side */}
      <motion.div
        className="absolute inset-0 z-0 will-change-[clip-path]"
        style={{ clipPath: nextClip, backfaceVisibility: "hidden" as const }}
      >
        <img
          src={loadedImages[nextIndex]}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Divider line: position driven by motion value (smooth) */}
      {showDivider && (
        <motion.div
          className="absolute z-10 pointer-events-none"
          style={{
            left: dividerLeft,
            top: dividerTop,
            bottom: isHorizontal ? 0 : undefined,
            right: isHorizontal ? undefined : 0,
            opacity: dividerOpacity,
          }}
        >
          <div
            className={cn(
              "absolute bg-white/90 shadow-lg",
              isHorizontal ? "w-px h-full top-0" : "h-px w-full left-0"
            )}
          />
        </motion.div>
      )}

      {children}
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-black/60 z-40 pointer-events-none",
            overlayClassName
          )}
        />
      )}
    </div>
  )
}
