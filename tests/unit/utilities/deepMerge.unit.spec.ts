import { describe, it, expect } from 'vitest'

import deepMerge, { isObject } from '@/utilities/deepMerge'

describe('isObject', () => {
  it('is true for plain objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('is false for arrays (arrays take the assignment branch in deepMerge)', () => {
    // deepMerge relies on this: arrays must be overwritten wholesale, not
    // key-merged, or we end up with nonsense like { 0: 'a', 1: 'b', 2: 'c' }.
    expect(isObject([])).toBe(false)
    expect(isObject([1, 2, 3])).toBe(false)
  })
})

describe('deepMerge', () => {
  it('overwrites primitive values from source', () => {
    expect(deepMerge({ a: 1, b: 2 }, { b: 99 })).toEqual({ a: 1, b: 99 })
  })

  it('recursively merges nested objects', () => {
    const target = { a: { x: 1, y: 2 }, b: 3 }
    const source = { a: { y: 20, z: 30 } }
    expect(deepMerge(target, source)).toEqual({ a: { x: 1, y: 20, z: 30 }, b: 3 })
  })

  it('replaces arrays wholesale instead of key-merging them', () => {
    const result = deepMerge({ tags: ['old'] }, { tags: ['new', 'newer'] })
    expect(result).toEqual({ tags: ['new', 'newer'] })
  })

  it('copies keys that exist in source but not in target', () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it('does not mutate the target', () => {
    const target = { a: { n: 1 } }
    deepMerge(target, { a: { n: 2 } })
    expect(target).toEqual({ a: { n: 1 } })
  })
})
