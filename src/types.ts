export type Caster<TValue = any, TResult = unknown> = (value: TValue) => TResult

export interface CasterPropObject<TValue = any, TResult = unknown> {
  type: Caster<TValue, TResult>
  propKey?: string
}

export type CasterProp<TValue = any, TResult = unknown>
  = | Caster<TValue, TResult>
    | CasterPropObject<TValue, TResult>

export interface Mappings {
  [key: string]: CasterProp
}

export interface OptionsPropsCaster {
  useUndefinedParams: boolean
}
