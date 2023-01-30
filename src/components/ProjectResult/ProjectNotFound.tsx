import React, { FC } from 'react'
import { ReactComponent as NotFoundIcon } from '../../assets/img/icons/notFound.svg'
import styles from './ProjectResult.module.scss'

export const ProjectNotFound: FC = () => {
  return (
    <div className={styles.root}>
      <NotFoundIcon />
      <h1>Такого проекта не существует</h1>
      <p>Возможно проект был удален</p>
    </div>
  )
}
