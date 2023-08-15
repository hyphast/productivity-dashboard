import { useMemo } from 'react'
import { avatars, useUserStore } from '@/store/use-user-store'

type UseAvatarReturn = [avatar: string]
export const useAvatar = (): UseAvatarReturn => {
  const avatarIdx = useUserStore((state) => state.user.avatar)

  const avatar = useMemo(() => avatars[avatarIdx], [avatarIdx])

  return [avatar]
}
