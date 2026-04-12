import { describe, it, expect } from 'vitest'

// redirects.js lives at the repo root, outside `src/` and the `@/` alias.
import redirects from '../../redirects.js'

describe('Next.js redirects', () => {
  it('returns a list containing exactly the IE-incompatible redirect', async () => {
    const result = await redirects()
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(1)

    const [ie] = result
    expect(ie.destination).toBe('/ie-incompatible.html')
    expect(ie.permanent).toBe(false)
  })

  it('only fires on Internet Explorer user agents', async () => {
    const [ie] = await redirects()
    expect(ie.has).toEqual([
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)',
      },
    ])
  })

  it('excludes the incompatibility page itself from the source pattern', async () => {
    const [ie] = await redirects()
    // If the source matched `/ie-incompatible.html` itself, IE users would
    // hit an infinite redirect loop. The negative lookahead guarantees that
    // can't happen; assert on it so a well-meaning cleanup doesn't remove it.
    expect(ie.source).toContain('(?!ie-incompatible.html$)')
  })
})
