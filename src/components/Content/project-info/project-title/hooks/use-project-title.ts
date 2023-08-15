import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useObject } from 'react-firebase-hooks/database'
import { ref } from 'firebase/database'

import { useUserStore } from '@/store/use-user-store'
import { db } from '@/firebase'

type UseProjectTitleReturn = [string, boolean, (event: ChangeEvent<HTMLInputElement>) => void]
export const useProjectTitle = (projectId: string): UseProjectTitleReturn => {
  const [snapshot, loading, error] = useObject(ref(db, `projects/${projectId}`))
  const renameProject = useUserStore((state) => state.renameProject)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!error && snapshot) {
      setTitle(snapshot.val()?.name)
      renameProject(projectId, snapshot.val()?.name)
    }
  }, [snapshot])

  const onTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }, [])

  return [title, loading, onTitleChange]
}
