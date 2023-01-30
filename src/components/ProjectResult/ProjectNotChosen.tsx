import React, { FC } from 'react'
import { ReactComponent as NotChosen } from '../../assets/img/icons/notChosen.svg'
import styles from './ProjectResult.module.scss'

export const ProjectNotChosen: FC = () => {
  return (
    <div className={styles.root}>
      {/*<NotChosen />*/}
      <span style={{ fontSize: '45px' }}>😴</span>
      <h1>Проект не выбран</h1>
      <p>Выбери проект или создай новый</p>
    </div>
  )
}
