import React, { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ref, update } from 'firebase/database'
import { db } from '@/firebase'
import { useUserStore } from '@/store/use-user-store'

type UseEditProjectNameReturn = [
  {
    isEditable: boolean
    setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
  },
  { onToggleMode: (event: MouseEvent) => void },
  () => void,
  string | undefined,
]
export const useEditProjectName = (projectId: string, title: string): UseEditProjectNameReturn => {
  const { id } = useParams()
  const location = useLocation()
  const renameProject = useUserStore((state) => state.renameProject)
  const [isEditable, setIsEditable] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (location.state?.isNewProject) {
      setIsEditable(true)
      window.history.replaceState({}, '')
    }
  }, [location.state])

  useEffect(() => {
    return () => {
      setIsEditable(false)
    }
  }, [id])

  const setNewProjectName = useCallback(() => {
    if (!projectId) return
    update(ref(db, `projects/${projectId}`), {
      name: title,
    })
      .then(() => {
        renameProject(projectId, title)
      })
      .catch(() => {
        setError('Rename project error')
      })
  }, [title, projectId])

  const handlers = useMemo(
    () => ({
      onToggleMode: (event: MouseEvent) => {
        event.stopPropagation()
        if (isEditable) {
          setNewProjectName()
          setIsEditable(false)
        } else {
          setIsEditable(true)
        }
      },
    }),
    [isEditable, setNewProjectName],
  )

  return [{ isEditable, setIsEditable }, handlers, setNewProjectName, error]
}
