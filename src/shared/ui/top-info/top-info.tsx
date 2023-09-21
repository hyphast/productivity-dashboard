import { Link } from 'react-router-dom'
import cn from 'classnames'

import styles from './top-info.module.scss'

type TopInfoProps = {
  onToggleNavbar: () => void
  isNavbarVisible: boolean
}

export const TopInfo = ({ onToggleNavbar, isNavbarVisible }: TopInfoProps) => (
  <div className={styles.root}>
    <Link to="/">
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <div className={styles.circle} />
          <div className={cn(styles.circle, styles.leftCircle)} />
          <div className={cn(styles.circle, styles.rightCircle)} />
        </div>
        <p className={styles.title}>Project M.</p>
      </div>
    </Link>
    <button
      type="button"
      onClick={onToggleNavbar}
      className={cn(styles.collapse, { [styles.expand]: !isNavbarVisible })}
    >
      <div className={styles.arrow} />
      <div className={cn(styles.arrow, styles.secondArrow)} />
    </button>
  </div>
)
