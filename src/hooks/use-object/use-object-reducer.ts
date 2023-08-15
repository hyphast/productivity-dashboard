import { useCallback, useMemo, useReducer } from 'react'
import { DataSnapshot } from 'firebase/database'

export type LoadingValue = {
  error?: Error
  loading: boolean
  reset: () => void
  setError: (error: Error) => void
  setValue: (value?: DataSnapshot) => void
  value?: DataSnapshot
}

type ReducerState = {
  error?: Error
  loading: boolean
  value?: any
}

type ErrorAction = { type: 'error'; error: Error }
type ResetAction = { type: 'reset'; defaultValue?: any }
type ValueAction = { type: 'value'; value: any }
type ReducerAction = ErrorAction | ResetAction | ValueAction

const defaultState = (defaultValue?: any) => {
  return {
    loading: defaultValue === undefined || defaultValue === null,
    value: defaultValue,
  }
}

const reducer =
  () =>
  (state: ReducerState, action: ReducerAction): ReducerState => {
    switch (action.type) {
      case 'error':
        return {
          ...state,
          error: action.error,
          loading: false,
          value: undefined,
        }
      case 'reset':
        return defaultState(action.defaultValue)
      case 'value':
        return {
          ...state,
          error: undefined,
          loading: false,
          value: action.value,
        }
      default:
        return state
    }
  }

export const useObjectReducer = (getDefaultValue?: () => DataSnapshot): LoadingValue => {
  const defaultVal = getDefaultValue ? getDefaultValue() : undefined
  const [state, dispatch] = useReducer(reducer(), defaultState(defaultVal))

  const reset = useCallback(() => {
    const defaultValue = getDefaultValue ? getDefaultValue() : undefined
    dispatch({ type: 'reset', defaultValue })
  }, [getDefaultValue])

  const setError = useCallback((error: Error) => {
    dispatch({ type: 'error', error })
  }, [])

  const setValue = useCallback((value?: DataSnapshot) => {
    dispatch({ type: 'value', value })
  }, [])

  return useMemo(
    () => ({
      error: state.error,
      loading: state.loading,
      reset,
      setError,
      setValue,
      value: state.value,
    }),
    [state.error, state.loading, reset, setError, setValue, state.value],
  )
}
