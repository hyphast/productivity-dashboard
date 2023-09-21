import RenameIcon from '@/assets/images/icons/rename.svg'
import { ProjectNameLoader } from '@/shared/ui/loaders/project-name-loader'
import { ConditionalRender } from '@/shared/ui/conditional-render'
import { TitleInput } from '../title-input'
import { useEditProjectName } from '@/feature/rename-project/model/use-edit-project-name'
import { useProjectTitle } from '@/feature/rename-project/model/use-project-title'

import styles from './project-title.module.scss'

type ProjectTitleProps = {
  projectId: string
}

export const ProjectTitle = ({ projectId }: ProjectTitleProps) => {
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
