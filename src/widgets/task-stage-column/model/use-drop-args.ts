import { ref, update } from 'firebase/database'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/shared/config/firebase'
import { Stage, TaskData } from '@/shared/api/task'
import { ItemTypes } from '@/widgets/todos/todos.types'

type UseDropArgsReturn = {
  accept: string
  canDrop: (item: { id: number; stage: Stage }) => boolean
  drop: (item: { id: number; stage: Stage }) => void
  collect: (monitor: any) => { isOver: boolean; canDrop: boolean }
}

export const useDropArgs = (stage: Stage, taskData: TaskData[]): UseDropArgsReturn => {
  const { id } = useParams()

  const dropArgs = useMemo(
    () => ({
      accept: ItemTypes.TASK,
      canDrop: (item: { id: number; stage: Stage }) => stage !== item.stage,
      drop: (item: { id: number; stage: Stage }) => {
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
