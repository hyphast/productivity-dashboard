import { ref } from 'firebase/database'
import { useObject } from '@/lib/react-firebase-hooks/use-object'
import { db } from '@/firebase'

type UseUserDataReturn = [string | undefined, boolean]

export const useUserData = (userId: string): UseUserDataReturn => {
  const [snapshot, loading] = useObject(ref(db, `users/${userId}`))

  const name = snapshot?.val()?.name

  return [name, loading]
}
