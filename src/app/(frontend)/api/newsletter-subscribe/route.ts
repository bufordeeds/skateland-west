import { NextResponse } from 'next/server'
import { appendSubscriber } from '@/lib/subscriberSink'

const EMAIL_RE = /^\S[^\s@]*@\S+\.\S+$/
const NAME_MAX = 120
const EMAIL_MAX = 254
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

type SubscribeBody = {
  name?: unknown
  email?: unknown
  website?: unknown
  turnstileToken?: unknown
}

export async function POST(req: Request) {
  let body: SubscribeBody
  try {
    body = (await req.json()) as SubscribeBody
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ success: true })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken : ''

  if (!name || name.length > NAME_MAX) {
    return NextResponse.json({ error: 'Please provide your name.' }, { status: 400 })
  }
  if (!email || email.length > EMAIL_MAX || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
  }
  if (!turnstileToken) {
    return NextResponse.json({ error: 'Captcha verification missing.' }, { status: 400 })
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (!turnstileSecret) {
    console.error('TURNSTILE_SECRET_KEY is not set')
    return NextResponse.json({ error: 'Newsletter service is not configured.' }, { status: 500 })
  }

  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || ''
  const verifyForm = new URLSearchParams({ secret: turnstileSecret, response: turnstileToken })
  if (ip) verifyForm.set('remoteip', ip.split(',')[0].trim())

  let captchaOk = false
  try {
    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verifyForm.toString(),
    })
    const verifyData = (await verifyRes.json()) as { success?: boolean }
    captchaOk = verifyData.success === true
  } catch (err) {
    console.error('Turnstile verify request failed:', err)
    return NextResponse.json({ error: 'Captcha verification failed.' }, { status: 502 })
  }

  if (!captchaOk) {
    return NextResponse.json({ error: 'Captcha verification failed.' }, { status: 400 })
  }

  try {
    await appendSubscriber({
      name,
      email,
      source: 'skateland-website',
      submittedAt: new Date(),
      ipCountry: req.headers.get('cf-ipcountry') || '',
      userAgent: req.headers.get('user-agent') || '',
    })
  } catch (err) {
    console.error('appendSubscriber failed:', err)
  }

  return NextResponse.json({ success: true })
}
