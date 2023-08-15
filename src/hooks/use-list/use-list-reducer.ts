import { DataSnapshot } from 'firebase/database'
import { useReducer } from 'react'
import { ReducerState, Value } from './use-list.types'

type AddAction = {
  type: 'add'
  previousKey?: string | null
  snapshot: DataSnapshot
}
type ChangeAction = {
  type: 'change'
  snapshot: DataSnapshot
}
type EmptyAction = { type: 'empty' }
type ErrorAction = { type: 'error'; error: Error }
type MoveAction = {
  type: 'move'
  previousKey?: string | null
  snapshot: DataSnapshot
}
type RemoveAction = {
  type: 'remove'
  snapshot: DataSnapshot
}
type ResetAction = { type: 'reset' }
type ValueAction = { type: 'value'; snapshots: DataSnapshot[] }
type ReducerAction =
  | AddAction
  | ChangeAction
  | EmptyAction
  | ErrorAction
  | MoveAction
  | RemoveAction
  | ResetAction
  | ValueAction

const setValue = (snapshots: DataSnapshot[]): Value => {
  const keys: string[] = []
  const values: DataSnapshot[] = []
  snapshots.forEach((snapshot) => {
    if (!snapshot.key) {
      return
    }
    keys.push(snapshot.key)
    values.push(snapshot)
  })

  return {
    keys,
    values,
  }
}

const addChild = (currentState: Value, snapshot: DataSnapshot, previousKey?: string | null): Value => {
  if (!snapshot.key) {
    return currentState
  }
  const { keys, values } = currentState

  if (!previousKey) {
    return {
      keys: [snapshot.key, ...keys],
      values: [snapshot, ...values],
    }
  }

  const index = keys.indexOf(previousKey)

  return {
    keys: [...keys.slice(0, index + 1), snapshot.key, ...keys.slice(index + 1)],
    values: [...values.slice(0, index + 1), snapshot, ...values.slice(index + 1)],
  }
}

const changeChild = (currentState: Value, snapshot: DataSnapshot): Value => {
  if (!snapshot.key) {
    return currentState
  }
  const { keys, values } = currentState

  const index = keys.indexOf(snapshot.key)

  return {
    ...currentState,
    values: [...values.slice(0, index), snapshot, ...values.slice(index + 1)],
  }
}

const removeChild = (currentState: Value, snapshot: DataSnapshot): Value => {
  if (!snapshot.key) {
    return currentState
  }
  const { keys, values } = currentState

  const index = keys.indexOf(snapshot.key)

  return {
    keys: [...keys.slice(0, index), ...keys.slice(index + 1)],
    values: [...values.slice(0, index), ...values.slice(index + 1)],
  }
}

const moveChild = (currentState: Value, snapshot: DataSnapshot, previousKey?: string | null): Value => {
  const tempValue = removeChild(currentState, snapshot)
  return addChild(tempValue, snapshot, previousKey)
}

const initialState: ReducerState = {
  loading: true,
  value: {
    keys: [],
    values: [],
  },
}

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        value: addChild(state.value, action.snapshot, action.previousKey),
      }
    case 'change':
      return {
        ...state,
        value: changeChild(state.value, action.snapshot),
      }
    case 'error':
      return {
        ...state,
        error: action.error,
        loading: false,
        value: {
          keys: [],
          values: [],
        },
      }
    case 'move':
      return {
        ...state,
        value: moveChild(state.value, action.snapshot, action.previousKey),
      }
    case 'remove':
      return {
        ...state,
        value: removeChild(state.value, action.snapshot),
      }
    case 'reset':
      return initialState
    case 'value':
      return {
        ...state,
        loading: false,
        value: setValue(action.snapshots),
      }
    case 'empty':
      return {
        ...state,
        loading: false,
        value: {
          keys: [],
          values: [],
        },
      }
    default:
      return state
  }
}

export const useListReducer = () => useReducer(reducer, initialState)
