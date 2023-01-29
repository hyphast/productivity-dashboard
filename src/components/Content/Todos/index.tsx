import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IndicatorColorEnum } from '../../ColoredCircle'
import { TodoItem } from './TodoItem'
import { StageEnum, TTodo } from './Todos.types'
import { useTaskData } from './useTaskData'
import styles from './Todos.module.scss'

const todosSkeleton: TTodo[] = [
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
        {todosSkeleton.map((todo) => (
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
