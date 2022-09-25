import React, { FC, useState } from 'react'
import cn from 'classnames'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'
import { Content } from '../components/Content'
import { TopInfo } from '../components/NavBar/TopInfo'
import styles from './Main.module.scss'

export const Main: FC = () => {
  const [navbarVisible, setNavbarVisible] = useState(true)
  return (
    <div className={cn(styles.root, { [styles.fullWidth]: !navbarVisible })}>
      <div className={styles.header}>
        <Header />
      </div>
      <div
        className={cn(styles.navbar, {
          [styles.navbarNotVisible]: !navbarVisible,
        })}
      >
        <TopInfo
          setNavbarVisible={setNavbarVisible}
          navbarVisible={navbarVisible}
        />
        <NavBar />
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  )
}
