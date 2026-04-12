import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getServerSideURL } from '@/utilities/getURL'

// Empty-string is the "unset" signal the implementation treats as falsy
// (`if (!url)` is true for '' and undefined alike), and it sidesteps the
// strict `environment.d.ts` that types these env vars as required `string`.
const UNSET = ''

describe('getServerSideURL', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', UNSET)
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', UNSET)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('uses NEXT_PUBLIC_SERVER_URL when set', () => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://skateland.buford.dev')
    expect(getServerSideURL()).toBe('https://skateland.buford.dev')
  })

  it('falls back to VERCEL_PROJECT_PRODUCTION_URL with an https:// prefix', () => {
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'skateland-west.vercel.app')
    expect(getServerSideURL()).toBe('https://skateland-west.vercel.app')
  })

  it('prefers NEXT_PUBLIC_SERVER_URL over the Vercel fallback', () => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://skateland.buford.dev')
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'skateland-west.vercel.app')
    expect(getServerSideURL()).toBe('https://skateland.buford.dev')
  })

  it('falls back to http://localhost:3000 when nothing is set', () => {
    expect(getServerSideURL()).toBe('http://localhost:3000')
  })

  it('never returns a value with a trailing slash when env is set cleanly', () => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://skateland.buford.dev')
    // Trailing slash would silently break absolute URL building in several
    // spots (e.g. generateMeta, sitemaps). Callers pass this value straight
    // into string concatenation, so guard the contract here.
    expect(getServerSideURL().endsWith('/')).toBe(false)
  })
})
