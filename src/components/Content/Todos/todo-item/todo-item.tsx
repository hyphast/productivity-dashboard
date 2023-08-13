import { FC, MouseEvent } from 'react'
import { useDrop } from 'react-dnd'
import { ColoredCircle, IndicatorColorEnum } from '@/components/colored-circle'
import AddIcon from '@/assets/images/icons/add.svg'
import { Task } from './task'
import { Overlay } from './overlay'
import { Modal } from '@/shared/modal'
import { useModal } from '@/hooks/use-modal'
import { NewTask } from '@/components/modal-forms/new-task'
import { TodoLoader } from '@/components/loaders/todo-loader'
import { useDropArgs } from './use-drop-args'
import { StageEnum, TTaskData } from '../todos.types'

import styles from './todo-item.module.scss'

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
  taskData: TTaskData[]
  loading: boolean
}
export const TodoItem: FC<TTodoItem> = ({
  stage,
  indicatorColor,
  taskData,
  loading,
}) => {
  const dropArgs = useDropArgs(stage, taskData)
  const [{ isOver, canDrop }, drop] = useDrop(dropArgs, [stage, taskData])

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
            <button
              type="button"
              onClick={onNewTask}
              className={styles.addTaskIcon}
            >
              <AddIcon />
            </button>
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
            <Task key={task.id} id={task.id} task={task} />
          ))
        )}
      </div>
      {!isOver && canDrop && <Overlay />}
      {isOver && canDrop && <Overlay color="#61D7A4" />}
    </div>
  )
}
