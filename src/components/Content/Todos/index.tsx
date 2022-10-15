import React from 'react'
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
const taskData: TTaskData[] = [
  {
    id: 0,
    stage: StageEnum.ToDo,
    priority: PriorityEnum.Low,
    title: 'Brainstorming',
    desc: 'Brainstorming brings team members diverse experience into play.',
  },
  {
    id: 1,
    stage: StageEnum.OnProgress,
    priority: PriorityEnum.High,
    title: 'Research',
    desc: 'User research helps you to create an optimal product for users.',
  },
  {
    id: 2,
    stage: StageEnum.Done,
    priority: PriorityEnum.Completed,
    title: 'Design System',
    desc: 'It just needs to adapt the UI from what you did before ',
  },
]
export const Todos = () => {
  return (
    <div className={styles.root}>
      {todosSkeleton.map((todo) => (
        <TodoItem
          key={todo.id}
          stage={todo.stage}
          indicatorColor={todo.indicatorColor}
          todosCount={todo.todosCount}
          taskData={taskData}
        />
      ))}
    </div>
  )
}
