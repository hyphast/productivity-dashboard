import React, { FC } from 'react'
import styles from './Overlay.module.scss'

type OverlayProps = {
  color?: string
}
export const Overlay: FC<OverlayProps> = ({ color }) => {
  return <div className={styles.root} style={{ backgroundColor: color }} />
}

Overlay.defaultProps = {
  color: 'yellow',
}
