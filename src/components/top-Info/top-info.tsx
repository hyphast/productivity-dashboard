import { Link } from 'react-router-dom'
import { Collapse } from '@/shared/collapse'
import { Logo } from '@/shared/logo'

import styles from './top-info.module.scss'

type TopInfoProps = {
  onToggleNavbar: () => void
  isNavbarVisible: boolean
}

export const TopInfo = ({ onToggleNavbar, isNavbarVisible }: TopInfoProps) => {
  return (
    <div className={styles.root}>
      <Link to="/">
        <Logo />
      </Link>
      <Collapse onToggleNavbar={onToggleNavbar} isCollapsed={isNavbarVisible} />
    </div>
  )
}
