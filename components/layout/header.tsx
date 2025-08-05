"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Phone } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { SITE_CONFIG, NAVIGATION_ITEMS } from "@/lib/constants"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href={`tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`}>
                <Phone className="size-4" />
                {SITE_CONFIG.phone}
              </a>
            </Button>
            <Button size="sm">Book Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu className="size-6" />
          </Button>
        </div>
      </Container>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-4">
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={`tel:${SITE_CONFIG.phone.replace(/\D/g, "")}`}>
                  <Phone className="size-4" />
                  Call: {SITE_CONFIG.phone}
                </a>
              </Button>
              <Button size="lg" className="w-full">
                Book Your Party
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}