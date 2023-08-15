import { FC } from 'react'
import NotFoundIcon from '@/assets/images/icons/not-found.svg'
import styles from './project-result.module.scss'

export const ProjectNotFound: FC = () => {
  return (
    <div className={styles.root}>
      <NotFoundIcon />
      <h1>Такого проекта не существует</h1>
      <p>Возможно проект был удален</p>
    </div>
  )
}
