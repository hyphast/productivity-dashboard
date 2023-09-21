import { DotColors } from '@/shared/ui/colored-dot'

export enum Stage {
  'ToDo',
  'OnProgress',
  'Done',
}

export enum Priority {
  'Low',
  'High',
  'Completed',
}

export type TaskData = {
  id: number
  stage: Stage
  priority: Priority
  date: string
  title: string
  desc: string
  owner: string
  updated: string
}

export type Todo = {
  id: number
  stage: Stage
  indicatorColor: DotColors
}
