import { useState } from 'react'
import { push, ref, set } from 'firebase/database'
import { db, projectsRef } from '../../../firebase'
import { useUserStore } from '../../../store/useUserStore'

export const useProject = (): [() => Promise<void>, boolean] => {
  const [loading, setLoading] = useState(false)
  const addProject = useUserStore((state) => state.addProject)

  const createProject = async () => {
    setLoading(true)
    const pRef = await push(projectsRef)
    const id = pRef.key
    if (!id) return
    addProject(id)
    set(push(ref(db, 'users/123/projects')), id)
    setLoading(false)
  }

  return [createProject, loading]
}
