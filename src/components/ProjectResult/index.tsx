import React, { FC } from 'react'
import { ReactComponent as NotFoundIcon } from '../../assets/img/icons/notFound.svg'
import { ReactComponent as NotChosen } from '../../assets/img/icons/notChosen.svg'
import styles from './ProjectResult.module.scss'

export enum ProjectResultType {
  'NOT_FOUND',
  'NOT_CHOSEN',
}
type ProjectErrorProps = {
  message: string
  type: ProjectResultType
}
export const ProjectResult: FC<ProjectErrorProps> = ({ message, type }) => {
  return (
    <div className={styles.root}>
      {type === 0 ? <NotFoundIcon /> : <NotChosen />}
      <h1>{message}</h1>
    </div>
  )
}
