import { UserInfo } from '@/entities/_user/ui/user-info'
import { Search } from '@/feature/search/ui'

import styles from './header.module.scss'

export const Header = () => (
  <div className={styles.root}>
    <div className={styles.searchWrapper}>
      <Search className={styles.search} placeholder="Search for anything..." />
    </div>
    <div className={styles.userInfo}>
      <UserInfo />
    </div>
  </div>
)
