import React from 'react'
import { ProjectMembers } from './ProjectMembers'
import { ProjectTitle } from './ProjectTitle'
import styles from './ProjectInfo.module.scss'

export const ProjectInfo = () => {
  return (
    <div className={styles.root}>
      <div className={styles.projectTitle}>
        <ProjectTitle />
      </div>
      <div className={styles.projectMembers}>
        <ProjectMembers />
      </div>
    </div>
  )
}
