# Changelog

## 0.5.0

### Breaking changes

#### `query.`/`params.` prefixes are stripped from the prop name

A prefixed mapping key used to keep its literal dotted name when no `propKey`
was given. A prop named `query.id` is not usable as a component prop, so in
practice every caller had to repeat itself with `propKey: 'id'`. The
prefix-stripped name is now the default:

```ts
castProps({ 'query.id': Number })(route)
// 0.4.0 → { 'query.id': 1 }
// 0.5.0 → { id: 1 }
```

The same applies to the `params.` prefix. `propKey` still overrides the name,
and unprefixed keys are unaffected. To keep the old output, set the name
explicitly: `{ 'query.id': { type: Number, propKey: 'query.id' } }`.

#### The default export was replaced by a named `castProps` export

```ts
// 0.4.0
import castProps from 'vue-router-parse-props'
// 0.5.0
import { castProps } from 'vue-router-parse-props'
```

#### `vue-router` moved to `peerDependencies`

It is no longer installed transitively. The supported range widened to
`^4.0.0 || ^5.0.0`; install `vue-router` alongside this package.

#### The published ESM entry is `dist/index.js`

Previously `dist/index.mjs`. The entry no longer contains an extensionless
`lodash/get` import, which only a bundler could resolve — importing the package
in a plain Node ESM context (for example Vitest with `environment: 'node'`)
failed with `Cannot find module '.../lodash/get'`. Consumers who worked around
that with `test.server.deps.inline: ['vue-router-parse-props']` can drop it.

### Fixes

- Dropped the `lodash` dependency. The prefix lookup is a single level, so the
  deep-path `get` helper it was used for is gone; the package now ships with no
  runtime dependencies at all.
- Typed casters as a call signature (`Caster<TValue, TResult>`) instead of the
  bare `Function` type.
- A mapping key explicitly set to `undefined` is now skipped instead of throwing.

### Chore

- Build with `tsdown` instead of `unbuild`; test with Vitest only (Mocha removed).
- Updated to TypeScript 6, ESLint 10, Vitest 5 and pnpm 12; Node >= 22.18 required.

## Earlier releases

See the [releases page](https://github.com/fratzinger/vue-router-parse-props/releases).
