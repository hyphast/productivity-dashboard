import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { ref } from 'firebase/database'
import { useObject } from '@/shared/lib/react-firebase-hooks/use-object'

import { useUserStore } from '@/store/use-user-store'
import { db } from '@/shared/config/firebase'

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

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return [title, loading, onTitleChange]
}
