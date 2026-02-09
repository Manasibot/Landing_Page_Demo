'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MotionSection, MotionDiv, fadeInUp, staggerContainer } from './ui/motion'
import { ArrowRight } from 'lucide-react'
import dubaiBg from './assets/dubai/dubai bg.jpg'

export default function Invitation() {
  return (
    <MotionSection
      id="invitation-section"
      variants={staggerContainer}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={dubaiBg}
          alt=""
          className="w-full h-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 to-dark-950" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <MotionDiv variants={fadeInUp}>
            <span className="text-primary-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Take the Next Step
            </span>
            <h2 className="heading-lg text-dark-100 mb-8">
              An Invitation
            </h2>
          </MotionDiv>

          <MotionDiv variants={fadeInUp} className="mb-12">
            <div className="card-glass p-8 md:p-12 border-primary-600/20">
              <p className="text-xl md:text-2xl text-dark-200 font-serif leading-relaxed mb-6">
                If this page reads like a mirror rather than a pitch,
                <br className="hidden md:block" />
                you may already sense whether this work is relevant for you.
              </p>
              <div className="divider-gradient max-w-xs mx-auto my-6" />
              <p className="text-dark-400 leading-relaxed">
                Leading Under Pressure is not for everyone.
                <br />
                It is for leaders ready to examine how they lead—
                <br />
                <span className="text-primary-400">when leadership truly matters.</span>
              </p>
            </div>
          </MotionDiv>

          <MotionDiv variants={fadeInUp}>
            <p className="text-dark-400 mb-8">
              To explore participation, request an invitation below.
            </p>
            <motion.a
              href="#invitation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-5"
            >
              Request an Invitation
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <p className="text-dark-500 text-sm mt-6">
              Your request will be reviewed, and further details will be shared selectively.
            </p>
          </MotionDiv>

          <div className="divider-gradient w-full max-w-3xl mx-auto mt-16" />
        </div>
      </div>
    </MotionSection>
  )
}
