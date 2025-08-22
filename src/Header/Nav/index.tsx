'use client'

import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
// import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NAVIGATION_ITEMS } from '@/lib/constants'

interface HeaderNavProps {
  data: HeaderType
  position?: 'left' | 'right' | 'mobile'
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data: _data, position = 'mobile' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // const navItems = data?.navItems || []
  
  // Split navigation items for desktop
  const leftItems = position === 'left' ? NAVIGATION_ITEMS.slice(0, 2) : []
  const rightItems = position === 'right' ? NAVIGATION_ITEMS.slice(2) : []
  
  if (position === 'mobile') {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
        
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[96px] z-40 bg-background/95 backdrop-blur-lg lg:hidden">
            <nav className="container py-8">
              <div className="flex flex-col gap-4">
                {NAVIGATION_ITEMS.map(({ label, href }, i) => (
                  <Link
                    key={i}
                    href={href}
                    className="text-lg font-bold hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <div className="border-t pt-4 mt-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-skate hover:opacity-90 text-white font-bold"
                    asChild
                  >
                    <Link href="/birthday-parties">Book a Party</Link>
                  </Button>
                </div>
                <Link 
                  href="/search"
                  className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <SearchIcon className="size-5" />
                  Search
                </Link>
              </div>
            </nav>
          </div>
        )}
      </>
    )
  }
  
  const items = position === 'left' ? leftItems : rightItems
  
  return (
    <nav className="flex gap-8 items-center">
      {items.map(({ label, href }, i) => (
        <Link
          key={i}
          href={href}
          className="font-semibold hover:text-primary transition-colors relative group"
        >
          {label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-skate group-hover:w-full transition-all duration-300"></span>
        </Link>
      ))}
      {position === 'right' && (
        <Link href="/search" className="hover:text-primary transition-colors">
          <span className="sr-only">Search</span>
          <SearchIcon className="size-5" />
        </Link>
      )}
    </nav>
  )
}