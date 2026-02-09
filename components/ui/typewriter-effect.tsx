'use client'

import { cn } from '@/lib/utils'
import { motion, stagger, useAnimate, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const HERO_PREFIX = 'Leadership is revealed when it matters '
const HERO_CYCLING_WORDS = ['most.', 'decisively.', 'critically.', 'strategically.', 'definitively.']

export const TypewriterEffectCycling = ({
  prefix = HERO_PREFIX,
  words = HERO_CYCLING_WORDS,
  typingMs = 80,
  deletingMs = 55,
  pauseAfterWordMs = 2400,
  pauseAfterDeleteMs = 500,
  className,
  wordClassName,
  cursorClassName,
}: {
  prefix?: string
  words?: string[]
  typingMs?: number
  deletingMs?: number
  pauseAfterWordMs?: number
  pauseAfterDeleteMs?: number
  className?: string
  wordClassName?: string
  cursorClassName?: string
}) => {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'initial' | 'typing-word' | 'deleting'>('initial')
  const [showCursor, setShowCursor] = useState(true)
  const cursorRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (phase === 'initial') {
      if (displayText.length < prefix.length + words[0].length) {
        const fullInitial = prefix + words[0]
        const nextChar = fullInitial[displayText.length]
        const t = setTimeout(() => setDisplayText((s) => s + nextChar), typingMs)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => {
        setPhase('deleting')
        setWordIndex(0)
      }, pauseAfterWordMs)
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      if (displayText.length > prefix.length) {
        const t = setTimeout(
          () => setDisplayText((s) => s.slice(0, -1)),
          deletingMs
        )
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length)
        setPhase('typing-word')
      }, pauseAfterDeleteMs)
      return () => clearTimeout(t)
    }

    if (phase === 'typing-word') {
      const currentWord = words[wordIndex]
      if (displayText.length < prefix.length + currentWord.length) {
        const nextChar = currentWord[displayText.length - prefix.length]
        const t = setTimeout(() => setDisplayText((s) => s + nextChar), typingMs)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('deleting'), pauseAfterWordMs)
      return () => clearTimeout(t)
    }
  }, [displayText, phase, wordIndex, prefix, words, typingMs, deletingMs, pauseAfterWordMs, pauseAfterDeleteMs])

  useEffect(() => {
    cursorRef.current = setInterval(() => setShowCursor((c) => !c), 530)
    return () => {
      if (cursorRef.current) clearInterval(cursorRef.current)
    }
  }, [])

  const lastWordStart = prefix.length
  const lastWord = displayText.slice(lastWordStart)

  return (
    <div className={cn('block sm:inline', className)}>
      <span className="text-dark-300">{displayText.slice(0, lastWordStart)}</span>
      <br className="sm:hidden" />
      <span className="inline-block w-full text-center sm:inline sm:w-auto">
        <span className={cn('text-primary-400', wordClassName)}>{lastWord}</span>
        <motion.span
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className={cn('inline-block w-0.5 h-[0.9em] align-middle bg-primary-400 ml-0.5', cursorClassName)}
          aria-hidden
        />
      </span>
    </div>
  )
}

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(''),
  }))

  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  useEffect(() => {
    if (isInView) {
      animate(
        'span',
        {
          display: 'inline-block',
          opacity: 1,
          width: 'fit-content',
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: 'easeInOut',
        }
      )
    }
  }, [isInView, animate])

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    'text-dark-300 opacity-0 hidden',
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </motion.div>
    )
  }
  return (
    <div
      className={cn(
        'text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center',
        className
      )}
    >
      {renderWords()}
    </div>
  )
}

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(''),
  }))
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn('text-dark-300', word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn('flex space-x-1 my-6', className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: '0%' }}
        whileInView={{ width: 'fit-content' }}
        transition={{
          duration: 2,
          ease: 'linear',
          delay: 1,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{ whiteSpace: 'nowrap' }}
        >
          {renderWords()}{' '}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn(
          'block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-primary-500',
          cursorClassName
        )}
      />
    </div>
  )
}
