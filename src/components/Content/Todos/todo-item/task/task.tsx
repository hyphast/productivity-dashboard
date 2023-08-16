import cn from 'classnames'
import { useDrag } from 'react-dnd'
import { PriorityEnum, TTaskData } from '@/components/content/todos/todos.types'
import { Avatar } from '@/shared/avatar'
import { DeleteButton } from '@/shared/delete-button'
import { useDragArgs } from './hooks/use-drag-args'
import { useDeleteTask } from './hooks/use-delete-task'

import styles from './task.module.scss'

export type TaskProps = {
  id: number
  task: TTaskData
}

export const Task = ({ id, task }: TaskProps) => {
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
        <DeleteButton className={styles.deleteBtn} onClick={onDeleteTask} />
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
