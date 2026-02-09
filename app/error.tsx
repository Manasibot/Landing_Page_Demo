'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-xl font-semibold text-dark-100 mb-2">Something went wrong</h2>
      <p className="text-dark-400 text-center mb-6">We encountered an error. Please try again.</p>
      <button
        onClick={reset}
        className="px-6 py-2 rounded-lg bg-primary-500 text-dark-950 font-medium hover:bg-primary-400 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
