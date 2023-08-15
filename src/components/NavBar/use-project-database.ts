import { useCallback, useState } from 'react'
import { push, set } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { projectsRef } from '@/firebase'
import { useUserStore } from '@/store/use-user-store'

type UseProjectReturn = [() => void, boolean, string | undefined]
export const useProjectDatabase = (): UseProjectReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const sameName = useUserStore((state) =>
    state.projects.filter((item) => item.name.replace(/\s\(\d+\)/, '') === 'New Project'),
  )

  const createProject = useCallback(() => {
    setLoading(true)

    const pRef = push(projectsRef)
    const id = pRef.key
    if (!id) return

    const newProjectName = sameName.length > 0 ? `New Project (${sameName.length})` : 'New Project'

    set(pRef, { name: newProjectName })
      .then(() => navigate(`/${id}`, { state: { isNewProject: true } }))
      .catch(() => setError('Some error'))
      .finally(() => setLoading(false))
  }, [sameName])

  return [createProject, loading, error]
}
