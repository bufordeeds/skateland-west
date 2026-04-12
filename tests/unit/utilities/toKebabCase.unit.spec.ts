import { describe, it, expect } from 'vitest'

import { toKebabCase } from '@/utilities/toKebabCase'

describe('toKebabCase', () => {
  it('converts camelCase to kebab-case', () => {
    expect(toKebabCase('heroSection')).toBe('hero-section')
  })

  it('converts PascalCase to kebab-case', () => {
    expect(toKebabCase('SchedulePage')).toBe('schedule-page')
  })

  it('replaces whitespace runs with a single hyphen', () => {
    expect(toKebabCase('Party Packages')).toBe('party-packages')
    expect(toKebabCase('Learn    to   Skate')).toBe('learn-to-skate')
  })

  it('lowercases already-kebab input without mangling it', () => {
    expect(toKebabCase('already-kebab')).toBe('already-kebab')
  })

  it('handles empty string', () => {
    expect(toKebabCase('')).toBe('')
  })
})
