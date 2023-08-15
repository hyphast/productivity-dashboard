import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IndicatorColorEnum } from '@/components/colored-circle'
import { TodoItem } from './todo-item'
import { StageEnum, TTodo } from './todos.types'
import { useTaskData } from './use-task-data'

import styles from './todos.module.scss'

const TODOS_SKELETON: TTodo[] = [
  {
    id: 0,
    stage: StageEnum.ToDo,
    indicatorColor: IndicatorColorEnum.purple,
  },
  {
    id: 1,
    stage: StageEnum.OnProgress,
    indicatorColor: IndicatorColorEnum.orange,
  },
  {
    id: 2,
    stage: StageEnum.Done,
    indicatorColor: IndicatorColorEnum.blue,
  },
]

export const Todos = () => {
  const [taskData, loading] = useTaskData()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.root}>
        {TODOS_SKELETON.map((todo) => (
          <TodoItem
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
