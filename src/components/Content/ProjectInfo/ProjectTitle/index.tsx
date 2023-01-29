import React, { FC } from 'react'
import { ReactComponent as RenameIcon } from '../../../../assets/img/icons/rename.svg'
import { ProjectNameLoader } from '../../../Loaders/ProjectNameLoader'
import { TitleInput } from './TitleInput'
import { useEditProjectName } from './hooks/useEditProjectName'
import { useProjectTitle } from './hooks/useProjectTitle'
import styles from './ProjectTitle.module.scss'

type ProjectTitleProps = {
  projectId: string
}
export const ProjectTitle: FC<ProjectTitleProps> = ({ projectId }) => {
  const [title, loading, onTitleChange] = useProjectTitle(projectId)
  const [
    { isEditable, setIsEditable },
    { onToggleMode: onRenameClick },
    setNewProjectName,
  ] = useEditProjectName(projectId, title)

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {loading ? (
          <ProjectNameLoader />
        ) : isEditable ? (
          <TitleInput
            value={title}
            onChange={onTitleChange}
            setIsEditable={setIsEditable}
            setNewProjectName={setNewProjectName}
          />
        ) : (
          <h1>{title}</h1>
        )}
        <div className={styles.iconsContainer}>
          {!isEditable && <RenameIcon onClick={onRenameClick} />}
        </div>
      </div>
    </div>
  )
}
