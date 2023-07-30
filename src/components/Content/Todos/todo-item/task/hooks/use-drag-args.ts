import { useMemo } from 'react'
import { ItemTypes, StageEnum } from '../../../todos.types'

type UseDragArgsReturn = {
  type: string
  item: { id: any; stage: any }
  collect: (monitor: any) => { isDragging: boolean }
}
export const useDragArgs = (
  id: number,
  stage: StageEnum
): UseDragArgsReturn => {
  const dragArgs = useMemo(
    () => ({
      type: ItemTypes.TASK,
      item: { id, stage },
      collect: (monitor: any) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, stage]
  )

  return dragArgs
}
