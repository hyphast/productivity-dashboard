import React, { FC, useEffect } from 'react'
import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { Input } from '@/shared/input/input'
import { useDebounce } from '@/hooks/use-debounce'
import SearchIcon from '@/assets/images/icons/search.svg'
import ClearIcon from '@/assets/images/icons/clear.svg'
import { useUserStore } from '@/store/use-user-store'

import styles from './search.module.scss'

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
      <button type="button" className={styles.findIcon}>
        <SearchIcon />
      </button>
      <Input placeholder={placeholder} {...register('search')} />
      {!!watchSearch.length && (
        <button
          type="button"
          onClick={onClearClick}
          className={styles.clearIcon}
        >
          <ClearIcon />
        </button>
      )}
    </div>
  )
}
