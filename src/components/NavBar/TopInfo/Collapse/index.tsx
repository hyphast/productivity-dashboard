import React, { Dispatch, FC, SetStateAction } from 'react'
import cn from 'classnames'
import styles from './Collapse.module.scss'

type TCollapse = {
  setNavbarVisible: Dispatch<SetStateAction<boolean>>
  navbarVisible: boolean
}
export const Collapse: FC<TCollapse> = ({
  setNavbarVisible,
  navbarVisible,
}) => {
  return (
    <button
      type="button"
      onClick={() => setNavbarVisible((prev) => !prev)}
      className={cn(styles.root, { [styles.expand]: !navbarVisible })}
    >
      <div className={styles.arrow} />
      <div className={cn(styles.arrow, styles.secondArrow)} />
    </button>
  )
}
