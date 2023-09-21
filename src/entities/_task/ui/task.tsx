import cn from 'classnames'
import { UserBadge } from '@/entities/_user/ui/user-badge/user-badge'
import { Priority, type TaskData } from '@/shared/api'
import { DeleteButton } from '@/shared/ui/delete-button'

import styles from './task.module.scss'

type TaskProps = {
  taskData: TaskData
  onDelete?: () => {}
}

// TODO: add features delete task, DnD task
export const Task = ({ taskData, onDelete }: TaskProps) => {
  const dateFormat = new Intl.DateTimeFormat('ru', {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  return (
    <div className={styles.root}>
      <div className={styles.taskHeader}>
        <div
          className={cn(styles.priority, {
            [styles.low]: taskData.priority === Priority.Low,
            [styles.high]: taskData.priority === Priority.High,
            [styles.completed]: taskData.priority === Priority.Completed,
          })}
        >
          <span>{Priority[taskData.priority]}</span>
        </div>
        <DeleteButton className={styles.deleteBtn} onClick={onDelete} />
      </div>
      <div className={styles.taskMain}>
        <h5>{taskData.title}</h5>
        {taskData.date && <div className={styles.date}>{dateFormat.format(new Date(taskData.date))}</div>}
        <div className={styles.description}>{taskData.desc}</div>
      </div>
      <UserBadge direction="horizontal" userId={taskData.owner} size={25} />
    </div>
  )
}
