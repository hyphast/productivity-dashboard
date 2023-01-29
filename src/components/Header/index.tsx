import React, { FC } from 'react'
import { UserInfo } from './UserInfo'
import { Search } from '../common/Input/Search'
import styles from './Header.module.scss'

export const Header: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.searchWrapper}>
        <Search
          className={styles.search}
          placeholder="Search for anything..."
        />
      </div>
      <div className={styles.userInfo}>
        <UserInfo />
      </div>
    </div>
  )
}
