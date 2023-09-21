import cn from 'classnames'

import { AvatarLoader } from '@/shared/ui/loaders/avatar-loader'
import { UserAvatar } from '@/shared/ui/user-avatar/user-avatar'
import { useUserData } from '@/entities/_user/model/use-user-data'

import styles from './user-badge.module.scss'

type UserBadgeProps = {
  userId: string
  size: number
  direction?: 'vertical' | 'horizontal'
}

export const UserBadge = ({ userId, size, direction }: UserBadgeProps) => {
  const [userData, loading] = useUserData(userId)

  const classnames = cn(styles.avatar, {
    [styles.horizontalDirection]: direction === 'horizontal',
    [styles.verticalDirection]: direction === 'vertical',
  })

  return (
    <div className={classnames}>
      {loading ? <AvatarLoader /> : <UserAvatar userId={userId} size={size} />}
      <div className={styles.avatarName}>{userData?.name}</div>
    </div>
  )
}

UserBadge.defaultProps = {
  direction: 'vertical',
}
