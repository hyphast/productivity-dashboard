import { IndicatorColorEnum } from '../../../commonComponents/ColoredCircle'

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
  title: string
  desc: string
}
