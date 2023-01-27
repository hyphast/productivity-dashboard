import React, { FC } from 'react'
import { ProjectMembers } from './ProjectMembers'
import { ProjectTitle } from './ProjectTitle'
import styles from './ProjectInfo.module.scss'

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
