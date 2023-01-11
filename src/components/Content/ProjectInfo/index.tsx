import React, { FC } from 'react'
import { ref } from 'firebase/database'
import { ProjectMembers } from './ProjectMembers'
import { ProjectTitle } from './ProjectTitle'
import { useObject } from '../../../hooks/useObject'
import { db } from '../../../firebase'
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
