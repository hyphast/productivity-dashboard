import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectResult, ProjectResultType } from '../ProjectResult'
import { ProjectInfo } from './ProjectInfo'
import { Todos } from './Todos'
import { useAddLocalProject } from './hooks/useAddLocalProject'
import { useAddConnection } from './hooks/useAddConnection'
import styles from './Content.module.scss'

export const Content: FC = () => {
  const { id } = useParams()
  const [error] = useAddLocalProject()
  useAddConnection(error)

  if (!id) {
    return (
      <ProjectResult
        message="Проект не выбран"
        type={ProjectResultType.NOT_CHOSEN}
      />
    )
  }

  if (error) {
    return (
      <ProjectResult
        message="Такого проекта не существует"
        type={ProjectResultType.NOT_FOUND}
      />
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.projectInfo}>
        <ProjectInfo projectId={id} />
      </div>
      <div className={styles.todos}>
        <Todos />
      </div>
    </div>
  )
}
