import React, { FC } from 'react'
import cn from 'classnames'
import styles from './ProjectItem.module.scss'

export enum IndicatorColorEnum {
  'green' = '#8BC48A',
  'orange' = '#FFA500',
  'purple' = '#5030E5',
  'blue' = '#76A5EA',
}

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
      <span
        style={{ background: indicatorColor }}
        className={styles.indicator}
      />
      <div className={styles.name}>{name}</div>
      <span className={styles.dots}>.&nbsp;.&nbsp;.</span>
    </div>
  )
}

ProjectItem.defaultProps = {
  active: false,
  indicatorColor: IndicatorColorEnum.green,
}
