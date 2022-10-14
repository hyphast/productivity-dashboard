import React, { FC } from 'react'
import {
  ColoredCircle,
  IndicatorColorEnum,
} from '../../../commonComponents/ColoredCircle'
import { TTaskData } from '../types/types'
import { Task } from './Task'
import styles from './TodoItem.module.scss'

export type TTodoItem = {
  status: string
  indicatorColor: IndicatorColorEnum
  todosCount: number
  taskData: TTaskData[]
}
export const TodoItem: FC<TTodoItem> = ({
  status,
  indicatorColor,
  todosCount,
  taskData,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.todoHeader}>
        <div className={styles.circle}>
          <ColoredCircle indicatorColor={indicatorColor} />
        </div>
        <div className={styles.todoTitle}>
          <h4>{status}</h4>
        </div>
        <div className={styles.count}>{todosCount}</div>
        <div
          className={styles.delimiter}
          style={{ borderBottom: `3px solid ${indicatorColor}` }}
        />
      </div>
      <div className={styles.todoMain}>
        {/*{taskData.map((task) => (*/}
        {/*  {task.stage === }*/}
        {/*))}*/}
        <Task />
      </div>
    </div>
  )
}
