'use client'

import { useEffect, useState } from 'react'
import { Alert } from '@/components/ui/alert'
import { Radio } from 'lucide-react'

// Event start: April 20, 2026, 9:00 AM Dubai (UTC+4)
const TARGET_DATE = new Date('2026-04-20T09:00:00+04:00')

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

/**
 * Standard long countdown: show days when >= 24h, then HH:MM:SS.
 * - Over 24h: "X days, HH:MM:SS"
 * - Under 24h: "HH:MM:SS"
 */
function formatCountdown(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400)
  const remainder = totalSeconds % 86400
  const h = Math.floor(remainder / 3600)
  const m = Math.floor((remainder % 3600) / 60)
  const s = remainder % 60
  const time = `${pad(h)}:${pad(m)}:${pad(s)}`
  if (days > 0) {
    const dayLabel = days === 1 ? 'day' : 'days'
    return `${days} ${dayLabel}, ${time}`
  }
  return time
}

export function AlertLiveEvent() {
  const [countdownText, setCountdownText] = useState('--:--:--')
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = TARGET_DATE.getTime() - now.getTime()

      if (diff <= 0) {
        setIsLive(true)
        return
      }

      const totalSeconds = Math.floor(diff / 1000)
      setCountdownText(formatCountdown(totalSeconds))
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <Alert
      className="w-full max-w-[320px] min-w-0 !py-2 !px-3 !bg-dark-900/95 !border-dark-700 shadow-lg shadow-black/30 backdrop-blur-sm"
      layout="row"
      isNotification
      size="sm"
    >
      <div className="flex items-center gap-2">
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary-600/40 bg-primary-600/10"
          aria-hidden="true"
        >
          <Radio className="text-primary-400" size={16} strokeWidth={2} />
        </div>
        <div className="flex grow items-center min-w-0">
          <div className="space-y-0.5 min-w-0">
            <p className="text-xs font-medium text-dark-100">
              {isLive ? (
                'Live now'
              ) : (
                <>Live in {countdownText}</>
              )}
            </p>
            <p className="text-xs text-dark-400">April 20, 2026 · Dubai</p>
          </div>
        </div>
      </div>
    </Alert>
  )
}
