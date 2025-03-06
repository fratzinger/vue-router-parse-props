// eslint-disable-next-line ts/no-unsafe-function-type
export type CasterProp = Function | CasterPropObject

export interface CasterPropObject {
  // eslint-disable-next-line ts/no-unsafe-function-type
  type: Function
  propKey?: string
}

export interface Mappings {
  [key: string]: CasterProp
}

export interface OptionsPropsCaster {
  useUndefinedParams: boolean
}
