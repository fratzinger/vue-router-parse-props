import _get from "lodash/get";

import type { Route } from "vue-router";
import type { Mappings, OptionsPropsCaster } from "./types";

const defaultOptions: Required<OptionsPropsCaster> = {
  useUndefinedParams: false
};

const castProps = (
  mappings: Mappings,
  _options?: OptionsPropsCaster
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): ((route: Route) => Record<string, any>) => {
  const options = Object.assign({}, defaultOptions, _options);
  return (
    route: Route
  ): Record<string, unknown> => {
      
    const result = {};
    for (const key in mappings) {
      const mapping = mappings[key];

      if (typeof mapping === "function") {
        const val = route.params[key];
        result[key] = mapping(val);
      } else {
        const val = (mapping.routeKey) ? _get(route, mapping.routeKey) : route.params[key];
        result[key] = mapping.type(val);
      }
    }

    if (options.useUndefinedParams) {
      for (const key in route.params) {
        if (!Object.prototype.hasOwnProperty.call(result, key)) {
          result[key] = route.params[key];
        }
      }
    }
    return result;
  };
};
  
export default castProps;