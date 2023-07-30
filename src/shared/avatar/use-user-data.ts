import { ref } from 'firebase/database'
import { useObject } from '../../hooks/use-object'
import { avatars } from '../../store/use-user-store'
import { db } from '../../firebase'

type UseUserDataReturn = [string, string, boolean]
export const useUserData = (userId: string): UseUserDataReturn => {
  const [snapshot, loading] = useObject(ref(db, `users/${userId}`))

  const name = snapshot?.val()?.name
  const avatar = avatars[snapshot?.val()?.avatar ?? 0]

  return [name, avatar, loading]
}
