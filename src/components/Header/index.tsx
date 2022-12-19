import React, { FC } from 'react'
import { SearchComponent } from './Search'
import { UserInfo } from './UserInfo'
import styles from './Header.module.scss'

export const Header: FC = () => {
  return (
    <div className={styles.root}>
      <SearchComponent />
      <div className={styles.userInfo}>
        <UserInfo />
      </div>
    </div>
  )
}
