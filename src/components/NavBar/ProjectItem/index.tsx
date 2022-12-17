import React, { FC } from 'react'
import cn from 'classnames'
import { ColoredCircle, IndicatorColorEnum } from '../../common/ColoredCircle'
import styles from './ProjectItem.module.scss'
import { Dots } from '../../common/Dots'

export type TProjectItem = {
  name: string
  active?: boolean
  indicatorColor?: IndicatorColorEnum
}
export const ProjectItem: FC<TProjectItem> = ({
  name,
  active,
  indicatorColor,
}) => {
  return (
    <div className={cn(styles.projectItem, { [styles.activeProject]: active })}>
      <div className={styles.indicator}>
        <ColoredCircle indicatorColor={indicatorColor} />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.dots}>
        <Dots />
      </div>
    </div>
  )
}

ProjectItem.defaultProps = {
  active: false,
  indicatorColor: IndicatorColorEnum.green,
}
