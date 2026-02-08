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
import { InvitationModal } from '@/components/InvitationModal'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import UniverseOfLeadership from '@/components/UniverseOfLeadership'

export default function Home() {
  return (
    <main className="relative">
      <InvitationModal />
      <Navigation />
      <Hero />
      <WhyExists />
      <Philosophy />
      <WhatMakesDifferent />
      <Journey />
      <WhoIsFor />
      <Faculty />
      <UniverseOfLeadership />
      <EventDetails />
      <Invitation />
      <FAQ />
      <Footer />
    </main>
  )
}
