'use client'

import { useState, useEffect, useCallback } from 'react'
import Script from 'next/script'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const CALENDLY_EMBED_URL =
  process.env.NEXT_PUBLIC_CALENDLY_EMBED_URL ||
  'https://calendly.com/clictohire?hide_gdpr_banner=1'
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'

const ROLES = [
  'C-Suite / Executive',
  'VP / Director',
  'Senior Manager',
  'Manager',
  'Consultant',
  'Other',
]

export function InvitationModal() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const [calendlyBookingComplete, setCalendlyBookingComplete] = useState(false)
  const [calendlyPrefill, setCalendlyPrefill] = useState<{ firstName: string; lastName: string; email: string } | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [toastBold, setToastBold] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Reset booking state when opening Calendly popup
  useEffect(() => {
    if (showCalendly) setCalendlyBookingComplete(false)
  }, [showCalendly])

  // Build Calendly widget URL with embed_domain, embed_type, and prefill (name = first + last, email)
  const [calendlyWidgetUrl, setCalendlyWidgetUrl] = useState(CALENDLY_EMBED_URL)
  useEffect(() => {
    if (!showCalendly || typeof window === 'undefined') return
    const sep = CALENDLY_EMBED_URL.includes('?') ? '&' : '?'
    const params = new URLSearchParams()
    params.set('embed_domain', window.location.host)
    params.set('embed_type', 'Inline')
    const fullName = calendlyPrefill
      ? [calendlyPrefill.firstName, calendlyPrefill.lastName].filter(Boolean).join(' ').trim()
      : ''
    if (fullName) params.set('name', fullName)
    if (calendlyPrefill?.email) params.set('email', calendlyPrefill.email)
    // Use encodeURIComponent for query so spaces are %20, not + (avoids "First+Last" in Calendly)
    const query = Array.from(params.entries())
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')
    setCalendlyWidgetUrl(`${CALENDLY_EMBED_URL}${sep}${query}`)
  }, [showCalendly, calendlyPrefill])

  // Listen for Calendly postMessage when booking is completed (requires embed_domain & embed_type in URL)
  useEffect(() => {
    if (!showCalendly) return
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://calendly.com') return
      const data = event.data
      const isScheduled =
        data?.event === 'calendly.event_scheduled' ||
        (typeof data === 'string' && data.includes('scheduled')) ||
        (typeof data === 'object' && data?.event?.includes?.('scheduled'))
      if (isScheduled) setCalendlyBookingComplete(true)
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [showCalendly])

  // Auto-dismiss toast: 8s for "thank you, see you soon" toast, 4s for others
  useEffect(() => {
    if (!toast || showCalendly) return
    const isThankYouToast = toast.includes('See you soon')
    const duration = isThankYouToast ? 8000 : 4000
    const t = setTimeout(() => {
      setToast(null)
      setToastBold(null)
    }, duration)
    return () => clearTimeout(t)
  }, [toast, showCalendly])

  const close = useCallback((opts?: { toastMessage?: string; toastBold?: string }) => {
    setOpen(false)
    setShowCalendly(false)
    setCalendlyBookingComplete(false)
    setCalendlyPrefill(null)
    setToast(opts?.toastMessage ?? null)
    setToastBold(opts?.toastBold ?? null)
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  useEffect(() => {
    const check = () => setOpen(window.location.hash === '#invitation')
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])

  useEffect(() => {
    if (!open) return
    const onEscape = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [open, close])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      company: formData.get('company') as string,
      linkedinUrl: formData.get('linkedinUrl') as string,
      whyJoin: formData.get('whyJoin') as string,
    }
    try {
      const res = await fetch('/api/invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setSubmitted(true)
      setCalendlyPrefill({
        firstName: payload.firstName || '',
        lastName: payload.lastName || '',
        email: payload.email || '',
      })
      setShowCalendly(true)
      setToastBold(null)
      setToast('Thank you. Your request has been received. Book a time below.')
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Toast – bottom-right, same position/size as reminder (GlobalNotification) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 right-4 z-[110] w-full max-w-[320px] min-w-0 rounded-lg border border-primary-600/50 bg-primary-500 px-3 py-2 text-sm font-medium text-dark-950 shadow-lg shadow-primary-900/40"
          >
            {toastBold && toast.includes(toastBold) ? (
              <>
                {toast.slice(0, toast.indexOf(toastBold))}
                <strong>{toastBold}</strong>
                {toast.slice(toast.indexOf(toastBold) + toastBold.length)}
              </>
            ) : (
              toast
            )}
          </motion.div>
        )}
      </AnimatePresence>

    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-dark-950/90 backdrop-blur-sm"
            onClick={() => close()}
            aria-hidden
          />
          {showCalendly ? (
            /* Calendly popup only – no form background, 50% × 95% */
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Book a time"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[101] flex flex-col items-center justify-center p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-[95vh] w-[50vw] max-h-[95vh] max-w-full flex-col overflow-hidden rounded-xl bg-white">
                <div className="min-h-0 flex-1 overflow-hidden">
                  {showCalendly && (
                    <>
                      <div
                        className="calendly-inline-widget h-full w-full min-w-[320px]"
                        data-url={calendlyWidgetUrl}
                        style={{ minWidth: 320, height: '100%' }}
                      />
                      <Script
                        src={CALENDLY_SCRIPT}
                        strategy="afterInteractive"
                      />
                    </>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2 border-t border-dark-200 bg-dark-50 px-4 py-3">
                  {!calendlyBookingComplete && (
                    <p className="text-xs text-dark-500 w-full text-center sm:text-right">
                      Complete your meeting booking above to continue.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      if (!calendlyBookingComplete) return
                      const rect = e.currentTarget.getBoundingClientRect()
                      confetti({
                        origin: {
                          x: (rect.left + rect.width / 2) / window.innerWidth,
                          y: (rect.top + rect.height / 2) / window.innerHeight,
                        },
                        particleCount: 80,
                        spread: 70,
                      })
                      const name = calendlyPrefill
                        ? [calendlyPrefill.firstName, calendlyPrefill.lastName]
                            .filter(Boolean)
                            .join(' ')
                            .trim()
                        : ''
                      const displayName = name || 'there'
                      close({
                        toastMessage: `Thank you ${displayName}, Looking forward to seeing you at the meeting. See you soon!`,
                        toastBold: displayName,
                      })
                    }}
                    disabled={!calendlyBookingComplete}
                    className="btn-secondary text-sm px-4 py-2 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Form modal with background */
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="invitation-modal-title"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-sans flex h-[95vh] w-[40vw] max-w-full flex-col overflow-hidden rounded-xl border border-dark-600 border-primary-600/20 bg-dark-900/95 backdrop-blur-xl shadow-2xl shadow-primary-950/10">
              {/* Header – theme accent */}
              <div className="flex shrink-0 items-center justify-between border-b border-dark-700 border-primary-600/10 bg-dark-900/95 px-4 py-3 sm:px-6">
                <div>
                  <span className="text-primary-500 text-xs font-medium tracking-[0.2em] uppercase block mb-0.5">
                    Take the Next Step
                  </span>
                  <h2 id="invitation-modal-title" className="text-base font-semibold text-dark-100 sm:text-lg">
                    Request an Invitation
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => close()}
                  className="rounded-lg p-2 text-dark-400 hover:bg-dark-700 hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form content – card-glass style */}
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-dark-900/40">
                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                  <form
                    onSubmit={handleSubmit}
                    className="flex min-h-0 flex-1 flex-col p-4 sm:p-6 max-w-2xl mx-auto w-full"
                  >
                    <div className="grid flex-1 grid-cols-2 gap-x-3 gap-y-2.5 sm:gap-y-3 content-start">
                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <Label htmlFor="modal-firstName" className="text-xs font-medium text-dark-300">
                        First name
                      </Label>
                      <Input
                        id="modal-firstName"
                        name="firstName"
                        autoComplete="given-name"
                        placeholder="First name"
                        className="h-9 text-sm rounded-lg transition-colors hover:border-primary-600/40"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <Label htmlFor="modal-lastName" className="text-xs font-medium text-dark-300">
                        Last name
                      </Label>
                      <Input
                        id="modal-lastName"
                        name="lastName"
                        autoComplete="family-name"
                        placeholder="Last name"
                        className="h-9 text-sm rounded-lg transition-colors hover:border-primary-600/40"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label htmlFor="modal-email" className="text-xs font-medium text-dark-300">
                        Email
                      </Label>
                      <Input
                        id="modal-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        className="h-9 text-sm rounded-lg transition-colors hover:border-primary-600/40"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <Label htmlFor="modal-phoneNumber" className="text-xs font-medium text-dark-300">
                        Phone number
                      </Label>
                      <Input
                        id="modal-phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+1 234 567 8900"
                        className="h-9 text-sm rounded-lg transition-colors hover:border-primary-600/40"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1 space-y-1">
                      <Label htmlFor="modal-role" className="text-xs font-medium text-dark-300">
                        Role
                      </Label>
                      <select
                        id="modal-role"
                        name="role"
                        className={cn(
                          'font-sans flex h-9 w-full rounded-lg border border-dark-600 bg-dark-800/80 px-3 py-2 text-sm text-dark-100 placeholder:text-dark-500',
                          'hover:border-primary-600/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 transition-colors'
                        )}
                      >
                        <option value="">Select role</option>
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label htmlFor="modal-company" className="text-xs font-medium text-dark-300">
                        Company
                      </Label>
                      <Input
                        id="modal-company"
                        name="company"
                        placeholder="Company name"
                        className="h-9 text-sm rounded-lg transition-colors hover:border-primary-600/40"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label htmlFor="modal-linkedinUrl" className="text-xs font-medium text-dark-300">
                        LinkedIn URL
                      </Label>
                      <Input
                        id="modal-linkedinUrl"
                        name="linkedinUrl"
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        className="h-9 text-sm rounded-lg transition-colors hover:border-primary-600/40"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label htmlFor="modal-whyJoin" className="text-xs font-medium text-dark-300">
                        Why do you want to join us?
                      </Label>
                      <Textarea
                        id="modal-whyJoin"
                        name="whyJoin"
                        placeholder="A few sentences..."
                        rows={2}
                        className="min-h-[60px] text-sm resize-none rounded-lg transition-colors hover:border-primary-600/40"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <div className="mt-6 pt-6 border-t border-dark-700/50 flex shrink-0 justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => close()}
                      className="btn-secondary text-sm px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary text-sm px-4 py-2 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting…' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            </div>
          </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
    </>
  )
}
