import React from 'react'
import { Calendar, Clock, DollarSign, Star, Users, Music, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type ScheduleDay = {
  day: string
  hours: string
  title: string
  description: string
  price: string
  special?: string
  highlight?: boolean
  icon?: 'star' | 'users' | 'music' | 'sparkles'
}

type Props = {
  title?: string
  subtitle?: string
  schedule: ScheduleDay[]
  ctaText?: string
  ctaUrl?: string
}

const iconMap = {
  star: Star,
  users: Users,
  music: Music,
  sparkles: Sparkles,
}

const dayColors = {
  Monday: 'from-slate-500 to-slate-600',
  Tuesday: 'from-green-500 to-emerald-600',
  Wednesday: 'from-purple-500 to-purple-600',
  Thursday: 'from-blue-500 to-blue-600',
  Friday: 'from-pink-500 to-pink-600',
  Saturday: 'from-orange-500 to-orange-600',
  Sunday: 'from-yellow-500 to-yellow-600',
}

export const ScheduleCards: React.FC<Props> = ({
  title = "Weekly Schedule",
  subtitle = "Every Day Brings a New Adventure",
  schedule,
  ctaText = "View Full Schedule",
  ctaUrl = "/schedule"
}) => {
  return (
    <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-10"></div>
      
      <div className="container relative">
        <div className="text-center mb-12 space-y-4">
          {subtitle && (
            <p className="text-lg text-muted-foreground font-medium">
              {subtitle}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-gradient">{title}</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {schedule.map((day, index) => {
            const Icon = day.icon ? iconMap[day.icon] : Calendar
            const dayColor = dayColors[day.day as keyof typeof dayColors] || 'from-primary to-secondary'
            
            return (
              <Card 
                key={index}
                className={`relative overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                  day.highlight ? 'ring-2 ring-primary shadow-xl' : 'hover:shadow-xl'
                }`}
              >
                {day.highlight && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-gradient-party text-white border-0 px-3 py-1 font-bold animate-pulse">
                      POPULAR
                    </Badge>
                  </div>
                )}
                
                <div className={`h-2 bg-gradient-to-r ${dayColor}`}></div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-black">{day.day}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Clock className="size-3" />
                        {day.hours}
                      </div>
                    </div>
                    <div className={`size-10 bg-gradient-to-br ${dayColor} rounded-full flex items-center justify-center text-white`}>
                      <Icon className="size-5" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-1">{day.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {day.description}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="size-4 text-primary" />
                      <span className="font-bold">{day.price}</span>
                    </div>
                    {day.special && (
                      <Badge variant="secondary" className="w-full justify-center">
                        {day.special}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-skate hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <a href={ctaUrl}>
              <Calendar className="size-5 mr-2" />
              {ctaText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}