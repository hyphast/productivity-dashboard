enum Priority {
  LOW = 'low',
  HIGH = 'high',
  COMPLETE = 'complete',
}
export interface INewTaskValues {
  priority: Priority
  title: string
  date: Date | string
  desc: string
}
