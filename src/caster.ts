import type { Route } from "vue-router";
import type { Mappings, OptionsPropsCaster } from "./types";

const defaultOptions: Required<OptionsPropsCaster> = {
  useUndefinedParams: false
};

const paramsToPropsCaster = (
  mappings: Mappings,
  _options?: OptionsPropsCaster
): ((route: Route) => Record<string, unknown>) => {
  const options = Object.assign({}, defaultOptions, _options);
  return (
    route: Route
  ): Record<string, unknown> => {
  
    const result = {};
    for (const key in mappings) {
      const mapping = mappings[key];
      const param = route.params[key];

      if (typeof mapping === "function") {
        result[key] = mapping(param);
      } else {
        result[key] = mapping.type(param);
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
  
export default paramsToPropsCaster;