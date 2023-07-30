import { FC } from 'react'
import styles from './colored-circle.module.scss'

export enum IndicatorColorEnum {
  'green' = '#8BC48A',
  'orange' = '#FFA500',
  'purple' = '#5030E5',
  'blue' = '#76A5EA',
  'red' = '#e13a31',
}
type ColoredCircleProps = {
  indicatorColor?: IndicatorColorEnum
}
export const ColoredCircle: FC<ColoredCircleProps> = ({ indicatorColor }) => {
  return <span style={{ background: indicatorColor }} className={styles.root} />
}

ColoredCircle.defaultProps = {
  indicatorColor: IndicatorColorEnum.green,
}
