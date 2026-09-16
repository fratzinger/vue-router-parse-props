import type { RouteLocationNormalized } from 'vue-router'

import type { Mappings, OptionsPropsCaster } from './types'

const defaultOptions: Required<OptionsPropsCaster> = {
  useUndefinedParams: false,
}

const QUERY_PREFIX = 'query.'
const PARAMS_PREFIX = 'params.'

/**
 * Resolves a mapping key to the route source it reads from and the name it
 * looks up there. A `query.`/`params.` prefix selects the source explicitly and
 * is stripped from the name; an unprefixed key reads `route.params`.
 */
function resolveKey(
  route: RouteLocationNormalized,
  key: string,
): { source: Record<string, unknown>, name: string } {
  if (key.startsWith(QUERY_PREFIX)) {
    return {
      source: route.query as Record<string, unknown>,
      name: key.slice(QUERY_PREFIX.length),
    }
  }

  const name = key.startsWith(PARAMS_PREFIX) ? key.slice(PARAMS_PREFIX.length) : key
  return { source: route.params as Record<string, unknown>, name }
}

export function castProps(mappings: Mappings, _options?: OptionsPropsCaster): ((route: RouteLocationNormalized) => Record<string, any>) {
  const options = Object.assign({}, defaultOptions, _options)
  return (
    route: RouteLocationNormalized,
  ): Record<string, unknown> => {
    const result: Record<string, unknown> = {}
    for (const key in mappings) {
      const mapping = mappings[key]
      if (!mapping) {
        continue
      }

      const { source, name } = resolveKey(route, key)
      const val = source[name]

      if (typeof mapping === 'function') {
        result[name] = mapping(val)
      }
      else {
        result[mapping.propKey || name] = mapping.type(val)
      }
    }

    if (options.useUndefinedParams) {
      for (const key in route.params) {
        if (!Object.hasOwn(result, key)) {
          result[key] = route.params[key]
        }
      }
    }
    return result
  }
}
