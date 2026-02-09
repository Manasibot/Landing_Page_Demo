'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Something went wrong</h1>
          <p style={{ color: '#a3a3a3', marginBottom: '1.5rem' }}>A critical error occurred. Please refresh the page.</p>
          <button
            onClick={reset}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem',
              background: '#d4a018',
              color: '#0a0a0a',
              border: 'none',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
