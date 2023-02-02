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
      const { priority, title, desc, date } = projectData
      set(push(ref(db, `projects/${id}/todos`)), {
        stage: 0,
        priority: Number(priority),
        title,
        date: date ? new Date(date).toISOString() : '',
        desc,
        owner: userId,
        updated: new Date().toISOString(),
      }).catch((e) => {
        setError('Some error')
      })
    },
    [userId]
  )

  return [createTask, error]
}
