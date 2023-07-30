import { useCallback, useState } from 'react'
import { push, set } from 'firebase/database'
import { avatars, useUserStore } from '../../../store/use-user-store'
import { usersRef } from '../../../firebase'

type UseUserDBReturn = [(name: string) => void, string | undefined]
export const useUserDatabase = (): UseUserDBReturn => {
  const setUser = useUserStore((state) => state.setUser)
  const [error, setError] = useState<string | undefined>(undefined)

  const createUser = useCallback((name: string) => {
    const pRef = push(usersRef)
    const avatarIdx = Math.floor(Math.random() * (avatars.length - 1) + 1)
    set(pRef, { name, avatar: avatarIdx })
      .then(() => {
        if (!pRef.key) return
        setUser(pRef.key, name, avatarIdx)
      })
      .catch((e) => {
        setError('Create user error')
      })
  }, [])

  return [createUser, error]
}
