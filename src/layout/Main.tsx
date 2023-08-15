import { FC, useState } from 'react'
import cn from 'classnames'
import { Header, NavBar, Content, TopInfo } from '../components'
import styles from './main.module.scss'

export const Main: FC = () => {
  const [navbarVisible, setNavbarVisible] = useState(true)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      <div
        className={cn(styles.navbar, {
          [styles.navbarNotVisible]: !navbarVisible,
        })}
      >
        <TopInfo setNavbarVisible={setNavbarVisible} navbarVisible={navbarVisible} />
        <NavBar />
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  )
}
