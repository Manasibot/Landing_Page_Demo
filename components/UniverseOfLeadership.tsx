'use client'

import InteractiveImageBentoGallery from '@/components/ui/bento-gallery'
import type { ImageItem } from '@/components/ui/bento-gallery'
import p1 from '@/components/assets/images/p1.jpeg'
import p2 from '@/components/assets/images/p2.jpeg'
import p3 from '@/components/assets/images/p3.jpeg'
import p4 from '@/components/assets/images/p4.jpeg'
import p5 from '@/components/assets/images/p5.jpeg'
import p6 from '@/components/assets/images/p6.jpeg'

const universeGalleryItems: ImageItem[] = [
  {
    id: 1,
    title: 'Leadership Under Pressure',
    desc: 'Where decisions carry real consequence.',
    url: p1,
    span: 'md:col-span-2 md:row-span-2',
    // linkUrl: 'https://www.linkedin.com', // LinkedIn redirect on image click commented out
  },
  {
    id: 2,
    title: 'Executive Immersion',
    desc: 'Clarity, vision, and peak performance.',
    url: p2,
    span: 'md:row-span-1',
    // linkUrl: 'https://www.linkedin.com', // LinkedIn redirect on image click commented out
  },
  {
    id: 3,
    title: 'Global Forum',
    desc: 'Leaders across cultures and industries.',
    url: p3,
    span: 'md:row-span-1',
    // linkUrl: 'https://www.linkedin.com', // LinkedIn redirect on image click commented out
  },
  {
    id: 4,
    title: 'Inner Capacity',
    desc: 'From automatic reaction to conscious choice.',
    url: p4,
    span: 'md:row-span-2',
    // linkUrl: 'https://www.linkedin.com', // LinkedIn redirect on image click commented out
  },
  {
    id: 5,
    title: 'Live Simulations',
    desc: 'Leadership behavior visible in real time.',
    url: p5,
    span: 'md:row-span-1',
    // linkUrl: 'https://www.linkedin.com', // LinkedIn redirect on image click commented out
  },
  {
    id: 6,
    title: 'Dubai Experience',
    desc: 'April 20–24, 2026. By invitation only.',
    url: p6,
    span: 'md:col-span-2 md:row-span-1',
    // linkUrl: 'https://www.linkedin.com', // LinkedIn redirect on image click commented out
  },
]

export default function UniverseOfLeadership() {
  return (
    <InteractiveImageBentoGallery
      imageItems={universeGalleryItems}
      title="Universe of Leadership"
      description="Explore transformational leadership experiences. Drag to explore."
    />
  )
}
