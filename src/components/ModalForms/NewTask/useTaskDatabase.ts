import { useCallback, useState } from 'react'
import { push, ref, set } from 'firebase/database'
import { useParams } from 'react-router-dom'
import { INewTaskValues } from './NewTask.types'
import { useUserStore } from '../../../store/useUserStore'
import { db } from '../../../firebase'

type UseTaskDBReturn = [
  (projectData: INewTaskValues) => void,
  string | undefined
]
export const useTaskDatabase = (): UseTaskDBReturn => {
  const { id } = useParams()
  const [error, setError] = useState<string | undefined>(undefined)
  const userId = useUserStore((state) => state.user.id)

  const createTask = useCallback(
    (projectData: INewTaskValues) => {
      const { priority, title, desc } = projectData
      set(push(ref(db, `projects/${id}/todos`)), {
        stage: 0,
        priority: Number(priority),
        title,
        // date: data.date,
        desc,
        owner: userId,
      }).catch((e) => {
        setError('Some error')
      })
    },
    [userId]
  )

  return [createTask, error]
}
