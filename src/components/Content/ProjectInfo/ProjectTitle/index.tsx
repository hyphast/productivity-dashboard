import React from 'react'
import { ReactComponent as RenameSVG } from '../../../../assets/img/icons/rename.svg'
import { ReactComponent as ShareSVG } from '../../../../assets/img/icons/share.svg'
import styles from './ProjectTitle.module.scss'

export const ProjectTitle = () => {
  return (
    <div className={styles.root}>
      <h1>Mobile App</h1>
      <div className={styles.iconsContainer}>
        <RenameSVG />
        <ShareSVG className={styles.shareIcon} />
      </div>
    </div>
  )
}
