import { Navigate, useParams } from 'react-router-dom'

import { ProjectInfo } from '@/widgets/project-info/ui/project-info'
import { Todos } from '@/widgets/todos/ui/todos'
import { useAddLocalProject } from '@/entities/_project/model/use-add-local-project'
import { useAddConnection } from '@/entities/_user/model/use-add-connection'

import styles from './content.module.scss'

export const Content = () => {
  const { id } = useParams()
  const error = useAddLocalProject()
  useAddConnection(error)

  if (!id) {
    return <Navigate to="/project-not-chosen" />
  }

  if (error) {
    return <Navigate to="/project-not-found" />
  }

  return (
    <div className={styles.root}>
      <ProjectInfo projectId={id} />
      <Todos />
    </div>
  )
}
