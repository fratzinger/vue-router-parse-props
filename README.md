# vue-router-parse-props

![npm](https://img.shields.io/npm/v/vue-router-parse-props)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/fratzinger/vue-router-parse-props/Node.js%20CI)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/fratzinger/vue-router-parse-props)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/fratzinger/vue-router-parse-props)
![David](https://img.shields.io/david/fratzinger/vue-router-parse-props)
![npm](https://img.shields.io/npm/dm/vue-router-parse-props)
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

Original idea from: https://stackoverflow.com/a/63897213

## Usage

```ts
// src/router/index.ts
import propsParser from 'vue-router-parse-props'

const router = new Router({
  base: process.env.BASE_URL,
  mode: useHistory ? "history" : "hash",
  routes: [
    {
      path: ":userId",
      name: "UserProfile",
      component: () => import("@/components/UserProfile.vue"),
      props: paramsToPropsCaster({ userId: Number })
    }
  ]
});
```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run. It has full support for *Visual Studio Code*. You can use the debugger to set breakpoints.

## License

Licensed under the [MIT license](LICENSE).