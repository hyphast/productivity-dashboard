import { useState } from 'react'
import { push, set } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { projectsRef } from '../../../firebase'
import { useUserStore } from '../../../store/useUserStore'

export const useProject = (): [
  () => Promise<void>,
  boolean,
  string | undefined
] => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const projects = useUserStore((state) => state.projects)

  const createProject = async () => {
    try {
      setLoading(true)

      const pRef = push(projectsRef)
      const id = pRef.key
      if (!id) return

      const sameName = projects.filter(
        (item) => item.name.replace(/\s\(\d+\)/, '') === 'New Project'
      )
      const projectName =
        sameName.length > 0 ? `New Project (${sameName.length})` : 'New Project'

      await set(pRef, { name: projectName })
      // set(push(ref(db, 'users/123/projects')), id)
      // addProject(id, name) // TODO ?

      setLoading(false)

      navigate(`/${id}`, { state: { isNewProject: true } })
    } catch (e) {
      setError('Some error')
    }
  }

  return [createProject, loading, error]
}
