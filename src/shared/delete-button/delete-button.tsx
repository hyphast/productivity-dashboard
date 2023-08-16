import { MouseEvent } from 'react'
import cn from 'classnames'

import DeleteIcon from '@/assets/images/icons/delete.svg'
import styles from './delete-button.module.scss'

type DeleteButtonProps = {
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const DeleteButton = ({ className, onClick }: DeleteButtonProps) => {
  return (
    <button type="button" className={cn(styles.root, className)} onClick={onClick}>
      <DeleteIcon />
    </button>
  )
}

DeleteButton.defaultProps = {
  className: '',
  onClick: undefined,
}
