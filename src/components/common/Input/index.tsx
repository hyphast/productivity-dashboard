import React from 'react'
import cn from 'classnames'
import { ChangeHandler, UseFormRegister } from 'react-hook-form'
import styles from './Input.module.scss'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> &
    ReturnType<UseFormRegister<Record<string, string>>> &
    ChangeHandler
>(({ onChange, onBlur, name, className, placeholder }, ref) => (
  <input
    name={name}
    ref={ref}
    onChange={onChange}
    onBlur={onBlur}
    className={cn(styles.root, className)}
    placeholder={placeholder}
    type="text"
  />
))
