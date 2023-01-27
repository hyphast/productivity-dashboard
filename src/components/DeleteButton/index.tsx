import React, { FC } from 'react'
import { ReactComponent as DeleteIcon } from '../../assets/img/icons/delete.svg'
import styles from './DeleteButton.module.scss'

export const DeleteButton: FC = () => {
  return (
    <button type="button" className={styles.root}>
      <DeleteIcon />
    </button>
  )
}
