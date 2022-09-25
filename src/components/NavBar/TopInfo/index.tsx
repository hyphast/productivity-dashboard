import React, { Dispatch, FC, SetStateAction } from 'react'
import { Collapse } from './Collapse'
import { Logo } from './Logo'
import styles from './TopInfo.module.scss'

type TTopInfo = {
  setNavbarVisible: Dispatch<SetStateAction<boolean>>
  navbarVisible: boolean
}
export const TopInfo: FC<TTopInfo> = ({ setNavbarVisible, navbarVisible }) => {
  return (
    <div className={styles.root}>
      <Logo />
      <Collapse
        setNavbarVisible={setNavbarVisible}
        navbarVisible={navbarVisible}
      />
    </div>
  )
}
