import { useParams } from 'react-router-dom'
import { ref } from 'firebase/database'
import { useMemo } from 'react'
import { useList } from '../../../hooks/useList'
import { TTaskData } from './Todos.types'
import { useUserStore } from '../../../store/useUserStore'
import { db } from '../../../firebase'

const quote = (str: string) => {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
}

type UseTaskDataReturn = [TTaskData[], boolean]
export const useTaskData = (): UseTaskDataReturn => {
  const { id } = useParams()
  const [snapshots, loading] = useList(ref(db, `projects/${id}/todos`))
  const search = useUserStore((state) => state.search)

  const taskData = useMemo(
    () =>
      snapshots &&
      snapshots.map((v) => ({
        id: v.key,
        ...v.val(),
      })),
    [snapshots]
  )

  const filteredTaskData = useMemo(() => {
    const reg = new RegExp(quote(search), 'i')

    return taskData.filter((item) => {
      if (!search.length) return true
      const isMatchTitle = item.title.match(reg)
      const isMatchDesc = item.desc.match(reg)
      return isMatchTitle || isMatchDesc
    })
  }, [taskData, search])

  const reversedTaskData = filteredTaskData.reverse()

  return [reversedTaskData, loading]
}
