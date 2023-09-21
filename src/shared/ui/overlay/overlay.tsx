import styles from './overlay.module.scss'

type OverlayProps = {
  color?: string
}

export const Overlay = ({ color }: OverlayProps) => {
  return <div className={styles.root} style={{ backgroundColor: color }} />
}

Overlay.defaultProps = {
  color: 'yellow',
}
