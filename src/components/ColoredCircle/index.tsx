import React, { FC } from 'react'
import styles from './ColoredCircle.module.scss'

export enum IndicatorColorEnum {
  'green' = '#8BC48A',
  'orange' = '#FFA500',
  'purple' = '#5030E5',
  'blue' = '#76A5EA',
}
type TColoredCircle = {
  indicatorColor?: IndicatorColorEnum
}
export const ColoredCircle: FC<TColoredCircle> = ({ indicatorColor }) => {
  return <span style={{ background: indicatorColor }} className={styles.root} />
}

ColoredCircle.defaultProps = {
  indicatorColor: IndicatorColorEnum.green,
}
