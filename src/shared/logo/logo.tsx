import cn from 'classnames'

import styles from './logo.module.scss'

export const Logo = () => {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <div className={styles.circle} />
        <div className={cn(styles.circle, styles.leftCircle)} />
        <div className={cn(styles.circle, styles.rightCircle)} />
      </div>
      <p className={styles.title}>Project M.</p>
    </div>
  )
}
