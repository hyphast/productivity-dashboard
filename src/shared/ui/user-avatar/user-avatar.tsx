import Avatar from 'boring-avatars'

import styles from './user-avatar.module.scss'

const AVATAR_COLORS = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']

type UserAvatarProps = {
  userId: string
  size?: number
  className?: string
}

export const UserAvatar = ({ userId, size, className }: UserAvatarProps) => (
  <div className={className}>
    <div className={styles.avatarImage}>
      <Avatar size={size} name={userId} variant="beam" colors={AVATAR_COLORS} />
    </div>
  </div>
)

UserAvatar.defaultProps = {
  size: 40,
  className: '',
}
