import cn from 'classnames'
import { useFormContext } from 'react-hook-form'

import styles from './input.module.scss'

type TextareaProps = {
  name: string
  placeholder: string
  className?: string
}

export const Textarea = ({ name, className, placeholder }: TextareaProps) => {
  const { register } = useFormContext()

  return <textarea className={cn(styles.input, styles.area, className)} {...register(name)} placeholder={placeholder} />
}

Textarea.defaultProps = {
  className: '',
}
