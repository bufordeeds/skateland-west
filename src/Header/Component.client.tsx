'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Phone, MapPin, Clock } from 'lucide-react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-gradient-skate text-white py-2 relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer opacity-30"></div>
        <div className="container relative">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="size-3" />
                {SITE_CONFIG.phone}
              </a>
              <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <MapPin className="size-3" />
                {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-3" />
              <span className="font-medium">Open Today: Check Schedule</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-background/95 backdrop-blur-lg shadow-lg border-b' 
            : 'bg-background/80 backdrop-blur-sm'
        }`}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Left Nav */}
            <div className="hidden lg:flex items-center flex-1">
              <HeaderNav data={data} position="left" />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group mx-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-fun rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative size-14 md:size-16 bg-gradient-skate rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <span className="text-white font-black text-xl md:text-2xl animate-pulse">SW</span>
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="font-black text-xl md:text-2xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  {SITE_CONFIG.name}
                </h1>
                <p className="text-xs text-white/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                  Family Fun Since 1985
                </p>
              </div>
            </Link>

            {/* Right Nav */}
            <div className="hidden lg:flex items-center justify-end flex-1 gap-4">
              <HeaderNav data={data} position="right" />
              <Button 
                size="lg" 
                className="bg-gradient-skate hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/birthday-parties">
                  Book a Party
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <HeaderNav data={data} />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}