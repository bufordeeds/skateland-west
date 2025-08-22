'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-10 md:size-12 bg-primary rounded-full flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-lg md:text-xl">SW</span>
            </div>
            <div>
              <span className="font-bold text-lg md:text-xl text-foreground">
                {SITE_CONFIG.name}
              </span>
              <p className="text-xs text-muted-foreground hidden md:block">
                Family Fun Since 1985
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <HeaderNav data={data} />
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}>
                  <Phone className="size-4 mr-2" />
                  {SITE_CONFIG.phone}
                </a>
              </Button>
              <Button size="sm" asChild>
                <Link href="/birthday-parties">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
