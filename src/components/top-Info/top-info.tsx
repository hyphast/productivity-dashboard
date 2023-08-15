import { Dispatch, FC, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from './collapse'
import { Logo } from './logo'
import styles from './top-info.module.scss'

type TopInfoProps = {
  setNavbarVisible: Dispatch<SetStateAction<boolean>>
  navbarVisible: boolean
}
export const TopInfo: FC<TopInfoProps> = ({ setNavbarVisible, navbarVisible }) => {
  return (
    <div className={styles.root}>
      <Link to="/">
        <Logo />
      </Link>
      <Collapse setNavbarVisible={setNavbarVisible} navbarVisible={navbarVisible} />
    </div>
  )
}
