import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { Star, Sparkles, PartyPopper, Heart } from 'lucide-react'

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
  rating = 4.2,
  reviewCount = 444,
  yearsInBusiness = 39,
  partiesHosted = '10K+',
  happyFamilies = '50K+',
  ctaPrimaryLabel: _ctaPrimaryLabel,
  ctaPrimaryUrl: _ctaPrimaryUrl,
  ctaSecondaryLabel: _ctaSecondaryLabel,
  ctaSecondaryPhone: _ctaSecondaryPhone,
  backgroundImage,
  specialOffer: _specialOffer,
}) => {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-slate-950">
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
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90"></div>
        </>
      )}

      {/* Fallback dark background with subtle grid */}
      {!backgroundImage && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
          <div className="absolute inset-0 retro-grid opacity-30"></div>
        </>
      )}

      {/* Twinkling stars decoration */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-cyan-400/40 star-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${8 + Math.random() * 12}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 container py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center space-y-10 animate-skateIn">

          {/* Retro Neon Sign */}
          <div className="relative inline-block mx-auto">
            {/* Outer neon border frame */}
            <div className="neon-box rounded-2xl p-8 md:p-12 bg-slate-900/50 backdrop-blur-sm">
              {/* Inner decorative border */}
              <div className="border-2 border-pink-500/50 rounded-xl p-6 md:p-10 relative">
                {/* Corner decorations */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

                {/* Main neon text */}
                <div className="space-y-2">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight neon-text-cyan">
                    SKATELAND
                  </h1>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-widest neon-text-pink">
                    WEST
                  </h2>
                </div>

                {/* Tagline */}
                <p className="mt-6 text-lg md:text-xl text-cyan-300 font-medium tracking-wide">
                  San Antonio&apos;s Premier Family Skating Experience
                </p>
              </div>
            </div>
          </div>

          {/* Subtitle/Description */}
          {subtitle && (
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Trust Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 py-6">
            <div className="flex items-center gap-2 text-white">
              <div className="p-2 bg-cyan-500/20 rounded-full">
                <Star className="size-5 text-cyan-400 fill-cyan-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-cyan-300">{yearsInBusiness}</div>
                <div className="text-xs text-white/60 uppercase tracking-wide">Years Strong</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white">
              <div className="p-2 bg-pink-500/20 rounded-full">
                <PartyPopper className="size-5 text-pink-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-pink-300">{partiesHosted}</div>
                <div className="text-xs text-white/60 uppercase tracking-wide">Parties Hosted</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white">
              <div className="p-2 bg-purple-500/20 rounded-full">
                <Heart className="size-5 text-purple-400 fill-purple-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-purple-300">{happyFamilies}</div>
                <div className="text-xs text-white/60 uppercase tracking-wide">Happy Families</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white">
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <Star className="size-5 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-yellow-300">{rating}</div>
                <div className="text-xs text-white/60 uppercase tracking-wide">{reviewCount} Reviews</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons with neon styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg px-8 py-6 min-w-[180px] shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-all duration-300"
              asChild
            >
              <Link href="/schedule">
                VIEW SCHEDULE
              </Link>
            </Button>

            <Button
              size="lg"
              className="bg-pink-500 hover:bg-pink-400 text-white font-bold text-lg px-8 py-6 min-w-[180px] shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] transition-all duration-300"
              asChild
            >
              <Link href="/birthday-parties">
                BOOK A PARTY
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 font-bold text-lg px-8 py-6 min-w-[180px] shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300"
              asChild
            >
              <Link href="/learn-to-skate">
                SKATING LESSONS
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}