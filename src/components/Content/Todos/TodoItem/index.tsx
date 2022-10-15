import React, { FC } from 'react'
import {
  ColoredCircle,
  IndicatorColorEnum,
} from '../../../commonComponents/ColoredCircle'
import { StageEnum, TTaskData } from '../types/types'
import { Task } from './Task'
import styles from './TodoItem.module.scss'

const stageTitles = [
  {
    id: StageEnum.ToDo,
    name: 'To Do',
  },
  {
    id: StageEnum.OnProgress,
    name: 'On Progress',
  },
  {
    id: StageEnum.Done,
    name: 'Done',
  },
]
export type TTodoItem = {
  stage: StageEnum
  indicatorColor: IndicatorColorEnum
  todosCount: number
  taskData: TTaskData[]
}
export const TodoItem: FC<TTodoItem> = ({
  stage,
  indicatorColor,
  todosCount,
  taskData,
}) => {
  const stageName = stageTitles.find((item) => item.id === stage)
  return (
    <div className={styles.root}>
      <div className={styles.todoHeader}>
        <div className={styles.circle}>
          <ColoredCircle indicatorColor={indicatorColor} />
        </div>
        <div className={styles.todoTitle}>
          <h4>{stageName && stageName.name}</h4>
        </div>
        <div className={styles.count}>{todosCount}</div>
        <div
          className={styles.delimiter}
          style={{ borderBottom: `3px solid ${indicatorColor}` }}
        />
      </div>
      <div className={styles.todoMain}>
        {taskData.map((task) => {
          return (
            task.stage === stage && (
              <Task
                key={task.id}
                title={task.title}
                priority={task.priority}
                desc={task.desc}
              />
            )
          )
        })}
      </div>
    </div>
  )
}
