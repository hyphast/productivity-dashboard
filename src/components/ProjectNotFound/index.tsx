import React, { FC } from 'react'
import { ReactComponent as NotFoundIcon } from '../../assets/img/icons/notFound.svg'
import styles from './ProjectNotFound.module.scss'

type ProjectErrorProps = {
  message: string
}
export const ProjectError: FC<ProjectErrorProps> = ({ message }) => {
  return (
    <div className={styles.root}>
      <NotFoundIcon />
      <h1>{message}</h1>
    </div>
  )
}
