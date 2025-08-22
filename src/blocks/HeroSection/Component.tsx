import React from 'react'
import { Calendar, Phone, Star, Sparkles, Music, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Props = {
  title: string
  subtitle?: string
  description?: string
  rating?: number
  reviewCount?: number
  yearsInBusiness?: number
  partiesHosted?: string
  happyFamilies?: string
  ctaPrimary?: {
    label: string
    url?: string
  }
  ctaSecondary?: {
    label: string
    url?: string
    phone?: string
  }
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
  yearsInBusiness = 38,
  partiesHosted = '10K',
  happyFamilies = '50K',
  ctaPrimary,
  ctaSecondary,
  specialOffer,
}) => {
  return (
    <section className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-fun opacity-10 animate-disco"></div>
      <div className="absolute inset-0 retro-grid opacity-20"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 size-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 size-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 size-48 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative container py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-skateIn">
            {/* Badge with animation */}
            {rating && reviewCount && (
              <div className="inline-flex items-center gap-2">
                <Badge className="bg-gradient-skate text-white border-0 px-4 py-2 text-sm font-bold animate-pulse">
                  <Star className="size-4 mr-1 fill-current" />
                  {rating}/5 Stars
                </Badge>
                <span className="text-sm text-muted-foreground">
                  from {reviewCount}+ happy families
                </span>
              </div>
            )}
            
            {/* Animated title */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-gradient">Roll Into</span>
                <br />
                <span className="relative">
                  The Fun!
                  <Sparkles className="absolute -top-6 -right-6 size-8 text-accent animate-pulse" />
                </span>
              </h1>
              {subtitle && (
                <p className="text-xl md:text-2xl text-muted-foreground mt-4 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
            
            {/* CTA Buttons with hover effects */}
            <div className="flex flex-col sm:flex-row gap-4">
              {ctaPrimary && (
                <Button 
                  size="lg" 
                  className="bg-gradient-skate hover:opacity-90 text-white font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                  asChild
                >
                  <a href={ctaPrimary.url || '/birthday-parties'}>
                    <Calendar className="size-5 mr-2 group-hover:animate-roll" />
                    {ctaPrimary.label}
                  </a>
                </Button>
              )}
              
              {ctaSecondary && ctaSecondary.phone && (
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 font-bold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <a href={`tel:${ctaSecondary.phone.replace(/\D/g, '')}`}>
                    <Phone className="size-5 mr-2" />
                    {ctaSecondary.label}
                  </a>
                </Button>
              )}
            </div>
            
            {/* Stats with icons */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="size-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">
                    {yearsInBusiness}+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Years of Fun
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="size-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Music className="size-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">
                    {partiesHosted}+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Epic Parties
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Users className="size-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-black text-foreground">
                    {happyFamilies}+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Happy Skaters
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Special offer card with gradient and animation */}
          {specialOffer && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-party rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-party rounded-3xl p-8 md:p-10 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/20 backdrop-blur text-white border-white/30 font-bold">
                    LIMITED TIME
                  </Badge>
                </div>
                <div className="space-y-6 mt-4">
                  <h3 className="text-3xl md:text-4xl font-black leading-tight">
                    {specialOffer.title}
                  </h3>
                  <p className="text-white/90 text-lg">
                    {specialOffer.description}
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-white text-primary hover:bg-white/90 font-bold text-lg py-6 shadow-lg transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <a href={specialOffer.buttonUrl || '/birthday-parties'}>
                      <Sparkles className="size-5 mr-2" />
                      {specialOffer.buttonText}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* If no special offer, show an image or graphic */}
          {!specialOffer && (
            <div className="relative">
              <div className="aspect-square bg-gradient-skate rounded-3xl flex items-center justify-center shadow-2xl animate-glowPulse">
                <div className="text-center text-white p-8">
                  <div className="text-8xl mb-4 animate-roll">🛼</div>
                  <h3 className="text-3xl font-black mb-2">Ready to Roll?</h3>
                  <p className="text-lg opacity-90">Join the fun at Skateland West!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}