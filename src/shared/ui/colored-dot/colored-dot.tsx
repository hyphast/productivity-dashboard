import styles from './colored-dot.module.scss'

export enum DotColors {
  'green' = '#8BC48A',
  'orange' = '#FFA500',
  'purple' = '#5030E5',
  'blue' = '#76A5EA',
  'red' = '#e13a31',
}

type ColoredDotProps = {
  color?: DotColors
}

export const ColoredDot = ({ color }: ColoredDotProps) => {
  return <span style={{ background: color }} className={styles.root} />
}

ColoredDot.defaultProps = {
  color: DotColors.green,
}
