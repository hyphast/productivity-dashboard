import React, { FC } from 'react'
import styles from './Overlay.module.scss'

type TOverlay = {
  color?: string
}
export const Overlay: FC<TOverlay> = ({ color }) => {
  return <div className={styles.root} style={{ backgroundColor: color }} />
}

Overlay.defaultProps = {
  color: 'yellow',
}
