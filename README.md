# vue-router-parse-props

## Installation

```
npm i vue-router-parse-props
```

## About

Params of vue-router coming from the url are strings. Ids as props (eg. `userId`) commonly are numbers. So you need an easy way to cast string values to number values. That's where `vue-router-parse-props` comes into play.
The parser takes an parser-object and returns a function. For more information see: https://router.vuejs.org/guide/essentials/passing-props.html#function-mode

- written in typescript

Original idea from: https://stackoverflow.com/a/63897213

## Usage

```ts
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