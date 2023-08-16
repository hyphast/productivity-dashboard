import cn from 'classnames'

import { AvatarLoader } from '@/components/loaders/avatar-loader'
import { useUserData } from './use-user-data'

import styles from './avatar.module.scss'

type AvatarProps = {
  userId: string
  className?: string
}

export const Avatar = ({ userId, className }: AvatarProps) => {
  const [name, avatar, loading] = useUserData(userId)

  return (
    <div className={cn(styles.avatar, className)}>
      {loading ? <AvatarLoader /> : <img className={styles.avatarImage} src={avatar} alt="avatar" />}
      <div className={styles.avatarName}>{name}</div>
    </div>
  )
}

Avatar.defaultProps = {
  className: '',
}
