import { FC } from 'react'
import cn from 'classnames'
import { useDrag } from 'react-dnd'
import { PriorityEnum, TTaskData } from '@/components/content/todos/todos.types'
import { Avatar } from '@/shared/avatar'
import { DeleteButton } from '@/components/delete-button'
import { useDragArgs } from './hooks/use-drag-args'
import { useDeleteTask } from './hooks/use-delete-task'
import styles from './task.module.scss'

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
    <div ref={drag} className={cn(styles.root, { [styles.dragging]: isDragging })}>
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
        <button className={styles.deleteBtn} type="button" onClick={onDeleteTask}>
          <DeleteButton />
        </button>
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
