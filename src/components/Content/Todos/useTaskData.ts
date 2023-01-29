import { useParams } from 'react-router-dom'
import { ref } from 'firebase/database'
import { useMemo } from 'react'
import { useList } from '../../../hooks/useList'
import { TTaskData } from './Todos.types'
import { db } from '../../../firebase'

type UseTaskDataReturn = [TTaskData[], boolean]
export const useTaskData = (): UseTaskDataReturn => {
  const { id } = useParams()
  const [snapshots, loading] = useList(ref(db, `projects/${id}/todos`))

  const taskData = useMemo(
    () =>
      snapshots &&
      snapshots.map((v) => ({
        id: v.key,
        ...v.val(),
      })),
    [snapshots]
  )

  return [taskData, loading]
}
