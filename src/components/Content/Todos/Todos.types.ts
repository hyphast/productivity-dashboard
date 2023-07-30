import { IndicatorColorEnum } from '../../colored-circle'

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
  date: string
  title: string
  desc: string
  owner: string
  updated: string
}
