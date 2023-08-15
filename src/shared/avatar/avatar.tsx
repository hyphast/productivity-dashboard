import { FC } from 'react'
import cn from 'classnames'

import { AvatarLoader } from '@/components/loaders/avatar-loader'
import { useUserData } from './use-user-data'
import './avatar.scss'

type AvatarProps = {
  userId: string
  className?: string
}

export const Avatar: FC<AvatarProps> = ({ userId, className }) => {
  const [name, avatar, loading] = useUserData(userId)

  return (
    <div className={cn('avatar', className)}>
      {loading ? <AvatarLoader /> : <img src={avatar} alt="avatar" className="avatar__image" />}
      <div className="avatar__name">{name}</div>
    </div>
  )
}

Avatar.defaultProps = {
  className: '',
}
