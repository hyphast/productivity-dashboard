import React, { FC } from 'react'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'
import { Content } from '../components/Content'
import styles from './Main.module.scss'
import { TopInfo } from '../components/NavBar/TopInfo'

export const Main: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.topInfo}>
        <TopInfo />
      </div>
      <div className={styles.navbar}>
        <NavBar />
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  )
}
