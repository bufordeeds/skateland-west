import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the sink BEFORE importing the route so the route picks up the mock.
// The variable name MUST start with `mock` for vi.mock's hoisting rules.
const mockAppendSubscriber = vi.fn<(s: unknown) => Promise<void>>()
vi.mock('@/lib/subscriberSink', () => ({
  appendSubscriber: (s: unknown) => mockAppendSubscriber(s),
}))

// Dynamic import so the mock is in place. The route reads
// `process.env.TURNSTILE_SECRET_KEY` at request time, not import time, so we
// stub it per-test.
const importRoute = () => import('@/app/(frontend)/api/newsletter-subscribe/route')

const validBody = {
  name: 'Megan Braun',
  email: 'megan@example.com',
  website: '',
  turnstileToken: 'test-token',
}

const makeReq = (body: unknown = validBody, headers: Record<string, string> = {}) =>
  new Request('http://localhost/api/newsletter-subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })

const mockTurnstileOk = () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify({ success: true }), { status: 200 })),
  )
}

describe('POST /api/newsletter-subscribe', () => {
  beforeEach(() => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'test-secret')
    mockAppendSubscriber.mockReset()
    mockAppendSubscriber.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it('returns 200 with success: true on the happy path', async () => {
    mockTurnstileOk()
    const { POST } = await importRoute()

    const res = await POST(makeReq())
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ success: true })
    expect(mockAppendSubscriber).toHaveBeenCalledTimes(1)
  })

  // Bug 2 from MOS-60 — was returning 200 + { success: true } and the
  // subscriber never landed in the Sheet.
  it('returns 502 when the subscriber sink throws (MOS-60)', async () => {
    mockTurnstileOk()
    mockAppendSubscriber.mockRejectedValue(new Error('sheet unavailable'))
    const { POST } = await importRoute()

    const res = await POST(makeReq())
    expect(res.status).toBe(502)
    const body = (await res.json()) as { error?: string; success?: boolean }
    expect(body.success).toBeUndefined()
    expect(body.error).toMatch(/try again/i)
  })

  it('returns 400 when name is missing', async () => {
    mockTurnstileOk()
    const { POST } = await importRoute()

    const res = await POST(makeReq({ ...validBody, name: '' }))
    expect(res.status).toBe(400)
    expect(mockAppendSubscriber).not.toHaveBeenCalled()
  })

  it('returns 400 when email is malformed', async () => {
    mockTurnstileOk()
    const { POST } = await importRoute()

    const res = await POST(makeReq({ ...validBody, email: 'not-an-email' }))
    expect(res.status).toBe(400)
    expect(mockAppendSubscriber).not.toHaveBeenCalled()
  })

  it('returns 200 (and silently drops) when the honeypot is filled', async () => {
    mockTurnstileOk()
    const { POST } = await importRoute()

    const res = await POST(makeReq({ ...validBody, website: 'http://spam.example.com' }))
    // Bots see a "success" so they think the form worked; meanwhile we
    // never touched the sink or even verified the captcha.
    expect(res.status).toBe(200)
    expect(mockAppendSubscriber).not.toHaveBeenCalled()
  })

  it('returns 400 when captcha verification fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ success: false }), { status: 200 })),
    )
    const { POST } = await importRoute()

    const res = await POST(makeReq())
    expect(res.status).toBe(400)
    expect(mockAppendSubscriber).not.toHaveBeenCalled()
  })
})
