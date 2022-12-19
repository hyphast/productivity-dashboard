import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { NewUserForm } from './NewUserForm'
import { Modal } from '../common/Modal'
import styles from './NewUser.module.scss'

export const NewUser = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal handleClose={handleClose} isOpen={isOpen} title="Введите ваше имя">
      <NewUserForm handleClose={handleClose} />
    </Modal>
  )
}
