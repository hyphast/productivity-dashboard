import { FC } from 'react'
import DeleteIcon from '@/assets/images/icons/delete.svg'
import styles from './delete-button.module.scss'

export const DeleteButton: FC = () => {
  return (
    <button type="button" className={styles.root}>
      <DeleteIcon />
    </button>
  )
}
