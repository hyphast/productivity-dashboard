import React, { FC } from 'react'
import { ProjectMembers } from './project-members'
import { ProjectTitle } from './project-title'
import styles from './project-info.module.scss'

type ProjectInfoProps = {
  projectId: string
}
export const ProjectInfo: FC<ProjectInfoProps> = ({ projectId }) => {
  return (
    <div className={styles.root}>
      <div className={styles.projectTitle}>
        <ProjectTitle projectId={projectId} />
      </div>
      <div className={styles.projectMembers}>
        <ProjectMembers projectId={projectId} />
      </div>
    </div>
  )
}
