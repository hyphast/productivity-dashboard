import React, { FC } from 'react'
import { Collapse } from './Collapse'
import { Logo } from './Logo'
import styles from './TopInfo.module.scss'

export const TopInfo: FC = () => {
  return (
    <div className={styles.root}>
      <Logo />
      <Collapse />
    </div>
  )
}
