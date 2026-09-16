# vue-router-parse-props

[![npm](https://img.shields.io/npm/v/vue-router-parse-props)](https://www.npmjs.com/package/vue-router-parse-props)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/fratzinger/vue-router-parse-props/ci.yml?branch=main)](https://github.com/fratzinger/vue-router-parse-props/actions?query=branch%3Amain)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/fratzinger/vue-router-parse-props)](https://codeclimate.com/github/fratzinger/vue-router-parse-props)
[![Code Climate coverage](https://img.shields.io/codeclimate/coverage/fratzinger/vue-router-parse-props)](https://codeclimate.com/github/fratzinger/vue-router-parse-props)
[![libraries.io](https://img.shields.io/librariesio/release/npm/vue-router-parse-props)](https://libraries.io/npm/vue-router-parse-props)
[![npm](https://img.shields.io/npm/dm/vue-router-parse-props)](https://www.npmjs.com/package/vue-router-parse-props)
[![GitHub license](https://img.shields.io/github/license/fratzinger/vue-router-parse-props)](https://github.com/fratzinger/vue-router-parse-props/blob/master/LICENSE)

## Installation

```
npm i vue-router-parse-props
```

`vue` and `vue-router` are peer dependencies and need to be installed alongside it.

## About

Params of vue-router coming from the url are strings. Ids as props (eg. `userId`) commonly are numbers. So you need an easy way to cast string values to number values. That's where `vue-router-parse-props` comes into play.
The parser takes an parser-object and returns a function. For more information see: https://router.vuejs.org/guide/essentials/passing-props.html#function-mode

- written in typescript
- compatible with `vue-router@4` and `vue-router@5`
- parse to Number/String/Date
- parse route.params and/or route.query
- no runtime dependencies

Original idea from: https://stackoverflow.com/a/63897213

## Usage

The package has a single named export:

```ts
import { castProps } from 'vue-router-parse-props'
```

```ts
// src/router/index.ts
import { parse } from 'date-fns'
import { castProps } from 'vue-router-parse-props'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:day/:userId',
      name: 'UserProfile',
      component: () => import('@/components/UserProfile.vue'),
      props: castProps({
        // unprefixed keys read `route.params`
        'userId': Number,
        'day': (val: string): Date => parse(val, 'yyyy-MM-dd', new Date()),
        // `query.` reads `route.query` — the prop is named `q`
        'query.q': Number,
        // `params.` reads `route.params` explicitly — the prop is named `ids`
        'params.ids': (ids: string[]) => ids.map(id => Number.parseInt(id)),
        // `propKey` overrides the prop name
        'query.q2': {
          type: Number,
          propKey: 'searchId'
        }
      })
    }
  ]
})
```

### Prop names

The key selects where the value is read from; the prop it produces is the key
with the `query.`/`params.` prefix removed. Pass `propKey` to name it yourself.

| mapping key | reads | prop name |
| --- | --- | --- |
| `userId` | `route.params.userId` | `userId` |
| `query.q` | `route.query.q` | `q` |
| `params.ids` | `route.params.ids` | `ids` |
| `query.q` + `propKey: 'searchId'` | `route.query.q` | `searchId` |

## Breaking changes in 0.5.0

### `query.`/`params.` prefixes are stripped from the prop name

A prefixed key used to keep its literal dotted name unless `propKey` was given.
A prop named `query.id` is not usable as a component prop, so every caller had
to repeat itself. The prefix-stripped name is now the default:

```ts
castProps({ 'query.id': Number })(route)
// 0.4.0 → { 'query.id': 1 }
// 0.5.0 → { id: 1 }
```

`propKey` still overrides the name, and unprefixed keys are unaffected. To keep
the old output, name it explicitly: `{ 'query.id': { type: Number, propKey: 'query.id' } }`.

### The default export is gone — use the named `castProps` export

Before (0.4.0):

```ts
import castProps from 'vue-router-parse-props'
```

After (0.5.0):

```ts
import { castProps } from 'vue-router-parse-props'
```

### `vue-router` is a peer dependency

It moved out of `dependencies` into `peerDependencies` (`^4 || ^5`), so it is no
longer installed transitively — install it alongside this package.

### ESM entry

The published entry is `dist/index.js` (was `dist/index.mjs`) and no longer
contains an extensionless `lodash/get` import, so it resolves in plain Node ESM
without a bundler. Consumers who worked around this with Vitest's
`server.deps.inline: ['vue-router-parse-props']` can drop that.

## Testing

Simply run `pnpm test` and all your tests in the `test/` directory will be run with [Vitest](https://vitest.dev). It has full support for *Visual Studio Code*. You can use the debugger to set breakpoints.

## License

Licensed under the [MIT license](LICENSE).