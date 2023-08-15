import { DataSnapshot, off, onValue, Query } from 'firebase/database'
import { useEffect, useRef } from 'react'
import { useObjectReducer } from './use-object-reducer'

type UseObjectReturn = [DataSnapshot | undefined, boolean, Error | undefined]
export const useObject = (query: Query): UseObjectReturn => {
  const { error, loading, reset, setError, setValue, value } = useObjectReducer()

  const queryRef = useRef(query)
  const qRef = queryRef.current

  useEffect(() => {
    if (!!query && !!qRef && !query.isEqual(qRef)) {
      queryRef.current = query
      reset()
    }
  })

  useEffect(() => {
    const q = qRef
    if (!q) {
      setValue(undefined)
      return
    }

    onValue(query, setValue, setError)

    // eslint-disable-next-line consistent-return
    return () => {
      off(query, 'value', setValue)
    }
  }, [qRef])

  return [value, loading, error]
}
