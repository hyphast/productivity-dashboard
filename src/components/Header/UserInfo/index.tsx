import React from 'react'
import avatarImg from '../../../assets/img/ava.jpg'
import { ReactComponent as ArrowSVG } from '../../../assets/img/icons/arrow.svg'
import styles from './UserInfo.module.scss'
import { useUserStore } from '../../../store/useUserStore'

export const UserInfo = () => {
  const name = useUserStore((state) => state.name)

  return (
    <div className={styles.root}>
      <span className={styles.name}>{name}</span>
      <span className={styles.from}>Developer</span>
      <img className={styles.avatar} src={avatarImg} alt="avatar" />
      <ArrowSVG className={styles.arrow} />
    </div>
  )
}
