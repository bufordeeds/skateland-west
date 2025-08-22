import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Package = {
  id: string
  name: string
  price: number
  duration: string
  guests: number
  featured?: boolean
  features: string[]
  buttonText?: string
  buttonUrl?: string
}

type Props = {
  title?: string
  subtitle?: string
  packages: Package[]
}

export const PartyPackages: React.FC<Props> = ({ title, subtitle, packages }) => {
  return (
    <section className="py-16">
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-xl text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages?.map((pkg) => (
            <Card
              key={pkg.id}
              className={`h-full flex flex-col ${
                pkg.featured ? 'border-primary shadow-lg relative' : ''
              }`}
            >
              <CardHeader className="text-center flex-shrink-0">
                {pkg.featured && (
                  <Badge className="w-fit mx-auto mb-2">Most Popular</Badge>
                )}
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription className="space-y-1">
                  <div>
                    <span className="text-3xl font-bold text-primary">
                      ${pkg.price}
                    </span>
                    <span className="text-muted-foreground">
                      {' '}
                      / {pkg.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For up to {pkg.guests} guests
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-2 mb-6 flex-grow">
                  {pkg.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-auto"
                  variant={pkg.featured ? 'default' : 'outline'}
                  asChild
                >
                  <a href={pkg.buttonUrl || '/birthday-parties'}>
                    {pkg.buttonText || 'Select This Package'}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}