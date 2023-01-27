import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { push, ref, set, update } from 'firebase/database'
import { useLocation, useParams } from 'react-router-dom'
import { ReactComponent as RenameIcon } from '../../../../assets/img/icons/rename.svg'
import { ProjectNameLoader } from '../../../Loaders/ProjectNameLoader'
import { useObject } from '../../../../hooks/useObject'
import { db } from '../../../../firebase'
import { TitleInput } from './TitleInput'
import styles from './ProjectTitle.module.scss'
import { useUserStore } from '../../../../store/useUserStore'

type ProjectTitleProps = {
  projectId: string
}
export const ProjectTitle: FC<ProjectTitleProps> = ({ projectId }) => {
  const [snapshot, loading, error] = useObject(ref(db, `projects/${projectId}`))
  const [title, setTitle] = useState('')
  const [isEditable, setIsEditable] = useState(false)
  const renameProject = useUserStore((state) => state.renameProject)
  const { id } = useParams()
  const location = useLocation()

  useEffect(() => {
    if (!error && snapshot) {
      setTitle(snapshot.val()?.name)
    }
  }, [snapshot])

  useEffect(() => {
    if (location.state?.isNewProject) {
      setIsEditable(true)
      window.history.replaceState({}, '')
    }
  }, [location.state])

  const setNewProject = useCallback(() => {
    if (!id) return
    update(ref(db, `projects/${id}`), {
      name: title,
    })
    renameProject(id, title)
  }, [title, id])

  const onTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }, [])

  const onRenameClick = (event: MouseEvent) => {
    event.stopPropagation()
    if (isEditable) {
      setNewProject()
      setIsEditable(false)
    } else {
      setIsEditable(true)
    }
  }

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
            setNewProject={setNewProject}
          />
        ) : (
          <h1>{title}</h1>
        )}
        <div className={styles.iconsContainer}>
          <RenameIcon onClick={onRenameClick} />
          {/*<ShareSVG className={styles.shareIcon} />*/}
        </div>
      </div>
    </div>
  )
}
