import React, { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import { NewTaskForm } from './NewTaskForm'
import { useUserStore } from '../../store/useUserStore'
import { Modal } from '../common/Modal'
import styles from '../NewUser/NewUser.module.scss'

export const NewTask: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal handleClose={handleClose} isOpen={isOpen} title="Новая задача">
      <NewTaskForm handleClose={() => setIsOpen(false)} />
    </Modal>
  )
}
