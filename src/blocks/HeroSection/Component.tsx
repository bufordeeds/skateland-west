import React from 'react'
import { Calendar, Phone, Star } from 'lucide-react'
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
  title,
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
    <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          <div className="space-y-6 order-1 lg:order-1">
            {rating && reviewCount && (
              <Badge variant="secondary" className="w-fit">
                <Star className="size-4 mr-1" />
                Rated {rating}/5 by {reviewCount}+ families
              </Badge>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              {ctaPrimary && (
                <Button size="lg" className="text-lg px-8" asChild>
                  <a href={ctaPrimary.url || '/birthday-parties'}>
                    <Calendar className="size-5 mr-2" />
                    {ctaPrimary.label}
                  </a>
                </Button>
              )}
              
              {ctaSecondary && ctaSecondary.phone && (
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8"
                  asChild
                >
                  <a href={`tel:${ctaSecondary.phone.replace(/\D/g, '')}`}>
                    <Phone className="size-5 mr-2" />
                    {ctaSecondary.label}
                  </a>
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {yearsInBusiness}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years in Business
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {partiesHosted}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Parties Hosted
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {happyFamilies}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Happy Families
                </div>
              </div>
            </div>
          </div>
          
          {specialOffer && (
            <div className="order-2 lg:order-2">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 md:p-8 text-white w-full">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold">
                    {specialOffer.title}
                  </h3>
                  <p className="text-primary-foreground/90 text-sm md:text-base">
                    {specialOffer.description}
                  </p>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <a href={specialOffer.buttonUrl || '/birthday-parties'}>
                      {specialOffer.buttonText}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}