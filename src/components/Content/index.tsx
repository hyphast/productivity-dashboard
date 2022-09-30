import React, { FC } from 'react'
import styles from './Content.module.scss'
import { ProjectInfo } from './ProjectInfo'
import { Todos } from './Todos'

export const Content: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.projectInfo}>
        <ProjectInfo />
      </div>
      <div className={styles.todos}>
        <Todos />
      </div>
    </div>
  )
}
