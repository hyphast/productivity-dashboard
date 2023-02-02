import React, { FC, useEffect } from 'react'
import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { Input } from '../common/Input/Input'
import { useDebounce } from '../../hooks/useDebounce'
import { ReactComponent as SearchIcon } from '../../assets/img/icons/search.svg'
import { ReactComponent as ClearIcon } from '../../assets/img/icons/clear.svg'
import { useUserStore } from '../../store/useUserStore'
import styles from './Search.module.scss'

export const Search: FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  placeholder,
}) => {
  const setSearch = useUserStore((state) => state.setSearch)
  const search = useUserStore((state) => state.search)
  const { register, watch, reset } = useForm({
    defaultValues: {
      search,
    },
  })
  const watchSearch = watch('search')
  const debouncedSearch = useDebounce(watchSearch, 350)

  useEffect(() => {
    setSearch(debouncedSearch)
  }, [debouncedSearch])

  const onClearClick = () => {
    setSearch('')
    reset()
  }

  return (
    <div className={cn(styles.root, className)}>
      <SearchIcon className={styles.findIcon} />
      <Input placeholder={placeholder} {...register('search')} />
      {!!watchSearch.length && (
        <ClearIcon onClick={onClearClick} className={styles.clearIcon} />
      )}
    </div>
  )
}
