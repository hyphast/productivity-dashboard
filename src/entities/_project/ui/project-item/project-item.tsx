import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { ColoredDot, DotColors } from '@/shared/ui/colored-dot'
import { DeleteButton } from '@/shared/ui/delete-button'
import { useUserStore } from '@/store/use-user-store'

import styles from './project-item.module.scss'

export type TProjectItem = {
  id: string
  name: string
  active?: boolean
  indicatorColor?: DotColors
}

export const ProjectItem = ({ id, name, active, indicatorColor }: TProjectItem) => {
  const deleteProject = useUserStore((state) => state.deleteProject)
  const navigate = useNavigate()

  const onDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    deleteProject(id)
    navigate('/')
  }

  return (
    <div className={cn(styles.projectItem, { [styles.activeProject]: active })}>
      <div className={styles.indicator}>
        <ColoredDot color={indicatorColor} />
      </div>
      <div className={styles.name}>{name}</div>
      <DeleteButton className={styles.deleteIcon} onClick={onDeleteClick} />
    </div>
  )
}

ProjectItem.defaultProps = {
  active: false,
  indicatorColor: DotColors.green,
}
