import { ref, update } from 'firebase/database'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ItemTypes, StageEnum, TTaskData } from '../todos.types'
import { db } from '@/firebase'

type UseDropArgsReturn = {
  accept: string
  canDrop: (item: { id: number; stage: StageEnum }) => boolean
  drop: (item: { id: number; stage: StageEnum }) => void
  collect: (monitor: any) => { isOver: boolean; canDrop: boolean }
}
export const useDropArgs = (
  stage: StageEnum,
  taskData: TTaskData[],
): UseDropArgsReturn => {
  const { id } = useParams()

  const dropArgs = useMemo(
    () => ({
      accept: ItemTypes.TASK,
      canDrop: (item: { id: number; stage: StageEnum }) => stage !== item.stage,
      drop: (item: { id: number; stage: StageEnum }) => {
        taskData.map((t) => {
          if (t.id === item.id) {
            update(ref(db, `projects/${id}/todos/${t.id}`), {
              stage,
              updated: new Date().toISOString(),
            })
          }
          return t
        })
      },
      collect: (monitor: any) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [stage, taskData, id],
  )

  return dropArgs
}
