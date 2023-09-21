import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DotColors } from '@/shared/ui/colored-dot'
import { TaskStageColumn } from '@/widgets/task-stage-column/ui/task-stage-column'
import { Stage, Todo } from '@/shared/api/task'
import { useTaskData } from '../model/use-task-data'

import styles from './todos.module.scss'

const TODOS_SKELETON: Todo[] = [
  {
    id: 0,
    stage: Stage.ToDo,
    indicatorColor: DotColors.purple,
  },
  {
    id: 1,
    stage: Stage.OnProgress,
    indicatorColor: DotColors.orange,
  },
  {
    id: 2,
    stage: Stage.Done,
    indicatorColor: DotColors.blue,
  },
]

export const Todos = () => {
  const [taskData, loading] = useTaskData()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.root}>
        {TODOS_SKELETON.map((todo) => (
          <TaskStageColumn
            key={todo.id}
            stage={todo.stage}
            indicatorColor={todo.indicatorColor}
            taskData={taskData}
            loading={loading}
          />
        ))}
      </div>
    </DndProvider>
  )
}
