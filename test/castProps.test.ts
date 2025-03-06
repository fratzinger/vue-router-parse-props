import type { RouteLocationNormalized } from 'vue-router'
import assert from 'node:assert'
import {
  isSameSecond,
  parse,
} from 'date-fns'

import castProps from '../src'

describe('castProps.test.ts', () => {
  describe('as function', () => {
    it('casts string to integer', () => {
      const route = { params: { id: '1' } } as unknown as RouteLocationNormalized
      const result = castProps({
        id: Number,
      })(route)

      assert.deepStrictEqual(result, { id: 1 }, 'parses to integer')
    })

    it('casts integer to string', () => {
      const route = { params: { id: 1 } } as unknown as RouteLocationNormalized
      const result = castProps({
        id: String,
      })(route)

      assert.deepStrictEqual(result, { id: '1' }, 'parses to string')
    })

    it('casts date-string to Date', () => {
      const route = { params: { day: '2021-09-28' } } as unknown as RouteLocationNormalized
      const result = castProps({
        day: (val: string): Date => parse(val, 'yyyy-MM-dd', new Date()),
      })(route)

      assert.ok(isSameSecond(result.day, new Date('2021-09-28T00:00:00')))
    })

    it('doesn\'t use undefined Params by default', () => {
      const route = { params: { id: '1', day: '1' } } as unknown as RouteLocationNormalized
      const result = castProps({
        id: String,
      })(route)

      assert.deepStrictEqual(result, { id: '1' }, 'does not use params')
    })

    it('uses undefined Params with useUndefinedParams:true', () => {
      const route = { params: { id: '1', day: '1' } } as unknown as RouteLocationNormalized
      const result = castProps({
        id: String,
      }, { useUndefinedParams: true })(route)

      assert.deepStrictEqual(result, { id: '1', day: '1' }, 'uses undefined values')
    })
  })

  describe('as object', () => {
    it('casts string to integer', () => {
      const route = { params: { id: '1' } } as unknown as RouteLocationNormalized
      const result = castProps({
        id: { type: Number },
      })(route)

      assert.deepStrictEqual(result, { id: 1 }, 'parses to integer')
    })

    it('casts integer to string', () => {
      const route = { params: { id: 1 } } as unknown as RouteLocationNormalized
      const result = castProps({
        id: { type: String },
      })(route)

      assert.deepStrictEqual(result, { id: '1' }, 'parses to string')
    })

    it('casts query string to integer', () => {
      const route = { query: { id: '1' } } as unknown as RouteLocationNormalized
      const result = castProps({
        'query.id': { type: Number, propKey: 'id' },
      })(route)

      assert.deepStrictEqual(result, { id: 1 }, 'parses to integer')
    })

    it('casts query string[] to integer[] with default propKey', () => {
      const route = { query: { id: ['1', '2', '3'] } } as unknown as RouteLocationNormalized
      const result = castProps({
        'query.id': {
          type: (val: string[]): number[] => val.map(x => Number.parseInt(x)),
        },
      })(route)

      assert.deepStrictEqual(result, { 'query.id': [1, 2, 3] }, 'parses to integer')
    })

    it('casts query string[] to integer[] with custom propKey', () => {
      const route = { query: { id: ['1', '2', '3'] } } as unknown as RouteLocationNormalized
      const result = castProps({
        'query.id': {
          type: (val: string[]): number[] => val.map(x => Number.parseInt(x)),
          propKey: 'id',
        },
      })(route)

      assert.deepStrictEqual(result, { id: [1, 2, 3] }, 'parses to integer')
    })

    it('doesn\'t use undefined Params by default', () => {
      const route = { params: { id: '1', day: '1' } } as unknown as RouteLocationNormalized
      const result = castProps({
        id: { type: String },
      })(route)

      assert.deepStrictEqual(result, { id: '1' }, 'does not use params')
    })

    it('uses undefined Params with useUndefinedParams:true', () => {
      const route = { params: { id: '1', day: '1' } } as unknown as RouteLocationNormalized
      const result = castProps({
        id: { type: String },
      }, { useUndefinedParams: true })(route)

      assert.deepStrictEqual(result, { id: '1', day: '1' }, 'uses undefined values')
    })
  })
})
