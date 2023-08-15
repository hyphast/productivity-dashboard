import React from 'react'
import cn from 'classnames'
import { ChangeHandler, UseFormRegister } from 'react-hook-form'
import styles from './input.module.scss'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    ReturnType<UseFormRegister<Record<string, string>>> &
    ChangeHandler
>(({ onChange, onBlur, name, className, placeholder }, ref) => (
  <textarea
    name={name}
    ref={ref}
    onChange={onChange}
    onBlur={onBlur}
    className={cn(styles.input, styles.area, className)}
    placeholder={placeholder}
  />
))
