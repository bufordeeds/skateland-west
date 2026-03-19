'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getClientSideURL } from '@/utilities/getURL'

type Props = {
  heading: string
  description?: string
  buttonText?: string
  successMessage?: string
  gradient?: boolean
}

export const NewsletterSignup: React.FC<Props> = ({
  heading,
  description,
  buttonText = 'Subscribe',
  successMessage = "You're on the list!",
  gradient = false,
}) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch(`${getClientSideURL()}/api/newsletter-subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setEmail('')
      setName('')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section
      className={`py-16 ${
        gradient
          ? 'bg-gradient-to-r from-primary to-secondary text-white'
          : 'bg-muted/30'
      }`}
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Mail className="size-8" />
            <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
          </div>

          {description && (
            <p className={`text-lg ${gradient ? 'opacity-90' : 'text-muted-foreground'}`}>
              {description}
            </p>
          )}

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 py-4">
              <CheckCircle className="size-6 text-green-500" />
              <p className="text-lg font-medium">{successMessage}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Name"
              />
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
              />
              <Button
                type="submit"
                size="lg"
                variant={gradient ? 'secondary' : 'default'}
                disabled={status === 'loading'}
                className="whitespace-nowrap"
              >
                {status === 'loading' ? 'Subscribing...' : buttonText}
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </section>
  )
}
