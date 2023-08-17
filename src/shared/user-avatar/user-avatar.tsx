import cn from 'classnames'
import Avatar from 'boring-avatars'

import { AvatarLoader } from '@/shared/loaders/avatar-loader'
import { useUserData } from './use-user-data'

import styles from './user-avatar.module.scss'

const AVATAR_COLORS = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']

type AvatarProps = {
  userId: string
  size?: number
  className?: string
}

export const UserAvatar = ({ userId, size, className }: AvatarProps) => {
  const [name, loading] = useUserData(userId)

  return (
    <div className={cn(styles.avatar, className)}>
      {loading ? (
        <AvatarLoader />
      ) : (
        <div className={styles.avatarImage}>
          <Avatar size={size} name={userId} variant="beam" colors={AVATAR_COLORS} />
        </div>
      )}
      <div className={styles.avatarName}>{name}</div>
    </div>
  )
}

UserAvatar.defaultProps = {
  size: 40,
  className: '',
}
