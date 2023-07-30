import { FC } from 'react'
import { UserInfo } from './user-info'
import { Search } from '../search'
import styles from './header.module.scss'

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
