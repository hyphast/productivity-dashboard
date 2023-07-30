import { FC } from 'react'
import { ReactComponent as RenameIcon } from '../../../../assets/images/icons/rename.svg'
import { ProjectNameLoader } from '../../../loaders/project-name-loader'
import { TitleInput } from './title-input'
import { useEditProjectName } from './hooks/use-edit-project-name'
import { useProjectTitle } from './hooks/use-project-title'
import styles from './project-title.module.scss'

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
