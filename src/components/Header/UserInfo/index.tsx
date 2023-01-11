import React from 'react'
import { ReactComponent as ArrowSVG } from '../../../assets/img/icons/arrow.svg'
import { avatars, useUserStore } from '../../../store/useUserStore'
import styles from './UserInfo.module.scss'

export const UserInfo = () => {
  const name = useUserStore((state) => state.user.name)
  const avatarIdx = useUserStore((state) => state.user.avatar)

  return (
    <div className={styles.root}>
      <span className={styles.name}>{name}</span>
      <span className={styles.from}>Developer</span>
      <img className={styles.avatar} src={avatars[avatarIdx]} alt="avatar" />
      <ArrowSVG className={styles.arrow} />
    </div>
  )
}
