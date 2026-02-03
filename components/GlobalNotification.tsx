'use client'

import { AlertLiveEvent } from '@/components/ui/AlertLiveEvent'

/**
 * Fixed bottom-right notification. Style is kept as pasted (light shadcn) and is not matched to the page theme.
 */
export default function GlobalNotification() {
  return (
    <div className="fixed bottom-4 right-4 z-[100] pointer-events-none [&>*]:pointer-events-auto">
      <AlertLiveEvent />
    </div>
  )
}
