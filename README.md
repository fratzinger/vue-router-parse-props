# vue-router-parse-props

[![npm](https://img.shields.io/npm/v/vue-router-parse-props)](https://www.npmjs.com/package/vue-router-parse-props)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/fratzinger/vue-router-parse-props/Node.js%20CI)](https://github.com/fratzinger/vue-router-parse-props/actions?query=branch%3Amain++)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/fratzinger/vue-router-parse-props)](https://codeclimate.com/github/fratzinger/vue-router-parse-props)
[![Code Climate coverage](https://img.shields.io/codeclimate/coverage/fratzinger/vue-router-parse-props)](https://codeclimate.com/github/fratzinger/vue-router-parse-props)
[![libraries.io](https://img.shields.io/librariesio/release/npm/vue-router-parse-props)](https://libraries.io/npm/vue-router-parse-props)
[![npm](https://img.shields.io/npm/dm/vue-router-parse-props)](https://www.npmjs.com/package/vue-router-parse-props)
[![GitHub license](https://img.shields.io/github/license/fratzinger/vue-router-parse-props)](https://github.com/fratzinger/vue-router-parse-props/blob/master/LICENSE)

## Installation

```
npm i vue-router-parse-props
```

## About

Params of vue-router coming from the url are strings. Ids as props (eg. `userId`) commonly are numbers. So you need an easy way to cast string values to number values. That's where `vue-router-parse-props` comes into play.
The parser takes an parser-object and returns a function. For more information see: https://router.vuejs.org/guide/essentials/passing-props.html#function-mode

- written in typescript
- compatible with `vue-router@3` and `vue-router@4`
- parse to Number/String/Date
- parse route.params and/or route.query

Original idea from: https://stackoverflow.com/a/63897213

## Usage

```ts
// src/router/index.ts
import propsParser from 'vue-router-parse-props'
import { parse } from 'date-fns'

const router = new Router({
  base: process.env.BASE_URL,
  mode: useHistory ? 'history' : 'hash',
  routes: [
    {
      path: ':day/:userId',
      name: 'UserProfile',
      component: () => import('@/components/UserProfile.vue'),
      props: paramsToPropsCaster({ 
        userId: Number,
        day: (val: string): Date => parse(val, 'yyyy-MM-dd', new Date()),
        // keys starting with 'query.${}' look at 'route.query.${}'
        'query.q': {
          type: Number,
          propKey: 'searchId'
        },
        // keys starting with 'params.${}' look at 'route.params${}' explicitly
        'params.ids': {
          type: (ids) => ids.map(id => parseInt(id)),
          propKey: 'ids'
        }
      })
    }
  ]
});
```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run. It has full support for *Visual Studio Code*. You can use the debugger to set breakpoints.

## License

Licensed under the [MIT license](LICENSE).