import assert from 'node:assert'
import { describe, it } from 'vitest'
import { castProps } from '../src'

describe('index.test.ts', () => {
  it('has exports', () => {
    assert.ok(castProps)
  })
})
