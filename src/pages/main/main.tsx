import { useState } from 'react'
import cn from 'classnames'
import { Outlet } from 'react-router-dom'

import { Header } from '@/widgets/header/ui'
import { TopInfo } from '@/shared/ui/top-info'
import { Navbar } from '@/widgets/navbar/ui/navbar'

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
        <Navbar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
