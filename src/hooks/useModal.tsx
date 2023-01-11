import React, { useState } from 'react'

type UseModalReturn = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void
}
export const useModal = (initialOpen: boolean = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const handleClose = () => {
    setIsOpen(false)
  }

  return { isOpen, setIsOpen, handleClose }
}
