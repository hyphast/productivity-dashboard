import { DataSnapshot } from 'firebase/database'

export type Value = {
  keys: string[]
  values: DataSnapshot[]
}
export type ReducerState = {
  loading: boolean
  error?: Error
  value: Value
}
