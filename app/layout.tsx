import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import GlobalNotification from '@/components/GlobalNotification'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Leading Under Pressure | Executive Leadership Experience | Dubai 2026',
  description: 'An immersive leadership experience for executives who operate where decisions carry real consequence. Dubai, April 20-24, 2026. By invitation only.',
  keywords: ['leadership', 'executive training', 'Dubai', 'leadership development', 'pressure', 'decision making'],
  authors: [{ name: 'Dr. Abdelbasit Ayoub' }, { name: 'Dr. Owen Fernandes' }],
  openGraph: {
    title: 'Leading Under Pressure | Executive Leadership Experience',
    description: 'Leadership is revealed when it matters most. Dubai, April 20-24, 2026.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leading Under Pressure | Executive Leadership Experience',
    description: 'Leadership is revealed when it matters most. Dubai, April 20-24, 2026.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <GlobalNotification />
      </body>
    </html>
  )
}
