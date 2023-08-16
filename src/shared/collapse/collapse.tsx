import cn from 'classnames'

import styles from './collapse.module.scss'

type CollapseProps = {
  onToggleNavbar: () => void
  isCollapsed: boolean
}
export const Collapse = ({ onToggleNavbar, isCollapsed }: CollapseProps) => {
  return (
    <button type="button" onClick={onToggleNavbar} className={cn(styles.root, { [styles.expand]: !isCollapsed })}>
      <div className={styles.arrow} />
      <div className={cn(styles.arrow, styles.secondArrow)} />
    </button>
  )
}
