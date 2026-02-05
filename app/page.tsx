import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import WhyExists from '@/components/WhyExists'
import Philosophy from '@/components/Philosophy'
import WhatMakesDifferent from '@/components/WhatMakesDifferent'
import Journey from '@/components/Journey'
import WhoIsFor from '@/components/WhoIsFor'
import Faculty from '@/components/Faculty'
import EventDetails from '@/components/EventDetails'
import Invitation from '@/components/Invitation'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import OrbitalGallery from '@/components/OrbitalGallery'
import MagneticNarrativeGrid from '@/components/MagneticNarrativeGrid'

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <WhyExists />
      <Philosophy />
      <WhatMakesDifferent />
      <Journey />
      <WhoIsFor />
      <Faculty />
      <OrbitalGallery />
      {/* <MagneticNarrativeGrid /> */}
      <EventDetails />
      <Invitation />
      <FAQ />
      <Footer />
    </main>
  )
}
