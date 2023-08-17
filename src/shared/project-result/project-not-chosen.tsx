import { FC } from 'react'
import styles from './project-result.module.scss'

export const ProjectNotChosen: FC = () => {
  return (
    <div className={styles.root}>
      <span style={{ fontSize: '45px' }}>😴</span>
      <h1>Проект не выбран</h1>
      <p>Выбери проект или создай новый</p>
    </div>
  )
}
