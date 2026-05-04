'use client'

import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import Script from 'next/script'
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

type TurnstileApi = {
  render: (
    container: string | HTMLElement,
    options: {
      sitekey: string
      theme?: 'light' | 'dark' | 'auto'
      callback?: (token: string) => void
      'expired-callback'?: () => void
      'error-callback'?: () => void
    },
  ) => string
  remove: (widgetId: string) => void
  reset: (widgetId?: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

export const NewsletterSignup: React.FC<Props> = ({
  heading,
  description,
  buttonText = 'Subscribe',
  successMessage = "You're on the list!",
  gradient = false,
}) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const errorId = useId()

  const widgetIdRef = useRef<string | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scriptReady, setScriptReady] = useState(false)

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) return
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    })
  }, [siteKey])

  useEffect(() => {
    if (scriptReady) renderWidget()
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [scriptReady, renderWidget])

  const resetTurnstile = () => {
    setTurnstileToken('')
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch(`${getClientSideURL()}/api/newsletter-subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, website, turnstileToken }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        resetTurnstile()
        return
      }

      setStatus('success')
      setName('')
      setEmail('')
      setWebsite('')
      resetTurnstile()
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
      resetTurnstile()
    }
  }

  return (
    <section
      className={`py-16 ${
        gradient ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-muted/30'
      }`}
    >
      {siteKey && (
        <Script
          src={TURNSTILE_SRC}
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
          onReady={() => setScriptReady(true)}
        />
      )}
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
              className="flex flex-col gap-3 max-w-lg mx-auto"
              noValidate
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-name" className="sr-only">
                  Name
                </label>
                <Input
                  id="newsletter-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  aria-describedby={status === 'error' ? errorId : undefined}
                />
                <label htmlFor="newsletter-email" className="sr-only">
                  Email
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  aria-describedby={status === 'error' ? errorId : undefined}
                />
                <Button
                  type="submit"
                  size="lg"
                  variant={gradient ? 'secondary' : 'default'}
                  disabled={status === 'loading' || !turnstileToken}
                  className="whitespace-nowrap"
                >
                  {status === 'loading' ? 'Subscribing...' : buttonText}
                </Button>
              </div>

              <div
                ref={containerRef}
                className="flex justify-center"
                aria-hidden={!siteKey}
              />

              <div aria-hidden="true" className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden">
                <label htmlFor="newsletter-website">Leave this field empty</label>
                <input
                  id="newsletter-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </form>
          )}

          {status === 'error' && (
            <p id={errorId} className="text-sm text-red-500" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
