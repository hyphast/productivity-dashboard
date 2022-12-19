import React, { FC } from 'react'
import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { Input } from '../index'
import { ReactComponent as SearchIcon } from '../../../../assets/img/icons/search.svg'
import styles from './Search.module.scss'

export const Search: FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  placeholder,
}) => {
  const { register } = useForm()

  return (
    <div className={cn(styles.root, className)}>
      <SearchIcon className={styles.findIcon} />
      <Input placeholder={placeholder} {...register('search')} />
    </div>
  )
}
