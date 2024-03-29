import React, { FC } from 'react'
import cn from 'classnames'
import { useDrag } from 'react-dnd'
import { useDragArgs } from './hooks/useDragArgs'
import { PriorityEnum, TTaskData } from '../../Todos.types'
import { Avatar } from '../../../../Avatar'
import { DeleteButton } from '../../../../DeleteButton'
import { useDeleteTask } from './hooks/useDeleteTask'
import styles from './Task.module.scss'

export type TTask = {
  id: number
  task: TTaskData
}
export const Task: FC<TTask> = ({ id, task }) => {
  const { priority, date, title, desc, stage } = task

  const dragArgs = useDragArgs(id, stage)
  const [{ isDragging }, drag] = useDrag(() => dragArgs)

  const [onDeleteTask] = useDeleteTask(id)

  return (
    <div
      ref={drag}
      className={cn(styles.root, { [styles.dragging]: isDragging })}
    >
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
        <div className={styles.deleteBtn} onClick={onDeleteTask}>
          <DeleteButton />
        </div>
      </div>
      <div className={styles.taskMain}>
        <h5>{title}</h5>
        {date && (
          <div className={styles.date}>
            {new Intl.DateTimeFormat('ru', {
              dateStyle: 'full',
              timeStyle: 'short',
            }).format(new Date(date))}
          </div>
        )}
        <div className={styles.desc}>{desc}</div>
      </div>
      <div className={styles.taskFooter}>
        <Avatar userId={task.owner} className={styles.ownerAvatar} />
      </div>
    </div>
  )
}
