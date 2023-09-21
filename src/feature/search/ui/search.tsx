import { useEffect } from 'react'
import cn from 'classnames'
import { FormProvider, useForm } from 'react-hook-form'

import { TextInput } from '@/shared/ui/inputs/text-input'
import { useDebounce } from '@/shared/lib/hooks/use-debounce'
import SearchIcon from '@/assets/images/icons/search.svg'
import ClearIcon from '@/assets/images/icons/clear.svg'
import { useUserStore } from '@/store/use-user-store'

import styles from './search.module.scss'

type SearchProps = {
  className: string
  placeholder: string
}

export const Search = ({ className, placeholder }: SearchProps) => {
  const setSearch = useUserStore((state) => state.setSearch)
  const search = useUserStore((state) => state.search)
  const methods = useForm({
    defaultValues: {
      search,
    },
  })
  const watchSearch = methods.watch('search')
  const debouncedSearch = useDebounce(watchSearch, 350)

  useEffect(() => {
    setSearch(debouncedSearch)
  }, [debouncedSearch])

  const onClearClick = () => {
    setSearch('')
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <div className={cn(styles.root, className)}>
        <button type="button" className={styles.findIcon}>
          <SearchIcon />
        </button>
        <TextInput name="search" placeholder={placeholder} />
        {!!watchSearch.length && (
          <button type="button" onClick={onClearClick} className={styles.clearIcon}>
            <ClearIcon />
          </button>
        )}
      </div>
    </FormProvider>
  )
}
