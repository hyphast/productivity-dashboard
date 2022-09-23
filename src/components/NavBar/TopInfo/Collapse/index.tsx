import React, { FC } from 'react'
import cn from 'classnames'
import styles from './Collapse.module.scss'

export const Collapse: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.arrow} />
      <div className={cn(styles.arrow, styles.secondArrow)} />
    </div>
  )
}
