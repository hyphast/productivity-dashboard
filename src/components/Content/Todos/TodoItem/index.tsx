import React, { FC } from 'react'
import { useDrop } from 'react-dnd'
import {
  ColoredCircle,
  IndicatorColorEnum,
} from '../../../common/ColoredCircle'
import { ReactComponent as AddIcon } from '../../../../assets/img/icons/add.svg'
import { ItemTypes, StageEnum, TTaskData } from '../types/types'
import { Task } from './Task'
import { Overlay } from './Overlay'
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
        {stage === StageEnum.ToDo && <AddIcon className={styles.addTaskIcon} />}
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
