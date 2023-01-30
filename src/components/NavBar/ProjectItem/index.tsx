import React, { FC, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { ColoredCircle, IndicatorColorEnum } from '../../ColoredCircle'
import { DeleteButton } from '../../DeleteButton'
import { useUserStore } from '../../../store/useUserStore'
import styles from './ProjectItem.module.scss'

export type TProjectItem = {
  id: string
  name: string
  active?: boolean
  indicatorColor?: IndicatorColorEnum
}
export const ProjectItem: FC<TProjectItem> = ({
  id,
  name,
  active,
  indicatorColor,
}) => {
  const deleteProject = useUserStore((state) => state.deleteProject)
  const navigate = useNavigate()

  const onDeleteClick = (event: MouseEvent<HTMLDivElement>) => {
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
      <div onClick={onDeleteClick} className={styles.deleteIcon}>
        <DeleteButton />
      </div>
    </div>
  )
}

ProjectItem.defaultProps = {
  active: false,
  indicatorColor: IndicatorColorEnum.green,
}
