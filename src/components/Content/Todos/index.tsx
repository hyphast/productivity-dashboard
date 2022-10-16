import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IndicatorColorEnum } from '../../commonComponents/ColoredCircle'
import { TodoItem } from './TodoItem'
import { PriorityEnum, StageEnum, TTaskData, TTodo } from './types/types'
import styles from './Todos.module.scss'

const todosSkeleton: TTodo[] = [
  {
    id: 0,
    stage: StageEnum.ToDo,
    indicatorColor: IndicatorColorEnum.purple,
    todosCount: 1,
  },
  {
    id: 1,
    stage: StageEnum.OnProgress,
    indicatorColor: IndicatorColorEnum.orange,
    todosCount: 1,
  },
  {
    id: 2,
    stage: StageEnum.Done,
    indicatorColor: IndicatorColorEnum.blue,
    todosCount: 1,
  },
]
const taskDataInit: TTaskData[] = [
  {
    id: 0,
    stage: StageEnum.ToDo,
    priority: PriorityEnum.Low,
    date: new Date(Date.UTC(2022, 9, 1, 3, 23, 16, 738)),
    title: 'Brainstorming',
    desc: 'Brainstorming brings team members diverse experience into play.',
  },
  {
    id: 1,
    stage: StageEnum.OnProgress,
    priority: PriorityEnum.High,
    date: new Date(Date.UTC(2022, 9, 2, 5, 14, 10, 738)),
    title: 'Research',
    desc: 'User research helps you to create an optimal product for users.',
  },
  {
    id: 2,
    stage: StageEnum.Done,
    priority: PriorityEnum.Completed,
    date: new Date(Date.UTC(2022, 9, 12, 15, 18, 10, 738)),
    title: 'Design System',
    desc: 'It just needs to adapt the UI from what you did before ',
  },
]
export const Todos = () => {
  const [taskData, setTaskData] = useState(taskDataInit)
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.root}>
        {todosSkeleton.map((todo) => (
          <TodoItem
            key={todo.id}
            stage={todo.stage}
            indicatorColor={todo.indicatorColor}
            todosCount={todo.todosCount}
            taskData={taskData}
            setTaskData={setTaskData}
          />
        ))}
      </div>
    </DndProvider>
  )
}
