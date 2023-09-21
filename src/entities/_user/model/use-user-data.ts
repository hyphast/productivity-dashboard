import { ref } from 'firebase/database'
import { useObject } from '@/shared/lib/react-firebase-hooks/use-object'
import { db } from '@/shared/config/firebase'

type UserData = {
  name: string
}

type UseUserDataReturn = [UserData | undefined, boolean]

export const useUserData = (userId: string): UseUserDataReturn => {
  const [snapshot, isLoading] = useObject(ref(db, `users/${userId}`))

  const userData: UserData | undefined = snapshot?.val()

  return [userData, isLoading]
}
