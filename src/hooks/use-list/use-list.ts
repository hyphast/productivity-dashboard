import { useEffect, useRef } from 'react'
import {
  DataSnapshot,
  Query,
  off,
  onChildAdded as firebaseOnChildAdded,
  onValue as firebaseOnValue,
  onChildChanged as firebaseOnChildChanged,
  onChildMoved as firebaseOnChildMoved,
  onChildRemoved as firebaseOnChildRemoved,
} from 'firebase/database'
import { useListReducer } from './use-list-reducer'

type UseListReturn = [DataSnapshot[], boolean, Error | undefined]
export const useList = (query: Query): UseListReturn => {
  const [state, dispatch] = useListReducer()

  const queryRef = useRef(query)
  const qRef = queryRef.current

  useEffect(() => {
    if (!!query && !!qRef && !query.isEqual(qRef)) {
      queryRef.current = query
      dispatch({ type: 'reset' })
    }
  })

  useEffect(() => {
    if (!qRef) {
      dispatch({ type: 'empty' })
      return
    }

    const onChildAdded = (
      snapshot: DataSnapshot,
      previousKey?: string | null
    ) => {
      dispatch({ type: 'add', previousKey, snapshot })
    }

    const onChildChanged = (snapshot: DataSnapshot) => {
      dispatch({ type: 'change', snapshot })
    }

    const onChildMoved = (
      snapshot: DataSnapshot,
      previousKey?: string | null
    ) => {
      dispatch({ type: 'move', previousKey, snapshot })
    }

    const onChildRemoved = (snapshot: DataSnapshot) => {
      dispatch({ type: 'remove', snapshot })
    }

    const onError = (error: Error) => {
      dispatch({ type: 'error', error })
    }

    const onValue = (snapshots: DataSnapshot[]) => {
      dispatch({ type: 'value', snapshots })
    }

    const onInitialLoad = (snapshot: DataSnapshot) => {
      const snapshotVal = snapshot.val()
      let childrenToProcess = snapshotVal
        ? Object.keys(snapshot.val()).length
        : 0

      if (childrenToProcess === 0) {
        firebaseOnChildAdded(qRef, onChildAdded, onError)
        onValue([])
      } else {
        const children: DataSnapshot[] = []

        const onChildAddedWithoutInitialLoad = (
          addedChild: DataSnapshot,
          previousKey?: string | null
        ) => {
          if (childrenToProcess > 0) {
            childrenToProcess -= 1
            children.push(addedChild)

            if (childrenToProcess === 0) {
              onValue(children)
            }

            return
          }

          onChildAdded(addedChild, previousKey)
        }

        firebaseOnChildAdded(qRef, onChildAddedWithoutInitialLoad, onError)
      }
    }

    firebaseOnValue(qRef, onInitialLoad, onError, { onlyOnce: true })
    firebaseOnChildChanged(qRef, onChildChanged, onError)
    firebaseOnChildMoved(qRef, onChildMoved, onError)
    firebaseOnChildRemoved(qRef, onChildRemoved, onError)

    // eslint-disable-next-line consistent-return
    return () => {
      off(qRef)
    }
  }, [qRef, dispatch])

  return [state.value.values, state.loading, state.error]
}
