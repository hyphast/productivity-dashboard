import React from 'react'
import cn from 'classnames'
import { ChangeHandler, UseFormRegister } from 'react-hook-form'
import styles from './input.module.scss'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & ReturnType<UseFormRegister<Record<string, string>>> & ChangeHandler
>(({ onChange, onBlur, name, className, placeholder, type }, ref) => (
  <input
    name={name}
    ref={ref}
    onChange={onChange}
    onBlur={onBlur}
    className={cn(styles.input, className)}
    placeholder={placeholder}
    type={type}
  />
))
