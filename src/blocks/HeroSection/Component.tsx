import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = {
  title: string
  subtitle?: string
  description?: string
  rating?: number
  reviewCount?: number
  yearsInBusiness?: number
  partiesHosted?: string
  happyFamilies?: string
  ctaPrimaryLabel?: string
  ctaPrimaryUrl?: string
  ctaSecondaryLabel?: string
  ctaSecondaryPhone?: string
  backgroundImage?: MediaType | string
  specialOffer?: {
    title: string
    description: string
    buttonText: string
    buttonUrl?: string
  }
}

export const HeroSection: React.FC<Props> = ({
  title: _title,
  subtitle,
  rating: _rating = 4.2,
  reviewCount: _reviewCount = 444,
  yearsInBusiness: _yearsInBusiness = 38,
  partiesHosted: _partiesHosted = '10K',
  happyFamilies: _happyFamilies = '50K',
  ctaPrimaryLabel: _ctaPrimaryLabel,
  ctaPrimaryUrl: _ctaPrimaryUrl,
  ctaSecondaryLabel: _ctaSecondaryLabel,
  ctaSecondaryPhone: _ctaSecondaryPhone,
  backgroundImage,
  specialOffer: _specialOffer,
}) => {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Background Image with Overlay */}
      {backgroundImage && typeof backgroundImage === 'object' && (
        <>
          <div className="absolute inset-0 z-0">
            <Media
              resource={backgroundImage}
              className="w-full h-full object-cover"
              imgClassName="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-purple-900/70 via-purple-800/60 to-purple-900/80"></div>
        </>
      )}

      {/* Fallback gradient if no image */}
      {!backgroundImage && (
        <>
          <div className="absolute inset-0 bg-gradient-fun opacity-10 animate-disco"></div>
          <div className="absolute inset-0 retro-grid opacity-20"></div>
        </>
      )}

      <div className="relative z-20 container py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-12 animate-skateIn">
          {/* Large Wordmark Logo */}
          <div className="space-y-6">
            {/* Colorful Letter Circles - "SKATE" */}
            <div className="flex justify-center items-center gap-2 md:gap-4 mb-8">
              {['S', 'K', 'A', 'T', 'E'].map((letter, i) => {
                const colors = ['bg-cyan-400', 'bg-pink-500', 'bg-purple-600', 'bg-green-500', 'bg-cyan-400']
                return (
                  <div
                    key={i}
                    className={`${colors[i]} size-16 md:size-24 lg:size-28 rounded-full flex items-center justify-center shadow-2xl border-4 border-white transform hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-white font-black text-3xl md:text-5xl lg:text-6xl">
                      {letter}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight drop-shadow-2xl">
              SKATELAND WEST
            </h1>

            {/* Subtitle/Description */}
            {subtitle && (
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg">
                {subtitle}
              </p>
            )}
          </div>

          {/* Three CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-purple-900 font-bold text-lg px-8 py-6 min-w-[180px] backdrop-blur-sm bg-white/10"
              asChild
            >
              <Link href="/schedule">
                SCHEDULE
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-purple-900 font-bold text-lg px-8 py-6 min-w-[180px] backdrop-blur-sm bg-white/10"
              asChild
            >
              <Link href="/birthday-parties">
                BOOK PARTY
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-purple-900 font-bold text-lg px-8 py-6 min-w-[180px] backdrop-blur-sm bg-white/10"
              asChild
            >
              <Link href="/learn-to-skate">
                LESSONS
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}