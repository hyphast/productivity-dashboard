import React, { FC, MouseEvent, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { push, ref, set } from 'firebase/database'
import { useParams } from 'react-router-dom'
import { ColoredCircle, IndicatorColorEnum } from '../../../ColoredCircle'
import { ReactComponent as AddIcon } from '../../../../assets/img/icons/add.svg'
import { ItemTypes, StageEnum, TTaskData } from '../types/types'
import { Task } from './Task'
import { Overlay } from './Overlay'
import { Modal } from '../../../common/Modal'
import { useModal } from '../../../../hooks/useModal'
import { NewTask } from '../../../NewTask'
import { db } from '../../../../firebase'
import { TodoLoader } from '../../../Loaders/TodoLoader'
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
  loading: boolean
  // setTaskData: React.Dispatch<React.SetStateAction<TTaskData[]>>
}
export const TodoItem: FC<TTodoItem> = ({
  stage,
  indicatorColor,
  todosCount,
  taskData,
  loading,
  // setTaskData,
}) => {
  const { id } = useParams()
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      canDrop: (item: { id: number; stage: StageEnum }) => stage !== item.stage,
      drop: (item: { id: number; stage: StageEnum }) => {
        // setTaskData((prev) =>
        //   prev.map((t) => {
        //     if (t.id === item.id) {
        //       return { ...t, stage }
        //     }
        //     return t
        //   })
        // )
        taskData.map((t) => {
          if (t.id === item.id) {
            set(ref(db, `projects/${id}/todos/${t.id}`), {
              ...t,
              stage,
            })
          }
          return t
        })
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [stage, taskData]
  )
  const { isOpen, setIsOpen, handleClose } = useModal(false)

  const stageName = stageTitles.find((item) => item.id === stage)
  const stageTasks = taskData.filter((task) => task.stage === stage)

  const onNewTask = (event: MouseEvent<HTMLOrSVGElement>) => {
    event.stopPropagation()
    setIsOpen(true)
  }

  return (
    <div ref={drop} className={styles.root}>
      <div className={styles.todoHeader}>
        <div className={styles.circle}>
          <ColoredCircle indicatorColor={indicatorColor} />
        </div>
        <div className={styles.todoTitle}>
          <h4>{stageName && stageName.name}</h4>
        </div>
        <div className={styles.count}>{stageTasks.length}</div>
        {stage === StageEnum.ToDo && (
          <>
            <AddIcon onClick={onNewTask} className={styles.addTaskIcon} />
            <Modal
              handleClose={handleClose}
              isOpen={isOpen}
              title="Новая задача"
            >
              <NewTask handleClose={handleClose} />
            </Modal>
          </>
        )}
        <div
          className={styles.delimiter}
          style={{ borderBottom: `3px solid ${indicatorColor}` }}
        />
      </div>
      <div className={styles.todoMain}>
        {loading ? (
          <TodoLoader />
        ) : (
          stageTasks.map((task) => (
            <Task key={task.id} id={task.id} task={task} loading={loading} />
          ))
        )}
      </div>
      {!isOver && canDrop && <Overlay />}
      {isOver && canDrop && <Overlay color="#61D7A4" />}
    </div>
  )
}
