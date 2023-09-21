import { DotColors } from '@/shared/ui/colored-dot'

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
  indicatorColor: DotColors
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
