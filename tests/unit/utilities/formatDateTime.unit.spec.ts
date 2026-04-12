import { describe, it, expect, vi, afterAll } from 'vitest'

import { formatDateTime } from '@/utilities/formatDateTime'

describe('formatDateTime', () => {
  it('formats a mid-year date as MM/DD/YYYY', () => {
    // 2024-06-15T12:00:00Z — use a T12:00 timestamp to avoid UTC-vs-local
    // rollover flipping the day under a non-UTC test runner.
    expect(formatDateTime('2024-06-15T12:00:00Z')).toBe('06/15/2024')
  })

  it('zero-pads single-digit months and days', () => {
    expect(formatDateTime('2024-01-05T12:00:00Z')).toBe('01/05/2024')
    expect(formatDateTime('2024-09-09T12:00:00Z')).toBe('09/09/2024')
  })

  it('uses two-digit month for December (12, not 012)', () => {
    expect(formatDateTime('2024-12-25T12:00:00Z')).toBe('12/25/2024')
  })

  it('falls back to "now" when timestamp is an empty string', () => {
    const fixedNow = new Date('2030-03-07T12:00:00Z')
    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)
    try {
      expect(formatDateTime('')).toBe('03/07/2030')
    } finally {
      vi.useRealTimers()
    }
  })

  afterAll(() => {
    vi.useRealTimers()
  })
})
