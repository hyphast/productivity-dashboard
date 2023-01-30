import { useParams } from 'react-router-dom'
import { MouseEvent, useCallback, useState } from 'react'
import { ref, set } from 'firebase/database'
import { db } from '../../../../../../firebase'

type UseDeleteTaskReturn = [
  (event: MouseEvent<HTMLDivElement>) => void,
  string | undefined
]
export const useDeleteTask = (id: number): UseDeleteTaskReturn => {
  const { id: projectId } = useParams()
  const [error, setError] = useState<string | undefined>(undefined)

  const onDeleteTask = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()
      set(ref(db, `projects/${projectId}/todos/${id}`), null).catch((e) =>
        setError('Delete task error')
      )
    },
    [projectId, id]
  )

  return [onDeleteTask, error]
}
