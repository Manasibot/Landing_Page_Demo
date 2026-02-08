"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type StickyScrollContentItem = {
  title: string
  description: string
  content?: React.ReactNode
}

export interface StickyScrollProps {
  content: StickyScrollContentItem[]
  contentClassName?: string
}

export function StickyScroll({ content, contentClassName }: StickyScrollProps) {
  const [activeCard, setActiveCard] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  })
  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint)
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index
        }
        return acc
      },
      0,
    )
    setActiveCard(closestBreakpointIndex)
  })

  const scrollToCard = useCallback(
    (index: number) => {
      const i = Math.max(0, Math.min(index, cardLength - 1))
      setActiveCard(i)
      const el = cardRefs.current[i]
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    },
    [cardLength],
  )

  const goUp = () => scrollToCard(activeCard - 1)
  const goDown = () => scrollToCard(activeCard + 1)

  const backgroundColors = [
    "rgb(2 6 23)",   // dark-950
    "rgb(15 23 42)", // dark-900
    "rgb(30 41 59)", // dark-800
  ]
  const linearGradients = [
    "linear-gradient(to bottom right, rgb(212 160 18 / 0.4), rgb(184 134 11 / 0.5))",   // primary-500 to primary-600
    "linear-gradient(to bottom right, rgb(250 204 21 / 0.35), rgb(212 160 18 / 0.45))", // primary-400 to primary-500
    "linear-gradient(to bottom right, rgb(184 134 11 / 0.45), rgb(146 101 10 / 0.4))",  // primary-600 to primary-700
  ]

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  )

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length])
  }, [activeCard])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      window.scrollBy({ top: e.deltaY, behavior: "auto" })
    }
    section.addEventListener("wheel", onWheel, { passive: false, capture: true })
    return () => section.removeEventListener("wheel", onWheel, true)
  }, [])

  return (
    <div ref={sectionRef} className="relative">
      {/* Up / Down navigation */}
      <div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 lg:right-2">
        <motion.button
          type="button"
          onClick={goUp}
          disabled={activeCard === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
            activeCard === 0
              ? "cursor-not-allowed border-dark-700 bg-dark-800/50 text-dark-500"
              : "border-primary-500/40 bg-dark-800/80 text-primary-400 hover:border-primary-400 hover:bg-primary-500/20 hover:text-primary-300",
          )}
          aria-label="Previous section"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
        <motion.button
          type="button"
          onClick={goDown}
          disabled={activeCard === cardLength - 1}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
            activeCard === cardLength - 1
              ? "cursor-not-allowed border-dark-700 bg-dark-800/50 text-dark-500"
              : "border-primary-500/40 bg-dark-800/80 text-primary-400 hover:border-primary-400 hover:bg-primary-500/20 hover:text-primary-300",
          )}
          aria-label="Next section"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.button>
      </div>

      <motion.div
        animate={{
          backgroundColor: backgroundColors[activeCard % 2],
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative flex h-[30rem] overflow-hidden rounded-xl border border-dark-700/50 py-10 pl-14 pr-10 lg:pl-16"
      >
        {/* Right: scrollable text (title + description) */}
        <div
          ref={ref}
          className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden snap-y snap-mandatory lg:pl-[22rem] scrollbar-hide"
        >
          <div ref={contentRef} className="flex justify-center">
            <div className="max-w-2xl flex-1 px-2">
              {content.map((item, index) => (
                <div
                  key={item.title + index}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className="flex min-h-[30rem] flex-col justify-center snap-center snap-always py-8"
                >
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.35,
                      y: activeCard === index ? 0 : 4,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="font-serif text-2xl font-bold tracking-tight text-dark-100"
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.35,
                      y: activeCard === index ? 0 : 4,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: 0.03 }}
                    className="mt-6 max-w-lg text-base leading-relaxed text-dark-300"
                  >
                    {item.description}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Left: fixed card – not inside scroll, so it never moves */}
        <div
          style={{ background: backgroundGradient }}
          className={cn(
            "absolute left-16 top-1/2 hidden h-60 w-80 -translate-y-1/2 overflow-hidden rounded-xl border border-primary-500/20 bg-dark-800/90 shadow-xl shadow-dark-950/50 lg:block",
            contentClassName,
          )}
        >
          {content[activeCard]?.content ?? null}
        </div>
      </motion.div>
    </div>
  )
}
