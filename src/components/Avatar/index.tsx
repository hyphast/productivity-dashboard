import React, { FC, useRef } from 'react'
import cn from 'classnames'
import { ref } from 'firebase/database'
import { avatars } from '../../store/useUserStore'
import { useObject } from '../../hooks/useObject'
import { db } from '../../firebase'
import { AvatarLoader } from '../Loaders/AvatarLoader'
import styles from './Avatar.module.scss'

type AvatarProps = {
  userId: string
  className?: string
}
export const Avatar: FC<AvatarProps> = ({ userId, className }) => {
  const [snapshot, loading] = useObject(ref(db, `users/${userId}`))
  const imgRef = useRef<HTMLImageElement | null>(null)

  return (
    <div className={cn(styles.root, className)}>
      {loading ? (
        <AvatarLoader />
      ) : (
        <img
          src={avatars[snapshot?.val()?.avatar ?? 0]}
          alt="avatar"
          className={styles.avatar}
          ref={imgRef}
        />
      )}
      <div className={styles.name}>{snapshot?.val()?.name}</div>
    </div>
  )
}
Avatar.defaultProps = {
  className: '',
}
