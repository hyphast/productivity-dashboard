import React, { FC } from 'react'
import { ReactComponent as SearchIcon } from '../../../assets/img/icons/search.svg'
import { Search } from '../../common/Input/Search'
import styles from './Search.module.scss'

export const SearchComponent: FC = () => {
  return (
    <div className={styles.root}>
      {/*<SearchIcon className={styles.findIcon} />*/}
      {/*<input*/}
      {/*  className={styles.search}*/}
      {/*  placeholder="Search for anything..."*/}
      {/*  type="text"*/}
      {/*/>*/}
      <Search className={styles.search} placeholder="Search for anything..." />
    </div>
  )
}
