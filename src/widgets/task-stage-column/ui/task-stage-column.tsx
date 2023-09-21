import { MouseEvent } from 'react'
import { useDrop } from 'react-dnd'
import { ColoredDot, DotColors } from '@/shared/ui/colored-dot'
import AddIcon from '@/assets/images/icons/add.svg'
import { Modal } from '@/shared/ui/modal'
import { useModal } from '@/shared/lib/hooks/use-modal'
import { NewTask } from '@/feature/create-task/ui/new-task'
import { TodoLoader } from '@/shared/ui/loaders/todo-loader'
import { Overlay } from '@/shared/ui/overlay'
import { Task } from '@/entities/_task'
import { useDropArgs } from '../model/use-drop-args'
import { Stage, TaskData } from '@/shared/api/task'

import styles from './task-stage-column.module.scss'

const stageTitles = [
  {
    id: Stage.ToDo,
    name: 'To Do',
  },
  {
    id: Stage.OnProgress,
    name: 'On Progress',
  },
  {
    id: Stage.Done,
    name: 'Done',
  },
]

export type TaskStageColumnProps = {
  stage: Stage
  indicatorColor: DotColors
  taskData: TaskData[]
  loading: boolean
}

export const TaskStageColumn = ({ stage, indicatorColor, taskData, loading }: TaskStageColumnProps) => {
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
          <ColoredDot color={indicatorColor} />
        </div>
        <div className={styles.todoTitle}>
          <h4>{stageName && stageName.name}</h4>
        </div>
        <div className={styles.count}>{stageTasks.length}</div>
        {stage === Stage.ToDo && (
          <>
            <button type="button" onClick={onNewTask} className={styles.addTaskIcon}>
              <AddIcon />
            </button>
            <Modal handleClose={handleClose} isOpen={isOpen} title="Новая задача">
              <NewTask handleClose={handleClose} />
            </Modal>
          </>
        )}
        <div className={styles.delimiter} style={{ borderBottom: `3px solid ${indicatorColor}` }} />
      </div>
      <div className={styles.todoMain}>
        {loading ? <TodoLoader /> : stageTasks.map((task) => <Task key={task.id} taskData={task} />)}
      </div>
      {!isOver && canDrop && <Overlay />}
      {isOver && canDrop && <Overlay color="#61D7A4" />}
    </div>
  )
}
