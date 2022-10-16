import { IndicatorColorEnum } from '../../../commonComponents/ColoredCircle'

export const ItemTypes = {
  TASK: 'todos/task',
}

export enum StageEnum {
  'ToDo',
  'OnProgress',
  'Done',
}
export type TTodo = {
  id: number
  stage: StageEnum
  indicatorColor: IndicatorColorEnum
  todosCount: number
}
export enum PriorityEnum {
  'Low',
  'High',
  'Completed',
}
export type TTaskData = {
  id: number
  stage: StageEnum
  priority: PriorityEnum
  date: Date
  title: string
  desc: string
}
