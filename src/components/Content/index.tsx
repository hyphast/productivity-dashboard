import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectInfo } from './ProjectInfo'
import { Todos } from './Todos'
import { useAddLocalProject } from './hooks/useAddLocalProject'
import { useAddConnection } from './hooks/useAddConnection'
import { ProjectNotChosen } from '../ProjectResult/ProjectNotChosen'
import { ProjectNotFound } from '../ProjectResult/ProjectNotFound'
import styles from './Content.module.scss'

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
