import React, { FC } from 'react'
import { Dots } from '../../../../commonComponents/Dots'
import styles from './Task.module.scss'

export const Task: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.taskHeader}>
        <div className={styles.priority}>
          <span>Low</span>
        </div>
        <div className={styles.dots}>
          <Dots />
        </div>
      </div>
      <div className={styles.taskMain}>
        <h5>Brainstorming</h5>
        <div className={styles.desc}>
          Brainstorming brings team members diverse experience into play.
        </div>
      </div>
    </div>
  )
}
