import { describe, it, expect } from 'vitest'
import type { FieldHookArgs } from 'payload'

import formatSlug from '@/hooks/formatSlug'

// The hook only reads `data`, `operation`, `originalDoc`, and `value`;
// constructing the full FieldHookArgs union is noisy and doesn't add coverage.
const call = (
  hook: ReturnType<typeof formatSlug>,
  args: Partial<FieldHookArgs>,
): unknown => hook(args as FieldHookArgs)

describe('formatSlug', () => {
  const hook = formatSlug('title')

  it('lowercases, replaces spaces with dashes, and strips punctuation', () => {
    expect(call(hook, { value: 'Learn to Skate!' })).toBe('learn-to-skate')
    expect(call(hook, { value: 'Birthday Parties & Events' })).toBe('birthday-parties--events')
  })

  it('passes through an already-valid slug unchanged', () => {
    expect(call(hook, { value: 'learn-to-skate' })).toBe('learn-to-skate')
  })

  it('falls back to formatting the fallback field on create when value is missing', () => {
    const result = call(hook, {
      operation: 'create',
      value: undefined,
      data: { title: 'New Skating Session' },
    })
    expect(result).toBe('new-skating-session')
  })

  it('does NOT apply the fallback on update — only on create', () => {
    // Prevents the hook from silently regenerating slugs for already-published
    // pages whenever the title is edited.
    const result = call(hook, {
      operation: 'update',
      value: undefined,
      data: { title: 'Renamed Page' },
      originalDoc: { title: 'Original Page', slug: 'original-page' },
    })
    expect(result).toBeUndefined()
  })

  it('returns the untouched value when value is non-string and no fallback applies', () => {
    expect(call(hook, { value: null, operation: 'update' })).toBeNull()
  })
})
