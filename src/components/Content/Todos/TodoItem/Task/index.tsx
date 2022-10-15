import React, { FC } from 'react'
import cn from 'classnames'
import { Dots } from '../../../../commonComponents/Dots'
import { PriorityEnum } from '../../types/types'
import styles from './Task.module.scss'

export type TTask = {
  priority: PriorityEnum
  title: string
  desc: string
}
export const Task: FC<TTask> = ({ priority, title, desc }) => {
  return (
    <div className={styles.root}>
      <div className={styles.taskHeader}>
        <div
          className={cn(styles.priority, {
            [styles.low]: priority === PriorityEnum.Low,
            [styles.high]: priority === PriorityEnum.High,
            [styles.completed]: priority === PriorityEnum.Completed,
          })}
        >
          <span>{PriorityEnum[priority]}</span>
        </div>
        <div className={styles.dots}>
          <Dots />
        </div>
      </div>
      <div className={styles.taskMain}>
        <h5>{title}</h5>
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
  )
}
