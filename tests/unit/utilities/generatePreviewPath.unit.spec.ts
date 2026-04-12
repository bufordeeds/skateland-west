import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import type { PayloadRequest } from 'payload'

import { generatePreviewPath } from '@/utilities/generatePreviewPath'

// The `req` param is part of the signature but unused by the current
// implementation; cast a stub rather than constructing a real Payload request.
const stubReq = {} as unknown as PayloadRequest

describe('generatePreviewPath', () => {
  const originalSecret = process.env.PREVIEW_SECRET

  beforeEach(() => {
    process.env.PREVIEW_SECRET = 'test-preview-secret'
  })

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.PREVIEW_SECRET
    } else {
      process.env.PREVIEW_SECRET = originalSecret
    }
  })

  it('builds a /next/preview URL with the preview secret embedded', () => {
    const url = generatePreviewPath({ collection: 'pages', slug: 'schedule', req: stubReq })
    expect(url.startsWith('/next/preview?')).toBe(true)

    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('slug')).toBe('schedule')
    expect(params.get('collection')).toBe('pages')
    expect(params.get('path')).toBe('/schedule')
    expect(params.get('previewSecret')).toBe('test-preview-secret')
  })

  it('prefixes /posts for the posts collection', () => {
    const url = generatePreviewPath({ collection: 'posts', slug: 'grand-reopening', req: stubReq })
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('path')).toBe('/posts/grand-reopening')
  })

  it('URL-encodes slugs with special characters in the query string', () => {
    const url = generatePreviewPath({
      collection: 'posts',
      slug: 'summer camp 2026',
      req: stubReq,
    })
    // Raw slug must not leak into the URL unescaped — a bare space would
    // break Next.js routing.
    expect(url).not.toContain('summer camp 2026')

    const params = new URLSearchParams(url.split('?')[1])
    // URLSearchParams decodes on read, so this should round-trip.
    expect(params.get('slug')).toBe('summer camp 2026')
    expect(params.get('path')).toBe('/posts/summer camp 2026')
  })

  it('falls back to an empty preview secret when the env var is unset', () => {
    delete process.env.PREVIEW_SECRET
    const url = generatePreviewPath({ collection: 'pages', slug: 'parties', req: stubReq })
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('previewSecret')).toBe('')
  })
})
