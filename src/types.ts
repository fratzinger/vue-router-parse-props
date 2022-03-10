// eslint-disable-next-line @typescript-eslint/ban-types
export type CasterProp = Function | CasterPropObject;

export type CasterPropObject = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  type: Function
  propKey?: string
}

export interface Mappings {
  [key: string]: CasterProp
}

export interface OptionsPropsCaster {
  useUndefinedParams: boolean
}