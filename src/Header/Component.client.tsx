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
      <div className="hidden lg:block bg-gradient-skate text-white py-1.5 relative overflow-hidden">
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
        className={`sticky top-0 z-50 w-full transition-all duration-300 bg-slate-900 ${
          scrolled
            ? 'shadow-lg shadow-black/20'
            : ''
        }`}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Left Nav */}
            <div className="hidden lg:flex items-center flex-1">
              <HeaderNav data={data} position="left" />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-fun rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative size-9 lg:size-10 bg-gradient-skate rounded-full flex items-center justify-center shadow-md transform group-hover:scale-110 transition-all duration-300">
                  <span className="text-white font-black text-sm lg:text-base">SW</span>
                </div>
              </div>
              <div>
                <span className="font-black text-base lg:text-lg text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  {SITE_CONFIG.name}
                </span>
              </div>
            </Link>

            {/* Right Nav */}
            <div className="hidden lg:flex items-center justify-end flex-1 gap-4">
              <HeaderNav data={data} position="right" />
              <Button
                size="sm"
                className="bg-white/15 hover:bg-white/25 text-white font-bold border border-white/20 transition-all duration-300"
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