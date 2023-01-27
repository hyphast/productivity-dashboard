import React, { FC } from 'react'
import cn from 'classnames'
import { useDrag } from 'react-dnd'
import { ref } from 'firebase/database'
import { ItemTypes, PriorityEnum, TTaskData } from '../../types/types'
import photoImg from '../../../../../assets/img/ava.jpg'
import { useObject } from '../../../../../hooks/useObject'
import { db } from '../../../../../firebase'
import { TodoLoader } from '../../../../Loaders/TodoLoader'
import { Avatar } from '../../../../Avatar'
// import dragPreviewImg from '../../../../../assets/img/img.png'
import { DeleteButton } from '../../../../DeleteButton'
import styles from './Task.module.scss'

export type TTask = {
  id: number
  task: TTaskData
  loading: boolean
}
export const Task: FC<TTask> = ({ id, task, loading }) => {
  const { priority, date, title, desc, stage } = task
  // const [snapshot] = useObject(ref(db, `users/${task.owner}`))
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id, stage },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <>
      {/*<DragPreviewImage connect={preview} src={dragPreviewImg} />*/}
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
          <div className={styles.deleteBtn}>
            <DeleteButton />
          </div>
        </div>
        <div className={styles.taskMain}>
          <h5>{title}</h5>
          {/*<div className={styles.date}>*/}
          {/*  {new Intl.DateTimeFormat('en-GB', {*/}
          {/*    dateStyle: 'full',*/}
          {/*    timeStyle: 'short',*/}
          {/*  }).format(date)}*/}
          {/*</div>*/}
          <div className={styles.desc}>{desc}</div>
        </div>
        <div className={styles.taskFooter}>
          <Avatar userId={task.owner} className={styles.ownerAvatar} />
          {/*<img*/}
          {/*  className={styles.ownerAvatar}*/}
          {/*  src={photoImg}*/}
          {/*  alt="owner task avatar"*/}
          {/*/>*/}
          {/*<span>{snapshot && snapshot?.val()?.name}</span>*/}
        </div>
      </div>
    </>
  )
}
