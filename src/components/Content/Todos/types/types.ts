import { IndicatorColorEnum } from '../../../commonComponents/ColoredCircle'

export type TTodo = {
  id: number
  status: string
  indicatorColor: IndicatorColorEnum
  todosCount: number
}
export type TTaskData = {
  id: number
  stage: 0 | 1 | 2
  priority: 'Low' | 'High' | 'Completed'
  title: string
  desc: string
}
