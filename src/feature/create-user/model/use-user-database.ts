import { useCallback, useState } from 'react'
import { push, set } from 'firebase/database'
import { useUserStore } from '@/store/use-user-store'
import { usersRef } from '@/shared/config/firebase'

type UseUserDBReturn = [(name: string) => void, string | undefined]

export const useUserDatabase = (): UseUserDBReturn => {
  const setUser = useUserStore((state) => state.setUser)
  const [error, setError] = useState<string | undefined>(undefined)

  const createUser = useCallback((name: string) => {
    const pRef = push(usersRef)
    set(pRef, { name })
      .then(() => {
        if (!pRef.key) return
        setUser(pRef.key, name)
      })
      .catch(() => {
        setError('Create user error')
      })
  }, [])

  return [createUser, error]
}
