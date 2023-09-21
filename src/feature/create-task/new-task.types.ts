export enum Priority {
  LOW = 'low',
  HIGH = 'high',
  COMPLETE = 'complete',
}

export interface INewTaskValues {
  priority: Priority
  title: string
  date: string
  desc: string
}
