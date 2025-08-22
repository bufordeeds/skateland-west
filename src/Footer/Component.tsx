import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">SW</span>
                </div>
                <span className="font-bold text-lg">{SITE_CONFIG.name}</span>
              </div>
              <p className="text-muted-foreground text-sm">
                San Antonio&apos;s premier family skating experience. Creating magical memories since 1985.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="size-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="size-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="size-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink className="text-muted-foreground hover:text-primary transition-colors text-sm" {...link} />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin className="size-4 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground">
                    {SITE_CONFIG.address.street}<br />
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 text-muted-foreground" />
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Hours</h3>
              <ul className="space-y-2">
                {Object.entries(SITE_CONFIG.hours).map(([day, hours]) => (
                  <li key={day} className="flex justify-between text-sm">
                    <span className="text-muted-foreground capitalize">{day}:</span>
                    <span className={hours === "Closed" ? "text-muted-foreground/60" : "text-muted-foreground"}>
                      {hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} {SITE_CONFIG.name}. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <ThemeSelector />
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
