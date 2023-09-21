import { ProjectMembers } from '@/entities/_project/ui/project-members'
import { ProjectTitle } from '@/feature/rename-project/ui/project-title'

import styles from './project-info.module.scss'

type ProjectInfoProps = {
  projectId: string
}

export const ProjectInfo = ({ projectId }: ProjectInfoProps) => {
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
