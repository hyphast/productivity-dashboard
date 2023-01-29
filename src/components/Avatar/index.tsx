import React, { FC } from 'react'
import cn from 'classnames'
import { AvatarLoader } from '../Loaders/AvatarLoader'
import { useUserData } from './useUserData'
import styles from './Avatar.module.scss'

type AvatarProps = {
  userId: string
  className?: string
}
export const Avatar: FC<AvatarProps> = ({ userId, className }) => {
  const [name, avatar, loading] = useUserData(userId)

  return (
    <div className={cn(styles.root, className)}>
      {loading ? (
        <AvatarLoader />
      ) : (
        <img src={avatar} alt="avatar" className={styles.avatar} />
      )}
      <div className={styles.name}>{name}</div>
    </div>
  )
}
Avatar.defaultProps = {
  className: '',
}
