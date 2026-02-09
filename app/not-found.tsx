import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-dark-950">
      <h1 className="text-4xl font-bold text-dark-100 mb-2">404</h1>
      <p className="text-dark-400 mb-6">This page could not be found.</p>
      <Link
        href="/"
        className="px-6 py-2 rounded-lg bg-primary-500 text-dark-950 font-medium hover:bg-primary-400 transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}
