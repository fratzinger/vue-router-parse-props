// eslint-disable-next-line @typescript-eslint/ban-types
export type CasterProp = Function | {
  // eslint-disable-next-line @typescript-eslint/ban-types
  type: Function
}

export interface Mappings {
  [key: string]: CasterProp
}

export interface OptionsPropsCaster {
  useUndefinedParams: boolean
}