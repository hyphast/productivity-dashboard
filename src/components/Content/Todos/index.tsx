import React from 'react'
import { IndicatorColorEnum } from '../../commonComponents/ColoredCircle'
import { TodoItem } from './TodoItem'
import { TTaskData, TTodo } from './types/types'
import styles from './Todos.module.scss'

const todosSkeleton: TTodo[] = [
  {
    id: 0,
    status: 'To Do',
    indicatorColor: IndicatorColorEnum.purple,
    todosCount: 2,
  },
  {
    id: 1,
    status: 'On Progress',
    indicatorColor: IndicatorColorEnum.orange,
    todosCount: 4,
  },
  {
    id: 2,
    status: 'Done',
    indicatorColor: IndicatorColorEnum.blue,
    todosCount: 1,
  },
]
const taskData: TTaskData[] = [
  {
    id: 0,
    stage: 0,
    priority: 'Low',
    title: 'Brainstorming',
    desc: 'Brainstorming brings team members diverse experience into play.',
  },
  {
    id: 1,
    stage: 1,
    priority: 'High',
    title: 'Research',
    desc: 'User research helps you to create an optimal product for users.',
  },
  {
    id: 2,
    stage: 2,
    priority: 'Completed',
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
          status={todo.status}
          indicatorColor={todo.indicatorColor}
          todosCount={todo.todosCount}
          taskData={taskData}
        />
      ))}
    </div>
  )
}
