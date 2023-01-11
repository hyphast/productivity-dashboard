import React, { FC } from 'react'
import { ref } from 'firebase/database'
import { ReactComponent as RenameSVG } from '../../../../assets/img/icons/rename.svg'
import { ReactComponent as ShareSVG } from '../../../../assets/img/icons/share.svg'
import { ProjectNameLoader } from '../../../Loaders/ProjectNameLoader'
import { useObject } from '../../../../hooks/useObject'
import { db } from '../../../../firebase'
import styles from './ProjectTitle.module.scss'

type ProjectTitleProps = {
  projectId: string
}
export const ProjectTitle: FC<ProjectTitleProps> = ({ projectId }) => {
  const [snapshot, loading, error] = useObject(ref(db, `projects/${projectId}`))

  const title: string = snapshot?.val()?.name ?? ''

  return (
    <div className={styles.root}>
      {loading ? <ProjectNameLoader /> : <h1>{title}</h1>}
      <div className={styles.iconsContainer}>
        <RenameSVG />
        <ShareSVG className={styles.shareIcon} />
      </div>
    </div>
  )
}
