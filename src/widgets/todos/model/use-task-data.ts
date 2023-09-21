import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ref } from 'firebase/database'
import { useList } from '@/shared/lib/react-firebase-hooks/use-list'

import { useUserStore } from '@/store/use-user-store'
import { db } from '@/shared/config/firebase'

import type { TaskData } from '@/shared/api/task'

const quote = (str: string) => {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
}

type UseTaskDataReturn = [TaskData[], boolean]

export const useTaskData = (): UseTaskDataReturn => {
  const { id } = useParams()
  const [snapshots, loading] = useList(ref(db, `projects/${id}/todos`))
  const search = useUserStore((state) => state.search)

  const taskData = useMemo<TaskData[]>(() => {
    return snapshots
      ? snapshots.map((v) => ({
          id: v.key,
          ...v.val(),
        }))
      : []
  }, [snapshots])

  const filteredTaskData = useMemo(() => {
    const reg = new RegExp(quote(search), 'i')

    return taskData.filter((item) => {
      if (!search.length) return true
      const isMatchTitle = item.title.match(reg)
      const isMatchDesc = item.desc.match(reg)
      return isMatchTitle || isMatchDesc
    })
  }, [taskData, search])

  const reversedTaskData = filteredTaskData.sort(
    (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime(),
  )

  return [reversedTaskData, loading]
}