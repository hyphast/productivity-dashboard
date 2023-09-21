import cn from 'classnames'

import styles from './input.module.scss'

type InputProps = {
  type: 'text' | 'datetime-local'
  className?: string
  [x: string]: unknown
}

export const Input = ({ type, className, placeholder, ...restProps }: InputProps) => (
  <input className={cn(styles.input, className)} type={type} {...restProps} />
)

Input.defaultProps = {
  className: '',
}
