import { useState } from 'react'
import { push, set } from 'firebase/database'
import { projectsRef } from '../../../firebase'
import { useUserStore } from '../../../store/useUserStore'

export const useProject = (): [() => Promise<void>, boolean] => {
  const [loading, setLoading] = useState(false)
  const userId = useUserStore((state) => state.user.id)
  const addProject = useUserStore((state) => state.addProject)

  const createProject = async () => {
    setLoading(true)

    const pRef = await push(projectsRef)
    const id = pRef.key
    if (!id) return

    set(pRef, { name: 'New project' })
    // set(push(ref(db, 'users/123/projects')), id)
    addProject(id)

    setLoading(false)
  }

  return [createProject, loading]
}
