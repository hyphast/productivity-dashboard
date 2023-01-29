import React, { FC } from 'react'
import styles from './Loader.module.scss'

export const Loader: FC = () => {
  return (
    <div className={styles.ldsEllipsis}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
