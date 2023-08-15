import { FC } from 'react'
import RenameIcon from '@/assets/images/icons/rename.svg'
import { ProjectNameLoader } from '@/components/loaders/project-name-loader'
import { ConditionalRender } from '@/shared/conditional-render'
import { TitleInput } from './title-input'
import { useEditProjectName } from './hooks/use-edit-project-name'
import { useProjectTitle } from './hooks/use-project-title'

import styles from './project-title.module.scss'

type ProjectTitleProps = {
  projectId: string
}

export const ProjectTitle: FC<ProjectTitleProps> = ({ projectId }) => {
  const [title, loading, onTitleChange] = useProjectTitle(projectId)
  const [{ isEditable, setIsEditable }, { onToggleMode: onRenameClick }, setNewProjectName] = useEditProjectName(
    projectId,
    title,
  )

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <ConditionalRender conditions={[loading]}>
          <ProjectNameLoader />
        </ConditionalRender>
        <ConditionalRender conditions={[!loading, isEditable]}>
          <TitleInput
            value={title}
            onChange={onTitleChange}
            setIsEditable={setIsEditable}
            setNewProjectName={setNewProjectName}
          />
        </ConditionalRender>
        <ConditionalRender conditions={[!loading, !isEditable]}>
          <h1>{title}</h1>
        </ConditionalRender>
        <div className={styles.iconsContainer}>
          {!isEditable && (
            <button type="button" onClick={onRenameClick}>
              <RenameIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
