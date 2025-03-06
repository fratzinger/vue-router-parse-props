import type { RouteLocationNormalized } from 'vue-router'

import type { Mappings, OptionsPropsCaster } from './types'
import _get from 'lodash/get'

const defaultOptions: Required<OptionsPropsCaster> = {
  useUndefinedParams: false,
}

function castProps(mappings: Mappings, _options?: OptionsPropsCaster): ((route: RouteLocationNormalized) => Record<string, any>) {
  const options = Object.assign({}, defaultOptions, _options)
  return (
    route: RouteLocationNormalized,
  ): Record<string, unknown> => {
    const result = {}
    for (const key in mappings) {
      const mapping = mappings[key]

      if (typeof mapping === 'function') {
        const val = (key.startsWith('query.') || key.startsWith('params.')) ? _get(route, key) : route.params[key]
        result[key] = mapping(val)
      }
      else {
        const val = (key.startsWith('query.') || key.startsWith('params.')) ? _get(route, key) : route.params[key]
        const propKey = mapping.propKey || key
        result[propKey] = mapping.type(val)
      }
    }

    if (options.useUndefinedParams) {
      for (const key in route.params) {
        if (!Object.prototype.hasOwnProperty.call(result, key)) {
          result[key] = route.params[key]
        }
      }
    }
    return result
  }
}

export default castProps
