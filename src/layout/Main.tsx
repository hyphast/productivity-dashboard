import { useState } from 'react'
import cn from 'classnames'
import { Header } from '@/widgets/header'
import { TopInfo } from '@/widgets/top-info'
import { NavBar } from '@/widgets/navbar'
import { Content } from '@/widgets/content'

import styles from './main.module.scss'

export const Main = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      <div
        className={cn(styles.navbar, {
          [styles.navbarNotVisible]: !isNavbarVisible,
        })}
      >
        <TopInfo onToggleNavbar={() => setIsNavbarVisible((prev) => !prev)} isNavbarVisible={isNavbarVisible} />
        <NavBar />
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  )
}
