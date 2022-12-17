import React, { FC } from 'react'
import { useDrop } from 'react-dnd'
import {
  ColoredCircle,
  IndicatorColorEnum,
} from '../../../common/ColoredCircle'
import { ItemTypes, StageEnum, TTaskData } from '../types/types'
import { Task } from './Task'
import styles from './TodoItem.module.scss'
import { Overlay } from './Overlay'

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
  setTaskData: React.Dispatch<React.SetStateAction<TTaskData[]>>
}
export const TodoItem: FC<TTodoItem> = ({
  stage,
  indicatorColor,
  todosCount,
  taskData,
  setTaskData,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      canDrop: (item: { id: number; stage: StageEnum }) => stage !== item.stage,
      drop: (item: { id: number; stage: StageEnum }) => {
        setTaskData((prev) =>
          prev.map((t) => {
            if (t.id === item.id) {
              return { ...t, stage }
            }
            return t
          })
        )
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [stage]
  )

  const stageName = stageTitles.find((item) => item.id === stage)
  const stageTasks = taskData.filter((task) => task.stage === stage)

  return (
    <div ref={drop} className={styles.root}>
      <div className={styles.todoHeader}>
        <div className={styles.circle}>
          <ColoredCircle indicatorColor={indicatorColor} />
        </div>
        <div className={styles.todoTitle}>
          <h4>{stageName && stageName.name}</h4>
        </div>
        <div className={styles.count}>{todosCount}</div>
        {stage === StageEnum.ToDo && (
          <div className={styles.addTaskIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.2"
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
                fill="#5030E5"
              />
              <path
                d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z"
                fill="#5030E5"
              />
            </svg>
          </div>
        )}
        <div
          className={styles.delimiter}
          style={{ borderBottom: `3px solid ${indicatorColor}` }}
        />
      </div>
      <div className={styles.todoMain}>
        {stageTasks.map((task) => (
          <Task key={task.id} id={task.id} task={task} />
        ))}
      </div>
      {!isOver && canDrop && <Overlay />}
      {isOver && canDrop && <Overlay color="#61D7A4" />}
    </div>
  )
}
