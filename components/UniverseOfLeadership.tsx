'use client'

import type { StaticImageData } from 'next/image'
import InteractiveImageBentoGallery from '@/components/ui/bento-gallery'
import type { ImageItem } from '@/components/ui/bento-gallery'
import u1 from '@/components/assets/Universe of Leadership/Dr.Aayub profile.jpg'
import u2 from '@/components/assets/Universe of Leadership/photo_6_2026-02-09_14-58-52.jpg'
import u3 from '@/components/assets/Universe of Leadership/photo_8_2026-02-09_14-58-52.jpg'
import u4 from '@/components/assets/Universe of Leadership/photo_10_2026-02-09_14-58-52.jpg'
import u5 from '@/components/assets/Universe of Leadership/photo_11_2026-02-09_14-58-52.jpg'
import u6 from '@/components/assets/Universe of Leadership/photo_12_2026-02-09_14-58-52.jpg'
import u7 from '@/components/assets/Universe of Leadership/photo_14_2026-02-09_14-58-52.jpg'
import u8 from '@/components/assets/Universe of Leadership/photo_15_2026-02-09_14-58-52.jpg'
import u9 from '@/components/assets/Universe of Leadership/photo_16_2026-02-09_14-58-52.jpg'
import u10 from '@/components/assets/Universe of Leadership/photo_18_2026-02-09_14-58-52.jpg'
import u11 from '@/components/assets/Universe of Leadership/photo_20_2026-02-09_14-58-52.jpg'
import u12 from '@/components/assets/Universe of Leadership/photo_21_2026-02-09_14-58-52.jpg'
import u13 from '@/components/assets/Universe of Leadership/photo_29_2026-02-09_14-58-52.jpg'
import u14 from '@/components/assets/Universe of Leadership/photo_33_2026-02-09_14-58-52.jpg'
import u15 from '@/components/assets/Universe of Leadership/photo_35_2026-02-09_14-58-52.jpg'
import u16 from '@/components/assets/Universe of Leadership/photo_41_2026-02-09_14-58-52.jpg'
import u17 from '@/components/assets/Universe of Leadership/photo_51_2026-02-09_14-58-52.jpg'
import u18 from '@/components/assets/Universe of Leadership/photo_52_2026-02-09_14-58-52.jpg'
import u19 from '@/components/assets/Universe of Leadership/photo_53_2026-02-09_14-58-52.jpg'
import u20 from '@/components/assets/Universe of Leadership/new1.jpeg'
import u21 from '@/components/assets/Universe of Leadership/new2.jpeg'
import u22 from '@/components/assets/Universe of Leadership/new3.jpeg'

/** Bento grid span from image dimensions: tall → row-span-2, wide → col-span-2. */
function spanFromDimensions(url: string | StaticImageData): string {
  if (typeof url === 'string') return ''
  const ar = url.width / url.height
  if (ar > 1.2) return 'md:col-span-2'
  if (ar < 0.8) return 'md:row-span-2'
  return ''
}

const universeGalleryItems: ImageItem[] = [
  { id: 1, title: 'Lead Facilitator', desc: 'Dr. Abdelbasit Ayoub.', url: u1, span: spanFromDimensions(u1) },
  { id: 2, title: 'Leadership Under Pressure', desc: 'Where decisions carry real consequence.', url: u2, span: spanFromDimensions(u2) },
  { id: 3, title: 'Executive Immersion', desc: 'Clarity, vision, and peak performance.', url: u3, span: spanFromDimensions(u3) },
  { id: 4, title: 'Global Forum', desc: 'Leaders across cultures and industries.', url: u4, span: spanFromDimensions(u4) },
  { id: 5, title: 'Inner Capacity', desc: 'From automatic reaction to conscious choice.', url: u5, span: spanFromDimensions(u5) },
  { id: 6, title: 'Live Simulations', desc: 'Leadership behavior visible in real time.', url: u6, span: spanFromDimensions(u6) },
  { id: 7, title: 'Dubai Experience', desc: 'April 20–24, 2026. By invitation only.', url: u7, span: spanFromDimensions(u7) },
  { id: 8, title: 'Transformational Leadership', desc: 'Where it matters most.', url: u8, span: spanFromDimensions(u8) },
  { id: 9, title: 'Conscious Choice', desc: 'Leading with clarity under pressure.', url: u9, span: spanFromDimensions(u9) },
  { id: 10, title: 'The Experience', desc: 'Immersive leadership development.', url: u10, span: spanFromDimensions(u10) },
  { id: 11, title: 'Peak Performance', desc: 'When stakes are high.', url: u11, span: spanFromDimensions(u11) },
  { id: 12, title: 'Real Consequence', desc: 'Decisions that define leadership.', url: u12, span: spanFromDimensions(u12) },
  { id: 13, title: 'Calm Authority', desc: 'Depth of insight in complex environments.', url: u13, span: spanFromDimensions(u13) },
  { id: 14, title: 'Reflective Practice', desc: 'Intellectually rigorous, psychologically safe.', url: u14, span: spanFromDimensions(u14) },
  { id: 15, title: 'Global Leadership', desc: 'Across regions and cultures.', url: u15, span: spanFromDimensions(u15) },
  { id: 16, title: 'Executive Development', desc: 'Building inner capacity.', url: u16, span: spanFromDimensions(u16) },
  { id: 17, title: 'Leading Under Pressure', desc: 'Revealed when it matters most.', url: u17, span: spanFromDimensions(u17) },
  { id: 18, title: 'Universe of Leadership', desc: 'Explore transformational experiences.', url: u18, span: spanFromDimensions(u18) },
  { id: 19, title: 'By Invitation Only', desc: 'Selective cohort. Dubai 2026.', url: u19, span: spanFromDimensions(u19) },
  { id: 20, title: 'Immersive Moments I', desc: 'Inside the leadership experience.', url: u20, span: spanFromDimensions(u20) },
  { id: 21, title: 'Immersive Moments II', desc: 'Leaders in reflective practice.', url: u21, span: spanFromDimensions(u21) },
  { id: 22, title: 'Immersive Moments III', desc: 'Capturing the work in motion.', url: u22, span: spanFromDimensions(u22) },
]

export default function UniverseOfLeadership() {
  return (
    <InteractiveImageBentoGallery
      imageItems={universeGalleryItems}
      label=""
      title="Leadership Development, Grounded in Experience"
      description="Five decades of collective work with leaders across regions, industries, and cultures."
    />
  )
}
