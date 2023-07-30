import { useEffect, useState } from 'react'
import { child, get, ref } from 'firebase/database'
import { useParams } from 'react-router-dom'
import { useUserStore } from '../../../store/use-user-store'
import { db } from '../../../firebase'

type UseLocalProjectReturn = [boolean]
export const useAddLocalProject = (): UseLocalProjectReturn => {
  const { id } = useParams()
  const addProject = useUserStore((state) => state.addProject)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return
    get(child(ref(db), `projects/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          addProject(id, snapshot.val().name)
        } else {
          setError(true)
        }
      })
      .catch((e) => {
        setError(true)
      })
    return () => {
      setError(false)
    }
  }, [id])

  return [error]
}
