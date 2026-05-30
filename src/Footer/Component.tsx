import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react'

import type { Footer as FooterType, SiteSetting } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getTodayHours, resolveSiteSettings } from '@/lib/siteSettings'
import Image from 'next/image'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()
  const settings = resolveSiteSettings(await getCachedGlobal('site-settings', 1)() as SiteSetting)

  const navItems = footerData?.navItems || []

  const currentYear = new Date().getFullYear()
  const isOpenToday = getTodayHours(settings.hours)?.isOpen ?? false

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/50 border-t-2 border-primary/10">
      {/* Fun top decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-skate"></div>

      <div className="container">
        <div className="py-12 md:py-16">
          <div className={`grid grid-cols-1 md:grid-cols-2 ${navItems.length > 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8 lg:gap-12`}>
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 group">
                <Image
                  src="/skateland-logo.png"
                  alt=""
                  width={56}
                  height={48}
                  className="h-12 w-auto"
                />
                <span className="font-black text-xl">{settings.businessName}</span>
              </div>

              <p className="text-muted-foreground">
                San Antonio&apos;s premier family skating destination. Where memories are made and
                fun never ends!
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  asChild
                >
                  <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="size-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300"
                  asChild
                >
                  <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="size-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                  asChild
                >
                  <a href={settings.social.x} target="_blank" rel="noopener noreferrer">
                    <span className="font-black text-base" aria-hidden="true">X</span>
                    <span className="sr-only">X</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            {navItems.length > 0 && (
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <div className="size-2 bg-primary rounded-full"></div>
                  Explore
                </h3>
                <ul className="space-y-3">
                  {navItems.slice(0, 5).map(({ link }, i) => (
                    <li key={i}>
                      <CMSLink
                        className="text-muted-foreground hover:text-primary transition-colors font-medium"
                        {...link}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Visit Us */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="size-2 bg-secondary rounded-full"></div>
                Visit Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="size-9 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {settings.address.street}
                      <br />
                      {settings.address.city}, {settings.address.state}{' '}
                      {settings.address.zip}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-9 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Phone className="size-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <a
                      href={`tel:${settings.phone.replace(/\D/g, '')}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-9 bg-accent/10 rounded-full flex items-center justify-center">
                    <Mail className="size-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {settings.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="size-2 bg-accent rounded-full"></div>
                Hours
              </h3>
              <div className="space-y-2">
                {settings.hours.map((day) => (
                  <div
                    key={day.key}
                    className={`flex justify-between items-center py-1.5 px-3 rounded-lg ${
                      day.isOpen ? 'bg-primary/5' : ''
                    }`}
                  >
                    <span className="text-sm font-medium capitalize">{day.label}</span>
                    <span
                      className={`text-sm ${
                        day.isOpen ? 'text-primary font-bold' : 'text-muted-foreground/60'
                      }`}
                    >
                      {day.hours}
                    </span>
                  </div>
                ))}
                {isOpenToday ? (
                  <Badge className="w-full justify-center mt-3 bg-gradient-skate text-white border-0">
                    <Clock className="size-3 mr-1" />
                    Open Today!
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="w-full justify-center mt-3">
                    <Clock className="size-3 mr-1" />
                    Private Parties Only
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} {settings.businessName}. All rights reserved.
                <span className="mx-2">•</span>
                <a
                  href="https://mosscreekdigital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Website by Moss Creek Digital
                </a>
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
