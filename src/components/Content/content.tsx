import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectNotChosen } from '@/components//project-result/project-not-chosen'
import { ProjectNotFound } from '@/components/project-result/project-not-found'
import { ProjectInfo } from './project-info'
import { Todos } from './todos'
import { useAddLocalProject } from './hooks/use-add-local-project'
import { useAddConnection } from './hooks/use-add-connection'
import styles from './content.module.scss'

export const Content: FC = () => {
  const { id } = useParams()
  const [error] = useAddLocalProject()
  useAddConnection(error)

  if (!id) {
    return <ProjectNotChosen />
  }

  if (error) {
    return <ProjectNotFound />
  }

  return (
    <div className={styles.root}>
      <ProjectInfo projectId={id} />
      <Todos />
    </div>
  )
}
