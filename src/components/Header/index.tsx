import React, { FC } from 'react'
import { Search } from './Search'
import { Notifications } from './Notifications'
import { UserInfo } from './UserInfo'
import styles from './Header.module.scss'

export const Header: FC = () => {
  return (
    <div className={styles.root}>
      <Search />
      <div className={styles.notifications}>
        <Notifications />
      </div>
      <div className={styles.userInfo}>
        <UserInfo />
      </div>
    </div>
  )
}
