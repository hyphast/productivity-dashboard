import { FC, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { ColoredCircle, IndicatorColorEnum } from '@/components/colored-circle'
import { DeleteButton } from '@/components/delete-button'
import { useUserStore } from '@/store/use-user-store'
import styles from './project-item.module.scss'

export type TProjectItem = {
  id: string
  name: string
  active?: boolean
  indicatorColor?: IndicatorColorEnum
}
export const ProjectItem: FC<TProjectItem> = ({ id, name, active, indicatorColor }) => {
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
        <ColoredCircle indicatorColor={indicatorColor} />
      </div>
      <div className={styles.name}>{name}</div>
      <button className={styles.deleteIcon} type="button" onClick={onDeleteClick}>
        <DeleteButton />
      </button>
    </div>
  )
}

ProjectItem.defaultProps = {
  active: false,
  indicatorColor: IndicatorColorEnum.green,
}
