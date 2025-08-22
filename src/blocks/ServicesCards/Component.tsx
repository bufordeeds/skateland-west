import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type ServiceCard = {
  icon: string
  title: string
  description: string
  features: string[]
  buttonText: string
  buttonUrl: string
  color?: 'primary' | 'secondary' | 'accent'
}

type Props = {
  title?: string
  subtitle?: string
  cards: ServiceCard[]
}

export const ServicesCards: React.FC<Props> = ({ title, subtitle, cards }) => {
  const getColorClass = (color?: string) => {
    switch (color) {
      case 'secondary':
        return 'bg-secondary/10'
      case 'accent':
        return 'bg-accent/10'
      default:
        return 'bg-primary/10'
    }
  }

  return (
    <section className="py-16 bg-muted/30">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards?.map((card, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer h-full"
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`mx-auto w-12 h-12 ${getColorClass(
                    card.color
                  )} rounded-full flex items-center justify-center mb-4 text-2xl`}
                >
                  {card.icon}
                </div>
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  {card.features?.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={card.buttonUrl || '#'}>
                    {card.buttonText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}